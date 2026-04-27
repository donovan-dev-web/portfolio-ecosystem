import type { Metadata } from 'next';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import CarrouselBanner from '@/frontend/components/Global/CarrouselBanner/CarrouselBanner';
import { CtaScroll } from '@/frontend/components/Global/CTA_Scroll/ctaScroll';
import LanguageChart from '@/frontend/components//Expertise/Languagechart/LanguageChart';
import {
  Sparkles,
  AtSign,
  MapPin,
  Clock,
  Mail,
  Download,
  BriefcaseBusiness,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Développeur Web Fullstack & Mobile',
  description: 'Portfolio de Donovan, développeur web fullstack et mobile.',
  alternates: {
    canonical: '/expertise',
  },
  openGraph: {
    title: 'Développeur Web Fullstack & Mobile',
    description: 'Portfolio de Donovan, développeur web fullstack et mobile.',
    url: '/expertise',
    type: 'website',
  },
};

export default function ExpertisePage() {
  return (
    <>
      {/* HERO */}
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Mes compétences et mon parcours" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Mon <strong>Expertise</strong> <br /> & Parcours
          </h1>
        </div>

        <p className={styles.subTitle}>
          <strong>Développeur Web Fullstack & Mobile</strong>, je conçois des
          applications modernes en combinant <strong>performance</strong>,
          <strong>expérience utilisateur</strong> et{' '}
          <strong>vision produit</strong>.
        </p>
        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<Sparkles />}
            content="Voir mes projets"
            NavigateTo="/projects"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>
        <CarrouselBanner />
        <div>
          <CtaScroll NavigateTo="#profils" />
        </div>
      </section>
      <section className={styles.sectionClass} id="profils">
        <h2 className={styles.TitleHTwo}>Profil</h2>

        <div className={styles.profileContainer}>
          <div className={styles.profileTabs}>
            <div className={styles.profileImg}>
              <img
                src="/images/PhotoProfil.png"
                alt="Photo de profil de Donovan Chartrain"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.profileText}>
              <p className={styles.subTitleTwo}>
                Je m'appelle <strong>Donovan Chartrain</strong>, développeur
                <strong> web fullstack & mobile</strong> avec{' '}
                <strong>3 ans d’expérience en entreprise</strong> et plus de{' '}
                <strong>10 ans dans la création visuelle et la 3D</strong>.
              </p>

              <p className={styles.subTitleTwo}>
                Mon parcours atypique me permet aujourd’hui de concevoir des
                <strong> applications complètes</strong>, en prenant en compte à
                la fois les <strong>contraintes techniques</strong>, les
                <strong> enjeux métiers</strong> et l’
                <strong>expérience utilisateur</strong>.
              </p>

              <p className={styles.subTitleTwo}>
                Je m’intéresse particulièrement aux projets où il est nécessaire
                de combiner <strong>développement</strong>,{' '}
                <strong>design</strong> et
                <strong> logique produit</strong>, avec une approche orientée
                <strong> performance</strong> et <strong>maintenabilité</strong>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* PARCOURS TIMELINE */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Parcours</h2>
        <p className={styles.subTitleTwo}>
          Mon parcours débute dans un environnement technique avec un
          <strong> Bac Pro en maintenance industrielle</strong>, où j’ai
          développé une approche <strong>pragmatique</strong> et orientée
          résolution de problèmes.
        </p>

        <p className={styles.subTitleTwo}>
          Je me suis ensuite spécialisé dans la{' '}
          <strong>3D et la production visuelle</strong>, en travaillant en{' '}
          <strong>agence de communication</strong>, en
          <strong> bureau d’étude</strong> et en <strong>ingénierie</strong>.
          Ces expériences m’ont permis de développer une forte sensibilité au
          <strong> design</strong>, à la <strong>communication visuelle</strong>{' '}
          et aux
          <strong> attentes clients</strong>.
        </p>

        <p className={styles.subTitleTwo}>
          Progressivement, je me suis orienté vers le{' '}
          <strong>développement</strong>, d’abord à travers des projets
          interactifs et 3D, puis vers le
          <strong> développement web et applicatif</strong>.
        </p>

        <p className={styles.subTitleTwo}>
          Aujourd’hui, ce parcours me permet d’avoir une vision
          <strong> transversale</strong> et de proposer des solutions complètes,
          à la fois <strong>techniques</strong>, <strong>fonctionnelles</strong>{' '}
          et
          <strong> orientées utilisateur</strong>.
        </p>

        <div className={styles.timeline}>
          {/* FORMATION */}

          <div className={`${styles.timelineItem} ${styles.left}`}>
            <div className={`${styles.timelineContent} ${styles.formation}`}>
              <span className={styles.badge}>
                Diplôme <GraduationCap />
              </span>
              <span className={styles.date}>2026</span>
              <h3>Formation Développeur Web</h3>
              <p>Diplôme de développeur informatique de niveau 5 (bac +2)</p>
            </div>
          </div>
          {/* EXPERIENCE */}

          <div className={`${styles.timelineItem} ${styles.right}`}>
            <div className={`${styles.timelineContent} ${styles.experience}`}>
              <span className={styles.badge}>
                Expérience <BriefcaseBusiness />
              </span>
              <span className={styles.date}>Avril 2024 - Juillet 2025</span>
              <h3>Développeur Informatique — Grapheau (84)</h3>
              <ul>
                <li>
                  Développement d’outils internes et applications interactives
                </li>
                <li>Optimisation et structuration des bases de données</li>
                <li>Intégration de solutions SEO / SEA</li>
              </ul>
            </div>
          </div>

          {/* FORMATION */}

          <div className={`${styles.timelineItem} ${styles.left}`}>
            <div className={`${styles.timelineContent} ${styles.formation}`}>
              <span className={styles.badge}>
                Formation <GraduationCap />
              </span>
              <span className={styles.date}>2024</span>
              <h3>Formation SEO / SEA</h3>
              <p>Financée par Grapheau</p>
            </div>
          </div>

          {/* EXPERIENCE */}

          <div className={`${styles.timelineItem} ${styles.right}`}>
            <div className={`${styles.timelineContent} ${styles.experience}`}>
              <span className={styles.badge}>
                Expérience <BriefcaseBusiness />
              </span>
              <span className={styles.date}>Septembre 2022 – Avril 2024</span>
              <h3>Infographiste 3D — Grapheau (84)</h3>
              <ul>
                <li>Création de visuels et animations 3D</li>
                <li>Développement d’applications interactives</li>
                <li>R&D et optimisation d’outils internes</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.timelineItem} ${styles.right}`}>
            <div className={`${styles.timelineContent} ${styles.experience}`}>
              <span className={styles.badge}>
                Expérience <BriefcaseBusiness />
              </span>
              <span className={styles.date}>Mai – Octobre 2021</span>
              <h3>Infographiste 3D / Dev Unity — POLYNOTES (38)</h3>
              <ul>
                <li>Développement de scènes interactives</li>
                <li>Création de visuels 3D</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.timelineItem} ${styles.right}`}>
            <div className={`${styles.timelineContent} ${styles.experience}`}>
              <span className={styles.badge}>
                Expérience <BriefcaseBusiness />
              </span>
              <span className={styles.date}>Mars – Mai 2021</span>
              <h3>Dessinateur Projeteur — MB CONCEPTION (85)</h3>
              <ul>
                <li>Modélisation BIM pour projets architecturaux</li>
              </ul>
            </div>
          </div>

          {/* FORMATION */}

          <div className={`${styles.timelineItem} ${styles.left}`}>
            <div className={`${styles.timelineContent} ${styles.formation}`}>
              <span className={styles.badge}>
                Formation <GraduationCap />
              </span>
              <span className={styles.date}>2020</span>
              <h3>Modeleur BIM — AFPA Nîmes</h3>
            </div>
          </div>

          {/* EXPERIENCE */}

          <div className={`${styles.timelineItem} ${styles.right}`}>
            <div className={`${styles.timelineContent} ${styles.experience}`}>
              <span className={styles.badge}>
                Expérience <BriefcaseBusiness />
              </span>
              <span className={styles.date}>2015 – 2016</span>
              <h3>Infographiste 3D Junior — COM3D (34)</h3>
              <ul>
                <li>Rendus photoréalistes & animation marketing</li>
                <li>Traitement fichiers CAO</li>
              </ul>
            </div>
          </div>

          {/* FORMATION */}

          <div className={`${styles.timelineItem} ${styles.left}`}>
            <div className={`${styles.timelineContent} ${styles.formation}`}>
              <span className={styles.badge}>
                Formation <GraduationCap />
              </span>
              <span className={styles.date}>2013 – 2015</span>
              <h3>BEP & Bac Pro Maintenance industrielle</h3>
              <p>Lycée François Rabelais</p>
            </div>
          </div>
        </div>
      </section>{' '}
      {/* COMPETENCES */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Compétences techniques</h2>

        <p className={styles.subTitleTwo}>
          Compétences mobilisées pour développer des applications complètes,
          performantes et maintenables.
        </p>

        <div className={styles.skillsPanel}>
          <div>
            <h3>Données & sécurité</h3>
            <p>
              MongoDB, MySQL, PostgreSQL, authentification, gestion des accès,
              bonnes pratiques OWASP
            </p>
          </div>

          <div>
            <h3>Outils & méthodologie</h3>
            <p>
              Git, Docker, Figma, Agile, architecture applicative, gestion de
              projet, SEA / SEO, accessibilité, performance web
            </p>
          </div>
        </div>
        <div className={styles.frameworks}>
          <div className={styles.frameworksPanel}>
            <h3>Ma stacks :</h3>
            <div className={styles.frameworksIcons}>
              <div>
                <img
                  src="/Icons/Logo_React.webp"
                  alt="React"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>React</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_React-Native.webp"
                  alt="React Native"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>React Native</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Nodejs.webp"
                  alt="Node.js"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Node.js</p>
              </div>

              <div>
                <img
                  src="/Icons/Logo_Nextjs.webp"
                  alt="Next.js"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Next.js</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Expo.webp"
                  alt="Expo"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Expo</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Github.webp"
                  alt="GitHub"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>GitHub</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Docker.webp"
                  alt="Docker"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Docker</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Wordpress.webp"
                  alt="WordPress"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>WordPress</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Angular.webp"
                  alt="Angular"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Angular</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Electron.webp"
                  alt="Electron"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Electron</p>
              </div>

              <div>
                <img
                  src="/Icons/Logo_Laravel.webp"
                  alt="Laravel"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Laravel</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_SpringBoot.webp"
                  alt="Spring Boot"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Spring Boot</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Sanity.webp"
                  alt="SAnity.io"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Sanity.io</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Vuejs.webp"
                  alt="Vue.js"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Vue.js</p>
              </div>

              <div>
                <img
                  src="/Icons/Logo_Babylon.webp"
                  alt="Babylon.js"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Babylon.js</p>
              </div>
              <div>
                <img
                  src="/Icons/Logo_Threejs.webp"
                  alt="Three.js"
                  width={45}
                  height={45}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
                <p>Three.js</p>
              </div>
            </div>
          </div>
          <LanguageChart />
        </div>
      </section>
      {/* APPROCHE */}
      <section
        className={styles.sectionClass}
        aria-label="Ma façon de travailler "
      >
        <h2 className={styles.TitleHTwo}>Ma façon de travailler</h2>
        <p className={styles.subTitleTwo}>
          Au-delà du développement, j’accorde une attention particulière à la
          compréhension des besoins clients, à la collaboration avec les équipes
          créatives et à la qualité des projets livrés.
        </p>
        <ul className={styles.workList}>
          <li className={styles.workListItems}>
            <h3 className={styles.workListTitle}>
              Comprendre les besoins du projet
            </h3>
            <p className={styles.workListDescribe}>
              Comprendre les objectifs d’un projet est essentiel pour proposer
              une solution technique adaptée aux contraintes métiers et aux
              enjeux de communication.
            </p>
            <div className={styles.workListGlowUp}>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>
                  Traduire efficacement un brief client en solution technique
                </span>
              </div>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>
                  Limiter les allers-retours et faciliter la prise de décision
                </span>
              </div>
            </div>
          </li>
          <li className={styles.workListItems}>
            <h3 className={styles.workListTitle}>
              Collaborer avec les équipes créatives
            </h3>
            <p className={styles.workListDescribe}>
              Grâce à mon parcours mêlant développement et production visuelle,
              je travaille facilement avec les designers et les équipes
              créatives.
            </p>
            <div className={styles.workListGlowUp}>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>Respect fidèle des intentions graphiques</span>
              </div>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>Interfaces cohérentes entre design et développement</span>
              </div>
            </div>
          </li>
          <li className={styles.workListItems}>
            <h3 className={styles.workListTitle}>
              Développer des projets structurés
            </h3>
            <p className={styles.workListDescribe}>
              La qualité d’un projet ne dépend pas seulement de la technologie
              utilisée, mais aussi de la manière dont il est conçu et organisé.
            </p>
            <div className={styles.workListGlowUp}>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>Code clair, maintenable et évolutif</span>
              </div>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>Facilite la collaboration et la maintenance</span>
              </div>
            </div>
          </li>
          <li className={styles.workListItems}>
            <h3 className={styles.workListTitle}>
              Concevoir des projets durables
            </h3>
            <p className={styles.workListDescribe}>
              Je privilégie des architectures et des solutions techniques qui
              permettent aux projets d’évoluer dans le temps.
            </p>
            <div className={styles.workListGlowUp}>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>Anticipation des besoins futurs</span>
              </div>
              <div className={styles.workListGlowUpItems}>
                <TrendingUp />
                <span>Applications plus faciles à faire évoluer</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      {/* VALEUR */}
      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Ce que j’apporte à une équipe</h2>

        <div className={styles.valuePanel}>
          <div>
            <strong>Polyvalence technique</strong>
            <p>Capacité à intervenir sur frontend, backend et mobile</p>
          </div>

          <div>
            <strong>Vision produit</strong>
            <p>Compréhension globale des enjeux utilisateurs et business</p>
          </div>

          <div>
            <strong>Culture design</strong>
            <p>Interfaces cohérentes et respect des intentions graphiques</p>
          </div>

          <div>
            <strong>Adaptabilité</strong>
            <p>
              Capacité à évoluer selon les besoins de l’équipe et des projets
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section
        className={`${styles.sectionClass} ${styles.SectionContact}`}
        aria-label="Me contacter"
      >
        <h2 className={styles.TitleHTwo}>Travaillons ensemble</h2>
        <p className={styles.subTitleTwo}>
          <strong>Développeur Web Fullstack & Mobile</strong>, je suis
          actuellement à la recherche d’un <strong>poste en CDI</strong> en
          agence web, agence de communication ou ESN. N’hésitez pas à me
          contacter pour discuter d’un projet, d’une collaboration ou d’une
          opportunité.
        </p>
        <div className={styles.contactInfoPanel}>
          <div className={styles.contactCards}>
            <div>
              <AtSign /> <span>Email</span>
            </div>
            <span>donovan.chartrain@gmail.com</span>
          </div>
          <div className={styles.contactCards}>
            <div>
              <MapPin /> <span>Localisation</span>
            </div>
            <span>Bédoin, Vaucluse, France</span>
          </div>
          <div className={styles.contactCards}>
            <div>
              <Clock /> <span>Disponibilité</span>
            </div>
            <span>Réponse sous 24 à 48 h</span>
          </div>
        </div>
        <div className={styles.CTAButton}>
          <a href="/api/docs" download className={styles.cvBtn}>
            <Download />
            Télécharger mon CV{' '}
          </a>
          <PrimaryButton
            icons={<Mail />}
            content="Me contacter"
            NavigateTo="/contact"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
