import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/backend/database/mongoose';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { UsersListResponse } from '@/backend/auth/auth.schema';
import { listUsersService } from '@/backend/auth/auth.service';

/**
 * Récupère la liste des utilisateurs
 * @response 200:UsersListResponse
 * @response 401:Unauthorized
 * @responseSet auth
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
      { message: 'Impossible de récupérer les utilisateurs', error: error.message },
      { status: 500 }
    );
  }
}
