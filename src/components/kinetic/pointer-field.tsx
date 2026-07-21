"use client";

import { useEffect, useRef } from "react";

const SPACING = 34; // px between dots
const RADIUS = 150; // px of pointer influence
const PUSH = 26; // max px a dot is displaced
const MAX_DPR = 2;

type Colors = { base: string; hot: string };

function readColors(): Colors {
  const cs = getComputedStyle(document.documentElement);
  return {
    base: cs.getPropertyValue("--faint").trim() || "#55555e",
    hot: cs.getPropertyValue("--accent").trim() || "#e5c07b",
  };
}

/**
 * Grid of dots that are pushed away from the pointer and warm toward the
 * accent colour as it nears them.
 *
 * Skipped entirely for coarse pointers and reduced-motion users; the rAF loop
 * is parked whenever the canvas is scrolled out of view.
 */
export function PointerField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let colors = readColors();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let rafId = 0;
    let visible = true;

    // Pointer position, and the lagged position we actually render from.
    const target = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      eased.x += (target.x - eased.x) * 0.12;
      eased.y += (target.y - eased.y) * 0.12;

      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const ox = i * SPACING;
          const oy = j * SPACING;

          const dx = ox - eased.x;
          const dy = oy - eased.y;
          const dist = Math.hypot(dx, dy);

          let x = ox;
          let y = oy;
          let size = 1.4;
          let color = colors.base;
          let alpha = 0.5;

          if (dist < RADIUS) {
            // 1 at the pointer, 0 at the edge of influence.
            const f = 1 - dist / RADIUS;
            const ease = f * f;
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * PUSH * ease;
            y += Math.sin(angle) * PUSH * ease;
            size = 1.4 + ease * 2.2;
            alpha = 0.5 + ease * 0.5;
            if (f > 0.55) color = colors.hot;
          }

          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
    };

    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };

    const start = () => {
      if (!rafId) rafId = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    resize();
    start();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Theme flips swap --faint / --accent, so re-read them.
    const mo = new MutationObserver(() => {
      colors = readColors();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
