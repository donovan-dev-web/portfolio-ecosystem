import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Blocks,
  ChevronsLeftRightEllipsis,
  ExternalLink,
  Github,
  Sparkles,
  TabletSmartphone,
  Goal,
  BrainCircuit,
  ChartNoAxesCombined,
  Award,
  BrainCog,
} from 'lucide-react';
import { notFound } from 'next/navigation';

import styles from './page.module.scss';
import { connectDB } from '@/backend/database/mongoose';
import { ProjectService } from '@/backend/projects/projects.services';
import type { ImageVariants } from '@/backend/projects/projects.types';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { ProjectGalleryTabs } from '@/frontend/components/Project/ProjectGalleryTabs/ProjectGalleryTabs';

type ProjectTag = {
  name: string;
  icon: string | null;
};

type ProjectDetailsData = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: ImageVariants;
  projectType: ProjectTag | null;
  technologies: ProjectTag[];
  languages: ProjectTag[];
  stack: string[];
  presentation: {
    description: string;
    context: string;
    objectives: string;
    skills: string;
    results: string;
    improvements: string;
  };
  gallery: {
    desktop: ImageVariants;
    mobile: ImageVariants;
    alt: string;
  }[];
  githubUrl: string;
  liveUrl: string;
  isLive: boolean;
};

