"use client";

import React, { useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";
import { ProjectCard3D } from "@/components/ui/project-card-3d";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof DATA.projects)[number] | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = gsap.utils.toArray(containerRef.current.children);
    
    // Calculate total scroll distance based on the width of all cards
    // minus the viewport width plus some padding
    let totalWidth = 0;
    (cards as HTMLElement[]).forEach((card) => {
      totalWidth += card.offsetWidth;
    });
    // Add gap widths (approximate 2rem / 32px per gap)
    totalWidth += (cards.length - 1) * 32;

    const scrollAmount = totalWidth - window.innerWidth + (window.innerWidth * 0.2); 

    gsap.to(containerRef.current, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        // The distance we enforce scrolling to correspond with the horizontal movement
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
      }
    });

  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="relative z-20 py-32 border-t border-white/[0.04] bg-[#050505] overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6 mb-16 w-full">
        <ScrollReveal>
          <span className="eyebrow mb-5">Portfolio</span>
          <h2 className="mt-5 text-5xl md:text-8xl font-black tracking-tighter font-[family-name:var(--font-display)] text-white/10 uppercase">
            Featured<br/><span className="text-accent-gradient">Selected Works</span>
          </h2>
        </ScrollReveal>
      </div>
      
      {/* Horizontal GSAP slider */}
      <div className="relative w-full overflow-visible flex items-center">
        <div ref={containerRef} className="flex items-center gap-8 px-[5vw] transition-none w-max">
          {DATA.projects.map((project, index) => (
            <div key={project.title} style={{ perspective: "1000px" }} className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] shrink-0">
              <ProjectCard3D
                index={index}
                image={project.image || "/placeholder.png"}
                video={project.video}
                title={project.title}
                description={project.description}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
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
                {selectedProject?.description || ""}
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
    </section>
  );
}
