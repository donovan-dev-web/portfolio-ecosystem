import { NextRequest, NextResponse } from 'next/server';
import { TagService } from '@/backend/tags/tags.services';
import { ProgrammingLanguageType } from '@/backend/tags/tags.types';

/**
 * Récupère tous les langages de programmation
 * @response 200:ProgrammingLanguageType[]:Liste des langages
 * @openapi
 */
export async function GET() {
  const languages = await TagService.getAllLanguages();
  return NextResponse.json(languages, { status: 200 });
}

/**
 * Crée un nouveau langage de programmation
 * @body ProgrammingLanguageType
 * @response 201:ProgrammingLanguageType:Langage créé avec succès
 * @openapi
 */
export async function POST(request: NextRequest) {
  const body: ProgrammingLanguageType = await request.json();

  const created = await TagService.createLanguage(body);

  return NextResponse.json(created, { status: 201 });
}
