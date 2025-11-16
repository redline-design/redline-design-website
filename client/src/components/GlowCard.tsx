import { useRef, useState, useEffect, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  glowColor?: string;
}

export default function GlowCard({ children, className = "", "data-testid": testId, glowColor = "255, 0, 0" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardBounds, setCardBounds] = useState({ left: 0, top: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateBounds = () => {
      const rect = card.getBoundingClientRect();
      setCardBounds({ left: rect.left, top: rect.top });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds);

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      data-testid={testId}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--x': mousePosition.x,
        '--y': mousePosition.y,
        '--left': cardBounds.left,
        '--top': cardBounds.top,
        '--glow-opacity': isHovering ? 0.15 : 0,
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
