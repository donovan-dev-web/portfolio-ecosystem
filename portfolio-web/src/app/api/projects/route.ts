// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';
import { ImageService } from '@/backend/config/image.service';
import { ProjectCreateFormSchema } from '@/backend/projects/projects.formData';
import { handleRouteError } from '@/backend/api/route.utils';

export const runtime = 'nodejs';

function getIndexedValues(formData: FormData, fieldName: string) {
  const bracketValues = formData
    .getAll(`${fieldName}[]`)
    .filter((value): value is string => typeof value === 'string');

  if (bracketValues.length > 0) {
    return bracketValues;
  }

  const indexedValues = Array.from(formData.entries())
    .filter(([key, value]) => {
      return (
        typeof value === 'string' &&
        new RegExp(`^${fieldName}\\[(\\d+)\\]$`).test(key)
      );
    })
    .sort(([keyA], [keyB]) => {
      const indexA = Number(keyA.match(/\[(\d+)\]/)?.[1] || 0);
      const indexB = Number(keyB.match(/\[(\d+)\]/)?.[1] || 0);
      return indexA - indexB;
    })
    .map(([, value]) => value as string);

  return indexedValues;
}
/**
 * Public - Récupérer tous les projets
 * Endpoint public utilise par le site web pour afficher le catalogue de projets
 * @response 200:ProjectRecordType[]:Liste des projets
 * @responseSet public
 * @openapi
 */
export async function GET() {
  await connectDB();
  const projects = await ProjectService.getAll();
  return NextResponse.json(projects, { status: 200 });
}

/**
 * Admin - Créer un nouveau projet
 * Endpoint protege par authentification Bearer pour l administration des projets
 * @body ProjectRecordType
 * @response 201:ProjectRecordType:Projet cree
 * @responseSet auth
 * @openapi
 */
export async function POST(request: Request) {
  try {
    await connectDB();
    requireAuth(request);

    const formData = await request.formData();
    const parsed = ProjectCreateFormSchema.parse(formData);

    const coverVariants = {
      small: (await ImageService.processAndUpload(parsed.coverImage.small, 'projects'))
        .small,
      medium: (
        await ImageService.processAndUpload(parsed.coverImage.medium, 'projects')
      ).medium,
      large: (await ImageService.processAndUpload(parsed.coverImage.large, 'projects'))
        .large,
    };

    const gallery = [];

    for (const item of parsed.gallery) {
      const desktopVariants = {
        small: (await ImageService.processAndUpload(item.desktop.small, 'projects'))
          .small,
        medium: (
          await ImageService.processAndUpload(item.desktop.medium, 'projects')
        ).medium,
        large: (await ImageService.processAndUpload(item.desktop.large, 'projects'))
          .large,
      };

      const mobileVariants = {
        small: (await ImageService.processAndUpload(item.mobile.small, 'projects'))
          .small,
        medium: (
          await ImageService.processAndUpload(item.mobile.medium, 'projects')
        ).medium,
        large: (await ImageService.processAndUpload(item.mobile.large, 'projects'))
          .large,
      };

      gallery.push({
        desktop: desktopVariants,
        mobile: mobileVariants,
        alt: item.alt,
      });
    }

    const created = await ProjectService.create({
      title: parsed.title,
      projectType: parsed.projectType,
      shortDescription: parsed.shortDescription,
      githubUrl: parsed.githubUrl,
      isLive: parsed.isLive,
      liveUrl: parsed.liveUrl,
      presentation: parsed.presentation,
      stack: getIndexedValues(formData, 'stack'),
      technologies: getIndexedValues(formData, 'technologies'),
      languages: getIndexedValues(formData, 'languages'),
      coverImage: coverVariants,
      gallery,
      order: 0,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return handleRouteError(error, {
      message: 'Impossible de créer le projet',
      status: 400,
    });
  }
}
