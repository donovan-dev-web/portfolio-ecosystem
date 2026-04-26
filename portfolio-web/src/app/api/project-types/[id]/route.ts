import { NextRequest, NextResponse } from 'next/server';
import { ProjectTypeSchema } from '@/backend/tags/tags.schema';
import { TagService } from '@/backend/tags/tags.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';
import { getRouteParam, handleRouteError } from '@/backend/api/route.utils';

/**
 * Récupérer un ProjectType par ID
 * @response 200:ProjectTypeType:ProjectType trouvé
 * @response 404:Error:ProjectType non trouvé
 * @openapi
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await getRouteParam(context, 'id');

  const data = await TagService.getProjectTypeById(id);

  if (!data) {
    return NextResponse.json(
      { message: 'ProjectType non trouvé' },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}

/**
 * Mettre à jour un ProjectType
 * @body ProjectTypeSchema
 * @response 200:ProjectTypeType:ProjectType mis à jour
 * @response 404:Error:ProjectType non trouvé
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

    const id = await getRouteParam(context, 'id');
    const body = await request.json();
    const validated = ProjectTypeSchema.parse(body);

    const updated = await TagService.updateProjectType(id, validated);

    if (!updated) {
      return NextResponse.json(
        { message: 'ProjectType non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return handleRouteError(error, {
      message: 'Impossible de mettre à jour le type de projet',
      status: 400,
    });
  }
}

/**
 * Supprimer un ProjectType
 * @response 200:Message:ProjectType supprimé
 * @response 404:Error:ProjectType non trouvé
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

    const id = await getRouteParam(context, 'id');
    const deleted = await TagService.deleteProjectType(id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'ProjectType non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'ProjectType supprimé' },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error, {
      message: 'Impossible de supprimer le type de projet',
      status: 400,
    });
  }
}
