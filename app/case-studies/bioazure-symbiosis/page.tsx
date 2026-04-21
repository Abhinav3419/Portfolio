import type { Metadata } from 'next';
import { caseStudies } from '@/lib/content';
import { CaseStudyDetail } from '@/components/case-study-detail';

const cs = caseStudies.find((c) => c.slug === 'bioazure-symbiosis')!;

export const metadata: Metadata = {
  title: cs.title,
  description: cs.tagline,
};

export default function Page() {
  return <CaseStudyDetail cs={cs} />;
}
