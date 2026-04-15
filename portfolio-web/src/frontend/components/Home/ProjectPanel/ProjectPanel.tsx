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
    small: '/images/Mockup.webp',
    medium: '/images/Mockup.webp',
    large: '/images/Mockup.webp',
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
  stack: ['Next.js', 'MongoDB', 'React-Native', 'Electron', 'API REST', 'Expo'],
  githubUrl: 'https://github.com/donovan-dev-web/portfolio-ecosystem',
  href: '/portfolio-projects',
};

const MANUAL_FEATURED_PROJECTTwo = {
  id: 'furnigo-project',
  title: 'FurniGo Mobile\nE-Commerce App',
  shortDescription:
    'FurniGo : application mobile e-commerce fullstack avec React Native, Spring Boot, paiement Stripe, OAuth2 Google, conformité RGPD et démarche produit structurée.',
  coverImage: {
    small: '/images/furnigo/onboarding.webp',
    medium: '/images/furnigo/onboarding.webp',
    large: '/images/furnigo/onboarding.webp',
  },
  tags: {
    projectTypes: [
      { name: 'Fullstack', icon: null },
      { name: 'Mobile', icon: null },
    ],
    languages: [
      { name: 'TypeScript', icon: null },
      { name: 'Java', icon: null },
    ],
    technologies: [
      { name: 'React-Native', icon: null },
      { name: 'Spring Boot', icon: null },
    ],
  },
  stack: [
    'Spring Boot',
    'PostgreSQL',
    'React-Native',
    'OAuth2',
    'Stripe',
    'CI/CD',
  ],
  githubUrl: 'https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App',
  href: '/furnigo',
};

const MANUAL_FALLBACK_PROJECTS: HomeProject[] = [
  {
    id: 'fallback-1',
    title: 'Projet Fallback 1',
    shortDescription:
      'Projet de secours affiché quand la base ou l’API n’est pas disponible.',
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
      'Deuxième carte de secours, utile pour conserver la section complète.',
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
      'Troisième carte de secours, remplacée automatiquement si le backend répond.',
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
      slug?: string;
      order?: number;
    }>;

    // Trier par ordre croissant
    normalized.sort((a, b) => {
      const orderA =
        typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB =
        typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

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
        href: project.slug ? `/projects/${project.slug}` : '/projects',
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
    // Fallback manuel en cas d’erreur DB / backend.
  }

  return (
    <div className={styles.ProjectLayout}>
      <div className={styles.FeaturedProjectPanel}>
        <article className={styles.FeaturedProjectCards}>
          <div className={styles.ProjectBadgeTwo}>
            <div className={styles.Badgeitem}>
              <Sparkles />
              <span>Projet en Vedette</span>
            </div>
          </div>
          <div className={styles.ProjectTitleTwo}>
            <h3>{MANUAL_FEATURED_PROJECTTwo.title}</h3>
          </div>
          <div className={styles.ProjectImageTwo}>
            <img
              className={styles.FeaturedCoverImages}
              src={MANUAL_FEATURED_PROJECTTwo.coverImage.small}
              srcSet={`${MANUAL_FEATURED_PROJECTTwo.coverImage.medium} 768w, ${MANUAL_FEATURED_PROJECTTwo.coverImage.large} 1280w`}
              sizes="(max-width: 768px) 100vw, 33vw"
              alt={`Aperçu du projet ${MANUAL_FEATURED_PROJECTTwo.title}`}
            />
          </div>
          <div className={styles.ProjectDescription}>
            <p>{MANUAL_FEATURED_PROJECTTwo.shortDescription}</p>
          </div>
          <div className={styles.ProjectTag}>
            <div className={styles.TagsType}>
              <TabletSmartphone />
              <p>
                {MANUAL_FEATURED_PROJECTTwo.tags.projectTypes.length
                  ? MANUAL_FEATURED_PROJECTTwo.tags.projectTypes
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
                {MANUAL_FEATURED_PROJECTTwo.tags.languages.length
                  ? MANUAL_FEATURED_PROJECTTwo.tags.languages
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
                {MANUAL_FEATURED_PROJECTTwo.tags.technologies.length
                  ? MANUAL_FEATURED_PROJECTTwo.tags.technologies
                      .map(
                        (tag) => `${tag.icon ? `${tag.icon} ` : ''}${tag.name}`
                      )
                      .join(', ')
                  : 'Aucun'}
              </p>
            </div>
          </div>
          <div className={styles.ProjectStackTwo}>
            <p>
              {MANUAL_FEATURED_PROJECTTwo.stack.length
                ? MANUAL_FEATURED_PROJECTTwo.stack.map((stack) => (
                    <span key={stack}> {stack} </span>
                  ))
                : 'Non renseignée'}
            </p>
          </div>
          <div className={styles.ProjectCTA}>
            {MANUAL_FEATURED_PROJECTTwo.githubUrl ? (
              <Link
                href={MANUAL_FEATURED_PROJECTTwo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.GithubLink}
              >
                <Github />
                Voir GitHub
              </Link>
            ) : (
              <p>Code source : non disponible</p>
            )}
            <Link
              href={MANUAL_FEATURED_PROJECTTwo.href}
              className={styles.ProjectLink}
            >
              <ExternalLink /> Voir le détail
            </Link>
          </div>
        </article>
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
              alt={`Aperçu du projet ${MANUAL_FEATURED_PROJECT.title}`}
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
                : 'Non renseignée'}
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
                Voir GitHub
              </Link>
            ) : (
              <p>Code source : non disponible</p>
            )}
            <Link
              href={MANUAL_FEATURED_PROJECT.href}
              className={styles.ProjectLink}
            >
              <ExternalLink /> Voir le détail
            </Link>
          </div>
        </article>
      </div>
      <div className={styles.TopProjectPanel}>
        {projectsToDisplay.map((project) => (
          <article className={styles.TopCards} key={project.id}>
            <div className={styles.TopImage}>
              <img
                src={project.coverImage.small}
                srcSet={`${project.coverImage.medium} 768w, ${project.coverImage.large} 1280w`}
                sizes="(max-width: 768px) 100vw, 33vw"
                alt={`Aperçu du projet ${project.title}`}
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
                  : 'Non renseignée'}
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
                Code source
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
