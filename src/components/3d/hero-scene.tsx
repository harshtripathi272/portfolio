"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.x += 0.002;
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef}>
      {/* Central wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe={true}
          opacity={0.15}
          transparent
        />
      </mesh>

      {/* Inner solid icosahedron  */}
      <mesh scale={0.9}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Floating satellite shapes */}
      {[
        { pos: [5, 2, -3] as [number, number, number], size: 0.6 },
        { pos: [-6, -1, -2] as [number, number, number], size: 0.4 },
        { pos: [3, -4, -4] as [number, number, number], size: 0.7 },
        { pos: [-4, 3, -5] as [number, number, number], size: 0.5 },
        { pos: [7, -3, -6] as [number, number, number], size: 0.3 },
        { pos: [-5, 5, -3] as [number, number, number], size: 0.45 },
      ].map((shape, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={2} floatIntensity={2} position={shape.pos}>
          <mesh>
            <octahedronGeometry args={[shape.size, 0]} />
            <meshStandardMaterial
              color="#333333"
              roughness={0.2}
              metalness={0.95}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        frameloop="always" // Use always but we reduced internal complexity
      >
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.7} color="#4f46e5" />
        <pointLight position={[8, -6, 2]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />

        <FloatingGeometry />
        <Stars radius={80} depth={50} count={1200} factor={3} saturation={0} fade speed={0.5} />
        <Sparkles count={60} scale={12} size={1.5} speed={0.3} opacity={0.2} color="#a5b4fc" />
      </Canvas>

      {/* Animated aurora glow accents */}
      <div className="pointer-events-none absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.18)_0%,_transparent_70%)] animate-aurora" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,_rgba(6,182,212,0.14)_0%,_transparent_70%)] animate-aurora [animation-delay:-9s]" />

      {/* Vignette + bottom fade to dark */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(3,3,3,0.6)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}
