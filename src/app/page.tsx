export const dynamic = "force-dynamic";

import { DATA } from "@/data/resume";
import { ExperienceAccordion } from "@/components/experience-accordion";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { HeroIntro } from "@/components/hero-intro";
import { WhoamiSection } from "@/components/whoami-section";

export default function Page() {
  return (
    <div>
      {/* ── Hero band ── */}
      <section className="hero-band">
        <div className="mesh-bg" />
        <div className="dot-field" />
      </section>

      {/* ── Profile row (animated) ── */}
      <HeroIntro />

      {/* ── About ── */}
      <section id="about" className="content-section">
        <Reveal>
          <h2 className="section-title">
            About<span className="accent">.</span>
          </h2>
        </Reveal>
        <Stagger className="about-list" once>
          <StaggerItem>
            <li>{DATA.summary}</li>
          </StaggerItem>
          <StaggerItem>
            <li>
              Currently focused on machine learning, edge deployment, and building
              real-world tools that ship.
            </li>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ── Connect ── */}
      <section id="connect" className="content-section">
        <Reveal>
          <h2 className="section-title">
            Connect<span className="accent">.</span>
          </h2>
        </Reveal>
        <Stagger className="link-grid">
          {Object.entries(DATA.contact.social)
            .filter(([, s]) => s.navbar)
            .map(([name, s]) => (
              <StaggerItem key={name}>
                <a href={s.url} target="_blank" rel="noreferrer" className="social-btn">
                  <s.icon />
                  {name}
                </a>
              </StaggerItem>
            ))}
        </Stagger>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="content-section">
        <Reveal>
          <h2 className="section-title">
            Stack<span className="accent">.</span>
          </h2>
        </Reveal>
        <Stagger className="stack-grid">
          {DATA.skills.map((skill) => (
            <StaggerItem key={skill}>
              <span className="stack-pill">{skill}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Experience + Education ── */}
      <section id="work" className="content-section">
        <Reveal>
          <span className="featured-label">Featured</span>
          <h2 className="section-title">
            Experience<span className="accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="exp-org">
            <span className="exp-dot" /> Work
          </div>
          <ExperienceAccordion
            items={DATA.work.map((w) => ({
              logoUrl: w.logoUrl,
              title: w.company,
              subtitle: w.title,
              period: `${w.start} - ${w.end ?? "Present"}`,
              description: w.description,
              tags: [...w.badges],
            }))}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="exp-org mt-6">
            <span className="exp-dot" /> Education
          </div>
          <ExperienceAccordion
            items={DATA.education.map((e) => ({
              logoUrl: e.logoUrl,
              title: e.school,
              subtitle: e.degree,
              period: `${e.start} - ${e.end}`,
            }))}
          />
        </Reveal>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="content-section">
        <Reveal>
          <span className="featured-label">Featured</span>
          <h2 className="section-title">
            Projects<span className="accent">.</span>
          </h2>
        </Reveal>
        <ProjectsGrid />
      </section>

      {/* ── whoami terminal ── */}
      <WhoamiSection />

      {/* ── Quote band ── */}
      <section className="quote-band">
        <Reveal>
          <div className="quote-mark">&rdquo;</div>
          <blockquote>
            Build intelligent, real-world solutions that make an impact — from the
            model to the metal.
          </blockquote>
          <div className="quote-author">
            <span className="bar" /> {DATA.name}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <Reveal>
          <h2>Let&apos;s build something.</h2>
          <p className="cta-text">Have a project in mind or just want to say hi?</p>
          <a href={DATA.contact.social.email.url} className="cta-button">
            Get in touch →
          </a>
        </Reveal>
      </section>
    </div>
  );
}
