import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function ScrollValueCards({ cards }: ScrollValueCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "start 20%"]
  });

  // GPU-friendly parallax effect instead of background-attachment: fixed
  const backgroundY = prefersReducedMotion ? 0 : useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{
        background: "linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(15, 20, 30, 0.90) 50%, rgba(10, 15, 25, 0.95) 100%)",
        position: "relative"
      }}
      data-testid="container-value-cards"
    >
      {/* Parallax overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: backgroundY,
          willChange: "transform"
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-10 w-72 h-72 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #ff0000, transparent)",
            animation: "pulse 8s ease-in-out infinite"
          }}
        />
        <div 
          className="absolute bottom-0 right-10 w-72 h-72 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #0088ff, transparent)",
            animation: "pulse 10s ease-in-out infinite 2s"
          }}
        />
      </div>

      <div className="mx-auto px-4 md:px-6 max-w-6xl relative z-10 py-8 md:py-20">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
            Results-driven digital marketing that actually delivers measurable ROI
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const accentColor = card.accentColor || '#ff0000';
            
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                style={{
                  willChange: "transform, opacity",
                  contain: "layout paint"
                }}
                data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <Card 
                  className="h-full relative group hover-elevate active-elevate-2 overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(25, 25, 25, 0.8), rgba(15, 15, 15, 0.8))",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: `
                      4px 4px 12px rgba(0, 0, 0, 0.4),
                      -2px -2px 8px rgba(40, 40, 40, 0.08),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05)
                    `,
                    transition: "all 0.3s ease-out"
                  }}
                >
                  <CardContent className="p-3 md:p-6 h-full flex flex-col relative z-10">
                    {/* Icon Container */}
                    <div className="flex justify-center mb-2 md:mb-6">
                      <div 
                        className="relative flex items-center justify-center w-[45px] h-[45px] md:w-[80px] md:h-[80px]"
                        style={{
                          borderRadius: "12px",
                          background: `linear-gradient(145deg, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.05))`,
                          border: `1px solid ${accentColor}40`,
                          boxShadow: `
                            2px 2px 8px rgba(0, 0, 0, 0.3),
                            0 0 12px ${accentColor}20
                          `,
                        }}
                      >
                        <Icon 
                          className="h-5 w-5 md:h-10 md:w-10"
                          style={{ 
                            color: accentColor,
                          }}
                          data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-[10px] md:text-xl font-black text-center mb-2 md:mb-5 uppercase tracking-tight leading-tight"
                      style={{ color: accentColor }}
                      data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {card.title}
                    </h3>

                    {/* Content - Bullets or Description */}
                    {card.bullets ? (
                      <div className="flex-1 space-y-1 md:space-y-3">
                        {card.bullets.map((bullet, bulletIdx) => (
                          <div 
                            key={bulletIdx} 
                            className="flex items-start gap-1 md:gap-3"
                          >
                            {/* Checkmark */}
                            <div 
                              className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 md:w-6 md:h-6 rounded flex items-center justify-center flex-none"
                              style={{
                                background: "linear-gradient(135deg, #00ff88 0%, #00dd77 100%)",
                              }}
                            >
                              <svg 
                                width="8" 
                                height="8" 
                                viewBox="0 0 16 16"
                                className="md:w-[14px] md:h-[14px]"
                                style={{ color: "#0a0a0a" }}
                              >
                                <path 
                                  d="M13 4L6 11L3 8" 
                                  stroke="currentColor" 
                                  strokeWidth="3" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                  fill="none"
                                />
                              </svg>
                            </div>
                            {/* Text */}
                            <span className="text-[10px] md:text-sm text-foreground/90 leading-tight md:leading-relaxed font-medium">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : card.description ? (
                      <p 
                        className="text-[10px] md:text-sm text-muted-foreground leading-tight md:leading-relaxed flex-1"
                        data-testid={`text-value-description-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {card.description}
                      </p>
                    ) : null}
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
