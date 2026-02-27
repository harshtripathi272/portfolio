"use client";

import React, { useCallback, useEffect, useRef } from "react";

export function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--x", `${e.clientX}px`);
      spotlightRef.current.style.setProperty("--y", `${e.clientY}px`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.03), transparent 40%)",
      }}
    />
  );
}
