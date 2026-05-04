import type { Metadata } from 'next';
import { AtSign, Clock, Mail, MapPin, MessageSquareMore } from 'lucide-react';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { DownloadCvButton } from '@/frontend/components/Global/Button/downloadCvButton/DownloadCvButton';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import { ContactForm } from '@/frontend/components/Contact/ContactForm/ContactForm';
import { CtaScroll } from '@/frontend/components/Global/CTA_Scroll/ctaScroll';

export const metadata: Metadata = {
  title: 'Contact - Développeur web en recherche de CDI',
  description:
    'Contactez Donovan Chartrain, développeur web fullstack et mobile, pour échanger autour d’un poste en CDI en agence web, agence de communication ou ESN.',
  alternates: {
    canonical: '/expertise',
  },
  openGraph: {
    title: 'Contact - Développeur web en recherche de CDI',
    description:
      'Contactez Donovan Chartrain, développeur web fullstack et mobile, pour échanger autour d’un poste en CDI en agence web, agence de communication ou ESN.',
    url: '/expertise',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Contact & disponibilité" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Parlons de votre <strong>recrutement</strong> <br /> ou de votre
            besoin
          </h1>
        </div>

        <p className={styles.subTitle}>
          <strong>Développeur web fullstack et mobile</strong>, je suis
          actuellement à la recherche d’un <strong>poste en CDI</strong>,
          principalement au sein d’une <strong>agence web</strong>, d’une
          <strong> agence de communication</strong> ou d’une{' '}
          <strong>ESN</strong>. Si mon profil correspond à vos besoins, nous
          pouvons échanger rapidement autour d’une opportunité.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<MessageSquareMore />}
            content="Voir mes projets"
            NavigateTo="/projects"
          />
          <SecondaryButton
            content="Découvrir mon expertise"
            navigateTo="/expertise"
          />
        </div>

        <div>
          <CtaScroll NavigateTo="#formulaire" />
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Informations de contact</h2>

        <div className={styles.contactInfoPanel}>
          <div className={styles.contactCards}>
            <div>
              <AtSign /> <span>Contact</span>
            </div>
            <span>donovan.chartrain@gmail.com | 06 43 88 39 60</span>
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
            <span>Retour général sous 24 à 48 h</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.formLayout} id="formulaire">
          <div className={styles.formIntroCard}>
            <div className={styles.formIntroBadge}>
              <Mail />
              <span>Prise de contact</span>
            </div>

            <h2 className={styles.formTitle}>Entrons en contact</h2>

            <p className={styles.subTitleTwo}>
              Si vous recrutez un <strong>développeur web</strong> pour
              renforcer une équipe, faire évoluer un produit ou accompagner des
              projets clients, vous pouvez m’envoyer un message directement via
              ce formulaire.
            </p>

            <ul className={styles.formHints}>
              <li>Précisez l’intitulé du poste ou le type d’opportunité.</li>
              <li>
                Indiquez le contexte de l’équipe, de l’agence ou du projet.
              </li>
              <li>
                Ajoutez vos coordonnées pour que je puisse vous recontacter
                rapidement.
              </li>
            </ul>

            <div className={styles.formActions}>
              <DownloadCvButton />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
