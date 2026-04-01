"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";

const steps = [
  {
    num: "01.",
    title: "Align",
    description:
      "30-minute call. We understand your goals, audience, and constraints. Fixed price and timeline before a single line of code.",
  },
  {
    num: "02.",
    title: "Build",
    description:
      "AI-powered development with daily updates. You see progress in real-time via preview URLs. Feedback in the morning, new version by evening.",
  },
  {
    num: "03.",
    title: "Refine",
    description:
      "You review every detail. Nothing goes live without your approval. We iterate until you're satisfied — no revision limits.",
  },
  {
    num: "04.",
    title: "Deploy",
    description:
      "Live on your custom domain. GitHub repo, Vercel hosting, HTTPS, CDN. You own 100% of the code. We hand you the keys.",
  },
];

export default function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: "10vw" },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.25,
          ease: EASE_PRIMARY,
          scrollTrigger: { trigger: headerRef.current, start: "top 90%" },
        }
      );

      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: "10vw" },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: EASE_PRIMARY,
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: { trigger: gridRef.current, start: "top 90%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="px-6 py-24 md:px-10 md:py-[180px]">
      <div className="mx-auto max-w-[1100px]">
        <div ref={headerRef} className="mb-20 opacity-0 md:mb-24">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            The method
          </span>
          <h2 className="mt-4 font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
            How we work
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <article
              key={step.num}
              className={`border-t border-border py-8 opacity-0 lg:border-t-0 lg:py-0 ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              } ${i < steps.length - 1 ? "lg:pr-8" : ""}`}
            >
              <span className="text-[13px] text-text-muted">{step.num}</span>
              <h3 className="mt-2 text-[17px] font-medium text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] font-light leading-relaxed text-text-dim">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
