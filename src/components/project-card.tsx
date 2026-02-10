import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card
      className={
        "group relative flex flex-col overflow-hidden border border-border/40 bg-card/50 backdrop-blur-xl h-full transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_8px_40px_-12px_rgba(168,85,247,0.25)] hover:-translate-y-1.5"
      }
    >
      {/* Shimmer border effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 20%, rgba(168,85,247,0.1) 40%, rgba(99,102,241,0.1) 60%, transparent 80%)",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer relative", className)}
      >
        {video && (
          <div className="relative overflow-hidden">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-44 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>
        )}
        {image && (
          <div className="relative overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-44 w-full overflow-hidden object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>
        )}
      </Link>
      <CardHeader className="px-5 pt-5 relative">
        <div className="space-y-2">
          <CardTitle className="mt-1 text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-purple-300">
            {title}
          </CardTitle>
          <time className="font-sans text-[11px] text-muted-foreground/70 uppercase tracking-wider">
            {dates}
          </time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-3 leading-relaxed">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-5 relative">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge
                className="px-2 py-0.5 text-[10px] font-medium bg-purple-500/8 text-purple-300/80 border border-purple-500/15 hover:bg-purple-500/15 hover:text-purple-300 hover:border-purple-500/30 transition-all duration-300"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-5 pb-5 relative">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-1.5 px-3 py-1 text-[10px] font-medium bg-white/10 hover:bg-purple-500/20 hover:text-purple-200 border border-white/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
