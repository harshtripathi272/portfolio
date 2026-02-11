"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";

export function ProjectCarousel() {
  const cards = DATA.projects.map((project, index) => (
    <Card key={project.image || project.title} card={{
        src: project.image || "/placeholder.png",
        title: project.title,
        category: project.dates,
        content: (
            <div className="flex flex-col gap-6 font-sans">
              <Markdown className="prose max-w-full text-base text-muted-foreground dark:prose-invert">
                {project.description}
              </Markdown>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700">
                    {tech}
                  </Badge>
                ))}
              </div>
      
              <div className="flex flex-wrap gap-4 mt-4">
                {project.links?.map((link, idx) => (
                   <Link 
                     key={idx} 
                     href={link.href} 
                     target="_blank"
                     className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                   >
                      {link.icon}
                      {link.type}
                   </Link>
                ))}
                 {project.href && !project.links?.some(l => l.href === project.href) && (
                   <Link 
                     href={project.href} 
                     target="_blank"
                     className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                   >
                      Visit Project <MoveRight className="w-4 h-4" />
                   </Link>
                )}
              </div>
            </div>
        )
    }} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
}
