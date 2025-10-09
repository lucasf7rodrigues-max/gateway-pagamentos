import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/payment-service';
import { ResponseUtils, JWTUtils } from '@/lib/utils';

// Middleware de autenticação
function authenticate(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authorization.substring(7);
  return JWTUtils.verify(token);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Autenticar requisição
    authenticate(request);
    
    const body = await request.json();
    const amount = body.amount; // Opcional - captura parcial
    
    const transaction = await paymentService.capturePayment(params.id, amount);
    
    return NextResponse.json(ResponseUtils.success(transaction));
  } catch (error: any) {
    console.error('Capture payment error:', error);
    
    if (error.message.includes('not found')) {
      return NextResponse.json(
        ResponseUtils.error('not_found', 'Transaction not found'),
        { status: 404 }
      );
    }

    if (error.message.includes('cannot be captured')) {
      return NextResponse.json(
        ResponseUtils.error('invalid_state', error.message),
        { status: 400 }
      );
    }

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