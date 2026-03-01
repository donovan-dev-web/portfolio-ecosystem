import style from './badgeItems.module.scss';
interface BadgeProps {
  icons: boolean;
  content: string;
}

export function Badge({ icons, content }: BadgeProps) {
  return (
    <div className={`${style.items} ${icons ? style.withIcons : ''}`}>
      {icons && <div className={style.pins} />}
      <p className={style.text}>{content}</p>
      {icons && <div className={style.pins} />}
    </div>
  );
}
