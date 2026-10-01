"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;

    const syncSmoothScroll = () => {
      if (desktopQuery.matches && !lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.1,
          smoothWheel: true,
        });
      } else if (!desktopQuery.matches && lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    syncSmoothScroll();
    desktopQuery.addEventListener("change", syncSmoothScroll);

    return () => {
      desktopQuery.removeEventListener("change", syncSmoothScroll);
      lenis?.destroy();
    };
  }, []);

  return children;
}