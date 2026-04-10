"use client";

import { useEffect, useRef } from "react";

interface Particle {
  lineIdx: number;
  progress: number;
  speed: number;
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
    const LINE_COUNT = 9;
    let lineXs: number[] = [];
    let particles: Particle[] = [];

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

      lineXs = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        lineXs.push(((i + 0.5) / LINE_COUNT) * width);
      }

      particles = [];
      for (let i = 0; i < LINE_COUNT * 2; i++) {
        particles.push({
          lineIdx: i % LINE_COUNT,
          progress: Math.random(),
          // 20-40s per full cycle ≈ 0.000025 - 0.00005 progress/ms
          speed: 0.000025 + Math.random() * 0.000025,
        });
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
      const inside = my >= 0 && my <= height;

      // Vertical lines
      ctx.lineWidth = 1;
      for (let i = 0; i < LINE_COUNT; i++) {
        const x = lineXs[i];
        const dist = Math.abs(x - mx);
        const near = inside && dist < 120 ? 1 - dist / 120 : 0;
        const alpha = 0.04 + near * 0.04;
        ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Rising particles
      for (const p of particles) {
        const x = lineXs[p.lineIdx];
        const dist = Math.abs(x - mx);
        const boost = inside && dist < 120 ? 1 + (1 - dist / 120) * 2 : 1;
        p.progress += p.speed * dt * boost;
        if (p.progress > 1) p.progress -= 1;
        const y = height - p.progress * height;
        const alpha = Math.min(0.14, 0.06 + (boost - 1) * 0.05);
        ctx.fillStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
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
