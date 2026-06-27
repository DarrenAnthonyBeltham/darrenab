"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];
const transitionCinematic = { duration: 1.2, ease: easePremium };
const transitionSnap = { duration: 0.8, ease: easePremium };

const principles = {
  default: {
    quote: "Not everything I build is code.",
    title: "Obsession.",
    bg: "#FCFCFD"
  },
  atmosphere: {
    quote: "Emotion dictates memory. Design dictates reality.",
    title: "Emotion.",
    bg: "#F6F8FB"
  },
  engineering: {
    quote: "Systems must be robust before they are beautiful.",
    title: "Engineering.",
    bg: "#EAF5FF"
  },
  exploration: {
    quote: "Dismantle the complex. Rebuild it better.",
    title: "Exploration.",
    bg: "#D8ECFF"
  }
};

type PrincipleKey = keyof typeof principles;

const nodes = [
  { id: "atmosphere", label: "Emotion", type: "principle", x: 25, y: 35 },
  { id: "engineering", label: "Engineering", type: "principle", x: 75, y: 40 },
  { id: "exploration", label: "Exploration", type: "principle", x: 50, y: 65 },
  { id: "interstellar", label: "Interstellar", type: "entity", x: 15, y: 20 },
  { id: "bladerunner", label: "Blade Runner", type: "entity", x: 10, y: 55 },
  { id: "fcbarcelona", label: "FC Barcelona", type: "entity", x: 85, y: 20 },
  { id: "coredigital", label: "CoreDigital", type: "entity", x: 85, y: 65 },
  { id: "machinelearning", label: "Few-Shot Learning", type: "entity", x: 35, y: 85 },
  { id: "nextjs", label: "Next.js & Go", type: "entity", x: 65, y: 85 },
];

const edges = [
  { source: "atmosphere", target: "interstellar" },
  { source: "atmosphere", target: "bladerunner" },
  { source: "engineering", target: "coredigital" },
  { source: "engineering", target: "nextjs" },
  { source: "exploration", target: "machinelearning" },
  { source: "exploration", target: "fcbarcelona" },
  { source: "atmosphere", target: "exploration" },
  { source: "engineering", target: "exploration" },
];

const collections = [
  {
    id: "stories",
    number: "001",
    title: "Stories",
    subtitle: "Films / Books / Narratives",
    description: "Everything that shaped how I think.",
    image: "/interstellar-wormhole.jpg",
    artDirection: "grayscale contrast-125",
    span: "md:col-span-8",
    previews: ["/blade-runner-still.jpg", "/dune-still.jpg"]
  },
  {
    id: "cars",
    number: "002",
    title: "Cars",
    subtitle: "Hardware / Architecture / Engineering",
    description: "Mechanical purity and computational power.",
    image: "/carbon-fiber-reflection.png",
    artDirection: "brightness-90 sepia-[.2] hue-rotate-[190deg]",
    span: "md:col-span-4",
    previews: ["/legion-setup.jpg", "/server-rack.jpg"]
  },
  {
    id: "sound",
    number: "003",
    title: "Sound",
    subtitle: "Rhythm / Frequencies / Scores",
    description: "The invisible layer that alters perception.",
    image: "/drake-fog.webp",
    artDirection: "contrast-110 saturate-150",
    span: "md:col-span-5",
    previews: ["/vinyl-record.jpg", "/studio-monitor.jpg"]
  },
  {
    id: "play",
    number: "004",
    title: "Play",
    subtitle: "Games / Mechanics / Sports",
    description: "Systems designed to be experienced.",
    image: "/abstract-texture.jpg",
    artDirection: "contrast-125 sepia-[.1]",
    span: "md:col-span-7",
    previews: ["/rdr2-landscape.jpg", "/barca-camp-nou.jpg"]
  }
];

const currentMetrics = [
  { label: "Building", val: "CoreDigital API", progress: "█████████░" },
  { label: "Research", val: "Metric-Based FSL", progress: "██████░░░░" },
  { label: "Reading", val: "Designing Data-Intensive Apps", progress: "████░░░░░░" },
  { label: "Coffee", val: "V60 Ethiopian", progress: "██████████" },
  { label: "Thinking", val: "Interfaces should disappear", progress: "████████░░" },
];

