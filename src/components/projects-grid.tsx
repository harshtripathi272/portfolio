"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import Markdown from "react-markdown";

type Project = (typeof DATA.projects)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

const normalize = (src: string) =>
  !src ? src : src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;

export function ProjectsGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="project-grid">
        {DATA.projects.map((project, index) => {
          const video = normalize(project.video || "");
          const image = normalize(project.image || "");
          const isLive = project.links?.some((l) => l.type === "Live") || project.href?.startsWith("http");

          return (
            <motion.button
              key={project.title}
              className="project-card"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: EASE }}
              whileHover={{ y: -4 }}
            >
              <div className="project-card-img">
                {project.video ? (
                  <video src={video} autoPlay loop muted playsInline />
                ) : project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={project.title} />
                ) : (
                  <span className="ph">{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>
              <div className="project-card-body">
                <div className="project-card-head">
                  <h3>{project.title}</h3>
                  {isLive && (
                    <span className="project-status status-live">
                      <span className="status-dot" /> Live
                    </span>
                  )}
                </div>
                <p>{(project.description || "").replace(/[*_#`]/g, "").slice(0, 110)}…</p>
                <div className="project-card-tags">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent
          className="z-[100] max-h-[90vh] max-w-3xl overflow-y-auto rounded-xl border"
          style={{
            background: "var(--panel)",
            color: "var(--text)",
            borderColor: "var(--line-strong)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-mono text-2xl">{selected?.title}</DialogTitle>
            <DialogDescription style={{ color: "var(--muted)" }}>{selected?.dates}</DialogDescription>
          </DialogHeader>

          {(selected?.video || selected?.image) && (
            <div className="relative mt-2 aspect-video overflow-hidden rounded-lg border" style={{ borderColor: "var(--line)" }}>
              {selected?.video ? (
                <video src={normalize(selected.video)} autoPlay loop muted playsInline className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={normalize(selected?.image || "")} alt={selected?.title || ""} className="h-full w-full object-cover" />
              )}
            </div>
          )}

          <div className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            <Markdown>{selected?.description || ""}</Markdown>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selected?.technologies.map((t) => (
              <span key={t} className="stack-pill">{t}</span>
            ))}
          </div>

          {selected?.links && selected.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 border-t pt-5" style={{ borderColor: "var(--line)" }}>
              {selected.links.map((link, i) => (
                <Link key={i} href={link.href} target="_blank" className="social-btn">
                  {link.icon}
                  {link.type}
                </Link>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
