"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Questions", href: "#faq" },
];

export default function Navigation() {
  const [pastHero, setPastHero] = useState(false);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Wait a tick for the Hero ScrollTrigger pin to set up first
    const raf = requestAnimationFrame(() => {
      const heroSection = document.querySelector("#hero");
      if (!heroSection) {
        // Fallback for mobile (no #hero, only #hero-mobile)
        const onScroll = () => setPastHero(window.scrollY > 100);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
      }

      stRef.current = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        // Match the hero's end: +=300%
        end: "+=300%",
        onLeave: () => setPastHero(true),
        onEnterBack: () => setPastHero(false),
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      stRef.current?.kill();
    };
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[400ms] ${
        pastHero
          ? "bg-bg/90 border-b border-border backdrop-blur-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6 md:px-10">
        <a href="#" aria-label="Root Works home" className="flex items-center">
          <Logo className="h-8 w-auto md:h-10" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-text-dim transition-colors duration-[400ms] hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://calendly.com/victor-rootworks"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-text px-6 py-2.5 text-sm font-medium text-white transition-all duration-[400ms] hover:scale-[1.02] hover:opacity-90"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
