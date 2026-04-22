import type { MetadataRoute } from 'next';
import { mainProjects, miniProjects, caseStudies } from '@/lib/content';

const SITE = 'https://abhinav-pandey.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = mainProjects.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const miniRoutes: MetadataRoute.Sitemap = miniProjects.map((p) => ({
    url: `${SITE}/mini-projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const prototypeRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((c) => c.prototype)
    .map((c) => ({
      url: `${SITE}${c.prototype}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    }));

  return [...staticRoutes, ...projectRoutes, ...miniRoutes, ...caseRoutes, ...prototypeRoutes];
}
