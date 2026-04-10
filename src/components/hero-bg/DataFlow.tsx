"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  radius: number;
  connections: number[];
}

interface Edge {
  a: number;
  b: number;
  ctrlX: number;
  ctrlY: number;
}

interface Packet {
  from: number;
  to: number;
  edgeIdx: number;
  reversed: boolean;
  t: number;
  speed: number; // t per ms
  pauseUntil: number;
}

function quadPoint(
  p0x: number,
  p0y: number,
  cx: number,
  cy: number,
  p1x: number,
  p1y: number,
  t: number
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0x + 2 * mt * t * cx + t * t * p1x,
    y: mt * mt * p0y + 2 * mt * t * cy + t * t * p1y,
  };
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
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];

    const findEdge = (a: number, b: number) =>
      edges.findIndex(
        (e) => (e.a === a && e.b === b) || (e.a === b && e.b === a)
      );

    const launchPacket = (fromNode: number, now: number): Packet => {
      const from = nodes[fromNode];
      const destIdx =
        from.connections[Math.floor(Math.random() * from.connections.length)];
      const edgeIdx = findEdge(fromNode, destIdx);
      const edge = edges[edgeIdx];
      const reversed = edge.b === fromNode;
      return {
        from: fromNode,
        to: destIdx,
        edgeIdx,
        reversed,
        t: 0,
        speed: 0.0008 + Math.random() * 0.0006, // ~0.8-1.4s per edge
        pauseUntil: now,
      };
    };

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

      // Balanced placement: 4x4 grid, jitter within each cell
      const cols = 5;
      const rows = 3;
      nodes = [];
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cellW = width / cols;
          const cellH = height / rows;
          const x = cellW * cx + cellW * (0.2 + Math.random() * 0.6);
          const y = cellH * cy + cellH * (0.2 + Math.random() * 0.6);
          nodes.push({
            x,
            y,
            radius: 2 + Math.random() * 1,
            connections: [],
          });
        }
      }

      // Connect each node to 2 nearest neighbors
      for (let i = 0; i < nodes.length; i++) {
        const dists: { idx: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          dists.push({ idx: j, d: dx * dx + dy * dy });
        }
        dists.sort((a, b) => a.d - b.d);
        for (let k = 0; k < 2; k++) {
          const j = dists[k].idx;
          if (!nodes[i].connections.includes(j)) {
            nodes[i].connections.push(j);
          }
          if (!nodes[j].connections.includes(i)) {
            nodes[j].connections.push(i);
          }
        }
      }

      // Build unique edges with curved control points
      edges = [];
      const seen = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const a = nodes[i];
          const b = nodes[j];
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          // Perpendicular offset for curvature
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const perpX = -dy / len;
          const perpY = dx / len;
          const offset = (Math.random() - 0.5) * len * 0.3;
          edges.push({
            a: i,
            b: j,
            ctrlX: midX + perpX * offset,
            ctrlY: midY + perpY * offset,
          });
        }
      }

      // Spawn 7 traveling packets
      packets = [];
      const now = performance.now();
      for (let i = 0; i < 7; i++) {
        const startNode = Math.floor(Math.random() * nodes.length);
        if (nodes[startNode].connections.length === 0) continue;
        const p = launchPacket(startNode, now);
        p.t = Math.random();
        packets.push(p);
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

      // Find nearest node to cursor
      let nearestIdx = -1;
      let nearestDistSq = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mx;
        const dy = nodes[i].y - my;
        const d = dx * dx + dy * dy;
        if (d < nearestDistSq) {
          nearestDistSq = d;
          nearestIdx = i;
        }
      }
      const hasMouse = nearestDistSq < 250 * 250;

      // Draw edges
      ctx.lineWidth = 0.5;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        // Distance from midpoint to cursor for brightness
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const edx = midX - mx;
        const edy = midY - my;
        const edist = Math.sqrt(edx * edx + edy * edy);
        const near = edist < 150 ? 1 - edist / 150 : 0;
        const alpha = 0.04 + near * 0.06;
        ctx.strokeStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(e.ctrlX, e.ctrlY, b.x, b.y);
        ctx.stroke();
      }

      // Update + draw packets
      for (const p of packets) {
        if (now < p.pauseUntil) continue;
        p.t += p.speed * dt;
        if (p.t >= 1) {
          // Arrived. Pause, then relaunch from destination.
          const newStart = p.to;
          if (nodes[newStart].connections.length === 0) {
            p.t = 0;
            p.pauseUntil = now + 200;
            continue;
          }
          const destIdx =
            nodes[newStart].connections[
              Math.floor(Math.random() * nodes[newStart].connections.length)
            ];
          const edgeIdx = findEdge(newStart, destIdx);
          const edge = edges[edgeIdx];
          p.from = newStart;
          p.to = destIdx;
          p.edgeIdx = edgeIdx;
          p.reversed = edge.b === newStart;
          p.t = 0;
          p.speed = 0.0008 + Math.random() * 0.0006;
          p.pauseUntil = now + 200;
          continue;
        }

        const edge = edges[p.edgeIdx];
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const t = p.reversed ? 1 - p.t : p.t;
        const pos = quadPoint(a.x, a.y, edge.ctrlX, edge.ctrlY, b.x, b.y, t);
        ctx.fillStyle = "rgba(26,26,26,0.1)";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let radius = n.radius;
        let alpha = 0.06;
        if (hasMouse && i === nearestIdx) {
          // Pulse 1 to 1.5 on ~1.2s cycle
          const pulse = 1 + (Math.sin(now / 200) * 0.5 + 0.5) * 0.5;
          radius = n.radius * pulse;
          alpha = 0.15;
        }
        ctx.fillStyle = `rgba(26,26,26,${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
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
