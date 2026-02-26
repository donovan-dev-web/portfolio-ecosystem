import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';

/**
 * Récupérer tous les projets
 * @response 200:ProjectType[]
 * @openapi
 */
export async function GET() {
  await connectDB();
  const projects = await ProjectService.getAll();
  return NextResponse.json(projects, { status: 200 });
}

/**
 * Créer un nouveau projet
 * @body ProjectType
 * @response 201:ProjectType
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    requireAuth(request);

    const body = await request.json();
    const created = await ProjectService.create(body);

    return NextResponse.json(created, { status: 201 });
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
