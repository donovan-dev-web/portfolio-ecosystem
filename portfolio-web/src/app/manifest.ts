import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Donovan Chartrain — Développeur web fullstack et mobile',
    short_name: 'Donovan Dev',
    description:
      'Portfolio de Donovan Chartrain, développeur web fullstack et mobile.',

    start_url: '/',
    scope: '/',

    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone'],

    orientation: 'portrait',

    background_color: '#010101',
    theme_color: '#010101',

    lang: 'fr-FR',

    categories: ['portfolio', 'developer'],

    icons: [
      {
        src: '/Icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],

    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x800',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Page d’accueil du portfolio sur desktop',
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '390x844',
        type: 'image/png',
        label: 'Version mobile du portfolio',
      },
    ],
  };
}
