import { NextRequest, NextResponse } from 'next/server';
import { LoginBody, LoginResponse } from '@/backend/auth/auth.schema';
import { loginService } from '@/backend/auth/auth.service';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Connecte un utilisateur existant
 * @body LoginBody
 * @response 200:LoginResponse
 * @responseSet auth
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const data = LoginBody.parse(body);

    const result = await loginService(data.email, data.password);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.message === 'InvalidCredentials') {
      return NextResponse.json(
        { message: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible de se connecter', error: error.message },
      { status: 400 }
    );
  }
}
