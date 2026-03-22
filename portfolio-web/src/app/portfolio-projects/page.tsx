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
  title: 'Portfolio Ecosysteme - Projet principal',
  description:
    'Case study complete du projet principal de Donovan Chartrain : site public Next.js, backend API, application desktop Electron, application mobile React Native, conception produit, design, SEO et administration multi-supports.',
  alternates: {
    canonical: '/portfolio-projects',
  },
  openGraph: {
    title: 'Portfolio Ecosysteme - Projet principal',
    description:
      'Une presentation complete du projet principal : architecture, interfaces, administration, mobile, desktop, SEO et logique produit.',
    url: '/portfolio-projects',
    type: 'article',
  },
};

const ecosystemParts = [
  {
    icon: <Globe />,
    title: 'Site public web',
    text: 'Une vitrine publique en Next.js orientee SEO, pages editoriales, presentation des projets, contact et conversion.',
  },
  {
    icon: <Database />,
    title: 'Backend API',
    text: 'Une couche backend structuree autour des projets, messages, documents, tags, authentification et notifications push.',
  },
  {
    icon: <AppWindow />,
    title: 'Application desktop',
    text: 'Un back-office Electron / React pour piloter les contenus, consulter les messages et administrer les ressources avec plus de confort.',
  },
  {
    icon: <Smartphone />,
    title: 'Application mobile',
    text: 'Une application React Native / Expo pour garder une vision mobile du projet et permettre certains usages d administration en situation nomade.',
  },
];

