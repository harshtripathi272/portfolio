"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCard3DProps {
  image: string;
  video?: string;
  title: string;
  description: string;
  index: number;
  onClick: () => void;
  className?: string;
  position?: any; // kept for compatibility if needed, but unused
  isActive?: boolean;
}

export function ProjectCard3D({ image, video, title, description, index, onClick, className }: ProjectCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative h-[400px] w-[300px] md:h-[500px] md:w-[380px] rounded-xl bg-zinc-900 border border-white/10 cursor-pointer shadow-2xl transition-all duration-200 ease-out hover:shadow-amber-500/10",
        className
      )}
    >
      <div
        className="absolute inset-4 rounded-xl overflow-hidden bg-black"
        style={{ transform: "translateZ(50px)" }}
      >
         {video ? (
            <video 
              src={video} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
            />
         ) : (
             <img 
                src={image} 
                alt={title} 
                className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" 
             />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div 
        className="absolute bottom-10 left-8 right-8 z-20"
        style={{ transform: "translateZ(75px)" }}
      >
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300 font-[family-name:var(--font-display)]">
            {title}
        </h3>
        <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {description}
        </p>
      </div>
      
      {/* Gloss Effect */}
      <div 
        className="absolute inset-0 z-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
            background: "linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)",
            transform: "translateZ(80px)" 
        }}
      />
    </motion.div>
  );
}
