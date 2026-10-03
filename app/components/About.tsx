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
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-0">

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
  className="max-md:transform-none!"
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
                    text-[clamp(3.8rem,13vw,12rem)]
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