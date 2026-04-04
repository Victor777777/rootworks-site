"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: "10vw" },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.25,
          ease: EASE_PRIMARY,
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" className="px-6 pt-6 pb-24 md:px-10 md:pt-8 md:pb-32">
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1100px] text-center opacity-0"
      >
        <h2 className="font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
          Got a project?
        </h2>
        <a
          href="https://calendly.com/victor-rootworks"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-text px-8 py-4 text-[15px] font-medium text-white transition-all duration-[400ms] hover:scale-[1.02] hover:opacity-90 md:mt-10"
        >
          Book a Free Call
        </a>
      </div>
    </section>
  );
}
