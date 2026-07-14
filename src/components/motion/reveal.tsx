"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * These all keep the same DOM and the same `initial` state regardless of the
 * reduced-motion preference — only the durations collapse to zero. That way the
 * server and client render identical markup, and reduced-motion users get the
 * end state instantly rather than a different tree.
 */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels up into place. */
  y?: number;
  repeat?: boolean;
}

/** Blur-up + rise as the element enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  repeat = false,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: !repeat, margin: "-10% 0px" }}
      transition={{
        duration: reduced ? 0 : 0.85,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

export function Stagger({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  repeat = false,
}: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: reduced ? 0 : 0.7, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
