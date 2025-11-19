import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ValueCardData {
  icon: LucideIcon;
  title: string;
  description?: string;
  bullets?: string[];
  index: number;
  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

interface ScrollValueCardsProps {
  cards: ValueCardData[];
}

interface AnimatedValueCardProps {
  card: ValueCardData;
  index: number;
  totalCards: number;
  spreadProgress: MotionValue<number>;
  getSpreadPosition: (index: number, total: number) => { x: number; y: number };
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

// Helper function to convert colors to rgba format with alpha
function colorToRgba(color: string, alpha: number): string {
  // If already a CSS variable or rgb/rgba format, use as-is with opacity wrapper
  if (color.startsWith('var(') || color.startsWith('rgb(') || color.startsWith('rgba(')) {
    // For CSS variables and rgb, we can't easily add alpha, so return with opacity layer
    // This will be used in a radial-gradient, so we'll handle it differently
    return color;
  }
  
  // Handle hex colors
  let hex = color.replace('#', '');
  
  // Handle shorthand hex (e.g., #fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Validate hex format
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    // Fallback to red if invalid
    hex = 'ff0000';
  }
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function AnimatedValueCard({ card, index, totalCards, spreadProgress, getSpreadPosition, hoveredIndex, onHover }: AnimatedValueCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = card.icon;
  const spreadPos = getSpreadPosition(index, totalCards);
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
  
  const rotation = useTransform(
    spreadProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [index * 6 - 42, 0]
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
  
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "58%",
        left: "50%",
        x: xPos,
        y: yPos,
        translateX: "-50%",
        translateY: "-50%",
        width: "290px",
        rotate: rotation,
        transformOrigin: "50% 100%",
        willChange: "transform",
      }}
    >
      <Card
        className="h-full transition-all duration-500 rounded-2xl group hover-elevate active-elevate-2 overflow-hidden relative"
        data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        style={{ 
          height: "540px",
          background: "linear-gradient(145deg, rgba(25, 25, 25, 0.7), rgba(15, 15, 15, 0.7))",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: `
            12px 12px 24px rgba(0, 0, 0, 0.5),
            -8px -8px 16px rgba(40, 40, 40, 0.1),
            inset 1px 1px 2px rgba(255, 255, 255, 0.03),
            inset -1px -1px 2px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        {/* Heavy frost overlay for non-hovered cards - completely hides content */}
        {isOtherHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: "rgba(10, 10, 10, 0.92)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "all 0.3s ease-in-out",
            }}
            data-testid="frost-overlay"
          />
        )}
        
        {/* Animated background on hover - color-themed pulsing glow (respects reduced motion) */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${colorToRgba(accentColor, 0.6)} 0%, ${colorToRgba(accentColor, 0.2)} 40%, transparent 70%)`,
              animation: prefersReducedMotion ? "none" : "pulseGlow 2s ease-in-out infinite",
            }}
            data-testid="animated-glow"
          />
        )}
        
        <CardContent className="p-5 pb-8 w-full h-full relative z-10 flex flex-col">
          <div className="flex flex-col h-full">
            {/* Icon centered at top */}
            <div className="flex justify-center mb-3">
              <div 
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <Icon 
                  className="h-10 w-10" 
                  style={{ color: accentColor, filter: `drop-shadow(0 0 12px ${colorToRgba(accentColor, 0.5)})` }}
                  data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`} 
                />
              </div>
            </div>
            
            {/* Title centered below icon */}
            <h3 className="text-lg font-black text-foreground text-center mb-6 uppercase tracking-wider" data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
              {card.title}
            </h3>
            
            {card.bullets ? (
              <div className="flex-1 space-y-3.5">
                {card.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-left">
                    <div 
                      className="flex-shrink-0 mt-0.5"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "6px",
                        background: "linear-gradient(145deg, rgba(0, 255, 136, 0.15), rgba(0, 255, 136, 0.05))",
                        border: "1px solid rgba(0, 255, 136, 0.3)",
                        boxShadow: `
                          inset 2px 2px 4px rgba(0, 0, 0, 0.4),
                          inset -2px -2px 4px rgba(0, 255, 136, 0.1),
                          0 2px 8px rgba(0, 255, 136, 0.2)
                        `,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                      }}
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 16 16"
                        style={{ 
                          color: "#00ff88",
                          filter: "drop-shadow(0 1px 2px rgba(0, 255, 136, 0.4))"
                        }}
                      >
                        <path 
                          d="M13 4L6 11L3 8" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <span className="text-base text-muted-foreground leading-relaxed flex-1">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            ) : card.description ? (
              <p className="text-base text-muted-foreground leading-relaxed flex-1" data-testid={`text-value-description-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
                {card.description}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ScrollValueCards({ cards }: ScrollValueCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 40%"]
  });

  // Transform scroll progress to spread amount (0 = stacked, 1 = spread)
  const spreadProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Calculate positions for each card when spread out - single row
  const getSpreadPosition = (index: number, total: number) => {
    const cardWidth = 290;
    const spacing = total <= 6 ? 310 : 300; // Increased spacing between cards
    const xOffset = (index - (total - 1) / 2) * spacing;
    return { x: xOffset, y: 0 };
  };

  return (
    <div ref={containerRef} className="relative" style={{ position: "relative" }} data-testid="container-value-cards">
      <div 
        className="relative mx-auto"
        style={{
          width: "95%",
          minHeight: "620px",
          maxWidth: "2400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div 
          className="relative rounded-2xl" 
          style={{ 
            width: "100%", 
            height: "600px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            overflow: "visible",
          }}
        >
          {/* Animated hexagon background */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ background: "#0a0a0a" }}
          >
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hexPattern" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                  {/* Hexagon path */}
                  <polygon
                    points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                    fill="none"
                    stroke="rgba(255, 0, 0, 0.2)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                    fill="rgba(255, 0, 0, 0.02)"
                    stroke="none"
                  >
                    <animate
                      attributeName="fill"
                      values="rgba(255, 0, 0, 0.02);rgba(0, 136, 255, 0.05);rgba(0, 255, 136, 0.03);rgba(255, 0, 0, 0.02)"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </pattern>
                
                <pattern id="hexPatternOffset" x="50" y="43.3" width="100" height="86.6" patternUnits="userSpaceOnUse">
                  <polygon
                    points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                    fill="none"
                    stroke="rgba(0, 136, 255, 0.2)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                    fill="rgba(0, 136, 255, 0.02)"
                    stroke="none"
                  >
                    <animate
                      attributeName="fill"
                      values="rgba(0, 136, 255, 0.02);rgba(0, 255, 136, 0.05);rgba(255, 0, 0, 0.03);rgba(0, 136, 255, 0.02)"
                      dur="8s"
                      begin="2s"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </pattern>
              </defs>
              
              {/* Hexagon grid layers */}
              <rect width="100%" height="100%" fill="url(#hexPattern)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 25,43.3; 0,0"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect width="100%" height="100%" fill="url(#hexPatternOffset)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -25,-43.3; 0,0"
                  dur="25s"
                  repeatCount="indefinite"
                />
              </rect>
              
              {/* Glowing hexagons scattered across */}
              {[
                { cx: 150, cy: 100, color: '#ff0000', delay: '0s' },
                { cx: 450, cy: 80, color: '#0088ff', delay: '2s' },
                { cx: 750, cy: 150, color: '#00ff88', delay: '4s' },
                { cx: 1050, cy: 90, color: '#ff0000', delay: '1s' },
                { cx: 1350, cy: 130, color: '#0088ff', delay: '3s' },
                { cx: 250, cy: 200, color: '#00ff88', delay: '5s' },
              ].map((hex, i) => (
                <polygon
                  key={i}
                  points={`${hex.cx},${hex.cy - 30} ${hex.cx + 26},${hex.cy - 15} ${hex.cx + 26},${hex.cy + 15} ${hex.cx},${hex.cy + 30} ${hex.cx - 26},${hex.cy + 15} ${hex.cx - 26},${hex.cy - 15}`}
                  fill="none"
                  stroke={hex.color}
                  strokeWidth="2"
                  opacity="0.3"
                >
                  <animate
                    attributeName="opacity"
                    values="0.1;0.6;0.1"
                    dur="4s"
                    begin={hex.delay}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-width"
                    values="1;3;1"
                    dur="4s"
                    begin={hex.delay}
                    repeatCount="indefinite"
                  />
                </polygon>
              ))}
            </svg>
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

          {/* Title */}
          <div className="absolute top-8 left-0 right-0 z-20 text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] red-glow-pulse" style={{ color: "#ff0000" }}>
              Why Choose Us
            </h2>
          </div>

          {/* Content container */}
          <div className="relative w-full h-full">
            {cards.map((card, idx) => (
              <AnimatedValueCard
                key={card.title}
                card={card}
                index={idx}
                totalCards={cards.length}
                spreadProgress={spreadProgress}
                getSpreadPosition={getSpreadPosition}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
