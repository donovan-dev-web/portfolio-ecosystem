import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { DocsServices } from '@/backend/docs/docs.services';
import { connectDB } from '@/backend/database/mongoose';

export const runtime = 'nodejs';

function buildContentDisposition(fileName: string) {
  const fallback = fileName.replace(/[^\x20-\x7E]+/g, '_') || 'cv.pdf';
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

/**
 * Récupérer le CV au format PDF
 * @response 200:file:PDF du CV
 * @response 404:Document non trouvé
 * @openapi
 */
export async function GET() {
  try {
    await connectDB();

    const doc = await DocsServices.getCv();

    if (!doc) {
      return NextResponse.json(
        { message: 'Document non trouve' },
        { status: 404 }
      );
    }

    await DocsServices.handleCvDownload(doc._id.toString());

    const fileResponse = await fetch(doc.url, { cache: 'no-store' });

    if (!fileResponse.ok || !fileResponse.body) {
      return NextResponse.json(
        { message: 'Impossible de récupérer le fichier PDF' },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set('Cache-Control', 'no-store');
    headers.set('Content-Disposition', buildContentDisposition(doc.name));
    headers.set(
      'Content-Type',
      fileResponse.headers.get('content-type') ||
        doc.contentType ||
        'application/pdf'
    );

    if (doc.size) {
      headers.set('Content-Length', String(doc.size));
    }

    return new NextResponse(fileResponse.body, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Impossible de récupérer le document', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Ajouter le CV au format PDF
 * @response 201:DocType
 * @response 400:Données invalides
 * @response 401:Unauthorized
 * @response 409:Document deja present
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'Le fichier PDF est requis' },
        { status: 400 }
      );
    }

    const created = await DocsServices.createCv(file);

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'DOC_ALREADY_EXISTS') {
      return NextResponse.json(
        { message: 'Un document est deja present, utilisez PUT pour le remplacer' },
        { status: 409 }
      );
    }

    if (
      error.message === 'INVALID_DOCUMENT_FILE' ||
      error.message === 'INVALID_DOCUMENT_TYPE'
    ) {
      return NextResponse.json(
        { message: 'Le fichier doit etre un PDF valide' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible d ajouter le document', error: error.message },
      { status: 400 }
    );
  }
}

/**
 * Remplacer le CV existant
 * @response 200:DocType
 * @response 400:Données invalides
 * @response 401:Unauthorized
 * @response 404:Document non trouvé
 * @openapi
 */
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'Le fichier PDF est requis' },
        { status: 400 }
      );
    }

    const updated = await DocsServices.updateCv(file);

    if (!updated) {
      return NextResponse.json(
        { message: 'Document non trouve' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (
      error.message === 'INVALID_DOCUMENT_FILE' ||
      error.message === 'INVALID_DOCUMENT_TYPE'
    ) {
      return NextResponse.json(
        { message: 'Le fichier doit etre un PDF valide' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Impossible de mettre a jour le document', error: error.message },
      { status: 400 }
    );
  }
}

/**
 * Supprimer le CV existant
 * @response 200:Document supprimé
 * @response 401:Unauthorized
 * @response 404:Document non trouvé
 * @openapi
 */
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const deleted = await DocsServices.deleteCv();

    if (!deleted) {
      return NextResponse.json(
        { message: 'Document non trouve' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Document supprime' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Impossible de supprimer le document', error: error.message },
      { status: 500 }
    );
  }
}
