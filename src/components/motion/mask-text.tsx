"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Resolved once at module scope. Calling `motion(tag)` during render would mint
 * a new component type every pass and remount the whole subtree.
 */
const TAGS = {
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  div: motion.div,
} as const;

type Tag = keyof typeof TAGS;
type Split = "words" | "chars";

interface MaskTextProps {
  children: string;
  as?: Tag;
  className?: string;
  /** Unmask per word (default) or per character — chars suit large display type. */
  split?: Split;
  /** Seconds before the first unit animates. */
  delay?: number;
  /** Seconds between each unit. */
  stagger?: number;
  /** Replay every time it re-enters the viewport. */
  repeat?: boolean;
}

/**
 * Splits text into words or characters and slides each up out of its own
 * overflow-hidden box. Every unit gets an inline-block mask, so we never have
 * to guess where the browser will wrap the line.
 *
 * The DOM is identical whether or not motion is reduced — only the durations
 * collapse to zero — which keeps server and client markup in agreement.
 */
function split(text: string, mode: Split) {
  if (mode === "chars") return Array.from(text);
  // Keep each space glued to the preceding word so `white-space: pre` renders it.
  return text.split(" ").map((w, i, a) => (i < a.length - 1 ? `${w} ` : w));
}

export function MaskText({
  children,
  as = "span",
  className,
  split: mode = "words",
  delay = 0,
  stagger = 0.035,
  repeat = false,
}: MaskTextProps) {
  const reduced = useReducedMotion();
  const Wrapper = TAGS[as];
  const units = split(children, mode);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const unit: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduced ? 0 : 0.9, ease: EASE },
    },
  };

  return (
    <Wrapper
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin: "-12% 0px" }}
      aria-label={children}
    >
      {units.map((u, i) => (
        <span className="mask-w" key={`${u}-${i}`} aria-hidden>
          <motion.span className="mask-word" variants={unit}>
            {u}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}

/** Same treatment, but plays on mount rather than on scroll (for the hero). */
export function MaskTextOnLoad({
  children,
  as = "span",
  className,
  split: mode = "chars",
  delay = 0,
  stagger = 0.035,
}: Omit<MaskTextProps, "repeat">) {
  const reduced = useReducedMotion();
  const Wrapper = TAGS[as];
  const units = split(children, mode);

  return (
    <Wrapper
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
      initial="hidden"
      animate="show"
      aria-label={children}
    >
      {units.map((u, i) => (
        <span className="mask-w" key={`${u}-${i}`} aria-hidden>
          <motion.span
            className="mask-word"
            variants={{
              hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
              show: {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: reduced ? 0 : 1.05, ease: EASE },
              },
            }}
          >
            {u}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
