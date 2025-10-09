import { 
  Merchant, 
  Transaction, 
  PaymentToken, 
  Settlement, 
  Webhook, 
  User,
  FraudRule,
  FraudScore,
  TransactionEvent
} from './types';
import { CryptoUtils } from './utils';

// Simulação de banco de dados em memória
// Em produção, isso seria substituído por um banco real (PostgreSQL, MongoDB, etc.)

class InMemoryDatabase {
  private merchants: Map<string, Merchant> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private paymentTokens: Map<string, PaymentToken> = new Map();
  private settlements: Map<string, Settlement> = new Map();
  private webhooks: Map<string, Webhook> = new Map();
  private users: Map<string, User> = new Map();
  private fraudRules: Map<string, FraudRule> = new Map();
  private fraudScores: Map<string, FraudScore> = new Map();
  private transactionEvents: Map<string, TransactionEvent[]> = new Map();

  constructor() {
    this.seedData();
  }

  // Merchants
  async createMerchant(merchant: Omit<Merchant, 'id' | 'created_at' | 'updated_at'>): Promise<Merchant> {
    const id = CryptoUtils.generateToken();
    const newMerchant: Merchant = {
      ...merchant,
      id,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.merchants.set(id, newMerchant);
    return newMerchant;
  }

  async getMerchant(id: string): Promise<Merchant | null> {
    return this.merchants.get(id) || null;
  }

  async updateMerchant(id: string, updates: Partial<Merchant>): Promise<Merchant | null> {
    const merchant = this.merchants.get(id);
    if (!merchant) return null;
    
    const updatedMerchant = { ...merchant, ...updates, updated_at: new Date() };
    this.merchants.set(id, updatedMerchant);
    return updatedMerchant;
  }

  async listMerchants(page: number = 1, limit: number = 10): Promise<{ merchants: Merchant[], total: number }> {
    const allMerchants = Array.from(this.merchants.values());
    const start = (page - 1) * limit;
    const merchants = allMerchants.slice(start, start + limit);
    return { merchants, total: allMerchants.length };
  }

  // Transactions
  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'events'>): Promise<Transaction> {
    const id = CryptoUtils.generateToken();
    const newTransaction: Transaction = {
      ...transaction,
      id,
      created_at: new Date(),
      updated_at: new Date(),
      events: []
    };
    this.transactions.set(id, newTransaction);
    
    // Criar evento inicial
    await this.addTransactionEvent(id, 'created', { initial_status: transaction.status });
    
    return newTransaction;
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.get(id);
    if (!transaction) return null;
    
    // Buscar eventos da transação
    const events = this.transactionEvents.get(id) || [];
    return { ...transaction, events };
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | null> {
    const transaction = this.transactions.get(id);
    if (!transaction) return null;
    
    const updatedTransaction = { ...transaction, ...updates, updated_at: new Date() };
    this.transactions.set(id, updatedTransaction);
    
    // Adicionar evento se o status mudou
    if (updates.status && updates.status !== transaction.status) {
      await this.addTransactionEvent(id, updates.status as any, updates);
    }
    
    return updatedTransaction;
  }

  async listTransactions(merchantId?: string, page: number = 1, limit: number = 10): Promise<{ transactions: Transaction[], total: number }> {
    let allTransactions = Array.from(this.transactions.values());
    
    if (merchantId) {
      allTransactions = allTransactions.filter(t => t.merchant_id === merchantId);
    }
    
    const start = (page - 1) * limit;
    const transactions = allTransactions.slice(start, start + limit);
    return { transactions, total: allTransactions.length };
  }

  async addTransactionEvent(transactionId: string, type: TransactionEvent['type'], data: Record<string, any>): Promise<void> {
    const events = this.transactionEvents.get(transactionId) || [];
    const newEvent: TransactionEvent = {
      id: CryptoUtils.generateToken(),
      transaction_id: transactionId,
      type,
      data,
      created_at: new Date()
    };
    
    events.push(newEvent);
    this.transactionEvents.set(transactionId, events);
  }

  // Payment Tokens
  async createPaymentToken(token: Omit<PaymentToken, 'id' | 'created_at'>): Promise<PaymentToken> {
    const id = CryptoUtils.generateToken();
    const newToken: PaymentToken = {
      ...token,
      id,
      created_at: new Date()
    };
    this.paymentTokens.set(id, newToken);
    return newToken;
  }

  async getPaymentToken(token: string): Promise<PaymentToken | null> {
    const tokens = Array.from(this.paymentTokens.values());
    return tokens.find(t => t.token === token) || null;
  }

  // Users
  async createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const id = CryptoUtils.generateToken();
    const newUser: User = {
      ...user,
      id,
      created_at: new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = Array.from(this.users.values());
    return users.find(u => u.email === email) || null;
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  // Webhooks
  async createWebhook(webhook: Omit<Webhook, 'id' | 'created_at'>): Promise<Webhook> {
    const id = CryptoUtils.generateToken();
    const newWebhook: Webhook = {
      ...webhook,
      id,
      created_at: new Date()
    };
    this.webhooks.set(id, newWebhook);
    return newWebhook;
  }

  async getWebhooksByMerchant(merchantId: string): Promise<Webhook[]> {
    const webhooks = Array.from(this.webhooks.values());
    return webhooks.filter(w => w.merchant_id === merchantId && w.status === 'active');
  }

  // Fraud Rules
  async createFraudRule(rule: Omit<FraudRule, 'id'>): Promise<FraudRule> {
    const id = CryptoUtils.generateToken();
    const newRule: FraudRule = { ...rule, id };
    this.fraudRules.set(id, newRule);
    return newRule;
  }

  async getFraudRules(): Promise<FraudRule[]> {
    return Array.from(this.fraudRules.values()).filter(r => r.active);
  }

  async createFraudScore(score: FraudScore): Promise<void> {
    this.fraudScores.set(score.transaction_id, score);
  }

  async getFraudScore(transactionId: string): Promise<FraudScore | null> {
    return this.fraudScores.get(transactionId) || null;
  }

  // Settlements
  async createSettlement(settlement: Omit<Settlement, 'id' | 'created_at'>): Promise<Settlement> {
    const id = CryptoUtils.generateToken();
    const newSettlement: Settlement = {
      ...settlement,
      id,
      created_at: new Date()
    };
    this.settlements.set(id, newSettlement);
    return newSettlement;
  }

  async listSettlements(merchantId?: string): Promise<Settlement[]> {
    let settlements = Array.from(this.settlements.values());
    if (merchantId) {
      settlements = settlements.filter(s => s.merchant_id === merchantId);
    }
    return settlements;
  }

  // Dados iniciais para demonstração
  private async seedData(): Promise<void> {
    // Criar merchant de demonstração
    const demoMerchant = await this.createMerchant({
      legal_name: 'Loja Demo LTDA',
      tax_id: '12.345.678/0001-90',
      status: 'active',
      onboarding_data: {
        business_type: 'ecommerce',
        monthly_volume: 100000
      },
      kyc_level: 'intermediate'
    });

    // Criar usuário admin
    await this.createUser({
      email: 'admin@gateway.com',
      name: 'Admin Gateway',
      role: 'admin'
    });

    // Criar usuário merchant
    await this.createUser({
      email: 'merchant@demo.com',
      name: 'Merchant Demo',
      role: 'merchant',
      merchant_id: demoMerchant.id
    });

    // Criar regras de fraude básicas
    await this.createFraudRule({
      name: 'High Amount Transaction',
      description: 'Transações acima de R$ 5.000',
      conditions: { amount_gt: 500000 },
      action: 'review',
      priority: 1,
      active: true
    });

    await this.createFraudRule({
      name: 'Multiple Attempts',
      description: 'Múltiplas tentativas em pouco tempo',
      conditions: { velocity_check: true },
      action: 'block',
      priority: 2,
      active: true
    });

    // Criar webhook de exemplo
    await this.createWebhook({
      merchant_id: demoMerchant.id,
      url: 'https://webhook.site/demo',
      secret: CryptoUtils.generateToken(),
      events: ['payment.authorized', 'payment.captured', 'payment.failed'],
      status: 'active'
    });

    // Criar algumas transações de exemplo
    const sampleTransactions = [
      {
        merchant_id: demoMerchant.id,
        amount: 9990,
        currency: 'BRL',
        method: { type: 'card' as const },
        status: 'captured' as const,
        idempotency_key: 'demo-1'
      },
      {
        merchant_id: demoMerchant.id,
        amount: 4990,
        currency: 'BRL',
        method: { type: 'pix' as const },
        status: 'pending' as const,
        idempotency_key: 'demo-2'
      },
      {
        merchant_id: demoMerchant.id,
        amount: 19990,
        currency: 'BRL',
        method: { type: 'boleto' as const },
        status: 'pending' as const,
        idempotency_key: 'demo-3'
      }
    ];

    for (const transaction of sampleTransactions) {
      await this.createTransaction(transaction);
    }
  }
}

// Instância singleton do banco de dados
export const db = new InMemoryDatabase();