import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    const startTime = Date.now();

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
        initElements();
      }, 150);
    };
    window.addEventListener("resize", debouncedResize);

    let mouseThrottle = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottle) return;
      mouseThrottle = true;
      setTimeout(() => (mouseThrottle = false), 16);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    interface Node {
      x: number; y: number; baseX: number; baseY: number;
      radius: number; isAccent: boolean; baseOpacity: number;
      offset: number; pulseSpeed: number;
    }
    interface DataPulse {
      fromIdx: number; toIdx: number; progress: number;
      speed: number; isRed: boolean;
    }
    interface DataStream {
      x: number; y: number; speed: number; length: number;
      opacity: number; chars: string[]; charOffset: number;
    }
    interface HexRing {
      x: number; y: number; radius: number; rotation: number;
      rotSpeed: number; opacity: number; isAccent: boolean;
    }
    interface CircuitTrace {
      points: { x: number; y: number }[];
      progress: number; speed: number; opacity: number;
      length: number; isAccent: boolean;
    }

    const gridSpacing = 45;
    let nodes: Node[] = [];
    let pulses: DataPulse[] = [];
    let streams: DataStream[] = [];
    let hexRings: HexRing[] = [];
    let traces: CircuitTrace[] = [];
    const connectionDist = 120;
    const connectionDistSq = connectionDist * connectionDist;
    const streamChars = "01".split("");

    function initElements() {
      const w = canvas.width;
      const h = canvas.height;

      const nodeCount = Math.floor((w * h) / 8000);
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const isAccent = Math.random() < 0.22;
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          baseX: Math.random() * w, baseY: Math.random() * h,
          radius: isAccent ? 2 + Math.random() * 2 : 1 + Math.random() * 1.2,
          isAccent,
          baseOpacity: isAccent ? 0.6 + Math.random() * 0.35 : 0.22 + Math.random() * 0.25,
          offset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.5 + Math.random() * 0.8,
        });
      }

      pulses = [];

      const streamCount = Math.floor(w / 50);
      streams = [];
      for (let i = 0; i < streamCount; i++) {
        const charCount = 4 + Math.floor(Math.random() * 8);
        const chars: string[] = [];
        for (let c = 0; c < charCount; c++) {
          chars.push(streamChars[Math.floor(Math.random() * streamChars.length)]);
        }
        streams.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 25 + Math.random() * 55,
          length: charCount,
          opacity: 0.06 + Math.random() * 0.1,
          chars,
          charOffset: Math.random() * 100,
        });
      }

      const ringCount = 4 + Math.floor(Math.random() * 3);
      hexRings = [];
      for (let i = 0; i < ringCount; i++) {
        hexRings.push({
          x: Math.random() * w, y: Math.random() * h,
          radius: 30 + Math.random() * 60,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.4,
          opacity: 0.06 + Math.random() * 0.08,
          isAccent: Math.random() < 0.5,
        });
      }

      const traceCount = 6 + Math.floor(Math.random() * 4);
      traces = [];
      for (let i = 0; i < traceCount; i++) {
        const pts: { x: number; y: number }[] = [];
        let cx = Math.random() * w;
        let cy = Math.random() * h;
        const segCount = 4 + Math.floor(Math.random() * 6);
        pts.push({ x: cx, y: cy });
        for (let s = 0; s < segCount; s++) {
          if (Math.random() < 0.5) {
            cx += (Math.random() < 0.5 ? 1 : -1) * (40 + Math.random() * 80);
          } else {
            cy += (Math.random() < 0.5 ? 1 : -1) * (40 + Math.random() * 80);
          }
          cx = Math.max(0, Math.min(w, cx));
          cy = Math.max(0, Math.min(h, cy));
          pts.push({ x: cx, y: cy });
        }
        traces.push({
          points: pts,
          progress: Math.random(),
          speed: 0.15 + Math.random() * 0.25,
          opacity: 0.08 + Math.random() * 0.1,
          length: 0.15 + Math.random() * 0.15,
          isAccent: Math.random() < 0.4,
        });
      }
    }
    initElements();

    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;

    function drawHex(cx: number, cy: number, r: number, rot: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rot + (Math.PI / 3) * i;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = currentTime - (elapsed % frameInterval);

      const w = canvas.width;
      const h = canvas.height;
      const time = (Date.now() - startTime) * 0.001;
      const dt = elapsed * 0.001;

      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      for (let x = 0; x < w; x += gridSpacing) {
        for (let y = 0; y < h; y += gridSpacing) {
          const flicker = Math.sin(time * 0.8 + x * 0.02 + y * 0.015) * 0.5 + 0.5;
          const intAlpha = 0.04 + flicker * 0.06;
          ctx.fillStyle = `rgba(255, 255, 255, ${intAlpha})`;
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }

      for (let i = 0; i < traces.length; i++) {
        const tr = traces[i];
        tr.progress = (tr.progress + tr.speed * dt) % 1;
        const pts = tr.points;
        const totalSegs = pts.length - 1;

        ctx.strokeStyle = tr.isAccent
          ? `rgba(255, 30, 15, ${tr.opacity * 0.5})`
          : `rgba(100, 110, 140, ${tr.opacity * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let s = 1; s < pts.length; s++) {
          ctx.lineTo(pts[s].x, pts[s].y);
        }
        ctx.stroke();

        const headPos = tr.progress;
        const tailPos = headPos - tr.length;

        for (let s = 0; s < totalSegs; s++) {
          const segStart = s / totalSegs;
          const segEnd = (s + 1) / totalSegs;
          const drawStart = Math.max(segStart, tailPos < 0 ? tailPos + 1 : tailPos);
          const drawEnd = Math.min(segEnd, headPos);

          if (drawStart < drawEnd) {
            const t1 = (drawStart - segStart) / (segEnd - segStart);
            const t2 = (drawEnd - segStart) / (segEnd - segStart);
            const x1 = pts[s].x + (pts[s + 1].x - pts[s].x) * t1;
            const y1 = pts[s].y + (pts[s + 1].y - pts[s].y) * t1;
            const x2 = pts[s].x + (pts[s + 1].x - pts[s].x) * t2;
            const y2 = pts[s].y + (pts[s + 1].y - pts[s].y) * t2;

            ctx.strokeStyle = tr.isAccent
              ? `rgba(255, 50, 30, ${tr.opacity * 3})`
              : `rgba(150, 170, 255, ${tr.opacity * 2.5})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }

        const headSeg = Math.min(Math.floor(headPos * totalSegs), totalSegs - 1);
        const headT = (headPos * totalSegs) - headSeg;
        const hx = pts[headSeg].x + (pts[headSeg + 1].x - pts[headSeg].x) * headT;
        const hy = pts[headSeg].y + (pts[headSeg + 1].y - pts[headSeg].y) * headT;

        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 8);
        if (tr.isAccent) {
          hg.addColorStop(0, `rgba(255, 80, 40, ${tr.opacity * 5})`);
          hg.addColorStop(1, "rgba(255, 0, 0, 0)");
        } else {
          hg.addColorStop(0, `rgba(150, 180, 255, ${tr.opacity * 4})`);
          hg.addColorStop(1, "rgba(100, 120, 255, 0)");
        }
        ctx.fillStyle = hg;
        ctx.fillRect(hx - 8, hy - 8, 16, 16);
      }

      for (let i = 0; i < hexRings.length; i++) {
        const ring = hexRings[i];
        ring.rotation += ring.rotSpeed * dt;
        const pulse = Math.sin(time * 0.6 + i) * 0.03 + 0.03;

        ctx.strokeStyle = ring.isAccent
          ? `rgba(255, 30, 15, ${ring.opacity + pulse})`
          : `rgba(120, 140, 180, ${ring.opacity + pulse})`;
        ctx.lineWidth = 1;
        drawHex(ring.x, ring.y, ring.radius, ring.rotation);
        ctx.stroke();

        ctx.strokeStyle = ring.isAccent
          ? `rgba(255, 30, 15, ${(ring.opacity + pulse) * 0.4})`
          : `rgba(120, 140, 180, ${(ring.opacity + pulse) * 0.4})`;
        ctx.lineWidth = 0.5;
        drawHex(ring.x, ring.y, ring.radius * 0.6, -ring.rotation * 0.7);
        ctx.stroke();
      }

      ctx.font = "11px monospace";
      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];
        s.y += s.speed * dt;
        if (s.y > h + s.length * 14 + 40) {
          s.y = -s.length * 14 - 20;
          for (let c = 0; c < s.chars.length; c++) {
            s.chars[c] = streamChars[Math.floor(Math.random() * streamChars.length)];
          }
        }
        s.charOffset += dt * 8;

        for (let c = 0; c < s.chars.length; c++) {
          const cy = s.y - c * 14;
          if (cy < -14 || cy > h + 14) continue;

          const fadeZone = h * 0.12;
          let alpha = s.opacity;
          if (cy < fadeZone) alpha *= cy / fadeZone;
          if (cy > h - fadeZone) alpha *= (h - cy) / fadeZone;
          alpha = Math.max(0, alpha);

          const headFade = c === 0 ? 2.5 : c === 1 ? 1.6 : 1;
          alpha *= headFade;

          if (Math.floor(s.charOffset + c) % 7 === 0) {
            s.chars[c] = streamChars[Math.floor(Math.random() * streamChars.length)];
          }

          ctx.fillStyle = c === 0
            ? `rgba(255, 100, 80, ${alpha})`
            : `rgba(255, 25, 15, ${alpha})`;
          ctx.fillText(s.chars[c], s.x, cy);
        }
      }

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const mouseRadius = 280;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const driftX = Math.sin(time * 0.18 + node.offset) * 7 +
          Math.sin(time * 0.1 + node.offset * 1.7) * 4;
        const driftY = Math.cos(time * 0.14 + node.offset * 1.3) * 7 +
          Math.cos(time * 0.08 + node.offset * 2.1) * 4;
        node.x = node.baseX + driftX;
        node.y = node.baseY + driftY;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouseRadiusSq) {
          const mDist = Math.sqrt(mDistSq);
          const influence = 1 - mDist / mouseRadius;
          const angle = Math.atan2(mdy, mdx);
          node.x -= Math.cos(angle) * influence * 28;
          node.y -= Math.sin(angle) * influence * 28;
        }
      }

      const connections: [number, number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            connections.push([i, j, dist]);
            const lineOpacity = (1 - dist / connectionDist) * 0.18;
            if (a.isAccent || b.isAccent) {
              ctx.strokeStyle = `rgba(255, 30, 15, ${lineOpacity * 2.2})`;
            } else {
              ctx.strokeStyle = `rgba(130, 145, 185, ${lineOpacity})`;
            }
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (connections.length > 0 && Math.random() < 0.25) {
        const [fromIdx, toIdx] = connections[Math.floor(Math.random() * connections.length)];
        pulses.push({
          fromIdx, toIdx, progress: 0,
          speed: 2 + Math.random() * 2.5,
          isRed: nodes[fromIdx].isAccent || nodes[toIdx].isAccent,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * dt;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        const pulseAlpha = Math.sin(p.progress * Math.PI);

        const pg = ctx.createRadialGradient(px, py, 0, px, py, 10);
        if (p.isRed) {
          pg.addColorStop(0, `rgba(255, 70, 40, ${pulseAlpha * 0.9})`);
          pg.addColorStop(0.4, `rgba(255, 20, 10, ${pulseAlpha * 0.3})`);
          pg.addColorStop(1, "rgba(255, 0, 0, 0)");
        } else {
          pg.addColorStop(0, `rgba(160, 190, 255, ${pulseAlpha * 0.8})`);
          pg.addColorStop(1, "rgba(100, 130, 255, 0)");
        }
        ctx.fillStyle = pg;
        ctx.fillRect(px - 10, py - 10, 20, 20);
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * node.pulseSpeed + node.offset) * 0.15 + 0.15;
        let opacity = node.baseOpacity + pulse;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        let mouseInfluence = 0;
        if (mDistSq < mouseRadiusSq) {
          mouseInfluence = 1 - Math.sqrt(mDistSq) / mouseRadius;
          opacity = Math.min(1.0, opacity + mouseInfluence * 0.6);
        }
        const r = node.radius + mouseInfluence * 3.5;

        if (node.isAccent) {
          const glowR = r * 7;
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          glow.addColorStop(0, `rgba(255, 45, 20, ${opacity * 0.8})`);
          glow.addColorStop(0.25, `rgba(255, 20, 8, ${opacity * 0.3})`);
          glow.addColorStop(0.6, `rgba(180, 0, 0, ${opacity * 0.08})`);
          glow.addColorStop(1, "rgba(100, 0, 0, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - glowR, node.y - glowR, glowR * 2, glowR * 2);

          ctx.fillStyle = `rgba(255, 100, 70, ${Math.min(1, opacity * 1.3)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(150, 165, 210, ${opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const scan1 = (time * 60) % h;
      const scan2 = ((time * 42) + h * 0.4) % h;
      const scan3 = ((time * 28) + h * 0.7) % h;
      for (const sy of [scan1, scan2, scan3]) {
        const sg = ctx.createLinearGradient(0, sy - 15, 0, sy + 15);
        sg.addColorStop(0, "rgba(255, 20, 10, 0)");
        sg.addColorStop(0.5, "rgba(255, 20, 10, 0.03)");
        sg.addColorStop(1, "rgba(255, 20, 10, 0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, sy - 15, w, 30);
      }

      ctx.fillStyle = "rgba(255, 15, 10, 0.01)";
      ctx.fillRect(0, 0, w, h);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0d0d0f 0%, #08080a 100%)" }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}
