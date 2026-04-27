import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AppWindow,
  Smartphone,
  Globe,
  Database,
  BellRing,
  PanelsTopLeft,
  ShieldCheck,
  Workflow,
  Blocks,
  Sparkles,
  FolderGit2,
  Mail,
  Palette,
  Search,
  Server,
  Layers3,
  MonitorSmartphone,
  ArrowRight,
} from 'lucide-react';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';

export const metadata: Metadata = {
  title: 'Portfolio Écosystème - Projet principal',
  description:
    'Étude de cas complète du projet principal de Donovan Chartrain : site public Next.js, backend API, application desktop Electron, application mobile React Native, conception produit, design, SEO et administration multi-supports.',
  alternates: {
    canonical: '/portfolio-projects',
  },
  openGraph: {
    title: 'Portfolio Écosystème - Projet principal',
    description:
      'Une présentation complète du projet principal : architecture, interfaces, administration, mobile, desktop, SEO et logique produit.',
    url: '/portfolio-projects',
    type: 'article',
  },
};

const ecosystemParts = [
  {
    icon: <Globe />,
    title: 'Site public web',
    text: 'Une vitrine publique en Next.js orientée SEO, avec des pages éditoriales, une présentation des projets, un contact et des objectifs de conversion.',
  },
  {
    icon: <Database />,
    title: 'Backend API',
    text: 'Une couche backend structurée autour des projets, des messages, des documents, des tags, de l’authentification et des notifications push.',
  },
  {
    icon: <AppWindow />,
    title: 'Application desktop',
    text: 'Un back-office Electron / React pour piloter les contenus, consulter les messages et administrer les ressources avec davantage de confort.',
  },
  {
    icon: <Smartphone />,
    title: 'Application mobile',
    text: 'Une application React Native / Expo pour garder une vision mobile du projet et permettre certains usages d’administration en situation nomade.',
  },
];

const featurePoints = [
  {
    icon: <PanelsTopLeft />,
    title: 'Expérience multi-interface',
    text: 'Le projet relie une surface publique, un back-office desktop et une application mobile autour d’une même base fonctionnelle.',
  },
  {
    icon: <Workflow />,
    title: 'Architecture cohérente',
    text: 'Les modèles métier, les contenus et les flux sont organisés de façon homogène pour éviter les duplications et maintenir une logique claire.',
  },
  {
    icon: <BellRing />,
    title: 'Événements et feedback',
    text: 'Les notifications push permettent de faire remonter certains événements importants, comme les nouveaux messages ou les téléchargements du CV.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Prise en compte produit',
    text: 'Consentement aux cookies, mentions légales, gestion documentaire, administration des données et séparation entre usages publics et privés.',
  },
];

const stackGroups = [
  {
    label: 'Web',
    items: ['Next.js', 'React', 'TypeScript', 'Sass', 'App Router'],
  },
  {
    label: 'Backend',
    items: [
      'Route Handlers',
      'MongoDB',
      'Mongoose',
      'Zod',
      'JWT',
      'Vercel Blob',
    ],
  },
  {
    label: 'Desktop',
    items: ['Electron', 'React', 'Vite', 'TypeScript'],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'Expo', 'Navigation', 'Notifications'],
  },
];

