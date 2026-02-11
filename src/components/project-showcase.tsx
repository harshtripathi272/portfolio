"use client";

import { DATA } from "@/data/resume";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";

export function ProjectShowcase() {
  const content = DATA.projects.map((project) => ({
    title: project.title,
    description: (
      <div className="flex flex-col gap-4">
        <Markdown className="prose max-w-full text-base text-muted-foreground dark:prose-invert">
          {project.description}
        </Markdown>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="px-2 py-1 bg-zinc-800 text-zinc-300 border-zinc-700">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {project.links?.map((link, idx) => (
             <Link 
               key={idx} 
               href={link.href} 
               target="_blank"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors"
             >
                {link.icon}
                {link.type}
             </Link>
          ))}
          {project.href && !project.links?.some(l => l.href === project.href) && (
             <Link 
               href={project.href} 
               target="_blank"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-white text-sm font-bold hover:bg-zinc-700 transition-colors"
             >
                View Project <MoveRight className="w-4 h-4" />
             </Link>
          )}
        </div>
      </div>
    ),
    content: (
       <div className="h-full w-full flex items-center justify-center p-2 sm:p-4 md:p-10">
          <Link href={project.href || "#"} target="_blank" className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 block group">
            {project.video ? (
               <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
            ) : (
               <Image
                 src={project.image || ""}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                 alt={project.title}
               />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
       </div>
    ),
  }));

  return (
    <div className="relative">
      <StickyScroll content={content} contentClassName="bg-transparent" />
    </div>
  );
}
