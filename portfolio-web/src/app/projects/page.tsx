import type { Metadata } from 'next';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import {
  Sparkles,
  FolderOpen,
  Blocks,
  ChevronsLeftRightEllipsis,
  TabletSmartphone,
  LayoutGrid,
  List,
  Github,
  ArrowRight,
} from 'lucide-react';
import { CtaScroll } from '@/frontend/components/Global/CTA_Scroll/ctaScroll';
import styles from './page.module.scss';
import { connectDB } from '@/backend/database/mongoose';
import { ProjectService } from '@/backend/projects/projects.services';
import { ImageVariants } from '@/backend/projects/projects.types';
import { TagService } from '@/backend/tags/tags.services';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { ProjectsExplorer } from '@/frontend/components/Project/ProjectsExplorer/ProjectsExplorer';
import type {
  FilterOption,
  ProjectTag,
  ProjectsPageProject,
} from '@/frontend/components/Project/ProjectsExplorer/projectsExplorer.types';
import { slugifyProjectTitle } from '@/utils/projectSlug';

export const revalidate = 300;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projets Web, Mobile et Fullstack',
  description:
    'Sélection de projets web, mobile et fullstack réalisés par Donovan Chartrain, avec filtres par type, technologies et langages.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projets Web, Mobile et Fullstack',
    description:
      'Découvrez les projets web, mobile et fullstack de Donovan Chartrain.',
    url: '/projects',
    type: 'website',
  },
};

