"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const services = [
  {
    title: "Build",
    slug: "/build",
    subtitle: "You have an idea. We make it real.",
    description:
      "Websites, web apps, mobile apps. From artist portfolios to full-stack SaaS platforms with authentication, payments, and dashboards. Every project gets a unique design system built from scratch. No templates, no themes. From no-code and low-code to full custom, delivered ready to use.",
  },
  {
    title: "Rank",
    slug: "/rank",
    subtitle: "You have a product. Now you need to be found.",
    description:
      "We provide advanced SEO and AI search optimization for your product to rank where it belongs. From Google to ChatGPT and every major LLM. Technical audits, schema markup, programmatic pages, content architecture. We audit, implement, and deliver the changes for you.",
  },
  {
    title: "Automate",
    slug: "/automate",
    subtitle: "You\u2019re generating revenue. You could generate much more.",
    description:
      "Custom AI pipelines and workflow automations. Content generation, data processing, email sequences, CRM integrations, you name it. From no-code tools to fully custom pipelines, we build systems that run on their own after setup. You free precious time to allocate to what matters.",
  },
  {
    title: "Train",
    slug: "/train",
    subtitle: "Your team could do twice as much with the right tools.",
    description:
      "Hands-on AI training for marketing and business teams, on-site or remote. Prompt engineering, content generation, image creation, video editing, data analysis. Every module uses your real data and actual workflows. Your team walks out producing in hours what used to take days. Training your team is now profitable, earning you days to months of saved workload.",
  },
];

const EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)";

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 90%" },
        }
      );

      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 90%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="px-5 py-16 md:px-10 md:pt-8 md:pb-24">
      <div className="mx-auto max-w-[1240px]">
        <div ref={headerRef} className="mb-12 text-center opacity-0 md:mb-16">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            What we do
          </span>
          <h2 className="mt-4 font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
            Four ways to accelerate your business
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.slug}
              className="group block cursor-pointer rounded-2xl border border-[rgba(0,0,0,0.06)] border-l-[3px] border-l-transparent p-6 opacity-0 transition-all duration-500 hover:scale-[1.02] hover:border-[rgba(0,0,0,0.15)] hover:border-l-text hover:bg-[#f8f6f2] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:p-10"
              style={{ transitionTimingFunction: EASE }}
            >
              <h3
                className="font-heading text-[clamp(28px,4vw,42px)] leading-[1.1] text-text transition-transform duration-500 group-hover:-translate-y-1"
                style={{ transitionTimingFunction: EASE }}
              >
                {service.title}
              </h3>
              <p className="mt-3 font-heading text-[clamp(18px,2.5vw,24px)] italic leading-[1.4] text-text transition-opacity duration-500 group-hover:opacity-100 md:opacity-70">
                {service.subtitle}
              </p>
              <p className="mt-4 text-[16px] font-light leading-relaxed text-text-dim">
                {service.description}
              </p>
              <span className="mt-6 inline-flex min-h-[44px] items-center text-[14px] lowercase text-text-dim transition-colors duration-300 group-hover:text-text">
                explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
