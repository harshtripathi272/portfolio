"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar fixed to the top of the viewport that fills
 * as the user scrolls down the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-[hsl(var(--accent))]"
    />
  );
}
