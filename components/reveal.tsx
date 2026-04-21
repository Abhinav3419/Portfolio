'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'li' | 'span';
  once?: boolean;
};

/**
 * Reveal — fades + rises the child into view when it enters the viewport.
 * Respects prefers-reduced-motion. Composable, used on every section.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = '',
  as = 'div',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Cmp: any = motion[as];
    return <Cmp className={className}>{children}</Cmp>;
  }

  const MotionCmp: any = motion[as];

  return (
    <MotionCmp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionCmp>
  );
}

/**
 * Stagger — reveals children one-by-one with a small delay between them.
 * Use when revealing a list/grid where sequential feels better than simultaneous.
 */
export function Stagger({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
