import style from './primaryButton.module.scss';
import Link from 'next/link';

interface ButtonProps {
  content: string;
  NavigateTo: string;
  icons: any;
}

export function PrimaryButton({ icons, content, NavigateTo }: ButtonProps) {
  return (
    <Link href={NavigateTo} className={style.link}>
      {icons}
      {content}
    </Link>
  );
}
