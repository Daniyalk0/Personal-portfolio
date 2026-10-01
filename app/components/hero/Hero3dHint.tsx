"use client";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
type Hero3DHintProps = { heroRef: RefObject<HTMLElement | null> };
export default function Hero3DHint({ heroRef }: Hero3DHintProps) {
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateDevice = () => {
      setIsMobile(mobileQuery.matches);
    };
    updateDevice();
    mobileQuery.addEventListener("change", updateDevice);
    return () => {
      mobileQuery.removeEventListener("change", updateDevice);
    };
  }, []);
  /* * Watch the actual hero section. */ useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(hero);
    return () => {
      observer.disconnect();
    };
  }, [heroRef]);
  /* * Every time the hero becomes visible, * start a fresh 4-second idle timer. */ useEffect(() => {
    if (!heroVisible) {
      setShowHint(false);
      return;
    }
    setShowHint(false);
    const timer = window.setTimeout(() => {
      setShowHint(true);
    }, 4000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [heroVisible]);
  /* * Any interaction dismisses the hint. */ useEffect(() => {
    const dismiss = () => {
      setShowHint(false);
    };
    const handleMouseMove = () => {
      if (!isMobile) {
        dismiss();
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("touchstart", dismiss, { passive: true });
    window.addEventListener("scroll", dismiss, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("scroll", dismiss);
    };
  }, [isMobile]);
  return (
    <AnimatePresence>
      {" "}
      {showHint && heroVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className=" pointer-events-none absolute right-[2%] top-[30%] sm:right-[13%] sm:top-[52%] z-30 "
        >
          {" "}
          <div className="flex items-center gap-4">
            {" "}
            {/* Directional line */}{" "}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 42 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className=" relative h-px bg-red-300 "
            >
              {" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className=" absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-red-300 "
              />{" "}
            </motion.div>{" "}
            {/* Copy */}{" "}
            <div className="flex flex-col">
              {" "}
              <span className=" font-mono text-[8px] uppercase sm:tracking-[0.32em] text-red-300">
                {" "}
                Interactive object{" "}
              </span>{" "}
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className=" mt-1 font-serif text-[10px] sm:text-[15px] italic tracking-tight text-red-300"
              >
                {" "}
                {isMobile ? "Touch & drag" : "Move around"}{" "}
              </motion.span>{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>
      )}{" "}
    </AnimatePresence>
  );
}
