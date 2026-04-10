"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    q: "What do you actually do?",
    a: "We design and build websites, web apps, AI automations, and SEO systems. We also train teams to work with AI. Everything ships production-ready. No PDFs, no handoffs.",
  },
  {
    q: "How fast can you deliver?",
    a: "Most projects go from first call to live in under a week. AI-native tooling compresses what used to take months into days. If something needs more time, we'll tell you upfront.",
  },
  {
    q: "What does AI-native mean?",
    a: "AI is built into how we work, not bolted on. We use it across development, design, content, and automation. That's why a two-person operation delivers the output of a 10-person agency, without the overhead.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed price per project. We scope it properly before anything starts, so there are no surprises. No hourly billing, no retainers, no scope creep charges.",
  },
  {
    q: "Do I own the code?",
    a: "100%. You get the full GitHub repo, Vercel deployment, domain configuration, and documentation. We hand you the keys.",
  },
  {
    q: "Can you train our team?",
    a: "Yes. We run hands-on workshops covering prompt engineering, AI content generation, image creation, video editing, and data analysis. Every module uses your real data and workflows.",
  },
  {
    q: "What's your ideal project?",
    a: "Something ambitious with people who care about quality. Whether it's a new product from scratch or optimizing something that exists, we want to shape the direction early, not just execute a spec.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const toggle = useCallback(() => {
    if (!answerRef.current) return;
    const next = !open;
    setOpen(next);

    if (next) {
      answerRef.current.style.display = "block";
      const h = answerRef.current.scrollHeight;
      gsap.fromTo(
        answerRef.current,
        { maxHeight: 0, opacity: 0 },
        {
          maxHeight: h,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(answerRef.current, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (answerRef.current) answerRef.current.style.display = "none";
        },
      });
    }

    gsap.to(iconRef.current, {
      rotation: next ? 180 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [open]);

  return (
    <div className="border-b border-border">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors duration-[400ms] hover:bg-accent-subtle"
        aria-expanded={open}
      >
        <span className="pr-8 text-[16px] font-medium text-text md:text-[18px]">
          {q}
        </span>
        <span className="shrink-0">
          <ChevronDown
            ref={iconRef as React.Ref<SVGSVGElement>}
            size={18}
            className="text-text-muted"
          />
        </span>
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ maxHeight: 0, opacity: 0, display: "none" }}
      >
        <p className="max-w-2xl pb-6 text-[15px] font-light leading-relaxed text-text-dim">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !listRef.current) return;

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
        listRef.current!.children,
        { opacity: 0, y: "10vw" },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: EASE_PRIMARY,
          stagger: 0.08,
          delay: 0.25,
          scrollTrigger: { trigger: listRef.current, start: "top 90%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" className="bg-bg-warm px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[720px]">
        <div ref={headerRef} className="mb-10 opacity-0 md:mb-12">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            Questions
          </span>
          <h2 className="mt-4 font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
            Good questions.
          </h2>
        </div>

        <div ref={listRef} className="border-t border-border">
          {questions.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
