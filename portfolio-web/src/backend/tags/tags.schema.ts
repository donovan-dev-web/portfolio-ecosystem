import { z } from 'zod';

export const ProjectTypeSchema = z.object({
  name: z.string().min(1).describe('Nom du type de projet'),
  icon: z.string().min(1).describe('Icone représentant le type de projet'),
});

export const TechnologySchema = z.object({
  name: z.string().min(1).describe('Nom de la technologie'),
  icon: z.string().min(1).describe('Icone représentant la technologie'),
});

export const ProgrammingLanguageSchema = z.object({
  name: z.string().min(1).describe('Nom du langage de programmation'),
  icon: z.string().min(1).describe('Icone représentant le langage'),
});
