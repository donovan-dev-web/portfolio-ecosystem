import type { Metadata } from 'next';
import localFonts from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

import { MainLayout } from '@/frontend/layouts/MainLayout';

import './globals.css';
import '@/frontend/style/main.scss';

const satochiFonts = localFonts({
  src: [
    {
      path: '../frontend/style/Fonts/WEB/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../frontend/style/Fonts/WEB/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../frontend/style/Fonts/WEB/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satochi',
});

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jet',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ton-domaine.com'),

  title: {
    default: 'Donovan — Développeur Web Fullstack & Mobile',
    template: '%s | Donovan — Développeur Web',
  },

  description:
    "Développeur web fullstack & mobile avec 3 ans d'expérience. Création d'applications web performantes avec React, Next.js, Node.js et React Native.",

  applicationName: 'Portfolio Donovan',

  authors: [
    {
      name: 'Donovan',
      url: 'https://ton-domaine.com',
    },
  ],

  creator: 'Donovan',
  publisher: 'Donovan',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: 'https://ton-domaine.com',
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://ton-domaine.com',
    siteName: 'Portfolio Donovan',

    title: 'Donovan — Développeur Web Fullstack & Mobile',

    description:
      'Portfolio de Donovan, développeur web & mobile spécialisé en React, Next.js et applications fullstack.',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Donovan — Développeur Web',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Donovan — Développeur Web Fullstack & Mobile',
    description:
      'Portfolio de Donovan, développeur web fullstack spécialisé en React, Next.js et Node.js.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://ton-domaine.com/#person',
      name: 'Donovan',
      url: 'https://ton-domaine.com',
      image: 'https://ton-domaine.com/avatar.jpg',
      jobTitle: 'Développeur Web Fullstack & Mobile',
      description:
        "Développeur web fullstack spécialisé en React, Next.js, Node.js et développement d'applications web modernes et performantes.",
      sameAs: [
        'https://github.com/tonprofil',
        'https://www.linkedin.com/in/tonprofil',
      ],
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'React Native',
        'Fullstack Development',
        'Web Development',
        'API Development',
        'MongoDB',
        'Firebase',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'FR',
        addressRegion: "Provence-Alpes-Côte d'Azur",
      },
    },

    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://ton-domaine.com/#website',
      url: 'https://ton-domaine.com',
      name: 'Portfolio Donovan',
      description: 'Portfolio de Donovan, développeur web fullstack & mobile.',
      publisher: {
        '@id': 'https://ton-domaine.com/#person',
      },
      inLanguage: 'fr-FR',
    },

    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': 'https://ton-domaine.com/#service',
      name: 'Développement Web & Mobile',
      provider: {
        '@id': 'https://ton-domaine.com/#person',
      },
      areaServed: {
        '@type': 'Country',
        name: 'France',
      },
      serviceType: [
        'Développement web',
        'Développement fullstack',
        "Développement d'applications web",
        'Développement mobile',
        'Création de sites web',
      ],
    },
  ];
  return (
    <html lang="fr">
      <body className={`${satochiFonts.variable} ${jetBrains.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
