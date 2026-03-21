import { ImageVariants } from '@/backend/projects/projects.types';

export type ProjectTag = {
  name: string;
  icon: string | null;
};

export type ProjectsPageProject = {
  id: string;
  title: string;
  shortDescription: string;
  editorialDescription: string;
  coverImage: ImageVariants;
  projectType: ProjectTag | null;
  technologies: ProjectTag[];
  languages: ProjectTag[];
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  isLive: boolean;
  href: string;
};

export type FilterOption = {
  id: string;
  name: string;
  icon: string | null;
};
