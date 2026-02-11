"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <CardContainer className={cn("inter-var h-full", className)}>
      <CardBody className="bg-zinc-900/40 relative group/card dark:hover:shadow-2xl dark:hover:shadow-amber-500/[0.1] dark:bg-black dark:border-white/[0.1] border-black/[0.1] w-full h-full rounded-xl p-6 border transition-all duration-300 flex flex-col">
        
        {/* Image / Video - Top */}
        <CardItem translateZ="50" className="w-full mb-6">
          <Link href={href || "#"} target="_blank" className="block w-full cursor-pointer">
             <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-white/10 group-hover/card:shadow-xl transition-shadow">
              {video && (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover rounded-xl"
                />
              )}
              {image && (
                <Image
                  src={image}
                  fill
                  className="object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              )}
             </div>
          </Link>
        </CardItem>
        
        {/* Title & Dates */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <CardItem
            translateZ="60"
            className="text-xl font-bold text-neutral-600 dark:text-white leading-tight"
          >
            {title}
          </CardItem>
          <CardItem
            translateZ="50"
            className="shrink-0 px-2 py-1 rounded-md bg-zinc-800 dark:bg-zinc-900 text-xs text-zinc-400 border border-zinc-700/50 whitespace-nowrap"
          >
            {dates}
          </CardItem>
        </div>

        {/* Description */}
        <CardItem
          as="div"
          translateZ="40"
          className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 line-clamp-3 min-h-[4.5rem]"
        >
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </CardItem>

        {/* Tags & Links - Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto pt-6 gap-4">
          <CardItem translateZ="30" className="flex flex-wrap gap-2">
            {tags?.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-300 border-zinc-700"
              >
                {tag}
              </Badge>
            ))}
            {tags && tags.length > 3 && (
               <Badge variant="secondary" className="px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 border-zinc-700">+{tags.length - 3}</Badge>
            )}
          </CardItem>
          
          <div className="flex gap-2 w-full sm:w-auto">
            {links?.map((link, idx) => (
              <CardItem
                key={idx}
                translateZ={30 + idx * 5}
                as={Link}
                href={link.href}
                target="_blank"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800 text-black dark:text-white text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1 flex-1 sm:flex-none"
              >
                {link.icon}
                <span className="inline">{link.type}</span>
              </CardItem>
            ))}
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
