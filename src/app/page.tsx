import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* ─── Hero Section ─── */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-4 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-4">
              {/* Availability Badge */}
              <BlurFade delay={BLUR_FADE_DELAY * 0.5}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400/90 uppercase tracking-wider">
                    Available for work
                  </span>
                </div>
              </BlurFade>
              
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-[family-name:var(--font-display)]"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <p className="max-w-[540px] text-base md:text-lg text-muted-foreground leading-relaxed">
                  {DATA.description}
                </p>
              </BlurFade>

              {/* Inline Social Links */}
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex items-center gap-3 pt-1">
                  {Object.entries(DATA.contact.social)
                    .filter(([_, social]) => social.navbar)
                    .map(([name, social]) => (
                      <Link
                        key={name}
                        href={social.url}
                        target="_blank"
                        className="group/social relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300"
                      >
                        <social.icon className="size-4 text-muted-foreground group-hover/social:text-purple-400 transition-colors duration-300" />
                      </Link>
                    ))}
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="relative group">
                {/* Animated glow ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600/50 via-indigo-600/50 to-blue-600/50 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-700" />
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <Avatar className="size-28 sm:size-32 border-2 border-background relative">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section id="stats">
        <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { value: "7+", label: "Projects Built" },
              { value: "2", label: "Hackathon Wins" },
              { value: "3+", label: "Internships" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="relative group/stat flex flex-col items-center justify-center py-5 sm:py-6 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-purple-500/30 hover:bg-card/50 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                <span className="relative text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] gradient-text-hero">
                  {stat.value}
                </span>
                <span className="relative text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      <div className="section-divider" />

      {/* ─── About Section ─── */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="section-heading mb-4">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <div className="section-divider" />

      {/* ─── Work Experience ─── */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="section-heading mb-2">Work Experience</h2>
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

      <div className="section-divider" />

      {/* ─── Education ─── */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="section-heading mb-2">Education</h2>
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

      <div className="section-divider" />

      {/* ─── Skills ─── */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="section-heading mb-1">Skills & Technologies</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3.5 py-1.5 text-xs font-medium bg-white/5 border border-white/10 hover:bg-purple-500/15 hover:text-purple-300 hover:border-purple-500/30 transition-all duration-300 cursor-default backdrop-blur-sm"
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── Projects ─── */}
      <section id="projects">
        <div className="space-y-12 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <span className="section-heading">Featured Projects</span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mt-2 font-[family-name:var(--font-display)]">
                  Things I&apos;ve <span className="gradient-text-hero">Built</span>
                </h2>
                <p className="text-muted-foreground md:text-lg max-w-[600px] mx-auto leading-relaxed">
                  From AI-powered applications to full-stack platforms — here
                  are some projects I&apos;m proud of.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
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
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── Achievements ─── */}
      <section id="achievements">
        <div className="space-y-12 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <span className="section-heading">Achievements</span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mt-2 font-[family-name:var(--font-display)]">
                  Recognition & <span className="gradient-text-hero">Awards</span>
                </h2>
                <p className="text-muted-foreground md:text-lg max-w-[600px] mx-auto leading-relaxed">
                  Highlights from competitions and hackathons around the world.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.achievements.map((achievement, id) => (
              <BlurFade
                key={achievement.title}
                delay={BLUR_FADE_DELAY * 14 + id * 0.05}
              >
                <Link
                  href={`/achievements/${achievement.slug}`}
                  className="block group"
                >
                  <div className="relative flex flex-col gap-4 rounded-xl border border-border/30 bg-card/40 backdrop-blur-xl p-6 text-card-foreground transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_8px_40px_-12px_rgba(168,85,247,0.2)] hover:-translate-y-1.5 overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 transition-all duration-500 group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_-4px_rgba(168,85,247,0.2)]">
                        <span className="text-2xl transition-transform duration-500 group-hover:scale-110">
                          {achievement.icon}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-sm leading-tight transition-colors duration-300 group-hover:text-purple-300">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between text-[11px] text-muted-foreground/60 uppercase tracking-wider">
                      <span>{achievement.date}</span>
                      <span className="inline-flex items-center gap-1 transition-colors duration-300 group-hover:text-purple-400">
                        View details
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <div className="section-divider" />

      {/* ─── Contact ─── */}
      <section id="contact">
        <div className="w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/30 backdrop-blur-xl p-8 sm:p-12">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              
              <div className="relative flex flex-col items-center text-center space-y-6">
                <span className="section-heading">Contact</span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-[family-name:var(--font-display)]">
                  Let&apos;s <span className="gradient-text-hero">Connect</span>
                </h2>
                <p className="mx-auto max-w-[500px] text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Want to chat? Just shoot me a dm{" "}
                  <Link
                    href={DATA.contact.social.LinkedIn.url}
                    className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4 decoration-purple-400/30 hover:decoration-purple-300/50"
                  >
                    with a direct question on LinkedIn
                  </Link>{" "}
                  and I&apos;ll respond whenever I can.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  {Object.entries(DATA.contact.social)
                    .filter(([_, social]) => social.navbar)
                    .map(([name, social]) => (
                      <Link
                        key={name}
                        href={social.url}
                        target="_blank"
                        className="group/contact flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300"
                      >
                        <social.icon className="size-4 text-muted-foreground group-hover/contact:text-purple-400 transition-colors duration-300" />
                        <span className="text-xs font-medium text-muted-foreground group-hover/contact:text-purple-300 transition-colors duration-300">
                          {name}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
