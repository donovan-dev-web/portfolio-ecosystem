import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';

/**
 * Réorganiser les projets
 * @body { id: string; order: number }[]
 * @response 200
 * @openapi
 */
export async function PUT(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    await ProjectService.reorder(body);

    return NextResponse.json(
      { message: 'Ordre mis à jour avec succès' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Format invalide', error: error.message },
      { status: 400 }
    );
  }
}
