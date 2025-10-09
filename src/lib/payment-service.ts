import { db } from './database';
import { CryptoUtils, ValidationUtils, AcquirerSimulator, CONFIG } from './utils';
import { 
  CreatePaymentRequest, 
  CreatePaymentResponse, 
  Transaction, 
  PaymentToken,
  FraudScore
} from './types';

export class PaymentService {
  // Tokenização de cartão (PCI-compliant)
  async tokenizeCard(merchantId: string, cardData: any): Promise<PaymentToken> {
    // Validar dados do cartão
    if (!ValidationUtils.isValidCardNumber(cardData.number)) {
      throw new Error('Invalid card number');
    }

    // Gerar token seguro
    const token = `tok_${CryptoUtils.generateToken()}`;
    const scheme = ValidationUtils.getCardScheme(cardData.number);
    const last4 = cardData.number.slice(-4);
    
    // Calcular data de expiração
    const expiry = new Date();
    expiry.setFullYear(2000 + cardData.expiry_year, cardData.expiry_month - 1, 1);
    
    // Salvar token (sem armazenar PAN)
    const paymentToken = await db.createPaymentToken({
      merchant_id: merchantId,
      token,
      scheme: scheme as any,
      expiry,
      last4
    });

    return paymentToken;
  }

  // Criar pagamento
  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    // Validações básicas
    await this.validatePaymentRequest(request);

    // Verificar idempotência
    const existingTransaction = await this.findTransactionByIdempotencyKey(request.idempotency_key);
    if (existingTransaction) {
      return this.formatPaymentResponse(existingTransaction);
    }

    // Análise de fraude
    const fraudScore = await this.analyzeFraud(request);
    if (fraudScore.recommendation === 'block') {
      throw new Error('Transaction blocked by fraud detection');
    }

    // Criar transação
    const transaction = await db.createTransaction({
      merchant_id: request.merchant_id,
      amount: request.amount,
      currency: request.currency,
      method: request.payment_method,
      status: 'pending',
      metadata: request.metadata,
      idempotency_key: request.idempotency_key
    });

    // Processar pagamento baseado no método
    let processResult;
    switch (request.payment_method.type) {
      case 'card':
        processResult = await this.processCardPayment(transaction, request);
        break;
      case 'pix':
        processResult = await this.processPixPayment(transaction, request);
        break;
      case 'boleto':
        processResult = await this.processBoletoPayment(transaction, request);
        break;
      default:
        throw new Error('Unsupported payment method');
    }

    // Atualizar transação com resultado
    const updatedTransaction = await db.updateTransaction(transaction.id, {
      status: processResult.status,
      acquirer_id: processResult.acquirer_id,
      acquirer_reference: processResult.acquirer_reference
    });

    // Enviar webhooks se necessário
    if (updatedTransaction) {
      await this.sendWebhooks(updatedTransaction, 'payment.created');
    }

