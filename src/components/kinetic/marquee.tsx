"use client";

import { DATA } from "@/data/resume";

/**
 * Seamless CSS marquee. The track is duplicated so that when the first copy
 * has translated fully out of view, the second sits exactly where it started.
 */
export function SkillMarquee({ duration = 44 }: { duration?: number }) {
  const items = DATA.skills;

  const track = (key: string, hidden = false) => (
    <div
      className="marquee-track"
      key={key}
      aria-hidden={hidden}
      style={{ ["--marquee-dur" as string]: `${duration}s` }}
    >
      {items.map((s) => (
        <span className="marquee-item" key={s}>
          {s}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label={`Tech stack: ${items.join(", ")}`}>
      {track("a")}
      {track("b", true)}
    </div>
  );
}
