"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    
    const tl = gsap.timeline();
    
    // Slight delay to let heavy canvas components mount
    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 0.8,
      ease: "power2.inOut"
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
         if (loaderRef.current) loaderRef.current.style.display = "none";
      }
    });

  }, []);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center transform-gpu"
    >
      <div ref={textRef} className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-bold font-[family-name:var(--font-display)]">
          Loading Experience
        </span>
      </div>
    </div>
  );
}
