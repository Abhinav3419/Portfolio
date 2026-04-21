import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted
        transition-colors hover:text-ink"
    >
      <ArrowLeft
        size={13}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />
      {label}
    </Link>
  );
}
