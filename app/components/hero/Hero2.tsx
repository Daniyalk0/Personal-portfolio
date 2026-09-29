import HeroIntro from "./HeroIntro";
import HeroName from "./HeroName";
import HeroVisual from "./HeroVisuals";

export default function Hero2() {
  return (
    <section 
    id="hero"
      aria-labelledby="hero-title"
      className="
        relative isolate min-h-[100svh] overflow-hidden
        bg-gradient-to-br from-[#d32f2f] via-[#e53935] to-[#b71c1c]
        text-neutral-950
      "
    >
      {/* Editorial grid */}
      {/* <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]
          bg-[size:clamp(4rem,8vw,8rem)_clamp(4rem,8vw,8rem)]
          [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]
        "
      /> */}

      {/* Subtle light glow in top right */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px]" />

      {/* Top framing line */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-4 top-0 h-px
          bg-white/20
          sm:inset-x-6
          lg:inset-x-10
        "
      />

      {/* Center editorial line */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-0 left-1/2
          hidden h-full w-px -translate-x-1/2
          bg-white/[0.08]
          lg:block
        "
      />

      <HeroName />
      <HeroIntro />
      <HeroVisual />

      {/* Editorial metadata - Updated text color for contrast */}
      <span
        aria-hidden="true"
        className="
          absolute left-4 top-28
          text-[10px] font-medium tracking-[0.25em]
          text-white/40
          sm:left-6
          lg:left-10
        "
      >
        01
      </span>

      <span
        aria-hidden="true"
        className="
          absolute right-4 top-28
          text-[10px] font-medium tracking-[0.25em]
          text-white/40
          sm:right-6
          lg:right-10
        "
      >
        WEB / 26
      </span>

      {/* Bottom gradient fade matching the new bg */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 z-[15]
          h-[35%]
          bg-gradient-to-t
          from-[#b71c1c]
          via-[#e53935]/80
          to-transparent
        "
      />
    </section>
  );
}