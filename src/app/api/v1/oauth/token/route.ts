import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils, ResponseUtils, CryptoUtils } from '@/lib/utils';
import { db } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_id, client_secret, grant_type } = body;

    if (grant_type !== 'client_credentials') {
      return NextResponse.json(
        ResponseUtils.error('invalid_grant', 'Only client_credentials grant type is supported'),
        { status: 400 }
      );
    }

    // Validar credenciais (em produção, verificar contra banco de dados)
    if (!client_id || !client_secret) {
      return NextResponse.json(
        ResponseUtils.error('invalid_client', 'Invalid client credentials'),
        { status: 401 }
      );
    }

    // Buscar merchant por client_id
    const merchant = await db.getMerchant(client_id);
    if (!merchant) {
      return NextResponse.json(
        ResponseUtils.error('invalid_client', 'Client not found'),
        { status: 401 }
      );
    }

    // Gerar token JWT
    const payload = {
      sub: merchant.id,
      merchant_id: merchant.id,
      scope: 'payments:read payments:write',
      type: 'api_access'
    };

    const access_token = JWTUtils.sign(payload);
    const refresh_token = CryptoUtils.generateToken();

    const response = {
      access_token,
      refresh_token,
      token_type: 'Bearer',
      expires_in: 86400, // 24 horas
      scope: 'payments:read payments:write'
    };

    return NextResponse.json(ResponseUtils.success(response));
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      ResponseUtils.error('server_error', 'Internal server error'),
      { status: 500 }
    );
  }
}