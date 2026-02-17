import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { LetterPullup } from "@/components/magicui/letter-pullup";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";

import dynamic from "next/dynamic";

const ProjectCarousel3D = dynamic(() => import("@/components/project-carousel-3d").then(mod => mod.ProjectCarousel3D), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center text-muted-foreground">Loading 3D Scene...</div>
});
import { ResumeCard } from "@/components/resume-card";
import { AnimatedSectionHeader } from "@/components/ui/animated-section-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FloatingTags } from "@/components/ui/floating-tags";
import { GradientBorder } from "@/components/ui/gradient-border";
import { GradientOrbs } from "@/components/ui/gradient-orbs";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex flex-col min-h-[100dvh] space-y-16 sm:space-y-32 mb-24">
      <GradientOrbs />
      
      {/* ─── Hero Section ─── */}
      <section id="hero" className="relative">
        <div className="mx-auto w-full max-w-4xl space-y-12 pt-16 sm:pt-32">
          <div className="text-center space-y-8">
            {/* Availability Badge */}
            <BlurFade delay={BLUR_FADE_DELAY * 0.5}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Available for work
                </span>
              </div>
            </BlurFade>
            
            {/* Avatar */}
            <BlurFade delay={BLUR_FADE_DELAY * 0.7}>
              <div className="relative inline-block">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-400/30 via-orange-300/20 to-transparent blur-2xl" />
                <Avatar className="relative size-32 sm:size-40 border-2 border-white/10 ring-2 ring-white/5">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>

            {/* Hero Text */}
