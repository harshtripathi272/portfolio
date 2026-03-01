"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // useMotionValues for position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsHidden(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Track mouse over clickable elements to grow/shrink
    const handleInteractiveEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-interactive")
      ) {
        setIsHovered(true);
      }
    };

    const handleInteractiveLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-interactive")
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseover", handleInteractiveEnter);
    document.body.addEventListener("mouseout", handleInteractiveLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseover", handleInteractiveEnter);
      document.body.removeEventListener("mouseout", handleInteractiveLeave);
    };
  }, [cursorX, cursorY]);

  if (isHidden) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] rounded-full pointer-events-none mix-blend-difference bg-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          default: {
            width: 16,
            height: 16,
            opacity: 1,
          },
          hovered: {
            width: 64,
            height: 64,
            opacity: 0.2, // becomes large and transparent dot
          },
        }}
        animate={isHovered ? "hovered" : "default"}
        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
      />
      {/* Tiny dot in center */}
      <motion.div
        className="fixed top-0 left-0 z-[101] w-1.5 h-1.5 rounded-full pointer-events-none mix-blend-difference bg-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isHovered ? 0 : 1 }}
      />
    </>
  );
}
