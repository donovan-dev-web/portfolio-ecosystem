import style from './ctaScroll.module.scss';
import { CircleChevronDown } from 'lucide-react';
export function CtaScroll() {
  return (
    <div className={style.container}>
      <span className={style.text}>SCROLL</span>
      <div className={style.roundedIcons}>
        <span className={style.icons}>
          <CircleChevronDown />
        </span>
      </div>
    </div>
  );
}
