'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/content';
import { BackLink } from './back-link';
import { Reveal, Stagger, staggerItem } from './reveal';
import { motion } from 'framer-motion';

/**
 * ProjectDetail — one component for both main projects and mini projects.
 * Produces a long-form, editorial detail page. All copy comes from lib/content.ts.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const backHref = project.kind === 'main' ? '/#work' : '/#mini-projects';
  const backLabel = project.kind === 'main' ? 'Back to work' : 'Back to mini projects';

  return (
    <article className="pb-10">
      {/* =========================================================
          Hero
          ========================================================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="aurora" aria-hidden>
          <div className="blob blob-2" />
        </div>

        <div className="container-edge relative z-10">
          <BackLink href={backHref} label={backLabel} />

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <span className="tag">{project.kind === 'main' ? 'Main Project' : 'Mini Project'}</span>
              <span className="tag">{project.year}</span>
              <span className="tag">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                {project.status}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display-h1 mt-8 max-w-[22ch] text-ink">{project.title}</h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 max-w-3xl text-[18px] leading-[1.7] text-muted">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                >
                  <Github size={15} />
                  View source
                  <ArrowUpRight size={15} className="arrow-slide" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost group"
                >
                  <ExternalLink size={14} />
                  Live demo
                </a>
              )}
            </div>
          </Reveal>

          {/* Role / year strip */}
          <Reveal delay={0.36}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/50 md:grid-cols-4">
              <MetaCell label="Role" value={project.role} />
              <MetaCell label="Year" value={project.year} />
              <MetaCell label="Status" value={project.status} />
              <MetaCell
                label="Repository"
                value={project.repo ? 'Public on GitHub' : 'Private'}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          Summary + Metrics grid
          ========================================================= */}
      <section className="py-20 lg:py-24">
        <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Overview</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-h3 mt-4 text-ink">At a glance</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[16.5px] leading-[1.75] text-muted">
                {project.summary}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5">Headline metrics</p>
            </Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/50 sm:grid-cols-2">
              {project.metrics.map((m, i) => (
                <MetricCell key={m.label} metric={m} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Problem
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Problem</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-h3 mt-4 text-ink">The problem statement.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-muted">{project.problem}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          Approach — numbered steps
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Approach</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h3 mt-4 text-ink">Methodology, step by step.</h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  Each step is an intentional choice, made in the open and
                  validated against the next.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Stagger className="space-y-6">
                {project.approach.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex gap-6 border-b border-line pb-6 last:border-b-0 last:pb-0"
                  >
                    <span className="shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                      /{String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[16px] leading-[1.75] text-ink">{step}</p>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Stack
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Stack</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h3 mt-4 text-ink">Tools that shipped this.</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/50 sm:grid-cols-2">
                {project.stack.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.05} className="bg-paper p-7">
                    <p className="eyebrow">{s.label}</p>
                    <ul className="mt-4 space-y-2">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[14.5px] text-ink"
                        >
                          <span
                            className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-accent/70"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Outcomes
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Outcomes</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h3 mt-4 text-ink">What the work actually moved.</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Stagger className="space-y-5">
                {project.outcomes.map((o, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex gap-5 rounded-xl border border-line bg-surface/40 p-6"
                  >
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <p className="text-[15.5px] leading-[1.7] text-ink">{o}</p>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          References (optional)
          ========================================================= */}
      {project.references && project.references.length > 0 && (
        <section className="border-t border-line py-20 lg:py-24">
          <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">References</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h3 mt-4 text-ink">Upstream sources.</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-line rounded-2xl border border-line">
                {project.references.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-surface/60"
                    >
                      <span className="text-[15px] text-ink">{r.label}</span>
                      <ArrowUpRight
                        size={16}
                        className="arrow-slide shrink-0 text-muted group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          Next action
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Continue</p>
            <p className="mt-3 font-display text-2xl tracking-crisp text-ink">
              Return to the full portfolio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#work" className="btn-ghost">All projects</Link>
            <Link href="/#case-studies" className="btn-ghost">Case studies</Link>
            <Link href="/#contact" className="btn-primary group">
              Get in touch
              <ArrowUpRight size={15} className="arrow-slide" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

/* =========================================================
   Local cells
   ========================================================= */

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
        {label}
      </p>
      <p className="mt-1.5 text-[14px] text-ink">{value}</p>
    </div>
  );
}

function MetricCell({
  metric,
  index,
}: {
  metric: { label: string; value: string; note?: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-paper p-7"
    >
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
        {metric.label}
      </p>
      <p className="mt-3 font-display text-[2.25rem] font-light leading-none tracking-crisp text-ink">
        {metric.value}
      </p>
      {metric.note && (
        <p className="mt-2 font-mono text-[11px] text-muted">{metric.note}</p>
      )}
    </motion.div>
  );
}
