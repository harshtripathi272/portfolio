import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { LetterPullup } from "@/components/magicui/letter-pullup";
import { Marquee } from "@/components/magicui/marquee";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-12 sm:space-y-24 mb-24">
      {/* ─── Hero Section ─── */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8 pt-12 sm:pt-24">
          <div className="gap-8 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center">
            <div className="flex-col flex flex-1 space-y-4">
              {/* Availability Badge - Minimalist */}
              <BlurFade delay={BLUR_FADE_DELAY * 0.5}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Available for work
                  </span>
                </div>
              </BlurFade>
              
              <BlurFade delay={BLUR_FADE_DELAY}>
                <LetterPullup
                  words={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                  delay={0.04}
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none font-[family-name:var(--font-display)] text-foreground"
                />
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <p className="max-w-[540px] text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
                  {DATA.description}
                </p>
              </BlurFade>

              {/* Minimal Social Links */}
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex items-center gap-3 pt-2">
                  {Object.entries(DATA.contact.social)
                    .filter(([_, social]) => social.navbar)
                    .map(([name, social]) => (
                      <Link
                        key={name}
                        href={social.url}
                        target="_blank"
                        className="group flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary transition-colors duration-200"
                      >
                        <social.icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                      </Link>
                    ))}
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400/20 via-orange-300/10 to-transparent blur-md" />
                <Avatar className="relative size-28 sm:size-32 border-2 border-white/10 ring-1 ring-white/5">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ─── Stats Section - Minimalist ─── */}
      <section id="stats">
        <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: "7+", label: "Projects Built" },
              { value: "2", label: "Hackathon Wins" },
              { value: "3+", label: "Internships" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-6 rounded-xl bg-zinc-900/60 border border-white/[0.06] space-y-1"
              >
                <span className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-display)] tracking-tight text-amber-50">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── About Section ─── */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-6">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-base text-muted-foreground dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      {/* ─── Work Experience ─── */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
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
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── Education ─── */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
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
        <div className="space-y-12 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Featured Projects</span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-display)]">
                  Things I&apos;ve Built
                </h2>
                <p className="text-muted-foreground text-base max-w-[600px] leading-relaxed">
                  From AI-powered applications to full-stack platforms — here
                  are some projects I&apos;m proud of.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <TiltCard tiltAmount={4}>
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                  />
                </TiltCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Achievements ─── */}
      <section id="achievements">
        <div className="space-y-12 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Achievements</span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-display)]">
                  Recognition & Awards
                </h2>
                <p className="text-muted-foreground text-base max-w-[600px] leading-relaxed">
                  Highlights from competitions and hackathons around the world.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DATA.achievements.map((achievement, id) => (
              <BlurFade
                key={achievement.title}
                delay={BLUR_FADE_DELAY * 14 + id * 0.05}
              >
                <Link
                  href={`/achievements/${achievement.slug}`}
                  className="block group"
                >
                  <div className="relative flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-zinc-900/60 p-6 transition-all duration-300 hover:border-white/15 hover:bg-zinc-900/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800 text-foreground text-xl border border-white/[0.06]">
                        {achievement.icon}
                      </div>
                      <svg 
                        className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-base leading-tight group-hover:underline decoration-1 underline-offset-4">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium pt-2">
                      {achievement.date}
                    </div>
                  </div>
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
            <SpotlightCard
              className="rounded-2xl border border-white/[0.06] bg-zinc-900/60"
              spotlightColor="rgba(251, 191, 36, 0.04)"
            >
              <div className="relative p-10 sm:p-14">
                <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
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
                          className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                        >
                          <social.icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {name}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
