import { NextRequest, NextResponse } from 'next/server';
import { SignupBody, SignupResponse } from '@/backend/auth/auth.schema';
import { signupService } from '@/backend/auth/auth.service';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Crée un nouvel utilisateur
 * @body SignupBody
 * @response 201:SignupResponse
 * @responseSet auth
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const data = SignupBody.parse(body);

    const message = await signupService(data.email, data.password);

    return NextResponse.json({ message }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'SIGNUP_DISABLED') {
      return NextResponse.json(
        { message: 'La creation de compte est actuellement desactivee' },
        { status: 403 }
      );
    }

    if (error.message === 'UserAlreadyExists') {
      return NextResponse.json(
        { message: 'Un utilisateur avec cet email existe deja' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible de creer le compte', error: error.message },
      { status: 400 }
    );
  }
}
