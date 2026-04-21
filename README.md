# Abhinav Pandey — Portfolio

A production-grade portfolio site built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion. Editorial-technical aesthetic, dark-first with light-mode support, fully responsive, SEO-ready.

All content is grounded in the real GitHub profile at `github.com/Abhinav3419` — no fabricated metrics, no motivational filler.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## Stack

| Concern | Choice | Why |
|:---|:---|:---|
| Framework | Next.js 14 (App Router) | File-based routing, RSC, built-in SEO |
| Styling | Tailwind CSS + CSS vars | Rapid iteration with semantic tokens |
| Motion | Framer Motion | Reveals, stagger, navbar hide/reveal |
| Fonts | Fraunces · IBM Plex Sans · JetBrains Mono | Editorial display + neutral body + technical mono |
| Icons | lucide-react | Clean, consistent, lightweight |
| Language | TypeScript | Types on content prevents drift |

---

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx                # Root layout, fonts, theme provider, SEO metadata
│   ├── page.tsx                  # Homepage — hero, about, work, cases, skills, contact
│   ├── globals.css               # Design tokens (light/dark), utilities, reveals
│   ├── not-found.tsx             # Custom 404
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Robots config
│   │
│   ├── projects/
│   │   ├── enso-free-energy/page.tsx
│   │   └── wedding-demand-forecast/page.tsx
│   │
│   ├── mini-projects/
│   │   └── medical-insurance-predictor/page.tsx
│   │
│   └── case-studies/
│       ├── kindle-physical-book/page.tsx
│       ├── project-sunroof/page.tsx
│       ├── netflix-sensory/page.tsx
│       ├── bioazure-symbiosis/page.tsx
│       ├── luxury-ev-ethos/page.tsx
│       └── cultural-calendar-retail/page.tsx
│
├── components/
│   ├── theme-provider.tsx        # Dark/light toggle with localStorage
│   ├── navbar.tsx                # Sticky, hides on scroll-down, blur on scroll
│   ├── footer.tsx
│   ├── reveal.tsx                # Scroll-triggered reveal + stagger primitives
│   ├── section-header.tsx        # Eyebrow + title + lede
│   ├── back-link.tsx             # Detail-page back link
│   ├── project-card.tsx          # Homepage project card
│   ├── case-study-card.tsx       # Homepage case study card
│   ├── project-detail.tsx        # Full project page layout (shared)
│   └── case-study-detail.tsx     # Full case study page layout (shared)
│
├── lib/
│   └── content.ts                # Single source of truth — all copy lives here
│
├── public/                       # Static assets (add your own OG image, favicon)
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## Editing content

**All copy lives in `lib/content.ts`.** Don't edit page components to change text — edit the typed objects there. The detail pages read from the same source as the homepage cards, so changes propagate automatically.

The file exports:

- `profile` — name, handle, role, contact info, education
- `mainProjects` — array of main Project entries (ENSO, Wedding)
- `miniProjects` — array of mini Project entries (Medical Insurance)
- `caseStudies` — array of six CaseStudy entries
- `skills` — seven skill groups
- `timeline` — four-entry trajectory for the About section

Each object is typed — TypeScript will flag any field you drop.

---

## Design tokens

The color system is driven by CSS variables in `app/globals.css`. Dark mode is the default; light mode activates when the `dark` class is removed from `<html>`.

```css
--paper    /* page background */
--surface  /* elevated surfaces */
--ink      /* primary text */
--muted    /* secondary text */
--subtle   /* tertiary text, tags */
--line     /* borders, dividers */
--accent   /* single signal color (green) */
```

Change any of these in one place to re-skin the site.

Typography is controlled in `app/layout.tsx` via `next/font/google`:

- **Fraunces** — display serif, variable with SOFT axis
- **IBM Plex Sans** — body
- **JetBrains Mono** — eyebrows, numerics, tech labels

Swap any of those with any Google Font import; the rest of the design stays stable because everything references CSS variables.

---

## Sections on the homepage

Anchored sections, in order:

1. Hero — `/`
2. About — `#about`
3. Work (main projects) — `#work`
4. Mini Projects — `#mini-projects`
5. Case Studies — `#case-studies`
6. Skills — `#skills`
7. Contact — `#contact`

The navbar links to each. Section transitions use subtle hairline dividers, not heavy borders.

---

## Features

- **Sticky intelligent navbar** — hides on scroll-down, appears on scroll-up, adds blur + border past 16px scroll.
- **Dark / light theme toggle** with `localStorage` persistence and pre-paint injection to prevent flash.
- **Scroll-reveal animations** via Framer Motion — respects `prefers-reduced-motion`.
- **Fully responsive** — mobile drawer, fluid typography via `clamp()`, grid-to-stack breakpoints.
- **SEO** — per-page `metadata`, OpenGraph, Twitter cards, sitemap, robots.
- **Type-safe content** — TypeScript types on every content object.
- **Grain overlay** — subtle texture, invisible on light mode.

---

## Before you ship

1. **Replace the domain** in `app/sitemap.ts` and `app/robots.ts` (currently `abhinav-pandey.dev`).
2. **Add a favicon and OG image** to `public/` — `favicon.ico`, `opengraph-image.png` (1200×630).
3. **Update `metadataBase`** in `app/layout.tsx` to your live domain.
4. **Confirm links** — email, LinkedIn, GitHub are already pulled from `lib/content.ts`. Double-check before launch.
5. **Add a résumé PDF** at `public/resume.pdf` if you want a direct download — otherwise the current "Résumé on request" mailto works.

---

## Deployment

Designed to deploy as-is to Vercel (one-click) or any Node host. No environment variables required.

```bash
# Vercel
vercel

# Or build locally
npm run build
```

---

## License

Content and case studies: © Abhinav Pandey. All rights reserved.

Site code: use freely as a starting point for your own portfolio.
