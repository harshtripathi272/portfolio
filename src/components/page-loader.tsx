"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DATA } from "@/data/resume";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loaderRef.current) return;

    const counter = { val: 0 };
    const tl = gsap.timeline();

    // Animate the percentage counter 0 -> 100
    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.val)),
    })
      .to(
        barRef.current,
        { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
        0
      )
      // Fade the inner content
      .to(innerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.inOut",
      })
      // Curtain up
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] transform-gpu"
    >
      <div ref={innerRef} className="flex flex-col items-center gap-8 px-6">
        <span className="font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
          {DATA.name}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
          Loading Experience
        </span>
      </div>

      {/* Progress bar + counter pinned to bottom */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-8">
        <div className="h-px w-full max-w-md overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
          />
        </div>
        <span className="font-[family-name:var(--font-display)] text-6xl font-black tabular-nums text-white/90 md:text-8xl">
          {count}
          <span className="text-violet-400">%</span>
        </span>
      </div>
    </div>
  );
}