const detailedSections = [
  {
    id: 'web',
    badge: 'Surface publique',
    title: 'Plateforme web : vitrine, contenus et conversion',
    icon: <Globe />,
    image: '/images/WebPortfolio.webp',
    intro:
      'La partie web publique a pour objectif de présenter le profil, l’expertise et les projets de manière claire, professionnelle et exploitable par des recruteurs techniques comme non techniques.',
    blocks: [
      {
        title: 'Front-end et expérience utilisateur',
        text: 'Le front est conçu avec Next.js et React autour d’une logique éditoriale : hero, pages de contenu, catalogue de projets, fiches détaillées, page de contact, mentions légales et parcours de navigation cohérents. Le travail porte autant sur la structure du contenu que sur la qualité visuelle, la lisibilité et l’expérience responsive.',
      },
      {
        title: 'Design, UI et perception produit',
        text: 'L’interface a été pensée comme une véritable identité de portfolio, avec une direction visuelle cohérente, des sections rythmées, une hiérarchie typographique claire et des composants réutilisables. L’objectif est de donner une perception professionnelle, et non celle d’un simple template assemblé.',
      },
      {
        title: 'SEO et accessibilité',
        text: 'Les pages publiques intègrent des titres, des descriptions, des URL propres, un sitemap, des règles robots, des métadonnées Open Graph, des pages détaillées pré-rendues et des contenus structurés pour faciliter le crawl et l’indexation. Le site prend aussi en compte les mentions légales, la confidentialité et le consentement aux cookies.',
      },
    ],
  },
  {
    id: 'backend',
    badge: 'Couche métier',
    title: 'Backend API : structure, données et logique métier',
    icon: <Server />,
    image: '/images/API_Docs.webp',
    intro:
      'La couche backend permet de transformer le portfolio en produit administrable. Elle gère les données, la validation, les ressources, l’authentification et certains comportements applicatifs, comme les notifications.',
    blocks: [
      {
        title: 'Organisation et modélisation',
        text: 'Le backend est structuré par domaines fonctionnels : projets, messages, documents, tags, authentification et push tokens. Chaque domaine repose sur une séparation claire entre modèles, requêtes, schémas de validation, services métier et typage TypeScript.',
      },
      {
        title: 'Administration et stockage',
        text: 'Les projets, images, CV et métadonnées sont gérés via l’API puis stockés entre MongoDB et Vercel Blob. Cela permet de manipuler des contenus réellement dynamiques tout en gardant une présentation publique stable et optimisée.',
      },
      {
        title: 'Documentation et exposition technique',
        text: 'L’API dispose aussi d’une documentation accessible publiquement, ce qui permet de montrer la façon dont les endpoints sont exposés, organisés et pensés pour des usages desktop, mobile ou d’administration.',
      },
    ],
    cta: {
      label: 'Voir la documentation API',
      href: '/api-docs',
    },
  },
  {
    id: 'desktop',
    badge: 'Back-office desktop',
    title: 'Application desktop : administration et confort d’usage',
    icon: <AppWindow />,
    image: '/images/Admin_D.webp',
    intro:
      'La version desktop montre la capacité à concevoir un outil interne plus opérationnel, avec une expérience d’administration plus dense et plus confortable que sur mobile.',
    blocks: [
      {
        title: 'Pilotage des contenus',
        text: 'L’application desktop permet de gérer les projets, les tags, les messages reçus et les documents. Elle répond à un vrai besoin d’administration, avec des écrans orientés consultation, édition, suppression et mise à jour.',
      },
      {
        title: 'Logique produit et ergonomie',
        text: 'Le desktop n’est pas seulement une duplication du site. C’est une interface de travail, plus adaptée à la productivité, à la gestion fine des données et à certains parcours d’édition plus complets.',
      },
      {
        title: 'Electron, React et Vite',
        text: 'Cette partie du projet illustre ma capacité à étendre une logique web vers un environnement desktop, tout en conservant une cohérence d’architecture, de composants et de services API.',
      },
    ],
  },
  {
    id: 'mobile',
    badge: 'Usage mobile',
    title: 'Application mobile : consultation et administration nomade',
    icon: <Smartphone />,
    image: '/images/Admin_M.webp',
    intro:
      'La partie mobile prolonge le projet dans un contexte d’usage différent : consultation rapide, administration mobile et réception d’informations en situation de mobilité.',
    blocks: [
      {
        title: 'React Native et Expo',
        text: 'L’application mobile a été pensée comme une extension logique de l’écosystème. Elle montre la capacité à adapter les parcours, les composants et la navigation à des usages plus compacts et plus mobiles.',
      },
      {
        title: 'Notifications et contexte temps réel',
        text: 'L’intégration des notifications push permet de transformer la relation au projet : un événement important peut être remonté sans passer par le site ou l’application desktop.',
      },
      {
        title: 'Vision cross-platform',
        text: 'Cette partie souligne une capacité à concevoir un même produit sur plusieurs surfaces, avec des priorités différenciées selon le support et le contexte utilisateur.',
      },
    ],
  },
];

