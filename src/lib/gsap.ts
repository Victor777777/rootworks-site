"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(20);
  }
}

// Moreair.co signature easing: cubic-bezier(0.215, 0.61, 0.355, 1) = "power3.out"
export const EASE_PRIMARY = "power3.out";
// Secondary easing for UI: cubic-bezier(0.25, 0.46, 0.45, 0.94)
export const EASE_UI = "power2.out";

export { gsap, ScrollTrigger };
