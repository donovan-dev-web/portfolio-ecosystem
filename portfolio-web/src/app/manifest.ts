import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Donovan — Développeur Web Fullstack & Mobile',
    short_name: 'Développeur web fullstack & mobile',
    description:
      "Développeur web fullstack & mobile avec 3 ans d'expérience. Création d'applications web performantes avec React, Next.js, Node.js et React Native.",
    start_url: '/',
    display: 'standalone',
    background_color: '#010101',
    theme_color: '#010101',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
