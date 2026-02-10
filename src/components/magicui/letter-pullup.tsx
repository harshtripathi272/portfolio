"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface LetterPullupProps {
  words: string;
  delay?: number;
  className?: string;
}

export function LetterPullup({
  words,
  delay = 0.05,
  className = "",
}: LetterPullupProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div ref={ref} className="flex flex-wrap">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={i}
          className={className}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
