import Link from 'next/link';
import { unstable_cache } from 'next/cache';

import { connectDB } from '@/backend/database/mongoose';
import { ProjectService } from '@/backend/projects/projects.services';
import { ImageVariants } from '@/backend/projects/projects.types';

import {
  Sparkles,
  Blocks,
  TabletSmartphone,
  ChevronsLeftRightEllipsis,
  Github,
  ExternalLink,
} from 'lucide-react';

import styles from './projectPanel.module.scss';

type HomeProject = {
  id: string;
  title: string;
  shortDescription: string;
  coverImage: ImageVariants;
  tags: {
    projectTypes: { name: string; icon: string | null }[];
    languages: { name: string; icon: string | null }[];
    technologies: { name: string; icon: string | null }[];
  };
  stack: string[];
  githubUrl: string;
  href: string;
};

const MANUAL_FEATURED_PROJECT = {
  id: 'portfolio-projects',
  title: 'Portfolio Ecosystème',
  shortDescription:
    'Écosystème complet comprenant une application web fullstack (Next.js), un backend API, une application desktop sous Electron et une application mobile React Native pour l’administration.',
  coverImage: {
    small: 'https://placehold.co/480x270?text=Portfolio+Project+Small',
    medium: 'https://placehold.co/768x432?text=Portfolio+Project+Medium',
    large: 'https://placehold.co/1280x720?text=Portfolio+Project+Large',
  },
  tags: {
    projectTypes: [
      { name: 'Fullstack', icon: null },
      { name: 'Mobile', icon: null },
    ],
    languages: [{ name: 'TypeScript', icon: null }],
    technologies: [
      { name: 'React-Native', icon: null },
      { name: 'Next.js', icon: null },
    ],
  },
  stack: ['Next.js', 'MongoDB', 'React-Native', 'Electron'],
  githubUrl: 'https://github.com',
  href: '/portfolio-projects',
};