    return this.formatPaymentResponse(updatedTransaction || transaction, processResult);
  }

  // Capturar pagamento
  async capturePayment(transactionId: string, amount?: number): Promise<Transaction> {
    const transaction = await db.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.status !== 'authorized') {
      throw new Error('Transaction cannot be captured');
    }

    // Simular captura no acquirer
    await new Promise(resolve => setTimeout(resolve, 500));

    const capturedTransaction = await db.updateTransaction(transactionId, {
      status: 'captured',
      amount: amount || transaction.amount
    });

    if (capturedTransaction) {
      await this.sendWebhooks(capturedTransaction, 'payment.captured');
    }

    return capturedTransaction!;
  }

  // Cancelar pagamento
  async cancelPayment(transactionId: string): Promise<Transaction> {
    const transaction = await db.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (!['pending', 'authorized'].includes(transaction.status)) {
      throw new Error('Transaction cannot be cancelled');
    }

    const cancelledTransaction = await db.updateTransaction(transactionId, {
      status: 'cancelled'
    });

    if (cancelledTransaction) {
      await this.sendWebhooks(cancelledTransaction, 'payment.cancelled');
    }

    return cancelledTransaction!;
  }

  // Reembolsar pagamento
  async refundPayment(transactionId: string, amount?: number): Promise<Transaction> {
    const transaction = await db.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.status !== 'captured') {
      throw new Error('Transaction cannot be refunded');
    }

    // Simular reembolso no acquirer
    await new Promise(resolve => setTimeout(resolve, 1000));

    const refundedTransaction = await db.updateTransaction(transactionId, {
      status: 'refunded',
      amount: amount || transaction.amount
    });

    if (refundedTransaction) {
      await this.sendWebhooks(refundedTransaction, 'payment.refunded');
    }

    return refundedTransaction!;
  }

  // Processar pagamento com cartão
  private async processCardPayment(transaction: Transaction, request: CreatePaymentRequest): Promise<any> {
    let cardData;
    
    if (request.payment_method.token) {
      // Usar token existente
      const token = await db.getPaymentToken(request.payment_method.token);
      if (!token) {
        throw new Error('Invalid payment token');
      }
      cardData = { number: `****${token.last4}`, scheme: token.scheme };
    } else if (request.payment_method.card_data) {
      // Usar dados do cartão diretamente (apenas para demonstração)
      cardData = request.payment_method.card_data;
    } else {
      throw new Error('Card data or token required');
    }

    // Processar com acquirer simulado
    const result = await AcquirerSimulator.processCard(cardData, request.amount);
    
    return {
      status: result.status === 'authorized' ? (request.capture ? 'captured' : 'authorized') : 'failed',
      acquirer_id: 'acq_simulator',
      acquirer_reference: result.acquirer_reference,
      authorization_code: result.authorization_code,
      error_code: result.error_code,
      error_message: result.error_message
    };
  }

  // Processar pagamento PIX
  private async processPixPayment(transaction: Transaction, request: CreatePaymentRequest): Promise<any> {
    const pixData = request.payment_method.pix_data || {};
    const result = await AcquirerSimulator.processPix(pixData, request.amount);
    
    return {
      status: 'pending',
      acquirer_id: 'pix_simulator',
      pix_qr_code: result.qr_code,
      expires_at: result.expires_at
    };
  }

  // Processar boleto
  private async processBoletoPayment(transaction: Transaction, request: CreatePaymentRequest): Promise<any> {
    // Simular geração de boleto
    const boletoUrl = `https://boleto.gateway.com/${transaction.id}`;
    
    return {
      status: 'pending',
      acquirer_id: 'boleto_simulator',
      boleto_url: boletoUrl,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
    };
  }

  // Análise de fraude
  private async analyzeFraud(request: CreatePaymentRequest): Promise<FraudScore> {
    const rules = await db.getFraudRules();
    let score = 0;
    const triggeredRules: string[] = [];

    for (const rule of rules) {
      let triggered = false;

      // Verificar condições da regra
      if (rule.conditions.amount_gt && request.amount > rule.conditions.amount_gt) {
        triggered = true;
      }

      if (triggered) {
        score += rule.priority * 10;
        triggeredRules.push(rule.name);
      }
    }

    let recommendation: 'allow' | 'review' | 'block' = 'allow';
    if (score >= CONFIG.FRAUD_SCORE_THRESHOLD) {
      recommendation = score >= 80 ? 'block' : 'review';
    }

    const fraudScore: FraudScore = {
      transaction_id: '',
      score,
      rules_triggered: triggeredRules,
      recommendation,
      created_at: new Date()
    };

    return fraudScore;
  }

  // Validar requisição de pagamento
  private async validatePaymentRequest(request: CreatePaymentRequest): Promise<void> {
    if (!request.merchant_id) {
      throw new Error('Merchant ID is required');
    }

    if (!request.amount || request.amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (request.amount > CONFIG.MAX_TRANSACTION_AMOUNT) {
      throw new Error('Amount exceeds maximum limit');
    }

    if (!CONFIG.SUPPORTED_CURRENCIES.includes(request.currency)) {
      throw new Error('Unsupported currency');
    }

    if (!CONFIG.SUPPORTED_PAYMENT_METHODS.includes(request.payment_method.type)) {
      throw new Error('Unsupported payment method');
    }

    // Verificar se merchant existe
    const merchant = await db.getMerchant(request.merchant_id);
    if (!merchant) {
      throw new Error('Merchant not found');
    }

    if (merchant.status !== 'active') {
      throw new Error('Merchant is not active');
    }
  }

  // Buscar transação por chave de idempotência
  private async findTransactionByIdempotencyKey(key: string): Promise<Transaction | null> {
    const { transactions } = await db.listTransactions();
    return transactions.find(t => t.idempotency_key === key) || null;
  }

  // Formatar resposta de pagamento
  private formatPaymentResponse(transaction: Transaction, processResult?: any): CreatePaymentResponse {
    const response: CreatePaymentResponse = {
      transaction_id: transaction.id,
      status: transaction.status,
      amount: transaction.amount,
      currency: transaction.currency,
      payment_method: {
        type: transaction.method.type,
        last4: transaction.method.card_data ? transaction.method.card_data.number.slice(-4) : undefined
      },
      created_at: transaction.created_at.toISOString()
    };

    if (processResult?.pix_qr_code) {
      response.pix_qr_code = processResult.pix_qr_code;
    }

    if (processResult?.boleto_url) {
      response.boleto_url = processResult.boleto_url;
    }

    return response;
  }

  // Enviar webhooks
  private async sendWebhooks(transaction: Transaction, event: string): Promise<void> {
    const webhooks = await db.getWebhooksByMerchant(transaction.merchant_id);
    
    for (const webhook of webhooks) {
      if (webhook.events.includes(event)) {
        // Em produção, isso seria uma fila assíncrona
        this.sendWebhook(webhook.url, webhook.secret, {
          event,
          transaction_id: transaction.id,
          merchant_id: transaction.merchant_id,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          created_at: transaction.created_at.toISOString()
        }).catch(console.error);
      }
    }
  }

  // Enviar webhook individual
  private async sendWebhook(url: string, secret: string, payload: any): Promise<void> {
    try {
      // Simular envio de webhook
      console.log(`Sending webhook to ${url}:`, payload);
      
      // Em produção, usaria fetch() ou axios para enviar HTTP POST
      // com assinatura HMAC usando o secret
    } catch (error) {
      console.error('Webhook delivery failed:', error);
    }
  }
}

  // Listar transações
  async listTransactions(merchantId?: string, page: number = 1, limit: number = 10) {
    return await db.listTransactions(merchantId, page, limit);
  }
}

export const paymentService = new PaymentService();