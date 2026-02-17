"use client";
import React, { useState } from "react";
import { DistortionGallery } from "@/components/ui/distortion-gallery";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";

export function ProjectDistortion() {
  const [selectedProject, setSelectedProject] = useState<(typeof DATA.projects)[number] | null>(null);

  const galleryItems = DATA.projects.map((project, index) => ({
    id: project.title,
    image: project.image || "/placeholder.png",
    title: project.title,
    description: project.description,
    onClick: () => setSelectedProject(project),
  }));

  return (
    <div className="w-full h-[800px] relative">
        <DistortionGallery items={galleryItems} />

        {/* Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open: boolean) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 text-white z-[100]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
                    <DialogDescription className="text-zinc-400">{selectedProject?.dates}</DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                     {/* Media */}
                     <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                        {selectedProject?.video ? (
                            <video src={selectedProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                            <img src={selectedProject?.image || "/placeholder.png"} className="w-full h-full object-cover" alt={selectedProject?.title || "project"} />
                        )}
                     </div>

                     {/* Details */}
                     <div className="space-y-6">
                        <Markdown className="prose prose-invert text-sm text-zinc-300">
                             {selectedProject?.description}
                        </Markdown>

                        <div className="flex flex-wrap gap-2">
                             {selectedProject?.technologies.map((tech) => (
                                 <Badge key={tech} variant="outline" className="border-zinc-700 text-zinc-300">
                                     {tech}
                                 </Badge>
                             ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                             {selectedProject?.links?.map((link, idx) => (
                                 <Link 
                                    key={idx} 
                                    href={link.href} 
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-sm font-medium"
                                 >
                                     {link.icon}
                                     {link.type}
                                 </Link>
                             ))}
                              {selectedProject?.href && (
                                   <Link 
                                     href={selectedProject.href}
                                     target="_blank"
                                     className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-bold"
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
