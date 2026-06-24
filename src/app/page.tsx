export const dynamic = "force-dynamic";

import { DATA } from "@/data/resume";
import { ExperienceAccordion } from "@/components/experience-accordion";
import { ProjectsGrid } from "@/components/projects-grid";
import { MapPinIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="page-fade">
      {/* ── Hero band ── */}
      <section className="hero-band">
        <div className="mesh-bg" />
        <div className="dot-field" />
      </section>

      {/* ── Profile row ── */}
      <section className="profile-row">
        <div className="avatar-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/me-circle.png" alt={DATA.name} />
        </div>
        <div>
          <span className="status-badge">
            <span className="dot" /> Available for work
          </span>
          <h1 className="profile-name">{DATA.name}</h1>
          <p className="role-text">{DATA.description}</p>
          <span className="location-badge">
            <MapPinIcon className="size-4 opacity-60" /> {DATA.location}
          </span>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="content-section">
        <h2 className="section-title">
          About<span className="accent">.</span>
        </h2>
        <ul className="about-list">
          <li>{DATA.summary}</li>
          <li>
            Currently focused on machine learning, edge deployment, and building
            real-world tools that ship.
          </li>
        </ul>
      </section>

      {/* ── Connect ── */}
      <section id="connect" className="content-section">
        <h2 className="section-title">
          Connect<span className="accent">.</span>
        </h2>
        <div className="link-grid">
          {Object.entries(DATA.contact.social)
            .filter(([, s]) => s.navbar)
            .map(([name, s]) => (
              <a key={name} href={s.url} target="_blank" rel="noreferrer" className="social-btn">
                <s.icon />
                {name}
              </a>
            ))}
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="content-section">
        <h2 className="section-title">
          Stack<span className="accent">.</span>
        </h2>
        <div className="stack-grid">
          {DATA.skills.map((skill) => (
            <span key={skill} className="stack-pill">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ── Experience + Education ── */}
      <section id="work" className="content-section">
        <h2 className="section-title">
          Experience<span className="accent">.</span>
        </h2>
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
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="content-section">
        <h2 className="section-title">
          Projects<span className="accent">.</span>
        </h2>
        <ProjectsGrid />
      </section>

      {/* ── Quote band ── */}
      <section className="quote-band">
        <div className="quote-mark">&rdquo;</div>
        <blockquote>
          Build intelligent, real-world solutions that make an impact — from the
          model to the metal.
        </blockquote>
        <div className="quote-author">
          <span className="bar" /> {DATA.name}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2>Let&apos;s build something.</h2>
        <p className="cta-text">Have a project in mind or just want to say hi?</p>
        <a href={DATA.contact.social.email.url} className="cta-button">
          Get in touch →
        </a>
      </section>
    </div>
  );
}
