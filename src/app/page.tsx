export const dynamic = 'force-dynamic';

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Timeline } from "@/components/timeline";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import nextDynamic from "next/dynamic";

import { ProjectsSection } from "@/components/projects-section";
import { StatsSection } from "@/components/stats-section";
import { ContactSection } from "@/components/contact-section";
import { SkillsMarquee } from "@/components/skills-marquee";

const HeroScene = nextDynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

import { HeroContent } from "@/components/hero-content";

export default function Page() {
  const workItems = DATA.work.map((w) => ({
    logoUrl: w.logoUrl,
    title: w.company,
    subtitle: w.title,
    period: `${w.start} - ${w.end ?? "Present"}`,
    description: w.description,
    badges: w.badges,
  }));

  const eduItems = DATA.education.map((e) => ({
    logoUrl: e.logoUrl,
    title: e.school,
    subtitle: e.degree,
    period: `${e.start} - ${e.end}`,
  }));

  return (
    <main className="relative bg-[#050505] selection:bg-violet-500/30 selection:text-white">
      {/* ═══════════ HERO (3D WebGL) ═══════════ */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden">
        <HeroScene />
        <HeroContent />

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-violet-400 to-cyan-400 animate-[scroll-line_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <StatsSection />

      {/* ═══════════ SKILLS MARQUEE ═══════════ */}
      <SkillsMarquee />

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="relative z-20 px-6 py-32 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal direction="up" duration={1}>
            <span className="eyebrow mb-6">About</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter font-[family-name:var(--font-display)] text-white mb-12 leading-[1.1] mt-5">
              Engineering at the edge of{" "}
              <span className="text-accent-gradient">possibility.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2} duration={1}>
            <div className="prose prose-xl prose-invert max-w-3xl text-neutral-400 font-sans leading-relaxed tracking-wide">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE + EDUCATION (Timeline) ═══════════ */}
      <section id="work" className="relative z-20 px-6 py-32 border-t border-white/[0.04]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-20 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Career" title="Experience" />
            <Timeline items={workItems} />
          </div>
          <div id="education">
            <SectionHeader eyebrow="Learning" title="Education" />
            <Timeline items={eduItems} />
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <ProjectsSection />

      {/* ═══════════ ACHIEVEMENTS ═══════════ */}
      <section id="achievements" className="relative z-20 px-6 py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Milestones" title="Recognition" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DATA.achievements.map((achievement, id) => (
              <ScrollReveal key={achievement.title} delay={0.08 * id}>
                <SpotlightCard className="h-full">
                  <Link
                    href={`/achievements/${achievement.slug}`}
                    className="group flex h-full flex-col justify-between p-8"
                  >
                    <div>
                      <div className="mb-8 flex items-center justify-between">
                        <span className="inline-block text-4xl transition-transform duration-500 group-hover:scale-125">
                          {achievement.icon}
                        </span>
                        <div className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-violet-400/40 group-hover:text-white">
                          ↗
                        </div>
                      </div>
                      <h3 className="mb-4 line-clamp-2 text-2xl font-bold text-white">
                        {achievement.title}
                      </h3>
                      <p className="line-clamp-2 text-lg text-neutral-500">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="mt-8 border-t border-white/[0.05] pt-6 text-sm font-bold uppercase tracking-widest text-neutral-600">
                      {achievement.date}
                    </div>
                  </Link>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <ContactSection />
    </main>
  );
}
