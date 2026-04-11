"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Build", href: "/build" },
  { label: "Rank", href: "/rank" },
  { label: "Automate", href: "/automate" },
  { label: "Train", href: "/train" },
];

const CALENDLY = "https://calendly.com/victor-rootworks/30min";

export default function Navigation() {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const heroSection = document.querySelector("#hero");
      if (!heroSection) {
        const onScroll = () => setPastHero(window.scrollY > 100);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
      }

      stRef.current = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[400ms] ${
          pastHero || menuOpen
            ? "bg-bg/90 border-b border-border backdrop-blur-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between px-5 md:px-10">
          <a href="/" aria-label="Rootworks home" className="flex items-center">
            <img
              src="/logo-full.png"
              alt="Rootworks"
              className="hidden h-12 w-auto md:block md:h-14"
            />
            <img
              src="/logo-sprout.png"
              alt="Rootworks"
              className="h-10 w-auto md:hidden"
            />
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
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-text px-6 py-2.5 text-sm font-medium text-white transition-all duration-[400ms] hover:scale-[1.02] hover:opacity-90 md:inline-block"
          >
            Book a Call
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center text-text md:hidden"
          >
            <Menu size={24} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-bg transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between px-5">
            <a
              href="/"
              aria-label="Rootworks home"
              onClick={() => setMenuOpen(false)}
              className="flex items-center"
            >
              <img
                src="/logo-sprout.png"
                alt="Rootworks"
                className="h-10 w-auto"
              />
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center text-text"
            >
              <X size={24} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[56px] w-full items-center justify-center font-heading text-[32px] leading-none text-text transition-opacity duration-300 hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="px-6 pb-10">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[16px] font-medium text-white transition-opacity duration-300 hover:opacity-90"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
