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
      className="relative py-16 md:py-20 overflow-hidden"
      data-testid="container-value-cards"
    >
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(15, 20, 30, 0.6) 50%, rgba(10, 15, 25, 0.8) 100%)",
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

      <div className="mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Results-driven digital marketing that actually delivers measurable ROI
          </p>
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
                    {/* Icon Container */}
                    <motion.div 
                      className="flex justify-center mb-6"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div 
                        className="relative flex items-center justify-center"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "16px",
                          background: `linear-gradient(145deg, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.05))`,
                          border: `1.5px solid ${accentColor}40`,
                          boxShadow: `
                            8px 8px 20px rgba(0, 0, 0, 0.3),
                            -4px -4px 12px rgba(${parseInt(accentColor.slice(1,3), 16)}, ${parseInt(accentColor.slice(3,5), 16)}, ${parseInt(accentColor.slice(5,7), 16)}, 0.1),
                            inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                            0 0 24px ${accentColor}30
                          `,
                        }}
                      >
                        <Icon 
                          className="h-10 w-10"
                          style={{ 
                            color: accentColor,
                            filter: `drop-shadow(0 0 8px ${accentColor}60)`
                          }}
                          data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                        />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 
                      className="text-xl font-black text-center mb-5 uppercase tracking-widest leading-tight"
                      style={{ color: accentColor, letterSpacing: "0.05em" }}
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
                            <motion.div 
                              className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-md flex items-center justify-center flex-none"
                              whileHover={{ scale: 1.1 }}
                              style={{
                                background: "linear-gradient(135deg, #00ff88 0%, #00dd77 100%)",
                                boxShadow: `
                                  0 4px 12px rgba(0, 255, 136, 0.25),
                                  inset 1px 1px 2px rgba(255, 255, 255, 0.2),
                                  inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                                `,
                              }}
                            >
                              <svg 
                                width="14" 
                                height="14" 
                                viewBox="0 0 16 16"
                                style={{ 
                                  color: "#0a0a0a",
                                  filter: "drop-shadow(0 0.5px 1px rgba(0, 0, 0, 0.2))"
                                }}
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
                            </motion.div>
                            {/* Text */}
                            <span className="text-sm text-foreground/90 leading-relaxed font-medium">
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
