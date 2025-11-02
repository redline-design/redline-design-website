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

    // Geometric pattern with floating hexagons
    interface Hexagon {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      fadeDirection: number;
    }

    const hexagons: Hexagon[] = [];
    const hexCount = Math.floor((canvas.width * canvas.height) / 50000);

    for (let i = 0; i < hexCount; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        opacity: Math.random() * 0.1 + 0.02,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const drawHexagon = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const xPos = size * Math.cos(angle);
        const yPos = size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }

      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const drawDots = () => {
      const gridSize = 80;
      const time = Date.now() * 0.0003;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(distanceFromCenter * 0.005 - time) * 0.5 + 0.5;
          const opacity = wave * 0.15;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dot grid with wave effect
      drawDots();

      // Draw and animate hexagons
      hexagons.forEach((hex) => {
        hex.rotation += hex.rotationSpeed;
        
        // Subtle fade in/out
        hex.opacity += hex.fadeDirection * 0.0001;
        if (hex.opacity > 0.12) {
          hex.fadeDirection = -1;
        } else if (hex.opacity < 0.02) {
          hex.fadeDirection = 1;
        }

        drawHexagon(hex.x, hex.y, hex.size, hex.rotation, hex.opacity);
      });

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
      style={{ opacity: 0.4 }}
    />
  );
}
