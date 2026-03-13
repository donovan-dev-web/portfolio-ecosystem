import style from './secondaryButton.module.scss';
import Link from 'next/link';

interface buttonProps {
  content: string;
  navigateTo: string;
}

export function SecondaryButton({ content, navigateTo }: buttonProps) {
  return (
    <Link href={navigateTo} className={style.link}>
      {content}
    </Link>
  );
}
