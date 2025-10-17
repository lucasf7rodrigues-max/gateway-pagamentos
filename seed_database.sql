-- Script de Seed para popular o banco de dados com dados de teste

-- Inserir um merchant de teste
INSERT INTO merchants (legal_name, tax_id, status, onboarding_data, kyc_level)
VALUES 
  ('Empresa Hot Nicho LTDA', '12345678901234', 'active', '{"business_type": "ecommerce", "website": "https://exemplo.com"}', 'advanced'),
  ('Loja Teste Hot', '98765432109876', 'active', '{"business_type": "subscription", "website": "https://teste.com"}', 'intermediate')
ON CONFLICT (tax_id) DO NOTHING;

-- Inserir regras de fraude de exemplo
INSERT INTO fraud_rules (name, description, conditions, action, priority, active)
VALUES 
  ('Alto Valor', 'Transações acima de R$ 5.000', '{"amount_gt": 500000}', 'review', 5, true),
  ('Múltiplas Tentativas', 'Múltiplas tentativas de pagamento em curto período', '{"attempts_gt": 3, "period_minutes": 10}', 'block', 8, true),
  ('País Suspeito', 'Transações de países de alto risco', '{"country_in": ["NG", "GH", "CI"]}', 'block', 10, true)
ON CONFLICT DO NOTHING;

-- Inserir um usuário admin de teste
INSERT INTO users (email, name, role)
VALUES 
  ('admin@gateway.com', 'Administrador', 'admin'),
  ('merchant@teste.com', 'Merchant Teste', 'merchant')
ON CONFLICT (email) DO NOTHING;

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_transactions_merchant_id ON transactions(merchant_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_transactions_idempotency_key ON transactions(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_transaction_events_transaction_id ON transaction_events(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payment_tokens_merchant_id ON payment_tokens(merchant_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_merchant_id ON webhooks(merchant_id);

-- Mensagem de sucesso
SELECT 'Banco de dados populado com sucesso!' as message;

