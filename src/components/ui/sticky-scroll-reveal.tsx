"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: React.ReactNode;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="flex justify-center relative space-x-0 md:space-x-10 rounded-md py-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4 w-full md:w-1/2">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 md:my-40 min-h-[60vh] flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl md:text-5xl font-bold text-slate-100 mb-6"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-sm mt-4 leading-relaxed"
              >
                {item.description}
              </motion.div>
              
              {/* Mobile Content (visible only on small screens) */}
               <motion.div
                className={cn(
                  "block md:hidden mt-8 rounded-xl overflow-hidden",
                  contentClassName
                )}
              >
                {item.content}
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "hidden md:block sticky top-20 h-screen w-1/2 rounded-3xl overflow-hidden",
          contentClassName
        )}
      >
          {/* Animated Transition for Desktop Content */}
           {content.map((item, index) => (
               <motion.div 
                 key={index}
                 className="absolute inset-0 h-full w-full flex items-center justify-center p-10"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: activeCard === index ? 1 : 0 }}
                 transition={{ duration: 0.5 }}
               >
                 {item.content}
               </motion.div>
           ))}
      </div>
    </motion.div>
  );
};
