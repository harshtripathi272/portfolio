"use client";

import { useRef } from "react";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef1 = useRef<HTMLSpanElement>(null);
  const nameRef2 = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Register scroll trigger exclusively for the parallax effect if needed
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo([nameRef1.current, nameRef2.current], 
        { y: 120, opacity: 0, rotateX: -30 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.15 }, 
        "-=0.6"
      )
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
      .fromTo(socialRef.current?.children ? Array.from(socialRef.current.children) : [], 
        { opacity: 0, scale: 0.8, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1 }, 
        "-=0.8"
      )
      .fromTo(photoRef.current, 
        { opacity: 0, filter: 'blur(20px)', scale: 1.05 }, 
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.5, ease: "power2.out" }, 
        "-=1.5"
      );
      
    // Parallax on scroll
    gsap.to(photoRef.current, {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 flex items-end md:items-center px-6 md:px-16 lg:px-24 pb-24 md:pb-0 pointer-events-none">
      
      {/* LEFT — Name + Info */}
      <div className="flex-1 flex flex-col justify-center gap-6 pt-20 md:pt-0 pointer-events-auto">
        <div ref={badgeRef} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold">Available for work</span>
        </div>

        <div className="perspective-[1000px] overflow-hidden py-2 -my-2">
          <h1 className="text-[14vw] md:text-[10vw] lg:text-[9vw] font-black tracking-[-0.04em] leading-[0.85] uppercase font-[family-name:var(--font-display)]">
            <span ref={nameRef1} className="block text-gradient origin-bottom opacity-0">{DATA.name.split(' ')[0]}</span>
            <span ref={nameRef2} className="block text-white/20 text-outline origin-bottom opacity-0">{DATA.name.split(' ')[1]}</span>
          </h1>
        </div>

        <p ref={descRef} className="text-base md:text-lg text-neutral-400 max-w-sm leading-relaxed opacity-0">
          {DATA.description}
        </p>

        <div ref={socialRef} className="flex items-center gap-3">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <MagneticWrapper key={name}>
                <Link
                  href={social.url}
                  target="_blank"
                  className="group flex size-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 opacity-0"
                >
                  <social.icon className="size-4" />
                </Link>
              </MagneticWrapper>
            ))}
        </div>
      </div>

      {/* RIGHT — Photo */}
      <div className="hidden md:flex flex-1 items-end justify-center md:justify-end relative h-screen max-h-screen">
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[70vh] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[20vw] h-[40vh] bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />

        <div ref={photoRef} className="relative w-[36vw] max-w-[520px] h-[85vh] flex items-end justify-center pointer-events-none opacity-0">
          <Image
            src="/me-nobg.png"
            alt={DATA.name}
            fill
            className="object-contain object-bottom drop-shadow-[0_0_80px_rgba(255,255,255,0.08)]"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}
