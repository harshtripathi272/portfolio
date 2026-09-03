"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";

function ProjectCard({ p }: { p: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onEnter = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <motion.article
      className="pin-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="polaroid-pin" aria-hidden />

      <div className="pin-media" style={{ background: p.tint ?? "#274a3a" }}>
        {p.video ? (
          <video
            ref={videoRef}
            className="pin-video"
            src={`/${p.video}`}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <span className="pin-media-mark">{p.title.charAt(0)}</span>
        )}
        {p.highlight && <span className="pin-flag">{p.highlight}</span>}
      </div>

      <div className="pin-body">
        <div className="pin-title-row">
          <h3 className="pin-title">{p.title}</h3>
          <span className="pin-links">
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer noopener" aria-label="Live">
                <ExternalLink className="size-4" />
              </a>
            )}
            {p.youtube && (
              <a href={p.youtube} target="_blank" rel="noreferrer noopener" aria-label="Demo">
                <Youtube className="size-4" />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
                <Github className="size-4" />
              </a>
            )}
          </span>
        </div>
        <p className="pin-content">{p.content}</p>
        <div className="pin-stack">
          {p.stack.map((s) => (
            <span key={s.name} className="pin-chip">
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mat-section">
      <header className="mat-heading">
        <h2 className="mat-h2">Projects pinned up</h2>
        <span className="mat-heading-icon">📌</span>
      </header>

      <div className="pin-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
