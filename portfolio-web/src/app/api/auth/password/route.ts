import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/backend/database/mongoose';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { ChangePasswordBody, SignupResponse } from '@/backend/auth/auth.schema';
import { changePasswordService } from '@/backend/auth/auth.service';

/**
 * Modifie le mot de passe de l utilisateur connecte
 * @body ChangePasswordBody
 * @response 200:SignupResponse
 * @response 401:Unauthorized
 * @responseSet auth
 * @openapi
 */
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const userId = requireAuth(request);

    const body = await request.json();
    const data = ChangePasswordBody.parse(body);

    const message = await changePasswordService(
      userId,
      data.oldPassword,
      data.newPassword
    );

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'INVALID_OLD_PASSWORD') {
      return NextResponse.json(
        { message: 'Ancien mot de passe incorrect' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible de modifier le mot de passe', error: error.message },
      { status: 400 }
    );
  }
}
