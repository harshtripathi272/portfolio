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

    tl.to(counter, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.val)),
    })
      .to(barRef.current, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0)
      .to(innerRef.current, { opacity: 0, y: -16, duration: 0.4, ease: "power2.inOut" })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background transform-gpu"
    >
      <div ref={innerRef} className="flex flex-col items-center gap-6 px-6 text-center">
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-[hsl(var(--accent))]" />
          Portfolio
        </span>
        <span className="font-serif text-4xl font-light tracking-tight md:text-6xl">
          {DATA.name}
        </span>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-8">
        <div className="h-px w-full max-w-md overflow-hidden bg-foreground/15">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-[hsl(var(--accent))]" />
        </div>
        <span className="font-serif text-6xl font-light tabular-nums md:text-8xl">
          {count}
          <span className="accent">%</span>
        </span>
      </div>
    </div>
  );
}
