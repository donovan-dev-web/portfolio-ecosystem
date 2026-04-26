import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { handleRouteError } from '@/backend/api/route.utils';

/**
 * Admin - Réorganiser les projets
 * Endpoint protege par authentification Bearer pour mettre a jour l ordre des projets
 * @body { id: string; order: number }[]
 * @response 200
 * @responseSet auth
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
  } catch (error) {
    return handleRouteError(error, { message: 'Format invalide', status: 400 });
  }
}
