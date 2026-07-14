"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";
import { MaskText } from "@/components/motion/mask-text";
import { cn } from "@/lib/utils";

type Project = (typeof DATA.projects)[number];

const PROJECTS = DATA.projects;
const pad = (n: number) => String(n).padStart(2, "0");

const normalize = (src: string) =>
  !src ? src : src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;

/** Strips the markdown emphasis characters the copy uses inline. */
const clean = (s: string) => s.replace(/[*_`#]/g, "");

/** First 4-digit year in the date string, e.g. "Jul 2025 - Aug 2025" -> "2025". */
const yearOf = (dates: string) => dates.match(/\d{4}/)?.[0] ?? "—";

function Card({
  project,
  index,
  active,
  autoActivate = false,
}: {
  project: Project;
  index: number;
  active: boolean;
  /** In the stacked layout there is no reel progress, so each card watches itself. */
  autoActivate?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [selfActive, setSelfActive] = useState(false);

  useEffect(() => {
    if (!autoActivate) return;
    const el = articleRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setSelfActive(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoActivate]);

  const isActive = autoActivate ? selfActive : active;

  // Only the card in focus plays, so we never decode every video at once.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive]);

  const video = normalize(project.video || "");
  const image = normalize(project.image || "");

  return (
    <article ref={articleRef} className={cn("reel-card", isActive && "is-active")}>
      <div className="reel-media">
        <span className="reel-index font-mono">{pad(index + 1)}</span>
        {video ? (
          <video ref={videoRef} src={video} loop muted playsInline preload="metadata" />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={project.title} />
        ) : (
          <span className="reel-media-empty">{pad(index + 1)}</span>
        )}
      </div>

      <div className="reel-body">
        <div className="reel-title">
          <h3>{project.title}</h3>
          <span className="reel-year">{yearOf(project.dates)}</span>
        </div>

        <p className="reel-desc">{clean(project.description)}</p>

        <div className="reel-tags">
          {project.technologies.slice(0, 4).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="reel-links">
            {project.links.map((l) => (
              <a
                key={l.type}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="reel-link"
              >
                {l.type}
                <ArrowUpRight className="size-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectReel() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const [horizontal, setHorizontal] = useState(false);

  // Only run the sticky/horizontal treatment where it makes sense.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setHorizontal(mq.matches && !reduced);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduced]);

  // How far the track has to travel for its last card to reach the right edge.
  useEffect(() => {
    if (!horizontal) return;
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const overflow = track.scrollWidth - window.innerWidth;
      setDistance(Math.max(0, overflow));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const knob = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(
      PROJECTS.length - 1,
      Math.max(0, Math.round(p * (PROJECTS.length - 1)))
    );
    setActive(i);
  });

  const head = (
    <div className="reel-head">
      <p className="eyebrow">
        <span className="eyebrow-num">01</span> Selected work
      </p>
      <MaskText as="h2" className="section-title" split="words">
        Things I have built.
      </MaskText>
    </div>
  );

  // Mobile / reduced-motion: a plain vertical stack, no scroll hijacking.
  // outerRef stays attached so useScroll always has a live target.
  if (!horizontal) {
    return (
      <section ref={outerRef} className="section" id="projects">
        {head}
        <div className="reel-stack">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} project={p} index={i} active={false} autoActivate />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      id="projects"
      className="reel"
      // Scroll length = one viewport to pin + however far the track must travel.
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="reel-sticky">
        {head}

        <motion.div ref={trackRef} className="reel-track" style={{ x }}>
          {PROJECTS.map((p, i) => (
            <Card key={p.title} project={p} index={i} active={i === active} />
          ))}
          <div className="reel-spacer" aria-hidden />
        </motion.div>

        <div className="reel-progress">
          <span>{pad(active + 1)}</span>
          <div className="reel-rail">
            <motion.div
              className="reel-rail-fill"
              style={{ scaleX: fill, transformOrigin: "left" }}
            />
            <motion.span className="reel-rail-knob" style={{ left: knob }} />
          </div>
          <span>{pad(PROJECTS.length)}</span>
        </div>
      </div>
    </section>
  );
}
