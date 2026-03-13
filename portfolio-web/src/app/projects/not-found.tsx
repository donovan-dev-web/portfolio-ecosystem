import styles from './notFound.module.scss';
import Link from 'next/link';

export default function ProjectNotFoundPage() {
  return (
    <section className={styles.sectionClass}>
      <h1>PRojet Non trouvé</h1>
      <Link href={'/'}>Retour a l'accueil</Link>
    </section>
  );
}
