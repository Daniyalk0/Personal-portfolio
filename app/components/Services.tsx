"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Responsive, polished interfaces built with React, Next.js, TypeScript, and modern UI patterns.",
    tag: "NEXT.JS / REACT",
    size: "large",
    accent: "bg-[#c84b31]",
  },
  {
    number: "02",
    title: "Full-Stack Development",
    description:
      "End-to-end web applications with APIs, authentication, databases, payments, and production-ready architecture.",
    tag: "FULL-STACK",
    size: "small",
    accent: "bg-[#d8a12d]",
  },
  {
    number: "03",
    title: "Backend & APIs",
    description:
      "Reliable backend services with REST APIs, PostgreSQL, Prisma, authentication, validation, and secure data flows.",
    tag: "APIs / DATABASES",
    size: "small",
    accent: "bg-[#6f8f7a]",
  },
  {
    number: "04",
    title: "Interactive Web Experiences",
    description:
      "Distinctive interfaces brought to life with animation, smooth interactions, motion, and creative frontend techniques.",
    tag: "MOTION / INTERACTION",
    size: "large",
    accent: "bg-[#a55b78]",
  },
];

export default function Services() {
  const headerRef = useRef<HTMLElement>(null);
  // const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f4f1eb] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      {/* Large background typography */}

      <div className="relative mx-auto max-w-[1600px]">
        {/* HEADER */}
        <motion.header
          ref={headerRef}
          style={{ y: headerY }}
          className="mb-14 border-b border-black/15 pb-6 md:mb-20 max-md:transform-none!"
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/45">
              03 / Services
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35">
              Selected Capabilities
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(3.8rem,13vw,12rem)] font-semibold uppercase leading-[0.72] tracking-[-0.08em]">
                Services<span className="text-red-500">.</span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-xs text-sm leading-relaxed text-black/50">
                From expressive interfaces to full-stack products, I build
                digital experiences where design and engineering meet.
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex items-end justify-end">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35">
              2026 — 01
            </span>
          </div>
        </motion.header>

        {/* SERVICES */}
        <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 max-md:transform-none!">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </motion.div>

        {/* BOTTOM STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 border-t border-black/15 pt-6 md:mt-32"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 md:col-span-4">
              Currently exploring
            </p>

            <div className="flex flex-wrap gap-2 md:col-span-8">
              {[
                "Node.js",
                "NestJS",
                "AI Engineering",
                "System Design",
                "Docker",
                "Redis",
              ].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -3 }}
                  className="cursor-default border border-black/15 px-3 py-2 text-[9px] uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: {
    number: string;
    title: string;
    description: string;
    tag: string;
    size: string;
    accent: string;
  };
  index: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const active = isActive || isHovered;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 60,
        clipPath: "inset(12% 0% 0% 0%)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.85,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsActive((prev) => !prev)}
      className="
  group relative isolate flex flex-col
  min-h-[270px]
  cursor-pointer overflow-hidden
  border-b border-r border-black/15
  bg-[#f5f3ee]
  px-5 py-6
  text-[#111]

  sm:min-h-[290px]
  sm:px-7 sm:py-7

  lg:min-h-[310px]
  lg:px-8 lg:py-8
"
    >
      {/* =====================================================
          RED ATMOSPHERE
      ===================================================== */}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          opacity: active ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-500/[0.13] blur-3xl" />

        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-red-500/[0.09] blur-3xl" />
      </motion.div>

      {/* =====================================================
          RED TAKEOVER
      ===================================================== */}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-[#e53935]"
        initial={{ scaleY: 0 }}
        animate={{
          scaleY: active ? 1 : 0,
          transformOrigin: active ? "bottom" : "top",
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[4]"
        animate={{
          opacity: active ? 0.1 : 0.035,
        }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(17,17,17,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(17,17,17,0.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            animate={{
              color: active ? "#ffffff" : "#e53935",
            }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[9px] tracking-[0.22em]"
          >
            {service.number}
          </motion.span>

          <motion.span
            animate={{
              width: active ? 42 : 24,
              backgroundColor: active ? "#ffffff" : "#e53935",
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-px"
          />
        </div>

        <motion.div
          animate={{
            rotate: active ? 45 : 0,
            color: active ? "#ffffff" : "#e53935",
            borderColor: active
              ? "rgba(255,255,255,0.45)"
              : "rgba(229,57,53,0.25)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-full border
            font-mono text-sm
          "
        >
          ↗
        </motion.div>
      </div>

      {/* =====================================================
          DECORATIVE INDEX MARK
      ===================================================== */}

      <motion.div
        aria-hidden
        animate={{
          rotate: active ? 90 : 0,
          scale: active ? 1.08 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none absolute
          right-8 top-24
          hidden h-24 w-24
          items-center justify-center
          sm:flex
        "
      >
        <div
          className="
            absolute inset-0 rounded-full
            border border-red-500/15
            transition-colors duration-500
            group-hover:border-white/20
          "
        />

        <div className="absolute h-px w-full bg-red-500/15 group-hover:bg-white/20" />
        <div className="absolute h-full w-px bg-red-500/15 group-hover:bg-white/20" />

        <span className="font-mono text-[8px] tracking-[0.2em] text-red-500/50 group-hover:text-white/60">
          0{index + 1}
        </span>
      </motion.div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mt-20 flex flex-1 flex-col justify-between sm:mt-24">
        <div>
          {/* Tag */}

          <motion.div
            animate={{
              color: active ? "rgba(255,255,255,0.65)" : "rgba(229,57,53,0.65)",
            }}
            transition={{ duration: 0.3 }}
            className="
              mb-5 flex items-center gap-2
              font-mono text-[8px]
              uppercase tracking-[0.25em]
            "
          >
            <motion.span
              animate={{
                scale: active ? 1.3 : 1,
                backgroundColor: active ? "#ffffff" : "#e53935",
              }}
              className="h-1.5 w-1.5 rounded-full"
            />

            {service.tag}
          </motion.div>

          {/* Title */}

          <motion.h3
            animate={{
              color: active ? "#ffffff" : "#e53935",
              x: active ? 5 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-[620px]
              font-serif
              text-[clamp(2.5rem,7vw,5.5rem)]
              font-normal
              leading-[0.86]
              tracking-[-0.055em]
            "
          >
            {service.title}
          </motion.h3>

          {/* Description */}

          <motion.p
            animate={{
              color: active ? "rgba(255,255,255,0.76)" : "rgba(17,17,17,0.58)",
              x: active ? 5 : 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              mt-7
              max-w-[380px]
              text-sm
              leading-[1.7]
            "
          >
            {service.description}
          </motion.p>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-10">
          <motion.div
            animate={{
              backgroundColor: active
                ? "rgba(255,255,255,0.25)"
                : "rgba(17,17,17,0.12)",
            }}
            className="mb-4 h-px w-full"
          />

          <div className="flex items-center justify-between">
            <motion.span
              animate={{
                color: active
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(17,17,17,0.42)",
              }}
              className="
                font-mono text-[8px]
                uppercase tracking-[0.2em]
              "
            >
              {service.accent}
            </motion.span>

            <motion.span
              animate={{
                color: active
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(229,57,53,0.55)",
                x: active ? 4 : 0,
              }}
              className="
                font-mono text-[8px]
                uppercase tracking-[0.2em]
              "
            >
              Explore ↗
            </motion.span>
          </div>
        </div>
      </div>

      {/* =====================================================
          CORNER MARK
      ===================================================== */}

      <motion.div
        animate={{
          borderColor: active
            ? "rgba(255,255,255,0.5)"
            : "rgba(229,57,53,0.25)",
        }}
        className="
          pointer-events-none
          absolute bottom-0 right-0
          h-10 w-10
          border-b border-r
        "
      />

      <motion.div
        animate={{
          backgroundColor: active ? "#ffffff" : "#e53935",
        }}
        className="absolute bottom-0 right-0 h-1.5 w-1.5"
      />
    </motion.article>
  );
}
