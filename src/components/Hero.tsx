"use client";

import { useEffect, useRef } from "react";
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
  const textRef = useRef<HTMLSpanElement>(null);
  const prevStageRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!video || !section || !textEl) return;

    // Initialize text at stage 0, hidden (entrance will fade it in)
    textEl.textContent = stageLabels[0];
    textEl.style.opacity = "0";

    // Entrance
    const entranceTl = gsap.timeline({ defaults: { ease: EASE_PRIMARY } });
    entranceTl
      .fromTo(
        videoWrapRef.current,
        { opacity: 0, y: "3vw" },
        { opacity: 1, y: 0, duration: 2, delay: 0.25 }
      )
      .add(() => {
        textEl.style.transition = "opacity 0.6s ease";
        textEl.style.opacity = "1";
      }, 0.8);

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

            // Instant hide, no transition
            textEl.style.transition = "none";
            textEl.style.opacity = "0";

            // Swap text while hidden, then fade in
            setTimeout(() => {
              textEl.textContent = stageLabels[newStage];
              requestAnimationFrame(() => {
                textEl.style.transition = "opacity 0.3s ease";
                textEl.style.opacity = "1";
              });
            }, 80);
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
          <div className="aspect-[16/10] overflow-hidden">
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{
                backgroundColor: "#E8E6E1",
                filter: "saturate(0.85)",
                transform: "scale(1.05)",
              }}
            />
          </div>

          {/* Single text overlay — one DOM element, direct DOM manipulation */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              ref={textRef}
              className="px-8 text-center font-heading text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-3px] text-text"
            />
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
    <section id="hero-mobile" className="px-5 pt-32 pb-20 md:hidden">
      <div className="mx-auto max-w-[1100px] text-center">
        <h1
          ref={headlineRef}
          className="mx-auto max-w-5xl font-heading text-[clamp(40px,11vw,130px)] leading-[0.95] tracking-[-3px] text-text opacity-0"
        >
          We build what others quote.
        </h1>

        <div
          ref={videoContainerRef}
          className="mx-auto mt-10 overflow-hidden rounded-xl opacity-0"
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