const MANUAL_FEATURED_PROJECT = {
  id: 'portfolio-projects',
  title: 'Portfolio Écosystème',
  shortDescription:
    'Projet vitrine centralisant le site public, un backend API, une application desktop Electron et une application mobile React Native pour administrer l’ensemble.',
  coverImage: {
    small: '/images/Mockup.webp',
    medium: '/images/Mockup.webp',
    large: '/images/Mockup.webp',
  },
  projectType: { name: 'Fullstack', icon: null },
  technologies: [
    { name: 'Next.js', icon: null },
    { name: 'React Native', icon: null },
    { name: 'Electron', icon: null },
  ],
  languages: [{ name: 'TypeScript', icon: null }],
  stack: ['Next.js', 'MongoDB', 'React Native', 'Electron'],
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
  projectType: [
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

const FALLBACK_PROJECTS: ProjectsPageProject[] = [
  {
    id: 'fallback-fullstack',
    title: 'Application fullstack de démonstration',
    shortDescription:
      'Carte de secours pour conserver une page projets complète même en cas d’indisponibilité temporaire du backend.',
    editorialDescription:
      'Projet de démonstration présenté ici comme article de secours. Il sert à conserver une lecture éditoriale de la page, avec plus de contexte, une intention produit claire et une mise en avant des choix techniques majeurs.',
    coverImage: {
      small: 'https://placehold.co/640x360?text=Project+Fallback+1',
      medium: 'https://placehold.co/960x540?text=Project+Fallback+1',
      large: 'https://placehold.co/1440x810?text=Project+Fallback+1',
    },
    projectType: { name: 'Fullstack', icon: null },
    technologies: [{ name: 'Next.js', icon: null }],
    languages: [{ name: 'TypeScript', icon: null }],
    stack: ['Next.js', 'MongoDB', 'API REST'],
    githubUrl: 'https://github.com',
    liveUrl: '',
    isLive: false,
    href: '/projects',
  },
  {
    id: 'fallback-mobile',
    title: 'Application mobile de démonstration',
    shortDescription:
      'Exemple de projet mobile avec administration distante, notifications et écrans métier.',
    editorialDescription:
      'Exemple de projet mobile présenté sous une forme plus narrative afin d’illustrer le besoin utilisateur, les contraintes de réalisation et l’intégration des briques techniques dans un parcours produit cohérent.',
    coverImage: {
      small: 'https://placehold.co/640x360?text=Project+Fallback+2',
      medium: 'https://placehold.co/960x540?text=Project+Fallback+2',
      large: 'https://placehold.co/1440x810?text=Project+Fallback+2',
    },
    projectType: { name: 'Mobile', icon: null },
    technologies: [{ name: 'React Native', icon: null }],
    languages: [{ name: 'TypeScript', icon: null }],
    stack: ['React Native', 'Expo', 'Push Notifications'],
    githubUrl: 'https://github.com',
    liveUrl: '',
    isLive: false,
    href: '/projects',
  },
];

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

function toTagList(value: unknown, max = 4): ProjectTag[] {
  const source = Array.isArray(value) ? value : value ? [value] : [];
  return source
    .map(toTagItem)
    .filter((tag): tag is ProjectTag => Boolean(tag))
    .slice(0, max);
}

function resolveTag(tag: ProjectTag | null, options: FilterOption[]) {
  if (!tag) return null;

  const resolved = options.find(
    (option) => option.id === tag.name || option.name === tag.name
  );

  return resolved ? { name: resolved.name, icon: resolved.icon } : tag;
}

function resolveTagList(tags: ProjectTag[], options: FilterOption[]) {
  return tags
    .map((tag) => resolveTag(tag, options))
    .filter(Boolean) as ProjectTag[];
}

function toCoverImage(value: unknown): ImageVariants {
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

const getProjectsCatalog = unstable_cache(
  async (): Promise<ProjectsPageProject[]> => {
    await connectDB();

    const projects = await ProjectService.getAll();
    const normalized = JSON.parse(JSON.stringify(projects)) as Array<{
      _id?: string;
      title?: string;
      shortDescription?: string;
      presentation?: { description?: string };
      coverImage?: unknown;
      projectType?: unknown;
      technologies?: unknown[];
      languages?: unknown[];
      stack?: string[];
      githubUrl?: string;
      liveUrl?: string;
      isLive?: boolean;
      slug?: string;
      order?: number;
    }>;

    normalized.sort((a, b) => {
      const orderA =
        typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB =
        typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

    return normalized.map((project, index) => ({
      id: project._id || `project-${index}`,
      title: project.title || `Projet ${index + 1}`,
      shortDescription:
        project.shortDescription ||
        'Description non disponible pour ce projet.',
      editorialDescription:
        project.presentation?.description ||
        project.shortDescription ||
        'Présentation détaillée non disponible pour ce projet.',
      coverImage: toCoverImage(project.coverImage),
      projectType: toTagItem(project.projectType),
      technologies: toTagList(project.technologies, 4),
      languages: toTagList(project.languages, 4),
      stack: Array.isArray(project.stack) ? project.stack : [],
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      isLive: Boolean(project.isLive && project.liveUrl),
      href: project.slug ? `/projects/${project.slug}` : '/projects',
    }));
  },
  ['projects-catalog-page'],
  { revalidate }
);

const getProjectsFilters = unstable_cache(
  async (): Promise<{
    projectTypes: FilterOption[];
    technologies: FilterOption[];
    languages: FilterOption[];
  }> => {
    await connectDB();

    const [projectTypes, technologies, languages] = await Promise.all([
      TagService.getAllProjectTypes(),
      TagService.getAllTechnologies(),
      TagService.getAllLanguages(),
    ]);

    const normalize = (items: unknown[]): FilterOption[] =>
      items
        .map((item, index) => {
          const record = item as Record<string, unknown>;
          const id =
            typeof record._id === 'string'
              ? record._id
              : typeof record._id === 'object' && record._id
                ? String(record._id)
                : `tag-${index}`;
          const name = typeof record.name === 'string' ? record.name : '';
          const icon = typeof record.icon === 'string' ? record.icon : null;

          return name ? { id, name, icon } : null;
        })
        .filter((item): item is FilterOption => Boolean(item))
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

    return {
      projectTypes: normalize(
        JSON.parse(JSON.stringify(projectTypes)) as unknown[]
      ),
      technologies: normalize(
        JSON.parse(JSON.stringify(technologies)) as unknown[]
      ),
      languages: normalize(JSON.parse(JSON.stringify(languages)) as unknown[]),
    };
  },
  ['projects-filters-page'],
  { revalidate }
);

const getProjectsPageData = unstable_cache(
  async (): Promise<{
    projects: ProjectsPageProject[];
    filters: {
      projectTypes: FilterOption[];
      technologies: FilterOption[];
      languages: FilterOption[];
    };
  }> => {
    const [projects, filters] = await Promise.all([
      getProjectsCatalog(),
      getProjectsFilters(),
    ]);

    return { projects, filters };
  },
  ['projects-page-data'],
  { revalidate }
);

export default async function ProjectsPage() {
  let projects = FALLBACK_PROJECTS;
  let filters = {
    projectTypes: [] as FilterOption[],
    technologies: [] as FilterOption[],
    languages: [] as FilterOption[],
  };

  try {
    const { projects: fromDb, filters: fromFilters } =
      await getProjectsPageData();
    if (fromDb.length > 0) {
      projects = fromDb;
    }
    filters = fromFilters;
  } catch {
    // Fallback manuel
  }

  const hydratedProjects = projects.map((project) => ({
    ...project,
    projectType: resolveTag(project.projectType, filters.projectTypes),
    technologies: resolveTagList(project.technologies, filters.technologies),
    languages: resolveTagList(project.languages, filters.languages),
    href:
      project.href === '/projects' && project.title
        ? `/projects/${slugifyProjectTitle(project.title)}`
        : project.href,
  }));

  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Projets sélectionnés" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Mes <strong>Projets</strong>
            <br />
            Web & Mobile
          </h1>
        </div>

        <p className={styles.subTitle}>
          Une sélection de projets qui reflète ma capacité à concevoir et
          développer des <strong>sites web</strong>, des{' '}
          <strong>applications</strong> et des
          <strong> outils sur mesure</strong>. Du site vitrine aux projets plus
          complexes, chaque réalisation répond à un
          <strong> besoin concret</strong> avec une approche structurée et
          fiable.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<FolderOpen />}
            content="Voir les projets"
            NavigateTo="#catalogue"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>

        <div>
          <CtaScroll NavigateTo="#featured" />
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Une vision du développement web</h2>

        <p className={styles.subTitleTwo}>
          Les projets présentés ici illustrent ma manière de travailler :
          comprendre un besoin, proposer une solution adaptée et développer
          quelque chose de
          <strong> fiable, maintenable et évolutif</strong>. Je peux intervenir
          aussi bien sur un <strong>site vitrine</strong> que sur des{' '}
          <strong>projets plus techniques</strong> nécessitant une logique
          applicative ou une architecture complète.
        </p>

        <div className={styles.introHighlights}>
          <article className={styles.introCard}>
            <TabletSmartphone />
            <h3>Sites web & interfaces</h3>
            <p>
              Création de sites vitrines, interfaces modernes et expériences web
              adaptées aux différents supports.
            </p>
          </article>

          <article className={styles.introCard}>
            <Blocks />
            <h3>Développement sur mesure</h3>
            <p>
              Mise en place de fonctionnalités spécifiques, outils internes ou
              logiques métiers selon les besoins des projets.
            </p>
          </article>

          <article className={styles.introCard}>
            <ChevronsLeftRightEllipsis />
            <h3>Projets plus avancés</h3>
            <p>
              Capacité à développer des applications complètes avec backend,
              base de données et interactions entre plusieurs plateformes.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass} id="featured">
        <h2 className={styles.TitleHTwo}>Projets principaux</h2>

        <p className={styles.subTitleTwo}>
          Ces projets sont mis en avant pour leur complexité, leur richesse
          fonctionnelle ou leur intérêt technique particulier. Ils illustrent ma
          capacité à gérer des projets plus ambitieux, avec une approche
          structurée et une attention particulière à la qualité du code et de
          l’expérience utilisateur.
        </p>

        <article className={styles.featuredProject}>
          <div className={styles.featuredVisual}>
            <img
              src={MANUAL_FEATURED_PROJECTTwo.coverImage.medium}
              srcSet={`${MANUAL_FEATURED_PROJECTTwo.coverImage.small} 640w, ${MANUAL_FEATURED_PROJECTTwo.coverImage.medium} 960w, ${MANUAL_FEATURED_PROJECTTwo.coverImage.large} 1440w`}
              sizes="(max-width: 900px) 100vw, 48vw"
              alt={MANUAL_FEATURED_PROJECTTwo.title}
            />
          </div>

          <div className={styles.featuredContent}>
            <div className={styles.featuredBadge}>
              <Sparkles />
              <span>Projet principal</span>
            </div>

            <h3>{MANUAL_FEATURED_PROJECTTwo.title}</h3>
            <p>{MANUAL_FEATURED_PROJECTTwo.shortDescription}</p>

            <div className={styles.metaLines}>
              <div className={styles.metaLine}>
                <TabletSmartphone />
                <span>
                  {MANUAL_FEATURED_PROJECTTwo.projectType
                    .map((item) => item.name)
                    .join(', ')}
                </span>
              </div>

              <div className={styles.metaLine}>
                <Blocks />
                <span>
                  {MANUAL_FEATURED_PROJECTTwo.technologies
                    .map((item) => item.name)
                    .join(', ')}
                </span>
              </div>

              <div className={styles.metaLine}>
                <ChevronsLeftRightEllipsis />
                <span>
                  {MANUAL_FEATURED_PROJECTTwo.languages
                    .map((item) => item.name)
                    .join(', ')}
                </span>
              </div>
            </div>

            <div className={styles.stackCloud}>
              {MANUAL_FEATURED_PROJECTTwo.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className={styles.featuredActions}>
              <PrimaryButton
                icons={<ArrowRight />}
                content="Voir le projet"
                NavigateTo={MANUAL_FEATURED_PROJECTTwo.href}
              />
              <Link
                href={MANUAL_FEATURED_PROJECTTwo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                <Github />
                Repository
              </Link>
            </div>
          </div>
        </article>

        <article className={styles.featuredProject}>
          <div className={styles.featuredVisual}>
            <img
              src={MANUAL_FEATURED_PROJECT.coverImage.medium}
              srcSet={`${MANUAL_FEATURED_PROJECT.coverImage.small} 640w, ${MANUAL_FEATURED_PROJECT.coverImage.medium} 960w, ${MANUAL_FEATURED_PROJECT.coverImage.large} 1440w`}
              sizes="(max-width: 900px) 100vw, 48vw"
              alt={MANUAL_FEATURED_PROJECT.title}
            />
          </div>

          <div className={styles.featuredContent}>
            <div className={styles.featuredBadge}>
              <Sparkles />
              <span>Projet principal</span>
            </div>

            <h3>{MANUAL_FEATURED_PROJECT.title}</h3>
            <p>{MANUAL_FEATURED_PROJECT.shortDescription}</p>

            <div className={styles.metaLines}>
              <div className={styles.metaLine}>
                <TabletSmartphone />
                <span>{MANUAL_FEATURED_PROJECT.projectType.name}</span>
              </div>

              <div className={styles.metaLine}>
                <Blocks />
                <span>
                  {MANUAL_FEATURED_PROJECT.technologies
                    .map((item) => item.name)
                    .join(', ')}
                </span>
              </div>

              <div className={styles.metaLine}>
                <ChevronsLeftRightEllipsis />
                <span>
                  {MANUAL_FEATURED_PROJECT.languages
                    .map((item) => item.name)
                    .join(', ')}
                </span>
              </div>
            </div>

            <div className={styles.stackCloud}>
              {MANUAL_FEATURED_PROJECT.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className={styles.featuredActions}>
              <PrimaryButton
                icons={<ArrowRight />}
                content="Voir le projet"
                NavigateTo={MANUAL_FEATURED_PROJECT.href}
              />
              <Link
                href={MANUAL_FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                <Github />
                Repository
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section
        id="catalogue"
        className={`${styles.sectionClass} ${styles.catalogSection}`}
      >
        <h2 className={styles.TitleHTwo}>L’ensemble des projets</h2>

        <p className={styles.subTitleTwo}>
          Chaque projet présenté ici correspond à une problématique réelle :
          création de site, développement spécifique ou mise en place d’outils.
          Ils permettent de visualiser concrètement mon niveau et ma manière de
          travailler.
        </p>

        <ProjectsExplorer
          projects={hydratedProjects}
          projectTypes={filters.projectTypes}
          technologies={filters.technologies}
          languages={filters.languages}
        />
      </section>

      <section className={`${styles.sectionClass} ${styles.bottomCta}`}>
        <h2 className={styles.TitleHTwo}>Profil développeur</h2>

        <p className={styles.subTitleTwo}>
          Je recherche un poste de
          <strong> développeur web</strong>.<br />
          Ces projets illustrent ma capacité à m’intégrer sur des projets
          variés, en agence ou en équipe technique, avec une approche fiable et
          adaptée aux besoins des clients.
        </p>

        <div className={styles.viewHints}>
          <div className={styles.viewHint}>
            <List />
            <span>
              Analyse des besoins et mise en place de solutions adaptées
            </span>
          </div>
          <div className={styles.viewHint}>
            <LayoutGrid />
            <span>
              Maîtrise de différents types de projets et environnements
              techniques
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
