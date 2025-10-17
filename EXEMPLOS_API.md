# Exemplos de Requisições da API

## 🔍 Health Check

Verificar se a API está funcionando:

```bash
curl http://localhost:3000/api/v1/health
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-10-17T05:26:54.201Z",
    "version": "1.0.0",
    "services": {
      "database": "healthy",
      "payment_processor": "healthy",
      "fraud_engine": "healthy",
      "webhook_service": "healthy"
    }
  }
}
```

---

## 🔑 Autenticação

### Obter Token JWT

**Nota**: Para usar esta rota, você precisa primeiro criar credenciais OAuth no banco de dados.

```bash
curl -X POST http://localhost:3000/api/v1/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "seu_client_id",
    "client_secret": "seu_client_secret"
  }'
```

**Para testes**, você pode gerar um token JWT manualmente usando o secret configurado em `.env.local`:

```javascript
// No Node.js
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { merchant_id: 'seu_merchant_id', scope: 'payments:read payments:write' },
  'your-super-secret-jwt-key-change-in-production',
  { expiresIn: '24h' }
);
console.log(token);
```

---

## 🏪 Merchants

### Criar Merchant

```bash
curl -X POST http://localhost:3000/api/v1/merchants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "legal_name": "Minha Loja Hot",
    "tax_id": "12345678901234",
    "onboarding_data": {
      "business_type": "ecommerce",
      "website": "https://minhaloja.com"
    }
  }'
```

---

## 💳 Pagamentos

### 1. Criar Pagamento com Cartão (Simulador)

```bash
curl -X POST http://localhost:3000/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Idempotency-Key: unique-key-123456" \
  -d '{
    "amount": 10000,
    "currency": "BRL",
    "payment_method": {
      "type": "card",
      "card_data": {
        "number": "4111111111111112",
        "holder_name": "JOAO DA SILVA",
        "expiry_month": 12,
        "expiry_year": 25,
        "cvv": "123"
      }
    },
    "capture": true,
    "metadata": {
      "order_id": "ORDER-12345",
      "customer_id": "CUST-67890"
    }
  }'
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "captured",
    "amount": 10000,
    "currency": "BRL",
    "payment_method": {
      "type": "card",
      "last4": "1112"
    },
    "created_at": "2025-10-17T05:30:00.000Z"
  }
}
```

### 2. Criar Pagamento PIX

```bash
curl -X POST http://localhost:3000/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Idempotency-Key: unique-key-pix-123" \
  -d '{
    "amount": 5000,
    "currency": "BRL",
    "payment_method": {
      "type": "pix",
      "pix_data": {
        "key": "pix@minhaloja.com",
        "key_type": "email"
      }
    },
    "capture": true,
    "metadata": {
      "order_id": "ORDER-PIX-001"
    }
  }'
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "660e8400-e29b-41d4-a716-446655440001",
    "status": "pending",
    "amount": 5000,
    "currency": "BRL",
    "payment_method": {
      "type": "pix"
    },
    "pix_qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "created_at": "2025-10-17T05:35:00.000Z"
  }
}
```

### 3. Criar Pagamento com Mercado Pago

**Pré-requisito**: Você precisa ter um token gerado pelo SDK do Mercado Pago no frontend.

```bash
curl -X POST http://localhost:3000/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Idempotency-Key: unique-key-mp-456" \
  -d '{
    "amount": 15000,
    "currency": "BRL",
    "payment_method": {
      "type": "mercadopago",
      "mercadopago_data": {
        "token": "ff8080814c11e237014c1ff593b57b4d",
        "payment_method_id": "visa",
        "installments": 3,
        "issuer_id": "25"
      }
    },
    "customer": {
      "email": "cliente@example.com",
      "name": "Maria Silva",
      "document": "12345678900"
    },
    "capture": true,
    "metadata": {
      "order_id": "ORDER-MP-001"
    }
  }'
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "770e8400-e29b-41d4-a716-446655440002",
    "status": "captured",
    "amount": 15000,
    "currency": "BRL",
    "payment_method": {
      "type": "mercadopago"
    },
    "created_at": "2025-10-17T05:40:00.000Z"
  }
}
```

### 4. Listar Pagamentos

