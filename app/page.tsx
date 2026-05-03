import Link from 'next/link';
import {
  profile,
  mainProjects,
  miniProjects,
  caseStudies,
  skills,
  timeline,
} from '@/lib/content';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/section-header';
import { ProjectCard } from '@/components/project-card';
import { CaseStudyCard } from '@/components/case-study-card';
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* =========================================================
          HERO — Landing
          ========================================================= */}
      <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40">
        {/* Aurora backdrop — 4 soft colored blobs drifting */}
        <div className="aurora" aria-hidden>
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        {/* Subtle grid overlay on top of aurora */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink)) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 70%)',
          }}
        />

        <div className="container-edge relative z-10">
          <Reveal>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot"
                aria-hidden
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Available for ML / AI Engineering Roles
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display-h1 mt-10 max-w-[22ch] text-ink">
              Machine learning,{' '}
              <span
                className="text-gradient italic"
                style={{ fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
              >
                rigorously
              </span>{' '}
              engineered.
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-10 max-w-2xl text-[17px] leading-relaxed text-muted">
              Portfolio of{' '}
              <span className="text-ink">{profile.name}</span> — an ML engineer trained in
              Applied Mechanics at MNNIT Allahabad, now building production-grade
              models, applied research, and product case studies at the
              intersection of engineering and analytics.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link href="#work" className="btn-primary group">
                See the work
                <ArrowUpRight size={15} className="arrow-slide" />
              </Link>
              <Link href="#contact" className="btn-ghost group">
                Get in touch
              </Link>
            </div>
          </Reveal>

          {/* Identity strip — metrics row with gradient-card styling */}
          <Reveal delay={0.44}>
            <div className="card-gradient mt-24 grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
              <HeroStat label="Research Project" value="ENSO" note="AUC 0.905" />
              <HeroStat label="Applied ML" value="Forecasting" note="p = 0.020" />
              <HeroStat label="Case Studies" value="06" note="Shipped" />
              <HeroStat label="Mini Projects" value="01" note="Deployed" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Thin divider */}
      <Divider />

      {/* =========================================================
          ABOUT
          ========================================================= */}
      <section id="about" className="relative py-28 lg:py-36">
        <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="About · /01"
              title="An engineer first. An ML practitioner by design."
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-muted">
                The work on this site sits at the intersection of three disciplines:
                applied mechanics (the M.Tech foundation), signal processing (the
                B.Tech foundation), and modern machine learning (the current focus).
                The common thread is a preference for{' '}
                <span className="text-ink">physics-informed features</span>,{' '}
                <span className="text-ink">honest cross-validation</span>, and{' '}
                <span className="text-ink">reporting null results</span> when they
                happen.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-[17px] leading-[1.75] text-muted">
                Alongside this, years of solving physics and engineering problems — from continuum mechanics to signal processing — has 		sharpened one non-obvious skill: reducing a tangled problem to its smallest honest explanation.
                That discipline shows up in every repo — in commit hygiene, README
                structure, and the separation between what a model claims and what the
                data actually supports.
              </p>
            </Reveal>

            {/* Timeline */}
            <div className="mt-14">
              <Reveal>
                <p className="eyebrow mb-6">Trajectory</p>
              </Reveal>
              <div className="space-y-0">
                {timeline.map((t, i) => (
                  <Reveal key={t.period} delay={i * 0.08}>
                    <TimelineRow
                      period={t.period}
                      heading={t.heading}
                      detail={t.detail}
                      last={i === timeline.length - 1}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* =========================================================
          WORK — Main Projects
          ========================================================= */}
      <section id="work" className="relative py-28 lg:py-36">
        <div className="container-edge">
          <SectionHeader
            eyebrow="Work · /02 — Main Projects"
            title="Two public repositories. Both end-to-end. Both grounded in a real problem."
            lede="Research-grade ML with reproducible pipelines — full stack from data pull to model output, documented at a standard suitable for submission."
          />

          <div className="mt-16 space-y-8">
            {mainProjects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={String(i + 1).padStart(2, '0')}
                href={`/projects/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MINI PROJECTS
          ========================================================= */}
      <section id="mini-projects" className="relative py-20 lg:py-28">
        <div className="container-edge">
          <SectionHeader
            eyebrow="Work · /03 — Mini Projects"
            title="Focused builds. Production shape."
            lede="Compact projects that go all the way from dataset to deployed API — useful for measuring craft, not scope."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {miniProjects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={`M${String(i + 1).padStart(2, '0')}`}
                href={`/mini-projects/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* =========================================================
          CASE STUDIES
          ========================================================= */}
      <section id="case-studies" className="relative py-28 lg:py-36">
        <div className="container-edge">
          <SectionHeader
            eyebrow="Case Studies · /04"
            title="Six original product cases. One lens each."
            lede="Written for real companies — Amazon, Google, Netflix, Microsoft, luxury automotive OEMs, and Indian retail — using a distinct analytical lens per case. No recycled frameworks."
          />

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* =========================================================
          SKILLS
          ========================================================= */}
      <section id="skills" className="relative py-28 lg:py-36">
        <div className="container-edge">
          <SectionHeader
            eyebrow="Skills · /05"
            title="Toolchain, organised by what it's actually used for."
          />

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/50 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => (
              <Reveal
                key={group.group}
                delay={i * 0.06}
                className="h-full bg-paper p-7"
              >
                <p className="eyebrow mb-4">/{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-xl font-normal tracking-crisp text-ink">
                  {group.group}
                </h3>
                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[14px] text-muted"
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
      </section>

      <Divider />

      {/* =========================================================
          CONTACT
          ========================================================= */}
      <section id="contact" className="relative py-28 lg:py-36">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow">Contact · /06</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h2 mt-4 text-ink">
                  Open to ML engineering roles, applied research, and product
                  positions at the ML × product seam.
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted">
                  Based in {profile.locationLabel}. Open to remote, hybrid, and
                  relocation for the right role. The fastest response comes via
                  email or LinkedIn.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <div className="card-glass overflow-hidden">
                <ContactRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                />
                <ContactRow
                  icon={<Github size={16} />}
                  label="GitHub"
                  value={`@${profile.handle}`}
                  href={profile.github}
                  external
                />
                <ContactRow
                  icon={<Linkedin size={16} />}
                  label="LinkedIn"
                  value="abhinavpandey-ai-ml"
                  href={profile.linkedin}
                  external
                />
                <ContactRow
                  icon={<FileText size={16} />}
                  label="Résumé"
                  value="On request · PDF"
                  href={`mailto:${profile.email}?subject=R%C3%A9sum%C3%A9%20request`}
                  last
                />
              </div>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn-primary group"
                  >
                    Send a message
                    <ArrowUpRight size={15} className="arrow-slide" />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost group"
                  >
                    Connect on LinkedIn
                    <ArrowUpRight size={15} className="arrow-slide" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   Local helper components
   ========================================================= */

function Divider() {
  return (
    <div className="container-edge">
      <div className="hairline" />
    </div>
  );
}

function HeroStat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="bg-paper p-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
        {label}
      </p>
      <p className="mt-3 font-display text-[2rem] font-light leading-none tracking-crisp text-ink">
        {value}
      </p>
      <p className="mt-2 font-mono text-[11px] text-muted">{note}</p>
    </div>
  );
}

function TimelineRow({
  period,
  heading,
  detail,
  last,
}: {
  period: string;
  heading: string;
  detail: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[88px_1fr] gap-5 py-5 ${
        last ? '' : 'border-b border-line'
      }`}
    >
      <div className="pt-0.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
          {period}
        </p>
      </div>
      <div>
        <h4 className="font-display text-[1.125rem] font-normal tracking-crisp text-ink">
          {heading}
        </h4>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{detail}</p>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  last?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`group flex items-center gap-5 px-6 py-5 transition-colors hover:bg-paper ${
        last ? '' : 'border-b border-line'
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[15px] text-ink">{value}</p>
      </div>
      <ArrowUpRight
        size={16}
        className="arrow-slide shrink-0 text-muted group-hover:text-accent"
      />
    </a>
  );
}
