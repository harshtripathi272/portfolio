"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";

/** Tracks the pointer so the card's radial glow follows it. */
function onMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Awards() {
  return (
    <section className="section" id="awards">
      <div className="shell">
        <p className="eyebrow">
          <span className="eyebrow-num">04</span> Recognition
        </p>
        <MaskText as="h2" className="section-title" split="words">
          Awards and honours.
        </MaskText>

        <div className="award-grid">
          {DATA.achievements.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link
                href={`/achievements/${a.slug}`}
                className="award-card"
                onMouseMove={onMove}
                style={{ height: "100%" }}
              >
                <span className="award-icon" aria-hidden>
                  {a.icon}
                </span>
                <h3 className="award-title">{a.title}</h3>
                <p className="award-desc">{a.description}</p>
                <span className="award-cta">
                  Read the story
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
