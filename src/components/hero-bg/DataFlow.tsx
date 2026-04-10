"use client";

import { useEffect, useRef } from "react";

interface Packet {
  lineIdx: number;
  progress: number;
  speed: number;
}

export default function DataFlow() {
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
    const LINE_COUNT = 7;
    let lineYs: number[] = [];
    let packets: Packet[] = [];
    let intersections: { x: number; y: number; phase: number }[] = [];

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

      lineYs = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        lineYs.push(((i + 0.5) / LINE_COUNT) * height);
      }

      packets = [];
      for (let i = 0; i < LINE_COUNT * 2; i++) {
        packets.push({
          lineIdx: i % LINE_COUNT,
          progress: Math.random(),
          speed: 0.00005 + Math.random() * 0.00007,
        });
      }

      intersections = [
        { x: width * 0.2, y: lineYs[1], phase: 0 },
        { x: width * 0.45, y: lineYs[4], phase: 0.25 },
        { x: width * 0.7, y: lineYs[2], phase: 0.5 },
        { x: width * 0.88, y: lineYs[5], phase: 0.75 },
      ];
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
      const inside = mx >= 0 && mx <= width;

      // Horizontal lines
      ctx.lineWidth = 1;
      for (let i = 0; i < LINE_COUNT; i++) {
        const y = lineYs[i];
        const dist = Math.abs(y - my);
        const near = inside && dist < 100 ? 1 - dist / 100 : 0;
        const alpha = 0.04 + near * 0.04;
        ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Packets
      for (const p of packets) {
        const y = lineYs[p.lineIdx];
        const dist = Math.abs(y - my);
        const boost = inside && dist < 100 ? 1 + (1 - dist / 100) * 2 : 1;
        p.progress += p.speed * dt * boost;
        if (p.progress > 1.05) p.progress = -0.05;
        const x = p.progress * width;
        if (x < -4 || x > width + 4) continue;
        const alpha = Math.min(0.15, 0.06 + (boost - 1) * 0.05);
        ctx.fillStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsing intersections (3s cycle, scale 1 to 1.2)
      const basePhase = (now / 3000) % 1;
      for (const p of intersections) {
        const phase = (basePhase + p.phase) % 1;
        const scale = 1 + Math.sin(phase * Math.PI * 2) * 0.1;
        ctx.fillStyle = `rgba(26,26,26,0.05)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(26,26,26,0.07)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 * scale, 0, Math.PI * 2);
        ctx.stroke();
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
