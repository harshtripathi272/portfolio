export const dynamic = 'force-dynamic';

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Timeline } from "@/components/timeline";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

import { ProjectsSection } from "@/components/projects-section";
import { StatsSection } from "@/components/stats-section";
import { ContactSection } from "@/components/contact-section";
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
    <main className="relative bg-background">
      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="relative w-full">
        <HeroContent />
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <ScrollReveal>
              <span className="eyebrow">01 — About</span>
            </ScrollReveal>
          </div>
          <div className="md:col-span-9">
            <ScrollReveal>
              <h2 className="font-serif text-4xl font-light leading-[1.1] tracking-tight md:text-6xl">
                I build from the ground up — from{" "}
                <span className="italic accent">AI models</span> to{" "}
                <span className="italic">full-stack products.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70">
                <Markdown>{DATA.summary}</Markdown>
              </div>
            </ScrollReveal>

            {/* Skills grid */}
            <ScrollReveal delay={0.25}>
              <div className="mt-14 border-t border-foreground/15 pt-8">
                <p className="eyebrow mb-6">Toolkit</p>
                <div className="flex flex-wrap gap-x-2 gap-y-3">
                  {DATA.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      <span className="text-[10px] tabular-nums text-foreground/30 transition-colors group-hover:text-background/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <StatsSection />

      {/* ═══════════ EXPERIENCE + EDUCATION ═══════════ */}
      <section id="work" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader index="02" eyebrow="Career" title="Where I've worked" />
          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-20 lg:grid-cols-2">
            <div>
              <h3 className="mb-8 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.25em] text-foreground/50">
                Experience
              </h3>
              <Timeline items={workItems} />
            </div>
            <div id="education">
              <h3 className="mb-8 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.25em] text-foreground/50">
                Education
              </h3>
              <Timeline items={eduItems} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <ProjectsSection />

      {/* ═══════════ ACHIEVEMENTS ═══════════ */}
      <section id="achievements" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader index="04" eyebrow="Milestones" title="Recognition" />

          <div className="mt-16 border-t border-foreground/15">
            {DATA.achievements.map((achievement) => (
              <ScrollReveal key={achievement.title}>
                <Link
                  href={`/achievements/${achievement.slug}`}
                  className="group flex flex-col gap-4 border-b border-foreground/15 py-8 transition-colors duration-300 hover:bg-foreground/[0.03] md:flex-row md:items-center md:gap-10 md:py-10"
                >
                  <span className="font-serif text-3xl md:text-4xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-light leading-tight md:text-4xl">
                      {achievement.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-foreground/60">
                      {achievement.description}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-sm font-medium tabular-nums text-foreground/50">
                    {achievement.date}
                  </span>
                  <span className="text-2xl text-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]">
                    ↗
                  </span>
                </Link>
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
