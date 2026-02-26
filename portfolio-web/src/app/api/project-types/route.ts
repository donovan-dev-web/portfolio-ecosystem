import { NextRequest, NextResponse } from 'next/server';
import { ProjectTypeSchema } from '@/backend/tags/tags.schema';
import { TagService } from '@/backend/tags/tags.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import type { ProjectTypeType } from '@/backend/tags/tags.types';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Récupérer tous les ProjectTypes
 * @response 200:ProjectTypeType[]:Liste des ProjectTypes
 * @openapi
 */
export async function GET() {
  await connectDB();
  const data: ProjectTypeType[] = await TagService.getAllProjectTypes();
  return NextResponse.json(data, { status: 200 });
}

/**
 * Créer un ProjectType
 * @body ProjectTypeSchema
 * @response 201:ProjectTypeType:ProjectType créé
 * @response 400:Error:Données invalides
 * @responseSet auth
 * @openapi
 */
export async function POST(request: NextRequest) {
  await connectDB();
  requireAuth(request);

  const body = await request.json();
  const validated = ProjectTypeSchema.parse(body);

  const created: ProjectTypeType =
    await TagService.createProjectType(validated);

  return NextResponse.json(created, { status: 201 });
}