const MANUAL_FALLBACK_PROJECTS: HomeProject[] = [
  {
    id: 'fallback-1',
    title: 'Projet Fallback 1',
    shortDescription:
      'Projet de secours affiche quand la base ou l API n est pas disponible.',
    coverImage: {
      small: 'https://placehold.co/480x270?text=Fallback+1+Small',
      medium: 'https://placehold.co/768x432?text=Fallback+1+Medium',
      large: 'https://placehold.co/1280x720?text=Fallback+1+Large',
    },
    tags: {
      projectTypes: [{ name: 'Fullstack', icon: null }],
      languages: [{ name: 'TypeScript', icon: null }],
      technologies: [{ name: 'Next.js', icon: null }],
    },
    stack: ['Next.js', 'TypeScript', 'MongoDB'],
    githubUrl: 'https://github.com',
    href: '/projects',
  },
  {
    id: 'fallback-2',
    title: 'Projet Fallback 2',
    shortDescription:
      'Deuxieme carte de secours, utile pour garder la section complete.',
    coverImage: {
      small: 'https://placehold.co/480x270?text=Fallback+2+Small',
      medium: 'https://placehold.co/768x432?text=Fallback+2+Medium',
      large: 'https://placehold.co/1280x720?text=Fallback+2+Large',
    },
    tags: {
      projectTypes: [{ name: 'Mobile', icon: null }],
      languages: [{ name: 'TypeScript', icon: null }],
      technologies: [{ name: 'React Native', icon: null }],
    },
    stack: ['React Native', 'Node.js'],
    githubUrl: 'https://github.com',
    href: '/projects',
  },
  {
    id: 'fallback-3',
    title: 'Projet Fallback 3',
    shortDescription:
      'Troisieme carte de secours, remplace automatiquement si le backend repond.',
    coverImage: {
      small: 'https://placehold.co/480x270?text=Fallback+3+Small',
      medium: 'https://placehold.co/768x432?text=Fallback+3+Medium',
      large: 'https://placehold.co/1280x720?text=Fallback+3+Large',
    },
    tags: {
      projectTypes: [{ name: 'Backend', icon: null }],
      languages: [{ name: 'JavaScript', icon: null }],
      technologies: [{ name: 'Express', icon: null }],
    },
    stack: ['Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com',
    href: '/projects',
  },
];

function toTagItem(
  value: unknown
): { name: string; icon: string | null } | null {
  if (typeof value === 'string') {
    const name = value.trim();
    return name ? { name, icon: null } : null;
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const rawName = record.name || record.label || record.title || record.slug;
    const rawIcon = record.icon;
    const name = typeof rawName === 'string' ? rawName.trim() : '';
    const icon = typeof rawIcon === 'string' ? rawIcon.trim() : '';

    if (name) {
      return { name, icon: icon || null };
    }
  }

  return null;
}

function toTagList(
  value: unknown,
  max = 2
): { name: string; icon: string | null }[] {
  const source = Array.isArray(value) ? value : value ? [value] : [];
  const normalized = source
    .map(toTagItem)
    .filter((tag): tag is { name: string; icon: string | null } =>
      Boolean(tag)
    );

  return normalized.slice(0, max);
}

function toCoverImage(value: unknown): ImageVariants {
  const fallback: ImageVariants = {
    small: 'https://placehold.co/480x270?text=Project+Small',
    medium: 'https://placehold.co/768x432?text=Project+Medium',
    large: 'https://placehold.co/1280x720?text=Project+Large',
  };

  if (!value || typeof value !== 'object') return fallback;

  const record = value as Record<string, unknown>;
  const small =
    typeof record.small === 'string' ? record.small : fallback.small;
  const medium =
    typeof record.medium === 'string' ? record.medium : fallback.medium;
  const large =
    typeof record.large === 'string' ? record.large : fallback.large;

  return { small, medium, large };
}

const getTopProjects = unstable_cache(
  async (): Promise<HomeProject[]> => {
    await connectDB();

    const projects = await ProjectService.getAll();

    // Convertit les documents Mongoose en donnees simples et limite a 3.
    const normalized = JSON.parse(JSON.stringify(projects)) as Array<{
      _id?: string;
      title?: string;
      shortDescription?: string;
      coverImage?: unknown;
      projectType?: unknown;
      technologies?: unknown[];
      languages?: unknown[];
      stack?: string[];
      githubUrl?: string;
    }>;

    return normalized.slice(0, 3).map((project, index) => {
      const id = project._id || `project-${index}`;
      const tags = {
        projectTypes: toTagList(project.projectType, 2),
        technologies: toTagList(project.technologies, 2),
        languages: toTagList(project.languages, 2),
      };

      return {
        id,
        title: project.title || `Projet ${index + 1}`,
        shortDescription:
          project.shortDescription ||
          'Description non disponible pour ce projet.',
        coverImage: toCoverImage(project.coverImage),
        tags,
        stack: project.stack || [],
        githubUrl: project.githubUrl || 'https://github.com',
        href: project._id ? `/projects/${project._id}` : '/projects',
      };
    });
  },
  ['home-top-projects'],
  { revalidate: 300 }
);

export default async function ProjectPanel() {
  let projectsToDisplay = MANUAL_FALLBACK_PROJECTS;
  let dataSource = 'fallback manuel';

  try {
    const backendProjects = await getTopProjects();

    if (backendProjects.length > 0) {
      projectsToDisplay = backendProjects;
      dataSource = 'backend';
    }
  } catch {
    // Fallback manuel en cas d erreur DB / backend.
  }

  return (
    <div className={styles.ProjectLayout}>
      <article className={styles.FeaturedProjectCards}>
        <div className={styles.ProjectBadge}>
          <div className={styles.Badgeitem}>
            <Sparkles />
            <span>Projet en Vedette</span>
          </div>
        </div>
        <div className={styles.ProjectTitle}>
          <h3>{MANUAL_FEATURED_PROJECT.title}</h3>
        </div>
        <div className={styles.ProjectImage}>
          <img
            className={styles.FeaturedCoverImages}
            src={MANUAL_FEATURED_PROJECT.coverImage.small}
            srcSet={`${MANUAL_FEATURED_PROJECT.coverImage.medium} 768w, ${MANUAL_FEATURED_PROJECT.coverImage.large} 1280w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={`Cover ${MANUAL_FEATURED_PROJECT.title}`}
          />
        </div>
        <div className={styles.ProjectDescription}>
          <p>{MANUAL_FEATURED_PROJECT.shortDescription}</p>
        </div>
        <div className={styles.ProjectTag}>
          <div className={styles.TagsType}>
            <TabletSmartphone />
            <p>
              {MANUAL_FEATURED_PROJECT.tags.projectTypes.length
                ? MANUAL_FEATURED_PROJECT.tags.projectTypes
                    .map(
                      (tag) => `${tag.icon ? `${tag.icon} ` : ''}${tag.name}`
                    )
                    .join(', ')
                : 'Aucun'}
            </p>
          </div>
          <div className={styles.TagsLang}>
            <ChevronsLeftRightEllipsis />
            <p>
              {MANUAL_FEATURED_PROJECT.tags.languages.length
                ? MANUAL_FEATURED_PROJECT.tags.languages
                    .map(
                      (tag) => `${tag.icon ? `${tag.icon} ` : ''}${tag.name}`
                    )
                    .join(', ')
                : 'Aucun'}
            </p>
          </div>
          <div className={styles.TagsTech}>
            <Blocks />
            <p>
              {MANUAL_FEATURED_PROJECT.tags.technologies.length
                ? MANUAL_FEATURED_PROJECT.tags.technologies
                    .map(
                      (tag) => `${tag.icon ? `${tag.icon} ` : ''}${tag.name}`
                    )
                    .join(', ')
                : 'Aucun'}
            </p>
          </div>
        </div>
        <div className={styles.ProjectStack}>
          <p>
            {MANUAL_FEATURED_PROJECT.stack.length
              ? MANUAL_FEATURED_PROJECT.stack.map((stack) => (
                  <span key={stack}> {stack} </span>
                ))
              : 'Non renseignee'}
          </p>
        </div>
        <div className={styles.ProjectCTA}>
          {MANUAL_FEATURED_PROJECT.githubUrl ? (
            <Link
              href={MANUAL_FEATURED_PROJECT.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.GithubLink}
            >
              <Github />
              Voir Github
            </Link>
          ) : (
            <p>Code source: non disponible</p>
          )}
          <Link
            href={MANUAL_FEATURED_PROJECT.href}
            className={styles.ProjectLink}
          >
            <ExternalLink /> Voir le detail
          </Link>
        </div>
      </article>
      <div className={styles.TopProjectPanel}>
        {projectsToDisplay.map((project) => (
          <article className={styles.TopCards} key={project.id}>
            <div className={styles.TopImage}>
              <img
                src={project.coverImage.small}
                srcSet={`${project.coverImage.medium} 768w, ${project.coverImage.large} 1280w`}
                sizes="(max-width: 768px) 100vw, 33vw"
                alt={`Cover ${project.title}`}
              />
            </div>
            <div className={styles.TopData}>
              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>
              <p>
                {project.stack.length
                  ? project.stack.map((stack) => (
                      <span key={stack}> {stack} </span>
                    ))
                  : 'Non renseignee'}
              </p>
            </div>
            <div className={styles.TopLink}>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.GithubLink}
              >
                <Github />
                Code Source
              </Link>
              <Link href={project.href} className={styles.ProjectLink}>
                <ExternalLink />
                Voir le projet
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
