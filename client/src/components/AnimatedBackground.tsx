import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

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
      resizeTimeout = window.setTimeout(resizeCanvas, 150);
    };
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      ctx.fillStyle = "#07070b";
      ctx.fillRect(0, 0, w, h);

      const horizonY = h * 0.42;
      const vanishX = w * (0.5 + (mx - 0.5) * 0.15);

      const topGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      topGrad.addColorStop(0, "rgba(12, 4, 4, 0.15)");
      topGrad.addColorStop(1, "rgba(20, 5, 5, 0.08)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, horizonY);

      const horizonGrad = ctx.createRadialGradient(vanishX, horizonY, 0, vanishX, horizonY, w * 0.5);
      horizonGrad.addColorStop(0, "rgba(255, 25, 10, 0.06)");
      horizonGrad.addColorStop(0.4, "rgba(255, 15, 5, 0.025)");
      horizonGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - h * 0.15, w, h * 0.3);

      const gridRows = 40;
      const gridCols = 30;
      const scrollSpeed = 0.35;
      const scrollOffset = (time * scrollSpeed) % 1;

      ctx.lineWidth = 0.7;

      for (let i = 0; i <= gridRows; i++) {
        let t = (i + scrollOffset) / gridRows;
        t = t * t * t;
        const y = horizonY + t * (h - horizonY) * 1.1;
        if (y > h + 5) continue;

        const perspectiveScale = t;
        const halfWidth = w * 0.5 + perspectiveScale * w * 1.2;
        const leftX = vanishX - halfWidth;
        const rightX = vanishX + halfWidth;

        const closeness = Math.min(1, t * 3);
        const alpha = 0.03 + closeness * 0.08;
        const redShift = Math.max(0, 1 - Math.abs(i % gridRows - gridRows * 0.3) / (gridRows * 0.2));

        if (redShift > 0.3 && closeness > 0.1) {
          ctx.strokeStyle = `rgba(255, 25, 12, ${alpha * 0.8})`;
        } else {
          ctx.strokeStyle = `rgba(130, 140, 170, ${alpha})`;
        }

        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      for (let j = -gridCols; j <= gridCols; j++) {
        const xFraction = j / gridCols;
        const baseAlpha = 0.04 + (1 - Math.abs(xFraction)) * 0.05;

        const isCenter = Math.abs(j) <= 1;

        if (isCenter) {
          ctx.strokeStyle = `rgba(255, 30, 15, ${baseAlpha * 1.5})`;
        } else {
          ctx.strokeStyle = `rgba(130, 140, 170, ${baseAlpha})`;
        }

        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);

        const endX = vanishX + xFraction * w * 2.5;
        const endY = h + 10;
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      const intersectionRows = 12;
      for (let i = 0; i < intersectionRows; i++) {
        let t = ((i + scrollOffset * 2) % intersectionRows) / intersectionRows;
        t = t * t * t;
        const y = horizonY + t * (h - horizonY) * 1.1;
        if (y > h + 5 || y < horizonY) continue;

        const perspectiveScale = t;
        const halfWidth = w * 0.5 + perspectiveScale * w * 1.2;

        for (let j = -6; j <= 6; j++) {
          const xFrac = j / 6;
          const x = vanishX + xFrac * halfWidth;
          if (x < -10 || x > w + 10) continue;

          const closeness = Math.min(1, t * 3);
          const dotAlpha = 0.1 + closeness * 0.35;
          const dotR = 1 + closeness * 1.5;

          const isAccent = (Math.abs(j) <= 1) || (i % 3 === 0 && Math.abs(j) % 3 === 0);

          if (isAccent) {
            ctx.fillStyle = `rgba(255, 50, 30, ${dotAlpha})`;
            ctx.beginPath();
            ctx.arc(x, y, dotR * 1.2, 0, Math.PI * 2);
            ctx.fill();

            if (closeness > 0.3) {
              const glow = ctx.createRadialGradient(x, y, 0, x, y, dotR * 6);
              glow.addColorStop(0, `rgba(255, 30, 10, ${dotAlpha * 0.3})`);
              glow.addColorStop(1, "rgba(255, 0, 0, 0)");
              ctx.fillStyle = glow;
              ctx.fillRect(x - dotR * 6, y - dotR * 6, dotR * 12, dotR * 12);
            }
          } else {
            ctx.fillStyle = `rgba(160, 170, 200, ${dotAlpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(x, y, dotR * 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const seed = i * 7.31;
        const px = (Math.sin(seed) * 0.5 + 0.5) * w;
        const baseY = ((seed * 3.17) % 1);
        const py = horizonY + baseY * (h - horizonY) * 0.9;
        const drift = Math.sin(time * 0.3 + seed * 2.1) * 20;
        const rise = Math.sin(time * 0.15 + seed) * 8;
        const finalX = px + drift;
        const finalY = py + rise;

        if (finalY < horizonY || finalY > h) continue;

        const closeness = (finalY - horizonY) / (h - horizonY);
        const alpha = 0.08 + closeness * 0.15;
        const size = 0.8 + closeness * 1.5;

        const isRedParticle = i % 5 === 0;
        if (isRedParticle) {
          ctx.fillStyle = `rgba(255, 40, 20, ${alpha * 1.5})`;
        } else {
          ctx.fillStyle = `rgba(160, 175, 220, ${alpha})`;
        }
        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const scanY = (time * 30) % (h - horizonY);
      if (scanY > 0) {
        const sy = horizonY + scanY;
        const sg = ctx.createLinearGradient(0, sy - 10, 0, sy + 10);
        sg.addColorStop(0, "rgba(255, 20, 10, 0)");
        sg.addColorStop(0.5, "rgba(255, 20, 10, 0.02)");
        sg.addColorStop(1, "rgba(255, 20, 10, 0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, sy - 10, w, 20);
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
