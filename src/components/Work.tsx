"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { gsap, EASE_PRIMARY } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Project data ── */

interface Project {
  image: string;
  category: string;
  logos: string[];
}

const projects: Project[] = [
  {
    image: "/work/trialsalert.png",
    category: "Healthcare SaaS",
    logos: ["react", "typescript", "supabase", "stripe", "openai", "vercel"],
  },
  {
    image: "/work/robertplatania.png",
    category: "Website Creation",
    logos: ["nextdotjs", "react", "framer", "vercel"],
  },
  {
    image: "/work/n8n-itops.png",
    category: "IT Ops Automation",
    logos: ["n8n", "openai", "slack", "jira", "docker"],
  },
  {
    image: "/work/training.jpg",
    category: "AI Training",
    logos: ["openai", "anthropic", "canva", "google"],
  },
];

/* ── Slide ── */

function Slide({ project }: { project: Project }) {
  return (
    <div className="px-2 py-4 md:px-6 md:py-6">
      <div
        className="overflow-hidden rounded-2xl lg:rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Image — top, large */}
        <div className="overflow-hidden">
          <img
            src={project.image}
            alt={project.category}
            className="aspect-[16/9] w-full object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Minimal info bar — category left, logos right */}
        <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-5">
          <span className="text-[11px] font-medium uppercase tracking-[3px] text-text-muted">
            {project.category}
          </span>

          <div className="flex items-center gap-2.5">
            {project.logos.map((name) => (
              <img
                key={name}
                src={`/work/logos/${name}.svg`}
                alt={name}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselAreaRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
    align: "start",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  /* Scroll reveal */
  useEffect(() => {
    if (!headerRef.current || !carouselAreaRef.current) return;

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
        carouselAreaRef.current,
        { opacity: 0, y: "6vw" },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.25,
          ease: EASE_PRIMARY,
          scrollTrigger: {
            trigger: carouselAreaRef.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      className="bg-bg-warm py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Header */}
        <div ref={headerRef} className="mb-8 opacity-0 md:mb-10">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            Selected work
          </span>
          <h2 className="mt-4 font-heading text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
            Our work
          </h2>
        </div>
      </div>

      {/* Carousel — full width for arrow positioning */}
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div ref={carouselAreaRef} className="opacity-0">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {projects.map((p, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  <Slide project={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows — centered on the image area (image is ~85% of card, so 42% from top) */}
        <button
          onClick={scrollPrev}
          aria-label="Previous project"
          className="absolute top-[42%] -left-4 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-text-dim shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-text md:block lg:-left-8"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next project"
          className="absolute top-[42%] -right-4 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-text-dim shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-text md:block lg:-right-8"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-[400ms] ${
                i === selectedIndex
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
