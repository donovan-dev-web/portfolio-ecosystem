import { NextRequest, NextResponse } from 'next/server';
import { TechnologySchema } from '@/backend/tags/tags.schema';
import { TagService } from '@/backend/tags/tags.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import type { TechnologyType } from '@/backend/tags/tags.types';

function getId(request: NextRequest) {
  return new URL(request.url).pathname.split('/').pop()!;
}

/**
 * Récupérer une Technology par ID
 * @response 200:TechnologyType:Technology trouvée
 * @response 404:Error:Technology non trouvée
 * @openapi
 */
export async function GET(request: NextRequest) {
  const id = getId(request);

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
export async function PUT(request: NextRequest) {
  requireAuth(request);

  const id = getId(request);
  const body = await request.json();
  const validated = TechnologySchema.parse(body);

  const updated = await TagService.updateTechnology(id, validated);

  if (!updated) {
    return NextResponse.json(
      { message: 'Technology non trouvée' },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

/**
 * Supprimer une Technology
 * @response 200:Message:Technology supprimée
 * @responseSet auth
 * @openapi
 */
export async function DELETE(request: NextRequest) {
  requireAuth(request);

  const id = getId(request);

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
}
