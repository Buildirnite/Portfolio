import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: 40 },
  right: { x: -40 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '0px 0px -80px 0px' });
  const prefersReduced = useReducedMotion();

  const hiddenState = prefersReduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] };
  const visibleState = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={inView ? visibleState : hiddenState}
      transition={{ duration: prefersReduced ? 0 : duration, delay: prefersReduced ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
