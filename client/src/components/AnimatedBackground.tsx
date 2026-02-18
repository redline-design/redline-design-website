import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const spacing = 28;
    let cols = 0;
    let rows = 0;
    let dotOpacities: Float32Array = new Float32Array(0);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / spacing) + 1;
      rows = Math.ceil(canvas.height / spacing) + 1;
      dotOpacities = new Float32Array(cols * rows);
    };
    resizeCanvas();

    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 150);
    };
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const mouseLeave = () => {
      mousePosRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mouseleave", mouseLeave);

    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;
    const glowRadius = 180;
    const glowRadiusSq = glowRadius * glowRadius;
    const lerpSpeed = 0.08;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = currentTime - (elapsed % frameInterval);

      const w = canvas.width;
      const h = canvas.height;
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      ctx.fillStyle = "#07070b";
      ctx.fillRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.65);
      grad.addColorStop(0, "rgba(25, 4, 4, 0.22)");
      grad.addColorStop(0.6, "rgba(12, 3, 3, 0.1)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let row = 0; row < rows; row++) {
        const y = row * spacing;
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const idx = row * cols + col;

          const dx = mx - x;
          const dy = my - y;
          const distSq = dx * dx + dy * dy;

          let target = 0;
          if (distSq < glowRadiusSq) {
            const dist = Math.sqrt(distSq);
            target = 1 - dist / glowRadius;
            target = target * target;
          }

          dotOpacities[idx] += (target - dotOpacities[idx]) * lerpSpeed;

          const t = dotOpacities[idx];
          const baseAlpha = 0.06;

          if (t > 0.01) {
            const alpha = baseAlpha + t * 0.55;
            const r = Math.round(170 + t * 85);
            const g = Math.round(178 - t * 148);
            const b = Math.round(210 - t * 180);

            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            const dotR = 1 + t * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, dotR, 0, Math.PI * 2);
            ctx.fill();

            if (t > 0.3) {
              const glowAlpha = t * 0.12;
              const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
              glow.addColorStop(0, `rgba(255, 30, 15, ${glowAlpha})`);
              glow.addColorStop(1, "rgba(255, 0, 0, 0)");
              ctx.fillStyle = glow;
              ctx.fillRect(x - 12, y - 12, 24, 24);
            }
          } else {
            ctx.fillStyle = `rgba(170, 178, 210, ${baseAlpha})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", mouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, handleMouseMove]);

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
