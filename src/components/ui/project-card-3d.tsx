"use client";

import { useTexture, Text } from "@react-three/drei";
import { useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { easing } from "maath";

// --- Custom Shader Material ---
const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uOpactiy: 1,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Subtle wave effect on hover
      float noise = sin(pos.y * 10.0 + uTime) * 0.02;
      pos.z += noise * uHover;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    uniform float uOpactiy;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion on hover
      float wave = sin(uv.y * 20.0 + uTime * 2.0) * 0.02 * uHover;
      uv.x += wave;
      
      // Chromatic aberration on edges
      float r = texture2D(uTexture, uv + vec2(0.005 * uHover, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(0.005 * uHover, 0.0)).b;
      
      vec3 color = vec3(r, g, b);
      
      // Darken slightly when not hovered
      color *= 0.8 + 0.2 * uHover;

      gl_FragColor = vec4(color, uOpactiy);
    }
  `
);

// Extend to make it available as a JSX element
extend({ DistortionMaterial });

// Add type definition for the custom shader material
declare module "@react-three/fiber" {
  interface ThreeElements {
    distortionMaterial: any;
  }
}

interface ProjectCard3DProps {
  image: string;
  title: string;
  description: string;
  index: number;
  position: [number, number, number];
  onClick: () => void;
  isActive?: boolean;
}

export function ProjectCard3D({ image, title, description, index, position, onClick, isActive }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  // @ts-ignore - shaderMaterial creates a class that extends ShaderMaterial but TS needs help
  const materialRef = useRef<THREE.ShaderMaterial & { uniforms: { [key: string]: { value: any } } }>(null);
  const [hovered, setHover] = useState(false);
  const texture = useTexture(image || "/placeholder.png");

  // Random floating offset
  const randomOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // 1. Floating Animation
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t + randomOffset) * 0.1;

    // 2. Uniform Updates
    // ShaderMaterial created by drei stores uniforms directly on the material instance for easy access if mapped, 
    // but the underlying shader needs .uniforms.uTime.value usually. 
    // HOWEVER, drei's shaderMaterial makes them properties.
    // Let's safe access via standard uniforms object or direct property if three-fiber handles it.
    // Actually drei shaderMaterial creates setters. 
    // We can just set materialRef.current.uTime = ...
    
    // @ts-ignore
    materialRef.current.uTime = t;
    // @ts-ignore
    easing.damp(materialRef.current, "uHover", hovered ? 1 : 0, 0.2, delta);
    
    // Scale effect
    const targetScale = hovered ? 1.1 : 1;
    easing.damp3(meshRef.current.scale, [4 * targetScale, 2.8 * targetScale, 1], 0.2, delta);
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Main Image Card */}
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={[4, 2.8, 1]} // Base scale
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        {/* @ts-ignore */}
        <distortionMaterial 
            ref={materialRef} 
            transparent 
            uTexture={texture}
        />
      </mesh>

      {/* Floating 3D Text */}
      <Text
        position={[0, -1.8, 0.2]} // Below the card
        fontSize={0.25}
        color={hovered ? "#fbbf24" : "white"} // Amber-400 on hover
        anchorX="center"
        anchorY="top"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf"
      >
        {title.toUpperCase()}
      </Text>
      
      <Text
         position={[0, -2.2, 0.2]}
         fontSize={0.12}
         color="#a1a1aa" // zinc-400
         anchorX="center"
         anchorY="top"
         maxWidth={3.5}
         textAlign="center"
         font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf"
       >
         {description.slice(0, 80) + (description.length > 80 ? "..." : "")}
       </Text>
    </group>
  );
}
