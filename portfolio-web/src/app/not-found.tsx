import { Metadata } from 'next';
import { Home, FolderSearch, Mail, Compass } from 'lucide-react';

import styles from './notFound.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';

export const metadata: Metadata = {
  title: '404 - Page introuvable',
  description:
    'La page demandee est introuvable. Retournez a l accueil, aux projets ou prenez contact.',
};

export default function NotFoundPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Erreur 404" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Cette page semble <strong>introuvable</strong>
          </h1>
        </div>

        <p className={styles.subTitle}>
          L'URL demandée ne correspond a aucune page du portfolio. Vous pouvez
          revenir a l'accueil, explorer mes projets ou me contacter directement.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<Home />}
            content="Retour a l accueil"
            NavigateTo="/"
          />
          <SecondaryButton content="Voir mes projets" navigateTo="/projects" />
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Quelques raccourcis utiles</h2>

        <div className={styles.shortcutGrid}>
          <article className={styles.shortcutCard}>
            <Compass />
            <h3>Reprendre la navigation</h3>
            <p>
              Retournez vers les sections principales du site pour retrouver
              rapidement votre point d entree.
            </p>
          </article>

          <article className={styles.shortcutCard}>
            <FolderSearch />
            <h3>Explorer les projets</h3>
            <p>
              Consultez le catalogue complet, les projets featured et les pages
              detaillees avec galerie responsive.
            </p>
          </article>

          <article className={styles.shortcutCard}>
            <Mail />
            <h3>Me contacter</h3>
            <p>
              Si vous cherchiez une information precise, je peux vous repondre
              directement via la page contact.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.supportPanel}>
          <h2 className={styles.supportTitle}>
            Besoin d un autre point d entree ?
          </h2>
          <p className={styles.subTitleTwo}>
            Vous pouvez aussi consulter ma page expertise pour mieux comprendre
            mon parcours, mes competences et les technologies que j utilise au
            quotidien.
          </p>
          <div className={styles.panelCtaHero}>
            <SecondaryButton content="Mon expertise" navigateTo="/expertise" />
            <SecondaryButton content="Me contacter" navigateTo="/contact" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
