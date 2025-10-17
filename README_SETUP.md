# Gateway de Pagamentos - Configuração e Uso

## 🚀 Visão Geral

Este é um gateway de pagamentos completo desenvolvido para o nicho hot, com integração ao **Supabase** (banco de dados) e **Mercado Pago** (processamento de pagamentos).

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Token de acesso do Mercado Pago

## ⚙️ Configuração

### 1. Configurar o Supabase

1. Acesse seu projeto Supabase: https://axlumauuwysubcjzbavb.supabase.co
2. Vá para **SQL Editor** no menu lateral
3. Copie todo o conteúdo do arquivo `supabase_schema.sql`
4. Cole no SQL Editor e clique em **Run** para criar as tabelas

### 2. Configurar Variáveis de Ambiente

O arquivo `.env.local` já está configurado com as credenciais do Supabase. Você precisa adicionar seu token do Mercado Pago:

```bash
# Supabase (já configurado)
NEXT_PUBLIC_SUPABASE_URL=https://axlumauuwysubcjzbavb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Mercado Pago (ADICIONE SEU TOKEN AQUI)
MERCADOPAGO_ACCESS_TOKEN=SEU_TOKEN_DO_MERCADO_PAGO
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Projeto

**Modo de desenvolvimento:**
```bash
npm run dev
```

**Build de produção:**
```bash
npm run build
npm start
```

O servidor estará disponível em: http://localhost:3000

## 🔑 Autenticação

Todas as rotas da API requerem autenticação via JWT. Para obter um token:

```bash
POST /api/v1/oauth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "seu_client_id",
  "client_secret": "seu_client_secret"
}
```

## 💳 Métodos de Pagamento Suportados

1. **Cartão de Crédito** (`card`)
2. **PIX** (`pix`)
3. **Boleto** (`boleto`)
4. **Mercado Pago** (`mercadopago`) - **NOVO!**

## 📡 Endpoints Principais

### Criar Pagamento

```bash
POST /api/v1/payments
Authorization: Bearer {seu_token_jwt}
Content-Type: application/json
Idempotency-Key: {chave_unica}

{
  "amount": 10000,
  "currency": "BRL",
  "payment_method": {
    "type": "mercadopago",
    "mercadopago_data": {
      "token": "token_do_cartao_gerado_pelo_mp_sdk",
      "payment_method_id": "visa",
      "installments": 1,
      "issuer_id": "123"
    }
  },
  "customer": {
    "email": "cliente@example.com",
    "name": "Nome do Cliente"
  },
  "capture": true,
  "metadata": {
    "order_id": "12345"
  }
}
```

### Listar Pagamentos

```bash
GET /api/v1/payments?page=1&limit=10
Authorization: Bearer {seu_token_jwt}
```

### Capturar Pagamento

```bash
POST /api/v1/payments/{transaction_id}/capture
Authorization: Bearer {seu_token_jwt}
Content-Type: application/json

{
  "amount": 10000
}
```

### Reembolsar Pagamento

```bash
POST /api/v1/payments/{transaction_id}/refund
Authorization: Bearer {seu_token_jwt}
Content-Type: application/json

{
  "amount": 10000
}
```

## 🔐 Tokenização de Cartões

Para tokenizar um cartão (PCI-compliant):

```bash
POST /api/v1/tokens
Authorization: Bearer {seu_token_jwt}
Content-Type: application/json

