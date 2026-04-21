'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/content';

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link
        href={`/case-studies/${cs.slug}`}
        className="card-gradient relative flex h-full flex-col justify-between p-7"
      >
        {/* Header row */}
        <div>
          <div className="mb-5 flex items-start justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              /{cs.index}
            </span>
            <span className="tag">{cs.company}</span>
          </div>

          <h3 className="font-display text-[1.5rem] font-normal leading-[1.15] tracking-crisp text-ink transition-colors group-hover:text-accent">
            {cs.title}
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-muted line-clamp-3">
            {cs.tagline}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {cs.frameworks.slice(0, 2).map((f) => (
              <span
                key={f}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle"
              >
                · {f}
              </span>
            ))}
          </div>
          <ArrowUpRight
            size={18}
            className="arrow-slide shrink-0 text-muted group-hover:text-accent"
          />
        </div>

        {/* Hover accent line */}
        <div
          className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
          aria-hidden
        />
      </Link>
    </motion.article>
  );
}
