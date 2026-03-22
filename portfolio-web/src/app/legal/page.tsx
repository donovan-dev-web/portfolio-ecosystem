import type { Metadata } from 'next';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import { LegalTabs } from '@/frontend/components/Legal/LegalTabs/LegalTabs';

export const metadata: Metadata = {
  title: 'Mentions legales',
  description:
    'Consultez les mentions legales et la politique de confidentialite du portfolio de Donovan Chartrain.',
};

export default function LegalPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Informations legales" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            <strong>Mentions</strong> legales
          </h1>
        </div>

        <p className={styles.subTitle}>
          Retrouvez ici les principales informations legales du portfolio, ainsi
          qu un onglet dedie a la politique de confidentialite relative au
          formulaire de contact et a la gestion des cookies.
        </p>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Informations legales</h2>
        <LegalTabs />
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.contactPanel}>
          <h2 className={styles.contactTitle}>Une question concernant vos donnees ?</h2>
          <p className={styles.subTitleTwo}>
            Pour toute demande relative a vos informations personnelles ou a
            l utilisation du formulaire de contact, vous pouvez me joindre
            directement par email.
          </p>
          <SecondaryButton content="Me contacter" navigateTo="/contact" />
        </div>
      </section>

      <Footer />
    </>
  );
}
