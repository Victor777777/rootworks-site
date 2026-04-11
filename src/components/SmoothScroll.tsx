"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Module-level ref so other client components can reset the active Lenis instance.
let activeLenis: Lenis | null = null;

export function resetPageScroll() {
  if (typeof window === "undefined") return;
  if (activeLenis) {
    try {
      activeLenis.scrollTo(0, { immediate: true, force: true, lock: true });
    } catch {
      // ignore
    }
  }
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    window.scrollTo(0, 0);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis on touch devices — native scroll is smoother on iOS Safari
    // and avoids ScrollTrigger conflicts.
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);

    if (isTouch) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    activeLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
