"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Give all components time to set up their ScrollTriggers, then refresh
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