const transversalAreas = [
  {
    icon: <Palette />,
    title: 'Conception et direction visuelle',
    text: 'Le projet a demandé un vrai travail de cadrage visuel, de composants, d’identité graphique et de cohérence entre les différentes surfaces.',
  },
  {
    icon: <Search />,
    title: 'SEO et visibilité',
    text: 'Le site public a été pensé comme un outil de visibilité professionnelle, avec des pages crawlables, des slugs propres, un sitemap, des métadonnées et des contenus utiles au recrutement.',
  },
  {
    icon: <Layers3 />,
    title: 'Conception produit',
    text: 'Au-delà de la technique, le projet repose sur une logique d’usage : présentation publique, administration interne, réception de messages et évolution continue des contenus.',
  },
  {
    icon: <MonitorSmartphone />,
    title: 'Cohésion multi-support',
    text: 'Le même sujet a été décliné sur web, desktop et mobile, avec une adaptation de l’expérience plutôt qu’une simple répétition des interfaces.',
  },
];

export default function PortfolioProjectsPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Projet principal" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Portfolio <strong>Écosystème</strong>
          </h1>
        </div>

        <p className={styles.subTitle}>
          Ce projet est la pièce centrale de mon portfolio. <br /> Il illustre
          ma capacité à concevoir un <strong>écosystème complet</strong> autour
          d’une même base fonctionnelle :<br /> <strong>site public</strong>,
          <strong> backend API</strong>, <strong>application desktop</strong> et{' '}
          <strong>application mobile</strong>.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<Sparkles />}
            content="Voir tous les projets"
            NavigateTo="/projects"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>

        <div className={styles.heroVisualPanel}>
          <img
            src="/images/Mockup.webp"
            alt="Mockup global des interfaces web, desktop et mobile du projet portfolio"
            className={styles.heroVisual}
          />
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStatCard}>
            <strong>4 surfaces produit</strong>
            <span>web public, backend, desktop et mobile</span>
          </div>
          <div className={styles.heroStatCard}>
            <strong>1 logique métier unifiée</strong>
            <span>contenus, messages, documents et administration</span>
          </div>
          <div className={styles.heroStatCard}>
            <strong>Vision fullstack</strong>
            <span>interface, données, APIs, distribution et usage</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Vision du projet</h2>

        <p className={styles.subTitleTwo}>
          L’objectif n’était pas seulement de créer un portfolio esthétique,
          mais de construire un <strong>produit complet</strong> capable de
          présenter mon profil, centraliser mes contenus, administrer les
          données et créer un lien direct entre{' '}
          <strong>visibilité publique</strong> et{' '}
          <strong>pilotage interne</strong>.
        </p>

        <p className={styles.subTitleTwo}>
          Pour un recruteur, ce projet montre concrètement ma capacité à penser
          un sujet comme un <strong>écosystème logiciel</strong> : conception de
          l’interface publique, structuration des APIs, modélisation des
          données, outils d’administration et prise en compte des usages sur
          plusieurs environnements.
        </p>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Les briques de l’écosystème</h2>

        <div className={styles.ecosystemGrid}>
          {ecosystemParts.map((part) => (
            <article key={part.title} className={styles.ecosystemCard}>
              {part.icon}
              <h3>{part.title}</h3>
              <p>{part.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Ce que ce projet démontre</h2>

        <ul className={styles.workList}>
          {featurePoints.map((point) => (
            <li key={point.title} className={styles.workListItems}>
              <h3 className={styles.workListTitle}>{point.title}</h3>
              <p className={styles.workListDescribe}>{point.text}</p>
              <div className={styles.workListGlowUp}>
                <div className={styles.workListGlowUpItems}>
                  {point.icon}
                  <span>Application concrète dans un produit réel</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Architecture et logique produit</h2>

        <div className={styles.editorialPanel}>
          <article className={styles.editorialBlock}>
            <h3>Présentation publique</h3>
            <p>
              Le site public met en avant le profil, l’expertise, les projets,
              le contact, le CV et les aspects SEO. Il est pensé pour une
              consultation fluide, responsive et exploitable par les moteurs de
              recherche.
            </p>
          </article>

          <article className={styles.editorialBlock}>
            <h3>Administration centralisée</h3>
            <p>
              Les contenus ne sont pas figés. Les projets, documents, tags et
              messages sont gérés via des outils d’administration reliés à une
              API commune et à une base de données MongoDB.
            </p>
          </article>

          <article className={styles.editorialBlock}>
            <h3>Usage desktop et mobile</h3>
            <p>
              Le back-office ne se limite pas à un seul support. Une application
              desktop Electron et une application mobile React Native permettent
              d’administrer les contenus selon le contexte d’usage.
            </p>
          </article>

          <article className={styles.editorialBlock}>
            <h3>Événements et notifications</h3>
            <p>
              Le projet intègre une logique de notifications push pour faire
              remonter certains événements importants, comme la réception d’un
              message ou le téléchargement du CV.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Lecture détaillée du projet</h2>

        <div className={styles.caseStudyFlow}>
          {detailedSections.map((section, index) => (
            <article key={section.id} className={styles.caseStudySection}>
              <div
                className={
                  index % 2 === 0
                    ? styles.caseStudyMedia
                    : styles.caseStudyMediaRight
                }
              >
                <img
                  src={section.image}
                  alt={section.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.caseStudyContent}>
                <div className={styles.caseStudyBadge}>
                  {section.icon}
                  <span>{section.badge}</span>
                </div>

                <h3>{section.title}</h3>
                <p className={styles.caseStudyIntro}>{section.intro}</p>

                <div className={styles.caseStudyBlocks}>
                  {section.blocks.map((block) => (
                    <div key={block.title} className={styles.caseStudyBlock}>
                      <h4>{block.title}</h4>
                      <p>{block.text}</p>
                    </div>
                  ))}
                </div>

                {section.cta ? (
                  <div className={styles.caseStudyActions}>
                    <Link href={section.cta.href} className={styles.inlineLink}>
                      <ArrowRight />
                      {section.cta.label}
                    </Link>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>
          Conception, design et positionnement
        </h2>

        <p className={styles.subTitleTwo}>
          Ce projet ne repose pas uniquement sur la technique. Il mobilise aussi
          des compétences de <strong>conception</strong>, de{' '}
          <strong>design</strong>, d’<strong>organisation de contenu</strong> et
          de <strong>positionnement SEO</strong>. L’objectif était de faire de
          ce portfolio un outil professionnel, lisible, utile et convaincant.
        </p>

        <div className={styles.recruiterGrid}>
          {transversalAreas.map((area) => (
            <article key={area.title} className={styles.recruiterCard}>
              {area.icon}
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Stack et technologies</h2>

        <div className={styles.stackPanel}>
          {stackGroups.map((group) => (
            <article key={group.label} className={styles.stackCard}>
              <div className={styles.stackHead}>
                <Blocks />
                <h3>{group.label}</h3>
              </div>
              <div className={styles.stackCloud}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Intérêt pour un recruteur</h2>

        <p className={styles.subTitleTwo}>
          Ce projet est intéressant dans une logique de recrutement, car il ne
          montre pas seulement ma capacité à intégrer une interface. Il montre
          aussi que je sais construire un <strong>produit cohérent</strong>,
          penser les <strong>flux de données</strong>, organiser un backend,
          créer des <strong>surfaces d’administration</strong> et faire
          dialoguer plusieurs applications autour d’un même besoin.
        </p>

        <div className={`${styles.recruiterGrid} ${styles.TypeTwo}`}>
          <article className={styles.recruiterCard}>
            <FolderGit2 />
            <h3>Vision projet complète</h3>
            <p>
              De la vitrine publique jusqu’aux outils internes, avec une logique
              de produit et pas seulement de pages isolées.
            </p>
          </article>

          <article className={styles.recruiterCard}>
            <Workflow />
            <h3>Capacité d’orchestration</h3>
            <p>
              Organisation des composants, des routes API, de la base de données
              et des parcours multi-supports.
            </p>
          </article>

          <article className={styles.recruiterCard}>
            <Mail />
            <h3>Orientation usage réel</h3>
            <p>
              Gestion de messages, documents, notifications, SEO, aspects légaux
              et consentement dans un cadre concret.
            </p>
          </article>
        </div>
      </section>

      <section className={`${styles.sectionClass} ${styles.bottomCta}`}>
        <h2 className={styles.TitleHTwo}>
          Travaillons sur des projets ambitieux
        </h2>

        <p className={styles.subTitleTwo}>
          Si vous recherchez un développeur web capable de prendre en charge un
          sujet dans sa globalité, de l’interface jusqu’à la logique métier et
          aux outils d’administration, ce projet donne un aperçu concret de ma
          façon de travailler.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<Sparkles />}
            content="Voir mon expertise"
            NavigateTo="/expertise"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>
      </section>

      <Footer />
    </>
  );
}
