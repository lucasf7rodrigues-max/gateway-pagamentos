// Types para o Gateway de Pagamentos

export interface Merchant {
  id: string;
  legal_name: string;
  tax_id: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  onboarding_data: Record<string, any>;
  kyc_level: 'basic' | 'intermediate' | 'advanced';
  created_at: Date;
  updated_at: Date;
}

export interface Account {
  id: string;
  merchant_id: string;
  type: 'main' | 'sub';
  currency: 'BRL' | 'USD' | 'EUR';
  balance: number;
  settlement_schedule: 'daily' | 'weekly' | 'monthly';
  created_at: Date;
}

export interface PaymentMethod {
  type: 'card' | 'pix' | 'boleto' | 'wallet';
  token?: string;
  card_data?: {
    number: string;
    holder_name: string;
    expiry_month: number;
    expiry_year: number;
    cvv: string;
  };
  pix_data?: {
    key?: string;
    key_type?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  };
}

export interface Transaction {
  id: string;
  merchant_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: 'pending' | 'authorized' | 'captured' | 'failed' | 'cancelled' | 'refunded';
  acquirer_id?: string;
  acquirer_reference?: string;
  metadata?: Record<string, any>;
  idempotency_key: string;
  created_at: Date;
  updated_at: Date;
  events: TransactionEvent[];
}

export interface TransactionEvent {
  id: string;
  transaction_id: string;
  type: 'created' | 'authorized' | 'captured' | 'failed' | 'cancelled' | 'refunded';
  data: Record<string, any>;
  created_at: Date;
}

export interface PaymentToken {
  id: string;
  merchant_id: string;
  token: string;
  scheme: 'visa' | 'mastercard' | 'amex' | 'elo';
  expiry: Date;
  last4: string;
  created_at: Date;
}

export interface Settlement {
  id: string;
  merchant_id: string;
  period_start: Date;
  period_end: Date;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: Date;
}

export interface Webhook {
  id: string;
  merchant_id: string;
  url: string;
  secret: string;
  events: string[];
  status: 'active' | 'inactive';
  created_at: Date;
}

export interface CreatePaymentRequest {
  merchant_id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  capture?: boolean;
  metadata?: Record<string, any>;
  idempotency_key: string;
}

export interface CreatePaymentResponse {
  transaction_id: string;
  status: string;
  amount: number;
  currency: string;
  payment_method: {
    type: string;
    last4?: string;
  };
  pix_qr_code?: string;
  boleto_url?: string;
  created_at: string;
}

export interface FraudRule {
  id: string;
  name: string;
  description: string;
  conditions: Record<string, any>;
  action: 'allow' | 'review' | 'block';
  priority: number;
  active: boolean;
}

export interface FraudScore {
  transaction_id: string;
  score: number;
  rules_triggered: string[];
  recommendation: 'allow' | 'review' | 'block';
  created_at: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'merchant' | 'merchant_user' | 'integrator';
  merchant_id?: string;
  created_at: Date;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}