const featurePoints = [
  {
    icon: <PanelsTopLeft />,
    title: 'Experience multi-interface',
    text: 'Le projet relie une surface publique, un back-office desktop et une application mobile autour d une meme base fonctionnelle.',
  },
  {
    icon: <Workflow />,
    title: 'Architecture coherente',
    text: 'Les modeles metier, les contenus et les flux sont organises de facon homogene pour eviter les duplications et maintenir une logique claire.',
  },
  {
    icon: <BellRing />,
    title: 'Evenements et feedback',
    text: 'Les notifications push permettent de remonter certains evenements importants comme les nouveaux messages ou les telechargements du CV.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Prise en compte produit',
    text: 'Consentement cookies, mentions legales, gestion documentaire, administration des donnees et separation entre usages publics et prives.',
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
    title: 'Plateforme web : vitrine, contenu et conversion',
    icon: <Globe />,
    image:
      'https://placehold.co/1280x820?text=Mockup+Web+Desktop+%2B+Navigation+publique',
    intro:
      'La partie web publique a pour objectif de presenter le profil, l expertise et les projets de maniere claire, professionnelle et exploitable par des recruteurs techniques comme non techniques.',
    blocks: [
      {
        title: 'Front-end et experience utilisateur',
        text: 'Le front est concu avec Next.js et React autour d une logique editoriale : hero, pages de contenu, catalogue projets, fiches detaillees, page contact, legal et parcours de navigation coherents. Le travail porte autant sur la structure du contenu que sur la qualite visuelle, la lisibilite et l experience responsive.',
      },
      {
        title: 'Design, UI et perception produit',
        text: 'L interface a ete pensee comme une vraie identite de portfolio, avec une direction visuelle coherente, des sections rythmees, une hierarchie typographique claire et des composants reutilisables. L objectif est de donner une perception professionnelle et non celle d un simple template assemble.',
      },
      {
        title: 'SEO et accesibilite',
        text: 'Les pages publiques integrent titres, descriptions, URLs propres, sitemap, robots, metadata Open Graph, pages detaillees pre-rendues et contenus structurees pour aider le crawl et l indexation. Le site prend aussi en compte les mentions legales, la confidentialite et le consentement cookies.',
      },
    ],
  },
  {
    id: 'backend',
    badge: 'Couche metier',
    title: 'Backend API : structure, donnees et logique metier',
    icon: <Server />,
    image:
      'https://placehold.co/1280x820?text=Schema+API+%2B+Base+de+donnees+%2B+Endpoints',
    intro:
      'La couche backend permet de transformer le portfolio en produit administrable. Elle gere les donnees, la validation, les ressources, l authentification et certains comportements applicatifs comme les notifications.',
    blocks: [
      {
        title: 'Organisation et modelisation',
        text: 'Le backend est structure par domaines fonctionnels : projets, messages, documents, tags, authentification et push tokens. Chaque domaine repose sur une separation claire entre modeles, requetes, schemas de validation, services metier et typage TypeScript.',
      },
      {
        title: 'Administration et stockage',
        text: 'Les projets, images, CV et metadonnees sont geres via l API puis stockes entre MongoDB et Vercel Blob. Cela permet de manipuler des contenus reelement dynamiques tout en gardant une presentation publique stable et optimisee.',
      },
      {
        title: 'Documentation et exposition technique',
        text: 'L API dispose aussi d une documentation accessible publiquement, ce qui permet de montrer la facon dont les endpoints sont exposes, organises et penses pour des usages desktop, mobile ou d administration.',
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
    title: 'Application desktop : administration et confort d usage',
    icon: <AppWindow />,
    image:
      'https://placehold.co/1280x820?text=Mockup+Application+Desktop+Admin',
    intro:
      'La version desktop montre la capacite a concevoir un outil interne plus operationnel, avec une experience d administration plus dense et plus confortable que sur mobile.',
    blocks: [
      {
        title: 'Pilotage des contenus',
        text: 'L application desktop permet de gerer les projets, les tags, les messages recus et les documents. Elle repond a un vrai besoin d administration, avec des ecrans orientes consultation, edition, suppression et mise a jour.',
      },
      {
        title: 'Logique produit et ergonomie',
        text: 'Le desktop n est pas seulement une duplication du site. C est une interface de travail, plus adaptee a la productivite, a la gestion fine des donnees et a certains parcours d edition plus complets.',
      },
      {
        title: 'Electron, React et Vite',
        text: 'Cette partie du projet illustre ma capacite a etendre une logique web vers un environnement desktop, tout en conservant une coherence d architecture, de composants et de services API.',
      },
    ],
  },
  {
    id: 'mobile',
    badge: 'Usage mobile',
    title: 'Application mobile : consultation et administration nomade',
    icon: <Smartphone />,
    image: 'https://placehold.co/880x1280?text=Mockup+Application+Mobile+Admin',
    intro:
      'La partie mobile prolonge le projet dans un contexte d usage different : consultation rapide, administration mobile et reception d informations en situation de mobilite.',
    blocks: [
      {
        title: 'React Native et Expo',
        text: 'L application mobile a ete pensee comme une extension logique de l ecosysteme. Elle montre la capacite a adapter les parcours, les composants et la navigation a des usages plus compacts et plus mobiles.',
      },
      {
        title: 'Notifications et contexte temps reel',
        text: 'L integration des notifications push permet de transformer la relation au projet : un evenement important peut etre remonte sans passer par le site ou l application desktop.',
      },
      {
        title: 'Vision cross-platform',
        text: 'Cette partie souligne une capacite a concevoir un meme produit sur plusieurs surfaces, avec des priorites differenciees selon le support et le contexte utilisateur.',
      },
    ],
  },
];

const transversalAreas = [
  {
    icon: <Palette />,
    title: 'Conception et direction visuelle',
    text: 'Le projet a demande un vrai travail de cadrage visuel, de composants, d identite graphique et de coherence entre les differentes surfaces.',
  },
  {
    icon: <Search />,
    title: 'SEO et visibilite',
    text: 'Le site public a ete pense comme un outil de visibilite professionnelle avec pages crawlables, slugs propres, sitemap, metadata et contenus utiles au recrutement.',
  },
  {
    icon: <Layers3 />,
    title: 'Conception produit',
    text: 'Au-dela de la technique, le projet repose sur une logique d usage : presentation publique, administration interne, reception de messages et evolution continue des contenus.',
  },
  {
    icon: <MonitorSmartphone />,
    title: 'Cohesion multi-support',
    text: 'Le meme sujet a ete decliné sur web, desktop et mobile, avec une adaptation de l experience plutot qu une simple repetition des interfaces.',
  },
];

export default function PortfolioProjectsPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Projet principal" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Portfolio <strong>Ecosysteme</strong>
          </h1>
        </div>

        <p className={styles.subTitle}>
          Ce projet est la piece centrale de mon portfolio. Il illustre ma
          capacite a concevoir un <strong>ecosysteme complet</strong> autour d
          une meme base fonctionnelle : <strong>site public</strong>,
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
            src="https://placehold.co/300x300?text=Mockup+Web+%2B+Desktop+%2B+Mobile+du+Portfolio"
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
            <strong>1 logique metier unifiee</strong>
            <span>contenus, messages, documents et administration</span>
          </div>
          <div className={styles.heroStatCard}>
            <strong>Vision fullstack</strong>
            <span>interface, donnees, APIs, distribution et usage</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Vision du projet</h2>

        <p className={styles.subTitleTwo}>
          L objectif n etait pas seulement de creer un portfolio esthetique,
          mais de construire un <strong>produit complet</strong> capable de
          presenter mon profil, centraliser mes contenus, administrer les
          donnees et creer un lien direct entre{' '}
          <strong>visibilite publique</strong> et{' '}
          <strong>pilotage interne</strong>.
        </p>

        <p className={styles.subTitleTwo}>
          Pour un recruteur, ce projet montre concretement ma capacite a penser
          un sujet comme un <strong>ecosysteme logiciel</strong> : conception de
          l interface publique, structuration des APIs, modelisation des
          donnees, outils d administration et prise en compte des usages sur
          plusieurs environnements.
        </p>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Les briques de l ecosysteme</h2>

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
        <h2 className={styles.TitleHTwo}>Ce que ce projet demontre</h2>

        <ul className={styles.workList}>
          {featurePoints.map((point) => (
            <li key={point.title} className={styles.workListItems}>
              <h3 className={styles.workListTitle}>{point.title}</h3>
              <p className={styles.workListDescribe}>{point.text}</p>
              <div className={styles.workListGlowUp}>
                <div className={styles.workListGlowUpItems}>
                  {point.icon}
                  <span>Application concrete dans un produit reel</span>
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
            <h3>Presentation publique</h3>
            <p>
              Le site public met en avant le profil, l expertise, les projets,
              le contact, le CV et les aspects SEO. Il est pense pour une
              consultation fluide, responsive et exploitable par les moteurs de
              recherche.
            </p>
          </article>

          <article className={styles.editorialBlock}>
            <h3>Administration centralisee</h3>
            <p>
              Les contenus ne sont pas figes. Les projets, documents, tags et
              messages sont geres via des outils d administration relies a une
              API commune et a une base de donnees MongoDB.
            </p>
          </article>

          <article className={styles.editorialBlock}>
            <h3>Usage desktop et mobile</h3>
            <p>
              Le back-office ne se limite pas a un seul support. Une application
              desktop Electron et une application mobile React Native permettent
              d administrer les contenus selon le contexte d usage.
            </p>
          </article>

          <article className={styles.editorialBlock}>
            <h3>Evenements et notifications</h3>
            <p>
              Le projet integre une logique de notifications push pour remonter
              certains evenements importants, comme la reception d un message ou
              le telechargement du CV.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Lecture detaillee du projet</h2>

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
                <img src={section.image} alt={section.title} />
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
          des competences de <strong>conception</strong>, de{' '}
          <strong>design</strong>, d <strong>organisation de contenu</strong> et
          de <strong>positionnement SEO</strong>. L objectif etait de faire de
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
        <h2 className={styles.TitleHTwo}>Interet pour un recruteur</h2>

        <p className={styles.subTitleTwo}>
          Ce projet est interessant dans une logique de recrutement car il ne
          montre pas seulement ma capacite a integrer une interface. Il montre
          aussi que je sais construire un <strong>produit coherent</strong>,
          penser les <strong>flux de donnees</strong>, organiser un backend,
          creer des <strong>surfaces d administration</strong> et faire
          dialoguer plusieurs applications autour d un meme besoin.
        </p>

        <div className={styles.recruiterGrid}>
          <article className={styles.recruiterCard}>
            <FolderGit2 />
            <h3>Vision projet complete</h3>
            <p>
              De la vitrine publique jusqu aux outils internes, avec une logique
              de produit et pas seulement de pages isolees.
            </p>
          </article>

          <article className={styles.recruiterCard}>
            <Workflow />
            <h3>Capacite d orchestration</h3>
            <p>
              Organisation des composants, des routes API, de la base de donnees
              et des parcours multi-supports.
            </p>
          </article>

          <article className={styles.recruiterCard}>
            <Mail />
            <h3>Orientation usage reel</h3>
            <p>
              Gestion de messages, documents, notifications, SEO, legal et
              consentement dans un cadre concret.
            </p>
          </article>
        </div>
      </section>

      <section className={`${styles.sectionClass} ${styles.bottomCta}`}>
        <h2 className={styles.TitleHTwo}>
          Travaillons sur des projets ambitieux
        </h2>

        <p className={styles.subTitleTwo}>
          Si vous recherchez un developpeur web capable de prendre en charge un
          sujet dans sa globalite, de l interface jusqu a la logique metier et
          aux outils d administration, ce projet donne un apercu concret de ma
          facon de travailler.
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
