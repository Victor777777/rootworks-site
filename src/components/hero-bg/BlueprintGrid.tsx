"use client";

import { useEffect, useRef } from "react";

export default function BlueprintGrid() {
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
    let dots: { x: number; y: number }[] = [];
    const SPACING = 40;
    const BASE_R = 1; // 2px diameter
    const HOVER_R = 2; // 4px diameter
    const INFLUENCE = 150;
    const start = performance.now();

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

      dots = [];
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          dots.push({ x, y });
        }
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

    let rafId = 0;

    const draw = (now: number) => {
      const fade = Math.min(1, (now - start) / 1500);
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const active: { x: number; y: number; influence: number }[] = [];
      for (const d of dots) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < INFLUENCE * INFLUENCE) {
          const dist = Math.sqrt(distSq);
          active.push({ x: d.x, y: d.y, influence: 1 - dist / INFLUENCE });
        }
      }

      // Connection lines between nearby active dots
      ctx.strokeStyle = `rgba(26,26,26,${0.06 * fade})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const CONNECT_SQ = (SPACING * 1.5) * (SPACING * 1.5);
      for (let i = 0; i < active.length; i++) {
        const a = active[i];
        for (let j = i + 1; j < active.length; j++) {
          const b = active[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < CONNECT_SQ) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();

      // Dots
      for (const d of dots) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const distSq = dx * dx + dy * dy;
        const influence =
          distSq < INFLUENCE * INFLUENCE
            ? 1 - Math.sqrt(distSq) / INFLUENCE
            : 0;
        const radius = BASE_R + (HOVER_R - BASE_R) * influence;
        const alpha = (0.04 + influence * 0.04) * fade;
        ctx.fillStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
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
