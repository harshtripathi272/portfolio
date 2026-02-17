"use client";

import { useScroll, ScrollControls, Image as DreiImage, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

function Card({ 
    url, 
    title, 
    index, 
    position, 
    scale,
    onClick 
}: { 
    url: string; 
    title: string; 
    index: number; 
    position: [number, number, number]; 
    scale: [number, number, number];
    onClick?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  
  useFrame((state: any, delta: number) => {
    if (!ref.current) return;
    
    // Zoom on hover
    const targetScale = hovered ? 1.1 : 1;
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, scale[0] * targetScale, delta * 5);
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, scale[1] * targetScale, delta * 5);
    
    // Grayscale transition logic (requires custom shader or using Drei Image props if supported)
    // Drei's Image component uses 'grayscale' prop (0-1).
    if (ref.current.material) {
         // @ts-ignore
        (ref.current.material as any).grayscale = THREE.MathUtils.lerp(
            (ref.current.material as any).grayscale || 0, 
            hovered ? 0 : 1, // Full color on hover, B&W default
            delta * 10
        );
         // @ts-ignore
         (ref.current.material as any).zoom = hovered ? 1 : 1.2; // Zoom out effect on image texture?
    }
  });

  return (
    <group position={position}>
      <DreiImage
        ref={ref}
        url={url}
        scale={scale}
        onClick={onClick}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        transparent
        // @ts-ignore
        grayscale={1} // Start fully grayscale
      />
      <Text
        position={[0, -scale[1] / 2 - 0.2, 0.1]} // Below the image
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="top"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf" // Fallback Inter font
      >
        {title.toUpperCase()}
      </Text>
    </group>
  );
}

function Items({ items, w = 3, gap = 0.5 }: { items: GalleryItem[], w?: number, gap?: number }) {
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  
  return (
    <group position={[-width / 2 + w / 2, 0, 0]}> 
      {items.map((item, i) => (
        <Card
          key={i}
          index={i}
          url={item.image}
          title={item.title}
          position={[i * xW, 0, 0]}
          scale={[w, w * 1.5, 1]}
          onClick={item.onClick}
        />
      ))}
    </group>
  );
}

function Scene({ items }: { items: GalleryItem[] }) {
   const { width } = useThree((state) => state.viewport);
   // Responsive sizing
   const isMobile = width < 5;
   const cardWidth = isMobile ? width * 0.7 : 3.5; 
   const gap = 0.5;
   
   return (
       <Items items={items} w={cardWidth} gap={gap} />
   )
}

export const DistortionGallery = ({ items }: { items: GalleryItem[] }) => {
  return (
    <div className="h-[800px] w-full relative z-10">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <ScrollControls horizontal pages={items.length > 0 ? items.length * 0.4 : 1} damping={0.3} style={{ overflow: "hidden" }}>
           <Scene items={items} />
        </ScrollControls>
      </Canvas>
      
      {/* Overlay Instructions */}
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none z-20 mix-blend-difference">
         <p className="text-white text-xs uppercase tracking-[0.2em] opacity-50">
            Drag to Explore
         </p>
      </div>
    </div>
  );
};
