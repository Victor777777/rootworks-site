"use client";

import { useEffect } from "react";
import { resetPageScroll } from "./SmoothScroll";

export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    resetPageScroll();
    // Re-assert after Lenis/ScrollTrigger finish hydrating. Next.js, Lenis, and
    // GSAP's ScrollTrigger.refresh each fire at different times; one of these
    // callbacks will catch whichever is last.
    const t1 = setTimeout(resetPageScroll, 0);
    const t2 = setTimeout(resetPageScroll, 100);
    const t3 = setTimeout(resetPageScroll, 300);
    const t4 = setTimeout(resetPageScroll, 1100); // after SmoothScroll's 1s refresh

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return null;
}
