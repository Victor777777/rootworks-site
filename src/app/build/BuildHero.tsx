"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CALENDLY = "https://calendly.com/victor-rootworks/30min";

const BG_IMAGES = [
  "milad-fakurian-GJKx5lhwU3M-unsplash.jpg",
  "pawel-czerwinski-9T8fywAF54I-unsplash.jpg",
  "milad-fakurian-HE1_K4_-QT8-unsplash.jpg",
  "jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg",
];

export default function BuildHero() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + BG_IMAGES.length) % BG_IMAGES.length);
  const next = () => setIdx((i) => (i + 1) % BG_IMAGES.length);

  return (
    <section
      className="relative overflow-hidden px-5 pt-32 pb-20 md:px-10 md:pt-48 md:pb-32"
      style={{
        backgroundImage: `url(/build-bg/${BG_IMAGES[idx]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* White overlay so image is a subtle texture */}
      <div className="absolute inset-0 bg-white/35" />

      {/* Hero content */}
      <ScrollReveal className="relative z-10 mx-auto max-w-[1000px] text-center">
        <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
          Build
        </span>
        <h1 className="mt-6 font-heading text-[clamp(40px,9vw,112px)] leading-[1.02] tracking-[-3px] text-text">
          From idea to product
        </h1>
        <p className="mx-auto mt-8 max-w-[640px] text-[16px] font-light leading-[1.65] text-text-dim md:text-[clamp(17px,1.6vw,20px)]">
          We turn your vision into a production-ready application.
          Custom-built, beautifully designed, and entirely yours.
        </p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:inline-flex md:w-auto md:hover:scale-[1.02]"
        >
          Book a Discovery Call
        </a>
      </ScrollReveal>

      {/* Preview controls */}
      <button
        onClick={prev}
        aria-label="Previous background"
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-text shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next background"
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-text shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-white px-4 py-2 text-center shadow-lg">
        <div className="text-[11px] font-semibold uppercase tracking-[2px] text-text-muted">
          Image {idx + 1} / {BG_IMAGES.length}
        </div>
        <div className="mt-0.5 text-[11px] text-text-dim">{BG_IMAGES[idx]}</div>
      </div>
    </section>
  );
}
