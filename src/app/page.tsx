import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { LetterPullup } from "@/components/magicui/letter-pullup";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";

import dynamic from "next/dynamic";

const ProjectCarousel3D = dynamic(
  () =>
    import("@/components/project-carousel-3d").then(
      (mod) => mod.ProjectCarousel3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center text-neutral-500">
        Loading...
      </div>
    ),
  }
);

const SpotlightClient = dynamic(
  () => import("@/components/ui/spotlight").then((mod) => mod.Spotlight),
  { ssr: false }
);

import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative">
      <SpotlightClient />

      {/* ═══════════ HERO ═══════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Avatar */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="relative inline-block">
              <Avatar className="size-28 sm:size-36 border border-white/10">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </div>
          </BlurFade>

          {/* Name */}
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white leading-[0.9]">
              {DATA.name}
            </h1>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed">
              {DATA.description}
            </p>
          </BlurFade>

          {/* Social Links */}
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex items-center gap-3 justify-center pt-2">
              {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.navbar)
                .map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                  >
                    <social.icon className="size-4 text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="text-sm text-neutral-400 group-hover:text-white transition-colors hidden sm:inline">
                      {name}
                    </span>
                  </Link>
                ))}
            </div>
          </BlurFade>

          {/* Scroll indicator */}
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="pt-16">
              <div className="flex flex-col items-center gap-2 text-neutral-600">
                <span className="text-[10px] uppercase tracking-[0.3em]">
                  Scroll
                </span>
                <div className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent" />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section id="stats" className="px-6 py-24">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-px bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.06]">
              {[
                { value: 8, label: "Projects", suffix: "+" },
                { value: 2, label: "Hackathon Wins", suffix: "" },
                { value: 3, label: "Internships", suffix: "+" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-10 sm:py-14 bg-[#050505] hover:bg-white/[0.02] transition-colors duration-500"
                >
                  <span className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight text-white">
                    <NumberTicker
                      value={stat.value}
                      delay={0.3 + i * 0.2}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-[0.2em] mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              About
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4 mb-8">
              Building from the ground up.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="relative pl-6 border-l border-white/[0.06]">
              <Markdown className="prose max-w-full text-base sm:text-lg text-neutral-400 dark:prose-invert leading-relaxed">
                {DATA.summary}
              </Markdown>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="work" className="px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Experience
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4 mb-12">
              Where I&apos;ve worked.
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/[0.06]" />

            <div className="space-y-2">
              {DATA.work.map((work, id) => (
                <ScrollReveal key={work.company} delay={0.1 + id * 0.08}>
                  <div className="relative flex gap-6 items-start group">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0 mt-5">
                      <div className="w-[15px] h-[15px] rounded-full bg-[#050505] border border-white/[0.15] group-hover:border-white/40 transition-colors duration-300" />
                    </div>
                    <div className="flex-1 pb-2">
                      <ResumeCard
                        key={work.company}
                        logoUrl={work.logoUrl}
                        altText={work.company}
                        title={work.company}
                        subtitle={work.title}
                        href={work.href}
                        badges={work.badges}
                        period={`${work.start} - ${work.end ?? "Present"}`}
                        description={work.description}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <section id="education" className="px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Education
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4 mb-12">
              Academic background.
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/[0.06]" />
            <div className="space-y-2">
              {DATA.education.map((education, id) => (
                <ScrollReveal
                  key={education.school}
                  delay={0.1 + id * 0.08}
                >
                  <div className="relative flex gap-6 items-start group">
                    <div className="relative z-10 flex-shrink-0 mt-5">
                      <div className="w-[15px] h-[15px] rounded-full bg-[#050505] border border-white/[0.15] group-hover:border-white/40 transition-colors duration-300" />
                    </div>
                    <div className="flex-1 pb-2">
                      <ResumeCard
                        key={education.school}
                        href={education.href}
                        logoUrl={education.logoUrl}
                        altText={education.school}
                        title={education.school}
                        subtitle={education.degree}
                        period={`${education.start} - ${education.end}`}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" className="py-24">
        <div className="max-w-2xl mx-auto px-6 mb-8">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Skills
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4">
              Technologies I use.
            </h2>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent" />
            <Marquee pauseOnHover className="[--duration:25s] [--gap:0.75rem]">
              {DATA.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="px-5 py-2.5 text-sm font-medium bg-white/[0.03] text-neutral-300 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white transition-all duration-300 cursor-default rounded-lg whitespace-nowrap"
                >
                  {skill}
                </Badge>
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:30s] [--gap:0.75rem] mt-3"
            >
              {DATA.skills
                .slice()
                .reverse()
                .map((skill) => (
                  <Badge
                    key={skill}
                    className="px-5 py-2.5 text-sm font-medium bg-white/[0.03] text-neutral-300 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white transition-all duration-300 cursor-default rounded-lg whitespace-nowrap"
                  >
                    {skill}
                  </Badge>
                ))}
            </Marquee>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="py-24">
        <div className="max-w-2xl mx-auto px-6 mb-12">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Projects
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4">
              Featured work.
            </h2>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <ProjectCarousel3D />
        </ScrollReveal>
      </section>

      {/* ═══════════ ACHIEVEMENTS ═══════════ */}
      <section id="achievements" className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Recognition
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4 mb-12">
              Awards & achievements.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DATA.achievements.map((achievement, id) => (
              <ScrollReveal key={achievement.title} delay={0.1 + id * 0.08}>
                <Link
                  href={`/achievements/${achievement.slug}`}
                  className="block group h-full"
                >
                  <div className="relative h-full rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                    <div className="relative flex flex-col gap-4 p-6 h-full">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] text-xl border border-white/[0.06]">
                          {achievement.icon}
                        </div>
                        <svg
                          className="w-4 h-4 text-neutral-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="font-medium text-base text-white leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-xs text-neutral-600 font-medium pt-2 border-t border-white/[0.04]">
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="px-6 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Contact
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight font-[family-name:var(--font-display)] text-white mt-4 mb-6">
              Get in touch.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md mx-auto mb-10">
              Want to chat? Connect with me on{" "}
              <Link
                href={DATA.contact.social.LinkedIn.url}
                className="text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
              >
                LinkedIn
              </Link>{" "}
              and I&apos;ll respond whenever I can.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex items-center gap-3 justify-center">
              {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.navbar)
                .map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                  >
                    <social.icon className="size-4 text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                      {name}
                    </span>
                  </Link>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer spacer for dock nav */}
      <div className="h-20" />
    </main>
  );
}
