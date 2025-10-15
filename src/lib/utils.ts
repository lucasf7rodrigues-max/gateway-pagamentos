import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto-js';
import QRCode from 'qrcode';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Função utilitária para combinar classes CSS (shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Configurações do sistema
export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_EXPIRES_IN: '24h',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'your-32-char-encryption-key-here',
  API_VERSION: 'v1',
  SUPPORTED_CURRENCIES: ['BRL', 'USD', 'EUR'],
  SUPPORTED_PAYMENT_METHODS: ['card', 'pix', 'boleto', 'wallet'],
  FRAUD_SCORE_THRESHOLD: 70,
  MAX_TRANSACTION_AMOUNT: 1000000, // R$ 10.000,00 em centavos
  WEBHOOK_TIMEOUT: 30000, // 30 segundos
};

// Utilitários de criptografia
export const CryptoUtils = {
  encrypt: (text: string): string => {
    return crypto.AES.encrypt(text, CONFIG.ENCRYPTION_KEY).toString();
  },

  decrypt: (encryptedText: string): string => {
    const bytes = crypto.AES.decrypt(encryptedText, CONFIG.ENCRYPTION_KEY);
    return bytes.toString(crypto.enc.Utf8);
  },

  hash: (text: string): string => {
    return bcrypt.hashSync(text, 10);
  },

  compareHash: (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash);
  },

  generateToken: (): string => {
    return uuidv4().replace(/-/g, '');
  },

  generateApiKey: (): string => {
    return 'pk_' + crypto.lib.WordArray.random(32).toString();
  },

  generateSecretKey: (): string => {
    return 'sk_' + crypto.lib.WordArray.random(32).toString();
  }
};

// Utilitários JWT
export const JWTUtils = {
  sign: (payload: any): string => {
    return jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: CONFIG.JWT_EXPIRES_IN });
  },

  verify: (token: string): any => {
    try {
      return jwt.verify(token, CONFIG.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  decode: (token: string): any => {
    return jwt.decode(token);
  }
};

// Utilitários de validação
export const ValidationUtils = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidCPF: (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  },

  isValidCNPJ: (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]/g, '');
    if (cnpj.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    
    // Validação do CNPJ
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;
    
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1))) return false;
    
    return true;
  },

  isValidCardNumber: (cardNumber: string): boolean => {
    cardNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) return false;
    
    // Algoritmo de Luhn
    let sum = 0;
    let alternate = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let n = parseInt(cardNumber.charAt(i));
      
      if (alternate) {
        n *= 2;
        if (n > 9) n = (n % 10) + 1;
      }
      
      sum += n;
      alternate = !alternate;
    }
    
    return sum % 10 === 0;
  },

  getCardScheme: (cardNumber: string): string => {
    cardNumber = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cardNumber)) return 'visa';
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard';
    if (/^3[47]/.test(cardNumber)) return 'amex';
    if (/^6011|^65/.test(cardNumber)) return 'discover';
    if (/^4011|^4312|^4389|^4514|^4573/.test(cardNumber)) return 'elo';
    
    return 'unknown';
  }
};

// Utilitários de formatação
export const FormatUtils = {
  formatCurrency: (amount: number, currency: string = 'BRL'): string => {
    const value = amount / 100; // Converte centavos para reais
    
    switch (currency) {
      case 'BRL':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'EUR':
        return new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }).format(value);
      default:
        return `${currency} ${value.toFixed(2)}`;
    }
  },

  formatCPF: (cpf: string): string => {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  formatCNPJ: (cnpj: string): string => {
    cnpj = cnpj.replace(/[^\d]/g, '');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  },

  maskCardNumber: (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\s/g, '');
    const last4 = cleaned.slice(-4);
    return `****-****-****-${last4}`;
  }
};

// Utilitários PIX
export const PixUtils = {
  generateQRCode: async (pixKey: string, amount: number, description?: string): Promise<string> => {
    // Payload PIX simplificado para demonstração
    const payload = {
      pixKey,
      amount: amount / 100, // Converte centavos para reais
      description: description || 'Pagamento via PIX',
      txid: uuidv4()
    };
    
    const qrData = JSON.stringify(payload);
    return await QRCode.toDataURL(qrData);
  },

  validatePixKey: (key: string, type: string): boolean => {
    switch (type) {
      case 'cpf':
        return ValidationUtils.isValidCPF(key);
      case 'cnpj':
        return ValidationUtils.isValidCNPJ(key);
      case 'email':
        return ValidationUtils.isValidEmail(key);
      case 'phone':
        return /^\+55\d{10,11}$/.test(key);
      case 'random':
        return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(key);
      default:
        return false;
    }
  }
};

// Utilitários de data
export const DateUtils = {
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  formatDate: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  isExpired: (date: Date): boolean => {
    return date < new Date();
  }
};

// Utilitários de resposta da API
export const ResponseUtils = {
  success: <T>(data: T, meta?: any) => ({
    success: true,
    data,
    meta
  }),

  error: (code: string, message: string, details?: any) => ({
    success: false,
    error: {
      code,
      message,
      details
    }
  }),

  paginated: <T>(data: T[], page: number, limit: number, total: number) => ({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
};

// Simulador de acquirers/PSPs
export const AcquirerSimulator = {
  processCard: async (cardData: any, amount: number): Promise<any> => {
    // Simula processamento com delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simula diferentes cenários baseado no último dígito do cartão
    const lastDigit = parseInt(cardData.number.slice(-1));
    
    if (lastDigit === 0) {
      return {
        status: 'failed',
        error_code: 'insufficient_funds',
        error_message: 'Saldo insuficiente'
      };
    } else if (lastDigit === 1) {
      return {
        status: 'failed',
        error_code: 'card_declined',
        error_message: 'Cartão recusado pelo banco'
      };
    } else {
      return {
        status: 'authorized',
        authorization_code: CryptoUtils.generateToken().substring(0, 6).toUpperCase(),
        acquirer_reference: `acq_${uuidv4()}`,
        network_reference: `net_${uuidv4()}`
      };
    }
  },

  processPix: async (pixData: any, amount: number): Promise<any> => {
    // Simula processamento PIX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      status: 'pending',
      pix_key: pixData.key || 'pix@gateway.com',
      qr_code: await PixUtils.generateQRCode(pixData.key || 'pix@gateway.com', amount),
      expires_at: DateUtils.addDays(new Date(), 1)
    };
  }
};