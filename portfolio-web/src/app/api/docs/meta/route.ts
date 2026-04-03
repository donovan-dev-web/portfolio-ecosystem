import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { DocsServices } from '@/backend/docs/docs.services';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Récupérer les métadonnées du CV sans télécharger le fichier
 * @response 200:DocType
 * @response 401:Unauthorized
 * @response 404:Document non trouvé
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const doc = await DocsServices.getCv();

    if (!doc) {
      return NextResponse.json(
        { message: 'Document non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: 'Impossible de récupérer les métadonnées du document',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
