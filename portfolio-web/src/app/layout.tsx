import type { Metadata } from 'next';
import localFonts from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import { MainLayout } from '@/frontend/layouts/MainLayout';
import { CookieConsentManager } from '@/frontend/components/Global/CookieConsent/CookieConsentManager';
import { themeInitScript } from '@/frontend/theme/theme.shared';
import { absoluteUrl, siteUrl } from '@/frontend/utils/site';

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
  metadataBase: new URL(`${siteUrl}/`),

  title: {
    default: 'Donovan — Développeur Web Fullstack & Mobile',
    template: '%s | Donovan — Développeur Web',
  },

  description:
    "Développeur web fullstack et mobile avec 3 ans d'expérience. Création d'applications web et mobiles performantes avec React, Angular, dotNet, Node.js, Laravel et React Native.",

  applicationName: 'Portfolio Donovan',

  authors: [
    {
      name: 'Donovan',
      url: absoluteUrl('/'),
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
    canonical: absoluteUrl('/'),
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: absoluteUrl('/'),
    siteName: 'Portfolio Donovan',

    title: 'Donovan — Développeur Web Fullstack & Mobile',

    description:
      'Portfolio de Donovan, développeur web et mobile spécialisé en React, React Native et applications fullstack.',

    images: [
      {
        url: '/og-image.png',
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
      'Portfolio de Donovan, développeur web et mobile spécialisé en React, React Native et applications fullstack.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/manifest.webmanifest',

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': absoluteUrl('/#person'),
        name: 'Donovan Chartrain',
        url: absoluteUrl('/'),
        image: absoluteUrl('/images/PhotoProfil.png'),
        jobTitle: 'Développeur Web Fullstack & Mobile',
        description:
          "Développeur web fullstack spécialisé en React, Next.js, Node.js et développement d'applications modernes.",
        sameAs: [
          'https://github.com/donovan-dev-web',
          'https://www.linkedin.com/in/donovan-chartrain-dev-web',
        ],
        knowsAbout: [
          'JavaScript',
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'React Native',
          'MongoDB',
          'SQL',
          'Angular',
          '.NET',
          'Laravel',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
          addressRegion: "Provence-Alpes-Côte d'Azur",
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Développeur Web Fullstack',
        },
      },

      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        url: absoluteUrl('/'),
        name: 'Portfolio Donovan',
        inLanguage: 'fr-FR',
        publisher: {
          '@id': absoluteUrl('/#person'),
        },
      },

      {
        '@type': 'WebPage',
        '@id': absoluteUrl('/#homepage'),
        url: absoluteUrl('/'),
        name: 'Portfolio Donovan',
        isPartOf: {
          '@id': absoluteUrl('/#website'),
        },
        about: {
          '@id': absoluteUrl('/#person'),
        },
      },

      {
        '@type': 'Service',
        '@id': absoluteUrl('/#service'),
        name: 'Développement Web & Mobile',
        provider: {
          '@id': absoluteUrl('/#person'),
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
        ],
      },
    ],
  };
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
        />
      </head>
      <body className={`${satochiFonts.variable} ${jetBrains.variable}`}>
        <MainLayout>{children}</MainLayout>
        <CookieConsentManager />
      </body>
    </html>
  );
}
