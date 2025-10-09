import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { ResponseUtils, JWTUtils, CryptoUtils } from '@/lib/utils';

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
    const { legal_name, tax_id, business_type } = body;

    if (!legal_name || !tax_id) {
      return NextResponse.json(
        ResponseUtils.error('invalid_request', 'Legal name and tax ID are required'),
        { status: 400 }
      );
    }

    const merchant = await db.createMerchant({
      legal_name,
      tax_id,
      status: 'pending',
      onboarding_data: {
        business_type: business_type || 'ecommerce',
        created_by: auth.sub
      },
      kyc_level: 'basic'
    });

    return NextResponse.json(ResponseUtils.success(merchant), { status: 201 });
  } catch (error: any) {
    console.error('Merchant creation error:', error);
    
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

export async function GET(request: NextRequest) {
  try {
    // Autenticar requisição
    const auth = authenticate(request);
    
    // Verificar se é admin ou merchant específico
    if (auth.role === 'admin') {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      
      const { merchants, total } = await db.listMerchants(page, limit);
      return NextResponse.json(ResponseUtils.paginated(merchants, page, limit, total));
    } else {
      // Retornar apenas o merchant do usuário autenticado
      const merchant = await db.getMerchant(auth.merchant_id);
      if (!merchant) {
        return NextResponse.json(
          ResponseUtils.error('not_found', 'Merchant not found'),
          { status: 404 }
        );
      }
      return NextResponse.json(ResponseUtils.success(merchant));
    }
  } catch (error: any) {
    console.error('Merchant list error:', error);
    
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