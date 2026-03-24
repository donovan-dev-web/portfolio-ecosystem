// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { ProjectService } from '@/backend/projects/projects.services';
import { requireAuth } from '@/backend/auth/auth.middleware';
import { connectDB } from '@/backend/database/mongoose';
import { ImageService } from '@/backend/config/image.service';

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

function getGalleryIndexes(formData: FormData) {
  const indexes = new Set<number>();

  for (const [key] of formData.entries()) {
    const match = key.match(/^gallery\[(\d+)\]\[(desktop|mobile|alt)\]/);

    if (match) {
      indexes.add(Number(match[1]));
    }
  }

  return Array.from(indexes).sort((a, b) => a - b);
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
  await connectDB();
  requireAuth(request);

  const formData = await request.formData();

  // 🔹 Récupérer les variantes du cover
  const coverSmall = formData.get('coverImage[small]') as File | null;
  const coverMedium = formData.get('coverImage[medium]') as File | null;
  const coverLarge = formData.get('coverImage[large]') as File | null;

  if (!coverSmall || !coverMedium || !coverLarge) {
    throw new Error('All cover image variants are required');
  }

  // 🔹 Générer les URLs via ImageService
  const coverVariants = {
    small: (await ImageService.processAndUpload(coverSmall, 'projects')).small,
    medium: (await ImageService.processAndUpload(coverMedium, 'projects'))
      .medium,
    large: (await ImageService.processAndUpload(coverLarge, 'projects')).large,
  };

  // 🔹 Traitement de la gallery
  const gallery: any[] = [];
  const galleryIndexes = getGalleryIndexes(formData);

  for (const i of galleryIndexes) {
    const desktopSmall = formData.get(
      `gallery[${i}][desktop][small]`
    ) as File | null;
    const desktopMedium = formData.get(
      `gallery[${i}][desktop][medium]`
    ) as File | null;
    const desktopLarge = formData.get(
      `gallery[${i}][desktop][large]`
    ) as File | null;

    const mobileSmall = formData.get(
      `gallery[${i}][mobile][small]`
    ) as File | null;
    const mobileMedium = formData.get(
      `gallery[${i}][mobile][medium]`
    ) as File | null;
    const mobileLarge = formData.get(
      `gallery[${i}][mobile][large]`
    ) as File | null;

    if (
      !desktopSmall ||
      !desktopMedium ||
      !desktopLarge ||
      !mobileSmall ||
      !mobileMedium ||
      !mobileLarge
    ) {
      continue; // skip incomplete gallery item
    }

    const desktopVariants = {
      small: (await ImageService.processAndUpload(desktopSmall, 'projects'))
        .small,
      medium: (await ImageService.processAndUpload(desktopMedium, 'projects'))
        .medium,
      large: (await ImageService.processAndUpload(desktopLarge, 'projects'))
        .large,
    };

    const mobileVariants = {
      small: (await ImageService.processAndUpload(mobileSmall, 'projects'))
        .small,
      medium: (await ImageService.processAndUpload(mobileMedium, 'projects'))
        .medium,
      large: (await ImageService.processAndUpload(mobileLarge, 'projects'))
        .large,
    };

    gallery.push({
      desktop: desktopVariants,
      mobile: mobileVariants,
      alt: (formData.get(`gallery[${i}][alt]`) as string) || '',
    });
  }

  // 🔹 Données JSON supplémentaires
  // Récupérer les champs projet directement
  const title = formData.get('title') as string;
  const projectType = formData.get('projectType') as string;
  const shortDescription = formData.get('shortDescription') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const isLive = formData.get('isLive') === 'true';
  const liveUrl = formData.get('liveUrl') as string;

  // Présentation
  const presentation = {
    description: formData.get('presentation[description]') as string,
    context: formData.get('presentation[context]') as string,
    objectives: formData.get('presentation[objectives]') as string,
    skills: formData.get('presentation[skills]') as string,
    results: formData.get('presentation[results]') as string,
    improvements: formData.get('presentation[improvements]') as string,
  };

  // Stack & technologies
  const stack = getIndexedValues(formData, 'stack');
  const technologies = getIndexedValues(formData, 'technologies');
  const languages = getIndexedValues(formData, 'languages');

  // 🔹 Création du projet
  const created = await ProjectService.create({
    title,
    projectType,
    shortDescription,
    githubUrl,
    isLive,
    liveUrl,
    presentation,
    stack,
    technologies,
    languages,
    coverImage: coverVariants,
    gallery,
    order: 0,
  });

  return NextResponse.json(created, { status: 201 });
}
