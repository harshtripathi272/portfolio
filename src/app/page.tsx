export const dynamic = 'force-dynamic';

import { ResumeCard } from "@/components/resume-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import nextDynamic from "next/dynamic";

import { ProjectsSection } from "@/components/projects-section";
import { StatsSection } from "@/components/stats-section";
import { ContactSection } from "@/components/contact-section";

const HeroScene = nextDynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

import { HeroContent } from "@/components/hero-content";

export default function Page() {
  return (
    <main className="relative bg-[#050505] selection:bg-white selection:text-black">
      {/* ═══════════ HERO (3D WebGL) ═══════════ */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden">
        {/* 3D WebGL Background */}
        <HeroScene />

        {/* Centered hero overlay with GSAP animations */}
        <HeroContent />

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 animate-[scroll-line_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>


      {/* ═══════════ STATS (Giant Numbers) ═══════════ */}
      <StatsSection />

      {/* ═══════════ ABOUT (Aggressive Typography) ═══════════ */}
      <section id="about" className="relative z-20 px-6 py-32 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal direction="up" duration={1}>
            <span className="inline-block mb-6 text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
              About
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter font-[family-name:var(--font-display)] text-white mb-12 leading-[1.1]">
              Engineering at the edge of <span className="text-shimmer">possibility.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2} duration={1}>
            <div className="prose prose-xl prose-invert max-w-3xl text-neutral-400 font-sans leading-relaxed tracking-wide">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="work" className="relative z-20 px-6 py-32 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white">
                Experience
              </h2>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {DATA.work.map((work, id) => (
              <ScrollReveal key={work.company} delay={0.1 * id}>
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                  className="bg-transparent border-none hover:bg-white/[0.02]"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <section id="education" className="relative z-20 px-6 py-32 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white">
                Education
              </h2>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {DATA.education.map((education, id) => (
              <ScrollReveal key={education.school} delay={0.1 * id}>
                <ResumeCard
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                  className="bg-transparent border-none hover:bg-white/[0.02]"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* ═══════════ ACHIEVEMENTS ═══════════ */}
      <section id="achievements" className="relative z-20 px-6 py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
           <ScrollReveal>
            <div className="flex items-center gap-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white">
                Recognition
              </h2>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DATA.achievements.map((achievement, id) => (
              <ScrollReveal key={achievement.title} delay={0.1 * id}>
                 <Link href={`/achievements/${achievement.slug}`} className="block h-full group">
                  <div className="relative h-full p-8 rounded-3xl bg-[#080808] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-500 flex flex-col justify-between overflow-hidden">
                    {/* hover accent glow */}
                    <div className="absolute -inset-px rounded-3xl bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.12),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-4xl group-hover:scale-125 transition-transform duration-500 inline-block">{achievement.icon}</span>
                        <div className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 group-hover:rotate-45 transition-all duration-500">
                          ↗
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2">{achievement.title}</h3>
                      <p className="text-neutral-500 text-lg line-clamp-2">{achievement.description}</p>
                    </div>
                    <div className="relative mt-8 pt-6 border-t border-white/[0.05] text-sm text-neutral-600 font-bold uppercase tracking-widest">
                      {achievement.date}
                    </div>
                  </div>
                 </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT (Dramatic Footer) ═══════════ */}
      <ContactSection />

      {/* Dock spacer */}
      <div className="h-24 bg-white hidden" />
    </main>
  );
}
