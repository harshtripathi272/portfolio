"use client";

import { useRef } from "react";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef1 = useRef<HTMLSpanElement>(null);
  const nameRef2 = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const firstName = DATA.name.split(" ")[0] ?? "";
  const lastName = DATA.name.split(" ").slice(1).join(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.25 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        [nameRef1.current, nameRef2.current],
        { yPercent: 120, opacity: 0, rotateX: -45 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.14 },
        "-=0.5"
      )
      .fromTo(
        roleRef.current,
        { opacity: 0, y: 20, letterSpacing: "0.6em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 1.1 },
        "-=0.9"
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.7"
      )
      .fromTo(
        socialRef.current?.children
          ? Array.from(socialRef.current.children)
          : [],
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.08 },
        "-=0.7"
      );

    // Subtle parallax drift on the whole hero content as you scroll away
    gsap.to(containerRef.current, {
      yPercent: 18,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
    >
      {/* Availability badge */}
      <div
        ref={badgeRef}
        className="pointer-events-auto mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-md opacity-0"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
          Available for work
        </span>
      </div>

      {/* Giant name */}
      <div className="perspective-[1200px]">
        <h1 className="font-[family-name:var(--font-display)] text-[17vw] font-black uppercase leading-[0.82] tracking-[-0.04em] md:text-[13vw] lg:text-[11vw]">
          <span className="block overflow-hidden py-1">
            <span ref={nameRef1} className="block origin-bottom text-gradient opacity-0">
              {firstName}
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              ref={nameRef2}
              className="block origin-bottom text-outline opacity-0"
            >
              {lastName}
            </span>
          </span>
        </h1>
      </div>

      {/* Role line */}
      <div
        ref={roleRef}
        className="mt-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.35em] text-white/45 opacity-0 sm:text-sm"
      >
        <span className="hidden h-px w-10 bg-white/20 sm:block" />
        <span>Engineer</span>
        <span className="text-white/20">/</span>
        <span>AI &amp; ML</span>
        <span className="text-white/20">/</span>
        <span>Builder</span>
        <span className="hidden h-px w-10 bg-white/20 sm:block" />
      </div>

      {/* Description */}
      <p
        ref={descRef}
        className="mt-8 max-w-xl text-balance text-base leading-relaxed text-neutral-400 opacity-0 md:text-lg"
      >
        {DATA.description}
      </p>

      {/* Socials */}
      <div ref={socialRef} className="pointer-events-auto mt-10 flex items-center gap-3">
        {Object.entries(DATA.contact.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social]) => (
            <MagneticWrapper key={name}>
              <Link
                href={social.url}
                target="_blank"
                aria-label={name}
                data-interactive
                className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <social.icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </MagneticWrapper>
          ))}
      </div>
    </div>
  );
}
