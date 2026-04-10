"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  baseAlpha: number;
}

export default function RisingLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const COUNT = 50;
    const INFLUENCE = 120;

    const spawn = (randomY: boolean): Particle => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + Math.random() * 20,
      radius: 1.5 + Math.random() * 1.5,
      // 30-60s to cross full height → px/ms
      speed: 0,
      baseAlpha: 0.03 + Math.random() * 0.05,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      for (let i = 0; i < COUNT; i++) {
        const p = spawn(true);
        // Per-particle: 30-60s to travel `height`
        p.speed = height / (30000 + Math.random() * 30000);
        particles.push(p);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    let lastTime = performance.now();
    let rafId = 0;

    const draw = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const near =
          distSq < INFLUENCE * INFLUENCE
            ? 1 - Math.sqrt(distSq) / INFLUENCE
            : 0;

        const speedMul = 1 + near * 1; // up to 2x
        p.y -= p.speed * dt * speedMul;

        if (p.y < -p.radius) {
          p.x = Math.random() * width;
          p.y = height + p.radius;
          p.speed = height / (30000 + Math.random() * 30000);
          p.radius = 1.5 + Math.random() * 1.5;
          p.baseAlpha = 0.03 + Math.random() * 0.05;
        }

        const alpha = p.baseAlpha + near * (0.12 - p.baseAlpha);
        ctx.fillStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(245,243,239,0.3) 100%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      />
    </>
  );
}
