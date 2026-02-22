import { NextRequest, NextResponse } from 'next/server';
import { LoginBody, LoginResponse } from '@/backend/auth/auth.schema';
import { loginService } from '@/backend/auth/auth.service';

/**
 * Connecte un utilisateur existant
 * @body LoginBody
 * @response 200:LoginResponse:Connexion réussie
 * @responseSet auth
 * @openapi
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = LoginBody.parse(body);

  const result = await loginService(data.email, data.password);

  return NextResponse.json(result, { status: 200 });
}
