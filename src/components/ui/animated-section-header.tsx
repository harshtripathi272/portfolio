"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}

export function AnimatedSectionHeader({
  title,
  subtitle,
  className,
  delay = 0,
}: AnimatedSectionHeaderProps) {
  const letters = title.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <div className={cn("space-y-3", className)}>
      <motion.h2
        className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-display)] overflow-hidden"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          className="relative"
        >
          <p className="text-muted-foreground text-base max-w-[600px] leading-relaxed">
            {subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-amber-500 to-transparent mt-3"
          />
        </motion.div>
      )}
    </div>
  );
}
