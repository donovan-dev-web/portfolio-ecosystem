import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/backend/database/mongoose';
import { requireAuth } from '@/backend/auth/auth.middleware';
import {
  SignupStatusResponse,
} from '@/backend/auth/auth.schema';
import {
  getSignupStatusService,
  updateSignupStatusService,
} from '@/backend/auth/auth.service';

/**
 * Recupere l etat d activation de la creation de compte
 * @response 200:SignupStatusResponse
 * @response 401:Unauthorized
 * @responseSet auth
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const status = await getSignupStatusService();

    return NextResponse.json(status, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Impossible de recuperer le statut du signup', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Met a jour l etat d activation de la creation de compte
 * @body SignupStatusResponse
 * @response 200:SignupStatusResponse
 * @response 401:Unauthorized
 * @responseSet auth
 * @openapi
 */
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const body = await request.json();
    const data = SignupStatusResponse.parse(body);

    const status = await updateSignupStatusService(data.signupEnabled);

    return NextResponse.json(status, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Impossible de mettre a jour le statut du signup', error: error.message },
      { status: 400 }
    );
  }
}
