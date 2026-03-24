import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/backend/database/mongoose';
import { requireAuth } from '@/backend/auth/auth.middleware';
import {
  SignupResponse,
  UpdateUserBody,
  UserResponse,
} from '@/backend/auth/auth.schema';
import {
  deleteUserService,
  updateUserService,
} from '@/backend/auth/auth.service';

/**
 * Met a jour un utilisateur
 * @body UpdateUserBody
 * @response 200:UserResponse
 * @response 401:Unauthorized
 * @response 404:Utilisateur introuvable
 * @responseSet auth
 * @openapi
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    requireAuth(request);

    const { id } = await context.params;
    const body = await request.json();
    const data = UpdateUserBody.parse(body);

    const updated = await updateUserService(id, data);

    if (!updated) {
      return NextResponse.json(
        { message: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'UserAlreadyExists') {
      return NextResponse.json(
        { message: 'Un utilisateur avec cet email existe deja' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible de mettre a jour l utilisateur', error: error.message },
      { status: 400 }
    );
  }
}

/**
 * Supprime un utilisateur
 * @response 200:SignupResponse
 * @response 401:Unauthorized
 * @response 404:Utilisateur introuvable
 * @responseSet auth
 * @openapi
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    requireAuth(request);

    const { id } = await context.params;
    const deleted = await deleteUserService(id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Utilisateur supprime avec succes' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'LAST_USER_DELETE_FORBIDDEN') {
      return NextResponse.json(
        { message: 'Impossible de supprimer le dernier utilisateur' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible de supprimer l utilisateur', error: error.message },
      { status: 400 }
    );
  }
}
