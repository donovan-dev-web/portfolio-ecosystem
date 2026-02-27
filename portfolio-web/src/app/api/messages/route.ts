import { NextRequest, NextResponse } from 'next/server';
import { MessagesServices } from '@/backend/messages/messages.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Recupérer tous les messages
 * @param request page default = 1
 * @param request limit default = 20
 * @response 200:MessageType
 * @response 401:unauthorized
 * @response 500:Erreur serveur Impossible de récupérer les messages
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await MessagesServices.getPaginated(page, limit);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.Message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'impossible de récupérer les messages', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Créer un nouveau messages
 * @body MessageType
 * @response 201:MessageType
 * @response 401:unauthorized
 * @response 400:Données invalides
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const created = await MessagesServices.craeteMessage(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    if (error.Message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { message: 'Données invalides', error: error.message },
      { status: 400 }
    );
  }
}
