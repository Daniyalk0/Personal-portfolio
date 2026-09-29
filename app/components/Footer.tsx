"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  //   Github,
  //   Linkedin,
  //   Instagram,
} from "lucide-react";
import HeroName from "./hero/HeroName";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer 
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-[#e53935]
        text-[#f9d9d8]
      "
    >

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-[5]
          bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(90,0,0,0.16),transparent_40%)]
        "
      />

      {/* ───────────────── CONTENT ───────────────── */}

      <div
      id="footer"
        className="
          relative
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1600px]
          flex-col
          px-5
          py-5
          sm:px-8
          sm:py-6
          lg:px-10
        "
      >
        {/* TOP BAR */}
{/* 
        <div className="flex items-center justify-between border-b border-black/15 pb-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f9d9d8]/70">
            04 / Contact
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f9d9d8]/60">
            © 2026
          </span>
        </div> */}

        {/* MAIN AREA */}

      {/* MAIN AREA */}

<div
  className="
    relative
    flex
    flex-1
    flex-col
    justify-end
    pb-10
    pt-16
    sm:pb-12
    lg:pb-16
  "
>
  {/* Bottom content row */}

  <div
    className="
      flex
      flex-col
      gap-10
      lg:flex-row
      lg:items-end
      lg:justify-between
    "
  >
    {/* CONTACT */}

    <div>
      {/* Availability */}

      {/* <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-2 w-2 rounded-full bg-red-200" />

        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f9d9d8]/75">
          Available for projects
        </span>
      </motion.div> */}
      

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="mb-5 max-w-xs font-serif text-lg italic leading-tight text-[#f9d9d8]/75 sm:text-xl">
          Have an idea, a project, or simply want to talk?
        </p>

    
<motion.a
  href="mailto:getdaniyalkhan@gmail.com"
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  animate={{
    y: [0, -2, 0],
  }}
  transition={{
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
    opacity: {
      duration: 0.7,
    },
  }}
  className="
    group
    relative
    inline-flex
    items-center
    gap-4
    border-b
    border-[#f9d9d8]/55
    pb-3
    text-[clamp(3rem,8vw,8rem)]
    font-semibold
    uppercase
    leading-[0.8]
    tracking-[-0.08em]
    text-[#fef0ef]
    transition-colors
    duration-300
    hover:text-white
  "
>
  <motion.span
    animate={{
      x: [0, 2, 0, -1, 0],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    Let's Talk
  </motion.span>

  <motion.span
    animate={{
      x: [0, 4, 0],
      y: [0, -4, 0],
      rotate: [0, 3, 0],
    }}
    transition={{
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <ArrowUpRight
      className="
        h-[0.45em]
        w-[0.45em]
        stroke-[1.5]
        transition-transform
        duration-500
        group-hover:translate-x-2
        group-hover:-translate-y-2
      "
    />
  </motion.span>

  {/* subtle moving underline */}
  <motion.span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      bottom-[-1px]
      left-0
      h-px
      bg-white
    "
    animate={{
      width: ["0%", "100%", "35%", "100%"],
      opacity: [0.2, 0.7, 0.35, 0.6],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</motion.a>

      </motion.div>
    </div>

    {/* SOCIALS */}

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.3,
      }}
      className="
        flex
        items-center
        gap-3
        sm:gap-4
      "
    >
      <SocialLink href="https://github.com/Daniyalk0" label="GitHub">
        <FaGithub />
      </SocialLink>

      <SocialLink href="https://www.linkedin.com/in/daniyal-k-648107263/?isSelfProfile=true" label="LinkedIn">
        <FaLinkedin />
      </SocialLink>

      <SocialLink href="https://www.instagram.com/daniyal.codes/" label="Instagram">
        <FaInstagram />
      </SocialLink>
    </motion.div>
  </div>
</div>

        {/* ───────────────── HUGE NAME ───────────────── */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            relative
            -mb-1
            w-full
            overflow-hidden
          "
        >
        </div>

        <HeroName />
        {/* BOTTOM INFO */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-2
            border-t
            border-black/15
            pt-4
            text-center
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-left
          "
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#f9d9d8]/65">
            © 2026 Daniyal
          </span>

          <span className="font-serif text-[10px] italic text-[#f9d9d8]/65">
            Designed & developed by me.
          </span>

          <a
            href="#hero"
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#f9d9d8]/70
              transition-colors
              hover:text-white
            "
          >
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Bottom red gradient */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          -z-0
          h-[30%]
          bg-gradient-to-t
          from-[#b92727]/35
          via-[#e53935]/10
          to-transparent
        "
      />
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      animate={{
        y: [0, -4, 0, 3, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay:
          label === "GitHub"
            ? 0
            : label === "LinkedIn"
              ? 0.8
              : 1.6,
      }}
      whileHover={{
        y: -6,
        scale: 1.08,
        rotate: 0,
        transition: {
          duration: 0.25,
        },
      }}
      whileTap={{
        scale: 0.94,
      }}
      className="
        group
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/35
        text-white
        transition-colors
        duration-300

        hover:border-white
        hover:bg-white
        hover:text-[#e53935]

        sm:h-14
        sm:w-14
      "
    >
      {/* rotating accent ring */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-4px]
          rounded-full
          border
          border-white/10
          border-t-white/50
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* icon */}

      <motion.span
        className="
          relative
          z-10
          text-[18px]
          sm:text-[20px]
        "
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay:
            label === "GitHub"
              ? 0
              : label === "LinkedIn"
                ? 0.5
                : 1,
        }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}