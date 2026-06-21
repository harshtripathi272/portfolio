"use client";

import React, { useState } from "react";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";

type Project = (typeof DATA.projects)[number];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="03" eyebrow="Selected Work" title="Things I've built" />

        {/* Card grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DATA.projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={0.05 * (index % 3)}>
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open: boolean) => !open && setSelectedProject(null)}>
        <DialogContent className="z-[100] max-h-[90vh] max-w-4xl overflow-y-auto border border-foreground/15 bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-light">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-foreground/55">
              {selectedProject?.dates}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
            {(selectedProject?.video || selectedProject?.image) && (
              <div className="relative aspect-video overflow-hidden rounded-md border border-foreground/15 bg-foreground/5">
                {selectedProject?.video ? (
                  <video src={selectedProject.video.startsWith("http") || selectedProject.video.startsWith("/") ? selectedProject.video : `/${selectedProject.video}`} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={selectedProject?.image || "/placeholder.png"} className="h-full w-full object-cover" alt={selectedProject?.title || "project"} />
                )}
              </div>
            )}

            <div className={selectedProject?.video || selectedProject?.image ? "flex h-full flex-col space-y-6" : "flex h-full flex-col space-y-6 md:col-span-2"}>
              <Markdown className="prose prose-sm max-w-none leading-relaxed text-foreground/70">
                {selectedProject?.description || ""}
              </Markdown>

              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-xs text-foreground/60">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-3 border-t border-foreground/15 pt-6">
                {selectedProject?.links?.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    {link.icon}
                    <span>{link.type}</span>
                  </Link>
                ))}
                {selectedProject?.href && selectedProject.href !== "#" && !selectedProject?.links?.some((l) => l.href === selectedProject.href) && (
                  <Link
                    href={selectedProject.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                  >
                    Visit Live <MoveRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const normalize = (src: string) =>
    !src ? src : src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;
  const videoSrc = normalize(project.video || "");
  const imageSrc = normalize(project.image || "");

  return (
    <button
      onClick={onClick}
      data-interactive
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-foreground/15 bg-background text-left transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]"
    >
      {/* Media / placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/10 bg-foreground/[0.04]">
        {project.video ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-7xl font-light text-foreground/10 transition-colors duration-500 group-hover:text-[hsl(var(--accent))]/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* corner arrow */}
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground/60 backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:border-foreground group-hover:text-foreground">
          ↗
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow !tracking-[0.2em]">
            <span className="accent">{String(index + 1).padStart(2, "0")}</span>
          </span>
          <span className="text-xs font-medium tabular-nums text-foreground/45">
            {project.dates}
          </span>
        </div>

        <h3 className="font-serif text-2xl font-light leading-tight tracking-tight transition-colors duration-300 group-hover:text-[hsl(var(--accent))]">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/60">
          {project.description.replace(/[*_#`]/g, "")}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-[11px] font-medium text-foreground/55"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full px-2 py-0.5 text-[11px] font-medium text-foreground/40">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
