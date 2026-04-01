"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE_PRIMARY } from "@/lib/gsap";

const stages = [
  { label: "We build your wildest dreams", start: 0, end: 0.2 },
  { label: "From idea", start: 0.2, end: 0.4 },
  { label: "To seed", start: 0.4, end: 0.6 },
  { label: "To growth", start: 0.6, end: 0.8 },
  { label: "We nurture every stage", start: 0.8, end: 1.0 },
];

function DesktopHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Entrance animation
    const entranceTl = gsap.timeline({ defaults: { ease: EASE_PRIMARY } });
    entranceTl
      .fromTo(
        videoWrapRef.current,
        { opacity: 0, y: "3vw" },
        { opacity: 1, y: 0, duration: 2, delay: 0.25 }
      )
      .fromTo(
        overlayRefs.current[0],
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0.6
      );

    const setupScrollVideo = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

      const proxy = { time: 0 };

      const scrollTl = gsap.timeline({
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

      // Scrub video currentTime across full timeline
      scrollTl.to(proxy, {
        time: duration,
        ease: "none",
        duration: 1,
        onUpdate: () => {
          if (video.readyState >= 2) {
            video.currentTime = proxy.time;
          }
        },
      });

      // Text crossfades — each stage fades in then fades out with slight overlap
      stages.forEach((stage, i) => {
        const el = overlayRefs.current[i];
        if (!el) return;

        const fadeDur = 0.06;

        // Fade in (skip for stage 0, it's already visible from entrance)
        if (i > 0) {
          scrollTl.fromTo(
            el,
            { opacity: 0 },
            { opacity: 1, duration: fadeDur, ease: "none" },
            stage.start
          );
        }

        // Fade out before next stage starts (skip for last stage)
        if (i < stages.length - 1) {
          scrollTl.to(
            el,
            { opacity: 0, duration: fadeDur, ease: "none" },
            stage.end - fadeDur
          );
        }
      });
    };

    if (video.readyState >= 1) {
      setupScrollVideo();
    } else {
      video.addEventListener("loadedmetadata", setupScrollVideo, {
        once: true,
      });
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

          {/* Stage text overlays — centered on video */}
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
                i === 0 ? "opacity-0" : "opacity-0"
              }`}
            >
              <span className="px-8 text-center font-heading text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-3px] text-text">
                {stage.label}
              </span>
            </div>
          ))}
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
