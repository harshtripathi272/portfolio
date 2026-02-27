"use client";

import React, { useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";
import { ProjectCard3D } from "@/components/ui/project-card-3d";

export function ProjectCarousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof DATA.projects)[number] | null>(null);

  return (
    <div className="w-full relative py-6">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none py-8 px-6 md:px-12 items-center gap-6 md:gap-8"
        style={{ scrollBehavior: "smooth" }}
      >
        {DATA.projects.map((project, index) => (
          <div key={project.title} className="snap-start shrink-0 group" style={{ perspective: "1000px" }}>
            <ProjectCardWrapper
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="text-center mt-4 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
          Scroll to explore →
        </span>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open: boolean) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-neutral-950/95 backdrop-blur-2xl border border-white/[0.08] text-white z-[100] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-[family-name:var(--font-display)]">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-neutral-500">
              {selectedProject?.dates}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Media */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] bg-neutral-900">
              {selectedProject?.video ? (
                <video src={selectedProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={selectedProject?.image || "/placeholder.png"} className="w-full h-full object-cover" alt={selectedProject?.title || "project"} />
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 flex flex-col h-full">
              <Markdown className="prose prose-invert text-sm sm:text-base text-neutral-400 leading-relaxed prose-p:text-neutral-400">
                {selectedProject?.description}
              </Markdown>

              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06] text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto pt-6 flex flex-wrap gap-3 border-t border-white/[0.04]">
                {selectedProject?.links?.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 text-sm font-medium text-neutral-300 hover:text-white"
                  >
                    {link.icon}
                    <span>{link.type}</span>
                  </Link>
                ))}
                {selectedProject?.href && !selectedProject?.links?.some(l => l.href === selectedProject.href) && (
                  <Link
                    href={selectedProject.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all text-sm font-semibold"
                  >
                    Visit Live <MoveRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectCardWrapper({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  return (
    <ProjectCard3D
      index={index}
      image={project.image || "/placeholder.png"}
      video={project.video}
      title={project.title}
      description={project.description}
      onClick={onClick}
    />
  );
}
