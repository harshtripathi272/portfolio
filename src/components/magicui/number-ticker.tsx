"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  suffix = "",
  prefix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);

  const springValue = useSpring(direction === "down" ? value : 0, {
    bounce: 0,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest)
  );

  const [displayNum, setDisplayNum] = useState(direction === "down" ? value : 0);

  useEffect(() => {
    if (isInView && !hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        springValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasStarted, springValue, value, direction, delay]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      setDisplayNum(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-tight",
        className
      )}
    >
      {prefix}{displayNum}{suffix}
    </motion.span>
  );
}
