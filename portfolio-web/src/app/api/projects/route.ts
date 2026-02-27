import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';
import { ImageService } from '@/backend/config/image.service';

export const runtime = 'nodejs';

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
  await connectDB();
  requireAuth(request);

  const formData = await request.formData();

  const coverFile = formData.get('coverImage') as File;
  const galleryDesktopFiles = formData.getAll('galleryDesktop') as File[];
  const galleryMobileFiles = formData.getAll('galleryMobile') as File[];
  const data = JSON.parse(formData.get('data') as string);

  const coverVariants = await ImageService.processAndUpload(
    coverFile,
    'projects'
  );

  const gallery = [];

  for (let i = 0; i < galleryDesktopFiles.length; i++) {
    const desktopVariants = await ImageService.processAndUpload(
      galleryDesktopFiles[i],
      'projects'
    );

    const mobileVariants = await ImageService.processAndUpload(
      galleryMobileFiles[i],
      'projects'
    );

    gallery.push({
      desktop: desktopVariants,
      mobile: mobileVariants,
      alt: data.gallery?.[i]?.alt || '',
    });
  }

  const created = await ProjectService.create({
    ...data,
    coverImage: coverVariants,
    gallery,
  });

  return NextResponse.json(created, { status: 201 });
}
