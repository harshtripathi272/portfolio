"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
}

export function GradientOrbs({ className }: GradientOrbsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Orb 1 - Amber */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "10%", left: "10%" }}
      />
      
      {/* Orb 2 - Zinc */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "60%", right: "10%" }}
      />
      
      {/* Orb 3 - Accent */}
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ bottom: "10%", left: "50%" }}
      />
    </div>
  );
}
