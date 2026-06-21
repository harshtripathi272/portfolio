"use client";

import React, { useRef } from "react";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Dramatic scale up and fade in for the footer section
    gsap.fromTo(
      containerRef.current,
      { y: 150, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    // Text reveal
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          once: true,
        },
      }
    );

    // Button reveal
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          once: true,
        },
      }
    );

  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="relative z-20 w-full bg-white text-black py-40 rounded-t-[3rem] mt-32 transform-gpu">
      <div className="max-w-5xl mx-auto text-center px-6">
        <div className="overflow-hidden mb-12">
          <h2 ref={textRef} className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8] opacity-0 origin-bottom transform-gpu">
            Let&apos;s craft <br/>
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">the future.</span>
          </h2>
        </div>
        
        <div ref={buttonRef} className="opacity-0">
          <MagneticWrapper>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              data-interactive
              className="group inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-black text-white text-2xl font-bold tracking-tight transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Get in Touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
