export const THEME_STORAGE_KEY = 'portfolio-theme';
export const DEFAULT_THEME = 'dark' as const;
export const THEMES = ['dark', 'light'] as const;

export type ThemeMode = (typeof THEMES)[number];

export const themeInitScript = `
(() => {
  const storageKey = '${THEME_STORAGE_KEY}';
  const fallbackTheme = '${DEFAULT_THEME}';

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    const theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : fallbackTheme;

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = fallbackTheme;
    document.documentElement.style.colorScheme = fallbackTheme;
  }
})();
`;
