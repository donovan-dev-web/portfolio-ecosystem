import { MetadataRoute } from 'next';
import { absoluteUrl, siteUrl } from '@/frontend/utils/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/api-docs', '/openapi.json'],
      },
    ],
    host: siteUrl,
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
