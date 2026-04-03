import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Donovan Chartrain — Développeur web fullstack et mobile',
    short_name: 'Donovan Dev',
    description:
      "Portfolio de Donovan Chartrain, développeur web fullstack et mobile, à la recherche d'un poste en CDI en agence web, agence de communication ou ESN.",
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#010101',
    theme_color: '#010101',
    lang: 'fr-FR',
    categories: ['portfolio', 'developer', 'web development', 'mobile'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
