import { MetadataRoute } from 'next';

import { connectDB } from '@/backend/database/mongoose';
import { ProjectService } from '@/backend/projects/projects.services';
import { absoluteUrl } from '@/frontend/utils/site';

export const revalidate = 3600;

const SITEMAP_DYNAMIC_TIMEOUT_MS = 3000;

async function getProjectRoutes(now: Date): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  const projects = await ProjectService.getAll();

  return projects
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
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(project.updatedAt ?? project.createdAt ?? now),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/expertise'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: absoluteUrl('/portfolio-projects'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/legal'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/furnigo'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];

  try {
    const projectRoutes = await Promise.race<MetadataRoute.Sitemap>([
      getProjectRoutes(now),
      new Promise<MetadataRoute.Sitemap>((resolve) =>
        setTimeout(() => resolve([]), SITEMAP_DYNAMIC_TIMEOUT_MS)
      ),
    ]);

    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
