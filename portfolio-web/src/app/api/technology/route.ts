import { NextRequest, NextResponse } from 'next/server';
import { TechnologySchema } from '@/backend/tags/tags.schema';
import { TagService } from '@/backend/tags/tags.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import type { TechnologyType } from '@/backend/tags/tags.types';

/**
 * Récupérer toutes les Technologies
 * @response 200:TechnologyType[]:Liste des Technologies
 * @openapi
 */
export async function GET() {
  const data: TechnologyType[] = await TagService.getAllTechnologies();

  return NextResponse.json(data, { status: 200 });
}

/**
 * Créer une Technology
 * @body TechnologySchema
 * @response 201:TechnologyType:Technology créée
 * @responseSet auth
 * @openapi
 */
export async function POST(request: NextRequest) {
  requireAuth(request);

  const body = await request.json();
  const validated = TechnologySchema.parse(body);

  const created = await TagService.createTechnology(validated);

  return NextResponse.json(created, { status: 201 });
}
