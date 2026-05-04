import styles from './page.module.scss';
import type { Metadata } from 'next';
import {
  Sparkles,
  IdCard,
  FolderOpen,
  ChartNoAxesCombined,
  Palette,
  Database,
  Smartphone,
  Wallpaper,
  ListTree,
  Boxes,
  Mail,
  AtSign,
  TrendingUp,
  MapPin,
  Clock,
} from 'lucide-react';
import { DownloadCvButton } from '@/frontend/components/Global/Button/downloadCvButton/DownloadCvButton';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import CarrouselBanner from '../frontend/components/Global/CarrouselBanner/CarrouselBanner';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { CtaScroll } from '@/frontend/components/Global/CTA_Scroll/ctaScroll';
import { CardTypeOne } from '@/frontend/components/Global/CardsTypeOne/CardsTypeOne';
import ProjectPanel from '@/frontend/components/Home/ProjectPanel/ProjectPanel';
import ExpertisePanel from '@/frontend/components/Home/ExpertisePanel/ExpertisePanel';
import { Footer } from '@/frontend/components/Global/Footer/Footer';

export const metadata: Metadata = {
  title: 'Développeur Web Fullstack & Mobile',
  description: 'Portfolio de Donovan, développeur web fullstack et mobile.',
};

export default function Home() {
  return (
    <>
      <section
        className={`${styles.sectionClass} ${styles.hero}`}
        aria-label="Hero"
      >
        <Badge icons={true} content="Disponible pour de nouveaux projets" />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Développeur <strong>Web</strong> <br /> Fullstack & Mobile
          </h1>
        </div>
        <p className={styles.subTitle}>
          <strong>
            Développeur Web Fullstack & Mobile avec 3 ans d’expérience
          </strong>{' '}
          en entreprise, je développe des{' '}
          <strong>applications web performantes</strong> orientées utilisateur.
          Profil hybride issu du développement applicatif et de la 3D
          professionnelle.
        </p>
        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<Sparkles />}
            content="Voir mes projets"
            NavigateTo="/projects"
          />
          <SecondaryButton navigateTo="/contact" content="Me contacter" />
        </div>
        <div className={styles.CarrouselContainer}>
          <CarrouselBanner />
        </div>
        <div>
          <CtaScroll NavigateTo="#QuiSuisJeSection" />
        </div>
      </section>
      <section
        className={`${styles.sectionClass} ${styles.about}`}
        aria-label="Qui suis-je ?"
        id="QuiSuisJeSection"
      >
        <h2 className={styles.TitleHTwo}>Qui suis-je ?</h2>
        <p className={styles.subTitleTwo}>
          Bonjour, je suis Donovan Chartrain. <br />
          <strong>
            Développeur web fullstack orienté performance et produit
          </strong>
          , j’interviens sur des projets web et mobiles en environnement agence,
          PME ou ESN. Mon parcours combine développement applicatif et plus de
          10 ans d’expérience en design et 3D professionnelle.
        </p>
        <div className={styles.CardsPanelTypeOne}>
          <CardTypeOne
            icons={<ChartNoAxesCombined />}
            value={'3+ ans'}
            content={'Développement web en entreprise'}
          />
          <CardTypeOne
            icons={<Palette />}
            value={'10+ ans'}
            content={'Design, 3D & production visuelle'}
          />
          <CardTypeOne
            icons={<Boxes />}
            value={'20+ projets'}
            content={'Sites web, applications & 3D'}
          />
          <CardTypeOne
            icons={<Database />}
            value={'Fullstack'}
            content={'Frontend, Backend & cross-platform'}
          />
        </div>
        <div className={styles.CardsPanelTypeTwo}>
          <ExpertisePanel />
        </div>
        <div className={styles.aboutActions}>
          <PrimaryButton
            icons={<IdCard />}
            content="Découvrir mon parcours"
            NavigateTo="/expertise"
          />
          <DownloadCvButton />
        </div>
      </section>
      <section
        className={`${styles.sectionClass} ${styles.projects}`}
        aria-label="Mes projets"
      >
        <h2 className={styles.TitleHTwo}>Réalisations récentes</h2>
        <p className={styles.subTitleTwo}>
          Quelques projets représentatifs de mon travail en{' '}
          <strong>développement web et mobile</strong>, réalisés en contexte
          professionnel et personnel.
        </p>
        <div className={styles.ProjectContainer}>
          <ProjectPanel />
        </div>
        <PrimaryButton
          icons={<FolderOpen />}
          content="Découvrir tous mes projets"
          NavigateTo="/projects"
        />
      </section>
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
            <span>Réponse sous 24-48h</span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
