"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { DATA } from "@/data/resume";

type Project = (typeof DATA.projects)[number];

type Ctx = {
  open: (p: Project) => void;
  close: () => void;
};

const ProjectModalContext = createContext<Ctx | null>(null);

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) {
    throw new Error("useProjectModal must be used within <ProjectModalProvider>");
  }
  return ctx;
}

/** Strips the inline markdown emphasis characters the copy uses. */
const clean = (s: string) => s.replace(/[*_`#]/g, "");

const normalize = (src: string) =>
  !src ? src : src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;

const yearOf = (dates: string) => dates.match(/\d{4}/)?.[0] ?? "";

export function ProjectModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = useCallback((p: Project) => setProject(p), []);
  const close = useCallback(() => setProject(null), []);

  // Lock body scroll + close on Escape while a project is open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, close]);

  return (
    <ProjectModalContext.Provider value={{ open, close }}>
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {project && (
              <Modal key={project.title} project={project} onClose={close} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </ProjectModalContext.Provider>
  );
}

function Modal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const video = normalize(project.video || "");
  const image = normalize(project.image || "");
  const year = yearOf(project.dates);

  // Focus the panel so keyboard users land inside the dialog.
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="pm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        ref={panelRef}
        className="pm-panel"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="pm-close" onClick={onClose} aria-label="Close">
          <X className="size-4" />
        </button>

        {(video || image) && (
          <div className="pm-media">
            {video ? (
              <video src={video} autoPlay loop muted playsInline preload="metadata" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={project.title} />
            )}
          </div>
        )}

        <div className="pm-content">
          <div className="pm-head">
            <h3 className="pm-title">{project.title}</h3>
            <span className="pm-year font-mono">{project.dates}</span>
          </div>

          <p className="pm-desc">{clean(project.description)}</p>

          {project.technologies.length > 0 && (
            <div className="pm-section">
              <p className="pm-label">Stack</p>
              <div className="pm-tags">
                {project.technologies.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.links.length > 0 && (
            <div className="pm-section">
              <p className="pm-label">Links</p>
              <div className="pm-links">
                {project.links.map((l) => (
                  <a
                    key={l.type}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pm-link"
                  >
                    {l.icon}
                    {l.type}
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
