'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

/* =============================================================
   Project Sunroof 2.0 — Atmospheric Correction Prototype
   Demonstrates the Pb × Mc correction to Google Sunroof's solar
   estimation equation. Sliders drive real physics-inspired math,
   not just cosmetic effects.

   Simplified model:
     Pb(lat)  → Pressure Belt Multiplier (piecewise, circulation cells)
     Mc(dist) → Marine Coastal Correction (exponential decay)
     E_base   = A · η · Isc · Wbase              (Sunroof classic)
     E_fixed  = A · η · Isc · Wbase · Pb · Mc    (Sunroof 2.0)
   ============================================================= */

function computePb(latitude: number): number {
  // Piecewise approximation of Hadley/Ferrel/Polar circulation impact
  // on clear-sky irradiance. Values tuned for illustrative clarity.
  const absLat = Math.abs(latitude);
  if (absLat < 23.5) {
    // Tropical: high irradiance zone — Pb > 1
    return 1.05 + 0.04 * Math.cos((latitude * Math.PI) / 23.5 / 2);
  } else if (absLat < 35) {
    // Subtropical high — clearest skies, highest multiplier
    return 1.1 - ((absLat - 23.5) / 11.5) * 0.05;
  } else if (absLat < 60) {
    // Mid-latitude Ferrel cell — cloudier, Pb decreases
    return 1.05 - ((absLat - 35) / 25) * 0.15;
  }
  return 0.88 - ((absLat - 60) / 30) * 0.1;
}

function computeMc(distanceKm: number): number {
  // Exponential decay — inland attenuation of coastal humidity loss.
  // Mc asymptotes to 1.0 (no correction needed) deep inland.
  // Near coast (0 km): Mc ≈ 0.82 — substantial humidity cost.
  const minMc = 0.82;
  const decayConstant = 80; // characteristic length in km
  return 1.0 - (1.0 - minMc) * Math.exp(-distanceKm / decayConstant);
}

function beltName(lat: number): string {
  const a = Math.abs(lat);
  if (a < 23.5) return 'Tropical · Hadley cell';
  if (a < 35) return 'Subtropical high — clearest skies';
  if (a < 60) return 'Mid-latitude · Ferrel cell';
  return 'Polar cell';
}

