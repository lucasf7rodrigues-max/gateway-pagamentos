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

export async function POST(request: NextRequest) {
  try {
    // Autenticar requisição
    const auth = authenticate(request);
    
    const body = await request.json();
    const { card_data } = body;

    if (!card_data) {
      return NextResponse.json(
        ResponseUtils.error('missing_card_data', 'Card data is required'),
        { status: 400 }
      );
    }

    const token = await paymentService.tokenizeCard(auth.merchant_id, card_data);
    
    // Retornar apenas dados seguros (sem PAN)
    const response = {
      token: token.token,
      scheme: token.scheme,
      last4: token.last4,
      expiry: token.expiry,
      created_at: token.created_at
    };
    
    return NextResponse.json(ResponseUtils.success(response), { status: 201 });
  } catch (error: any) {
    console.error('Tokenization error:', error);
    
    if (error.message.includes('Invalid card')) {
      return NextResponse.json(
        ResponseUtils.error('invalid_card', error.message),
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