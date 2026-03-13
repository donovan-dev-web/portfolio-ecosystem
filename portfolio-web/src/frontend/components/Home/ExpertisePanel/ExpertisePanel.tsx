import styles from './expertisePanel.module.scss';

type ExprtiseCards = {
  title: string;
  description: string;
  tags: string[];
  value: string;
};

const CARDS_FULLSTACK = {
  title: 'Développement Web Fullstack',
  description:
    'Conception et développement d’applications web complètes, du frontend au backend, avec une attention portée à la performance, la maintenabilité et l’expérience utilisateur.',
  tags: ['React', 'Next.js', 'Angular', 'Node.js', '.NET', 'PHP'],
  value:
    'Permet de prendre en charge un projet web dans sa globalité, de l’interface utilisateur à la logique métier.',
};

const CARDS_UI = {
  title: 'Expérience Utilisateur & Design',
  description:
    'Double compétence en développement et production visuelle, permettant de concevoir des interfaces cohérentes, efficaces et adaptées aux objectifs de communication.',
  tags: [
    'UI/UX Design',
    'Intégration responsive',
    'Design digital',
    '3D & motion',
  ],
  value:
    'Facilite la collaboration avec les équipes créatives et garantit des interfaces fidèles aux intentions graphiques.',
};

const CARDS_APPLICATION = {
  title: 'Applications & Écosystèmes Digitaux',
  description:
    'Développement d’applications web, mobiles et outils applicatifs connectés à des services backend.',
  tags: ['React Native', 'Expo', 'Electron', 'API REST', 'MongoDB', 'Firebase'],
  value:
    'Permet de créer des solutions complètes et évolutives pour les projets clients.',
};

const CARDS_METHODOLIGIE = {
  title: 'Architecture & Méthodologie',
  description:
    'Structuration des projets et organisation du code pour garantir qualité, évolutivité et collaboration efficace.',
  tags: [
    'Git',
    'Architecture applicative',
    'Clean Code',
    'Refactoring',
    'Méthodes Agile',
  ],
  value:
    'Garantit des projets maintenables et facilement évolutifs dans le temps.',
};

export default function ExpertisePanle() {
  const cards: ExprtiseCards[] = [
    CARDS_FULLSTACK,
    CARDS_UI,
    CARDS_APPLICATION,
    CARDS_METHODOLIGIE,
  ];

  return (
    <div className={styles.ExpertisePanel}>
      <ul className={styles.timeline}>
        {cards.map((card, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.marker}></div>

            <div className={styles.card}>
              <h3>{card.title}</h3>

              <p>{card.description}</p>

              <div className={styles.tags}>
                {card.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <p className={styles.value}>{card.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
