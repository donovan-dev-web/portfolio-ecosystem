'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './projectGalleryTabs.module.scss';
import type { ImageVariants } from '@/backend/projects/projects.types';

type GalleryItem = {
  desktop: ImageVariants;
  mobile: ImageVariants;
  alt: string;
};

type ProjectGalleryTabsProps = {
  gallery: GalleryItem[];
  title: string;
};

type GalleryMode = 'desktop' | 'mobile';

export function ProjectGalleryTabs({
  gallery,
  title,
}: ProjectGalleryTabsProps) {
  const [mode, setMode] = useState<GalleryMode>('desktop');

  if (!gallery.length) {
    return (
      <div className={styles.emptyState}>
        <h3>Galerie bientot disponible</h3>
        <p>
          Les visuels d interface pour {title} n ont pas encore ete ajoutes dans
          le catalogue.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.galleryShell}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={mode === 'desktop' ? styles.activeTab : styles.tab}
          onClick={() => setMode('desktop')}
        >
          Desktop
        </button>
        <button
          type="button"
          className={mode === 'mobile' ? styles.activeTab : styles.tab}
          onClick={() => setMode('mobile')}
        >
          Mobile
        </button>
      </div>

      <div
        className={mode === 'desktop' ? styles.desktopGrid : styles.mobileGrid}
      >
        {gallery.map((item, index) => {
          const variants = mode === 'desktop' ? item.desktop : item.mobile;

          return (
            <figure key={`${mode}-${index}`} className={styles.galleryItem}>
              {mode === 'desktop' ? (
                <Image
                  src={variants.large}
                  alt={item.alt}
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  className={styles.galleryImage}
                  quality={100}
                  unoptimized
                  priority={index === 0}
                />
              ) : (
                <div className={styles.mobileMockupFrame}>
                  <div className={styles.mobileScreen}>
                    <Image
                      src={variants.large}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 75vw, 420px"
                      className={styles.mobileScreenImage}
                      quality={100}
                      unoptimized
                      priority={index === 0}
                    />
                  </div>
                  <Image
                    src="/images/Mockup_Mobile.webp"
                    alt=""
                    width={420}
                    height={877}
                    className={styles.mobileMockupOverlay}
                    aria-hidden="true"
                  />
                </div>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
