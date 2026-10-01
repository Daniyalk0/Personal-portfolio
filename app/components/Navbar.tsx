"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Moon, Sun, Circle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MorphingText } from "@/app/components/ui/morphing-text";

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

// --- Sub-components ---

const NavLink = ({
  item,
  isActive,
  scrolled,
  onClick,
}: {
  item: NavItem;
  isActive?: boolean;
  scrolled: boolean;
  onClick?: () => void;
}) => {
  const textColor = `transition-colors duration-300 ${scrolled ? "text-black" : "text-[#ffa8a8] dark:text-[#f9ebdc]"}`;

  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      className="group relative flex items-center gap-2 py-2 overflow-hidden"
      whileHover="hover"
      initial="initial"
    >
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={textColor}
          >
            ✦
          </motion.span>
        )}
        {!isActive && (
          <motion.span
            variants={{
              initial: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 },
            }}
            className={textColor}
          >
            ◇
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        variants={{
          initial: { y: 0 },
          hover: { y: -2 },
        }}
        transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }}
        className={`text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
          scrolled
            ? "text-[#212121]  hover:text-black"
            : isActive
              ? "text-[hsl(0,100%,96%)]"
              : "text-[#ffc2c2] group-hover:text-[hsl(0,100%,96%)] "
        }`}
      >
        {item.label}
      </motion.span>
    </motion.a>
  );
};

