import styles from './page.module.scss';
import Link from 'next/link';

export default function PortfolioProjectsPage() {
  return (
    <section className={styles.sectionClass}>
      <h1>Page Project du Portfolio</h1>
      <Link href={'/'}>Retour a l'accueil</Link>
    </section>
  );
}
