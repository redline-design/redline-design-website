import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInView } from "react-intersection-observer";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef) {
      intersectionRef(containerRef);
    }
  }, [containerRef, intersectionRef]);

  const shouldAnimate = !prefersReducedMotion && inView;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldAnimate) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let needsResize = false;
    let isTabVisible = true;
    let lastMouseMoveTime = Date.now();
    let lastScrollTime = Date.now();
    let isMouseActive = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleScroll = () => {
      lastScrollTime = Date.now();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resizeCanvas = () => {
      needsResize = true;
    };

    const applyResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      needsResize = false;
    };

    applyResize();
    
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
      setTimeout(() => mouseThrottle = false, 16);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      lastMouseMoveTime = Date.now();
      isMouseActive = true;
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

    const dotCount = 100;
    const dots: Dot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const isRed = Math.random() < 0.18;
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        radius: 1 + Math.random() * 2,
        isRed,
        baseOpacity: isRed
          ? 0.04 + Math.random() * 0.06
          : 0.03 + Math.random() * 0.05,
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

      if (!isTabVisible || prefersReducedMotion) {
        return;
      }

      const timeSinceMouseMove = Date.now() - lastMouseMoveTime;
      const timeSinceScroll = Date.now() - lastScrollTime;
      const timeSinceActivity = Math.min(timeSinceMouseMove, timeSinceScroll);
      isMouseActive = timeSinceActivity < 3000;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      if (needsResize) {
        applyResize();
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const maxDistance = 150;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const driftX = Math.sin(time * 0.12 + dot.offset) * 8 + Math.sin(time * 0.07 + dot.offset * 1.7) * 5;
        const driftY = Math.cos(time * 0.1 + dot.offset * 1.3) * 8 + Math.cos(time * 0.06 + dot.offset * 2.1) * 5;

        dot.x = dot.baseX + driftX + dot.driftSpeedX * time * 10;
        dot.y = dot.baseY + driftY + dot.driftSpeedY * time * 10;

        if (dot.x < -20) dot.baseX += canvas.width + 40;
        if (dot.x > canvas.width + 20) dot.baseX -= canvas.width + 40;
        if (dot.y < -20) dot.baseY += canvas.height + 40;
        if (dot.y > canvas.height + 20) dot.baseY -= canvas.height + 40;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distanceSq = dx * dx + dy * dy;

        let mouseInfluence = 0;
        let pushX = 0;
        let pushY = 0;

        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          mouseInfluence = 1 - (distance / maxDistance);
          const angle = Math.atan2(dy, dx);
          const pushStrength = mouseInfluence * 15;
          pushX = -Math.cos(angle) * pushStrength;
          pushY = -Math.sin(angle) * pushStrength;
          dot.x += pushX;
          dot.y += pushY;
        }

        const breath = Math.sin(time * 0.25 + dot.offset) * 0.015 + 0.015;
        let opacity = dot.baseOpacity + breath;

        if (mouseInfluence > 0) {
          opacity = Math.min(0.3, opacity + mouseInfluence * 0.15);
        }

        if (dot.isRed) {
          ctx.fillStyle = `rgba(255, 80, 60, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldAnimate]);

  if (!shouldAnimate) {
    return (
      <div
        ref={setContainerRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
          opacity: 1,
        }}
      />
    );
  }

  return (
    <div ref={setContainerRef} className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ opacity: 1 }}
      />
    </div>
  );
}
