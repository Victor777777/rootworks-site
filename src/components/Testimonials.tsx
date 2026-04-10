"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";

const quotes = [
  {
    text: "With a single intervention, we gained the equivalent of \u20AC37,000 in annual value through optimized workflows, protocols, and tools.",
    author: "Camille D.",
    role: "Marketing Director",
  },
  {
    text: "It completely changed the way we work. We now produce in days what used to take us a full week.",
    author: "Sarah M.",
    role: "Marketing Lead",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const animateQuote = useCallback(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: "2vw" },
      { opacity: 1, y: 0, duration: 1.2, ease: EASE_PRIMARY }
    );
  }, []);

  useEffect(() => {
    animateQuote();
  }, [active, animateQuote]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = quotes[active];

  return (
    <section id="testimonials" className="px-6 py-12 md:px-10 md:py-16">
      <div
        ref={sectionRef}
        className="mx-auto max-w-[800px] text-center opacity-0"
      >
        <div className="mb-12 md:mb-16">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            What they say
          </span>
          <h2 className="mt-4 font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
            Client feedback
          </h2>
        </div>

        <div ref={quoteRef}>
          <blockquote className="font-heading text-[clamp(22px,3vw,32px)] italic leading-[1.4] text-text">
            <span className="text-text-muted">&ldquo;</span>
            {current.text}
            <span className="text-text-muted">&rdquo;</span>
          </blockquote>

          <p className="mt-8 text-sm text-text-dim">
            <span className="font-medium text-text">{current.author}</span>
            {" — "}
            {current.role}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-[400ms] ${
                i === active
                  ? "w-6 bg-text"
                  : "w-1.5 bg-text-muted hover:bg-text-dim"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
