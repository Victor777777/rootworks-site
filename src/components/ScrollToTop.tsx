"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration so the fresh page can't snap back
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const jump = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    jump();
    // Layout + Lenis may hydrate after initial mount; re-assert a couple times
    const t1 = setTimeout(jump, 0);
    const t2 = setTimeout(jump, 50);
    const t3 = setTimeout(jump, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return null;
}
