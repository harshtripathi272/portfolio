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
    <section id="stats" ref={containerRef} className="relative z-20 px-6 py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-px md:bg-white/[0.04] rounded-2xl md:border border-white/[0.06] overflow-hidden">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { blockRefs.current[i] = el; }}
              className="flex flex-col items-center justify-center py-16 px-8 bg-[#050505] transition-colors duration-500 hover:bg-white/[0.02] border border-white/[0.06] md:border-none rounded-2xl md:rounded-none group opacity-0"
            >
              <div className="flex items-center">
                <span 
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="text-6xl md:text-8xl font-black font-[family-name:var(--font-display)] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600 transition-transform duration-700 group-hover:scale-110 inline-block w-[1em] text-right"
                >
                  0
                </span>
                <span className="text-6xl md:text-8xl font-black font-[family-name:var(--font-display)] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600 transition-transform duration-700 group-hover:scale-110">
                  {stat.suffix}
                </span>
              </div>
              <span className="text-xs md:text-sm text-neutral-500 uppercase tracking-[0.3em] mt-6 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
