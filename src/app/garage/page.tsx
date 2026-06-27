"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];
const transitionCinematic = { duration: 1.2, ease: easePremium };
const transitionSnap = { duration: 0.8, ease: easePremium };

const principles = [
  {
    id: "performance",
    title: "Performance",
    desc: "Numbers matter. But the pursuit behind those numbers matters more."
  },
  {
    id: "emotion",
    title: "Emotion",
    desc: "An LFA isn't remembered because of horsepower. It's remembered because of how it sounds."
  },
  {
    id: "engineering",
    title: "Engineering",
    desc: "I admire cars that solve impossible problems through sheer mechanical willpower."
  }
];

const collection = [
  {
    id: "porsche-911-gt3-rs",
    title: "911 GT3 RS",
    make: "Porsche",
    country: "Germany",
    year: "2022",
    quote: "The last naturally aspirated obsession.",
    image: "/gt3-hero.jpg"
  },
  {
    id: "lexus-lfa",
    title: "LFA",
    make: "Lexus",
    country: "Japan",
    year: "2010",
    quote: "Emotion translated through acoustic engineering.",
    image: "/lfa-hero.jpg"
  },
  {
    id: "pagani-huayra",
    title: "Huayra",
    make: "Pagani",
    country: "Italy",
    year: "2011",
    quote: "Where carbon titanium becomes high art.",
    image: "/huayra-hero.jpg"
  }
];

const timeline = [
  { year: "2019", text: "First time I truly discovered Porsche." },
  { year: "2021", text: "Started learning the depths of engineering." },
  { year: "2023", text: "Appreciated motorsport and aerodynamic intent." },
  { year: "Today", text: "Still obsessed with the mechanics of perfection." },
];

export default function GarageCollection() {
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#FCFCFD] text-[#0F172A] font-sans selection:bg-[#EAF5FF] selection:text-[#79C7FF] min-h-screen">
      
      <header className="fixed top-8 left-8 z-50 mix-blend-difference">
        <Link href="/" className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FCFCFD]/60 hover:text-[#FCFCFD] transition-colors">
          Darren.
        </Link>
      </header>

      <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <Image src="/garage-hero.jpg" fill className="object-cover opacity-30 mix-blend-luminosity" alt="Garage" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCFCFD] via-transparent to-transparent opacity-10" />
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <h1 className="text-7xl md:text-[11rem] font-serif italic font-thin tracking-tighter text-[#FCFCFD] leading-[0.9]">
            Garage.
          </h1>
          <p className="mt-8 text-xl md:text-3xl font-light text-[#FCFCFD]/60 max-w-2xl">
            Machines built to make people feel.
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#79C7FF]">
            Not every car belongs here. Only the ones that changed how I think.
          </p>
        </motion.div>
      </section>

      <section className="py-[140px] max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-[96px] items-start">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={transitionCinematic}
          className="text-4xl md:text-7xl font-light tracking-tight leading-tight"
        >
          Cars taught me <br />
          that engineering <br />
          can become <span className="font-serif italic text-[#79C7FF]">art.</span>
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, ...transitionCinematic }}
          className="text-lg md:text-xl font-serif text-[#0F172A]/70 leading-relaxed pt-4"
        >
          <p className="mb-6">
            It started with Need for Speed and Top Gear. I used to look at cars as shapes and top speeds. But as I started writing code and building systems, my perspective shifted.
          </p>
          <p>
            I stopped looking at the shell and started looking at the constraints. How do you manage thermals? How do you manipulate air? How do you translate thousands of explosions per minute into a feeling of absolute control?
          </p>
        </motion.div>
      </section>

      <section className="py-[96px] max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          {principles.map((p) => {
            const isActive = activePrinciple === p.id;
            return (
              <motion.div 
                key={p.id}
                onClick={() => setActivePrinciple(isActive ? null : p.id)}
                className={`border-b border-[#0F172A]/10 overflow-hidden cursor-pointer transition-colors duration-700 ${isActive ? "bg-[#F6F8FB]" : "hover:bg-[#F6F8FB]/50"}`}
              >
                <div className="py-8 px-6 flex justify-between items-center">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{p.title}</h3>
                  <span className="font-mono text-xl text-[#0F172A]/30">{isActive ? "−" : "＋"}</span>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={transitionSnap}
                    >
                      <p className="px-6 pb-12 text-xl font-serif italic text-[#0F172A]/60 max-w-2xl">
                        {p.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-[140px] max-w-[1800px] mx-auto px-6">
        <div className="mb-[96px] text-center">
          <h2 className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0F172A]/40">The Museum</h2>
        </div>
        <div className="flex flex-col gap-[31px]">
          {collection.map((car) => (
            <Link key={car.id} href={`/garage/${car.id}`}>
              <motion.div 
                className="group relative h-[600px] md:h-[800px] w-full bg-[#0F172A] rounded-2xl overflow-hidden"
              >
                <Image src={car.image} fill className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]" alt={car.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
                
                <div className="absolute inset-0 p-[31px] md:p-[58px] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FCFCFD]/60 mix-blend-overlay">{car.country}</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[#FCFCFD]/60 mix-blend-overlay">{car.year}</span>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#79C7FF] mb-4">{car.make}</h4>
                    <h3 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-[#FCFCFD] leading-none mb-6">
                      {car.title}
                    </h3>
                    <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out">
                      <p className="font-serif italic text-xl md:text-2xl text-[#FCFCFD]/80">"{car.quote}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-[140px] max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-[58px] md:gap-[140px]">
          {timeline.map((step, i) => (
            <div key={i} className="flex flex-col gap-4 relative flex-1">
              <div className="absolute top-2 left-0 w-full h-[1px] bg-[#0F172A]/10 hidden md:block" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#79C7FF] relative z-10" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#0F172A]/40 mt-4">{step.year}</span>
              <p className="font-serif text-[#0F172A] text-lg">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-[200px] flex flex-col items-center justify-center text-center border-t border-[#0F172A]/5 px-6">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0F172A] mb-[58px] leading-tight">
          I don't dream about owning every car. <br />
          <span className="font-serif italic text-[#79C7FF]">I dream about understanding why great ones exist.</span>
        </h2>
      </footer>
    </div>
  );
}