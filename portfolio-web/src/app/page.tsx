import { icons } from 'lucide-react';
import styles from './page.module.css';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';

export default function Home() {
  return (
    <section className={styles.sectionClass}>
      <Badge icons={true} content="Disponible pour de nouveaux projets" />
      <h1 className={styles.title}>
        Developpeur <strong>Web</strong> Fullstack / Mobile
      </h1>
      <p className={styles.subTitle}>
        Developpeur Full-Stack passionne par la creation d'interfaces
        utilisateur modernes et performantes. Specialise en{' '}
        <strong>React</strong>, <strong>Next.js</strong> et{' '}
        <strong>TypeScript</strong>.
      </p>
      <div className={styles.panelCtaHero}>
        {/* Bouton CTA VOIR PROJET et ME CONTACTER */}
      </div>
      <div className={styles.badgePanel}>
        <Badge icons={false} content="React" />
        <Badge icons={false} content="Next.js" />
        <Badge icons={false} content="TypeScript" />
        <Badge icons={false} content="Node.js" />
        <Badge icons={false} content="MongoDB" />
      </div>
      <div className={styles.CtaScroll}>{/* Scroll CTA */}</div>
    </section>
  );
}
