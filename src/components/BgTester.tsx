"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  "chuttersnap-jwmFhIi_W18-unsplash.jpg",
  "jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg",
  "kseniya-lapteva-vopD-CchWbk-unsplash.jpg",
  "logan-voss-0ZUgLIf9wag-unsplash.jpg",
  "logan-voss-Vz727hIt-yM-unsplash.jpg",
  "logan-voss-bjzQUfBquKg-unsplash.jpg",
  "logan-voss-meIZHtyFmtc-unsplash.jpg",
  "milad-fakurian-GJKx5lhwU3M-unsplash.jpg",
  "milad-fakurian-HE1_K4_-QT8-unsplash.jpg",
  "pawel-czerwinski-9T8fywAF54I-unsplash.jpg",
  "susan-wilkinson-3LwLlMsaC4E-unsplash.jpg",
];

export default function BgTester() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIdx((i) => (i + 1) % IMAGES.length);

  return (
    <>
      {/* Fixed background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/bg-test/${IMAGES[idx]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* White overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-white/65"
      />

      {/* Controls */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous background"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="rounded-full bg-black/80 px-4 py-2 text-[12px] font-medium text-white shadow-lg backdrop-blur-sm">
          {idx + 1} / {IMAGES.length}
        </div>
        <button
          onClick={next}
          aria-label="Next background"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
