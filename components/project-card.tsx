'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/lib/content';

export function ProjectCard({
  project,
  index,
  href,
}: {
  project: Project;
  index: string;
  href: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="card-gradient group relative overflow-hidden"
    >
      <Link href={href} className="block p-8 lg:p-10">
        {/* Top row — index + status */}
        <div className="mb-8 flex items-start justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            /{index} — {project.year}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot"
              aria-hidden
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {project.status}
            </span>
          </div>
        </div>

        {/* Title + tagline */}
        <div className="mb-10">
          <h3 className="display-h3 max-w-2xl text-ink">{project.title}</h3>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted">
            {project.tagline}
          </p>
        </div>

        {/* Metric row — monospace numbers, editorial */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line/60 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-paper p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                {m.label}
              </p>
              <p className="mt-1.5 font-display text-2xl font-normal tracking-crisp text-ink">
                {m.value}
              </p>
              {m.note && (
                <p className="mt-0.5 font-mono text-[10px] text-subtle">{m.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom — tags + CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack[0]?.items.slice(0, 4).map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
              >
                <Github size={14} />
                <span>Source</span>
              </a>
            )}
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
              Read case
              <ArrowUpRight size={16} className="arrow-slide" />
            </span>
          </div>
        </div>
      </Link>

      {/* Decorative hover accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
        aria-hidden
      />
    </motion.article>
  );
}
