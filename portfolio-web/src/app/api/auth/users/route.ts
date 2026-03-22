import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/backend/database/mongoose';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { listUsersService } from '@/backend/auth/auth.service';

/**
 * Recupere la liste des utilisateurs
 * @response 200:UsersListResponse:Liste des utilisateurs
 * @response 401:Unauthorized
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const users = await listUsersService();

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Impossible de recuperer les utilisateurs', error: error.message },
      { status: 500 }
    );
  }
}
