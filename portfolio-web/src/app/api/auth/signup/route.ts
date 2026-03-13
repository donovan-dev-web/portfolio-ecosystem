import { NextRequest, NextResponse } from 'next/server';
import { SignupBody, SignupResponse } from '@/backend/auth/auth.schema';
import { signupService } from '@/backend/auth/auth.service';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Crée un nouvel utilisateur
 * @body SignupBody
 * @response 201:SignupResponse:Utilisateur créé avec succès
 * @responseSet auth
 * @openapi
 */
export async function POST(request: NextRequest) {
  const message = 'La création utilisateur est actuellement bloquer';
  return NextResponse.json({ message }, { status: 400 });
  /*
  await connectDB();
  const body = await request.json();
  const data = SignupBody.parse(body); // validation Zod

  const message = await signupService(data.email, data.password);

  return NextResponse.json({ message }, { status: 201 });*/
}
