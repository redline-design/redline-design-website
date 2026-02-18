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

    let mouseThrottle = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottle) return;
      mouseThrottle = true;
      setTimeout(() => (mouseThrottle = false), 16);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    interface Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      isRed: boolean;
      baseOpacity: number;
      offset: number;
      driftSpeedX: number;
      driftSpeedY: number;
    }

    const dotCount = 150;
    const dots: Dot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const isRed = Math.random() < 0.22;
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        radius: 1.5 + Math.random() * 3,
        isRed,
        baseOpacity: isRed
          ? 0.3 + Math.random() * 0.3
          : 0.15 + Math.random() * 0.2,
        offset: Math.random() * Math.PI * 2,
        driftSpeedX: (Math.random() - 0.5) * 0.15,
        driftSpeedY: (Math.random() - 0.5) * 0.15,
      });
    }

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

      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, w * 0.7);
      grad.addColorStop(0, "rgba(30, 5, 5, 0.4)");
      grad.addColorStop(0.5, "rgba(15, 5, 5, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const time = Date.now() * 0.001;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const maxDistance = 180;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const driftX =
          Math.sin(time * 0.12 + dot.offset) * 10 +
          Math.sin(time * 0.07 + dot.offset * 1.7) * 6;
        const driftY =
          Math.cos(time * 0.1 + dot.offset * 1.3) * 10 +
          Math.cos(time * 0.06 + dot.offset * 2.1) * 6;

        dot.x = dot.baseX + driftX + dot.driftSpeedX * time * 10;
        dot.y = dot.baseY + driftY + dot.driftSpeedY * time * 10;

        if (dot.x < -20) dot.baseX += w + 40;
        if (dot.x > w + 20) dot.baseX -= w + 40;
        if (dot.y < -20) dot.baseY += h + 40;
        if (dot.y > h + 20) dot.baseY -= h + 40;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distanceSq = dx * dx + dy * dy;

        let mouseInfluence = 0;

        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          mouseInfluence = 1 - distance / maxDistance;
          const angle = Math.atan2(dy, dx);
          const pushStrength = mouseInfluence * 20;
          dot.x += -Math.cos(angle) * pushStrength;
          dot.y += -Math.sin(angle) * pushStrength;
        }

        const breath = Math.sin(time * 0.3 + dot.offset) * 0.05 + 0.05;
        let opacity = dot.baseOpacity + breath;

        if (mouseInfluence > 0) {
          opacity = Math.min(0.8, opacity + mouseInfluence * 0.4);
        }

        const r = dot.radius + (mouseInfluence > 0 ? mouseInfluence * 2 : 0);

        if (dot.isRed) {
          const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r * 3);
          glow.addColorStop(0, `rgba(255, 50, 30, ${opacity})`);
          glow.addColorStop(0.5, `rgba(255, 30, 20, ${opacity * 0.3})`);
          glow.addColorStop(1, `rgba(255, 0, 0, 0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(dot.x - r * 3, dot.y - r * 3, r * 6, r * 6);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
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
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
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
