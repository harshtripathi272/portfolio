export const dynamic = 'force-dynamic';

import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import nextDynamic from "next/dynamic";

const ProjectCarousel3D = nextDynamic(
  () => import("@/components/project-carousel-3d").then((mod) => mod.ProjectCarousel3D),
  {
    ssr: false,
    loading: () => <div className="w-full h-[600px] flex items-center justify-center text-neutral-500">Loading...</div>,
  }
);

const HeroScene = nextDynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

export default function Page() {
  return (
    <main className="relative bg-[#050505] selection:bg-white selection:text-black">
      {/* ═══════════ HERO (3D WebGL) ═══════════ */}
      <section id="hero" className="relative min-h-[120vh] w-full overflow-hidden">
        {/* R3F Canvas component takes the bottom layer */}
        <HeroScene />

        {/* Massive kinetic typography overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none mt-[-10vh]">
          <div className="overflow-hidden">
            <h1 className="text-[12vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-[0.8] uppercase font-[family-name:var(--font-display)] mx-auto text-center will-change-transform mix-blend-overlay">
              {DATA.name.split(' ')[0]}
              <br />
              <span className="opacity-50">{DATA.name.split(' ')[1]}</span>
            </h1>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-6 pointer-events-auto">
            <p className="text-xl md:text-2xl font-medium text-neutral-300 max-w-2xl text-center px-4 mix-blend-difference">
              {DATA.description}
            </p>
            
            {/* Magnetic-style subtle buttons */}
            <div className="flex items-center gap-4">
               {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.navbar)
                .map(([name, social]) => (
                  <MagneticWrapper key={name}>
                    <Link
                      href={social.url}
                      target="_blank"
                      data-interactive
                      className="group flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-110"
                    >
                      <social.icon className="size-5" />
                    </Link>
                  </MagneticWrapper>
                ))}
            </div>
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-bold">Discover</span>
          <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/50 animate-[marquee-vertical_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* ═══════════ STATS (Giant Numbers) ═══════════ */}
      <section id="stats" className="relative z-20 px-6 py-32 bg-[#050505]">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-px md:bg-white/[0.04] rounded-2xl md:border border-white/[0.06] overflow-hidden">
              {[
                { value: "8+", label: "Feature Projects" },
                { value: "2", label: "Hackathon Wins" },
                { value: "3+", label: "Internships" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-16 px-8 bg-[#050505] transition-colors duration-500 hover:bg-white/[0.02] border border-white/[0.06] md:border-none rounded-2xl md:rounded-none group"
                >
                  <span className="text-6xl md:text-8xl font-black font-[family-name:var(--font-display)] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600 transition-transform duration-700 group-hover:scale-110">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-[0.3em] mt-6 font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ ABOUT (Aggressive Typography) ═══════════ */}
      <section id="about" className="relative z-20 px-6 py-32 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" duration={1}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter font-[family-name:var(--font-display)] text-white mb-12 leading-[1.1]">
              Engineering at the edge of <span className="text-neutral-500">possibility.</span>
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

      {/* ═══════════ PROJECTS (Interactive Showcase) ═══════════ */}
      <section id="projects" className="relative z-20 py-32 border-t border-white/[0.04] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <ScrollReveal>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter font-[family-name:var(--font-display)] text-white/10 uppercase">
              Featured<br/><span className="text-white">Selected Works</span>
            </h2>
          </ScrollReveal>
        </div>
        
        {/* Full-bleed bleeding carousel for maximum impact */}
        <div className="w-[110vw] relative left-1/2 -translate-x-1/2">
          <ScrollReveal delay={0.2} duration={1}>
            <ProjectCarousel3D />
          </ScrollReveal>
        </div>
      </section>

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
                  <div className="h-full p-8 rounded-3xl bg-[#080808] border border-white/[0.04] hover:bg-[#111] hover:border-white/[0.1] transition-all duration-500 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-4xl group-hover:scale-125 transition-transform duration-500 inline-block">{achievement.icon}</span>
                        <div className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all">
                          ↗
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2">{achievement.title}</h3>
                      <p className="text-neutral-500 text-lg line-clamp-2">{achievement.description}</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/[0.05] text-sm text-neutral-600 font-bold uppercase tracking-widest">
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
      <section id="contact" className="relative z-20 w-full bg-white text-black py-40 rounded-t-[3rem] mt-32">
        <div className="max-w-5xl mx-auto text-center px-6">
          <ScrollReveal direction="up" duration={1}>
            <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8] mb-12">
              Let&apos;s craft <br/>
              <span className="text-neutral-400">the future.</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} duration={1}>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              data-interactive
              className="inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-black text-white text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              Get in Touch →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Dock spacer */}
      <div className="h-24 bg-white hidden" />
    </main>
  );
}
