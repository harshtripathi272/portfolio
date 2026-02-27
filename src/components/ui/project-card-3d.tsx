"use client";

import React, { useRef } from "react";
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
  position?: any;
  isActive?: boolean;
}

export function ProjectCard3D({ image, video, title, description, index, onClick, className }: ProjectCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
        "relative h-[420px] w-[320px] md:h-[500px] md:w-[380px] rounded-2xl bg-neutral-950 border border-white/[0.06] cursor-pointer group transition-all duration-300 hover:border-white/[0.15]",
        className
      )}
    >
      {/* Media */}
      <div
        className="absolute inset-3 rounded-xl overflow-hidden bg-neutral-900"
        style={{ transform: "translateZ(40px)" }}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
      </div>

      {/* Text */}
      <div
        className="absolute bottom-8 left-7 right-7 z-20"
        style={{ transform: "translateZ(60px)" }}
      >
        <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-display)] leading-tight">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm line-clamp-2 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Subtle hover shine */}
      <div
        className="absolute inset-0 z-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
          transform: "translateZ(70px)",
        }}
      />
    </motion.div>
  );
}
