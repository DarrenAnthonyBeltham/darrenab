"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ExhibitLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#0B1120]/40">
        Exhibit {num}
      </span>
      <div className="w-12 h-[1px] bg-[#0B1120]/10" />
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#0B1120]/40">
        {title}
      </span>
    </div>
  );
}

function ExhibitLabelDark({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#FFFFFF]/40">
        Exhibit {num}
      </span>
      <div className="w-12 h-[1px] bg-[#FFFFFF]/10" />
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#FFFFFF]/40">
        {title}
      </span>
    </div>
  );
}

export default function GT3RSMuseum() {
  const historyRef = useRef(null);
  const { scrollYProgress: historyProgress } = useScroll({ target: historyRef });
  const historyX = useTransform(historyProgress, [0, 1], ["0%", "-66.66%"]);

  const rpmRef = useRef(null);
  const { scrollYProgress: rpmProgress } = useScroll({ target: rpmRef, offset: ["start end", "end start"] });
  const rpmScale = useTransform(rpmProgress, [0.2, 0.5, 0.8], [0.9, 1, 0.9]);
  const rpmOpacity = useTransform(rpmProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  const historyData = [
    { year: "1973", text: "Carrera RS 2.7. The homologation special that started the pursuit of lightweight precision.", img: "/porsche-1973.jpg" },
    { year: "1999", text: "The 996 GT3. Water-cooled, highly focused, and stripped of all unnecessary luxury.", img: "/porsche-1999.jpg" },
    { year: "2022", text: "The 992 GT3 RS. Aerodynamic limits pushed to the extreme. The absolute peak of the naturally aspirated era.", img: "/porsche-2022.jpg" }
  ];

  const lessons = [
    { id: 1, machine: "Remove everything unnecessary to reduce mass.", arch: "Stripping away bloated logic and redundant dependencies to ensure absolute efficiency and zero-latency experiences." },
    { id: 2, machine: "Optimize for specific, extreme conditions.", arch: "Architecting systems that don't just survive, but thrive under maximum stress and edge cases." },
    { id: 3, machine: "Precision over volume.", arch: "Solving problems through focused, elegant design rather than throwing massive amounts of complexity at them." }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#0B1120] font-sans selection:bg-[#0B1120] selection:text-[#FFFFFF] overflow-x-hidden">
      
      <section className="relative h-screen w-full bg-[#000000]">
        <Image src="/gt3-hero.jpg" fill className="object-cover opacity-60 mix-blend-luminosity brightness-75" alt="Porsche 911 GT3 RS" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-12 right-12 text-right z-10">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#FFFFFF]/60">001 — Porsche 911 GT3 RS / Stuttgart, Germany</p>
        </div>
      </section>

      <section className="relative w-full bg-[#FFFFFF] py-[150px] md:py-[250px]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-24">
          <ExhibitLabel num="01" title="The Philosophy" />
          
          <div className="flex flex-col gap-12 md:gap-24 max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-serif italic font-thin tracking-tighter leading-[1.1] text-[#0B1120]">
              I used to think performance meant horsepower. <br />
              The GT3 RS taught me that performance starts with airflow.
            </h2>
            
            <div className="flex flex-col gap-8 text-xl md:text-3xl font-light leading-relaxed text-[#0B1120]/70 pl-0 md:pl-24">
              <p>
                I used to admire acceleration. Now I admire cooling efficiency.
              </p>
              <p>
                I used to think race cars were just louder sports cars. Now I understand that every single vent, louvre, and wing exists because physics demanded it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#F6F8FB] py-[150px] md:py-[250px]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-24 flex flex-col md:flex-row items-start gap-24">
          <div className="w-full md:w-1/3 sticky top-32">
            <ExhibitLabel num="02" title="The First Time" />
            <h3 className="text-3xl md:text-5xl font-light tracking-tight">The discovery.</h3>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col gap-12 text-lg md:text-2xl font-serif text-[#0B1120]/80 leading-relaxed">
            <p>
              I first discovered the GT3 RS through an onboard Nürburgring lap recommended to me on YouTube. I clicked on it expecting to watch it like a Need for Speed video. 
            </p>
            <p>
              But there was no music. No cinematic camera angles. Just raw mechanical violence, tire scrub, and a naturally aspirated engine screaming at 9,000 RPM.
            </p>
            <p className="italic text-[#0B1120]">
              It completely changed how I looked at Porsche. It wasn't a luxury item. It was a precision instrument.
            </p>
            <div className="w-full aspect-video relative mt-12 bg-[#0B1120] overflow-hidden rounded-sm">
              <Image src="/gt3-onboard.jpg" fill className="object-cover grayscale opacity-80 mix-blend-luminosity" alt="Nurburgring Onboard" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#FFFFFF] py-[150px] md:py-[250px]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-24">
          <ExhibitLabel num="03" title="The Selection" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="flex flex-col gap-12 text-3xl md:text-5xl font-light leading-tight">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                Why not the Turbo S? <br />
                <span className="text-[#0B1120]/40 text-2xl md:text-4xl">It's faster.</span>
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                Why not the GT2 RS? <br />
                <span className="text-[#0B1120]/40 text-2xl md:text-4xl">It's more powerful.</span>
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
                Why not the Carrera GT? <br />
                <span className="text-[#0B1120]/40 text-2xl md:text-4xl">It's more legendary.</span>
              </motion.p>
            </div>
            
            <div className="border-l border-[#0B1120]/10 pl-12 md:pl-24">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#0B1120]/40 mb-8">Because...</p>
              <h2 className="text-4xl md:text-7xl font-serif italic text-[#0B1120] leading-[1.1]">
                The GT3 RS isn't chasing numbers. <br />
                It's chasing perfection.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section ref={historyRef} className="relative h-[300vh] bg-[#0A0A0A]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div className="absolute top-12 left-12 md:top-24 md:left-24 z-20">
            <ExhibitLabelDark num="04" title="The Lineage" />
          </div>
          
          <motion.div style={{ x: historyX }} className="flex w-[300vw] h-full">
            {historyData.map((item, i) => (
              <div key={i} className="relative w-[100vw] h-full flex items-center justify-center p-12 md:p-32">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
                  <span className="text-[30vw] font-bold tracking-tighter leading-none text-[#FFFFFF] select-none">{item.year}</span>
                </div>
                <div className="relative z-10 w-full max-w-4xl aspect-[16/9] overflow-hidden bg-[#111]">
                  <Image src={item.img} fill className="object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-[2s]" alt={item.year} />
                </div>
                <div className="absolute bottom-12 md:bottom-24 left-12 md:left-32 max-w-xl z-20">
                  <p className="font-serif italic text-2xl md:text-4xl text-[#FFFFFF] leading-snug">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={rpmRef} className="relative h-[200vh] bg-[#000000] text-[#FFFFFF]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden p-8">
          <div className="absolute top-12 left-12 md:top-24 md:left-24 z-20">
            <ExhibitLabelDark num="05" title="The Sound" />
          </div>

          <motion.div style={{ scale: rpmScale, opacity: rpmOpacity }} className="text-center z-10 flex flex-col items-center">
            <h2 className="text-[15vw] md:text-[12rem] font-bold tracking-tighter leading-none text-[#FFFFFF]">
              9,000 RPM.
            </h2>
            <p className="mt-12 text-2xl md:text-5xl font-serif italic text-[#FFFFFF]/60 max-w-4xl leading-tight">
              One of the last sounds regulations may never allow again.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full bg-[#FFFFFF] py-[150px] md:py-[250px]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-24">
          <ExhibitLabel num="06" title="The Translation" />

          <div className="flex justify-between border-b border-[#0B1120]/10 pb-8 mb-16">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-40">The Machine</span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-40 text-right">The Architecture</span>
          </div>

          <div className="flex flex-col">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="group relative flex flex-col md:flex-row w-full py-16 border-b border-[#0B1120]/5"
              >
                <div className="w-full md:w-1/2 pr-8 md:pr-24">
                  <h3 className="text-2xl md:text-4xl font-light leading-tight text-[#0B1120]/40 group-hover:text-[#0B1120] transition-colors duration-700">
                    {lesson.machine}
                  </h3>
                </div>
                
                <div className="w-full md:w-1/2 pl-0 md:pl-24 mt-8 md:mt-0">
                  <p className="text-xl md:text-3xl font-serif italic text-[#0B1120] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {lesson.arch}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#F6F8FB] py-[150px] md:py-[250px] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-24">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#0B1120]/40 mb-8">Continue the Exhibition</span>
            <div className="w-[1px] h-24 bg-[#0B1120]/10" />
          </div>

          <div className="flex flex-col gap-12">
            <Link href="/garage/lexus-lfa" className="group relative w-full h-[300px] md:h-[400px] bg-[#000] overflow-hidden rounded-sm flex items-center justify-center">
              <Image src="/lfa-hero.jpg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" alt="Lexus LFA" />
              <div className="relative z-10 text-center">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#FFFFFF]/60 block mb-6">Room 002</span>
                <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#FFFFFF]">Lexus LFA</h3>
              </div>
            </Link>

            <Link href="/garage/ferrari-f40" className="group relative w-full h-[300px] md:h-[400px] bg-[#000] overflow-hidden rounded-sm flex items-center justify-center">
              <Image src="/f40-hero.jpg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" alt="Ferrari F40" />
              <div className="relative z-10 text-center">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#FFFFFF]/60 block mb-6">Room 003</span>
                <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#FFFFFF]">Ferrari F40</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}