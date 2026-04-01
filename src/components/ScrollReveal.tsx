"use client";

import { useRef, useEffect } from "react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = stagger > 0 ? ref.current.children : ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: "10vw" },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.25,
          ease: EASE_PRIMARY,
          stagger: stagger > 0 ? stagger : undefined,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