```bash
curl -X GET "http://localhost:3000/api/v1/payments?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "merchant_id": "merchant-123",
      "amount": 10000,
      "currency": "BRL",
      "status": "captured",
      "created_at": "2025-10-17T05:30:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### 5. Consultar Pagamento Específico

```bash
curl -X GET http://localhost:3000/api/v1/payments/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### 6. Capturar Pagamento Autorizado

```bash
curl -X POST http://localhost:3000/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/capture \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "amount": 10000
  }'
```

### 7. Reembolsar Pagamento

```bash
curl -X POST http://localhost:3000/api/v1/payments/550e8400-e29b-41d4-a716-446655440000/refund \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "amount": 5000
  }'
```

---

## 🔐 Tokenização

### Tokenizar Cartão

```bash
curl -X POST http://localhost:3000/api/v1/tokens \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "card_data": {
      "number": "4111111111111111",
      "holder_name": "JOAO DA SILVA",
      "expiry_month": 12,
      "expiry_year": 25,
      "cvv": "123"
    }
  }'
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "token": "tok_a1b2c3d4e5f6g7h8i9j0",
    "scheme": "visa",
    "last4": "1111",
    "expiry": "2025-12-01"
  }
}
```

### Usar Token em Pagamento

```bash
curl -X POST http://localhost:3000/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Idempotency-Key: unique-key-token-789" \
  -d '{
    "amount": 20000,
    "currency": "BRL",
    "payment_method": {
      "type": "card",
      "token": "tok_a1b2c3d4e5f6g7h8i9j0"
    },
    "capture": true
  }'
```

---

## 🔔 Webhooks

### Criar Webhook

```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "url": "https://seu-site.com/webhooks/pagamentos",
    "events": [
      "payment.created",
      "payment.captured",
      "payment.refunded"
    ],
    "secret": "webhook_secret_123456"
  }'
```

---

## 🧪 Cenários de Teste

### Cartões de Teste (Simulador)

Use estes números de cartão para testar diferentes cenários:

| Número do Cartão      | Resultado                |
|-----------------------|--------------------------|
| 4111111111111110      | Saldo insuficiente       |
| 4111111111111111      | Cartão recusado          |
| 4111111111111112      | ✅ Autorizado com sucesso |
| 5555555555554444      | ✅ Autorizado com sucesso |
| 378282246310005       | ✅ Autorizado com sucesso |

### Teste de Idempotência

Envie a mesma requisição duas vezes com a mesma `Idempotency-Key`:

```bash
# Primeira requisição
curl -X POST http://localhost:3000/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Idempotency-Key: test-idempotency-001" \
  -d '{
    "amount": 10000,
    "currency": "BRL",
    "payment_method": {
      "type": "card",
      "card_data": {
        "number": "4111111111111112",
        "holder_name": "TESTE",
        "expiry_month": 12,
        "expiry_year": 25,
        "cvv": "123"
      }
    },
    "capture": true
  }'

# Segunda requisição (mesma Idempotency-Key)
# Deve retornar a mesma transação sem criar uma nova
curl -X POST http://localhost:3000/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Idempotency-Key: test-idempotency-001" \
  -d '{
    "amount": 10000,
    "currency": "BRL",
    "payment_method": {
      "type": "card",
      "card_data": {
        "number": "4111111111111112",
        "holder_name": "TESTE",
        "expiry_month": 12,
        "expiry_year": 25,
        "cvv": "123"
      }
    },
    "capture": true
  }'
```

---

## ⚠️ Tratamento de Erros

### Erro 400 - Bad Request

```json
{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "Invalid card number"
  }
}
```

### Erro 401 - Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "unauthorized",
    "message": "Invalid or missing authorization"
  }
}
```

### Erro 403 - Forbidden

```json
{
  "success": false,
  "error": {
    "code": "transaction_blocked",
    "message": "Transaction blocked by fraud detection"
  }
}
```

### Erro 500 - Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "server_error",
    "message": "Internal server error"
  }
}
```

---

## 📝 Notas Importantes

1. **Sempre use HTTPS em produção**
2. **Nunca exponha seu JWT secret ou tokens de API**
3. **Use chaves de idempotência únicas para cada requisição**
4. **Valores de `amount` devem estar em centavos**
5. **Configure webhooks para receber notificações em tempo real**

---

**Gateway de Pagamentos - Nicho Hot** 🔥

