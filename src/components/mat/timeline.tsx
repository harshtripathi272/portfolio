"use client";

import { motion } from "framer-motion";
import { experiences, educationList } from "@/data/portfolio";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

export function Timeline() {
  return (
    <section id="experience" className="mat-section">
      <header className="mat-heading">
        <h2 className="mat-h2">Experience &amp; education</h2>
        <span className="mat-heading-icon">🧵</span>
      </header>

      <div className="timeline">
        {experiences.map((exp) => (
          <motion.div key={exp.id} className="tl-row" {...reveal}>
            <div className="tl-badge">{exp.initials}</div>
            <div className="tl-body">
              <div className="tl-org">
                {exp.link && exp.link !== "#" ? (
                  <a href={exp.link} target="_blank" rel="noreferrer noopener">
                    {exp.organisation}
                  </a>
                ) : (
                  exp.organisation
                )}
              </div>
              {exp.positions.map((p, i) => (
                <div key={i} className="tl-pos">
                  <div className="tl-pos-head">
                    <span className="tl-title">{p.title}</span>
                    <span className="tl-duration">{p.duration}</span>
                  </div>
                  <ul className="tl-content">
                    {p.content.map((c, j) => (
                      <li key={j}>
                        {c.link ? (
                          <a href={c.link} target="_blank" rel="noreferrer noopener" className="ink-link">
                            {c.text}
                          </a>
                        ) : (
                          c.text
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {educationList.map((ed) => (
          <motion.div key={ed.id} className="tl-row" {...reveal}>
            <div className="tl-badge tl-badge-edu">{ed.icon}</div>
            <div className="tl-body">
              <div className="tl-org">
                {ed.link ? (
                  <a href={ed.link} target="_blank" rel="noreferrer noopener">
                    {ed.title}
                  </a>
                ) : (
                  ed.title
                )}
              </div>
              <div className="tl-pos">
                <div className="tl-pos-head">
                  <span className="tl-title">{ed.degree}</span>
                  <span className="tl-duration">{ed.duration}</span>
                </div>
                <ul className="tl-content">
                  {ed.content.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
