import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/payment-service';
import { ResponseUtils, JWTUtils } from '@/lib/utils';
import { db } from '@/lib/database';

// Middleware de autenticação
function authenticate(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authorization.substring(7);
  return JWTUtils.verify(token);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Autenticar requisição
    const auth = authenticate(request);
    
    const transaction = await db.getTransaction(params.id);
    if (!transaction) {
      return NextResponse.json(
        ResponseUtils.error('not_found', 'Transaction not found'),
        { status: 404 }
      );
    }

    // Verificar se a transação pertence ao merchant autenticado
    if (transaction.merchant_id !== auth.merchant_id && auth.type !== 'admin') {
      return NextResponse.json(
        ResponseUtils.error('forbidden', 'Access denied'),
        { status: 403 }
      );
    }

    return NextResponse.json(ResponseUtils.success(transaction));
  } catch (error: any) {
    console.error('Get transaction error:', error);
    
    if (error.message.includes('authorization')) {
      return NextResponse.json(
        ResponseUtils.error('unauthorized', 'Invalid or missing authorization'),
        { status: 401 }
      );
    }

    return NextResponse.json(
      ResponseUtils.error('server_error', 'Internal server error'),
      { status: 500 }
    );
  }
}