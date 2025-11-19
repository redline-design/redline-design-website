import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ValueCardData {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

interface ScrollValueCardsProps {
  cards: ValueCardData[];
}

export default function ScrollValueCards({ cards }: ScrollValueCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 40%"]
  });

  // Transform scroll progress to spread amount (0 = stacked, 1 = spread)
  const spreadProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Calculate positions for each card when spread out - single row
  const getSpreadPosition = (index: number, total: number) => {
    const cardWidth = 210;
    const spacing = total <= 6 ? 280 : 240; // More spacing for 6 or fewer cards
    const xOffset = (index - (total - 1) / 2) * spacing;
    return { x: xOffset, y: 0 };
  };

  return (
    <div ref={containerRef} className="relative" data-testid="container-value-cards">
      <div 
        className="relative mx-auto"
        style={{
          width: "95%",
          minHeight: "280px",
          maxWidth: "2200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div 
          className="relative rounded-2xl overflow-hidden" 
          style={{ 
            width: "100%", 
            height: "260px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Animated technical background */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ background: "#0a0a0a" }}
          >
            {/* Animated flowing particles */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(0, 136, 255, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 40% 20%, rgba(0, 255, 136, 0.15) 0%, transparent 50%)
                `,
                backgroundSize: "200% 200%",
                animation: "gradientFlow 15s ease infinite",
              }}
            />
            
            {/* Animated grid lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(255, 0, 0, 0.2) 1px, transparent 1px),
                  linear-gradient(0deg, rgba(255, 0, 0, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                animation: "gridPulse 3s ease-in-out infinite",
              }}
            />
            
            {/* Animated diagonal lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 48%, rgba(0, 136, 255, 0.3) 49%, rgba(0, 136, 255, 0.3) 51%, transparent 52%)
                `,
                backgroundSize: "100px 100px",
                animation: "diagonalSlide 20s linear infinite",
              }}
            />
            
            {/* Floating data points */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: "4px",
                  height: "4px",
                  background: i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#0088ff' : '#00ff88',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#0088ff' : '#00ff88'}`,
                  left: `${(i * 8 + 5)}%`,
                  top: `${30 + (i % 4) * 15}%`,
                  animation: `floatParticle ${8 + (i % 5) * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Light frosted overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />

          {/* Content container */}
          <div className="relative w-full h-full"
          >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const spreadPos = getSpreadPosition(idx, cards.length);
            
            const rotation = useTransform(
              spreadProgress,
              [0, 1],
              prefersReducedMotion ? [0, 0] : [idx * 6 - 42, 0]
            );
            
            const xPos = useTransform(
              spreadProgress,
              [0, 1],
              [0, spreadPos.x]
            );
            
            const yPos = useTransform(
              spreadProgress,
              [0, 1],
              [0, spreadPos.y]
            );

            const accentColor = card.accentColor || '#ff0000';
            const gradientFrom = card.gradientFrom || 'rgba(0, 0, 0, 0.4)';
            const gradientTo = card.gradientTo || 'rgba(0, 0, 0, 0.2)';
            
            return (
              <motion.div
                key={card.title}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  x: xPos,
                  y: yPos,
                  translateX: "-50%",
                  translateY: "-50%",
                  width: "210px",
                  rotate: rotation,
                  transformOrigin: "50% 100%",
                  willChange: "transform",
                }}
              >
                <Card
                  className="h-full transition-all duration-300 rounded-2xl backdrop-blur-md group flex items-center hover-elevate active-elevate-2 overflow-hidden"
                  data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                  style={{ 
                    height: "240px",
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    border: `1px solid ${accentColor}30`,
                    boxShadow: `0 0 20px ${accentColor}15, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                  }}
                >
                  <CardContent className="p-5 w-full relative z-10">
                    <div className="flex flex-col items-center justify-center text-center gap-2">
                      <div 
                        className="flex-shrink-0 p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: `${accentColor}20`,
                          boxShadow: `0 0 15px ${accentColor}30`,
                        }}
                      >
                        <Icon 
                          className="h-6 w-6" 
                          style={{ color: accentColor }}
                          data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`} 
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1.5" data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
                          {card.title}
                        </h3>
                        <p className="text-xs text-foreground leading-relaxed" data-testid={`text-value-description-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