const artifacts = [
  { id: "watch", label: "Mechanical Watch", img: "/artifact-watch.jpg", story: "Precision over convenience." },
  { id: "keyboard", label: "Custom Keeb", img: "/artifact-keyboard.jpg", story: "The tactile connection to the machine." },
  { id: "notebook", label: "Field Notes", img: "/artifact-notebook.jpg", story: "Where code begins before syntax." },
];

export default function ArcticHome() {
  const [activeState, setActiveState] = useState<PrincipleKey>("default");
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null);
  const [hoveredArtifact, setHoveredArtifact] = useState<string | null>(null);
  
  const containerRef = useRef(null);
  const collectionsRef = useRef(null);
  const isCollectionsInView = useInView(collectionsRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 20, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const bgGradient = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(121, 199, 255, 0.04) 0%, transparent 60%)`
  );

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const [screenWidth, setScreenWidth] = useState(1920);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titleFontWeight = useTransform(springX, [0, screenWidth], [100, 300]);
  const titleLetterSpacing = useTransform(springX, [0, screenWidth], ["-0.05em", "0em"]);
  const titleSkew = useTransform(springX, [0, screenWidth], ["-10deg", "-15deg"]);

  const playSound = (type: PrincipleKey) => {
    const sounds: Record<string, string> = {
      atmosphere: '/sounds/glass-click.mp3',
      engineering: '/sounds/metal-click.mp3',
      exploration: '/sounds/soft-synth.mp3'
    };
    if (sounds[type as string]) {
      const audio = new Audio(sounds[type as string]);
      audio.volume = 0.15;
      audio.play().catch(() => {});
    }
  };

  const getConnectedSequence = (nodeId: string) => {
    if (nodeId === "default") return [];
    const seq = [nodeId];
    edges.forEach(edge => {
      if (edge.source === nodeId) seq.push(edge.target);
      if (edge.target === nodeId) seq.push(edge.source);
    });
    return seq;
  };

  const activeSequence = getConnectedSequence(activeState);

  return (
    <motion.div 
      ref={containerRef} 
      animate={{ backgroundColor: principles[activeState].bg }}
      transition={{ duration: 1.5, ease: easePremium }}
      className="text-[#0F172A] font-sans selection:bg-[#EAF5FF] selection:text-[#79C7FF] min-h-[300vh]"
    >
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: bgGradient }} />
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.25] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <header className="fixed top-8 left-8 z-40 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0F172A]/40">Darren.</span>
      </header>

      <div className="fixed inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center px-6 w-full max-w-5xl">
          <motion.p 
            key={`quote-${activeState}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transitionCinematic}
            className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#0F172A]/40 mb-8"
          >
            {principles[activeState].quote}
          </motion.p>
          <motion.h1 
            key={`title-${activeState}`}
            style={{ fontWeight: titleFontWeight, letterSpacing: titleLetterSpacing, transform: `skewX(${titleSkew})` }}
            initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={transitionCinematic}
            className="text-7xl md:text-[11rem] font-serif italic text-[#0F172A] leading-[0.9] origin-center cursor-default pointer-events-auto hover:text-[#79C7FF] hover:drop-shadow-[0_0_30px_rgba(121,199,255,0.3)] transition-colors duration-1000"
          >
            {principles[activeState].title}
          </motion.h1>
        </motion.div>
      </div>

      <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-[80vh] pointer-events-auto">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map((edge, i) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const isConnected = activeSequence.includes(edge.source) && activeSequence.includes(edge.target);
              const opacity = activeState !== "default" ? (isConnected ? 0.3 : 0.01) : 0.05;

              return (
                <motion.line 
                  key={i}
                  x1={`${sourceNode.x}%`} y1={`${sourceNode.y}%`} x2={`${targetNode.x}%`} y2={`${targetNode.y}%`} 
                  stroke="#79C7FF" strokeWidth="1"
                  animate={{ opacity: [opacity, opacity * 1.5, opacity] }}
                  transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                  className="transition-opacity duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              );
            })}
          </svg>

          {nodes.map((node, i) => {
            const isPrinciple = node.type === "principle";
            const sequenceIndex = activeSequence.indexOf(node.id);
            const isHighlighted = sequenceIndex !== -1;
            const isDimmed = activeState !== "default" && !isHighlighted;
            
            const delay = sequenceIndex > 0 ? sequenceIndex * 0.2 : 0;

            return (
              <motion.div 
                key={node.id}
                animate={{ opacity: isDimmed ? 0.05 : [1, 0.7, 1] }}
                transition={{ duration: 3 + (i % 2), repeat: Infinity, ease: "easeInOut", delay }}
                onMouseEnter={() => {
                  if (isPrinciple) {
                    setActiveState(node.id as PrincipleKey);
                    playSound(node.id as PrincipleKey);
                  }
                }}
                onMouseLeave={() => isPrinciple && setActiveState("default")}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 ${isPrinciple ? "cursor-crosshair" : "pointer-events-none"}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {isPrinciple ? (
                  <motion.div 
                    className="absolute inset-0 -m-10"
                  />
                ) : (
                  <>
                    <motion.div 
                      animate={{ backgroundColor: isHighlighted ? "#79C7FF" : "#0F172A", boxShadow: isHighlighted ? "0 0 15px #79C7FF" : "none" }}
                      transition={{ duration: 0.8, delay }}
                      className="w-1.5 h-1.5 rounded-full" 
                    />
                    <motion.span 
                      animate={{ color: isHighlighted ? "#79C7FF" : "#0F172A" }}
                      transition={{ duration: 0.8, delay }}
                      className="font-mono text-[9px] tracking-[0.2em] uppercase opacity-40"
                    >
                      {node.label}
                    </motion.span>
                    
                    <AnimatePresence>
                      {isHighlighted && activeState !== "default" && (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }}
                           transition={{ duration: 1, delay: delay + 0.3 }}
                           className="absolute top-8 w-24 h-32 rounded-sm border border-[rgba(15,23,42,0.1)] overflow-hidden shadow-xl"
                         >
                           <Image src={`/${node.id}-poster.jpg`} fill className="object-cover grayscale" alt={node.label} />
                         </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative z-30 pt-[120vh] bg-transparent pointer-events-none">
        
        <motion.div 
          ref={collectionsRef}
          animate={{
            scale: isCollectionsInView ? 1 : 0.98,
            opacity: isCollectionsInView ? 1 : 0.8,
            y: isCollectionsInView ? 0 : 50
          }}
          transition={{ duration: 1.8, ease: easePremium }}
          className="bg-[#FCFCFD] rounded-t-[3rem] pointer-events-auto shadow-[0_-20px_50px_rgba(15,23,42,0.02)]"
        >
          
          <section className="pt-[140px] pb-[96px] max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#0F172A] leading-tight">
              Everything I admire has one thing in common.
            </h3>
            <p className="mt-[31px] text-xl font-serif italic text-[#0F172A]/50">
              Someone cared enough to make it unforgettable.
            </p>
          </section>

          <section className="pb-[140px] px-6 max-w-[1800px] mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row w-full h-auto md:h-[700px] gap-[12px]">
              {collections.map((item) => {
                const isHovered = hoveredCollection === item.id;
                const width = hoveredCollection ? (isHovered ? "55%" : "15%") : "25%";

                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredCollection(item.id)}
                    onMouseLeave={() => setHoveredCollection(null)}
                    animate={{ width }}
                    transition={{ duration: 0.8, ease: easePremium }}
                    className="relative bg-[#F6F8FB] rounded-2xl overflow-hidden cursor-pointer group min-h-[400px] md:min-h-full w-full md:w-auto"
                  >
                    <Link href={`/${item.id}`} className="absolute inset-0 z-20" />
                    
                    <div className="absolute inset-0 z-0 bg-[#0F172A]">
                      <Image 
                        src={item.image} 
                        fill 
                        className={`object-cover transition-all duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? "scale-100 opacity-100" : "scale-110 opacity-30"} ${item.artDirection}`} 
                        alt={item.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
                    </div>
                    
                    <div className="absolute inset-0 z-10 p-[31px] flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-[#FCFCFD]/50 mix-blend-overlay">{item.number}</span>
                        
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}
                              className="flex gap-2"
                            >
                              {item.previews.map((src, i) => (
                                <div key={i} className="w-16 h-10 relative rounded-sm overflow-hidden border border-[#FCFCFD]/10">
                                  <Image src={src} fill className="object-cover" alt="Preview" />
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="flex flex-col">
                        <motion.h3 
                          animate={{ y: isHovered ? 0 : 10 }}
                          transition={{ duration: 0.5, ease: easePremium }}
                          className="text-4xl md:text-6xl font-bold tracking-tighter text-[#FCFCFD]"
                        >
                          {item.title}
                        </motion.h3>
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.7, ease: easePremium }}
                          className="overflow-hidden mt-4"
                        >
                          <p className="font-mono text-[10px] tracking-widest uppercase text-[#79C7FF]">{item.subtitle}</p>
                          <p className="font-serif italic text-sm text-[#FCFCFD]/70 mt-2">"{item.description}"</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="py-[140px] max-w-7xl mx-auto px-6 border-t border-[rgba(15,23,42,0.04)] grid grid-cols-1 md:grid-cols-2 gap-[96px]">
            
            <div>
              <div className="mb-[58px]">
                <h2 className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0F172A]/40">System State</h2>
              </div>
              <div className="flex flex-col gap-[31px] p-[31px] bg-[#0F172A] rounded-2xl">
                {currentMetrics.map((metric, i) => (
                  <div key={i} className="flex flex-col group">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#79C7FF]">{metric.label}</span>
                      <span className="text-sm font-light tracking-wide text-[#FCFCFD] group-hover:text-[#79C7FF] transition-colors">{metric.val}</span>
                    </div>
                    <span className="font-mono text-xs tracking-[0.3em] text-[#79C7FF]/40">{metric.progress}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-[58px]">
                <h2 className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0F172A]/40">Artifacts</h2>
              </div>
              <div className="grid grid-cols-3 gap-[12px]">
                {artifacts.map((artifact) => (
                  <motion.div 
                    key={artifact.id}
                    onMouseEnter={() => setHoveredArtifact(artifact.id)}
                    onMouseLeave={() => setHoveredArtifact(null)}
                    className="relative aspect-square bg-[#F6F8FB] rounded-xl overflow-hidden cursor-pointer"
                  >
                    <Image src={artifact.img} fill className="object-cover mix-blend-luminosity opacity-40 hover:opacity-100 transition-opacity duration-700" alt={artifact.label} />
                  </motion.div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {hoveredArtifact && (
                  <motion.div 
                    key={hoveredArtifact}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="mt-[31px]"
                  >
                    <h4 className="font-bold text-[#0F172A]">{artifacts.find(a => a.id === hoveredArtifact)?.label}</h4>
                    <p className="font-serif italic text-sm text-[#0F172A]/50 mt-1">{artifacts.find(a => a.id === hoveredArtifact)?.story}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <footer className="py-[200px] flex flex-col items-center justify-center text-center border-t border-[rgba(15,23,42,0.04)] relative overflow-hidden group">
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#0F172A] tracking-tighter mb-[31px]">
              Let's build something unforgettable.
            </h2>
            <div className="flex gap-[31px] opacity-40 group-hover:opacity-100 transition-opacity duration-1000 z-10">
              <a href="#" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0F172A] hover:text-[#79C7FF] transition-colors">Email</a>
              <a href="#" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0F172A] hover:text-[#79C7FF] transition-colors">GitHub</a>
              <a href="#" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0F172A] hover:text-[#79C7FF] transition-colors">LinkedIn</a>
            </div>
            
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
               <svg className="w-full h-full">
                  <line x1="10%" y1="20%" x2="40%" y2="80%" stroke="#0F172A" strokeWidth="0.5" />
                  <line x1="40%" y1="80%" x2="90%" y2="30%" stroke="#0F172A" strokeWidth="0.5" />
                  <circle cx="10%" cy="20%" r="2" fill="#0F172A" />
                  <circle cx="40%" cy="80%" r="2" fill="#0F172A" />
                  <circle cx="90%" cy="30%" r="2" fill="#0F172A" />
               </svg>
            </div>
          </footer>
        </motion.div>
      </div>
    </motion.div>
  );
}