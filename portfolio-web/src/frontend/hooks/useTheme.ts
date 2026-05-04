'use client';

import { useSyncExternalStore } from 'react';

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  ThemeMode,
} from '@/frontend/theme/theme.shared';

const THEME_EVENT = 'portfolio-theme-change';

function isThemeMode(value: string | null): value is ThemeMode {
  return value !== null && THEMES.includes(value as ThemeMode);
}

function getDomTheme(): ThemeMode {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME;
  }

  const currentTheme = document.documentElement.dataset.theme;
  return isThemeMode(currentTheme ?? null)
    ? (currentTheme as ThemeMode)
    : DEFAULT_THEME;
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function emitThemeChange() {
  window.dispatchEvent(new Event(THEME_EVENT));
}

function getSnapshot(): ThemeMode {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isThemeMode(storedTheme)) {
    if (getDomTheme() !== storedTheme) {
      applyTheme(storedTheme);
    }

    return storedTheme;
  }

  const domTheme = getDomTheme();

  if (storedTheme === null && domTheme !== DEFAULT_THEME) {
    return domTheme;
  }

  if (domTheme !== DEFAULT_THEME) {
    applyTheme(DEFAULT_THEME);
  }

  return DEFAULT_THEME;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handleThemeChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(THEME_EVENT, handleThemeChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(THEME_EVENT, handleThemeChange);
    window.removeEventListener('storage', handleStorage);
  };
}

export function setTheme(theme: ThemeMode) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
  emitThemeChange();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_THEME);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
