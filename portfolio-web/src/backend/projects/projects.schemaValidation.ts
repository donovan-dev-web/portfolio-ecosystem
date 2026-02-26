import { z } from 'zod';

export const GalleryItemSchema = z.object({
  desktopUrl: z.string().min(1).describe('URL image desktop'),
  mobileUrl: z.string().min(1).describe('URL image mobile'),
  alt: z.string().min(1).describe('Texte alternatif'),
});

export const PresentationSchema = z.object({
  description: z.string().min(1).describe('Description du projet'),
  context: z.string().min(1).describe('Contexte du projet'),
  objectives: z.string().min(1).describe('Objectifs du projet'),
  skills: z.string().min(1).describe('Compétences développées'),
  results: z.string().min(1).describe('Résultats obtenus'),
  improvements: z.string().min(1).describe('Améliorations possibles'),
});

export const ProjectSchema = z
  .object({
    title: z.string().min(1).describe('Titre du projet'),

    order: z.number().describe('Position du projet dans la liste'),

    projectType: z.string().describe('ID du type de projet (ObjectId)'),

    technologies: z
      .array(z.string())
      .max(2, 'Maximum 2 technologies')
      .describe('Liste des IDs technologies'),

    languages: z
      .array(z.string())
      .max(2, 'Maximum 2 langages')
      .describe('Liste des IDs langages'),

    shortDescription: z
      .string()
      .min(1)
      .describe('Description courte du projet'),

    coverImage: z.string().min(1).describe('Image principale du projet'),

    stack: z.array(z.string()).describe('Stack technique affichée').optional(),

    presentation: PresentationSchema.describe('Bloc de présentation détaillée'),

    gallery: z
      .array(GalleryItemSchema)
      .describe('Galerie images du projet')
      .optional(),

    githubUrl: z.string().describe('URL du repository GitHub').optional(),

    isLive: z
      .boolean()
      .describe('Indique si le projet est en ligne')
      .optional(),

    liveUrl: z.string().describe('URL du projet en ligne').optional(),
  })
  .refine((data) => !data.isLive || !!data.liveUrl, {
    message: 'Live URL is required if project is marked as live.',
    path: ['liveUrl'],
  });

export const ReorderSchema = z
  .array(
    z.object({
      id: z.string().describe('ID du projet'),
      order: z.number().describe('Nouvel ordre du projet'),
    })
  )
  .describe('Liste des projets à réordonner');
