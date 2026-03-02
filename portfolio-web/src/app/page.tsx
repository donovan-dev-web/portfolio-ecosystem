import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Sparkles } from 'lucide-react';
import { PrimaryButton } from '@/frontend/components/Global/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/secondaryButton/SecondaryButton';
import { CtaScroll } from '@/frontend/components/Global/CTA_Scroll/ctaScroll';

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
            Developpeur <strong>Web</strong> <br /> Fullstack & Mobile
          </h1>
        </div>
        <p className={styles.subTitle}>
          Developpeur Full-Stack passionne par la creation d'interfaces
          utilisateur modernes et performantes. <br></br> Specialise en{' '}
          <strong>React</strong>, <strong>Next.js</strong> et{' '}
          <strong>TypeScript</strong>.
        </p>
        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<Sparkles />}
            content="Voir mes projets"
            NavigateTo="/projects"
          />
          <SecondaryButton navigateTo="/contact" content="Me Contacter" />
        </div>
        <div className={styles.badgePanel}>
          <Badge icons={false} content="React" />
          <Badge icons={false} content="Next.js" />
          <Badge icons={false} content="TypeScript" />
          <Badge icons={false} content="Node.js" />
          <Badge icons={false} content="MongoDB" />
        </div>
        <div className={styles.CtaScroll}>
          <CtaScroll />
        </div>
      </section>
      <section
        className={`${styles.sectionClass} ${styles.about}`}
        aria-label="Qui sius-je ?"
      >
        <h2>Qui suis-je ?</h2>
      </section>
      <section
        className={`${styles.sectionClass} ${styles.projects}`}
        aria-label="Mes projets"
      >
        <h2>Mes Projets</h2>
      </section>
    </>
  );
}
