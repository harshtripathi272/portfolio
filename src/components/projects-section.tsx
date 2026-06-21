"use client";

import React, { useState } from "react";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof DATA.projects)[number] | null>(null);

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="03" eyebrow="Selected Work" title="Things I've built" />

        {/* Editorial index list */}
        <div className="mt-16 border-t border-foreground/15">
          {DATA.projects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <ScrollReveal key={project.title} delay={0.04 * index}>
                <button
                  onClick={() => setSelectedProject(project)}
                  data-interactive
                  className="group flex w-full items-center gap-5 border-b border-foreground/15 py-7 text-left transition-colors duration-300 hover:bg-foreground/[0.03] md:gap-10 md:py-9"
                >
                  <span className="font-[family-name:var(--font-display)] text-sm font-medium tabular-nums text-foreground/40 md:text-base">
                    {num}
                  </span>

                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-serif text-2xl font-light leading-tight tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:italic md:text-5xl">
                      {project.title}
                    </h3>
                  </div>

                  <div className="hidden max-w-[180px] flex-wrap justify-end gap-1.5 lg:flex">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="whitespace-nowrap rounded-full border border-foreground/15 px-2.5 py-0.5 text-[11px] font-medium text-foreground/55"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="shrink-0 text-xs font-medium tabular-nums text-foreground/45 md:text-sm">
                    {project.dates}
                  </span>

                  <span className="shrink-0 text-2xl text-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]">
                    ↗
                  </span>
                </button>
              </ScrollReveal>
            );
          })}
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
            {/* Media */}
            {(selectedProject?.video || selectedProject?.image) && (
              <div className="relative aspect-video overflow-hidden rounded-md border border-foreground/15 bg-foreground/5">
                {selectedProject?.video ? (
                  <video src={selectedProject.video} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={selectedProject?.image || "/placeholder.png"} className="h-full w-full object-cover" alt={selectedProject?.title || "project"} />
                )}
              </div>
            )}

            {/* Details */}
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