function toTagItem(value: unknown): ProjectTag | null {
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

function toTagList(value: unknown, max = 6): ProjectTag[] {
  const source = Array.isArray(value) ? value : value ? [value] : [];
  return source
    .map(toTagItem)
    .filter((tag): tag is ProjectTag => Boolean(tag))
    .slice(0, max);
}

function toImageVariants(value: unknown): ImageVariants {
  const fallback: ImageVariants = {
    small: 'https://placehold.co/640x360?text=Project+Small',
    medium: 'https://placehold.co/960x540?text=Project+Medium',
    large: 'https://placehold.co/1440x810?text=Project+Large',
  };

  if (!value || typeof value !== 'object') return fallback;

  const record = value as Record<string, unknown>;

  return {
    small: typeof record.small === 'string' ? record.small : fallback.small,
    medium: typeof record.medium === 'string' ? record.medium : fallback.medium,
    large: typeof record.large === 'string' ? record.large : fallback.large,
  };
}

async function getProjectDetails(
  slug: string
): Promise<ProjectDetailsData | null> {
  await connectDB();

  const project = await ProjectService.getBySlug(slug);

  if (!project) {
    return null;
  }

  const normalized = JSON.parse(JSON.stringify(project)) as {
    _id?: string;
    slug?: string;
    title?: string;
    shortDescription?: string;
    coverImage?: unknown;
    projectType?: unknown;
    technologies?: unknown[];
    languages?: unknown[];
    stack?: string[];
    presentation?: {
      description?: string;
      context?: string;
      objectives?: string;
      skills?: string;
      results?: string;
      improvements?: string;
    };
    gallery?: Array<{
      desktop?: unknown;
      mobile?: unknown;
      alt?: string;
    }>;
    githubUrl?: string;
    liveUrl?: string;
    isLive?: boolean;
  };

  if (!normalized._id || !normalized.slug || !normalized.title) {
    return null;
  }

  return {
    id: normalized._id,
    slug: normalized.slug,
    title: normalized.title,
    shortDescription:
      normalized.shortDescription ||
      'Description non disponible pour ce projet.',
    coverImage: toImageVariants(normalized.coverImage),
    projectType: toTagItem(normalized.projectType),
    technologies: toTagList(normalized.technologies, 6),
    languages: toTagList(normalized.languages, 6),
    stack: Array.isArray(normalized.stack) ? normalized.stack : [],
    presentation: {
      description:
        normalized.presentation?.description ||
        normalized.shortDescription ||
        'Description detaillee non disponible.',
      context:
        normalized.presentation?.context ||
        'Contexte non renseigne pour ce projet.',
      objectives:
        normalized.presentation?.objectives ||
        'Objectifs non renseignes pour ce projet.',
      skills:
        normalized.presentation?.skills ||
        'Competences non renseignees pour ce projet.',
      results:
        normalized.presentation?.results ||
        'Resultats non renseignes pour ce projet.',
      improvements:
        normalized.presentation?.improvements ||
        'Pistes d amelioration non renseignees pour ce projet.',
    },
    gallery: Array.isArray(normalized.gallery)
      ? normalized.gallery.map((item, index) => ({
          desktop: toImageVariants(item.desktop),
          mobile: toImageVariants(item.mobile),
          alt: item.alt || `${normalized.title} visuel ${index + 1}`,
        }))
      : [],
    githubUrl: normalized.githubUrl || '',
    liveUrl: normalized.liveUrl || '',
    isLive: Boolean(normalized.isLive && normalized.liveUrl),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetails(slug);

  if (!project) {
    return {
      title: 'Projet introuvable',
      description: 'La page projet demandee est introuvable.',
    };
  }

  return {
    title: `${project.title} | Projet Web, Mobile ou Fullstack`,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: `/projects/${project.slug}`,
      type: 'article',
      images: [
        {
          url: project.coverImage.large,
        },
      ],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectDetails(slug);

  if (!project || slug !== project.slug) {
    notFound();
  }

  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content={project.projectType?.name || 'Projet'} />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            {project.title.split(' ').slice(0, -1).join(' ') || project.title}{' '}
            <strong>{project.title.split(' ').slice(-1).join(' ')}</strong>
          </h1>
        </div>

        <p className={styles.subTitle}>{project.shortDescription}</p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<ArrowLeft />}
            content="Retour aux projets"
            NavigateTo="/projects"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>

        <div className={styles.heroMeta}>
          <div className={styles.metaCard}>
            <TabletSmartphone />
            <div>
              <strong>Type de projet</strong>
              <span>{project.projectType?.name || 'Non renseigné'}</span>
            </div>
          </div>

          <div className={styles.metaCard}>
            <Blocks />
            <div>
              <strong>Technologies utilisées</strong>
              <span>
                {project.technologies.length
                  ? project.technologies.map((item) => item.name).join(', ')
                  : 'Non renseigné'}
              </span>
            </div>
          </div>

          <div className={styles.metaCard}>
            <ChevronsLeftRightEllipsis />
            <div>
              <strong>Langages</strong>
              <span>
                {project.languages.length
                  ? project.languages.map((item) => item.name).join(', ')
                  : 'Non renseigné'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.coverPanel}>
          <div className={styles.coverVisual}>
            <img
              src={project.coverImage.medium}
              srcSet={`${project.coverImage.small} 640w, ${project.coverImage.medium} 960w, ${project.coverImage.large} 1440w`}
              sizes="(max-width: 900px) 100vw, 90vw"
              alt={project.title}
            />
          </div>

          <div className={styles.coverContent}>
            <h2 className={styles.TitleHTwo}>Présentation du projet</h2>

            <p className={styles.subTitleTwo}>
              {project.presentation.description}
            </p>

            <div className={styles.stackCloud}>
              {project.stack.length ? (
                project.stack.map((item) => <span key={item}>{item}</span>)
              ) : (
                <span>Stack non renseignée</span>
              )}
            </div>

            <div className={styles.externalActions}>
              {project.githubUrl ? (
                <Link
                  href={project.githubUrl}
                  className={styles.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                  Code source
                </Link>
              ) : null}

              {project.isLive ? (
                <Link
                  href={project.liveUrl}
                  className={styles.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink />
                  Voir le projet
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Approche et réalisation</h2>

        <div className={styles.editorialGrid}>
          <article className={styles.editorialCard}>
            <BrainCircuit />
            <h3>Contexte</h3>
            <p>{project.presentation.context}</p>
          </article>

          <article className={styles.editorialCard}>
            <Goal />
            <h3>Objectifs</h3>
            <p>{project.presentation.objectives}</p>
          </article>

          <article className={styles.editorialCard}>
            <BrainCog />
            <h3>Compétences mobilisées</h3>
            <p>{project.presentation.skills}</p>
          </article>

          <article className={styles.editorialCard}>
            <Award />
            <h3>Résultats</h3>
            <p>{project.presentation.results}</p>
          </article>

          <article className={styles.editorialCard}>
            <ChartNoAxesCombined />
            <h3>Axes d’amélioration</h3>
            <p>{project.presentation.improvements}</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Interface du projet</h2>

        <p className={styles.subTitleTwo}>
          Aperçu des différentes interfaces du projet, permettant de visualiser
          l’organisation, l’ergonomie et l’adaptation aux différents formats
          d’écran.
        </p>

        <ProjectGalleryTabs gallery={project.gallery} title={project.title} />
      </section>

      <section className={`${styles.sectionClass} ${styles.bottomCta}`}>
        <h2 className={styles.TitleHTwo}>Profil développeur</h2>

        <p className={styles.subTitleTwo}>
          Ce projet illustre ma manière de concevoir et développer des solutions
          adaptées à un besoin réel. Je recherche un poste de{' '}
          <strong>développeur web</strong>, avec la volonté de m’impliquer sur
          des projets concrets au sein d’une équipe.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<ArrowLeft />}
            content="Voir d’autres projets"
            NavigateTo="/projects"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>
      </section>

      <Footer />
    </>
  );
}
