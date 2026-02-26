import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Récupérer un projet par ID
 * @response 200:ProjectType:Projet trouvé
 * @response 404:Projet non trouvé
 * @openapi
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const project = await ProjectService.getById(params.id);

  if (!project) {
    return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}

/**
 * Mettre à jour un projet
 * @body ProjectType
 * @response 200:ProjectType:Projet mis à jour
 * @response 404:Projet non trouvé
 * @openapi
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    requireAuth(request);

    const body = await request.json();
    const updated = await ProjectService.update(params.id, body);

    if (!updated) {
      return NextResponse.json(
        { message: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Données invalides', error: error.message },
      { status: 400 }
    );
  }
}

/**
 * Supprimer un projet
 * @response 204:Projet supprimé
 * @response 404:Projet non trouvé
 * @openapi
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    requireAuth(request);

    const deleted = await ProjectService.delete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
