import { NextRequest, NextResponse } from 'next/server';
import { TechnologySchema } from '@/backend/tags/tags.schema';
import { TagService } from '@/backend/tags/tags.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import type { TechnologyType } from '@/backend/tags/tags.types';
import { connectDB } from '@/backend/database/mongoose';
import { getRouteParam, handleRouteError } from '@/backend/api/route.utils';

/**
 * Récupérer une Technology par ID
 * @response 200:TechnologyType:Technology trouvée
 * @response 404:Error:Technology non trouvée
 * @openapi
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await getRouteParam(context, 'id');

  const data = await TagService.getTechnologyById(id);

  if (!data) {
    return NextResponse.json(
      { message: 'Technology non trouvée' },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}

/**
 * Mettre à jour une Technology
 * @body TechnologySchema
 * @response 200:TechnologyType:Technology mise à jour
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
    const body: TechnologyType = await request.json();
    const validated = TechnologySchema.parse(body);

    const updated = await TagService.updateTechnology(id, validated);

    if (!updated) {
      return NextResponse.json(
        { message: 'Technology non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return handleRouteError(error, {
      message: 'Impossible de mettre à jour la technologie',
      status: 400,
    });
  }
}

/**
 * Supprimer une Technology
 * @response 200:Message:Technology supprimée
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
    const deleted = await TagService.deleteTechnology(id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'Technology non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Technology supprimée' },
      { status: 200 }
    );
  } catch (error) {
    return handleRouteError(error, {
      message: 'Impossible de supprimer la technologie',
      status: 400,
    });
  }
}
