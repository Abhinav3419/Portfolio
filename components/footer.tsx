import Link from 'next/link';
import { profile } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#case-studies', label: 'Case Studies' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

const elsewhere = [
  { href: profile.github, label: 'GitHub' },
  { href: profile.linkedin, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line bg-paper">
      <div className="container-edge py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-block h-2 w-2 rounded-full bg-accent"
                style={{ boxShadow: '0 0 0 4px hsl(var(--accent) / 0.18)' }}
                aria-hidden
              />
              <span className="font-display text-xl tracking-crisp">{profile.name}</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {profile.role}. Currently building a portfolio of production-grade ML work
              alongside applied-physics research and product case studies.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              {profile.locationLabel}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-ink transition-colors hover:text-accent">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="md:col-span-4">
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="space-y-2.5">
              {elsewhere.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    target={n.href.startsWith('http') ? '_blank' : undefined}
                    rel={n.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
                  >
                    {n.label}
                    <ArrowUpRight size={13} className="arrow-slide text-muted group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            Built with Next.js · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
