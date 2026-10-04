"use client";

import { motion } from "framer-motion";

function DesktopHeroName() {
  return (
    <div
      className="
        pointer-events-none absolute
        left-0 top-1/3
        z-0
        w-full
        -translate-y-1/2
        hidden md:block
        overflow-visible
      "
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay:4.2 }}
      >
        <span
          className="
            block
            whitespace-nowrap
            text-center
            text-[18vw]
            font-semibold
            uppercase
            leading-none
            tracking-[-0.06em]
            text-white/3
            scale-x-[1.45]
            origin-center
          "
        >
          Daniyal
        </span>
      </motion.div>
    </div>
  );
}

function MobileHeroName() {
  return (
    <div
      className="
        pointer-events-none absolute
        left-0 top-1/4
        z-0
        w-full
        -translate-y-1/2
        md:hidden
        overflow-visible
      "
    >
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        // Added will-change to force hardware acceleration on mobile
        style={{ willChange: "transform, opacity" }}
        transition={{
          duration: 1.4,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span
          className="
            block
            whitespace-nowrap
            text-center
            text-[26vw]
            font-semibold
            uppercase
            leading-none
            tracking-[-0.06em]
            text-white/4
            scale-y-[2.8]
            origin-center
          "
        >
          Daniyal
        </span>
      </motion.div>
    </div>
  );
}

export default function HeroName() {
  return (
    <>
      <DesktopHeroName />
      <MobileHeroName />
    </>
  );
}