"use client";

import { useEffect, useRef } from "react";

/**
 * The cutting-mat backdrop: a dark-green self-healing surface.
 * - CSS layers paint the grid + ruler ticks (see .mat-surface in globals.css).
 * - A canvas layer draws light "knife" scratches that fade out on their own,
 *   so the mat visually heals as you move across it.
 */
export function MatBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Each scratch is a short segment with a life that decays → self-heals.
    type Scratch = { x1: number; y1: number; x2: number; y2: number; life: number };
    const scratches: Scratch[] = [];
    const MAX = 260;

    let last: { x: number; y: number } | null = null;

    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const x = e.clientX;
      const y = e.clientY;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        // Only mark when the pointer actually travels — like a knife dragging.
        if (dist > 6) {
          scratches.push({ x1: last.x, y1: last.y, x2: x, y2: y, life: 1 });
          if (scratches.length > MAX) scratches.shift();
          last = { x, y };
        }
      } else {
        last = { x, y };
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = scratches.length - 1; i >= 0; i--) {
        const s = scratches[i];
        s.life -= 0.018;
        if (s.life <= 0) {
          scratches.splice(i, 1);
          continue;
        }
        const a = s.life;
        // A bright core + a soft shadow reads as a cut into the mat.
        ctx.strokeStyle = `rgba(226, 242, 226, ${0.16 * a})`;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(6, 20, 12, ${0.14 * a})`;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1 + 1.2);
        ctx.lineTo(s.x2, s.y2 + 1.2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mat-surface" aria-hidden>
      <div className="mat-grid" />
      <div className="mat-ruler mat-ruler-top" />
      <div className="mat-ruler mat-ruler-left" />
      <div className="mat-vignette" />
      <canvas ref={canvasRef} className="mat-scratch" />
    </div>
  );
}
