import { MetadataRoute } from 'next';

import { connectDB } from '@/backend/database/mongoose';
import { ProjectService } from '@/backend/projects/projects.services';

const baseUrl = 'https://donovan-dev-web.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/portfolio-projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    await connectDB();
    const projects = await ProjectService.getAll();

    const projectRoutes: MetadataRoute.Sitemap = projects
      .filter(
        (
          project
        ): project is typeof project & {
          slug: string;
          updatedAt?: Date | string;
          createdAt?: Date | string;
        } => Boolean(project?.slug)
      )
      .map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt ?? project.createdAt ?? now),
        changeFrequency: 'monthly',
        priority: 0.85,
      }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
