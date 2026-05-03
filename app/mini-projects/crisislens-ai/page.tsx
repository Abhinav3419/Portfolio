import type { Metadata } from 'next';
import { miniProjects } from '@/lib/content';
import { ProjectDetail } from '@/components/project-detail';

const project = miniProjects.find((p) => p.slug === 'crisislens-ai')!;

export const metadata: Metadata = {
  title: project.title,
  description: project.tagline,
};

export default function CrisisLensAIPage() {
  return <ProjectDetail project={project} />;
}