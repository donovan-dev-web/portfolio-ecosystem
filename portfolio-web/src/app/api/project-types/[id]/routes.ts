import { NextRequest, NextResponse } from 'next/server';
import { ProjectTypeSchema } from '@/backend/tags/tags.schema';
import { TagService } from '@/backend/tags/tags.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';

function getId(request: NextRequest) {
  return new URL(request.url).pathname.split('/').pop()!;
}

/**
 * Récupérer un ProjectType par ID
 * @response 200:ProjectTypeType:ProjectType trouvé
 * @response 404:Error:ProjectType non trouvé
 * @openapi
 */
export async function GET(request: NextRequest) {
  await connectDB();
  const id = getId(request);

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
export async function PUT(request: NextRequest) {
  await connectDB();
  requireAuth(request);

  const id = getId(request);
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
}

/**
 * Supprimer un ProjectType
 * @response 200:Message:ProjectType supprimé
 * @response 404:Error:ProjectType non trouvé
 * @responseSet auth
 * @openapi
 */
export async function DELETE(request: NextRequest) {
  await connectDB();
  requireAuth(request);

  const id = getId(request);

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
}
