"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Youtube, FileText } from "lucide-react";
import { achievements, type Achievement } from "@/data/portfolio";

function Pin() {
  return <span className="polaroid-pin" aria-hidden />;
}

function HackPolaroid({ a }: { a: Achievement }) {
  return (
    <motion.figure
      className="polaroid hack-polaroid"
      style={{ ["--rot" as string]: `${a.rotation ?? 0}deg` }}
      drag
      dragElastic={0.18}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 40, rotate: 0, cursor: "grabbing" }}
      whileHover={{ scale: 1.02 }}
    >
      <Pin />
      <div className="polaroid-photo hack-photo" style={{ background: a.tint }}>
        <span className="hack-emoji">{a.icon}</span>
        <span className="hack-pos">{a.position}</span>
      </div>
      <figcaption className="hack-caption">
        <span className="hack-event">{a.event}</span>
        <span className="hack-highlight">{a.highlight}</span>
        <span className="hack-links">
          {a.live && (
            <a href={a.live} target="_blank" rel="noreferrer noopener" aria-label="Live">
              <ExternalLink className="size-4" />
            </a>
          )}
          {a.github && (
            <a href={a.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
              <Github className="size-4" />
            </a>
          )}
          {a.youtube && (
            <a href={a.youtube} target="_blank" rel="noreferrer noopener" aria-label="Demo video">
              <Youtube className="size-4" />
            </a>
          )}
          {a.article && (
            <a href={a.article} target="_blank" rel="noreferrer noopener" aria-label="Article">
              <FileText className="size-4" />
            </a>
          )}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Hackathons() {
  const rail = useRef<HTMLDivElement | null>(null);
  return (
    <section id="hackathons" className="mat-section">
      <header className="mat-heading">
        <h2 className="mat-h2">Hackathons</h2>
        <span className="mat-heading-icon">🏆</span>
        <span className="mat-heading-hint">drag the polaroids around ✦</span>
      </header>

      <div className="hack-wall" ref={rail}>
        <div className="hack-line" aria-hidden />
        {achievements.map((a) => (
          <HackPolaroid key={a.id} a={a} />
        ))}
      </div>
    </section>
  );
}
