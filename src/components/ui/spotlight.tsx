"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** glow radius in px */
  radius?: number;
  /** accent color (defaults to css --accent) */
  color?: string;
}

/**
 * Cursor-tracking radial spotlight. A subtle glow follows the pointer
 * across the surface — the signature Aceternity/Magic UI feel.
 */
export function Spotlight({
  children,
  className,
  radius = 350,
  color = "var(--accent)",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("relative", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, color-mix(in srgb, ${color} 14%, transparent), transparent 70%)`,
        }}
      />
      <div style={{ display: "contents" }}>{children}</div>
    </div>
  );
}
