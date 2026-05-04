'use client';

import { MoonStar, SunMedium } from 'lucide-react';

import { useTheme } from '@/frontend/hooks/useTheme';

import styles from './themeToggle.module.scss';

type ThemeToggleProps = {
  variant: 'desktop' | 'mobile';
};

export function ThemeToggle({ variant }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const nextThemeLabel = isDark ? 'clair' : 'sombre';

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={toggleTheme}
        aria-label={`Passer au thème ${nextThemeLabel}`}
        title={`Passer au thème ${nextThemeLabel}`}
      >
        <span className={styles.mobileToggleIcon}>
          {isDark ? <SunMedium /> : <MoonStar />}
        </span>
        <span className={styles.mobileToggleLabel}>Theme</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.desktopToggle}
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isDark}
      aria-label={`Activer le thème ${nextThemeLabel}`}
      title={`Activer le thème ${nextThemeLabel}`}
    >
      <span className={styles.desktopToggleTrack}>
        <span className={styles.desktopToggleThumb} />
      </span>
      <span className={styles.desktopToggleText}>
        {isDark ? 'dark' : 'light'}
      </span>
    </button>
  );
}
