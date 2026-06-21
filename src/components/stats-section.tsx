"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATS = [
  { value: 8, suffix: "+", label: "Feature Projects" },
  { value: 2, suffix: "", label: "Hackathon Wins" },
  { value: 3, suffix: "+", label: "Internships" },
];

export function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade in the blocks with a stagger
    gsap.fromTo(
      blockRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          once: true,
        },
      }
    );

    // Number counter animation
    numberRefs.current.forEach((el, index) => {
      if (!el) return;
      const targetValue = STATS[index].value;
      const proxy = { val: 0 };
      
      gsap.to(proxy, {
        val: targetValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center+=200",
          once: true,
        },
        onUpdate: () => {
          el.innerHTML = Math.floor(proxy.val).toString();
        },
      });
    });

  }, { scope: containerRef });

  return (
    <section id="stats" ref={containerRef} className="relative px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 border-t border-foreground/15 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { blockRefs.current[i] = el; }}
              className="flex flex-col gap-4 border-b border-foreground/15 py-12 opacity-0 md:border-b-0 md:border-r md:px-10 md:last:border-r-0 md:[&:first-child]:pl-0"
            >
              <div className="flex items-start font-serif text-7xl font-light leading-none tracking-tight md:text-8xl">
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="tabular-nums"
                >
                  0
                </span>
                <span className="accent">{stat.suffix}</span>
              </div>
              <span className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
