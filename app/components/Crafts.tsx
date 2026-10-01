"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useTransform, useScroll } from "motion/react";
import { ArrowUpRight, Sparkle } from "lucide-react";
import { MaskedReveal } from "@/app/components/ui/Masked-reveal";
import { TextReveal } from "@/app/components/ui/Text-reveal";

// --- Types ---

interface Technology {
  id: string;
  name: string;
  description: string;
  category: string;
}

// --- Data ---

const CRAFT_ITEMS: Technology[] = [
  {
    id: "next",
    name: "Next.js",
    category: "Frontend",
    description:
      "My preferred framework for building fast, scalable production-ready React applications.",
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    description:
      "Crafting declarative, component-based user interfaces with modern state patterns.",
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "Frontend",
    description:
      "Ensuring codebase stability and developer velocity through rigorous type safety.",
  },
  {
    id: "tw",
    name: "Tailwind",
    category: "Frontend",
    description:
      "Building bespoke design systems with utility-first CSS and refined constraints.",
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    description:
      "Architecting scalable server-side logic and high-performance API services.",
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "Backend",
    description:
      "My preferred ORM for type-safe database modeling and intuitive migrations.",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Backend",
    description:
      "Leveraging PostgreSQL, real-time engines, and secure authentication.",
  },
  {
    id: "pg",
    name: "PostgreSQL",
    category: "Backend",
    description:
      "The reliable relational backbone for complex data-driven applications.",
  },
  {
    id: "git",
    name: "Git",
    category: "Tools",
    description:
      "Maintaining clean version history and collaborative development workflows.",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools",
    description:
      "Optimized deployment pipelines and global edge network performance.",
  },
  {
    id: "figma",
    name: "Figma",
    category: "Tools",
    description:
      "Bridging the gap between high-fidelity design and technical execution.",
  },
];

const CATEGORIES = ["Frontend", "Backend", "Tools"];

// --- Components ---

