"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Buttery scroll progress bar fixed to the very top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 40%, #fff))",
        }}
      />
    </motion.div>
  );
}
