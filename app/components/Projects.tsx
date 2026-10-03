"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  useSpring,
  useMotionValue,
  motion,
  useTransform,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { PROJECTS, type Project } from "./ProjectsData";
import { MaskedReveal } from "@/app/components/ui/Masked-reveal";
import { TextReveal } from "@/app/components/ui/Text-reveal";

export default function SelectedWork() {
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  return (
    <section
      id="work"
      className="
        scroll-mt-10
        bg-[#f5f3ee]
        px-6 py-16
        font-sans text-[#111]
        md:px-10 md:py-24
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Editorial Header */}
        <motion.header
          ref={headerRef}
          style={{ y: headerY }}
          className="mb-16 border-b border-black/20 pb-8 md:mb-20 max-md:transform-none!"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50">
              01 / Selected Work
            </span>

            <span className="hidden text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 sm:block">
              Projects / 2026
            </span>
          </div>

          <MaskedReveal
            delay={0.4}
            duration={1.2}
            direction="up"
            className="mb-8"
          >
            <h2
              className="
                text-6xl font-semibold
                uppercase leading-[0.85]
                tracking-[-0.06em]
                text-[#111]
                md:text-8xl
              "
            >
              Selected
              <br />
              <span className="text-[#e53935]">Work.</span>
            </h2>
          </MaskedReveal>

          <TextReveal
            className="
              max-w-xl
              text-sm font-light
              leading-relaxed text-black/55
              sm:text-base
            "
            text="A collection of selected projects spanning full-stack applications, business websites, and digital experiences."
          />
        </motion.header>

        {/* Project Archive */}
        <div className="flex w-full flex-col">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>

        <div className="w-full border-t border-black/20" />
      </div>
    </section>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  // Floating image logic (Desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 260);
    mouseY.set(e.clientY - rect.top - 162);
  };

  const rowRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const yProject = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const xProject = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.a
      ref={rowRef}
      style={{ y: yProject, x: xProject }}
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block max-md:transform-none!"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.8,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="
    group relative
    flex cursor-pointer flex-col
    items-start
    border-t border-black/15
    px-2 py-10
    transition-colors duration-500
    hover:bg-white
    lg:flex-row lg:items-center
    lg:px-6 lg:py-16
  "
      >
        {/* 01. ID & YEAR (Mobile Row) */}
        <div className="flex w-full justify-between lg:mb-0 lg:w-12">
          <span
            className="
      text-xs font-mono
      text-[#e53935]
    "
          >
            {project.id}
          </span>

          <span
            className="
      text-xs font-mono
      text-black/40
      lg:hidden
    "
          >
            [{project.year}]
          </span>
        </div>

        {/* 02. Title & Category */}
        <div className="w-full flex-1 lg:pr-12">
          <MaskedReveal delay={0.2} duration={1.2} direction="up">
            <motion.h3
              className="
        mb-2
        text-4xl font-semibold
        uppercase leading-none
        tracking-tighter
        text-[#111]
        transition-transform duration-500
        lg:text-7xl
        lg:group-hover:translate-x-4
      "
            >
              {project.title}
            </motion.h3>
          </MaskedReveal>

          <p
            className="
      text-[10px] font-semibold
      uppercase tracking-[0.2em]
      text-[#e53935]
    "
          >
            {project.category}
          </p>
        </div>
        {/* 03. Year (Desktop Only) */}
        <div className="hidden lg:block w-32 text-sm font-mono text-neutral-400 dark:text-neutral-600">
          [{project.year}]
        </div>

        {/* 04. Mobile Image Reveal (Replacing the static one) */}
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-8 w-full aspect-16/10 lg:hidden overflow-hidden rounded-sm"
        >
          <motion.div
            whileInView={{ scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* 05. Description & Tech */}
        <div className="flex-1 max-w-md mt-8 lg:mt-0">
          <TextReveal
            text={project.description}
            className="text-[#82786e] mb-6 leading-relaxed hidden lg:block text-sm"
          />
          {/* <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed hidden lg:block text-sm">
            {project.description}
          </p> */}
          {/* Tech Stack - Vintage Archive Style */}
          {/* Tech Stack - 1950s Vintage Style */}
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2">
            {project.technologies.map((tech: string, i: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                }}
                className="
        group/tech
        relative
        flex items-center
        border border-black/20
        bg-transparent
        px-2 py-1
        transition-all duration-300
        hover:border-[#e53935]
        hover:bg-[#e53935]
        sm:px-2.5 sm:py-1.5
      "
              >
                {/* Index */}
                <span
                  className="
          mr-1.5
          text-[7px]
          font-mono
          text-[#e53935]
          transition-colors
          group-hover/tech:text-white/60
          sm:text-[8px]
        "
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Tech */}
                <span
                  className="
          text-[8px]
          font-mono
          uppercase
          tracking-[0.12em]
          text-black/65
          transition-colors
          group-hover/tech:text-white
          sm:text-[9px]
          sm:tracking-[0.15em]
        "
                >
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 06. Action (Enhanced for Mobile) */}
        <div
          className="
    mt-8 w-full
    border-t border-black/15
    pt-6
    lg:mt-0 lg:ml-12
    lg:w-auto lg:border-none lg:pt-0
  "
        >
          <div
            className="
      flex items-center
      justify-between
      text-[#111]
      lg:justify-start
    "
          >
            <span className="text-xl font-serif italic">View Project</span>

            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="
        ml-3
        text-xl
        text-[#e53935]
      "
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Floating Image (Desktop Only) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              style={{ x, y }}
              className="pointer-events-none absolute left-0 top-0 z-50 hidden h-[325px] w-[520px] overflow-hidden rounded-sm shadow-2xl lg:block"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.a>
  );
}
