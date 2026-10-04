"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
} from "motion/react";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const topCurtain = useAnimation();
  const bottomCurtain = useAnimation();
  const content = useAnimation();

  useEffect(() => {
    let current = 0;

    const interval = window.setInterval(() => {
      current += Math.floor(Math.random() * 7) + 2;

      if (current >= 100) {
        current = 100;
        window.clearInterval(interval);
      }

      setProgress(current);
    }, 45);

    const runAnimation = async () => {
      await content.start({
        opacity: 0,
        y: -35,
        transition: {
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1],
        },
      });

      await Promise.all([
        topCurtain.start({
          y: "-100%",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        }),

        bottomCurtain.start({
          y: "100%",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        }),
      ]);

      setVisible(false);
    };

    const finishTimer = window.setTimeout(() => {
      runAnimation();
    }, 1450);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(finishTimer);
    };
  }, [content, topCurtain, bottomCurtain]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* TOP CURTAIN */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#0b0b0b]"
            initial={{ y: 0 }}
            animate={topCurtain}
          />

          {/* BOTTOM CURTAIN */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0b0b0b]"
            initial={{ y: 0 }}
            animate={bottomCurtain}
          />

          {/* CONTENT */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 text-white"
            initial={{
              opacity: 1,
              y: 0,
            }}
            animate={content}
          >
            {/* TOP METADATA */}
            <div className="flex items-start justify-between text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50">
              <span>Portfolio / 2026</span>

              <span className="hidden md:block">
                Full-Stack Developer
              </span>

              <span>India</span>
            </div>

            {/* CENTER */}
            <div className="relative">
              <div className="mb-5 overflow-hidden">
                <motion.p
                  className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/45"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.7,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  Designing & building
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-[18vw] md:text-[13vw] leading-[0.75] tracking-[-0.07em] font-medium"
                  initial={{
                    y: "110%",
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  Daniyal
                </motion.h1>
              </div>

              <div className="mt-6 flex items-center gap-3 overflow-hidden">
                <motion.span
                  className="h-px w-8 bg-[#e53935]"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{
                    delay: 0.8,
                    duration: 0.5,
                  }}
                />

                <motion.p
                  className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/60"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.85,
                    duration: 0.6,
                  }}
                >
                  Full-Stack Developer
                </motion.p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="flex items-end justify-between">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/35">
                Selected work
                <br />
                Digital experiences
              </div>

              <div className="flex items-end gap-3">
                <motion.span
                  key={progress}
                  className="text-5xl md:text-7xl leading-none font-light tracking-[-0.06em]"
                >
                  {progress}
                </motion.span>

                <span className="mb-1 text-xs text-white/40">
                  %
                </span>
              </div>
            </div>
          </motion.div>

          {/* GRAIN */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-screen"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}