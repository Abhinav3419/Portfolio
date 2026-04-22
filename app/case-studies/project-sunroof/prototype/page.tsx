import type { Metadata } from 'next';
import { SunroofPrototype } from '@/components/sunroof-prototype';

export const metadata: Metadata = {
  title: 'Sunroof Prototype — Atmospheric Correction',
  description:
    'Interactive calculator demonstrating the Pb × Mc atmospheric correction to Project Sunroof.',
};

export default function Page() {
  return <SunroofPrototype />;
}
