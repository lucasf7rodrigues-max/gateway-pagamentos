import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/payment-service';
import { ResponseUtils, JWTUtils } from '@/lib/utils';
import { CreatePaymentRequest } from '@/lib/types';

// Middleware de autenticação
function authenticate(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authorization.substring(7);
  return JWTUtils.verify(token);
}

export async function POST(request: NextRequest) {
  try {
    // Autenticar requisição
    const auth = authenticate(request);
    
    const body = await request.json();
    const paymentRequest: CreatePaymentRequest = {
      merchant_id: auth.merchant_id,
      amount: body.amount,
      currency: body.currency || 'BRL',
      payment_method: body.payment_method,
      capture: body.capture !== false, // Default true
      metadata: body.metadata,
      idempotency_key: body.idempotency_key || request.headers.get('idempotency-key') || ''
    };

    if (!paymentRequest.idempotency_key) {
      return NextResponse.json(
        ResponseUtils.error('missing_idempotency_key', 'Idempotency key is required'),
        { status: 400 }
      );
    }

    const result = await paymentService.createPayment(paymentRequest);
    
    return NextResponse.json(ResponseUtils.success(result), { status: 201 });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    
    if (error.message.includes('not found') || error.message.includes('Invalid')) {
      return NextResponse.json(
        ResponseUtils.error('invalid_request', error.message),
        { status: 400 }
      );
    }

    if (error.message.includes('blocked')) {
      return NextResponse.json(
        ResponseUtils.error('transaction_blocked', error.message),
        { status: 403 }
      );
    }

    return NextResponse.json(
      ResponseUtils.error('server_error', 'Internal server error'),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Autenticar requisição
    const auth = authenticate(request);
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const { transactions, total } = await paymentService.listTransactions(auth.merchant_id, page, limit);
    
    return NextResponse.json(
      ResponseUtils.paginated(transactions, page, limit, total)
    );
  } catch (error: any) {
    console.error('Payment list error:', error);
    
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