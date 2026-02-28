import { NextRequest, NextResponse } from 'next/server';
import { MessagesServices } from '@/backend/messages/messages.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Recupérer un message par ID
 * @response 200:MessageType
 * @response 401:Unauthorized
 * @response 404:Messages non trouvé
 * @openapi
 */

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    requireAuth(_request);

    const { id } = await context.params;

    const message = await MessagesServices.getOneMessage(id);

    if (!message) {
      return NextResponse.json(
        { message: 'Message non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(message, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Données invalides', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Mise a jour du status d'un messages
 * @response 200:MessageType:Message correctement mise à jour
 * @response 401:Unauthorized
 * @response 404:Message non trouvé
 * @openapi
 */

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    requireAuth(request);

    const { id } = await context.params;
    const updated = await MessagesServices.setMessageAsRead(id);

    if (!updated) {
      return NextResponse.json(
        { message: 'Message non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'MESSAGE_ALREADY_READ') {
      return NextResponse.json(
        { message: 'Ce message est déjà marqué comme lu' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Données invalides', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Supprimér un message
 * @response 204:Message Supprimé
 * @response 401:Unauthorized
 * @response 404:Message non trouvé
 * @openapi
 */

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    requireAuth(request);

    const { id } = await context.params;

    const deleted = await MessagesServices.deleteOneMessage(id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'Message non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Message supprimé' }, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Données invalides', error: error.message },
      { status: 500 }
    );
  }
}