export default function CraftSection() {
  const [activeTech, setActiveTech] = useState<Technology>(CRAFT_ITEMS[0]);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const specimenRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  useEffect(() => {
    if (isInView && !hasOnboarded) {
      const timer = setTimeout(() => {
        setHasOnboarded(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasOnboarded]);

  const handleTechSelect = (tech: Technology) => {
    setActiveTech(tech);

    if (window.innerWidth < 1024) {
      setTimeout(() => {
        specimenRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const craftsRef = useRef<HTMLDivElement>(null);

const { scrollYProgress: craftsProgress } = useScroll({
  target: craftsRef,
  offset: ["start end", "end start"],
});

const craftsY = useTransform(
  craftsProgress,
  [0, 1],
  [50, -50]
);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className=" relative overflow-hidden border-y border-black/10 bg-[#f5f3ee] text-[#111] scroll-mt-20 "
    >
      {" "}
      {/* Subtle editorial grid */}{" "}
      {/* <div
        aria-hidden="true"
        className=" pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:clamp(5rem,12vw,12rem)_100%] "
      />{" "} */}
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 md:py-14 lg:px-10">
        {" "}
        {/* ───────────────── HEADER ───────────────── */}{" "}
        <header className="mb-14 border-b border-black/15 pb-6 md:mb-20">
          {" "}
          <div className="mb-8 flex items-center justify-between">
            {" "}
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/45">
              {" "}
              03 / Craft{" "}
            </span>{" "}
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35">
              {" "}
              Tools & Technologies{" "}
            </span>{" "}
          </div>{" "}
          <motion.div
  ref={craftsRef}
  style={{ y: craftsY }} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            {" "}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              {" "}
              <h2 className=" text-[clamp(5rem,13vw,12rem)] font-semibold uppercase leading-[0.72] tracking-[-0.08em] ">
                {" "}
                Craft<span className="text-[#e53935]">.</span>{" "}
              </h2>{" "}
            </motion.div>{" "}
            <div className="lg:col-span-4 lg:pb-2">
              {" "}
              <p className="max-w-xs text-sm leading-relaxed text-black/50">
                {" "}
                The technologies I use to turn ideas into functional, thoughtful
                digital products.{" "}
              </p>{" "}
            </div>{" "}
          </motion.div>{" "}
        </header>{" "}
        {/* ───────────────── MAIN GRID ───────────────── */}{" "}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {" "}
          {/* LEFT — TECHNOLOGY INDEX */}{" "}
          <div className="lg:col-span-7 lg:border-r lg:border-black/10 lg:pr-10">
            {CATEGORIES.map((category, categoryIndex) => {
              const technologies = CRAFT_ITEMS.filter(
                (tech) => tech.category === category,
              );

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: categoryIndex * 0.08,
                  }}
                  className="
          border-t border-black/10
          py-4
          first:border-t-0
          md:py-7
        "
                >
                  {/* Category */}
                  <div className="mb-2 flex items-center gap-3 md:mb-5 md:justify-between">
                    <span
                      className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#e53935]
            "
                    >
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-black/35
              md:text-[9px]
            "
                    >
                      {category}
                    </span>

                    {/* Mobile separator */}
                    <span className="h-px flex-1 bg-black/10 md:hidden" />
                  </div>

                  {/* Technologies */}
                  <div
                    className="
            flex
            flex-wrap
            gap-x-3
            gap-y-1
            pl-6
            sm:gap-x-5
            sm:gap-y-2
            sm:pl-7
            md:gap-x-7
            md:gap-y-3
            md:pl-0
          "
                  >
                    {technologies.map((tech) => (
                      <TechItem
                        key={tech.id}
                        tech={tech}
                        isActive={activeTech.id === tech.id}
                        onSelect={() => handleTechSelect(tech)}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* RIGHT — ACTIVE TECHNOLOGY SPECIMEN */}{" "}
          <div
            ref={specimenRef}
            className="
    relative
    mt-10
    min-h-[360px]
    lg:mt-0
    lg:col-span-5
    lg:min-h-[520px]
    lg:pl-10
  "
          >
            <div
              className="
      sticky
      top-4
      z-20
      lg:top-24
    "
            >
              {" "}
              <AnimatePresence mode="wait">
                {" "}
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full min-h-[360px] overflow-hidden border border-black/15 bg-white/30 p-6 sm:p-8 md:p-10"
                >
                  {" "}
                  {/* Giant background number */}{" "}
                  <span
                    aria-hidden="true"
                    className=" pointer-events-none absolute -right-4 -top-8 select-none text-[12rem] font-semibold leading-none tracking-[-0.1em] text-black/[0.035] "
                  >
                    {" "}
                    {String(
                      CRAFT_ITEMS.findIndex(
                        (item) => item.id === activeTech.id,
                      ) + 1,
                    ).padStart(2, "0")}{" "}
                  </span>{" "}
                  {/* Top metadata */}{" "}
                  <div className="relative flex items-center justify-between border-b border-black/10 pb-5">
                    {" "}
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#e53935]">
                      {" "}
                      Selected{" "}
                    </span>{" "}
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35">
                      {" "}
                      {activeTech.category}{" "}
                    </span>{" "}
                  </div>{" "}
                  {/* Main content */}{" "}
                  <div className="relative flex min-h-[270px] flex-col justify-between pt-10">
                    {" "}
                    <div>
                      {" "}
                      <div className="mb-5 flex items-center gap-3">
                        {" "}
                        <span className="h-2 w-2 rounded-full bg-[#e53935]" />{" "}
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
                          {" "}
                          Technology{" "}
                        </span>{" "}
                      </div>{" "}
                      <h3 className=" max-w-full break-words text-[clamp(3rem,6vw,5.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.07em] ">
                        {" "}
                        {activeTech.name}{" "}
                      </h3>{" "}
                    </div>{" "}
                    <div className="flex items-end justify-between gap-6">
                      {" "}
                      <p className="max-w-md text-base leading-relaxed text-black/55 md:text-lg">
                        {" "}
                        {activeTech.description}{" "}
                      </p>{" "}
                      <motion.div
                        animate={{ rotate: [0, 45, 0] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className=" hidden h-10 w-10 shrink-0 items-center justify-center border border-black/15 sm:flex "
                      >
                        {" "}
                        <ArrowUpRight className="h-4 w-4" />{" "}
                      </motion.div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Bottom line */}{" "}
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-[#e53935]" />{" "}
                </motion.div>{" "}
              </AnimatePresence>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* ───────────────── FOOTER ───────────────── */}{" "}
        <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
          {" "}
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/30">
            {" "}
            Always learning / Always building{" "}
          </span>{" "}
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/30">
            {" "}
            {CRAFT_ITEMS.length} technologies{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
/* ───────────────────────────────────────────── TECHNOLOGY ITEM ───────────────────────────────────────────── */ function TechItem({
  tech,
  isActive,
  onSelect,
}: {
  tech: Technology;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-label={`View details for ${tech.name}`}
      className=" group relative flex items-center gap-2 py-1 text-left outline-none "
    >
      {" "}
      {/* Active marker */}{" "}
      <motion.span
        initial={false}
        animate={{ width: isActive ? 18 : 0, opacity: isActive ? 1 : 0 }}
        className="h-px bg-[#e53935]"
      />{" "}
      <motion.span
        initial={false}
        animate={{ x: isActive ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={` text-sm font-medium tracking-tight transition-colors duration-300 md:text-base ${isActive ? "text-[#111]" : "text-black/35 group-hover:text-black/70"} `}
      >
        {" "}
        {tech.name}{" "}
      </motion.span>{" "}
      {/* Small index on hover/active */}{" "}
      <motion.span
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
        className="font-mono text-[7px] text-[#e53935]"
      >
        {" "}
        →{" "}
      </motion.span>{" "}
    </button>
  );
}
