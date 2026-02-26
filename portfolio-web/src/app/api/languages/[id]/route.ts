import { NextRequest, NextResponse } from 'next/server';
import { TagService } from '@/backend/tags/tags.services';
import { ProgrammingLanguageType } from '@/backend/tags/tags.types';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Récupère un langage de programmation par son ID
 * @response 200:ProgrammingLanguageType:Langage trouvé
 * @response 404:Langage introuvable
 * @openapi
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const language = await TagService.getLanguageById(params.id);

  if (!language) {
    return NextResponse.json(
      { message: 'Langage introuvable' },
      { status: 404 }
    );
  }

  return NextResponse.json(language, { status: 200 });
}

/**
 * Met à jour un langage de programmation
 * @body ProgrammingLanguageType
 * @response 200:ProgrammingLanguageType:Langage mis à jour
 * @response 404:Langage introuvable
 * @openapi
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body: ProgrammingLanguageType = await request.json();

  const updated = await TagService.updateLanguage(params.id, body);

  if (!updated) {
    return NextResponse.json(
      { message: 'Langage introuvable' },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

/**
 * Supprime un langage de programmation
 * @response 204:Langage supprimé avec succès
 * @response 404:Langage introuvable
 * @openapi
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const deleted = await TagService.deleteLanguage(params.id);

  if (!deleted) {
    return NextResponse.json(
      { message: 'Langage introuvable' },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}
