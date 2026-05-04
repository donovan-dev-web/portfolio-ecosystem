import { Metadata } from 'next';
import { ArrowLeft, FolderSearch, LayoutTemplate, Mail } from 'lucide-react';

import styles from './notFound.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';

export const metadata: Metadata = {
  title: 'Projet introuvable',
  description:
    'Le projet demandé est introuvable ou n’est plus disponible dans le catalogue.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProjectNotFoundPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Projet introuvable" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Ce projet n'est <strong>plus disponible</strong>
          </h1>
        </div>

        <p className={styles.subTitle}>
          Le lien demandé ne correspond à aucun projet public du catalogue, ou
          bien l’URL n’est plus valide. Vous pouvez revenir à la liste complète
          ou découvrir d’autres réalisations.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<ArrowLeft />}
            content="Retour au catalogue"
            NavigateTo="/projects"
          />
          <SecondaryButton content="Retour à l’accueil" navigateTo="/" />
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Pendant que vous êtes ici</h2>

        <div className={styles.shortcutGrid}>
          <article className={styles.shortcutCard}>
            <FolderSearch />
            <h3>Parcourir tous les projets</h3>
            <p>
              Retrouvez les projets par type, technologies et langages avec les
              filtres du catalogue.
            </p>
          </article>

          <article className={styles.shortcutCard}>
            <LayoutTemplate />
            <h3>Voir le projet mis en avant</h3>
            <p>
              Consultez le projet mis en avant pour avoir un aperçu rapide de ma
              façon de concevoir une interface complète.
            </p>
          </article>

          <article className={styles.shortcutCard}>
            <Mail />
            <h3>Discuter de votre besoin</h3>
            <p>
              Si vous cherchiez une référence précise ou un cas d’usage
              similaire, nous pouvons en parler directement.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.supportPanel}>
          <h2 className={styles.supportTitle}>Autres chemins utiles</h2>
          <p className={styles.subTitleTwo}>
            Le catalogue continue d’évoluer. En attendant, vous pouvez consulter
            le projet mis en avant, mon expertise ou me contacter pour obtenir une
            démonstration plus ciblée.
          </p>
          <div className={styles.panelCtaHero}>
            <SecondaryButton
              content="Voir le projet mis en avant"
              navigateTo="/portfolio-projects"
            />
            <SecondaryButton content="Me contacter" navigateTo="/contact" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
