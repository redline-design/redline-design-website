import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Hexagon grid with wave animation
    const hexRadius = 35;
    const hexHeight = hexRadius * 2;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexSpacing = 5;

    interface HexCell {
      x: number;
      y: number;
      offset: number;
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

      // Draw hexagon grid with wave effect
      hexGrid.forEach((hex) => {
        // Create diagonal wave pattern
        const waveX = Math.sin((hex.x * 0.005) + (hex.y * 0.003) + time) * 0.5 + 0.5;
        const waveY = Math.cos((hex.y * 0.005) + (hex.x * 0.003) + time * 0.7) * 0.5 + 0.5;
        
        // Combine waves for complex pattern
        const wave = (waveX + waveY) / 2;
        
        // Map wave to opacity (more visible range)
        const opacity = wave * 0.4 + 0.05;
        
        // Scale effect - hexagons pulse with the wave
        const scale = wave * 0.15 + 0.85;
        const currentRadius = hexRadius * scale;

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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
