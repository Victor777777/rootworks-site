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

const TOTAL_STAGES = stageLabels.length;
const LOCK_MS = 800;

function DesktopHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  const stageRef = useRef(0);
  const isAnimating = useRef(false);
  const isPinned = useRef(false);
  const stInstance = useRef<ScrollTrigger | null>(null);

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

    // Wait for video metadata
    const setup = () => {
      const dur = video.duration;
      if (!dur || !isFinite(dur)) return;

      // Set initial frame
      video.currentTime = 0;

      // Pin the section — NO scrub, NO snap. We control everything manually.
      stInstance.current = ScrollTrigger.create({
        id: "hero-pin",
        trigger: section,
        start: "top top",
        // Large end distance so there's scroll runway to "consume"
        end: "+=400%",
        pin: true,
        anticipatePin: 1,
        onEnter: () => {
          isPinned.current = true;
        },
        onLeave: () => {
          isPinned.current = false;
        },
        onEnterBack: () => {
          isPinned.current = true;
          // Re-entering from below: reset to last stage
          stageRef.current = TOTAL_STAGES - 1;
          setActiveStage(TOTAL_STAGES - 1);
          if (video.readyState >= 2) {
            video.currentTime = dur;
          }
        },
        onLeaveBack: () => {
          isPinned.current = false;
        },
      });

      const goToStage = (nextStage: number) => {
        if (nextStage < 0 || nextStage >= TOTAL_STAGES) return;
        if (isAnimating.current) return;

        isAnimating.current = true;
        stageRef.current = nextStage;
        setActiveStage(nextStage);

        const targetTime = (nextStage / (TOTAL_STAGES - 1)) * dur;
        gsap.to(video, {
          currentTime: targetTime,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      };

      // Wheel handler — one scroll = one stage
      const handleWheel = (e: WheelEvent) => {
        if (!isPinned.current) return;
        if (isAnimating.current) {
          e.preventDefault();
          return;
        }

        const direction = e.deltaY > 0 ? 1 : -1;
        const nextStage = stageRef.current + direction;

        // At boundaries, let ScrollTrigger handle pin/unpin naturally
        if (nextStage >= TOTAL_STAGES) {
          // Let scroll pass through — ScrollTrigger will unpin
          isPinned.current = false;
          return;
        }
        if (nextStage < 0) {
          // Let scroll pass through upward
          isPinned.current = false;
          return;
        }

        // Consume the scroll event — we handle it
        e.preventDefault();
        goToStage(nextStage);
      };

      // Touch handler for mobile-like trackpad gestures within desktop
      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const handleTouchEnd = (e: TouchEvent) => {
        if (!isPinned.current || isAnimating.current) return;
        const deltaY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) < 30) return;

        const direction = deltaY > 0 ? 1 : -1;
        const nextStage = stageRef.current + direction;

        if (nextStage >= TOTAL_STAGES || nextStage < 0) {
          isPinned.current = false;
          return;
        }

        e.preventDefault();
        goToStage(nextStage);
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    };

    let cleanupListeners: (() => void) | undefined;

    if (video.readyState >= 1) {
      cleanupListeners = setup();
    } else {
      const onMeta = () => {
        cleanupListeners = setup();
      };
      video.addEventListener("loadedmetadata", onMeta, { once: true });
    }

    return () => {
      cleanupListeners?.();
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

          {/* Single text overlay */}
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
