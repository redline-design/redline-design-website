import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

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

    const drawHexagon = (x: number, y: number, radius: number, opacity: number) => {
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
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Draw hexagon grid with wave effect and mouse interaction
      hexGrid.forEach((hex) => {
        // Calculate distance from mouse
        const dx = mousePos.x - hex.baseX;
        const dy = mousePos.y - hex.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200; // Range of mouse influence

        // Mouse displacement effect
        let displacementX = 0;
        let displacementY = 0;
        let mouseInfluence = 0;

        if (distance < maxDistance) {
          mouseInfluence = 1 - (distance / maxDistance);
          const angle = Math.atan2(dy, dx);
          const pushStrength = mouseInfluence * 30; // How far to push hexagons
          
          // Push hexagons away from mouse
          displacementX = -Math.cos(angle) * pushStrength;
          displacementY = -Math.sin(angle) * pushStrength;
        }

        // Create diagonal wave pattern
        const waveX = Math.sin((hex.baseX * 0.005) + (hex.baseY * 0.003) + time) * 0.5 + 0.5;
        const waveY = Math.cos((hex.baseY * 0.005) + (hex.baseX * 0.003) + time * 0.7) * 0.5 + 0.5;
        
        // Combine waves for complex pattern
        const wave = (waveX + waveY) / 2;
        
        // Map wave to opacity (more visible range)
        let opacity = wave * 0.4 + 0.05;
        
        // Brighten hexagons near mouse
        if (mouseInfluence > 0) {
          opacity = Math.min(0.8, opacity + mouseInfluence * 0.4);
        }
        
        // Scale effect - hexagons pulse with the wave and mouse proximity
        const waveScale = wave * 0.15 + 0.85;
        const mouseScale = mouseInfluence * 0.2;
        const scale = waveScale + mouseScale;
        const currentRadius = hexRadius * scale;

        // Update position with displacement
        hex.x = hex.baseX + displacementX;
        hex.y = hex.baseY + displacementY;

        drawHexagon(hex.x, hex.y, currentRadius, opacity);
      });

      // Draw flowing lines connecting some hexagons (technical look)
      const lineTime = time * 0.5;
      for (let i = 0; i < hexGrid.length; i += 8) {
        const hex = hexGrid[i];
        const progress = ((lineTime + hex.offset) % (Math.PI * 2)) / (Math.PI * 2);
        
        if (progress > 0.3 && progress < 0.7) {
          const opacity = Math.sin(progress * Math.PI) * 0.3;
          
          // Draw a line from this hex to a neighboring one
          const nextIndex = Math.min(i + 1, hexGrid.length - 1);
          const nextHex = hexGrid[nextIndex];
          
          ctx.beginPath();
          ctx.moveTo(hex.x, hex.y);
          ctx.lineTo(nextHex.x, nextHex.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
