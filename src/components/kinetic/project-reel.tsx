"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Plus } from "lucide-react";
import { DATA } from "@/data/resume";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { useProjectModal } from "@/components/kinetic/project-modal";
import { cn } from "@/lib/utils";

type Project = (typeof DATA.projects)[number];

// The curated set shown in the kinetic reel. Everything else falls into the
// categorised grids below. Matched by title so the data file stays untouched.
const FEATURED_TITLES: readonly string[] = [
  "OffPay - Offline UPI Payment System",
  "Dia - Offline On-Device AI Companion",
  "Fake Dataset Factory - Synthetic Medical Imaging",
  "VesselWatch - Oil Spill Detection System",
  "BHC (Balaji Health Care) Business Suite",
  "Reverie - Cognitive Observability for AI Agents",
  "FlakeForge - OpenEnv Environment Server",
  "Lunor Translator (DRDO Internship)",
];

const isFeatured = (p: Project) => FEATURED_TITLES.includes(p.title);

// Preserve the featured order as listed above.
const REEL: readonly Project[] = FEATURED_TITLES.map((t) =>
  DATA.projects.find((p) => p.title === t)
).filter(Boolean) as Project[];

const REST: readonly Project[] = DATA.projects.filter((p) => !isFeatured(p));

// Category buckets for the non-featured work. A project not listed here lands
// in "More".
const CATEGORIES: { name: string; titles: string[] }[] = [
  {
    name: "AI Agents & Infrastructure",
    titles: [
      "FlowSpeak - Live Presenter Co-Pilot",
      "memora - Memory Layer for AI Agents",
      "OnCall AI - AI On-Call Engineer",
      "Collections Agent - AR Follow-Up Automation",
      "RootCause - AI Intent Tracking & Code Provenance",
      "PII Redaction Env",
    ],
  },
  {
    name: "Machine Learning & Research",
    titles: [
      "YOLOv11n with Dendritic Optimization",
      "VERIFAI - Verified Evidence-Based Radiology AI",
      "ClinicalPilot - Multi-Agent Clinical Support",
      "Lung Disease Classification",
      "Asfalis - AI-Powered Security Monitor",
      "T&C Summarizer",
      "Recapture Detection",
    ],
  },
  {
    name: "Web & Products",
    titles: [
      "SevaSetu - Crisis Response Platform",
      "SafeWander - Dementia Patient Monitoring",
      "EcoVoice - Acoustic Biodiversity Monitor",
      "MERAZ 6.0 - Techno-Cultural Fest Portal",
      "SoilStack - Biochar Carbon Credit Marketplace",
      "Roast Your Base",
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

// True on phone-width screens, where the vertical stack would otherwise get
// very long — used to collapse the lists behind "show more".
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
}

// How many featured cards to show on mobile before "show more".
const MOBILE_FEATURED = 4;

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
  const { open } = useProjectModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const articleRef = useRef<HTMLButtonElement>(null);
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
    <button
      ref={articleRef}
      type="button"
      onClick={() => open(project)}
      className={cn("reel-card", isActive && "is-active")}
      aria-label={`View details for ${project.title}`}
    >
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
        <span className="reel-view">
          <Plus className="size-3.5" /> Details
        </span>
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
      </div>
    </button>
  );
}

export function ProjectReel() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const [horizontal, setHorizontal] = useState(false);
  const isMobile = useIsMobile();
  const [featOpen, setFeatOpen] = useState(false);

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
      REEL.length - 1,
      Math.max(0, Math.round(p * (REEL.length - 1)))
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
    const collapsed = isMobile && !featOpen;
    const shown = collapsed ? REEL.slice(0, MOBILE_FEATURED) : REEL;
    return (
      <>
        <section ref={outerRef} className="section" id="projects">
          {head}
          <div className="reel-stack">
            {shown.map((p, i) => (
              <Card key={p.title} project={p} index={i} active={false} autoActivate />
            ))}
          </div>
          {isMobile && REEL.length > MOBILE_FEATURED && (
            <div className="show-more-wrap">
              <button
                type="button"
                className="show-more"
                onClick={() => setFeatOpen((v) => !v)}
              >
                {featOpen
                  ? "Show less"
                  : `Show ${REEL.length - MOBILE_FEATURED} more`}
              </button>
            </div>
          )}
        </section>
        <Categories />
      </>
    );
  }

  return (
    <>
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
            {REEL.map((p, i) => (
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
            <span>{pad(REEL.length)}</span>
          </div>
        </div>
      </section>
      <Categories />
    </>
  );
}

/** A single non-featured project tile that opens the detail modal. */
function GridCard({ project, delay }: { project: Project; delay: number }) {
  const { open } = useProjectModal();
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => open(project)}
        className="archive-card"
        aria-label={`View details for ${project.title}`}
      >
        <div className="archive-top">
          <h3>{project.title}</h3>
          <Plus className="size-4 archive-arrow" />
        </div>
        <p className="archive-desc">{clean(project.description)}</p>
        <div className="archive-tags">
          {project.technologies.slice(0, 3).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </button>
    </Reveal>
  );
}

/** Non-featured projects, grouped into labelled category grids. */
function Categories() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (REST.length === 0) return null;

  const used = new Set<string>();
  const groups = CATEGORIES.map((cat) => {
    const items = cat.titles
      .map((t) => REST.find((p) => p.title === t))
      .filter(Boolean) as Project[];
    items.forEach((p) => used.add(p.title));
    return { name: cat.name, items };
  }).filter((g) => g.items.length > 0);

  const leftovers = REST.filter((p) => !used.has(p.title));
  if (leftovers.length) groups.push({ name: "More", items: leftovers });

  // On phones the full grid makes for an endless scroll, so it collapses
  // behind a single toggle. Desktop always shows everything.
  const showGroups = !isMobile || open;

  return (
    <section className="section" id="archive">
      <div className="shell">
        <p className="eyebrow">
          <span className="eyebrow-num">01b</span> Everything else · {REST.length}
        </p>

        {showGroups &&
          groups.map((group) => (
            <div className="category" key={group.name}>
              <div className="category-head">
                <h3 className="category-name">{group.name}</h3>
                <span className="category-count font-mono">
                  {pad(group.items.length)}
                </span>
              </div>
              <div className="archive-grid">
                {group.items.map((p, i) => (
                  <GridCard key={p.title} project={p} delay={(i % 3) * 0.05} />
                ))}
              </div>
            </div>
          ))}

        {isMobile && (
          <div className="show-more-wrap">
            <button
              type="button"
              className="show-more"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Show less" : `Show all ${REST.length} projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
