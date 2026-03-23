import style from './ctaScroll.module.scss';
import { CircleChevronDown } from 'lucide-react';
import Link from 'next/link';

interface CtaScrollProps {
  NavigateTo: string;
}

export function CtaScroll({ NavigateTo }: CtaScrollProps) {
  return (
    <div className={style.container}>
      <Link href={NavigateTo} aria-label="Navigation vers la section suivante">
        <span className={style.text}>SCROLL</span>
        <div className={style.roundedIcons}>
          <span className={style.icons}>
            <CircleChevronDown />
          </span>
        </div>
      </Link>
    </div>
  );
}
