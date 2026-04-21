import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Semantic tokens — bound to CSS vars in globals.css for dark/light
        ink: 'hsl(var(--ink) / <alpha-value>)',
        paper: 'hsl(var(--paper) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        subtle: 'hsl(var(--subtle) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-soft': 'hsl(var(--accent-soft) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
      },
      letterSpacing: {
        tightest: '-0.05em',
        crisp: '-0.02em',
      },
      boxShadow: {
        'edge': '0 1px 0 0 hsl(var(--line))',
        'lift': '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.08)',
        'lift-lg': '0 1px 2px rgb(0 0 0 / 0.06), 0 24px 48px -12px rgb(0 0 0 / 0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'marquee': 'marquee 40s linear infinite',
        'pulse-dot': 'pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
