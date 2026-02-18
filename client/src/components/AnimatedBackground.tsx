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

    const spacing = 32;
    let cols = 0;
    let rows = 0;
    let dotIntensity: Float32Array = new Float32Array(0);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / spacing) + 1;
      rows = Math.ceil(canvas.height / spacing) + 1;
      dotIntensity = new Float32Array(cols * rows);
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
    const glowRadius = 200;
    const glowRadiusSq = glowRadius * glowRadius;
    const lerpSpeed = 0.07;

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

      const grad = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, w * 0.6);
      grad.addColorStop(0, "rgba(22, 4, 4, 0.18)");
      grad.addColorStop(0.6, "rgba(10, 3, 3, 0.08)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const x = col * spacing;
          const y = row * spacing;

          const dx = mx - x;
          const dy = my - y;
          const distSq = dx * dx + dy * dy;

          let target = 0;
          if (distSq < glowRadiusSq) {
            const dist = Math.sqrt(distSq);
            target = 1 - dist / glowRadius;
            target = target * target;
          }

          dotIntensity[idx] += (target - dotIntensity[idx]) * lerpSpeed;
        }
      }

      ctx.lineWidth = 0.5;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const t = dotIntensity[idx];
          const x = col * spacing;
          const y = row * spacing;

          if (col < cols - 1) {
            const rightT = dotIntensity[idx + 1];
            const lineT = Math.max(t, rightT);
            const lineAlpha = 0.025 + lineT * 0.12;
            if (lineT > 0.05) {
              const r = Math.round(130 + lineT * 125);
              const g = Math.round(140 - lineT * 110);
              const b = Math.round(170 - lineT * 140);
              ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(140, 148, 175, ${lineAlpha})`;
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + spacing, y);
            ctx.stroke();
          }

          if (row < rows - 1) {
            const belowT = dotIntensity[idx + cols];
            const lineT = Math.max(t, belowT);
            const lineAlpha = 0.025 + lineT * 0.12;
            if (lineT > 0.05) {
              const r = Math.round(130 + lineT * 125);
              const g = Math.round(140 - lineT * 110);
              const b = Math.round(170 - lineT * 140);
              ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(140, 148, 175, ${lineAlpha})`;
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + spacing);
            ctx.stroke();
          }
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const t = dotIntensity[idx];
          const x = col * spacing;
          const y = row * spacing;

          const baseAlpha = 0.12;

          if (t > 0.01) {
            const alpha = baseAlpha + t * 0.7;
            const r = Math.round(170 + t * 85);
            const g = Math.round(178 - t * 148);
            const b = Math.round(210 - t * 180);
            const dotR = 1.2 + t * 1.8;

            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, dotR, 0, Math.PI * 2);
            ctx.fill();

            if (t > 0.2) {
              const glowAlpha = t * 0.15;
              const glow = ctx.createRadialGradient(x, y, 0, x, y, 14);
              glow.addColorStop(0, `rgba(255, 35, 15, ${glowAlpha})`);
              glow.addColorStop(1, "rgba(255, 0, 0, 0)");
              ctx.fillStyle = glow;
              ctx.fillRect(x - 14, y - 14, 28, 28);
            }
          } else {
            ctx.fillStyle = `rgba(160, 168, 200, ${baseAlpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
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
