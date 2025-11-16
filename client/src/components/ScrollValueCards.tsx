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
}

interface ScrollValueCardsProps {
  cards: ValueCardData[];
}

export default function ScrollValueCards({ cards }: ScrollValueCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"]
  });

  // Transform scroll progress to spread amount (0 = stacked, 1 = spread)
  const spreadProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Calculate positions for each card when spread out
  const getSpreadPosition = (index: number, total: number) => {
    const cardsPerRow = Math.min(3, total);
    const row = Math.floor(index / cardsPerRow);
    const col = index % cardsPerRow;
    const xOffset = (col - (cardsPerRow - 1) / 2) * 200; // 200px spacing
    const yOffset = row * 240; // 240px row spacing
    return { x: xOffset, y: yOffset };
  };

  return (
    <div ref={containerRef} className="relative" data-testid="container-value-cards">
      <div 
        className="relative mx-auto"
        style={{
          width: "100%",
          minHeight: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "2rem",
        }}
      >
        <div className="relative" style={{ width: "600px", height: "400px" }}>
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const spreadPos = getSpreadPosition(idx, cards.length);
            
            const rotation = useTransform(
              spreadProgress,
              [0, 1],
              prefersReducedMotion ? [0, 0] : [idx * 8 - 40, 0]
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
                  width: "180px",
                  rotate: rotation,
                  transformOrigin: "50% 100%",
                  willChange: "transform",
                }}
              >
                <Card
                  className="h-full transition-all duration-300 rounded-2xl backdrop-blur-md bg-card/40 border-white/10 group flex items-center hover-elevate active-elevate-2"
                  data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                  style={{ height: "200px" }}
                >
                  <CardContent className="p-5 w-full">
                    <div className="flex flex-col items-center justify-center text-center gap-3">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 icon-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-6 w-6 text-primary" data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1" data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
                          {card.title}
                        </h3>
                        <p className="text-xs text-foreground" data-testid={`text-value-description-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
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
  );
}
