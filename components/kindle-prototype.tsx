'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

/* =============================================================
   Kindle Physical Book Aesthetics — Interactive Prototype
   Demonstrates the six features proposed in the Amazon case study.
   All features are toggle-able independently so viewers can isolate
   the effect of each.
   ============================================================= */

// Public-domain excerpt — Pride and Prejudice, Chapter 1
const PAGES = [
  {
    chapter: 'Chapter 1',
    text: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do not you want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.`,
  },
  {
    chapter: 'Chapter 1 · cont.',
    text: `"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? how can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."`,
  },
];

type FeatureState = {
  wrinkling: boolean;
  yellowing: number; // 0-100 "days read"
  bleedThrough: boolean;
  pageTurnSound: boolean;
  thicknessBar: boolean;
  gravityTilt: boolean;
};

export function KindlePrototype() {
  const [features, setFeatures] = useState<FeatureState>({
    wrinkling: false,
    yellowing: 0,
    bleedThrough: false,
    pageTurnSound: true,
    thicknessBar: true,
    gravityTilt: false,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [wrinkleKey, setWrinkleKey] = useState(0); // re-trigger wrinkle animation
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Gravity tilt — subtle page response to cursor
  useEffect(() => {
    if (!features.gravityTilt) {
      setTilt({ x: 0, y: 0 });
      return;
    }
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 4; // ±2deg
      const y = (e.clientY / window.innerHeight - 0.5) * 3;
      setTilt({ x, y });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [features.gravityTilt]);

  const playPageTurnSound = () => {
    if (!features.pageTurnSound) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      // Soft paper rustle: filtered noise burst + low-freq decay
      const bufferSize = ctx.sampleRate * 0.25;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      filter.Q.value = 1.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 0.3);
    } catch (_) {
      /* silent fail */
    }
  };

  const turnPage = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(PAGES.length - 1, currentPage + dir));
    if (next === currentPage) return;
    setCurrentPage(next);
    playPageTurnSound();
  };

  const dropBook = () => {
    setFeatures((f) => ({ ...f, wrinkling: true }));
    setWrinkleKey((k) => k + 1);
  };

  // Colour math: yellowing goes from pure paper to aged parchment
  const yellowAlpha = features.yellowing / 100;
  const pageBg = `rgb(${255 - yellowAlpha * 20}, ${252 - yellowAlpha * 35}, ${240 - yellowAlpha * 55})`;

  const page = PAGES[currentPage];
  const progress = ((currentPage + 1) / PAGES.length) * 100;

  return (
    <div className="min-h-screen pb-20 pt-24">
      {/* Aurora backdrop */}
      <div className="aurora" aria-hidden>
        <div className="blob blob-2" />
      </div>

      <div className="container-edge relative z-10">
        {/* Back link */}
        <Link
          href="/case-studies/kindle-physical-book"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to case study
        </Link>

        {/* Intro */}
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow">Prototype · /01 — Kindle Physical Book Aesthetics</p>
          <h1 className="display-h2 mt-4 text-ink">
            Toggle each feature. Feel the difference.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Six sensory features that bridge digital reading and physical books.
            Every control on the right is independent — turn them on one at a time
            to isolate each effect.
          </p>
        </div>

        {/* Prototype layout */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* E-reader device */}
          <div className="relative">
            <div
              className="relative mx-auto max-w-[560px]"
              style={{
                perspective: '1800px',
              }}
            >
              {/* Device frame */}
              <motion.div
                animate={{
                  rotateY: tilt.x,
                  rotateX: -tilt.y,
                }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                className="relative rounded-[2rem] border border-line bg-neutral-900 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Screen */}
                <div
                  className="relative overflow-hidden rounded-[1.5rem]"
                  style={{
                    background: pageBg,
                    aspectRatio: '3 / 4',
                  }}
                >
                  {/* Bleed-through overlay — mirrored ghost text */}
                  {features.bleedThrough && currentPage + 1 < PAGES.length && (
                    <div
                      aria-hidden
                      className="absolute inset-0 p-10 text-neutral-900"
                      style={{
                        transform: 'scaleX(-1)',
                        opacity: 0.06,
                        fontFamily: 'Georgia, serif',
                        fontSize: '15px',
                        lineHeight: 1.7,
                        filter: 'blur(0.5px)',
                      }}
                    >
                      {PAGES[currentPage + 1].text}
                    </div>
                  )}

                  {/* Wrinkle overlay */}
                  <AnimatePresence>
                    {features.wrinkling && (
                      <motion.svg
                        key={wrinkleKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <filter id="wrinkle-turb">
                            <feTurbulence
                              type="fractalNoise"
                              baseFrequency="0.02 0.08"
                              numOctaves="2"
                              seed={wrinkleKey}
                            />
                            <feDisplacementMap in="SourceGraphic" scale="3" />
                          </filter>
                        </defs>
                        <g stroke="rgba(80, 50, 30, 0.5)" fill="none" strokeWidth="0.15">
                          <path d="M 0 25 Q 30 30, 60 22 T 100 28" filter="url(#wrinkle-turb)" />
                          <path d="M 5 48 Q 40 52, 70 45 T 100 50" filter="url(#wrinkle-turb)" />
                          <path d="M 0 72 Q 35 68, 65 74 T 100 70" filter="url(#wrinkle-turb)" />
                          <path d="M 12 10 L 14 92" filter="url(#wrinkle-turb)" strokeWidth="0.1" />
                          <path d="M 82 5 L 80 95" filter="url(#wrinkle-turb)" strokeWidth="0.1" />
                        </g>
                      </motion.svg>
                    )}
                  </AnimatePresence>

                  {/* Page content */}
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 h-full p-10"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      {page.chapter}
                    </p>
                    <div
                      className="mt-6 whitespace-pre-line text-neutral-900"
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '14.5px',
                        lineHeight: 1.75,
                      }}
                    >
                      {page.text}
                    </div>
                  </motion.div>

                  {/* Thickness bar — right edge */}
                  {features.thicknessBar && (
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-1.5 bg-neutral-300/40">
                      <div
                        className="absolute left-0 right-0 bg-neutral-800/70"
                        style={{
                          top: 0,
                          height: `${progress}%`,
                          transition: 'height 400ms ease',
                        }}
                      />
                    </div>
                  )}

                  {/* Page nav controls */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <button
                      onClick={() => turnPage(-1)}
                      disabled={currentPage === 0}
                      className="rounded-full bg-neutral-900/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-800 backdrop-blur transition hover:bg-neutral-900/20 disabled:opacity-30"
                    >
                      ← Prev
                    </button>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                      {currentPage + 1} / {PAGES.length}
                    </span>
                    <button
                      onClick={() => turnPage(1)}
                      disabled={currentPage === PAGES.length - 1}
                      className="rounded-full bg-neutral-900/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-800 backdrop-blur transition hover:bg-neutral-900/20 disabled:opacity-30"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                {/* Device chin */}
                <div className="mt-2 flex items-center justify-center pb-1">
                  <div className="h-1 w-16 rounded-full bg-neutral-700" />
                </div>
              </motion.div>
            </div>

            {/* Helper tip */}
            <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              {features.gravityTilt
                ? '↻ Move your cursor — the page responds'
                : 'Kindle · Paperwhite simulation'}
            </p>
          </div>

          {/* Feature controls panel */}
          <aside className="card-gradient h-fit p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Feature controls</p>
            <h3 className="mt-2 font-display text-xl tracking-crisp text-ink">
              Six sensory levers.
            </h3>

            <div className="mt-7 space-y-5">
              <Toggle
                label="Drop-impact wrinkling"
                desc="Accelerometer-triggered. Tap the drop button."
                active={features.wrinkling}
                onChange={(v) => setFeatures((f) => ({ ...f, wrinkling: v }))}
                action={
                  features.wrinkling ? (
                    <button
                      onClick={dropBook}
                      className="mt-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent"
                    >
                      ↓ Drop again
                    </button>
                  ) : null
                }
              />

              <SliderControl
                label="Time-based yellowing"
                desc="Simulates accumulated read-time per title."
                value={features.yellowing}
                onChange={(v) =>
                  setFeatures((f) => ({ ...f, yellowing: v }))
                }
                suffix={`${features.yellowing}% aged`}
              />

              <Toggle
                label="Ink bleed-through"
                desc="Faint mirror of next page behind current text."
                active={features.bleedThrough}
                onChange={(v) =>
                  setFeatures((f) => ({ ...f, bleedThrough: v }))
                }
              />

              <Toggle
                label="Page-turn sound"
                desc="WebAudio-synthesized paper rustle on turn."
                active={features.pageTurnSound}
                onChange={(v) =>
                  setFeatures((f) => ({ ...f, pageTurnSound: v }))
                }
                icon={
                  features.pageTurnSound ? (
                    <Volume2 size={12} />
                  ) : (
                    <VolumeX size={12} />
                  )
                }
              />

              <Toggle
                label="Functional thickness bar"
                desc="Right-edge indicator of book progress."
                active={features.thicknessBar}
                onChange={(v) =>
                  setFeatures((f) => ({ ...f, thicknessBar: v }))
                }
              />

              <Toggle
                label="Gravity-responsive tilt"
                desc="Page tilts with cursor position."
                active={features.gravityTilt}
                onChange={(v) =>
                  setFeatures((f) => ({ ...f, gravityTilt: v }))
                }
              />
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                Full write-up
              </p>
              <Link
                href="/case-studies/kindle-physical-book"
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
              >
                Read the case study
                <ArrowUpRight size={14} className="arrow-slide" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Controls
   ========================================================= */
function Toggle({
  label,
  desc,
  active,
  onChange,
  icon,
  action,
}: {
  label: string;
  desc: string;
  active: boolean;
  onChange: (v: boolean) => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-[14px] font-medium text-ink">{label}</span>
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-muted">{desc}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          onClick={() => onChange(!active)}
          className={`relative mt-1 h-6 w-11 shrink-0 rounded-full border transition-colors ${
            active ? 'border-accent bg-accent/30' : 'border-line bg-surface'
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full transition-transform ${
              active ? 'translate-x-6 bg-accent' : 'translate-x-0.5 bg-muted'
            }`}
          />
        </button>
      </label>
      {action}
    </div>
  );
}

function SliderControl({
  label,
  desc,
  value,
  onChange,
  suffix,
}: {
  label: string;
  desc: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="text-[14px] font-medium text-ink">{label}</span>
          <p className="mt-1 text-[12.5px] leading-snug text-muted">{desc}</p>
        </div>
        <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent">
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[hsl(var(--accent))]"
      />
    </div>
  );
}
