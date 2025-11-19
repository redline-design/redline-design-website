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
          {/* Technical background pattern */}
          <div
            className="absolute inset-0"
            style={{
              background: "#0a0a0a",
              backgroundImage: `
                linear-gradient(90deg, rgba(255, 0, 0, 0.3) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255, 0, 0, 0.3) 1px, transparent 1px),
                linear-gradient(135deg, transparent 48%, rgba(0, 136, 255, 0.4) 49%, rgba(0, 136, 255, 0.4) 51%, transparent 52%),
                linear-gradient(45deg, transparent 48%, rgba(0, 255, 136, 0.4) 49%, rgba(0, 255, 136, 0.4) 51%, transparent 52%)
              `,
              backgroundSize: "40px 40px, 40px 40px, 80px 80px, 80px 80px",
              backgroundPosition: "0 0, 0 0, 0 0, 40px 40px",
            }}
          />
          
          {/* Data visualization overlay */}
          <svg 
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.6 }}
          >
            <defs>
              <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ff0000', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#0088ff', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00ff88', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#graphGradient)"
              strokeWidth="3"
              points="0,180 200,120 400,140 600,80 800,100 1000,60 1200,90 1400,50 1600,70 1800,40 2000,60 2200,30"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))' }}
            />
            <polyline
              fill="none"
              stroke="rgba(255, 170, 0, 0.8)"
              strokeWidth="3"
              points="0,200 200,160 400,180 600,140 800,150 1000,120 1200,130 1400,100 1600,110 1800,90 2000,100 2200,80"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 170, 0, 0.5))' }}
            />
            {/* Data points */}
            <circle cx="600" cy="80" r="4" fill="#0088ff" style={{ filter: 'drop-shadow(0 0 6px #0088ff)' }} />
            <circle cx="1000" cy="60" r="4" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 6px #00ff88)' }} />
            <circle cx="1400" cy="50" r="4" fill="#ff0000" style={{ filter: 'drop-shadow(0 0 6px #ff0000)' }} />
          </svg>

          {/* Frosted glass overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
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
