'use client';

import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { CaseStudy } from '@/lib/content';
import { BackLink } from './back-link';
import { Reveal, Stagger, staggerItem } from './reveal';
import { motion } from 'framer-motion';

export function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  return (
    <article className="pb-10">
      {/* =========================================================
          Hero
          ========================================================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="aurora" aria-hidden>
          <div className="blob blob-3" />
        </div>

        <div className="container-edge relative z-10">
          <BackLink href="/#case-studies" label="Back to case studies" />

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <span className="tag">Case · /{cs.index}</span>
              <span className="tag">{cs.company}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display-h1 mt-8 max-w-[22ch] text-ink">{cs.title}</h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 max-w-3xl text-[18px] leading-[1.7] text-muted">
              {cs.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              Lens — {cs.lens}
            </p>
          </Reveal>

          {cs.repo && (
            <Reveal delay={0.34}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={cs.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                >
                  <Github size={15} />
                  View source
                  <ArrowUpRight size={15} className="arrow-slide" />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* =========================================================
          Business problem
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Business Problem</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-h3 mt-4 text-ink">What's actually broken.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-muted">
                {cs.businessProblem}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          Data & approach
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Data · Evidence</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-h3 mt-4 text-ink">Sources that ground this.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-muted">{cs.data}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          Analysis process
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Process</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h3 mt-4 text-ink">How the analysis moved.</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Stagger className="space-y-6">
                {cs.process.map((step, i) => (
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
          Key insights — grid of cards
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Key Insights</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-h2 mt-4 text-ink">
                What the work surfaced.
              </h2>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/50 md:grid-cols-2">
            {cs.insights.map((ins, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="relative bg-paper p-8"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-subtle">
                  Insight · /{String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-[1.4rem] font-normal leading-tight tracking-crisp text-ink">
                  {ins.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                  {ins.body}
                </p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* =========================================================
          Recommendations
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Recommendations</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h3 mt-4 text-ink">What to do next.</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Stagger className="space-y-5">
                {cs.recommendations.map((r, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex gap-5 rounded-xl border border-line bg-surface/40 p-6"
                  >
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <p className="text-[15.5px] leading-[1.7] text-ink">{r}</p>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Frameworks
          ========================================================= */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-edge flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Frameworks Applied</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.frameworks.map((f) => (
                <span key={f} className="tag">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#case-studies" className="btn-ghost">All cases</Link>
            <Link href="/#contact" className="btn-primary group">
              Discuss this case
              <ArrowUpRight size={15} className="arrow-slide" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
