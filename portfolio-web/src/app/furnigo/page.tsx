import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Smartphone,
  ShieldCheck,
  CreditCard,
  Lock,
  DatabaseZap,
  GitBranch,
  Sparkles,
  Github,
  Download,
  FileText,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Users,
  Heart,
  ShoppingCart,
  Package,
  User,
  Filter,
  Cpu,
  BookOpen,
  Kanban,
  GitPullRequest,
  FlaskConical,
  Zap,
  Play,
  ExternalLink,
  ClipboardList,
  BarChart3,
  Eye,
  Trash2,
  FileJson,
} from 'lucide-react';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';

export const metadata: Metadata = {
  title: 'FurniGo — Application e-commerce mobile',
  description:
    'Étude de cas complète de FurniGo : application mobile e-commerce fullstack avec React Native, Spring Boot, paiement Stripe, OAuth2 Google, conformité RGPD et démarche produit structurée.',
  alternates: { canonical: '/furnigo' },
  openGraph: {
    title: 'FurniGo — Application e-commerce mobile',
    description:
      "Projet fullstack complet : conception, documentation, CI/CD, API REST sécurisée, paiement Stripe et conformité RGPD — du cahier des charges à l'APK buildé en production.",
    url: '/furnigo',
    type: 'article',
  },
};

// ─── DATA ────

const projectStats = [
  { value: '32', label: 'Issues GitHub', sub: '8 Epics structurées' },
  {
    value: '4',
    label: 'Docs de conception',
    sub: 'Spec · User Stories · Diagrammes',
  },
  { value: '2', label: 'Pipelines CI/CD', sub: 'Backend & Mobile' },
  { value: '100%', label: 'Déployé', sub: 'Backend · BDD · APK prod' },
];

const mainPillars = [
  {
    icon: <FlaskConical />,
    title: 'Projet technique',
    text: 'OAuth2 Google, Stripe Checkout, webhooks asynchrones, JWT stateless, cache local, conformité RGPD.',
  },
  {
    icon: <BookOpen />,
    title: 'Conception documentée',
    text: 'Spec fonctionnelle, spec technique, user stories et diagrammes rédigés avant tout développement.',
  },
  {
    icon: <Kanban />,
    title: 'Méthodologie Agile',
    text: 'Kanban GitHub Projects, issues liées aux PR, milestones, Conventional Commits, GitHub Actions.',
  },
  {
    icon: <Zap />,
    title: '3 fonctionnalités clés',
    text: 'Connexion Google, paiement Stripe et gestion RGPD complète — trois intégrations métier réelles.',
  },
];

const appFeatures = [
  { icon: <Lock />, label: 'Connexion Google OAuth2' },
  { icon: <Users />, label: 'Mode invité avec onboarding' },
  { icon: <Filter />, label: 'Catalogue filtré par catégories' },
  { icon: <Package />, label: 'Détail produit + suggestions' },
  { icon: <Heart />, label: 'Favoris persistants (local)' },
  { icon: <ShoppingCart />, label: 'Panier avec calcul temps réel' },
  { icon: <CreditCard />, label: 'Flux paiement Stripe complet' },
  { icon: <ClipboardList />, label: 'Historique & détail commandes' },
  { icon: <User />, label: 'Profil & gestion RGPD' },
  { icon: <DatabaseZap />, label: 'Cache produits local (perf)' },
];

const stackGroups = [
  {
    label: 'Mobile',
    icon: <Smartphone />,
    items: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage'],
  },
  {
    label: 'Backend',
    icon: <Cpu />,
    items: ['Spring Boot 3', 'Java 21', 'API REST', 'JWT', 'OAuth2 Google'],
  },
  {
    label: 'Base de données',
    icon: <DatabaseZap />,
    items: ['PostgreSQL', 'JPA / Hibernate'],
  },
  {
    label: 'Infra & Outils',
    icon: <GitBranch />,
    items: ['Docker', 'GitHub Actions', 'Stripe', 'Conventional Commits'],
  },
];

