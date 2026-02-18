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

    const connectionDistance = 140;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    let nodes: Node[] = [];

    function initNodes() {
      const w = canvas.width;
      const h = canvas.height;
      const nodeCount = Math.floor((w * h) / 12000);
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const isAccent = Math.random() < 0.18;
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: isAccent ? 1.8 + Math.random() * 1.5 : 1 + Math.random() * 1.2,
          isAccent,
          baseOpacity: isAccent ? 0.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.2,
          offset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.4,
        });
      }
    }
    initNodes();

    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = currentTime - (elapsed % frameInterval);

      const w = canvas.width;
      const h = canvas.height;
      const time = (Date.now() - startTime) * 0.001;

      ctx.fillStyle = "#08080b";
      ctx.fillRect(0, 0, w, h);

      const gridSpacing = 60;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.018)";
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

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const mouseRadius = 220;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const driftX = Math.sin(time * 0.08 + node.offset) * 6 +
          Math.sin(time * 0.05 + node.offset * 1.7) * 4;
        const driftY = Math.cos(time * 0.07 + node.offset * 1.3) * 6 +
          Math.cos(time * 0.04 + node.offset * 2.1) * 4;

        node.x = node.baseX + driftX;
        node.y = node.baseY + driftY;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;

        if (mDistSq < mouseRadiusSq) {
          const mDist = Math.sqrt(mDistSq);
          const influence = 1 - mDist / mouseRadius;
          const angle = Math.atan2(mdy, mdx);
          node.x -= Math.cos(angle) * influence * 18;
          node.y -= Math.sin(angle) * influence * 18;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistanceSq) {
            const dist = Math.sqrt(distSq);
            const lineOpacity = (1 - dist / connectionDistance) * 0.12;

            if (a.isAccent || b.isAccent) {
              ctx.strokeStyle = `rgba(255, 30, 20, ${lineOpacity * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(180, 180, 200, ${lineOpacity})`;
            }
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const pulse = Math.sin(time * node.pulseSpeed + node.offset) * 0.1 + 0.1;
        let opacity = node.baseOpacity + pulse;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        let mouseInfluence = 0;

        if (mDistSq < mouseRadiusSq) {
          mouseInfluence = 1 - Math.sqrt(mDistSq) / mouseRadius;
          opacity = Math.min(1.0, opacity + mouseInfluence * 0.5);
        }

        const r = node.radius + mouseInfluence * 2;

        if (node.isAccent) {
          const glowR = r * 5;
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          glow.addColorStop(0, `rgba(255, 30, 20, ${opacity * 0.6})`);
          glow.addColorStop(0.4, `rgba(200, 10, 5, ${opacity * 0.15})`);
          glow.addColorStop(1, "rgba(150, 0, 0, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - glowR, node.y - glowR, glowR * 2, glowR * 2);

          ctx.fillStyle = `rgba(255, 80, 60, ${Math.min(1, opacity * 1.1)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(180, 185, 210, ${opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const scanlineY = (time * 40) % h;
      const scanGrad = ctx.createLinearGradient(0, scanlineY - 30, 0, scanlineY + 30);
      scanGrad.addColorStop(0, "rgba(255, 20, 10, 0)");
      scanGrad.addColorStop(0.5, "rgba(255, 20, 10, 0.015)");
      scanGrad.addColorStop(1, "rgba(255, 20, 10, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanlineY - 30, w, 60);
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
