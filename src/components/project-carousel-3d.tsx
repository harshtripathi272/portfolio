"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Sparkles } from "@react-three/drei";
// Post-processing removed due to dependency conflicts with React 18/Three r160+
import { ProjectCard3D } from "@/components/ui/project-card-3d";
import { DATA } from "@/data/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Markdown from "react-markdown";

function Carousel() {
  // const { width } = useScroll(); // Unused

  
  // Calculate responsive spacing
  const gap = 4.5; // Space between cards
  
  return (
    <Scroll>
      {DATA.projects.map((project, i) => (
        <ProjectCardWrapper 
          key={project.title} 
          project={project} 
          index={i} 
          position={[i * gap, 0, 0]} 
        />
      ))}
    </Scroll>
  );
}

// Wrapper to handle state and clicking (can't pass state setter easily deep into Canvas without context or prop drilling)
function ProjectCardWrapper({ project, index, position }: { project: any, index: number, position: [number, number, number] }) {
    // We'll emit a custom event or use a global store in a real app, 
    // but for now we can just use a simple callback pattern if we hoist state, 
    // BUT since this is inside Canvas, we need a way to communicate out to HTML overlay.
    // The easiest way for this specific structure is to dispatch a window event or use a simple context.
    // Let's use a CustomEvent for simplicity in this specific "drop-in" refactor.
    
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent("open-project-modal", { detail: project }));
    };

    return (
        <ProjectCard3D
            index={index}
            image={project.image || "/placeholder.png"}
            title={project.title}
            description={project.description}
            position={position}
            onClick={handleClick}
        />
    );
}


export function ProjectCarousel3D() {
  const [selectedProject, setSelectedProject] = useState<(typeof DATA.projects)[number] | null>(null);

  // Listen for the custom event from inside the Canvas
  React.useEffect(() => {
    const handleOpenModal = (e: any) => {
        if (e.detail) setSelectedProject(e.detail);
    };
    window.addEventListener("open-project-modal", handleOpenModal);
    return () => window.removeEventListener("open-project-modal", handleOpenModal);
  }, []);

  return (
    <div className="w-full h-[600px] relative z-10">
      
      {/* 3D Scene */}
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 30 }}>
        <color attach="background" args={["#000000"]} /> {/* Fallback/Base color */}
        
        {/* Lights & Environment */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.5} color="#fbbf24" />

        <Suspense fallback={null}>
            <ScrollControls horizontal pages={DATA.projects.length * 0.5} damping={0.2} distance={1}>
                {/* Center the carousel roughly based on item count to start? Or just start at 0 */}
               <group position={[-3, 0, 0]}>
                 <Carousel />
               </group>
            </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Overlay UI - Instructions */}
      <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
         <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 bg-zinc-900/50 backdrop-blur px-3 py-1 rounded-full border border-zinc-800">
            Drag to Explore • Tap to View
         </span>
      </div>

       {/* Detail Modal Re-used */}
       <Dialog open={!!selectedProject} onOpenChange={(open: boolean) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-4xl bg-zinc-950/90 backdrop-blur-xl border-zinc-800 text-white z-[100] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold font-[family-name:var(--font-display)]">{selectedProject?.title}</DialogTitle>
                    <DialogDescription className="text-zinc-400">{selectedProject?.dates}</DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                     {/* Media */}
                     <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                        {selectedProject?.video ? (
                            <video src={selectedProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                            <img src={selectedProject?.image || "/placeholder.png"} className="w-full h-full object-cover" alt={selectedProject?.title || "project"} />
                        )}
                        
                        {/* Gradient Overlay for Video Text readability if needed */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                     </div>

                     {/* Details */}
                     <div className="space-y-6 flex flex-col h-full">
                        <Markdown className="prose prose-invert text-sm sm:text-base text-zinc-300 leading-relaxed">
                             {selectedProject?.description}
                        </Markdown>

                        <div className="flex flex-wrap gap-2">
                             {selectedProject?.technologies.map((tech) => (
                                 <Badge key={tech} variant="outline" className="border-zinc-700 bg-zinc-800/50 text-amber-200/80 hover:bg-zinc-800 hover:text-amber-200">
                                     {tech}
                                 </Badge>
                             ))}
                        </div>

                        <div className="mt-auto pt-6 flex flex-wrap gap-4 border-t border-white/5">
                             {selectedProject?.links?.map((link, idx) => (
                                 <Link 
                                    key={idx} 
                                    href={link.href} 
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-800 transition-all duration-300 text-sm font-medium group"
                                 >
                                     {link.icon}
                                     <span className="group-hover:text-white transition-colors">{link.type}</span>
                                 </Link>
                             ))}
                              {selectedProject?.href && !selectedProject?.links?.some(l => l.href === selectedProject.href) && (
                                   <Link 
                                     href={selectedProject.href}
                                     target="_blank"
                                     className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-all shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.6)] text-sm font-bold"
                                   >
                                       Visit Live <MoveRight className="w-4 h-4" />
                                   </Link>
                              )}
                        </div>
                     </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}
