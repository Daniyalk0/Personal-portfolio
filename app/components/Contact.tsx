"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Copy, Check, MapPin, Mail } from "lucide-react";
import { MaskedReveal } from "@/app/components/ui/Masked-reveal";
import { TextReveal } from "@/app/components/ui/Text-reveal";

/**
 * UTILS & CONSTANTS
 */
const EMAIL = "getdaniyalkhan@gmail.com";
const SOCIAL_LINKS = [
  //   { name: "GitHub", href: "https://github.com", icon: Github },
  //   { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Location", value: "London, UK", icon: MapPin },
];

const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

/**
 * COMPONENTS
 */

const GrainTexture = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const ContactItem = ({
  label,
  value,
  href,
  isCopyable = false,
}: {
  label: string;
  value: string;
  href?: string;
  isCopyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const Action = () => {
    if (isCopyable) {
      return (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="
            group/action
            relative
            flex
            h-10
            min-w-10
            items-center
            justify-center
            overflow-hidden
            border-l
            border-black/15
            pl-5
            sm:h-12
            sm:min-w-12
            sm:pl-7
          "
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.15em]
                  text-[#e53935]
                "
              >
                Copied
              </motion.span>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                className="
                  relative
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  border
                  border-black/20
                  transition-all
                  duration-300
                  group-hover/action:border-[#e53935]
                  group-hover/action:bg-[#e53935]
                "
              >
                <Copy
                  className="
                    h-3
                    w-3
                    transition-colors
                    duration-300
                    group-hover/action:text-white
                  "
                />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      );
    }

    if (!href) return null;

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${label}`}
        className="
          group/action
          relative
          flex
          h-10
          min-w-10
          items-center
          justify-center
          overflow-hidden
          border-l
          border-black/15
          pl-5
          sm:h-12
          sm:min-w-12
          sm:pl-7
        "
      >
        <span
          className="
            absolute
            right-0
            h-8
            w-8
            bg-[#e53935]
            opacity-0
            transition-all
            duration-300
            group-hover/action:opacity-100
          "
        />

        <ArrowUpRight
          className="
            relative
            z-10
            h-5
            w-5
            stroke-[1.5]
            transition-all
            duration-500
            group-hover/action:translate-x-1
            group-hover/action:-translate-y-1
            group-hover/action:text-white
          "
        />
      </a>
    );
  };

  return (
    <div
      className="
        group
        relative
        flex
        items-center
        justify-between
        border-b
        border-black/10
        py-5
        transition-colors
        duration-500
        hover:bg-white/20
        sm:py-6
      "
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.22em]
            text-black/35
          "
        >
          {label}
        </span>

        <span
          className="
            flex
            items-center
            gap-2
            break-all
            text-base
            font-serif
            text-black/80
            transition-transform
            duration-500
            ease-out
            group-hover:translate-x-2
            sm:text-xl
          "
        >
          <span
            className="
              text-[#e53935]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          >
            /
          </span>

          {value}
        </span>
      </div>

      <Action />
    </div>
  );
};


export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 selection:bg-stone-200 dark:selection:bg-stone-800"
    >
      {/* <GrainTexture /> */}

      {/* Top Border Line */}
      <div className="w-full h-px bg-stone-200 dark:bg-stone-800" />

      <div className="container mx-auto px-6 py-20 md:py-20 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* LEFT COLUMN: Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <motion.div
              // initial={{ opacity: 0, y: 40 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true }}
              // transition={transition}
            >
             <h2 className="text-[3.5rem] lg:text-[9rem] font-serif leading-[0.9] text-[#2a231b] dark:text-[#d6caba] transition-colors duration-500">
  <MaskedReveal delay={0.1} className=" pb-2 sm:pb-4">
    <span>Let&apos;s Build</span>
  </MaskedReveal>
  
  <MaskedReveal delay={0.2} className=" pb-2 sm:pb-4">
    <span className="italic">Something</span>
  </MaskedReveal>
  
  <MaskedReveal delay={0.3} className=" pb-2 sm:pb-4">
    <span>Meaningful.</span>
  </MaskedReveal>
</h2>

              <div className="mt-12 max-w-md">
                {/* <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed transition-colors duration-500">
                  I&apos;m currently available for freelance projects, creative
                  collaborations, and full-time opportunities. If you have an
                  idea you&apos;d like to bring to life, I&apos;d love to hear
                  about it.
                </p> */}
                <TextReveal className="text-lg md:text-xl text-[#716350] dark:text-[#9f9080] font-light leading-tight sm:leading-normal transition-colors duration-500" text="I&apos;m currently available for freelance projects, creative collaborations, and full-time opportunities. If you have an idea you&apos;d like to bring to life, I&apos;d love to hear about it."/>

                <div className="mt-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm tracking-widest uppercase text-[#716350] dark:text-[#9f9080] font-medium">
                    Available for new projects — 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Contact Panel */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              className="relative p-8 md:p-12 bg-[#f8f2e7] dark:bg-[#12100e] border border-[#d6c5a8] dark:border-[#2d261f]  rounded-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: 0.2 }}
            >
              {/* Subtle Letterhead Decoration */}
              <div className="absolute top-0 right-12 w-px h-12 bg-[#ede2ca] dark:bg-[#1a1714]" />

              <div className="flex flex-col space-y-2 mb-12">
                <span className="text-xs uppercase tracking-tighter text-stone-400">
                  Correspondence
                </span>
                <h3 className="text-2xl font-serif italic text-stone-800 dark:text-stone-200">
                  Get in touch
                </h3>
              </div>

              <div className="flex flex-col ">
                <ContactItem label="Primary Email" value={EMAIL} isCopyable />
                <ContactItem
                  label="LinkedIn"
                  value="Linkedin.com/Daniyal-khan"
                  href="https://www.linkedin.com/in/daniyal-k-648107263/"
                />
                <ContactItem
                  label="GitHub"
                  value="Github.com/Daniyalk0"
                  href="https://github.com/Daniyalk0"
                />
                <ContactItem
                  label="Current Location"
                  value="New Delhi, India"
                />
              </div>

              <div className="mt-16">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-serif text-stone-900 dark:text-stone-50 hover:italic transition-all duration-300"
                >
                  Send an Email
                  <div className="overflow-hidden">
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowUpRight className="w-8 h-8 stroke-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      FOOTER INTEGRATION
      {/* <footer className="w-full px-6 py-6 border-t border-stone-200 dark:border-stone-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs tracking-[0.3em] uppercase text-[#887d6e] dark:text-[#6e6459] font-medium">
              © 2026 Daniyal
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#716350] dark:text-[#9f9080] font-serif italic">
                Handcrafted with care.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-xs text-[#b5a287] dark:text-[#6c6256]">
              Designed & Developed by Me.
            </span>
      
            <div className="w-24 h-px bg-stone-300 dark:bg-stone-700 mt-2 opacity-50" />
          </div>
        </div>
      </footer> */}
    </section>
  );
}
