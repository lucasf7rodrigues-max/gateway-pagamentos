"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Smartphone, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Shield, 
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { FormatUtils } from '@/lib/utils';

interface Transaction {
  id: string;
  merchant_id: string;
  amount: number;
  currency: string;
  method: { type: string };
  status: string;
  created_at: string;
}

interface PaymentStats {
  totalTransactions: number;
  totalVolume: number;
  successRate: number;
  pendingTransactions: number;
}

export default function PaymentGatewayDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    totalTransactions: 0,
    totalVolume: 0,
    successRate: 0,
    pendingTransactions: 0
  });
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('pk_demo_12345678901234567890');
  const [showApiKey, setShowApiKey] = useState(false);

  // Simular dados para demonstração
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn_001',
        merchant_id: 'merchant_demo',
        amount: 9990,
        currency: 'BRL',
        method: { type: 'card' },
        status: 'captured',
        created_at: new Date().toISOString()
      },
      {
        id: 'txn_002',
        merchant_id: 'merchant_demo',
        amount: 4990,
        currency: 'BRL',
        method: { type: 'pix' },
        status: 'pending',
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'txn_003',
        merchant_id: 'merchant_demo',
        amount: 19990,
        currency: 'BRL',
        method: { type: 'boleto' },
        status: 'pending',
        created_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'txn_004',
        merchant_id: 'merchant_demo',
        amount: 7500,
        currency: 'BRL',
        method: { type: 'card' },
        status: 'failed',
        created_at: new Date(Date.now() - 10800000).toISOString()
      }
    ];

    setTransactions(mockTransactions);
    
    const totalVolume = mockTransactions
      .filter(t => t.status === 'captured')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const successfulTransactions = mockTransactions.filter(t => t.status === 'captured').length;
    const successRate = (successfulTransactions / mockTransactions.length) * 100;
    const pendingTransactions = mockTransactions.filter(t => t.status === 'pending').length;

    setStats({
      totalTransactions: mockTransactions.length,
      totalVolume,
      successRate,
      pendingTransactions
    });
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'captured':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      captured: 'default',
      pending: 'secondary',
      failed: 'destructive',
      authorized: 'outline'
    };
    
    return (
      <Badge variant={variants[status] || 'outline'} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'pix':
        return <Smartphone className="h-4 w-4" />;
      case 'boleto':
        return <FileText className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCreatePayment = async (formData: FormData) => {
    setLoading(true);
    try {
      // Simular criação de pagamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        merchant_id: 'merchant_demo',
        amount: parseInt(formData.get('amount') as string) * 100,
        currency: formData.get('currency') as string,
        method: { type: formData.get('method') as string },
        status: 'pending',
        created_at: new Date().toISOString()
      };

      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      console.error('Error creating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gateway de Pagamentos
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Sistema completo de processamento de pagamentos
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                Sistema Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Transações</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{stats.totalTransactions}</div>
              <p className="text-xs text-blue-600 mt-1">+12% desde ontem</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {FormatUtils.formatCurrency(stats.totalVolume)}
              </div>
              <p className="text-xs text-green-600 mt-1">+8% desde ontem</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{stats.successRate.toFixed(1)}%</div>
              <p className="text-xs text-purple-600 mt-1">+2.1% desde ontem</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">{stats.pendingTransactions}</div>
              <p className="text-xs text-orange-600 mt-1">Aguardando processamento</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="create">Criar Pagamento</TabsTrigger>
            <TabsTrigger value="api">API & Docs</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Últimas transações processadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          {getMethodIcon(transaction.method.type)}
                          <div>
                            <p className="font-medium">{transaction.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">
                            {FormatUtils.formatCurrency(transaction.amount)}
                          </span>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pagamento</CardTitle>
                  <CardDescription>Distribuição por tipo de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Cartão de Crédito</span>
                      </div>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span>PIX</span>
                      </div>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Boleto</span>
                      </div>
                      <span className="font-semibold">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Todas as Transações</CardTitle>
                <CardDescription>Histórico completo de transações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(transaction.status)}
                        {getMethodIcon(transaction.method.type)}
                        <div>
                          <p className="font-medium">{transaction.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">
                          {FormatUtils.formatCurrency(transaction.amount)}
                        </span>
                        {getStatusBadge(transaction.status)}
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar Nova Transação</CardTitle>
                <CardDescription>Teste o gateway criando uma transação de exemplo</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleCreatePayment} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="99.90"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Moeda</Label>
                      <Select name="currency" defaultValue="BRL">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BRL">BRL - Real</SelectItem>
                          <SelectItem value="USD">USD - Dólar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="method">Método de Pagamento</Label>
                    <Select name="method" defaultValue="card">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Cartão de Crédito</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="boleto">Boleto Bancário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Processando...' : 'Criar Transação'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chaves da API</CardTitle>
                  <CardDescription>Suas credenciais de acesso à API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Chave Pública</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        value={showApiKey ? apiKey : apiKey.replace(/./g, '•')}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Mantenha suas chaves seguras. Nunca as compartilhe em código público.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Endpoints da API</CardTitle>
                  <CardDescription>Principais endpoints disponíveis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <code className="text-sm">POST /api/v1/payments</code>
                      <p className="text-xs text-muted-foreground mt-1">Criar pagamento</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <code className="text-sm">GET /api/v1/payments/:id</code>
                      <p className="text-xs text-muted-foreground mt-1">Consultar pagamento</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <code className="text-sm">POST /api/v1/payments/:id/capture</code>
                      <p className="text-xs text-muted-foreground mt-1">Capturar pagamento</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <code className="text-sm">POST /api/v1/tokens</code>
                      <p className="text-xs text-muted-foreground mt-1">Tokenizar cartão</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Exemplo de Integração</CardTitle>
                <CardDescription>Como integrar com o gateway</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>JavaScript/Node.js</Label>
                    <div className="mt-2 p-4 rounded-lg bg-slate-900 text-slate-100 overflow-x-auto">
                      <pre className="text-sm">
{`// 1. Obter token de acesso
const auth = await fetch('/api/v1/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    grant_type: 'client_credentials'
  })
});

// 2. Criar pagamento
const payment = await fetch('/api/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 9990, // R$ 99,90 em centavos
    currency: 'BRL',
    payment_method: { type: 'card', token: 'tok_...' },
    idempotency_key: 'unique-key-123'
  })
});`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Webhook</CardTitle>
                  <CardDescription>Configure notificações automáticas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">URL do Webhook</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://sua-api.com/webhooks"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Eventos</Label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">payment.authorized</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">payment.captured</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">payment.failed</span>
                      </label>
                    </div>
                  </div>
                  <Button>Salvar Configurações</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Segurança</CardTitle>
                  <CardDescription>Configurações de segurança e conformidade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Autenticação 2FA</p>
                      <p className="text-sm text-muted-foreground">Proteção adicional da conta</p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Logs de Auditoria</p>
                      <p className="text-sm text-muted-foreground">Rastreamento de ações</p>
                    </div>
                    <Badge variant="outline">Ativo</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Conformidade PCI-DSS</p>
                      <p className="text-sm text-muted-foreground">Certificação de segurança</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Certificado</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}