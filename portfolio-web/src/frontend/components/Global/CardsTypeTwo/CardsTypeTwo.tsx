import styles from './cardsTypeTwo.module.scss';

interface cardsProps {
  icons: any;
  title: string;
  content: string;
}

export function CardTypeTwo({ icons, title, content }: cardsProps) {
  return (
    <div className={styles.CardsContainer}>
      {icons}
      <span className={styles.TitleText}>{title}</span>
      <p className={styles.contentText}>{content}</p>
    </div>
  );
}
