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
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      isAccent: boolean;
      baseOpacity: number;
      offset: number;
      pulseSpeed: number;
    }

    interface DataPulse {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      isRed: boolean;
    }

    interface FloatingGlyph {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      char: string;
      size: number;
      column: number;
    }

    const gridSpacing = 50;
    let nodes: Node[] = [];
    let pulses: DataPulse[] = [];
    let glyphs: FloatingGlyph[] = [];
    const connectionDist = 130;
    const connectionDistSq = connectionDist * connectionDist;
    const glyphChars = "01001101011010001110100101".split("");

    function initElements() {
      const w = canvas.width;
      const h = canvas.height;

      const nodeCount = Math.floor((w * h) / 10000);
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const isAccent = Math.random() < 0.2;
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: isAccent ? 2 + Math.random() * 1.5 : 1 + Math.random() * 1,
          isAccent,
          baseOpacity: isAccent ? 0.6 + Math.random() * 0.3 : 0.2 + Math.random() * 0.25,
          offset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 0.6,
        });
      }

      pulses = [];

      const glyphCount = Math.floor(w / 80);
      glyphs = [];
      for (let i = 0; i < glyphCount; i++) {
        const col = (i * 80) + Math.random() * 40;
        const count = 3 + Math.floor(Math.random() * 5);
        for (let j = 0; j < count; j++) {
          glyphs.push({
            x: col,
            y: Math.random() * h,
            speed: 15 + Math.random() * 30,
            opacity: 0.04 + Math.random() * 0.08,
            char: glyphChars[Math.floor(Math.random() * glyphChars.length)],
            size: 10 + Math.random() * 4,
            column: i,
          });
        }
      }
    }
    initElements();

    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;

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

      ctx.fillStyle = "#06060a";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
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
          const flicker = Math.sin(time * 0.5 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
          const intAlpha = 0.03 + flicker * 0.04;
          ctx.fillStyle = `rgba(255, 255, 255, ${intAlpha})`;
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }

      ctx.font = "12px monospace";
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        g.y += g.speed * dt;
        if (g.y > h + 20) {
          g.y = -20;
          g.char = glyphChars[Math.floor(Math.random() * glyphChars.length)];
        }
        const fadeZone = h * 0.15;
        let alpha = g.opacity;
        if (g.y < fadeZone) alpha *= g.y / fadeZone;
        if (g.y > h - fadeZone) alpha *= (h - g.y) / fadeZone;

        ctx.fillStyle = `rgba(255, 30, 20, ${alpha})`;
        ctx.fillText(g.char, g.x, g.y);
      }

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const mouseRadius = 250;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const driftX = Math.sin(time * 0.15 + node.offset) * 8 +
          Math.sin(time * 0.08 + node.offset * 1.7) * 5;
        const driftY = Math.cos(time * 0.12 + node.offset * 1.3) * 8 +
          Math.cos(time * 0.06 + node.offset * 2.1) * 5;
        node.x = node.baseX + driftX;
        node.y = node.baseY + driftY;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouseRadiusSq) {
          const mDist = Math.sqrt(mDistSq);
          const influence = 1 - mDist / mouseRadius;
          const angle = Math.atan2(mdy, mdx);
          node.x -= Math.cos(angle) * influence * 22;
          node.y -= Math.sin(angle) * influence * 22;
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
            const lineOpacity = (1 - dist / connectionDist) * 0.15;

            if (a.isAccent || b.isAccent) {
              ctx.strokeStyle = `rgba(255, 30, 20, ${lineOpacity * 2})`;
            } else {
              ctx.strokeStyle = `rgba(140, 150, 180, ${lineOpacity})`;
            }
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (connections.length > 0 && Math.random() < 0.15) {
        const [fromIdx, toIdx] = connections[Math.floor(Math.random() * connections.length)];
        pulses.push({
          fromIdx,
          toIdx,
          progress: 0,
          speed: 1.5 + Math.random() * 2,
          isRed: nodes[fromIdx].isAccent || nodes[toIdx].isAccent,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * dt;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        const pulseAlpha = Math.sin(p.progress * Math.PI) * 0.9;

        if (p.isRed) {
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
          pg.addColorStop(0, `rgba(255, 60, 30, ${pulseAlpha})`);
          pg.addColorStop(0.5, `rgba(255, 20, 10, ${pulseAlpha * 0.3})`);
          pg.addColorStop(1, "rgba(255, 0, 0, 0)");
          ctx.fillStyle = pg;
          ctx.fillRect(px - 8, py - 8, 16, 16);
        } else {
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
          pg.addColorStop(0, `rgba(180, 200, 255, ${pulseAlpha})`);
          pg.addColorStop(1, "rgba(100, 120, 200, 0)");
          ctx.fillStyle = pg;
          ctx.fillRect(px - 6, py - 6, 12, 12);
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * node.pulseSpeed + node.offset) * 0.12 + 0.12;
        let opacity = node.baseOpacity + pulse;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        let mouseInfluence = 0;
        if (mDistSq < mouseRadiusSq) {
          mouseInfluence = 1 - Math.sqrt(mDistSq) / mouseRadius;
          opacity = Math.min(1.0, opacity + mouseInfluence * 0.6);
        }

        const r = node.radius + mouseInfluence * 3;

        if (node.isAccent) {
          const glowR = r * 6;
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          glow.addColorStop(0, `rgba(255, 40, 20, ${opacity * 0.7})`);
          glow.addColorStop(0.3, `rgba(255, 15, 5, ${opacity * 0.25})`);
          glow.addColorStop(0.7, `rgba(180, 0, 0, ${opacity * 0.06})`);
          glow.addColorStop(1, "rgba(100, 0, 0, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - glowR, node.y - glowR, glowR * 2, glowR * 2);

          ctx.fillStyle = `rgba(255, 90, 60, ${Math.min(1, opacity * 1.2)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(160, 170, 210, ${opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const scan1 = (time * 50) % h;
      const scan2 = ((time * 35) + h * 0.5) % h;
      for (const sy of [scan1, scan2]) {
        const sg = ctx.createLinearGradient(0, sy - 20, 0, sy + 20);
        sg.addColorStop(0, "rgba(255, 20, 10, 0)");
        sg.addColorStop(0.5, "rgba(255, 20, 10, 0.025)");
        sg.addColorStop(1, "rgba(255, 20, 10, 0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, sy - 20, w, 40);
      }

      ctx.fillStyle = "rgba(255, 20, 10, 0.008)";
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
        style={{
          background: "linear-gradient(180deg, #0d0d0f 0%, #08080a 100%)",
        }}
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
