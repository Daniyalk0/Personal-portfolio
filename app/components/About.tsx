"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";
import { MaskedReveal } from "@/app/components/ui/Masked-reveal";
import { TextReveal } from "@/app/components/ui/Text-reveal";

// --- Types ---

interface Fragment {
  id: number;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  date?: string;
  rotation: number;
  // Updated to support responsive values
  top: { mobile: string; desktop: string };
  left: { mobile: string; desktop: string };
  zIndex: number;
  size: "sm" | "md" | "lg";
}

const GALLERY_FRAGMENTS: Fragment[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1170&auto=format&fit=crop",
    alt: "Morning light",
    caption: "The first light of day.",
    location: "Woods",
    date: "2024",
    rotation: -4,
    // Increased mobile left from 5% to 15% to keep it on screen
    top: { mobile: "-10%", desktop: "10%" },
    left: { mobile: "0%", desktop: "12%" },
    zIndex: 50,
    size: "md",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    alt: "Coffee",
    caption: "Ideas often start here.",
    location: "Local Café",
    date: "2024",
    rotation: 6,
    top: { mobile: "10%", desktop: "18%" },
    left: { mobile: "50%", desktop: "58%" },
    zIndex: 20,
    size: "sm",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1574848296471-28f79a036f79?q=80&w=764&auto=format&fit=crop",
    alt: "Architecture",
    caption: "Observing structure.",
    location: "Apartments",
    date: "2023",
    rotation: -2,
    top: { mobile: "45%", desktop: "52%" },
    left: { mobile: "-4%", desktop: "10%" },
    zIndex: 30,
    size: "lg",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1570596129250-1d1dc5b9fa51?q=80&w=687&auto=format&fit=crop",
    alt: "Rainy street",
    caption: "Deep focus days.",
    location: "Foggy weather",
    date: "2024",
    rotation: 4,
    top: { mobile: "62%", desktop: "58%" },
    left: { mobile: "40%", desktop: "62%" },
    zIndex: 15,
    size: "md",
  },
];

const PaperFragment = ({ item }: { item: Fragment }) => {
  const sizeClasses = {
    sm: "w-38 sm:w-32 md:w-52",
    md: "w-48 sm:w-40 md:w-64",
    lg: "w-52 sm:w-52 md:w-80",
  };

  return (
    <motion.div
      style={
        {
          "--top-mob": item.top.mobile,
          "--left-mob": item.left.mobile,
          "--top-desk": item.top.desktop,
          "--left-desk": item.left.desktop,
          zIndex: item.zIndex,
        } as any
      }
      // Responsive Positioning
      className={`absolute top-[var(--top-mob)] left-[var(--left-mob)] lg:top-[var(--top-desk)] lg:left-[var(--left-desk)] 
        cursor-pointer group bg-[#f8f2e7] dark:bg-[#12100e]  
        p-2 pb-2 lg:p-3 lg:pb-12
        shadow-[0_4px_12px_rgba(0,0,0,0.1),0_15px_35px_-5px_rgba(0,0,0,0.2)]
        hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)]
        transition-shadow duration-300 ${sizeClasses[item.size]}`}
      // Card movement: SNAPPY
initial={{
  opacity: 0,
  y: 80,
  scale: 0.85,
  rotate: item.rotation + 12,
  filter: "blur(10px)",
}}
whileInView={{
  opacity: 1,
  y: 0,
  scale: 1,
  rotate: item.rotation,
  filter: "blur(0px)",
}}
viewport={{
  once: true,
  margin: "-50px",
}}
transition={{
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.6,

  opacity: {
    duration: 0.4,
  },
  filter: {
    duration: 0.4,
  },
}}
whileHover={{
  rotate: 0,
  scale: 1.05,
  y: -10,
  zIndex: 50,
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 20,
  },
}}
whileTap={{
  scale: 0.98,
}}
    >
      {/* Visual Detail: Matte Washi Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/30 dark:bg-zinc-800/30 backdrop-blur-md border border-white/20 rotate-1 group-hover:-translate-y-1 transition-transform duration-300" />

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
        {/* Continuous Slow Zoom Image */}
        <motion.div
          className="w-full h-full"
          whileHover={{
            scale: 1.2,
            transition: { duration: 10, ease: "linear" }, // Continues zooming as long as hovered
          }}
          transition={{ duration: 0.6, ease: "easeOut" }} // Reset zoom speed
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 30vw"
          />
        </motion.div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      {/* Card Info */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-[12px] md:text-sm font-serif italic text-zinc-800 dark:text-zinc-200 text-center px-2">
          "{item.caption}"
        </p>

        <div className="w-full mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">
            {item.location}
          </span>
          <span className="text-[8px] font-mono text-zinc-400">#{item.id}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const aboutRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    [80, -80]
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="
        relative w-full
        overflow-hidden
        bg-[#f5f3ee]
        py-10
        text-[#111]
        md:pb-16
        md:py-0
        md:pt-6
      "
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-10">

        {/* Header */}
        <header className="mb-12 border-b border-black/15 pb-5 md:mb-16">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50">
              02 / About
            </span>

            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40">
              2026
            </span>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 border-l border-black/10 lg:grid-cols-12">

          {/* Heading */}
          <div className="border-b border-black/10 px-4 pb-12 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-8">

            <motion.div
              ref={aboutRef}
              style={{ y: headingY }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[#e53935]">
                The person behind the code
              </p>

              <MaskedReveal
                delay={0.3}
                duration={1.2}
                direction="up"
              >
                <h2
                  className="
                    text-7xl
                    font-semibold
                    uppercase
                    leading-[0.8]
                    tracking-[-0.07em]
                    md:text-8xl
                  "
                >
                  About
                  <br />
                  <span className="text-[#e53935]">Me.</span>
                </h2>
              </MaskedReveal>
            </motion.div>

          </div>

          {/* Content */}
          <div className="lg:col-span-8">

            {/* Intro + Portrait */}
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Text */}
              <div className="flex flex-col justify-between border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-10 lg:p-12">

                <MaskedReveal
                  delay={0.5}
                  duration={1.2}
                  direction="up"
                >
                  <p className="
                    max-w-xl
                    text-2xl
                    font-serif
                    italic
                    leading-tight
                    md:text-4xl
                  ">
                    Building digital experiences that feel as intentional as a
                    well-bound book.
                  </p>
                </MaskedReveal>

                <TextReveal
                  text="I fell in love with creating things from nothing. I enjoy turning ideas into polished, functional products while continuously exploring frontend, backend, and AI."
                  highlight="creating polished frontend backend AI"
                  highlightClass="text-[#e53935] font-medium"
                  className="
                    mt-16
                    max-w-md
                    text-sm
                    leading-relaxed
                    text-black/55
                  "
                />

              </div>

              {/* Portrait */}
              <div className="relative min-h-[420px]">

                <Image
                  src="/daniyal-portrait.png"
                  alt="Daniyal"
                  fill
                  className="object-cover grayscale"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="
                    bg-[#e53935]
                    px-2 py-1
                    text-[8px]
                    font-mono
                    uppercase
                    tracking-[0.2em]
                    text-white
                  ">
                    Daniyal / Web Developer
                  </span>
                </div>

              </div>

            </div>

            {/* Quote */}
            <div className="border-t border-black/10 p-6 md:p-10 lg:p-12">

              <TextReveal
                text="Software should feel as carefully crafted as the experience it creates."
                highlight="carefully crafted"
                highlightClass="text-[#e53935]"
                className="
                  max-w-4xl
                  text-2xl
                  font-serif
                  italic
                  leading-tight
                  md:text-4xl
                "
              />

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}