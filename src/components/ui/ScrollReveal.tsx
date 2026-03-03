import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

const getInitial = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up': return { opacity: 0, y: distance };
    case 'down': return { opacity: 0, y: -distance };
    case 'left': return { opacity: 0, x: distance };
    case 'right': return { opacity: 0, x: -distance };
    case 'none': return { opacity: 0 };
  }
};

const getAnimate = (direction: Direction) => {
  switch (direction) {
    case 'up':
    case 'down': return { opacity: 1, y: 0 };
    case 'left':
    case 'right': return { opacity: 1, x: 0 };
    case 'none': return { opacity: 1 };
  }
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  distance = 30,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={getInitial(direction, distance)}
      whileInView={getAnimate(direction)}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/** For staggered children - wrap parent with this */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
