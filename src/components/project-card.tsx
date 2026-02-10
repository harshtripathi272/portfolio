"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for magnetic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.05);
    mouseY.set((e.clientY - centerY) * 0.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80",
        "backdrop-blur-xl border border-white/[0.08]",
        "transition-all duration-700 ease-out",
        "hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10",
        className
      )}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)",
        }}
        animate={{
          background: isHovered
            ? "radial-gradient(circle at 70% 70%, rgba(245, 158, 11, 0.12) 0%, transparent 60%)"
            : "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Corner light beam */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
          x,
          y,
        }}
      />

      <Link href={href || "#"} className="block">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-zinc-800/50">
          {/* Image blur overlay */}
          <motion.div
            className="absolute inset-0 z-10 backdrop-blur-sm bg-black/20"
            animate={{
              opacity: isHovered ? 0 : 1,
              backdropFilter: isHovered ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-80" />

          {video && (
            <motion.video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? "brightness(1.1)" : "brightness(0.9)",
              }}
              transition={{ duration: 0.7 }}
            />
          )}
          {image && (
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? "brightness(1.1)" : "brightness(0.9)",
              }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Date badge with glassmorphism */}
          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-3 py-1.5 text-xs font-semibold bg-black/40 text-white border border-white/20 backdrop-blur-xl rounded-full shadow-lg">
              {dates}
            </div>
          </motion.div>
        </div>

        {/* Content Area - Expandable */}
        <motion.div
          className="relative p-6 space-y-4"
          animate={{
            height: isHovered ? "auto" : "160px",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-amber-50 transition-colors duration-300"
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0.7, height: "3rem" }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              height: isHovered ? "auto" : "3rem",
            }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
              {description}
            </Markdown>
          </motion.div>

          {/* Tags - Float up on hover */}
          <motion.div
            className="flex flex-wrap gap-2 pt-2"
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          >
            {tags?.slice(0, 6).map((tag, idx) => (
              <motion.div
                key={tag}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: idx * 0.05, duration: 0.3 },
                  },
                }}
              >
                <Badge className="px-3 py-1 text-xs bg-zinc-800/60 text-zinc-400 border border-white/[0.08] hover:border-amber-500/40 hover:text-amber-400 hover:bg-zinc-800 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 rounded-lg">
                  {tag}
                </Badge>
              </motion.div>
            ))}
            {tags.length > 6 && (
              <Badge className="px-3 py-1 text-xs bg-zinc-800/60 text-zinc-400 border border-white/[0.08] rounded-lg">
                +{tags.length - 6}
              </Badge>
            )}
          </motion.div>

          {/* Links - Appear on hover */}
          {links && links.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 pt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {links.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  target="_blank"
                  className="group/link relative overflow-hidden"
                >
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 rounded-full backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.icon}
                    </motion.span>
                    {link.type}
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Link>

      {/* Shine effect on edge */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)",
        }}
        animate={{
          x: isHovered ? ["0%", "100%"] : "0%",
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
