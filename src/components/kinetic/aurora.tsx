"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight animated backdrop: three blurred gradient orbs drifting on CSS
 * transforms (compositor-only) plus a radial glow that eases toward the pointer.
 * No canvas, no WebGL — cheap enough to run everywhere.
 */
export function Aurora({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 50;
    let ty = 40;
    let x = 50;
    let y = 40;

    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      <span className="aurora-orb aurora-a" />
      <span className="aurora-orb aurora-b" />
      <span className="aurora-orb aurora-c" />
      <span className="aurora-glow" />
    </div>
  );
}
