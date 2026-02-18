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

    const dotCount = 160;
    const dots: Dot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const isRed = Math.random() < 0.25;
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        radius: isRed ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2,
        isRed,
        baseOpacity: isRed
          ? 0.5 + Math.random() * 0.4
          : 0.25 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        driftSpeedX: (Math.random() - 0.5) * 0.12,
        driftSpeedY: (Math.random() - 0.5) * 0.12,
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

      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#0d0d0f");
      bgGrad.addColorStop(0.4, "#0a0a0c");
      bgGrad.addColorStop(1, "#08080a");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.35, w * 0.1, w * 0.5, h * 0.35, w * 0.8);
      vignette.addColorStop(0, "rgba(40, 5, 5, 0.25)");
      vignette.addColorStop(0.5, "rgba(20, 3, 3, 0.12)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      const time = (Date.now() - startTime) * 0.001;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const maxDistance = 200;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const driftX =
          Math.sin(time * 0.12 + dot.offset) * 12 +
          Math.sin(time * 0.07 + dot.offset * 1.7) * 7;
        const driftY =
          Math.cos(time * 0.1 + dot.offset * 1.3) * 12 +
          Math.cos(time * 0.06 + dot.offset * 2.1) * 7;

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
          const pushStrength = mouseInfluence * 25;
          dot.x += -Math.cos(angle) * pushStrength;
          dot.y += -Math.sin(angle) * pushStrength;
        }

        const breath = Math.sin(time * 0.3 + dot.offset) * 0.08 + 0.08;
        let opacity = dot.baseOpacity + breath;

        if (mouseInfluence > 0) {
          opacity = Math.min(1.0, opacity + mouseInfluence * 0.5);
        }

        const r = dot.radius + (mouseInfluence > 0 ? mouseInfluence * 3 : 0);

        if (dot.isRed) {
          const glowRadius = r * 4;
          const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowRadius);
          glow.addColorStop(0, `rgba(255, 40, 20, ${opacity})`);
          glow.addColorStop(0.3, `rgba(255, 20, 10, ${opacity * 0.5})`);
          glow.addColorStop(0.6, `rgba(200, 0, 0, ${opacity * 0.15})`);
          glow.addColorStop(1, "rgba(150, 0, 0, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(dot.x - glowRadius, dot.y - glowRadius, glowRadius * 2, glowRadius * 2);

          ctx.fillStyle = `rgba(255, 100, 80, ${Math.min(1, opacity * 1.2)})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, r * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(200, 200, 220, ${opacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
          ctx.fill();

          if (r > 2) {
            ctx.fillStyle = `rgba(200, 200, 220, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, r * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
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