export function SunroofPrototype() {
  const [latitude, setLatitude] = useState(32.7); // San Diego
  const [distance, setDistance] = useState(5); // 5 km inland
  const [area, setArea] = useState(25); // m²
  const [efficiency, setEfficiency] = useState(20); // %
  const isc = 1000; // W/m² solar constant
  const wBase = 0.75; // baseline climatological coefficient

  const { pb, mc, eBase, eFixed, deltaPct } = useMemo(() => {
    const pb = computePb(latitude);
    const mc = computeMc(distance);
    const eBase = area * (efficiency / 100) * isc * wBase;
    const eFixed = eBase * pb * mc;
    const deltaPct = ((eFixed - eBase) / eBase) * 100;
    return { pb, mc, eBase, eFixed, deltaPct };
  }, [latitude, distance, area, efficiency]);

  return (
    <div className="min-h-screen pb-20 pt-24">
      {/* Aurora */}
      <div className="aurora" aria-hidden>
        <div className="blob blob-3" />
      </div>

      <div className="container-edge relative z-10">
        <Link
          href="/case-studies/project-sunroof"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to case study
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="eyebrow">Prototype · /02 — Sunroof Atmospheric Correction</p>
          <h1 className="display-h2 mt-4 text-ink">
            Move the sliders. Watch the physics.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Project Sunroof uses a single climatological coefficient that treats
            coasts and continental interiors identically. Two physics-informed
            multipliers — <span className="text-gradient italic">Pb</span> and{' '}
            <span className="text-gradient italic">Mc</span> — fix this. The panel
            below shows the difference in real time.
          </p>
        </div>

        {/* Main grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Inputs */}
          <aside className="card-gradient h-fit p-6 lg:col-span-4 lg:sticky lg:top-24">
            <p className="eyebrow">Inputs</p>
            <h3 className="mt-2 font-display text-xl tracking-crisp text-ink">
              Site parameters
            </h3>

            <div className="mt-7 space-y-6">
              <Slider
                label="Latitude"
                desc="Drives the Pressure Belt Multiplier."
                value={latitude}
                min={-60}
                max={60}
                step={0.1}
                onChange={setLatitude}
                suffix={`${latitude.toFixed(1)}°`}
              />
              <Slider
                label="Distance from coast"
                desc="Drives the Marine Coastal Correction."
                value={distance}
                min={0}
                max={500}
                step={1}
                onChange={setDistance}
                suffix={`${distance.toFixed(0)} km`}
              />
              <Slider
                label="Panel area"
                value={area}
                min={5}
                max={200}
                step={1}
                onChange={setArea}
                suffix={`${area} m²`}
              />
              <Slider
                label="Efficiency"
                value={efficiency}
                min={10}
                max={28}
                step={0.5}
                onChange={setEfficiency}
                suffix={`${efficiency.toFixed(1)}%`}
              />
            </div>
          </aside>

          {/* Outputs */}
          <div className="space-y-6 lg:col-span-8">
            {/* Headline comparison */}
            <div className="card-gradient p-7">
              <p className="eyebrow">Instantaneous output — peak sun hour</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                <Metric
                  label="Sunroof baseline"
                  value={`${eBase.toFixed(0)} W`}
                  sub="A · η · Isc · Wbase"
                  muted
                />
                <Metric
                  label="Corrected estimate"
                  value={`${eFixed.toFixed(0)} W`}
                  sub="× Pb × Mc"
                  highlight
                />
                <Metric
                  label="Delta"
                  value={`${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(1)}%`}
                  sub={deltaPct >= 0 ? 'Baseline under-reports' : 'Baseline over-reports'}
                  accent={deltaPct >= 0 ? 'pos' : 'neg'}
                />
              </div>

              {/* Delta bar */}
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-surface">
                <motion.div
                  className="h-full"
                  style={{
                    background: deltaPct >= 0
                      ? 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent-2)))'
                      : 'linear-gradient(90deg, hsl(var(--accent-3)), hsl(var(--accent-3)))',
                    width: `${Math.min(Math.abs(deltaPct) * 4, 100)}%`,
                  }}
                  animate={{ width: `${Math.min(Math.abs(deltaPct) * 4, 100)}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                />
              </div>
            </div>

            {/* Equation */}
            <div className="card-gradient p-7">
              <p className="eyebrow">Corrected equation</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[15px] text-ink">
                <span className="text-muted">E =</span>
                <span>(A</span>
                <span className="text-subtle">·</span>
                <span>η</span>
                <span className="text-subtle">·</span>
                <span>Isc)</span>
                <span className="text-subtle">×</span>
                <span className="text-subtle">[</span>
                <span>Wbase</span>
                <span className="text-subtle">·</span>
                <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">
                  Pb = {pb.toFixed(3)}
                </span>
                <span className="text-subtle">·</span>
                <span className="rounded bg-accent-3/15 px-1.5 py-0.5" style={{ color: 'hsl(var(--accent-3))' }}>
                  Mc = {mc.toFixed(3)}
                </span>
                <span className="text-subtle">]</span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                You're in the <span className="text-ink">{beltName(latitude)}</span>.
                {distance < 50
                  ? ' Coastal humidity is attenuating direct irradiance.'
                  : distance < 150
                  ? ' Partial coastal influence still present.'
                  : ' Continental interior — Mc approaches 1.0.'}
              </p>
            </div>

            {/* Visualizations */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Pressure belt schematic */}
              <div className="card-gradient p-6">
                <p className="eyebrow">Pressure belts</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                  Hadley, Ferrel, Polar circulation cells.
                </p>
                <PressureBeltDiagram latitude={latitude} />
              </div>

              {/* Mc decay curve */}
              <div className="card-gradient p-6">
                <p className="eyebrow">Mc decay curve</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                  Exponential inland recovery of clear-sky irradiance.
                </p>
                <McCurve distance={distance} mc={mc} />
              </div>
            </div>

            {/* Preset sites */}
            <div className="card-gradient p-6">
              <p className="eyebrow">Try a real site</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                Jump to a location — see how the correction behaves at each.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                <Preset
                  name="San Diego, CA"
                  sub="coast · subtropical"
                  onClick={() => {
                    setLatitude(32.7);
                    setDistance(3);
                  }}
                />
                <Preset
                  name="Phoenix, AZ"
                  sub="inland · subtropical"
                  onClick={() => {
                    setLatitude(33.4);
                    setDistance(350);
                  }}
                />
                <Preset
                  name="Seattle, WA"
                  sub="coast · mid-lat"
                  onClick={() => {
                    setLatitude(47.6);
                    setDistance(4);
                  }}
                />
                <Preset
                  name="Denver, CO"
                  sub="inland · mid-lat"
                  onClick={() => {
                    setLatitude(39.7);
                    setDistance(480);
                  }}
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                Full write-up in the case study
              </p>
              <Link
                href="/case-studies/project-sunroof"
                className="btn-ghost group"
              >
                Read case study
                <ArrowUpRight size={14} className="arrow-slide" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Controls & visualisations
   ========================================================= */
function Slider({
  label,
  desc,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  label: string;
  desc?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix: string;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="text-[14px] font-medium text-ink">{label}</span>
          {desc && (
            <p className="mt-1 text-[12.5px] leading-snug text-muted">{desc}</p>
          )}
        </div>
        <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent">
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[hsl(var(--accent))]"
      />
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  muted,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  muted?: boolean;
  highlight?: boolean;
  accent?: 'pos' | 'neg';
}) {
  const color =
    accent === 'pos'
      ? 'hsl(var(--accent))'
      : accent === 'neg'
      ? 'hsl(var(--accent-3))'
      : highlight
      ? 'hsl(var(--ink))'
      : 'hsl(var(--muted))';
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
        {label}
      </p>
      <p
        className="mt-2 font-display text-[1.75rem] font-light leading-none tracking-crisp"
        style={{ color }}
      >
        {value}
      </p>
      <p className="mt-1.5 font-mono text-[10.5px] text-muted">{sub}</p>
    </div>
  );
}

function Preset({
  name,
  sub,
  onClick,
}: {
  name: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-line bg-surface/40 p-3 text-left transition-all hover:border-accent/60 hover:bg-accent/5"
    >
      <p className="text-[13px] font-medium text-ink">{name}</p>
      <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wider text-subtle">
        {sub}
      </p>
    </button>
  );
}

/* ---- Pressure belt schematic ---- */
function PressureBeltDiagram({ latitude }: { latitude: number }) {
  // Map latitude (-60..60) to y within the SVG (0..200)
  const y = 100 - (latitude / 60) * 80;
  return (
    <svg viewBox="0 0 260 200" className="mt-4 w-full">
      {/* Earth hemispheres */}
      <defs>
        <linearGradient id="earth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent-3) / 0.3)" />
          <stop offset="30%" stopColor="hsl(var(--accent-2) / 0.3)" />
          <stop offset="50%" stopColor="hsl(var(--accent) / 0.35)" />
          <stop offset="70%" stopColor="hsl(var(--accent-2) / 0.3)" />
          <stop offset="100%" stopColor="hsl(var(--accent-3) / 0.3)" />
        </linearGradient>
      </defs>

      <rect x="40" y="20" width="180" height="160" rx="90" fill="url(#earth)" stroke="hsl(var(--line))" />

      {/* Belt lines */}
      {[60, -60, 35, -35, 23.5, -23.5, 0].map((lat) => {
        const ly = 100 - (lat / 60) * 80;
        return (
          <line
            key={lat}
            x1="40"
            y1={ly}
            x2="220"
            y2={ly}
            stroke="hsl(var(--line))"
            strokeDasharray="2 3"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Labels */}
      <text x="228" y={100 - (30 / 60) * 80} fontSize="8" fill="hsl(var(--subtle))" fontFamily="monospace">
        30°
      </text>
      <text x="228" y="103" fontSize="8" fill="hsl(var(--subtle))" fontFamily="monospace">
        0°
      </text>
      <text x="228" y={100 + (30 / 60) * 80} fontSize="8" fill="hsl(var(--subtle))" fontFamily="monospace">
        -30°
      </text>

      {/* Current latitude marker */}
      <motion.g
        animate={{ y: y - 100 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <circle cx="130" cy="100" r="5" fill="hsl(var(--accent))" />
        <circle cx="130" cy="100" r="10" fill="hsl(var(--accent) / 0.3)" />
      </motion.g>
    </svg>
  );
}

/* ---- Mc exponential decay curve ---- */
function McCurve({ distance, mc }: { distance: number; mc: number }) {
  const points: string[] = [];
  for (let d = 0; d <= 500; d += 5) {
    const m = computeMc(d);
    const x = (d / 500) * 240 + 10;
    const y = 140 - (m - 0.8) * 600;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const curX = (distance / 500) * 240 + 10;
  const curY = 140 - (mc - 0.8) * 600;

  return (
    <svg viewBox="0 0 260 160" className="mt-4 w-full">
      <defs>
        <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent) / 0.3)" />
          <stop offset="100%" stopColor="hsl(var(--accent) / 0)" />
        </linearGradient>
      </defs>

      {/* Grid */}
      <line x1="10" y1="140" x2="250" y2="140" stroke="hsl(var(--line))" strokeWidth="0.5" />
      <line x1="10" y1="20" x2="10" y2="140" stroke="hsl(var(--line))" strokeWidth="0.5" />

      {/* Fill */}
      <path
        d={`M 10 140 L ${points.join(' L ')} L 250 140 Z`}
        fill="url(#curve-fill)"
      />
      {/* Curve */}
      <polyline
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        points={points.join(' ')}
      />

      {/* Current position */}
      <motion.circle
        cx={curX}
        cy={curY}
        r="5"
        fill="hsl(var(--accent))"
        animate={{ cx: curX, cy: curY }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      />
      <motion.circle
        cx={curX}
        cy={curY}
        r="10"
        fill="hsl(var(--accent) / 0.25)"
        animate={{ cx: curX, cy: curY }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      />

      {/* Axis labels */}
      <text x="10" y="155" fontSize="8" fill="hsl(var(--subtle))" fontFamily="monospace">
        0
      </text>
      <text x="232" y="155" fontSize="8" fill="hsl(var(--subtle))" fontFamily="monospace">
        500 km
      </text>
      <text x="13" y="28" fontSize="8" fill="hsl(var(--subtle))" fontFamily="monospace">
        Mc
      </text>
    </svg>
  );
}
