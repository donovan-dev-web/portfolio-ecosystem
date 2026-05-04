import type { Metadata } from 'next';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import { LegalTabs } from '@/frontend/components/Legal/LegalTabs/LegalTabs';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Consultez les mentions légales et la politique de confidentialité du portfolio de Donovan Chartrain.',
  alternates: {
    canonical: '/legal',
  },
  openGraph: {
    title: 'Mentions légales',
    description:
      'Consultez les mentions légales et la politique de confidentialité du portfolio de Donovan Chartrain.',
    url: '/legal',
    type: 'website',
  },
};

export default function LegalPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Informations légales" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            <strong>Mentions</strong> légales
          </h1>
        </div>

        <p className={styles.subTitle}>
          Retrouvez ici les principales informations légales du portfolio, ainsi
          qu’un onglet dédié à la politique de confidentialité relative au
          formulaire de contact et à la gestion des cookies.
        </p>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Informations légales</h2>
        <LegalTabs />
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.contactPanel}>
          <h2 className={styles.contactTitle}>Une question concernant vos données ?</h2>
          <p className={styles.subTitleTwo}>
            Pour toute demande relative à vos informations personnelles ou à
            l’utilisation du formulaire de contact, vous pouvez me joindre
            directement par email.
          </p>
          <SecondaryButton content="Me contacter" navigateTo="/contact" />
        </div>
      </section>

      <Footer />
    </>
  );
}
