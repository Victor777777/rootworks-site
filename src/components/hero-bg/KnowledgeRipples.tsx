"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  born: number;
  duration: number;
  maxRadius: number;
  baseAlpha: number;
}

export default function KnowledgeRipples() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let ripples: Ripple[] = [];
    let lastCenterSpawn = 0;
    let lastCursorSpawn = 0;

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
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.inside = x >= 0 && x <= width && y >= 0 && y <= height;
    };
    window.addEventListener("mousemove", onMove);

    let rafId = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.hypot(width, height) / 2;

      // Center ripple every 3s
      if (now - lastCenterSpawn > 3000) {
        ripples.push({
          x: cx,
          y: cy,
          born: now,
          duration: 15000,
          maxRadius: maxR,
          baseAlpha: 0.06,
        });
        lastCenterSpawn = now;
      }

      // Cursor ripple every 700ms when inside
      if (mouseRef.current.inside && now - lastCursorSpawn > 700) {
        ripples.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          born: now,
          duration: 4000,
          maxRadius: 180,
          baseAlpha: 0.08,
        });
        lastCursorSpawn = now;
      }

      ctx.lineWidth = 1;
      ripples = ripples.filter((r) => {
        const age = now - r.born;
        if (age > r.duration) return false;
        const t = age / r.duration;
        const radius = t * r.maxRadius;
        const alpha = r.baseAlpha * (1 - t);
        ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

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
