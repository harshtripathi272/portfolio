"use client";

import { DATA } from "@/data/resume";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const STATS = [
  { value: String(DATA.projects.length).padStart(2, "0"), label: "Projects shipped" },
  { value: "1st", sup: "/957", label: "SIWB Hacks, international" },
  { value: "25.02", label: "BLEU · Burmese → English" },
  { value: "10k", sup: "+", label: "Reach on a weekend build" },
];

export function Stats() {
  return (
    <section className="section" aria-label="By the numbers">
      <div className="shell">
        <Stagger className="stat-grid" stagger={0.09}>
          {STATS.map((s) => (
            <StaggerItem className="stat" key={s.label}>
              <div className="stat-value">
                {s.value}
                {s.sup && <sup>{s.sup}</sup>}
              </div>
              <div className="stat-label">{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
