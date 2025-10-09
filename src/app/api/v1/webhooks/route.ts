import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
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
    const { url, events, secret } = body;

    if (!url || !events || !Array.isArray(events)) {
      return NextResponse.json(
        ResponseUtils.error('invalid_request', 'URL and events are required'),
        { status: 400 }
      );
    }

    const webhook = await db.createWebhook({
      merchant_id: auth.merchant_id,
      url,
      events,
      secret: secret || crypto.randomUUID(),
      status: 'active'
    });

    return NextResponse.json(ResponseUtils.success(webhook), { status: 201 });
  } catch (error: any) {
    console.error('Webhook creation error:', error);
    
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
    
    const webhooks = await db.getWebhooksByMerchant(auth.merchant_id);
    
    return NextResponse.json(ResponseUtils.success(webhooks));
  } catch (error: any) {
    console.error('Webhook list error:', error);
    
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