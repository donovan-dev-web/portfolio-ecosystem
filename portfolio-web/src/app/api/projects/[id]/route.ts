import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';
import { ImageService } from '@/backend/config/image.service';

/**
 * Récupérer un projet par ID
 * @response 200:ProjectType:Projet trouvé
 * @response 404:Projet non trouvé
 * @openapi
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  const project = await ProjectService.getById(id);

  if (!project) {
    return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}

/**
 * Mettre à jour un projet
 * @body ProjectType
 * @response 200:ProjectType:Projet mis à jour
 * @response 404:Projet non trouvé
 * @openapi
 */

export const runtime = 'nodejs';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  requireAuth(request);

  const existingProject = await ProjectService.getById(params.id);

  if (!existingProject) {
    return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
  }

  const formData = await request.formData();
  const data = JSON.parse(formData.get('data') as string);

  let coverVariants = existingProject.coverImage;

  const newCoverFile = formData.get('coverImage') as File | null;

  if (newCoverFile && newCoverFile.size > 0) {
    await ImageService.deleteImageVariants(existingProject.coverImage);

    coverVariants = await ImageService.processAndUpload(
      newCoverFile,
      'projects'
    );
  }

  let gallery = existingProject.gallery || [];

  const desktopFiles = formData.getAll('galleryDesktop') as File[];
  const mobileFiles = formData.getAll('galleryMobile') as File[];

  if (desktopFiles.length > 0 && mobileFiles.length > 0) {
    // supprimer anciennes
    for (const item of gallery) {
      await ImageService.deleteImageVariants(item.desktop);
      await ImageService.deleteImageVariants(item.mobile);
    }

    gallery = [];

    for (let i = 0; i < desktopFiles.length; i++) {
      const desktopVariants = await ImageService.processAndUpload(
        desktopFiles[i],
        'projects'
      );

      const mobileVariants = await ImageService.processAndUpload(
        mobileFiles[i],
        'projects'
      );

      gallery.push({
        desktop: desktopVariants,
        mobile: mobileVariants,
        alt: data.gallery?.[i]?.alt || '',
      });
    }
  }

  const updated = await ProjectService.update(params.id, {
    ...data,
    coverImage: coverVariants,
    gallery,
  });

  return NextResponse.json(updated, { status: 200 });
}

/**
 * Supprimer un projet
 * @response 204:Projet supprimé
 * @response 404:Projet non trouvé
 * @openapi
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  requireAuth(request);
  const { id } = await context.params;
  const project = await ProjectService.getById(id);

  if (!project) {
    return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
  }

  // supprimer cover
  await ImageService.deleteImageVariants(project.coverImage);
  for (const item of project.gallery || []) {
    await ImageService.deleteImageVariants(item.desktop);
    await ImageService.deleteImageVariants(item.mobile);
  }

  await ProjectService.delete(id);

  return new NextResponse(null, { status: 200 });
}
