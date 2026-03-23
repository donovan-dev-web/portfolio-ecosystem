import Image from 'next/image';

import styles from './carrouselBanner.module.scss';

type IconItem = {
  src: string;
  alt: string;
};

const icons: IconItem[] = [
  { src: '/Icons/Logo_Angular.webp', alt: 'Angular' },
  { src: '/Icons/Logo_CSharp.webp', alt: 'C Sharp' },
  { src: '/Icons/Logo_Cplusplus.webp', alt: 'C Plus Plus' },
  { src: '/Icons/Logo_Css.webp', alt: 'CSS' },
  { src: '/Icons/Logo_Docker.webp', alt: 'Docker' },
  { src: '/Icons/Logo_DotNet.webp', alt: 'DotNet' },
  { src: '/Icons/Logo_Electron.webp', alt: 'Electron' },
  { src: '/Icons/Logo_Expo.webp', alt: 'Expo' },
  { src: '/Icons/Logo_Figma.webp', alt: 'Figma' },
  { src: '/Icons/Logo_Firebase.webp', alt: 'Firebase' },
  { src: '/Icons/Logo_Github.webp', alt: 'GitHub' },
  { src: '/Icons/Logo_Html.webp', alt: 'HTML' },
  { src: '/Icons/Logo_JavaScript.webp', alt: 'JavaScript' },
  { src: '/Icons/Logo_MongoDb.webp', alt: 'MongoDB' },
  { src: '/Icons/Logo_Nextjs.webp', alt: 'Next.js' },
  { src: '/Icons/Logo_Nodejs.webp', alt: 'Node.js' },
  { src: '/Icons/Logo_Php.webp', alt: 'PHP' },
  { src: '/Icons/Logo_React-Native.webp', alt: 'React Native' },
  { src: '/Icons/Logo_React.webp', alt: 'React' },
  { src: '/Icons/Logo_Scss.webp', alt: 'SCSS' },
  { src: '/Icons/Logo_TypeScript.webp', alt: 'TypeScript' },
  { src: '/Icons/Logo_Wordpress.webp', alt: 'WordPress' },
  { src: '/Icons/Logo_Zod.webp', alt: 'Zod' },
];

const firstRow = icons.slice(0, 12);
const secondRow = icons.slice(12);

function IconRow({
  items,
  direction,
}: {
  items: IconItem[];
  direction: 'left' | 'right';
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className={styles.rowViewport}>
      <div
        className={`${styles.rowTrack} ${
          direction === 'left' ? styles.toLeft : styles.toRight
        }`}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            className={styles.logoCard}
            aria-hidden={index >= items.length}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={72}
              height={72}
              className={styles.logoImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CarrouselBanner() {
  return (
    <div className={styles.carrouselContainer} aria-label="Technologies">
      <IconRow items={firstRow} direction="right" />
      <IconRow items={secondRow} direction="left" />
    </div>
  );
}
