"use client";

import { Marquee } from "@/components/magicui/marquee";
import { DATA } from "@/data/resume";

export function SkillsMarquee() {
  const skills = DATA.skills;

  return (
    <section className="relative z-20 border-y border-white/[0.04] bg-[#050505] py-10 overflow-hidden">
      <Marquee className="[--duration:30s]" pauseOnHover>
        {skills.map((skill) => (
          <div
            key={skill}
            className="mx-4 flex items-center gap-4 text-2xl font-bold tracking-tight text-white/25 transition-colors duration-300 hover:text-white md:text-4xl"
          >
            <span className="font-[family-name:var(--font-display)]">{skill}</span>
            <span className="text-violet-500/50">✦</span>
          </div>
        ))}
      </Marquee>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent" />
    </section>
  );
}
