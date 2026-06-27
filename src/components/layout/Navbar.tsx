"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { num: "01", label: "Stories", href: "#stories" },
    { num: "02", label: "Cars", href: "#cars" },
    { num: "03", label: "Sound", href: "#sound" },
    { num: "04", label: "Play", href: "#play" },
    { num: "05", label: "Signal", href: "#signal" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? "bg-[#FCFCFD]/95 backdrop-blur-[20px] border-b border-[rgba(15,23,42,0.04)] shadow-[0_4px_30px_rgba(15,23,42,0.03)] py-4"
          : "bg-transparent border-transparent py-8"
      }`}
    >
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-[#79C7FF] origin-left"
        style={{ scaleX, width: "100%" }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex justify-between items-center">
        
        <Link href="/" className="text-3xl font-serif italic text-[#0F172A] hover:text-[#79C7FF] transition-colors duration-700">
          D.
        </Link>
        
        <div className="hidden md:flex items-center gap-12 lg:gap-16">
          {navItems.map((item) => (
            <Link key={item.num} href={item.href} className="group flex items-baseline gap-3 cursor-pointer">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#0F172A]/30 group-hover:text-[#79C7FF] transition-colors duration-500">
                {item.num}
              </span>
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[10px] uppercase tracking-[0.2em] text-[#0F172A]/70 group-hover:text-[#0F172A] transition-colors duration-500"
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5 cursor-default">
          <div className="flex flex-col text-right">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#0F172A]/40 mb-0.5">WIB (GMT+7)</span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#0F172A]">Building CoreDigital</span>
          </div>
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#79C7FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0EA5E9]" />
          </div>
        </div>

      </div>
    </motion.nav>
  );
}