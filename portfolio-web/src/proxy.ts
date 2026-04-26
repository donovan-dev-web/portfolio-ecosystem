import { NextRequest, NextResponse } from 'next/server';
import { corsConfig, isAllowedCorsOrigin } from '@/backend/config/cors';

function applyCorsHeaders(response: NextResponse, origin: string | null) {
  response.headers.set('Vary', 'Origin');
  response.headers.set(
    'Access-Control-Allow-Methods',
    corsConfig.allowedMethods.join(',')
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    corsConfig.allowedHeaders.join(',')
  );

  if (isAllowedCorsOrigin(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin!);
  }

  return response;
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    return applyCorsHeaders(new NextResponse(null, { status: 204 }), origin);
  }

  return applyCorsHeaders(NextResponse.next(), origin);
}

export const config = {
  matcher: '/api/:path*',
};