const docLinks = [
  {
    icon: <FileText />,
    title: 'Spécification fonctionnelle',
    desc: 'Périmètre, parcours utilisateur, règles métier et fonctionnalités MVP.',
    href: 'https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App/blob/main/docs/spec-fonctionnelle.md',
  },
  {
    icon: <Cpu />,
    title: 'Spécification technique',
    desc: 'Architecture, stack, flux de données et décisions techniques documentées.',
    href: 'https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App/blob/main/docs/spec-technique.md',
  },
  {
    icon: <BookOpen />,
    title: 'User Stories',
    desc: "27 user stories réparties en 9 Epics avec critères d'acceptation.",
    href: 'https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App/blob/main/docs/user-stories.md',
  },
  {
    icon: <BarChart3 />,
    title: 'Diagrammes',
    desc: 'Flux auth, paiement, RGPD, modèle de données ERD et architecture globale.',
    href: 'https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App/blob/main/docs/diagrammes.md',
  },
  {
    icon: <ClipboardList />,
    title: 'Backlog complet',
    desc: '32 tâches structurées en 8 Epics, liées aux issues GitHub.',
    href: 'https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App/blob/main/docs/taches.md',
  },
];

const productSteps = [
  {
    n: '01',
    t: 'Spécification fonctionnelle',
    d: 'Parcours utilisateur, règles métier et périmètre MVP définis avant tout développement.',
  },
  {
    n: '02',
    t: 'User stories & backlog',
    d: '32 issues GitHub structurées en 8 Epics, priorisées par milestone dans un Kanban.',
  },
  {
    n: '03',
    t: 'Maquettes UI',
    d: "Tous les écrans designés en light & dark avant d'écrire la première ligne de code.",
  },
  {
    n: '04',
    t: 'Spec technique & diagrammes',
    d: 'Choix de stack documentés, diagrammes de flux, ERD et décisions techniques justifiées.',
  },
  {
    n: '05',
    t: 'Développement & CI/CD',
    d: 'Git flow, Conventional Commits et GitHub Actions pour lint, tests et build automatisés.',
  },
];

const agilePractices = [
  {
    icon: <Kanban />,
    title: 'Kanban GitHub Projects',
    text: 'Tableau Backlog → In Progress → In Review → Done. Chaque tâche correspond à une issue GitHub liée à une Pull Request.',
  },
  {
    icon: <GitPullRequest />,
    title: 'Git Flow structuré',
    text: 'Branches feature/*, fix/*, chore/*, docs/* avec merge via PR sur develop, puis sur main en fin de epic.',
  },
  {
    icon: <FileText />,
    title: 'Conventional Commits',
    text: 'Convention feat:, fix:, chore:, test:, docs:, ci: appliquée systématiquement pour un historique Git lisible.',
  },
  {
    icon: <Zap />,
    title: 'GitHub Actions CI',
    text: 'Deux pipelines automatisés : backend (Maven + JUnit + Checkstyle) et mobile (ESLint + TypeScript + Expo Doctor).',
  },
];

const googleAuthFlow = [
  {
    icon: <Smartphone />,
    label: 'App Mobile',
    sub: 'Bouton "Se connecter avec Google"',
  },
  {
    icon: <ExternalLink />,
    label: 'expo-auth-session',
    sub: 'Ouverture navigateur OAuth2',
  },
  { icon: <Users />, label: 'Google OAuth2', sub: 'Consentement utilisateur' },
  { icon: <Lock />, label: 'id_token retourné', sub: 'Callback AuthSession' },
  {
    icon: <ShieldCheck />,
    label: 'Backend valide',
    sub: 'Vérification Google Token',
  },
  {
    icon: <CheckCircle2 />,
    label: 'JWT généré',
    sub: 'Stocké en AsyncStorage',
  },
];

const stripeFlow = [
  { icon: <Smartphone />, label: 'App Mobile', sub: 'Validation du panier' },
  { icon: <Cpu />, label: 'Backend API', sub: 'Commande PENDING créée' },
  {
    icon: <CreditCard />,
    label: 'Stripe Checkout',
    sub: 'Session de paiement',
  },
  { icon: <ShieldCheck />, label: 'Webhook reçu', sub: 'Signature vérifiée' },
  { icon: <CheckCircle2 />, label: 'Commande PAID', sub: 'Statut mis à jour' },
];

const rgpdFeatures = [
  {
    icon: <Eye />,
    title: 'Droit à la consultation',
    text: "Chaque donnée est expliquée à l'utilisateur avec sa classification : locale, stockée, anonymisée ou pseudonymisée.",
  },
  {
    icon: <FileJson />,
    title: 'Export JSON',
    text: "L'utilisateur peut exporter l'ensemble de ses données personnelles dans un fichier JSON structuré.",
  },
  {
    icon: <Trash2 />,
    title: 'Suppression & anonymisation',
    text: 'Suppression complète du compte avec anonymisation des données transactionnelles liées aux commandes.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Classification des données',
    text: 'Distinction claire entre données utilisateur (PII), pseudonymisées (Stripe/Orders) et anonymisées (stats).',
  },
];

