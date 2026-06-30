"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DATA } from "@/data/resume";

const EASE = [0.16, 1, 0.3, 1] as const;

const PHRASES = [
  "building agentic AI systems",
  "training models for the edge",
  "shipping full-stack products",
  "turning research into reality",
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? 35 : 65);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

export function HeroBand() {
  const typed = useTypewriter(PHRASES);

  return (
    <section className="hero-band-v2">
      {/* animated grid */}
      <div className="hb-grid" aria-hidden />

      {/* floating glow orbs */}
      <motion.div
        className="hb-orb hb-orb-1"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="hb-orb hb-orb-2"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* corner marks */}
      <span className="hb-corner hb-tl">+</span>
      <span className="hb-corner hb-tr">+</span>
      <span className="hb-corner hb-bl">+</span>
      <span className="hb-corner hb-br">+</span>

      {/* center content */}
      <div className="hb-content">
        <motion.span
          className="hb-tag font-mono"
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="hb-dot" /> {DATA.location} · Open to work
        </motion.span>

        <motion.h2
          className="hb-headline font-mono"
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <span className="accent">$</span> {typed}
          <span className="hb-caret" />
        </motion.h2>
      </div>

      {/* gradient fade at bottom */}
      <div className="hb-fade" aria-hidden />
    </section>
  );
}
