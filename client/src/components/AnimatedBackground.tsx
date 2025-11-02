import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let needsResize = false;

    const resizeCanvas = () => {
      needsResize = true;
    };

    const applyResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      needsResize = false;
    };

    applyResize();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Track mouse position with ref to avoid re-renders
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Hexagon grid with wave animation
    const hexRadius = 35;
    const hexHeight = hexRadius * 2;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexSpacing = 5;

    interface HexCell {
      x: number;
      y: number;
      offset: number;
      baseX: number;
      baseY: number;
    }

    const hexGrid: HexCell[] = [];
    
    // Create honeycomb grid
    const cols = Math.ceil(canvas.width / (hexWidth + hexSpacing)) + 2;
    const rows = Math.ceil(canvas.height / (hexHeight * 0.75 + hexSpacing)) + 2;

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

    const animate = () => {
      if (needsResize) {
        applyResize();
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const maxDistance = 200;
      const maxDistanceSq = maxDistance * maxDistance; // Use squared distance to avoid sqrt

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

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
