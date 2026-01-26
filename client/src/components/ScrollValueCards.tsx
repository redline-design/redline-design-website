import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "start 20%"]
  });

  // GPU-friendly parallax effect instead of background-attachment: fixed
  const backgroundY = prefersReducedMotion ? 0 : useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      data-testid="container-value-cards"
    >
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

        {/* Mobile Carousel */}
        <div className="sm:hidden relative">
          <AnimatePresence mode="wait">
            {(() => {
              const card = cards[currentCardIndex];
              const Icon = card.icon;
              const accentColor = card.accentColor || '#ff0000';
              
              return (
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <Card 
                    className="h-full relative group overflow-visible min-h-[320px]"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "12px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <CardContent className="p-5 h-full flex flex-col relative z-10">
                      {/* Icon Container */}
                      <div className="flex justify-center mb-4">
                        <div 
                          className="flex items-center justify-center w-12 h-12 rounded-full"
                          style={{
                            background: `${accentColor}15`,
                          }}
                        >
                          <Icon 
                            className="h-6 w-6"
                            style={{ color: accentColor }}
                            data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-base font-black text-center mb-4 uppercase tracking-tight leading-tight"
                        style={{ color: accentColor }}
                        data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {card.title}
                      </h3>

                      {/* Content - Bullets or Description */}
                      {card.bullets ? (
                        <div className="flex-1 space-y-2.5">
                          {card.bullets.map((bullet, bulletIdx) => (
                            <div 
                              key={bulletIdx} 
                              className="flex items-start gap-2"
                            >
                              {/* Checkmark */}
                              <div 
                                className="flex-shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-none"
                                style={{
                                  background: "linear-gradient(135deg, #00ff88 0%, #00dd77 100%)",
                                }}
                              >
                                <svg 
                                  width="11" 
                                  height="11" 
                                  viewBox="0 0 16 16"
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
                              <span className="text-sm text-foreground/90 leading-snug font-medium">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : card.description ? (
                        <p 
                          className="text-sm text-muted-foreground leading-snug flex-1"
                          data-testid={`text-value-description-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          {card.description}
                        </p>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              onClick={handlePrevCard}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white/60 hover:text-white hover:bg-white/10"
              aria-label="Previous card"
              data-testid="button-value-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {cards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCardIndex(idx)}
                  className={`transition-all rounded-full ${idx === currentCardIndex ? 'w-5 h-1.5 bg-red-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to card ${idx + 1}`}
                  data-testid={`dot-value-${idx}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextCard}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white/60 hover:text-white hover:bg-white/10"
              aria-label="Next card"
              data-testid="button-value-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
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
                  className="h-full relative group overflow-visible"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <CardContent className="p-3 md:p-6 h-full flex flex-col relative z-10">
                    {/* Icon Container */}
                    <div className="flex justify-center mb-2 md:mb-5">
                      <div 
                        className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full"
                        style={{
                          background: `${accentColor}15`,
                        }}
                      >
                        <Icon 
                          className="h-5 w-5 md:h-7 md:w-7"
                          style={{ color: accentColor }}
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
