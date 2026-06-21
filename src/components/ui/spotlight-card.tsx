"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}

/**
 * A card surface with an animated gradient border that follows the cursor.
 * Pairs with the `.card-spotlight` utility in globals.css.
 */
export function SpotlightCard({
  as: Tag = "div",
  className,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("card-spotlight", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
