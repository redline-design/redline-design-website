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

  // Combine refs
  useEffect(() => {
    if (containerRef) {
      intersectionRef(containerRef);
    }
  }, [containerRef, intersectionRef]);

  // Skip animation entirely on mobile or reduced motion
  const shouldAnimate = !isMobile && !prefersReducedMotion && inView;

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
    let isMouseActive = true; // Start active

    // Check if tab is visible
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track scroll activity to keep animation alive during scroll
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

    // Track mouse position with throttling and activity detection
    let mouseThrottle = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottle) return;
      mouseThrottle = true;
      setTimeout(() => mouseThrottle = false, 16); // ~60fps
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      lastMouseMoveTime = Date.now();
      isMouseActive = true;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Hexagon grid with wave animation - reduced density for better performance
    const hexRadius = 40; // Slightly larger hexagons
    const hexHeight = hexRadius * 2;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexSpacing = 15; // Increased spacing for fewer hexagons

    interface HexCell {
      x: number;
      y: number;
      offset: number;
      baseX: number;
      baseY: number;
    }

    const hexGrid: HexCell[] = [];
    
    // Create honeycomb grid - reduced density by 40% for performance
    const cols = Math.ceil(canvas.width / (hexWidth + hexSpacing)) + 1;
    const rows = Math.ceil(canvas.height / (hexHeight * 0.75 + hexSpacing)) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * (hexWidth + hexSpacing) + (row % 2) * ((hexWidth + hexSpacing) / 2);
        const y = row * (hexHeight * 0.75 + hexSpacing);
        hexGrid.push({
          x,
          y,
          baseX: x,
          baseY: y,
          offset: Math.random() * Math.PI * 2
        });
      }
    }

    const drawHexagon = (x: number, y: number, radius: number, opacity: number, hue: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const xPos = x + radius * Math.cos(angle);
        const yPos = y + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.closePath();
      // Mix of white and subtle color based on position
      ctx.strokeStyle = `hsla(${hue}, 70%, 70%, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    // FPS limiting for better performance
    let lastFrameTime = 0;
    const targetFPS = 30; // Cap at 30fps for smooth but performant animation
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip animation when tab is not visible or user prefers reduced motion
      if (!isTabVisible || prefersReducedMotion) {
        return;
      }

      // Pause animation if no mouse or scroll activity for 3 seconds to save GPU
      const timeSinceMouseMove = Date.now() - lastMouseMoveTime;
      const timeSinceScroll = Date.now() - lastScrollTime;
      const timeSinceActivity = Math.min(timeSinceMouseMove, timeSinceScroll);
      
      if (timeSinceActivity > 3000 && isMouseActive) {
        isMouseActive = false;
        // Keep last rendered frame visible, just stop animating
        return;
      } else if (timeSinceActivity > 3000) {
        // Keep paused - last frame stays visible
        return;
      } else if (!isMouseActive) {
        // Resume animation
        isMouseActive = true;
      }

      // FPS throttling
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
      const maxDistance = 200;
      const maxDistanceSq = maxDistance * maxDistance;

      // Draw hexagon grid with wave effect and mouse interaction
      for (let i = 0; i < hexGrid.length; i++) {
        const hex = hexGrid[i];
        
        // Calculate distance from mouse (squared to avoid expensive sqrt)
        const dx = mouseX - hex.baseX;
        const dy = mouseY - hex.baseY;
        const distanceSq = dx * dx + dy * dy;

        // Mouse displacement effect
        let displacementX = 0;
        let displacementY = 0;
        let mouseInfluence = 0;

        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          mouseInfluence = 1 - (distance / maxDistance);
          const angle = Math.atan2(dy, dx);
          const pushStrength = mouseInfluence * 30;
          
          displacementX = -Math.cos(angle) * pushStrength;
          displacementY = -Math.sin(angle) * pushStrength;
        }

        // Create diagonal wave pattern
        const waveX = Math.sin((hex.baseX * 0.005) + (hex.baseY * 0.003) + time) * 0.5 + 0.5;
        const waveY = Math.cos((hex.baseY * 0.005) + (hex.baseX * 0.003) + time * 0.7) * 0.5 + 0.5;
        
        const wave = (waveX + waveY) * 0.5;
        
        let opacity = wave * 0.4 + 0.05;
        
        if (mouseInfluence > 0) {
          opacity = Math.min(0.8, opacity + mouseInfluence * 0.4);
        }
        
        const waveScale = wave * 0.15 + 0.85;
        const mouseScale = mouseInfluence * 0.2;
        const scale = waveScale + mouseScale;
        const currentRadius = hexRadius * scale;

        hex.x = hex.baseX + displacementX;
        hex.y = hex.baseY + displacementY;

        const hue = (hex.baseX / canvas.width) * 60 + 180;

        drawHexagon(hex.x, hex.y, currentRadius, opacity, hue);
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

  // Show static fallback for mobile/reduced-motion
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
