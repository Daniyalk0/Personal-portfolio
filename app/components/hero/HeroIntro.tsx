"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroIntro() {
  return (
    <div className="absolute bottom-5 left-4 right-4 z-20 flex flex-col-reverse items-start justify-end gap-6 sm:bottom-6 sm:left-6 sm:right-6 sm:flex-row sm:items-end sm:justify-between lg:bottom-8 lg:left-10 lg:right-10">
      {/* Name and Tagline - Reveal Animation */}
      <div className="flex flex-col items-start overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.5 }}
          className="mb-2 ml-1 max-w-[280px] text-[10px] leading-4 text-white sm:ml-2 sm:mb-3 sm:max-w-[360px] sm:text-[15px] sm:leading-5"
        >
          I build thoughtful digital experiences and full-stack web
          applications.
        </motion.p>

        {/* Text Masking Animation */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay:4.5 }}
          
            className="whitespace-nowrap text-[clamp(3.5rem,8vw,7rem)] font-semibold uppercase leading-none tracking-[-0.07em] bg-gradient-to-b from-[#ffd9d9] from-56% to-[rgba(255,0,0,0)] bg-clip-text text-transparent"
          >
            Daniyal
          </motion.h1>
        </div>
      </div>

      {/* Redesigned Profile CTA Card - Spring Pop Animation */}
      <motion.a
      href="#work"
        initial={{ scale: 0.8, opacity: 0 }}
        
        animate={{
          scale: 1,
          opacity: 1,
          // This adds the floating movement:
          y: [0, -10, 0],
        }}
        transition={{
          // Entrance transition
          scale: { type: "spring", stiffness: 200, damping: 15, delay: 4.5 },
          // Continuous loop transition
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.5, // Starts floating after the entrance
          },
        }}
        className="pointer-events-auto group relative flex w-fit cursor-pointer items-center gap-3 border border-white/20 bg-[#e53935] p-2 pr-3 shadow-[8px_8px_0_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[12px_12px_0_rgba(0,0,0,0.2)] sm:gap-4 sm:p-3"
      >
        {/* The content remains the same */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-full top-0 h-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-full" />
        </div>

        <span className="absolute -top-3 left-2 bg-[#e53935] px-1 text-[7px] font-bold uppercase tracking-widest text-white transition-colors group-hover:text-black">
          Work
        </span>

        <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-white/20 sm:h-14 sm:w-14">
          <Image
            src="/daniyal-portrait.png"
            alt="Daniyal"
            fill
            className="object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
          />
        </div>

        <div className="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
          <span className="text-[10px] font-bold uppercase leading-none tracking-tight text-white sm:text-xs">
            See My Work
          </span>
          <span className="mt-0.5 text-[8px] uppercase tracking-wider text-white/70 sm:text-[10px]">
            Explore Projects
          </span>
        </div>

        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#e53935] sm:h-8 sm:w-8">
          <span className="text-xs font-bold">→</span>
        </div>
      </motion.a>
    </div>
  );
}