const rgpdDataTypes = [
  {
    type: 'Locale',
    cls: 'rgpdDataBlue',
    desc: "Panier, favoris — stockés uniquement sur l'appareil",
  },
  {
    type: 'Stockée',
    cls: 'rgpdDataViolet',
    desc: 'Profil, email — données personnelles en base',
  },
  {
    type: 'Pseudonymisée',
    cls: 'rgpdDataOrange',
    desc: 'Commandes, paiements — liées à un ID anonyme',
  },
  {
    type: 'Anonymisée',
    cls: 'rgpdDataGreen',
    desc: "Statistiques — aucun lien avec l'utilisateur",
  },
];

const screenGroups = [
  {
    id: 'auth',
    label: 'Authentification & Onboarding',
    screens: [
      { src: '/images/furnigo/auth-login.webp', alt: 'Connexion Google' },
      { src: '/images/furnigo/onboarding.webp', alt: 'Onboarding mode invité' },
      {
        src: '/images/furnigo/guest-lock.webp',
        alt: 'Verrouillage écran protégé',
      },
    ],
  },
  {
    id: 'catalogue',
    label: 'Catalogue & Produits',
    screens: [
      { src: '/images/furnigo/catalogue.webp', alt: 'Catalogue produits' },
      {
        src: '/images/furnigo/catalogue-filter.webp',
        alt: 'Filtres catégories',
      },
      { src: '/images/furnigo/product-detail.webp', alt: 'Détail produit' },
    ],
  },
  {
    id: 'cart',
    label: 'Favoris & Panier',
    screens: [
      { src: '/images/furnigo/favorites.webp', alt: 'Écran favoris' },
      { src: '/images/furnigo/cart.webp', alt: 'Panier' },
    ],
  },
  {
    id: 'orders',
    label: 'Commandes',
    screens: [
      { src: '/images/furnigo/checkout.webp', alt: 'Stripe Checkout' },
      { src: '/images/furnigo/orders.webp', alt: 'Historique commandes' },
      { src: '/images/furnigo/order-detail.webp', alt: 'Détail commande' },
    ],
  },
  {
    id: 'profile',
    label: 'Profil & RGPD',
    screens: [
      { src: '/images/furnigo/profile.webp', alt: 'Profil utilisateur' },
      { src: '/images/furnigo/rgpd.webp', alt: 'Gestion RGPD' },
    ],
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FurniGoPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Fullstack · Mobile" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            FurniGo — <strong>Application e-commerce mobile</strong>
          </h1>
        </div>

        <p className={styles.subTitle}>
          Projet fullstack complet : conception, documentation, CI/CD, API REST
          sécurisée, paiement Stripe et conformité RGPD —{' '}
          <strong>du cahier des charges à l'APK buildé en production.</strong>
        </p>

        <div className={styles.heroMeta}>
          <span className={styles.metaPill}>
            <Smartphone /> React Native · Expo
          </span>
          <span className={styles.metaPill}>
            <Cpu /> Spring Boot · PostgreSQL
          </span>
          <span className={styles.metaPill}>
            <CreditCard /> Stripe · OAuth2
          </span>
          <span className={styles.metaPill}>
            <ShieldCheck /> RGPD
          </span>
        </div>

        <div className={styles.heroCtas}>
          <Link
            href="https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
          >
            <Github /> Voir le code source
          </Link>
          <Link
            href="https://github.com/donovan-dev-web/FurniGo-Mobile-E-Commerce-App/releases"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaLink} ${styles.ctaLinkSecondary}`}
          >
            <Download /> Télécharger l'APK
          </Link>
        </div>

        <div className={styles.heroStats}>
          {projectStats.map((s) => (
            <div key={s.label} className={styles.heroStatCard}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <small>{s.sub}</small>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4 PILIERS ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Ce que ce projet démontre</h2>
        <p className={styles.subTitleTwo}>
          FurniGo est conçu autour de quatre axes complémentaires qui reflètent
          une approche professionnelle du développement — bien au-delà d'un
          simple exercice de code.
        </p>
        <div className={styles.pillarsGrid}>
          {mainPillars.map((p) => (
            <article key={p.title} className={styles.pillarCard}>
              <div className={styles.pillarIcon}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Fonctionnalités de l'application</h2>
        <p className={styles.subTitleTwo}>
          L'application couvre l'intégralité d'un parcours e-commerce mobile, du
          mode invité jusqu'à la gestion RGPD du compte.
        </p>
        <div className={styles.featuresGrid}>
          {appFeatures.map((f) => (
            <div key={f.label} className={styles.featureItem}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDÉO ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Démonstration</h2>
        <p className={styles.subTitleTwo}>
          Workflow complet de l'application : connexion Google, navigation dans
          le catalogue, ajout au panier et paiement via Stripe Checkout.
        </p>
        <div className={styles.videoPanel}>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dbftvww6q&public_id=Video_Demonstration_Furnigo"
              width="640"
              height="360"
              style={{ height: '100%', width: 'auto', aspectRatio: '360/640' }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
          <p className={styles.videoCaption}>
            <Play /> Démonstration complète — connexion, catalogue, panier,
            paiement Stripe
          </p>
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Aperçu de l'application</h2>
        <p className={styles.subTitleTwo}>
          Captures d'écran réelles de l'application, organisées par parcours
          utilisateur.
        </p>
        <div className={styles.screensPanel}>
          {screenGroups.map((group) => (
            <div key={group.id} className={styles.screenGroup}>
              <div className={styles.screenGroupLabel}>
                <CircleDot />
                <span>{group.label}</span>
              </div>
              <div className={styles.screenGroupImages}>
                {group.screens.map((img) => (
                  <div key={img.src} className={styles.phoneFrame}>
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Stack technique</h2>
        <div className={styles.stackPanel}>
          {stackGroups.map((group) => (
            <article key={group.label} className={styles.stackCard}>
              <div className={styles.stackHead}>
                {group.icon}
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

      {/* ── CONCEPTION & DOC ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Conception & documentation</h2>
        <p className={styles.subTitleTwo}>
          Avant d'écrire la première ligne de code, l'ensemble du projet a été
          spécifié, structuré et documenté. Chaque document est accessible
          directement dans le dépôt GitHub.
        </p>

        <div className={styles.docGrid}>
          {docLinks.map((doc) => (
            <Link
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.docCard}
            >
              <div className={styles.docCardIcon}>{doc.icon}</div>
              <div className={styles.docCardContent}>
                <h3>{doc.title}</h3>
                <p>{doc.desc}</p>
              </div>
              <ArrowRight className={styles.docCardArrow} />
            </Link>
          ))}
        </div>

        <div className={styles.stepperWrap}>
          <h3 className={styles.stepperSubTitle}>
            Du cahier des charges au code
          </h3>
          <div className={styles.stepper}>
            {productSteps.map((step, i) => (
              <div key={step.n} className={styles.stepItem}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumber}>{step.n}</div>
                  {i < productSteps.length - 1 && (
                    <div className={styles.stepConnector} />
                  )}
                </div>
                <div className={styles.stepContent}>
                  <h4>{step.t}</h4>
                  <p>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTHODOLOGIE & CI ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Méthodologie & workflow</h2>
        <p className={styles.subTitleTwo}>
          Le projet a été géré comme un vrai produit : backlog priorisé, issues
          liées aux Pull Requests, pipelines CI automatisés et convention de
          commits systématique.
        </p>

        <div className={styles.agileGrid}>
          {agilePractices.map((p) => (
            <article key={p.title} className={styles.agileCard}>
              <div className={styles.agileIcon}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.kanbanPanel}>
          <div className={styles.kanbanLabel}>
            <Kanban />
            <span>GitHub Projects — Kanban du projet</span>
          </div>
          <div className={styles.kanbanFrame}>
            <img
              src="/images/furnigo/kanban.webp"
              alt="Kanban GitHub Projects de FurniGo"
              className={styles.kanbanImg}
              loading="lazy"
            />
          </div>
          <Link
            href="https://github.com/users/donovan-dev-web/projects/4"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.kanbanLink}
          >
            <ExternalLink /> Voir le Kanban sur GitHub
          </Link>
        </div>

        <div className={styles.ciPanel}>
          <div className={styles.ciPanelHeader}>
            <Zap />
            <h3>Pipelines CI/CD — GitHub Actions</h3>
          </div>
          <div className={styles.ciGrid}>
            <div className={styles.ciBlock}>
              <div className={styles.ciBadge}>Backend</div>
              <ul className={styles.ciList}>
                <li>
                  <CheckCircle2 /> Compilation Maven
                </li>
                <li>
                  <CheckCircle2 /> Tests unitaires JUnit 5
                </li>
                <li>
                  <CheckCircle2 /> Vérification Checkstyle
                </li>
              </ul>
              <p className={styles.ciTrigger}>
                Déclenché sur push/PR — <code>backend/**</code>
              </p>
            </div>
            <div className={styles.ciBlock}>
              <div className={styles.ciBadge}>Mobile</div>
              <ul className={styles.ciList}>
                <li>
                  <CheckCircle2 /> Install npm
                </li>
                <li>
                  <CheckCircle2 /> ESLint + TypeScript check
                </li>
                <li>
                  <CheckCircle2 /> Expo Doctor
                </li>
              </ul>
              <p className={styles.ciTrigger}>
                Déclenché sur push/PR — <code>mobile/**</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONNEXION GOOGLE ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Connexion Google OAuth2</h2>
        <p className={styles.subTitleTwo}>
          L'authentification repose sur Google OAuth2 via{' '}
          <strong>expo-auth-session</strong> côté mobile, avec validation de l'
          <strong>id_token</strong> côté backend Spring Boot. L'application
          propose également un <strong>mode invité</strong> avec onboarding,
          verrouillage des écrans protégés et redirection vers la connexion.
        </p>

        <div className={styles.flowPanel}>
          {googleAuthFlow.map((step, index) => (
            <div key={step.label} className={styles.flowRow}>
              <div className={styles.flowCard}>
                <div className={styles.flowIcon}>{step.icon}</div>
                <div className={styles.flowText}>
                  <strong>{step.label}</strong>
                  <span>{step.sub}</span>
                </div>
              </div>
              {index < googleAuthFlow.length - 1 && (
                <ArrowRight className={styles.flowArrow} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.flowNote}>
          <ShieldCheck />
          <p>
            Le token Google est <strong>validé côté backend</strong> via l'API
            de vérification Google — le JWT applicatif n'est généré qu'après
            validation. Les sessions sont <strong>stateless</strong> : aucune
            donnée de session côté serveur.
          </p>
        </div>
      </section>

      {/* ── STRIPE ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Paiement Stripe Checkout</h2>
        <p className={styles.subTitleTwo}>
          Le flux de paiement implique une coordination entre l'application
          mobile, le backend et Stripe. La gestion du{' '}
          <strong>webhook asynchrone</strong> garantit que le statut de commande
          est mis à jour de façon fiable, indépendamment du comportement de
          l'app après le paiement.
        </p>

        <div className={styles.flowPanel}>
          {stripeFlow.map((step, index) => (
            <div key={step.label} className={styles.flowRow}>
              <div className={styles.flowCard}>
                <div className={styles.flowIcon}>{step.icon}</div>
                <div className={styles.flowText}>
                  <strong>{step.label}</strong>
                  <span>{step.sub}</span>
                </div>
              </div>
              {index < stripeFlow.length - 1 && (
                <ArrowRight className={styles.flowArrow} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.flowNote}>
          <ShieldCheck />
          <p>
            La signature du webhook Stripe est{' '}
            <strong>vérifiée côté backend</strong> à chaque réception —
            protection contre les appels frauduleux et idempotency des
            événements. Le prix unitaire est{' '}
            <strong>figé au moment de la commande</strong> (snapshot dans
            OrderItem).
          </p>
        </div>
      </section>

      {/* ── RGPD ── */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Gestion RGPD</h2>
        <p className={styles.subTitleTwo}>
          L'écran profil intègre une gestion complète des droits utilisateur.
          Chaque donnée est expliquée et classifiée directement dans
          l'interface, avec les actions correspondantes disponibles.
        </p>

        <div className={styles.rgpdGrid}>
          {rgpdFeatures.map((f) => (
            <article key={f.title} className={styles.rgpdCard}>
              <div className={styles.rgpdIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.rgpdDataPanel}>
          <h3 className={styles.rgpdDataTitle}>Classification des données</h3>
          <div className={styles.rgpdDataGrid}>
            {rgpdDataTypes.map((d) => (
              <div
                key={d.type}
                className={`${styles.rgpdDataItem} ${styles[d.cls]}`}
              >
                <strong>{d.type}</strong>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`${styles.sectionClass} ${styles.bottomCta}`}>
        <h2 className={styles.TitleHTwo}>Profil développeur</h2>
        <p className={styles.subTitleTwo}>
          Ce projet illustre ma capacité à cadrer, concevoir et développer une
          application mobile e-commerce complète — des spécifications jusqu'au
          déploiement. Je recherche un poste de <strong>développeur web</strong>{' '}
          pour m'impliquer sur des projets concrets au sein d'une équipe.
        </p>
        <div className={styles.heroCtas}>
          <PrimaryButton
            icons={<Sparkles />}
            content="Voir d'autres projets"
            NavigateTo="/projects"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