<BlurFade delay={BLUR_FADE_DELAY}>
              <LetterPullup
                words={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                delay={0.05}
                className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl font-[family-name:var(--font-display)] text-foreground"
              />
            </BlurFade>
            
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                {DATA.description}
              </p>
            </BlurFade>

            {/* Social Links - Magnetic */}
            <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
              <div className="flex items-center gap-3 justify-center pt-4">
                {Object.entries(DATA.contact.social)
                  .filter(([_, social]) => social.navbar)
                  .map(([name, social]) => (
                    <MagneticButton key={name} strength={0.2}>
                      <Link
                        href={social.url}
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] hover:border-amber-500/30 hover:bg-zinc-800/90 backdrop-blur-sm transition-all duration-300 group"
                      >
                        <social.icon className="size-4 text-muted-foreground group-hover:text-amber-400 transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">{name}</span>
                      </Link>
                    </MagneticButton>
                  ))}
              </div>
            </BlurFade>
          </div>

          {/* Floating Skills */}
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="relative">
              <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Technologies I Work With</p>
              <FloatingTags tags={[...DATA.skills]} maxTags={10} />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ─── Stats Section - Minimalist ─── */}
      <section id="stats">
        <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {[
              { value: 7, label: "Projects Built", suffix: "+", icon: "🚀" },
              { value: 2, label: "Hackathon Wins", suffix: "", icon: "🏆" },
              { value: 3, label: "Internships", suffix: "+", icon: "💼" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center justify-center py-6 sm:py-8 rounded-xl bg-zinc-900/60 border border-white/[0.06] space-y-2 hover:border-white/12 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-xl sm:text-2xl mb-1">{stat.icon}</span>
                <span className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-display)] tracking-tight text-amber-50">
                  <NumberTicker value={stat.value} delay={0.3 + i * 0.2} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest text-center px-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── About Section ─── */}
      <section id="about">
        <AnimatedSectionHeader
          title="About"
          subtitle="Building from the ground up—from AI models and edge deployments to full-stack applications."
          delay={BLUR_FADE_DELAY * 3}
        />
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="relative rounded-xl border border-white/[0.06] bg-zinc-900/40 p-6 sm:p-8 mt-8">
            <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/10 to-transparent" />
            <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-base text-muted-foreground dark:prose-invert leading-relaxed pl-4">
              {DATA.summary}
            </Markdown>
          </div>
        </BlurFade>
      </section>

      {/* ─── Work Experience ─── */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-8">
          <AnimatedSectionHeader
            title="Work Experience"
            subtitle="Professional journey and key contributions"
            delay={BLUR_FADE_DELAY * 5}
          />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
            <div className="space-y-1">
              {DATA.work.map((work, id) => (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                >
                  <div className="relative flex gap-4 items-start">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0 mt-5">
                      <div className="w-3 h-3 rounded-full bg-zinc-800 border-2 border-white/20 ring-4 ring-background" />
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
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Education ─── */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-8">
          <AnimatedSectionHeader
            title="Education"
            subtitle="Academic background and achievements"
            delay={BLUR_FADE_DELAY * 7}
          />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
            <div className="space-y-1">
              {DATA.education.map((education, id) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                >
                  <div className="relative flex gap-4 items-start">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0 mt-5">
                      <div className="w-3 h-3 rounded-full bg-zinc-800 border-2 border-white/20 ring-4 ring-background" />
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
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />
              <Marquee pauseOnHover className="[--duration:30s] [--gap:0.5rem]">
                {DATA.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-4 py-2 text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-white/[0.06] hover:border-white/15 hover:text-foreground transition-all duration-200 cursor-default rounded-lg whitespace-nowrap"
                  >
                    {skill}
                  </Badge>
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:35s] [--gap:0.5rem] mt-2">
                {DATA.skills.slice().reverse().map((skill) => (
                  <Badge
                    key={skill}
                    className="px-4 py-2 text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-white/[0.06] hover:border-white/15 hover:text-foreground transition-all duration-200 cursor-default rounded-lg whitespace-nowrap"
                  >
                    {skill}
                  </Badge>
                ))}
              </Marquee>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section id="projects">
        <div className="relative space-y-12 w-full py-8 text-center pb-32">
          <DotPattern className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] opacity-40" />
          <AnimatedSectionHeader
            title="Featured Projects"
            subtitle="Explore my work. Drag to navigate."
            delay={BLUR_FADE_DELAY * 11}
            className="relative"
          />
          {/* <ProjectCarousel3D /> */}
          <ProjectCarousel3D />
        </div>
      </section>

      {/* ─── Achievements ─── */}
      <section id="achievements">
        <div className="space-y-12 w-full py-8">
          <AnimatedSectionHeader
            title="Recognition & Awards"
            subtitle="Highlights from competitions and hackathons around the world."
            delay={BLUR_FADE_DELAY * 13}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DATA.achievements.map((achievement, id) => (
              <BlurFade
                key={achievement.title}
                delay={BLUR_FADE_DELAY * 14 + id * 0.05}
              >
                <Link
                  href={`/achievements/${achievement.slug}`}
                  className="block group h-full"
                >
                  <SpotlightCard
                    className="rounded-xl border border-white/[0.06] bg-zinc-900/60 h-full"
                    spotlightColor="rgba(255, 255, 255, 0.03)"
                  >
                    <div className="relative flex flex-col gap-4 p-6 h-full transition-all duration-300 group-hover:-translate-y-0.5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800 text-foreground text-xl border border-white/[0.06]">
                          {achievement.icon}
                        </div>
                        <svg 
                          className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="font-medium text-base leading-tight group-hover:underline decoration-1 underline-offset-4">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium pt-2 border-t border-white/[0.04]">
                        {achievement.date}
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      {/* ─── Contact ─── */}
      <section id="contact">
        <div className="w-full py-16">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <GradientBorder>
              <SpotlightCard
                className="bg-zinc-950"
                spotlightColor="rgba(251, 191, 36, 0.05)"
              >
                <div className="relative p-10 sm:p-14">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-500/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                  <div className="relative flex flex-col items-center text-center space-y-6">
                    <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Contact</span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-display)]">
                      Get in Touch
                    </h2>
                    <p className="mx-auto max-w-[500px] text-muted-foreground text-base leading-relaxed text-balance">
                      Want to chat? Connect with me on{" "}
                      <Link
                        href={DATA.contact.social.LinkedIn.url}
                        className="text-foreground font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        LinkedIn
                      </Link>{" "}
                      and I&apos;ll respond whenever I can.
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                      {Object.entries(DATA.contact.social)
                        .filter(([_, social]) => social.navbar)
                        .map(([name, social]) => (
                          <Link
                            key={name}
                            href={social.url}
                            target="_blank"
                            className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                          >
                            <social.icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                              {name}
                            </span>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </GradientBorder>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
