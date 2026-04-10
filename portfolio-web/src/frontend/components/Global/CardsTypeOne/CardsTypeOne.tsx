import styles from './cardsTypeOne.module.scss';

interface cardsProps {
  icons: any;
  value: string;
  content: string;
}

export function CardTypeOne({ icons, value, content }: cardsProps) {
  return (
    <div className={styles.CardsContainer}>
      <div className={styles.valueContainer}>
        {icons}
        <span className={styles.valueText}>{value}</span>
      </div>
      <p className={styles.contentText}>{content}</p>
    </div>
  );
}
