import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/api-docs', '/admin/', '/_next/', '/openapi.json'],
      },
    ],
    host: 'https://donovan-dev-web.vercel.app',
    sitemap: 'https://donovan-dev-web.vercel.app/sitemap.xml',
  };
}
