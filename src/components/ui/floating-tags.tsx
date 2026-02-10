"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "./badge";

interface FloatingTagsProps {
  tags: string[];
  maxTags?: number;
}

export function FloatingTags({ tags, maxTags = 12 }: FloatingTagsProps) {
  const displayTags = tags.slice(0, maxTags);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <div className="absolute inset-0 flex flex-wrap gap-2 justify-center items-center p-4">
        {displayTags.map((tag, index) => {
          const delay = index * 0.1;
          const duration = 3 + Math.random() * 2;
          const yOffset = (Math.random() - 0.5) * 20;
          
          return (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [yOffset, yOffset - 10, yOffset],
              }}
              transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5, type: "spring" },
                y: {
                  delay: delay + 0.5,
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Badge
                className="px-3 py-1.5 text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-white/[0.08] hover:border-amber-500/30 hover:text-foreground transition-all duration-200 cursor-default backdrop-blur-sm"
              >
                {tag}
              </Badge>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
