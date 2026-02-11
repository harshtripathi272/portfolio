"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMotionValue } from "framer-motion";

interface GalleryItem {
  image: string;
  title: string;
  description?: string;
  link?: string;
}

const DistortionMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uHover: { value: 0 },
    uScrollVelocity: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uScrollVelocity;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Horizontal distortion based on scroll velocity (The liquid bend)
      pos.x += sin(uv.y * 3.14159) * uScrollVelocity * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D url;
    uniform float uHover;
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Zoom effect on hover
      float zoomLevel = 1.0 - uHover * 0.1;
      uv = (uv - 0.5) * zoomLevel + 0.5;
      
      // Slight chromatic aberration on edges during hover
      float r = texture2D(url, uv + vec2(uHover * 0.01, 0.0)).r;
      float g = texture2D(url, uv).g;
      float b = texture2D(url, uv - vec2(uHover * 0.01, 0.0)).b;
      
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
};

const GalleryImage = ({ item, index, margin = 0.5, width = 4, height = 6 }: { item: GalleryItem; index: number; margin?: number; width?: number; height?: number }) => {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { width: w, height: h } = useThree((state) => state.viewport);
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (group.current) {
        // Calculate position based on scroll
        const offset = width + margin; // space per item
        const scrollOffset = scroll.offset * (scroll.pages - 1) * w; // total scroll distance
        
        // Initial position + scroll offset
        // We want them to start from left and move right? No, standard scroll is content moves left.
        // So standard horizontal scroll logic in R3F:
        // x = (index * offset) - (scroll.range(0, 1) * totalWidth) 
        
        // Simpler approach with useScroll data:
        // scroll.offset is 0..1
        // We move the entire group? No, ScrollControls handles the camera or a container.
        // But for infinite or custom placement, we calculate manully.
        
        // Let's use standard Drei Image which has built-in crop but custom shader needs mesh.
        // Actually, Drei's <Image /> is a plane with a special shader. Customizing it is harder.
        // Better to use a PlaneGeometry with ShaderMaterial.
    }
    
    // Shader updates
    if (materialRef.current) {
        // smooth hover transition
        materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uHover.value,
            hovered ? 1 : 0,
            delta * 10
        );
        
        // scroll velocity proxy (naive)
        const currentScroll = scroll.offset;
        // materialRef.current.uniforms.uScrollVelocity.value = ... need delta of scroll
    }
  });
  
  // Custom Shader Material ref
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(item.image);

  return (
    <group ref={group} position={[index * (width + margin), 0, 0]}>
      <mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[width, height, 32, 32]} />
        <shaderMaterial
            ref={materialRef}
            uniforms={{
                url: { value: texture },
                uHover: { value: 0 },
                uTime: { value: 0 },
                uScrollVelocity: { value: 0 }
            }}
            vertexShader={DistortionMaterial.vertexShader}
            fragmentShader={DistortionMaterial.fragmentShader}
            transparent
        />
      </mesh>
      {/* HTML Overlay for Title */}
      {/* We can use <Html> from drei for text but sticking to canvas for image first */}
    </group>
  );
};


// Main Scene Component to be exported
export const Items = ({ items, w, gap }: { items: GalleryItem[], w: number, gap: number }) => {
  const scroll = useScroll();
  const { width: viewportW } = useThree((state) => state.viewport);
  const xW = w + gap;
  
  useFrame((state, delta) => {
    // Scroll interaction logic could go here for global effects
    // For now, ScrollControls moves the camera or content, let's rely on that behavior
    // Actually ScrollControls horizontal moves the content via scroll.el
  });

  return (
     <group>
        {items.map((item, i) => (
             <GalleryImage 
                key={i} 
                item={item} 
                index={i} 
                width={w} 
                margin={gap}
                height={w * 1.5} // Aspect ratio
             />
        ))}
     </group>
  )
}

export const DistortionGallery = ({ items }: { items: GalleryItem[] }) => {
  return (
    <div className="h-[600px] w-full relative">
       <Canvas gl={{ antialias: true, alpha: true }}>
          <ScrollControls horizontal pages={items.length * 0.5} damping={0.2} style={{ overflow: 'hidden' }}>
             <ScrollContent items={items} />
          </ScrollControls>
       </Canvas>
    </div>
  );
};

const ScrollContent = ({ items }: { items: GalleryItem[] }) => {
    const { width } = useThree((state) => state.viewport);
    // Responsive width logic
    const cardWidth = width < 10 ? width * 0.8 : 5; 
    const gap = 0.5;
    
    return (
        <Items items={items} w={cardWidth} gap={gap} />
    )
}
