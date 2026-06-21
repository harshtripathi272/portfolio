"use client";

import { Marquee } from "@/components/magicui/marquee";
import { DATA } from "@/data/resume";

export function SkillsMarquee() {
  const skills = DATA.skills;

  return (
    <section className="relative overflow-hidden border-y border-foreground/15 bg-foreground py-6 text-background">
      <Marquee className="[--duration:32s]" pauseOnHover>
        {skills.map((skill) => (
          <div
            key={skill}
            className="mx-5 flex items-center gap-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl"
          >
            <span>{skill}</span>
            <span className="accent text-xl">✦</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
