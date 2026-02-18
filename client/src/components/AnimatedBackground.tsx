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
        initNodes();
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

    interface Pulse {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      isRed: boolean;
    }

    const connectionDist = 150;
    const connectionDistSq = connectionDist * connectionDist;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    function initNodes() {
      const w = canvas.width;
      const h = canvas.height;
      const count = Math.floor((w * h) / 11000);
      nodes = [];
      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() < 0.15;
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: isAccent ? 1.8 + Math.random() * 1 : 0.8 + Math.random() * 0.8,
          isAccent,
          baseOpacity: isAccent ? 0.45 + Math.random() * 0.25 : 0.12 + Math.random() * 0.15,
          offset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.5,
        });
      }
      pulses = [];
    }
    initNodes();

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

      ctx.fillStyle = "#07070b";
      ctx.fillRect(0, 0, w, h);

      const gridSize = 55;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.018)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const mouseRadius = 240;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const driftX = Math.sin(time * 0.1 + node.offset) * 6 +
          Math.sin(time * 0.06 + node.offset * 1.7) * 4;
        const driftY = Math.cos(time * 0.08 + node.offset * 1.3) * 6 +
          Math.cos(time * 0.05 + node.offset * 2.1) * 4;
        node.x = node.baseX + driftX;
        node.y = node.baseY + driftY;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouseRadiusSq) {
          const mDist = Math.sqrt(mDistSq);
          const influence = 1 - mDist / mouseRadius;
          const angle = Math.atan2(mdy, mdx);
          node.x -= Math.cos(angle) * influence * 20;
          node.y -= Math.sin(angle) * influence * 20;
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
            const t = 1 - dist / connectionDist;
            const lineAlpha = t * 0.1;

            if (a.isAccent || b.isAccent) {
              ctx.strokeStyle = `rgba(255, 20, 10, ${lineAlpha * 1.8})`;
            } else {
              ctx.strokeStyle = `rgba(150, 160, 190, ${lineAlpha})`;
            }
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (connections.length > 0 && Math.random() < 0.08) {
        const [fromIdx, toIdx] = connections[Math.floor(Math.random() * connections.length)];
        pulses.push({
          fromIdx, toIdx, progress: 0,
          speed: 1.2 + Math.random() * 1.5,
          isRed: nodes[fromIdx].isAccent || nodes[toIdx].isAccent,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * dt;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }

        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        if (!a || !b) { pulses.splice(i, 1); continue; }

        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        const alpha = Math.sin(p.progress * Math.PI) * 0.7;

        const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        if (p.isRed) {
          pg.addColorStop(0, `rgba(255, 60, 30, ${alpha})`);
          pg.addColorStop(1, "rgba(255, 0, 0, 0)");
        } else {
          pg.addColorStop(0, `rgba(160, 180, 255, ${alpha})`);
          pg.addColorStop(1, "rgba(120, 140, 220, 0)");
        }
        ctx.fillStyle = pg;
        ctx.fillRect(px - 6, py - 6, 12, 12);
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * node.pulseSpeed + node.offset) * 0.06 + 0.06;
        let opacity = node.baseOpacity + pulse;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        let mouseInfluence = 0;
        if (mDistSq < mouseRadiusSq) {
          mouseInfluence = 1 - Math.sqrt(mDistSq) / mouseRadius;
          opacity = Math.min(0.9, opacity + mouseInfluence * 0.5);
        }

        const r = node.radius + mouseInfluence * 2;

        if (node.isAccent) {
          const glowR = r * 5;
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          glow.addColorStop(0, `rgba(255, 35, 15, ${opacity * 0.6})`);
          glow.addColorStop(0.4, `rgba(200, 10, 5, ${opacity * 0.15})`);
          glow.addColorStop(1, "rgba(120, 0, 0, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - glowR, node.y - glowR, glowR * 2, glowR * 2);

          ctx.fillStyle = `rgba(255, 80, 50, ${Math.min(1, opacity)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(170, 178, 210, ${opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
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
        style={{ background: "#07070b" }}
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
