import styles from './notFound.module.scss';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className={styles.sectionClass}>
      <h1>404</h1>
      <Link href={'/'}>Retour a l'accueil</Link>
    </section>
  );
}
