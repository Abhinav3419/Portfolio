'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './theme-provider';
import { profile } from '@/lib/content';

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#case-studies', label: 'Case Studies' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      // Hide on scroll-down past 140px; show on scroll-up
      if (y > 140 && y > lastY) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  // Close mobile drawer on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-line bg-paper/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <div className="container-edge flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-lg tracking-crisp"
            aria-label="Home"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent"
              style={{ boxShadow: '0 0 0 4px hsl(var(--accent) / 0.18)' }}
              aria-hidden
            />
            <span className="font-medium">{profile.name}</span>
            <span className="hidden font-mono text-xs text-muted sm:inline">
              /{profile.handle.toLowerCase()}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="relative px-3 py-2 font-sans text-[13.5px] text-muted transition-colors hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
            <div className="mx-2 h-5 w-px bg-line" />
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-ink hover:text-ink"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-md md:hidden"
          >
            <div className="container-edge flex h-full flex-col justify-center gap-6 pt-20">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-4xl font-light tracking-crisp"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
