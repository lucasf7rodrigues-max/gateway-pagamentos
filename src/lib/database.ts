import { createClient, SupabaseClient } from '@supabase/supabase-js';
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key environment variables');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseDatabase {
  private supabaseClient: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.supabaseClient = client;
  }

  // Merchants
  async createMerchant(merchant: Omit<Merchant, 'id' | 'created_at' | 'updated_at'>): Promise<Merchant> {
    const { data, error } = await this.supabaseClient
      .from('merchants')
      .insert({
        legal_name: merchant.legal_name,
        tax_id: merchant.tax_id,
        status: merchant.status,
        onboarding_data: merchant.onboarding_data,
        kyc_level: merchant.kyc_level,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Merchant;
  }

  async getMerchant(id: string): Promise<Merchant | null> {
    const { data, error } = await this.supabaseClient
      .from('merchants')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows found
    return data as Merchant | null;
  }

  async updateMerchant(id: string, updates: Partial<Merchant>): Promise<Merchant | null> {
    const { data, error } = await this.supabaseClient
      .from('merchants')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Merchant | null;
  }

  async listMerchants(page: number = 1, limit: number = 10): Promise<{ merchants: Merchant[], total: number }> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await this.supabaseClient
      .from('merchants')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { merchants: data as Merchant[], total: count || 0 };
  }

  // Transactions
  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'events'>): Promise<Transaction> {
    const { data, error } = await this.supabaseClient
      .from('transactions')
      .insert({
        merchant_id: transaction.merchant_id,
        amount: transaction.amount,
        currency: transaction.currency,
        method: transaction.method,
        status: transaction.status,
        acquirer_id: transaction.acquirer_id,
        acquirer_reference: transaction.acquirer_reference,
        metadata: transaction.metadata,
        idempotency_key: transaction.idempotency_key,
      })
      .select()
      .single();

    if (error) throw error;
    const newTransaction = data as Transaction;
    await this.addTransactionEvent(newTransaction.id, 'created', { initial_status: transaction.status });
    return { ...newTransaction, events: [] };
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    const { data: transactionData, error: transactionError } = await this.supabaseClient
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (transactionError && transactionError.code !== 'PGRST116') throw transactionError;
    if (!transactionData) return null;

    const { data: eventsData, error: eventsError } = await this.supabaseClient
      .from('transaction_events')
      .select('*')
      .eq('transaction_id', id)
      .order('created_at', { ascending: true });

    if (eventsError) throw eventsError;

    return { ...transactionData, events: eventsData || [] } as Transaction;
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | null> {
    const existingTransaction = await this.getTransaction(id);
    if (!existingTransaction) return null;

    const { data, error } = await this.supabaseClient
      .from('transactions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    const updatedTransaction = data as Transaction;

    if (updates.status && updates.status !== existingTransaction.status) {
      await this.addTransactionEvent(id, updates.status as any, updates);
    }

    return { ...updatedTransaction, events: existingTransaction.events };
  }

  async listTransactions(merchantId?: string, page: number = 1, limit: number = 10): Promise<{ transactions: Transaction[], total: number }> {
    const offset = (page - 1) * limit;
    let query = this.supabaseClient
      .from('transactions')
      .select('*', { count: 'exact' });

    if (merchantId) {
      query = query.eq('merchant_id', merchantId);
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw error;
    return { transactions: data as Transaction[], total: count || 0 };
  }

  async addTransactionEvent(transactionId: string, type: TransactionEvent['type'], data: Record<string, any>): Promise<void> {
    const { error } = await this.supabaseClient
      .from('transaction_events')
      .insert({
        transaction_id: transactionId,
        type,
        data,
      });

    if (error) throw error;
  }

  // Payment Tokens
  async createPaymentToken(token: Omit<PaymentToken, 'id' | 'created_at'>): Promise<PaymentToken> {
    const { data, error } = await this.supabaseClient
      .from('payment_tokens')
      .insert({
        merchant_id: token.merchant_id,
        token: token.token,
        scheme: token.scheme,
        expiry: token.expiry.toISOString(),
        last4: token.last4,
      })
      .select()
      .single();

    if (error) throw error;
    return data as PaymentToken;
  }

  async getPaymentToken(token: string): Promise<PaymentToken | null> {
    const { data, error } = await this.supabaseClient
      .from('payment_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as PaymentToken | null;
  }

  // Users
  async createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .insert({
        email: user.email,
        name: user.name,
        role: user.role,
        merchant_id: user.merchant_id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as User | null;
  }

  async getUser(id: string): Promise<User | null> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as User | null;
  }

  // Webhooks
  async createWebhook(webhook: Omit<Webhook, 'id' | 'created_at'>): Promise<Webhook> {
    const { data, error } = await this.supabaseClient
      .from('webhooks')
      .insert({
        merchant_id: webhook.merchant_id,
        url: webhook.url,
        secret: webhook.secret,
        events: webhook.events,
        status: webhook.status,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Webhook;
  }

  async getWebhooksByMerchant(merchantId: string): Promise<Webhook[]> {
    const { data, error } = await this.supabaseClient
      .from('webhooks')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('status', 'active');

    if (error) throw error;
    return data as Webhook[];
  }

  // Fraud Rules
  async createFraudRule(rule: Omit<FraudRule, 'id'>): Promise<FraudRule> {
    const { data, error } = await this.supabaseClient
      .from('fraud_rules')
      .insert({
        name: rule.name,
        description: rule.description,
        conditions: rule.conditions,
        action: rule.action,
        priority: rule.priority,
        active: rule.active,
      })
      .select()
      .single();

    if (error) throw error;
    return data as FraudRule;
  }

  async getFraudRules(): Promise<FraudRule[]> {
    const { data, error } = await this.supabaseClient
      .from('fraud_rules')
      .select('*')
      .eq('active', true);

    if (error) throw error;
    return data as FraudRule[];
  }

  async createFraudScore(score: Omit<FraudScore, 'created_at'>): Promise<FraudScore> {
    const { data, error } = await this.supabaseClient
      .from('fraud_scores')
      .insert({
        transaction_id: score.transaction_id,
        score: score.score,
        rules_triggered: score.rules_triggered,
        recommendation: score.recommendation,
      })
      .select()
      .single();

    if (error) throw error;
    return data as FraudScore;
  }

  async getFraudScore(transactionId: string): Promise<FraudScore | null> {
    const { data, error } = await this.supabaseClient
      .from('fraud_scores')
      .select('*')
      .eq('transaction_id', transactionId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as FraudScore | null;
  }

  // Settlements
  async createSettlement(settlement: Omit<Settlement, 'id' | 'created_at'>): Promise<Settlement> {
    const { data, error } = await this.supabaseClient
      .from('settlements')
      .insert({
        merchant_id: settlement.merchant_id,
        period_start: settlement.period_start.toISOString(),
        period_end: settlement.period_end.toISOString(),
        total_amount: settlement.total_amount,
        status: settlement.status,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Settlement;
  }

  async listSettlements(merchantId?: string): Promise<Settlement[]> {
    let query = this.supabaseClient
      .from('settlements')
      .select('*');

    if (merchantId) {
      query = query.eq('merchant_id', merchantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Settlement[];
  }
}

export const db = new SupabaseDatabase(supabase);

