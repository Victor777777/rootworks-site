"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, EASE_PRIMARY } from "@/lib/gsap";

const stageLabels = [
  "We build your wildest dreams",
  "From idea",
  "To seed",
  "To growth",
  "We nurture every stage",
];

function DesktopHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const prevStageRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  // Text crossfade on stage change
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setTextVisible(false);
    const t = setTimeout(() => setTextVisible(true), 150);
    return () => clearTimeout(t);
  }, [activeStage]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Entrance
    const entranceTl = gsap.timeline({ defaults: { ease: EASE_PRIMARY } });
    entranceTl
      .fromTo(
        videoWrapRef.current,
        { opacity: 0, y: "3vw" },
        { opacity: 1, y: 0, duration: 2, delay: 0.25 }
      )
      .add(() => setTextVisible(true), 0.8);

    const setup = () => {
      const dur = video.duration;
      if (!dur || !isFinite(dur)) return;

      video.currentTime = 0;

      const proxy = { time: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "hero-pin",
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
            duration: { min: 0.4, max: 0.8 },
            ease: "power2.inOut",
          },
        },
      });

      tl.to(proxy, {
        time: dur,
        ease: "none",
        duration: 1,
        onUpdate: () => {
          if (video.readyState >= 2) {
            video.currentTime = proxy.time;
          }

          const st = tl.scrollTrigger;
          if (!st) return;
          const progress = st.progress;
          const newStage = Math.min(4, Math.floor(progress * 5));

          if (newStage !== prevStageRef.current) {
            prevStageRef.current = newStage;
            setActiveStage(newStage);
          }
        },
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      ScrollTrigger.getById("hero-pin")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative hidden md:block"
      style={{ minHeight: "100vh" }}
    >
      <div className="px-6 pt-20 pb-10 md:px-10">
        <div
          ref={videoWrapRef}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl opacity-0 shadow-[0_8px_60px_rgba(0,0,0,0.06)]"
        >
          <div className="aspect-[16/10]">
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{ backgroundColor: "#E8E6E1" }}
            />
          </div>

          {/* Single text overlay — one DOM element, text swaps via state */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="px-8 text-center font-heading text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-3px] text-text transition-opacity duration-300"
              style={{ opacity: textVisible ? 1 : 0 }}
            >
              {stageLabels[activeStage]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: EASE_PRIMARY } });
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: "10vw" },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.25 }
    ).fromTo(
      videoContainerRef.current,
      { opacity: 0, y: "5vw" },
      { opacity: 1, y: 0, duration: 2 },
      0.4
    );
  }, []);

  return (
    <section id="hero-mobile" className="px-6 pt-36 pb-24 md:hidden">
      <div className="mx-auto max-w-[1100px] text-center">
        <h1
          ref={headlineRef}
          className="mx-auto max-w-5xl font-heading text-[clamp(44px,10vw,130px)] leading-[0.95] tracking-[-3px] text-text opacity-0"
        >
          We build what others quote.
        </h1>

        <div
          ref={videoContainerRef}
          className="mx-auto mt-10 overflow-hidden rounded-2xl opacity-0"
        >
          <div className="aspect-[16/9]">
            <video
              src="/hero-video.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{ backgroundColor: "#E8E6E1" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <DesktopHero />
      <MobileHero />
    </>
  );
}
