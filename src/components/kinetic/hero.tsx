"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { DATA } from "@/data/resume";
import { MaskTextOnLoad } from "@/components/motion/mask-text";
import { PointerField } from "@/components/kinetic/pointer-field";
import { Aurora } from "@/components/kinetic/aurora";

const EASE = [0.16, 1, 0.3, 1] as const;

const [FIRST, LAST] = DATA.name.split(" ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Hero drifts up and dims as you scroll past it. The `style` prop stays
  // attached either way — swapping it out for `undefined` would make the server
  // (where useReducedMotion is null) disagree with a reduced-motion client.
  // Collapsing the output ranges disables the parallax without touching markup.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  return (
    <section ref={ref} className="hero" id="top">
      <Aurora className="hero-aurora" />
      <PointerField className="hero-field" />
      <div className="hero-vignette" />

      <motion.div className="hero-inner shell" style={{ y, opacity }}>
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <span className="status-dot" />
          {DATA.location} · Open to work
        </motion.p>

        <h1 className="hero-name display">
          <MaskTextOnLoad
            as="span"
            className="big-line"
            split="chars"
            delay={0.25}
            stagger={0.03}
          >
            {FIRST}
          </MaskTextOnLoad>
          <MaskTextOnLoad
            as="span"
            className="big-line"
            split="chars"
            delay={0.4}
            stagger={0.03}
          >
            {LAST}
          </MaskTextOnLoad>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
        >
          I build <span className="serif-em">intelligent</span> systems — from
          the model to the metal. Machine learning, edge deployment, and
          full-stack products that ship.
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
      >
        <a href="#work" className="scroll-cue">
          <span className="scroll-cue-line" />
          Scroll
        </a>
        <span>B.Tech Electrical · Est. 2023</span>
      </motion.div>
    </section>
  );
}
