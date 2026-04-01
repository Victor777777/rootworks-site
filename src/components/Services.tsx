"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";

const services = [
  {
    num: "01",
    title: "Build",
    subtitle: "You have an idea. We make it real.",
    description:
      "Websites, web apps, mobile apps. From artist portfolios to full-stack SaaS platforms with authentication, payments, and dashboards. Every project gets a unique design system built from scratch. No templates, no themes. From no-code and low-code to full custom, delivered ready to use.",
  },
  {
    num: "02",
    title: "Optimize",
    subtitle: "You have a product. Now you need to be found.",
    description:
      "We provide advanced SEO and AI search optimization for your product to rank where it belongs. From Google to ChatGPT and every major LLM. Technical audits, schema markup, programmatic pages, content architecture. We audit, implement, and deliver the changes for you.",
  },
  {
    num: "03",
    title: "Automate",
    subtitle: "You\u2019re generating revenue. You could generate much more.",
    description:
      "Custom AI pipelines and workflow automations. Content generation, data processing, email sequences, CRM integrations, you name it. From no-code tools to fully custom pipelines, we build systems that run on their own after setup. You free precious time to allocate to what matters.",
  },
  {
    num: "04",
    title: "Train",
    subtitle: "Your team could do twice as much with the right tools.",
    description:
      "Hands-on AI training for marketing and business teams, on-site or remote. Prompt engineering, content generation, image creation, video editing, data analysis. Every module uses your real data and actual workflows. Your team walks out producing in hours what used to take days. Training your team is now profitable, earning you days to months of saved workload.",
  },
];

export default function Services() {
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
    <section id="services" className="px-6 py-24 md:px-10 md:pt-20 md:pb-[180px]">
      <div className="mx-auto max-w-[1100px]">
        <div ref={headerRef} className="mb-20 text-center opacity-0 md:mb-24">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            What we do
          </span>
          <h2 className="mt-4 font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
            Four ways to accelerate your business
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-0 md:grid-cols-2"
        >
          {services.map((service, i) => (
            <article
              key={service.num}
              className={`border-t border-border py-10 opacity-0 md:py-12 ${
                i % 2 === 1 ? "md:pl-16" : "md:pr-16"
              }`}
            >
              <span className="font-heading text-[15px] text-text-muted">
                {service.num}
              </span>
              <h3 className="mt-2 font-heading text-[26px] text-text">
                {service.title}
              </h3>
              <p className="mt-2 text-[14px] font-medium italic text-text-dim">
                {service.subtitle}
              </p>
              <p className="mt-3 max-w-[480px] text-[15px] font-light leading-relaxed text-text-dim">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
