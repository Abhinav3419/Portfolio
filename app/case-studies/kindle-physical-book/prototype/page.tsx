import type { Metadata } from 'next';
import { KindlePrototype } from '@/components/kindle-prototype';

export const metadata: Metadata = {
  title: 'Kindle Prototype — Physical Book Aesthetics',
  description:
    'Interactive prototype of six sensory features that bridge digital reading and physical books.',
};

export default function Page() {
  return <KindlePrototype />;
}
