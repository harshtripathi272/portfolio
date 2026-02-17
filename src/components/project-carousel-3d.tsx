"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";
import { ProjectCard3D } from "@/components/ui/project-card-3d";

export function ProjectCarousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  
  const [selectedProject, setSelectedProject] = useState<(typeof DATA.projects)[number] | null>(null);

  // Background parallax elements (optional, simple divs)
  // const bgX = useTransform(scrollXProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="w-full relative py-10 perspective-1000">
        
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none py-10 px-[10vw] md:px-[25vw] items-center gap-8 md:gap-12"
        style={{ scrollBehavior: "smooth" }}
      >
        {DATA.projects.map((project, index) => (
            <div key={project.title} className="snap-center shrink-0 perspective-1000 group">
                <ProjectCardWrapper 
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                />
            </div>
        ))}
      </div>
      
      {/* Overlay UI - Instructions */}
      <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none fade-in">
         <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 bg-zinc-900/50 backdrop-blur px-3 py-1 rounded-full border border-zinc-800">
            Swipe to Explore
         </span>
      </div>

       {/* Detail Modal */}
       <Dialog open={!!selectedProject} onOpenChange={(open: boolean) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-4xl bg-zinc-950/90 backdrop-blur-xl border-zinc-800 text-white z-[100] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold font-[family-name:var(--font-display)]">{selectedProject?.title}</DialogTitle>
                    <DialogDescription className="text-zinc-400">{selectedProject?.dates}</DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                     {/* Media */}
                     <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                        {selectedProject?.video ? (
                            <video src={selectedProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                            <img src={selectedProject?.image || "/placeholder.png"} className="w-full h-full object-cover" alt={selectedProject?.title || "project"} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                     </div>

                     {/* Details */}
                     <div className="space-y-6 flex flex-col h-full">
                        <Markdown className="prose prose-invert text-sm sm:text-base text-zinc-300 leading-relaxed">
                             {selectedProject?.description}
                        </Markdown>

                        <div className="flex flex-wrap gap-2">
                             {selectedProject?.technologies.map((tech) => (
                                 <Badge key={tech} variant="outline" className="border-zinc-700 bg-zinc-800/50 text-amber-200/80 hover:bg-zinc-800 hover:text-amber-200">
                                     {tech}
                                 </Badge>
                             ))}
                        </div>

                        <div className="mt-auto pt-6 flex flex-wrap gap-4 border-t border-white/5">
                             {selectedProject?.links?.map((link, idx) => (
                                 <Link 
                                    key={idx} 
                                    href={link.href} 
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-800 transition-all duration-300 text-sm font-medium group"
                                 >
                                     {link.icon}
                                     <span className="group-hover:text-white transition-colors">{link.type}</span>
                                 </Link>
                             ))}
                              {selectedProject?.href && !selectedProject?.links?.some(l => l.href === selectedProject.href) && (
                                   <Link 
                                     href={selectedProject.href}
                                     target="_blank"
                                     className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-all shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.6)] text-sm font-bold"
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

function ProjectCardWrapper({ project, index, onClick }: { project: any, index: number, onClick: () => void }) {
    return (
        <ProjectCard3D
            index={index}
            image={project.image || "/placeholder.png"}
            title={project.title}
            description={project.description}
            onClick={onClick}
        />
    );
}
