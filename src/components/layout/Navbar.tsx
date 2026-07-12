"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden md:flex fixed left-0 top-0 h-screen w-16 bg-[#1C1A24] border-r border-[#49454F] flex-col items-center py-8 z-50"
    >
      <div className="text-[#E6E1E9] font-bold text-xl mb-12 cursor-pointer hover:text-[#7C5CFF] transition-colors">
        D
      </div>
      
      <div className="flex flex-col gap-8 text-[#CAC4D0]">
        <a href="#stories" className="hover:text-[#7C5CFF] transition-colors" aria-label="Music">
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
  );
}