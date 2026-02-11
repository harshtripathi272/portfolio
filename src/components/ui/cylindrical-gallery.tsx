"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

export const CylindricalGallery = ({
  items,
  cylinderRadius = 1200, 
  cardWidth = 400,
  cardHeight = 560,
  autoSpin = false,
}: {
  items: GalleryItem[];
  cylinderRadius?: number;
  cardWidth?: number;
  cardHeight?: number;
  autoSpin?: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate angle per item
  const anglePerItem = 360 / items.length;
  
  // Motion values for rotation
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Handle Drag
  const handleDrag = (_: any, info: any) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    // Update rotation based on drag distance (scaled down for control)
    const currentRotation = rotation.get();
    rotation.set(currentRotation + info.delta.x * 0.2); 
  };

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    // Add inertia
    const velocity = info.velocity.x;
    const targetRotation = rotation.get() + velocity * 0.5;
    
    // Snap to nearest item (optional, but feels cleaner)
    // const snappedRotation = Math.round(targetRotation / anglePerItem) * anglePerItem;

    controls.start({
      rotateY: targetRotation,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1,
        restDelta: 0.001
      },
    });
  };

  // Auto-spin effect (slow rotation when idle)
  // useEffect(() => {
  //   if (autoSpin && !isDragging) {
  //       // Implementation for auto spin
  //   }
  // }, [autoSpin, isDragging]);

  return (
    <div className="relative h-[800px] w-full flex items-center justify-center overflow-hidden py-20 perspective-[2000px]">
        {/* Ambient Light/Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div 
          className="relative h-full w-full flex items-center justify-center [transform-style:preserve-3d]"
          ref={containerRef}
        >
             <motion.div
                className="relative flex items-center justify-center [transform-style:preserve-3d] cursor-grab active:cursor-grabbing"
                style={{ 
                    rotateY: rotation,
                    width: cardWidth,
                    height: cardHeight,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Unconstrained drag
                dragElastic={0.000001} // Low resistance
                onDragStart={() => setIsDragging(true)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                animate={controls}
             >
                {items.map((item, index) => {
                    const angle = index * anglePerItem;
                    return (
                        <GalleryCard
                            key={item.id}
                            item={item}
                            angle={angle}
                            radius={cylinderRadius}
                            width={cardWidth}
                            height={cardHeight}
                        />
                    );
                })}
             </motion.div>
        </div>
        
        {/* Overlay Gradients to hide edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
    </div>
  );
};

const GalleryCard = ({
  item,
  angle,
  radius,
  width,
  height
}: {
  item: GalleryItem;
  angle: number;
  radius: number;
  width: number;
  height: number;
}) => {
  return (
    <div
      className="absolute top-0 left-0 backface-visible"
      style={{
        width,
        height,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
    >
      <div 
        onClick={item.onClick}
        className={cn(
            "group relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-white/30 cursor-pointer",
            "shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        )}
      >
        {/* Image */}
        <div className="absolute inset-0">
             <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start gap-4">
            <h3 className="text-3xl font-bold text-white leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.title}
            </h3>
            <p className="text-sm text-zinc-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {item.description}
            </p>
            <div className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                View Project
            </div>
        </div>
      </div>
      
      {/* Reflection effect */}
      <div 
        className="absolute top-full left-0 w-full h-full mt-4 rounded-3xl overflow-hidden opacity-30 pointer-events-none"
        style={{
             transform: "scaleY(-1)",
             maskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
             WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
        }}
      >
         <Image src={item.image} alt="reflection" fill className="object-cover blur-[2px]" />
      </div>
    </div>
  );
};
