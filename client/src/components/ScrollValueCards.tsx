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

  return (
    <div ref={containerRef} className="relative py-12" data-testid="container-value-cards">
      <div className="mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-2 red-glow-pulse" style={{ color: "#ff0000" }}>
            Why Choose Us
          </h2>
          <div className="h-1 w-24 bg-red-500 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #ff0000, #0088ff, #00ff88)" }} />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const accentColor = card.accentColor || '#ff0000';
            
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-100px" }}
                data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <Card 
                  className="h-full relative group hover-elevate active-elevate-2 overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(25, 25, 25, 0.8), rgba(15, 15, 15, 0.8))",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: `
                      8px 8px 20px rgba(0, 0, 0, 0.4),
                      -6px -6px 16px rgba(40, 40, 40, 0.08),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                      inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                    `,
                    transition: "all 0.3s ease-out"
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${accentColor}15 0%, transparent 70%)`,
                    }}
                  />

                  <CardContent className="p-6 h-full flex flex-col relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className="flex justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative">
                        <Icon 
                          className="h-12 w-12"
                          style={{ 
                            color: accentColor,
                            filter: `drop-shadow(0 0 12px ${accentColor}40)`
                          }}
                          data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                        />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 
                      className="text-lg font-black text-foreground text-center mb-4 uppercase tracking-wider leading-tight"
                      data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {card.title}
                    </h3>

                    {/* Content - Bullets or Description */}
                    {card.bullets ? (
                      <div className="flex-1 space-y-3">
                        {card.bullets.map((bullet, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {/* Checkmark */}
                            <div 
                              className="flex-shrink-0 mt-1 w-5 h-5 rounded-sm flex items-center justify-center flex-none"
                              style={{
                                background: "linear-gradient(145deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1))",
                                border: "1px solid rgba(0, 255, 136, 0.4)",
                                boxShadow: `
                                  inset 1px 1px 2px rgba(0, 0, 0, 0.3),
                                  inset -1px -1px 2px rgba(0, 255, 136, 0.1),
                                  0 1px 4px rgba(0, 255, 136, 0.15)
                                `,
                              }}
                            >
                              <svg 
                                width="12" 
                                height="12" 
                                viewBox="0 0 16 16"
                                style={{ 
                                  color: "#00ff88",
                                  filter: "drop-shadow(0 0.5px 1px rgba(0, 255, 136, 0.3))"
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
                            {/* Text */}
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {bullet}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    ) : card.description ? (
                      <p 
                        className="text-sm text-muted-foreground leading-relaxed flex-1"
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
