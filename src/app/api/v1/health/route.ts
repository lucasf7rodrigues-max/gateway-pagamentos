import { NextRequest, NextResponse } from 'next/server';
import { ResponseUtils } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        database: 'healthy',
        payment_processor: 'healthy',
        fraud_engine: 'healthy',
        webhook_service: 'healthy'
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };

    return NextResponse.json(ResponseUtils.success(healthCheck));
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      ResponseUtils.error('service_unavailable', 'Service temporarily unavailable'),
      { status: 503 }
    );
  }
}