{
  "card_data": {
    "number": "4111111111111111",
    "holder_name": "NOME DO TITULAR",
    "expiry_month": 12,
    "expiry_year": 25,
    "cvv": "123"
  }
}
```

## 🎯 Integração com Mercado Pago

### Fluxo de Pagamento

1. **Frontend**: Use o SDK do Mercado Pago para tokenizar os dados do cartão
2. **Backend**: Envie o token gerado para o endpoint `/api/v1/payments` com `type: "mercadopago"`
3. **Gateway**: O gateway processa o pagamento via API do Mercado Pago
4. **Webhook**: O Mercado Pago envia notificações para `/api/v1/webhooks/mercadopago`

### Exemplo de Integração Frontend

```html
<script src="https://sdk.mercadopago.com/js/v2"></script>
<script>
const mp = new MercadoPago('YOUR_PUBLIC_KEY');
const cardForm = mp.cardForm({
  amount: "100.00",
  iframe: true,
  form: {
    id: "form-checkout",
    cardNumber: {
      id: "form-checkout__cardNumber",
      placeholder: "Número do cartão",
    },
    expirationDate: {
      id: "form-checkout__expirationDate",
      placeholder: "MM/YY",
    },
    securityCode: {
      id: "form-checkout__securityCode",
      placeholder: "CVV",
    },
    cardholderName: {
      id: "form-checkout__cardholderName",
      placeholder: "Titular do cartão",
    },
    issuer: {
      id: "form-checkout__issuer",
      placeholder: "Banco emissor",
    },
    installments: {
      id: "form-checkout__installments",
      placeholder: "Parcelas",
    },
    identificationType: {
      id: "form-checkout__identificationType",
      placeholder: "Tipo de documento",
    },
    identificationNumber: {
      id: "form-checkout__identificationNumber",
      placeholder: "Número do documento",
    },
    cardholderEmail: {
      id: "form-checkout__cardholderEmail",
      placeholder: "E-mail",
    },
  },
  callbacks: {
    onFormMounted: error => {
      if (error) return console.warn("Form Mounted handling error: ", error);
      console.log("Form mounted");
    },
    onSubmit: event => {
      event.preventDefault();

      const {
        paymentMethodId: payment_method_id,
        issuerId: issuer_id,
        cardholderEmail: email,
        amount,
        token,
        installments,
        identificationNumber,
        identificationType,
      } = cardForm.getCardFormData();

      // Enviar para seu backend
      fetch("/api/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_JWT_TOKEN",
          "Idempotency-Key": generateUniqueKey()
        },
        body: JSON.stringify({
          amount: amount * 100, // Converter para centavos
          currency: "BRL",
          payment_method: {
            type: "mercadopago",
            mercadopago_data: {
              token,
              payment_method_id,
              installments,
              issuer_id
            }
          },
          customer: {
            email,
            document: identificationNumber
          },
          capture: true
        }),
      });
    },
  },
});
</script>
```

## 🛡️ Segurança

- ✅ Autenticação JWT obrigatória
- ✅ Chaves de idempotência para evitar duplicação de pagamentos
- ✅ Tokenização de cartões (PCI-compliant)
- ✅ Análise de fraude integrada
- ✅ Webhooks com assinatura HMAC
- ✅ Criptografia de dados sensíveis

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

- `merchants` - Comerciantes/Lojistas
- `transactions` - Transações de pagamento
- `transaction_events` - Histórico de eventos das transações
- `payment_tokens` - Tokens de cartões tokenizados
- `settlements` - Liquidações financeiras
- `webhooks` - Configuração de webhooks
- `fraud_rules` - Regras de detecção de fraude
- `fraud_scores` - Pontuações de fraude
- `users` - Usuários do sistema

## 🔄 Webhooks

Configure webhooks para receber notificações de eventos:

```bash
POST /api/v1/webhooks
Authorization: Bearer {seu_token_jwt}
Content-Type: application/json

{
  "url": "https://seu-site.com/webhooks/pagamentos",
  "events": ["payment.created", "payment.captured", "payment.refunded"],
  "secret": "seu_secret_para_validacao"
}
```

### Eventos Disponíveis

- `payment.created` - Pagamento criado
- `payment.authorized` - Pagamento autorizado
- `payment.captured` - Pagamento capturado
- `payment.failed` - Pagamento falhou
- `payment.cancelled` - Pagamento cancelado
- `payment.refunded` - Pagamento reembolsado

## 🧪 Testes

### Cartões de Teste (Simulador)

Para testar o gateway sem usar o Mercado Pago, use o método `card`:

- **Último dígito 0**: Saldo insuficiente
- **Último dígito 1**: Cartão recusado
- **Outros dígitos**: Autorizado com sucesso

Exemplo:
```
4111111111111112 - Será autorizado
4111111111111110 - Saldo insuficiente
4111111111111111 - Cartão recusado
```

## 📝 Notas Importantes

1. **Mercado Pago Token**: O token do Mercado Pago deve ser obtido no ambiente de produção ou sandbox do Mercado Pago
2. **Idempotência**: Sempre envie uma chave única no header `Idempotency-Key` para evitar duplicação de pagamentos
3. **Valores**: Todos os valores de `amount` devem ser em **centavos** (ex: R$ 100,00 = 10000)
4. **Webhooks**: Configure a URL de notificação do Mercado Pago para `/api/v1/webhooks/mercadopago`

## 🐛 Troubleshooting

### Erro: "Missing Supabase URL or Anon Key"
- Verifique se o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor após alterar variáveis de ambiente

### Erro: "Mercado Pago access token is not configured"
- Adicione seu token do Mercado Pago no `.env.local`
- Certifique-se de que a variável se chama `MERCADOPAGO_ACCESS_TOKEN`

### Erro: "Merchant not found"
- Crie um merchant no banco de dados antes de fazer pagamentos
- Use o endpoint `/api/v1/merchants` para criar um merchant

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Supabase e do Mercado Pago:

- [Supabase Docs](https://supabase.com/docs)
- [Mercado Pago Docs](https://www.mercadopago.com.br/developers)

---

**Desenvolvido para o nicho hot** 🔥

