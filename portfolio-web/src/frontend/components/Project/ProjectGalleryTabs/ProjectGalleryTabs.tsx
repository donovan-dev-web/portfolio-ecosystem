'use client';

import { useState } from 'react';

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
                <img
                  src={variants.medium}
                  srcSet={`${variants.small} 640w, ${variants.medium} 960w, ${variants.large} 1440w`}
                  sizes="(max-width: 900px) 100vw, 90vw"
                  alt={item.alt}
                />
              ) : (
                <div className={styles.mobileMockupFrame}>
                  <div className={styles.mobileScreen}>
                    <img
                      src={variants.medium}
                      srcSet={`${variants.small} 640w, ${variants.medium} 960w, ${variants.large} 1440w`}
                      sizes="(max-width: 900px) 70vw, 360px"
                      alt={item.alt}
                    />
                  </div>
                  <img
                    src="/images/Mockup_Mobile.webp"
                    alt="Mockup Mobile pour presenter l'interface responsive"
                    aria-hidden="true"
                    className={styles.mobileMockupOverlay}
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
