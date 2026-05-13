import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useThemeContext } from '@/context/ThemeContext';

export default function CustomCursor() {
  const { theme } = useThemeContext();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 140, damping: 16, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 16, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return !!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]');
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setIsHovering(true);
    };

    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) setIsHovering(false);
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const dotColor = theme === 'dark' ? '#f0f0f0' : '#18181b';
  const ringNormal = theme === 'dark' ? '#a78bfa' : '#18181b';

  return (
    <>
      {/* Small dot — snaps instantly */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: dotColor,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Larger ring — spring follow */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? '#7c3aed' : ringNormal,
          opacity: isHovering ? 0.75 : 0.35,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
}
