'use client'
import { useEffect, useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const hoverPhrases = [
  "Know about Daniyal's work",
  "Why hire Daniyal?",
  "Explore Daniyal's projects",
  "See Daniyal's process",
  "Meet the maker behind it",
  "Check Daniyal's case studies",
];

const getNextPhrase = (current: string) => {
  const alternatives = hoverPhrases.filter((phrase) => phrase !== current);
  return (
    alternatives[Math.floor(Math.random() * alternatives.length)] ||
    hoverPhrases[0]
  );
};

export default function FloatingAIButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoVisible, setIsAutoVisible] = useState(false);
  const [labelText, setLabelText] = useState(hoverPhrases[0]);
  const isLabelVisible = isHovered || isAutoVisible;

  const cycleText = () => {
    setLabelText(getNextPhrase);
  };

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setLabelText(getNextPhrase);
      setIsAutoVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsAutoVisible(false), 2500);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
     onClick={onClick}
      className="
        fixed
        cursor-pointer
        bottom-5
        right-5
        z-[9999]
        flex
        items-center

        md:bottom-auto
        md:right-auto
        md:left-6
        md:top-1/2
        md:-translate-y-1/2

        sm:bottom-7
        sm:right-7
      "
      onMouseEnter={() => {
        cycleText();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={{
          width: isLabelVisible ? "auto" : 0,
          opacity: isLabelVisible ? 1 : 0,
          x: isLabelVisible ? 0 : 12,
          marginRight: isLabelVisible ? 12 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 26,
          mass: 0.9,
          duration: 0.6,
        }}
        className="overflow-hidden whitespace-nowrap"
      >
        <span
          className="
            block
            rounded-full
            border
            border-[#f8b0a8]/40
            bg-gradient-to-r from-[#e53935] via-[#ff4545] to-[#ec6f6f]
            px-3
            py-2
            text-[9px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#fff3f1]
            shadow-[0_12px_30px_rgba(229,57,53,0.28)]
            backdrop-blur-sm
            md:text-[10px]
          "
        >
          {labelText}
        </span>
      </motion.div>

      <motion.button
        type="button"
       
        aria-label="Open Daniyal's AI assistant"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -5, 0, 4, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.08,
          rotate: 0,
          y: -6,
        }}
        whileTap={{
          scale: 0.94,
        }}
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full
          border
          border-white/50
          bg-[#e53935]
          text-white

          shadow-[0_8px_30px_rgba(0,0,0,0.18)]

          md:h-14
          md:w-14

          sm:h-16
          sm:w-16
        "
      >
        {/* Rotating ring */}
        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[-5px]
            rounded-full
            border
            border-white/20
            border-t-white/80
          "
          animate={{ rotate: 360 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Outer orbit */}
        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[-10px]
            rounded-full
            border
            border-white/10
            border-l-white/40
          "
          animate={{ rotate: -360 }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.span
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Bot
            size={21}
            strokeWidth={1.5}
          />
        </motion.span>

        {/* Tiny sparkle */}
        <motion.span
          aria-hidden="true"
          className="absolute -right-1 -top-1"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.15, 0.8],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={12}
            strokeWidth={1.5}
          />
        </motion.span>
      </motion.button>
    </div>
  );
}