export default function EditorialNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#Work");

  // Editorial Scroll Transition
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const footerInView = footer
        ? footer.getBoundingClientRect().top <= window.innerHeight * 0.65
        : false;

      setScrolled(window.scrollY > 300 && !footerInView);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      setActiveSection(window.location.hash || "#work");
    };

    updateActiveSection();

    window.addEventListener("hashchange", updateActiveSection);

    return () => window.removeEventListener("hashchange", updateActiveSection);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section>
      <div className="fixed top-0 left-0 w-full h-[80px] z-[500] overflow-hidden pointer-events-none">
        <header
          className={`relative w-full pointer-events-auto border-b transition-all duration-300 ease-in-out ${
            scrolled
              ? "py-4 bg-[#f9f5ef] dark:bg-[#12100e]  backdrop-blur-sm border-neutral-200 dark:border-neutral-800"
              : "py-8 bg-transparent border-transparent"
          }`}
        >
          <div className="container mx-auto px-6 max-w-[1400px]">
            <nav
              className="flex items-center justify-between"
              role="navigation"
            >
              {/* Left: Identity Block */}
              <Link href="/" className="group flex flex-col">
                {/* <span className="text-2xl font-serif tracking-tight text-[#393025] dark:text-[#f9ebdc] leading-none">
                  Daniyal
                </span> */}
                <MorphingText
                  texts={[
                    "Full-Stack Developer",
                    "Software Engineer",
                    "Frontend Developer",
                  ]}
                  className={`text-[12px] sm:text-[15px]  ml-[2px] tracking-[0.25em] ${scrolled ? "text-[#212121]" : "text-[#fedede] group-hover:text-neutral-600"} font-serif
                    italic transition-colors duration-300`}
                />
              </Link>

              {/* Center: Desktop Links */}
              <div className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    item={item}
                    isActive={activeSection === item.href}
                    scrolled={scrolled}
                  />
                ))}
              </div>

              {/* Right: Status & Toggle */}
              <div className="flex items-center gap-8">
                <div className="hidden lg:flex">
                  <div
                    className={`group relative overflow-hidden flex items-center gap-3 rounded-full border px-4 py-2 transition-all duration-300 ease-out ${
                      scrolled
                        ? "border-neutral-200 bg-neutral-100"
                        : "border border-white/20 bg-[#e53935] shadow-[8px_8px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    {/* Constant shimmer */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-full" />

                    {/* Status dot */}
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                    </div>

                    <span
                      className={`relative text-[10px] uppercase tracking-[0.25em] font-medium transition-colors duration-300 ${
                        scrolled ? "text-black" : "text-white"
                      }`}
                    >
                      Available to Build
                    </span>
                  </div>
                </div>

                {/* Mobile "INDEX" Trigger */}
                <button
                  onClick={() => setIsOpen(true)}
                  className={`md:hidden text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-[#d6c5a8] dark:border-[#2d261f] rounded-full transition-all ${scrolled ? "text-black" : "text-[#fedede] "}`}
                >
                  Index
                </button>

                {/* <ThemeToggle /> */}
              </div>
            </nav>
          </div>

          {/* Full-Screen Editorial Mobile Menu */}
        </header>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
    fixed inset-0 z-[1000]
    overflow-hidden
    bg-[#e53935]
    text-[#f9d9d8]
  "
          >
            {/* Editorial background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              {/* Large faded name */}
              <div
                className="
        absolute -bottom-8 left-1/2
        -translate-x-1/2
        whitespace-nowrap
        font-serif text-[34vw] leading-none
        tracking-[-0.07em]
        text-white/[0.07]
      "
              >
                Daniyal
              </div>

              {/* Vertical grid */}
              <div className="absolute left-6 top-0 h-full border-l border-white/10" />
              <div className="absolute right-6 top-0 h-full border-r border-white/10" />

              {/* Horizontal grid */}
              <div className="absolute left-0 right-0 top-[18%] border-t border-white/10" />
              <div className="absolute left-0 right-0 bottom-[18%] border-t border-white/10" />

              {/* Corner marks */}
              <span className="absolute left-6 top-6 h-2 w-2 border-l border-t border-white/50" />
              <span className="absolute right-6 top-6 h-2 w-2 border-r border-t border-white/50" />
              <span className="absolute left-6 bottom-6 h-2 w-2 border-b border-l border-white/50" />
              <span className="absolute right-6 bottom-6 h-2 w-2 border-b border-r border-white/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col px-7 py-7">
              {/* Header */}

              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl italic tracking-tight">
                  Navigation
                </h2>

                <button
                  onClick={() => setIsOpen(false)}
                  className="
      group
      flex items-center gap-2
      font-mono text-[9px]
      uppercase tracking-[0.2em]
      text-white/70
      transition-colors
      hover:text-white
    "
                >
                  <span className="relative h-5 w-5">
                    <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -rotate-45 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 rotate-45 bg-current" />
                  </span>
                  Close
                </button>
              </div>

              {/* Navigation */}
              <nav className="mt-[14vh]">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-white/40" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/50">
                    Index
                  </span>
                </div>

                <div className="flex flex-col">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.08,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="
                group
                flex items-center
                
                py-5
              "
                      >
                        {/* Number */}
                        <span
                          className="
                  mr-5
                  w-7
                  font-mono text-[9px]
                  tracking-wider
                  text-white/40
                "
                        >
                          0{index + 1}
                        </span>

                        {/* Label */}
                        <span
                          className="
                  font-serif
                  text-[clamp(2.7rem,12vw,4.5rem)]
                  leading-[0.9]
                  tracking-[-0.04em]
                  transition-all duration-300
                  group-hover:translate-x-2
                  group-hover:italic
                "
                        >
                          {item.label}
                        </span>

                        {/* Arrow */}
                        <span
                          className="
                  ml-auto
                  font-mono text-sm
                  text-white/40
                  transition-all duration-300
                  group-hover:translate-x-1
                  group-hover:text-white
                "
                        >
                          ↗
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Bottom information */}
              <div className="mt-auto">
                <div className="mb-6 h-px w-full bg-white/15" />

                <div className="flex items-end justify-between gap-5">
                  {/* Availability */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                        <span className="relative h-2 w-2 rounded-full bg-white" />
                      </span>

                      <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/70">
                        Available to Build
                      </span>
                    </div>

                    <p className="font-serif text-sm italic text-white/50">
                      Frontend / Full-stack
                    </p>
                  </div>

        
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
