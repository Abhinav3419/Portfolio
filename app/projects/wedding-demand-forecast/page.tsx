import type { Metadata } from 'next';
import { mainProjects } from '@/lib/content';
import { ProjectDetail } from '@/components/project-detail';

const project = mainProjects.find((p) => p.slug === 'wedding-demand-forecast')!;

export const metadata: Metadata = {
  title: project.title,
  description: project.tagline,
};

export default function WeddingPage() {
  return <ProjectDetail project={project} />;
}
