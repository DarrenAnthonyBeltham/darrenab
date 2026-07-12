"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      whileTap={{ scale: 0.92, transition: { type: "spring", stiffness: 500, damping: 15, mass: 1.5 } }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.05, delay: index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HobbyPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEngineOn, setIsEngineOn] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const engineAudioRef = useRef<HTMLAudioElement>(null);
  const cinematicRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const cycleSpeed = () => {
    const newRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleEngine = () => {
    if (engineAudioRef.current) {
      if (isEngineOn) {
        engineAudioRef.current.pause();
        engineAudioRef.current.currentTime = 0;
        setIsEngineOn(false);
      } else {
        engineAudioRef.current.play()
          .then(() => setIsEngineOn(true))
          .catch(() => setIsEngineOn(false));
      }
    }
  };

  const heroVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const { scrollYProgress: cinematicProgress } = useScroll({
    target: cinematicRef,
    offset: ["start end", "end start"],
  });
  const cinematicY = useTransform(cinematicProgress, [0, 1], [-50, 50]);

  return (
    <div className="min-h-screen bg-[#14121B] text-[#E6E1E9] font-sans selection:bg-[#7C5CFF] selection:text-[#14121B] flex overflow-hidden">
      
      <audio 
        ref={audioRef} 
        src="/CAS-Touch.mp3" 
        loop 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <motion.nav
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-16 bg-[#1C1A24] border-r border-[#49454F] flex-col items-center py-8 z-50"
      >
        <a href="#hero" className="text-[#E6E1E9] font-bold text-xl mb-12 cursor-pointer hover:text-[#7C5CFF] transition-colors">
          D
        </a>
        <div className="flex flex-col gap-8 text-[#CAC4D0]">
          <a href="#music" className="hover:text-[#7C5CFF] transition-colors" aria-label="Music">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </a>
          <a href="#movie" className="hover:text-[#7C5CFF] transition-colors" aria-label="Movie">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M7 3v18"></path>
              <path d="M3 7.5h4"></path>
              <path d="M3 12h18"></path>
              <path d="M3 16.5h4"></path>
              <path d="M17 3v18"></path>
              <path d="M17 7.5h4"></path>
              <path d="M17 16.5h4"></path>
            </svg>
          </a>
          <a href="#cars" className="hover:text-[#7C5CFF] transition-colors" aria-label="Cars">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <path d="M9 17h6"></path>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
          </a>
          <a href="#play" className="hover:text-[#7C5CFF] transition-colors" aria-label="Football">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m12 16 3-3-1-4-4 0-1 4z"></path>
              <path d="m12 16 0 6"></path>
              <path d="m15 13 4 2"></path>
              <path d="m14 9 3-5"></path>
              <path d="m10 9-3-5"></path>
              <path d="m9 13-4 2"></path>
            </svg>
          </a>
        </div>
      </motion.nav>

      <main className="flex-1 w-full md:ml-16">
        <header
          className={`fixed top-0 left-0 md:left-16 right-0 z-40 transition-all duration-300 ${
            isScrolled ? "bg-[#14121B]/80 backdrop-blur-md border-b border-[#49454F]" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full">
            <div className="text-sm font-medium tracking-widest text-[#CAC4D0]">OBSERVATORY</div>
            
            {isPlaying && (
              <div className="flex items-center gap-1">
                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 / playbackRate }} className="w-1 bg-[#7C5CFF]" />
                <motion.div animate={{ height: [12, 24, 12] }} transition={{ repeat: Infinity, duration: 1.2 / playbackRate }} className="w-1 bg-[#7C5CFF]" />
                <motion.div animate={{ height: [8, 18, 8] }} transition={{ repeat: Infinity, duration: 1.0 / playbackRate }} className="w-1 bg-[#7C5CFF]" />
              </div>
            )}
          </div>
        </header>

        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1C1A24] via-[#14121B] to-[#14121B]"
          />
          
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            <motion.h3
              variants={heroItemVariants}
              className="text-[#7C5CFF] tracking-[0.3em] text-sm uppercase mb-6 font-medium"
            >
              Personal Universe V1.0
            </motion.h3>
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              BUILDING WORLDS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#D0BCFF]">
                THROUGH OBSESSION
              </span>
            </motion.h1>
            <motion.p
              variants={heroItemVariants}
              className="max-w-2xl text-[#CAC4D0] text-lg leading-relaxed mb-16"
            >
              Welcome to my digital observatory. A curated collection of passions,
              ranging from the cinematic lens to the mechanical soul. Explore the
              artifacts that fuel my creative process.
            </motion.p>
          </motion.div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#7C5CFF]">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="w-[1px] h-12 bg-gradient-to-b from-[#7C5CFF] to-transparent"
            />
          </div>
        </section>

        <section id="music" className="py-32 px-8 md:px-16 lg:px-24 bg-[#14121B] border-y border-[#49454F] overflow-hidden relative">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spinVinyl {
              100% { transform: rotate(360deg); }
            }
            .vinyl-animate {
              animation: spinVinyl 4s linear infinite;
            }
            .is-playing {
              animation-play-state: running;
            }
            .is-paused {
              animation-play-state: paused;
            }
          `}} />
          
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center relative z-10">
            
            <div className="w-full lg:w-1/2 flex justify-center relative h-[450px] items-center">
              <AnimatePresence>
                {isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1 }}
                    className="absolute w-80 h-80 rounded-full bg-[#7C5CFF] blur-[70px] z-0"
                  />
                )}
              </AnimatePresence>

              <div 
                className={`relative w-80 h-80 rounded-full bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#222] flex items-center justify-center z-10 vinyl-animate ${isPlaying ? 'is-playing' : 'is-paused'}`}
                style={{ animationDuration: `${4 / playbackRate}s` }}
              >
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,transparent_0deg,rgba(255,255,255,0.08)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.08)_225deg,transparent_270deg)] pointer-events-none mix-blend-screen" />
                
                <div className="absolute w-[92%] h-[92%] rounded-full border border-white/5" />
                <div className="absolute w-[84%] h-[84%] rounded-full border border-white/5" />
                <div className="absolute w-[76%] h-[76%] rounded-full border border-white/5" />
                <div className="absolute w-[68%] h-[68%] rounded-full border border-white/5" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-white/5" />
                <div className="absolute w-[52%] h-[52%] rounded-full border border-white/5" />

                <div className="relative w-28 h-28 rounded-full bg-[#14121B] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden border border-[#333]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#7C5CFF_150%)] opacity-30" />
                  
                  <div className="absolute top-4 w-full text-center">
                    <span className="text-[11px] text-[#7C5CFF] font-bold tracking-[0.25em]">CAS</span>
                  </div>
                  
                  <div className="w-4 h-4 rounded-full bg-[#0a0a0a] z-20 border border-[#222] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]" />
                  
                  <div className="absolute bottom-5 w-full text-center">
                    <span className="text-[9px] text-[#CAC4D0] font-mono tracking-widest uppercase">TOUCH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "32px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="h-[1px] bg-[#D0BCFF]"
                />
                <span className="text-xs tracking-widest text-[#D0BCFF] uppercase">Sonic Frequencies</span>
              </div>
              
              <motion.h2 
                animate={isPlaying ? { 
                  scale: [1, 1.01, 1], 
                  textShadow: ["0px 0px 0px rgba(124,92,255,0)", "0px 0px 15px rgba(124,92,255,0.4)", "0px 0px 0px rgba(124,92,255,0)"] 
                } : {}}
                transition={{ repeat: Infinity, duration: 0.6 / playbackRate, ease: "easeInOut" }}
                className="text-4xl font-semibold mb-6 text-[#E6E1E9] tracking-tight"
              >
                The rhythm of the background.
              </motion.h2>
              
              <p className="text-[#CAC4D0] leading-relaxed mb-10 text-lg">
                Music is the anchor to my creative rhythm. My rotation is a curated chaos—bouncing from the raw, high-octane energy of Rap and UK Drill, to the nostalgic warmth of Indo classics, down into the deep, atmospheric melancholy of Cigarettes After Sex. It&apos;s a sonic architecture that shifts with my mood, turning isolated hours into structured symphonies.
              </p>

              <div className="bg-[#1C1A24]/40 border border-[#49454F]/60 rounded-2xl p-8 mb-10 relative overflow-hidden backdrop-blur-md shadow-2xl">
                <svg className="absolute right-6 top-8 w-24 h-24 text-[#7C5CFF] opacity-[0.03] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 18V5l12-2v13M6 18a3 3 0 100-6 3 3 0 000 6zM18 16a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                
                <div className="flex justify-between items-end mb-8 relative z-10">
                  <div>
                    <div className="text-xs tracking-widest text-[#7C5CFF] uppercase mb-4 flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C5CFF] opacity-75" style={{ animationDuration: `${1 / playbackRate}s` }}></span>}
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-[#7C5CFF]' : 'bg-[#49454F]'}`}></span>
                      </span>
                      {isPlaying ? 'SYS.AUDIO // ACTIVE' : 'SYS.AUDIO // STANDBY'}
                    </div>
                    <div className="text-2xl font-medium text-[#E6E1E9] tracking-wide mb-1">Touch</div>
                    <div className="text-[15px] text-[#CAC4D0]">Cigarettes After Sex</div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-end gap-[2px] h-4 mb-4 opacity-80">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: isPlaying ? ["20%", "100%", "30%", "80%", "20%"] : "20%" }}
                          transition={{ repeat: Infinity, duration: (0.8 + (i * 0.2)) / playbackRate, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                          className="w-[3px] bg-[#7C5CFF] rounded-t-sm"
                        />
                      ))}
                    </div>
                    <div className="text-[10px] text-[#49454F] tracking-widest uppercase mb-1">Genre</div>
                    <div className="text-xs text-[#CAC4D0] tracking-widest uppercase">Dream Pop</div>
                  </div>
                </div>

                <div 
                  className="w-full h-[6px] bg-[#49454F]/30 rounded-full relative overflow-hidden mb-4 cursor-pointer group"
                  ref={progressRef}
                  onClick={handleSeek}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#7C5CFF] shadow-[0_0_10px_#7C5CFF] group-hover:bg-[#D0BCFF] transition-colors"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[11px] text-[#49454F] font-mono tracking-widest">
                  <span className="w-12">{formatTime(currentTime)}</span>
                  <button 
                    onClick={cycleSpeed}
                    className="px-2 py-1 rounded border border-[#49454F]/50 text-[#CAC4D0] hover:text-[#7C5CFF] hover:border-[#7C5CFF] transition-colors"
                  >
                    {playbackRate.toFixed(1)}x
                  </button>
                  <span className="w-12 text-right">{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <MagneticButton 
                  onClick={toggleMusic}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#49454F] text-sm tracking-widest text-[#E6E1E9] hover:border-[#7C5CFF] hover:bg-[#7C5CFF]/5 transition-all duration-300 cursor-pointer group bg-transparent"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-4 h-4 text-[#EFB8C8] group-hover:drop-shadow-[0_0_8px_rgba(239,184,200,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                      PAUSE TRANSMISSION
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-[#7C5CFF] group-hover:drop-shadow-[0_0_8px_rgba(124,92,255,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      INITIALIZE PLAYBACK
                    </>
                  )}
                </MagneticButton>

                <a 
                  href="/music" 
                  className="flex items-center gap-3 text-xs tracking-widest text-[#CAC4D0] hover:text-[#E6E1E9] transition-colors group"
                >
                  EXPLORE ARCHIVE
                  <motion.span
                    className="text-[#7C5CFF]"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <motion.section 
          id="movie" 
          className="py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
          onViewportEnter={() => {
            if (audioRef.current && isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }}
          viewport={{ amount: 0.3 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/3 bg-[#1C1A24] p-8 md:p-12 rounded-2xl border border-[#49454F] relative z-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#CAC4D0]" />
                <span className="text-xs tracking-widest text-[#CAC4D0]">ACT 01</span>
              </div>
              <h2 className="text-2xl font-semibold mb-6 text-[#E6E1E9]">
                Living a thousand lives <br />
                <span className="text-[#7C5CFF] italic">through the silver screen.</span>
              </h2>
              <p className="text-[#CAC4D0] leading-relaxed mb-10">
                For me, cinema is the ultimate empathy machine. I have a profound love for the medium because it lets me step entirely outside my own reality. Whether it is the gritty, neon-soaked streets of a cyberpunk future, the sweeping scale of a sci-fi epic like Interstellar, or the quiet tension between dialogue in a drama—movies shape the way I perceive the world and fuel my own visual creativity.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="px-6 py-2 rounded-full border border-[#49454F] text-xs tracking-widest hover:border-[#7C5CFF] hover:text-[#7C5CFF] transition-colors cursor-pointer bg-[#14121B]">
                  SCI-FI
                </MagneticButton>
                <MagneticButton className="px-6 py-2 rounded-full border border-[#49454F] text-xs tracking-widest hover:border-[#7C5CFF] hover:text-[#7C5CFF] transition-colors cursor-pointer bg-[#14121B]">
                  CINEMATOGRAPHY
                </MagneticButton>
              </div>
            </motion.div>

            <div className="w-full lg:w-2/3 relative h-[600px]">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute top-[-30px] left-0 text-xs text-[#EFB8C8] font-mono tracking-widest">
                  <TypewriterText text="SYS.READ // 100%" />
                </div>
                <div className="w-full h-full rounded-2xl overflow-hidden border border-[#49454F] bg-[#000000]">
                  <div className="w-full h-full relative flex items-center justify-center">
                    <video
                      src="/CMBYN-Dad-Scene.mp4"
                      autoPlay
                      loop
                      playsInline
                      controls
                      className="object-contain w-full h-full opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14121B]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section id="cars" className="py-32 px-8 md:px-16 lg:px-24 bg-[#1C1A24]/30 border-y border-[#49454F] relative overflow-hidden">
          <audio ref={engineAudioRef} src="/engine.mp3" />
          
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#E6E1E9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center relative z-10">
            <div className="w-full lg:w-1/2 relative h-[600px]">
              <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full rounded-2xl overflow-hidden relative border border-[#49454F] group bg-black"
              >
                <div className="absolute inset-0 bg-[#7C5CFF]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <video
                  src="/Porsche-992-GT3-Touring.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-1 hidden md:flex">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ opacity: isEngineOn ? [1, 0.5, 1] : 1 }} 
                      transition={{ repeat: Infinity, duration: isEngineOn ? 0.5 : 2 }}
                      className={`w-2 h-2 rounded-full ${isEngineOn ? 'bg-[#EFB8C8] shadow-[0_0_8px_#EFB8C8]' : 'bg-[#7C5CFF] shadow-[0_0_8px_#7C5CFF]'}`}
                    />
                    <span className="text-[10px] tracking-widest text-[#E6E1E9] uppercase font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                      {isEngineOn ? 'ENG.SYS_ACTIVE' : 'ENG.SYS_STANDBY'}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 z-20 flex gap-1 items-end h-10">
                  {[
                    { peak: "25px", duration: 0.25 },
                    { peak: "40px", duration: 0.35 },
                    { peak: "15px", duration: 0.20 },
                    { peak: "35px", duration: 0.40 },
                    { peak: "20px", duration: 0.28 },
                    { peak: "38px", duration: 0.32 },
                    { peak: "18px", duration: 0.22 }
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isEngineOn ? ["10px", bar.peak, "10px"] : "10px" }}
                      transition={{ repeat: Infinity, duration: isEngineOn ? bar.duration : 0, ease: "easeInOut" }}
                      className={`w-1.5 ${i > 4 ? 'bg-[#EFB8C8]' : 'bg-[#7C5CFF]'} rounded-sm opacity-80`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "32px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="h-[1px] bg-[#7C5CFF]"
                />
                <span className="text-xs tracking-widest text-[#7C5CFF] uppercase">The Mechanical Soul</span>
              </div>
              
              <h2 className="text-4xl font-semibold mb-6 text-[#E6E1E9] tracking-tight">
                Man, machine, and the asphalt.
              </h2>
              
              <p className="text-[#CAC4D0] leading-relaxed mb-10 text-lg">
                For me, cars are far more than transportation; they are kinetic art. There is an undeniable romance in the marriage of analog machinery and human input—the mechanical, tactile throw of a manual shifter, the visceral, echoing howl of a naturally aspirated flat-six, and the timeless, purposeful silhouette of a Porsche 911. It is engineering pushed to the absolute edge of physics.
              </p>

              <div className="bg-[#14121B] border border-[#49454F] rounded-xl overflow-hidden relative mb-10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFF]/5 to-transparent pointer-events-none" />
                
                <div className="p-6 border-b border-[#49454F]/50 relative z-10 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] tracking-widest text-[#49454F] uppercase mb-2 font-mono">
                    <span>Telemetry</span>
                    <span>Status</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-[#1C1A24] rounded-full overflow-hidden">
                    <motion.div 
                      animate={isEngineOn ? { width: ["70%", "95%", "80%", "90%", "75%"] } : { width: "0%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#EFB8C8]"
                    />
                  </div>
                  <div className="text-right text-[10px] text-[#EFB8C8] tracking-widest font-mono mt-1">
                    {isEngineOn ? 'RPM_LIMITER // ACTIVE' : 'RPM_LIMITER // OFFLINE'}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-[#49454F]/50 relative z-10">
                  <div className="p-6 flex flex-col gap-1">
                    <span className="text-[10px] text-[#49454F] tracking-widest uppercase">Platform</span>
                    <span className="text-sm text-[#E6E1E9] font-medium">Rear-Engine</span>
                  </div>
                  <div className="p-6 flex flex-col gap-1">
                    <span className="text-[10px] text-[#49454F] tracking-widest uppercase">Aspiration</span>
                    <span className="text-sm text-[#E6E1E9] font-medium">N/A</span>
                  </div>
                  <div className="p-6 flex flex-col gap-1 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-[#49454F]/50">
                    <span className="text-[10px] text-[#49454F] tracking-widest uppercase">Discipline</span>
                    <span className="text-sm text-[#7C5CFF] font-medium">Track & Canyon</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <MagneticButton 
                  onClick={toggleEngine}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#49454F] text-sm tracking-widest text-[#E6E1E9] hover:border-[#7C5CFF] hover:bg-[#7C5CFF]/5 transition-all duration-300 cursor-pointer group bg-transparent"
                >
                  {isEngineOn ? (
                    <>
                      <svg className="w-4 h-4 text-[#EFB8C8] group-hover:drop-shadow-[0_0_8px_rgba(239,184,200,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      CUT IGNITION
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-[#7C5CFF] group-hover:drop-shadow-[0_0_8px_rgba(124,92,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      START ENGINE
                    </>
                  )}
                </MagneticButton>

                <a 
                  href="/garage" 
                  className="flex items-center gap-3 text-xs tracking-widest text-[#CAC4D0] hover:text-[#E6E1E9] transition-colors group"
                >
                  ENTER GARAGE
                  <motion.span
                    className="text-[#7C5CFF]"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="play" className="py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "32px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                  className="h-[1px] bg-[#EFB8C8]"
                />
                <span className="text-xs tracking-widest text-[#EFB8C8] uppercase">The Beautiful Game</span>
              </div>
              
              <h2 className="text-3xl font-semibold mb-6 text-[#E6E1E9]">
                Poetry in motion on the pitch.
              </h2>
              
              <p className="text-[#CAC4D0] leading-relaxed mb-10">
                For me, the pitch is another canvas. Whether it is analyzing the tactical geometry of 
                El Clásico or appreciating the sheer artistry of the greatest to ever wear the number 10, 
                football represents the ultimate combination of vision, execution, and legacy. It is a 
                global language that transcends borders.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#49454F] rounded-lg p-6 bg-[#1C1A24]">
                  <div className="text-3xl text-[#7C5CFF] font-bold mb-2">10</div>
                  <div className="text-xs text-[#CAC4D0] tracking-widest">THE VISIONARY</div>
                </div>
                <div className="border border-[#49454F] rounded-lg p-6 bg-[#1C1A24]">
                  <div className="text-3xl text-[#7C5CFF] font-bold mb-2">1899</div>
                  <div className="text-xs text-[#CAC4D0] tracking-widest">ESTABLISHED</div>
                </div>
              </div>
            </motion.div>

            <div className="w-full lg:w-1/2 relative h-[500px]">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full h-full rounded-2xl overflow-hidden border border-[#49454F] relative bg-[#1C1A24]"
              >
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(124,92,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                <Image
                  src="/placeholder-football.jpg"
                  alt="Football stadium aesthetic"
                  fill
                  className="object-cover opacity-50 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#49454F] pt-24 pb-12 px-8 md:px-16 lg:px-24 bg-[#14121B]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ letterSpacing: "0.1em", opacity: 0 }}
                whileInView={{ letterSpacing: "0.3em", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-5xl md:text-7xl font-bold text-[#CAC4D0]">
                  DARREN
                </h2>
                
                <div className="w-48 h-[2px] mt-4 bg-[#1C1A24] relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-[#7C5CFF] to-transparent"
                  />
                </div>
              </motion.div>

              <div className="flex gap-8 text-sm tracking-widest text-[#CAC4D0]">
                {["LINKEDIN", "GITHUB", "INSTAGRAM"].map((link, i) => (
                  <motion.a
                    key={link}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="hover:text-[#7C5CFF] transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full md:w-auto">
              {[
                { name: "ARCHIVES", delay: 0 },
                { name: "PROCESS", delay: 0.1 },
                { name: "CONTACT", delay: 0.2 },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  className="flex items-center justify-between gap-12 group text-[#CAC4D0] hover:text-[#E6E1E9] border-b border-[#49454F] pb-4"
                >
                  <span className="tracking-widest text-sm">{item.name}</span>
                  <motion.span
                    className="text-[#7C5CFF]"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-24 text-sm text-[#49454F]">
            © 2026 Darren. Built for the Cosmic Web.
          </div>
        </footer>
      </main>
    </div>
  );
}