import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronLeft, ChevronRight, Check } from "lucide-react";

// Import background images for cards
import roiImage from "../assets/images/value-card-roi.jpg";
import affordableImage from "../assets/images/value-card-affordable.jpg";
import speedImage from "../assets/images/value-card-speed.jpg";
import successImage from "../assets/images/value-card-success.jpg";
import fullServiceImage from "../assets/images/value-card-fullservice.jpg";
import individualImage from "../assets/images/value-card-individual.jpg";

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

// Map card titles to background images
const cardBackgrounds: Record<string, string> = {
  "Maximum ROI": roiImage,
  "Surprisingly Affordable": affordableImage,
  "Quick Turnaround": speedImage,
  "Success Driven": successImage,
  "Full Service": fullServiceImage,
  "Individual Focus": individualImage,
};

export default function ScrollValueCards({ cards }: ScrollValueCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const getCardBackground = (title: string) => {
    return cardBackgrounds[title] || roiImage;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      data-testid="container-value-cards"
    >
      <div className="mx-auto px-4 md:px-8 lg:px-12 max-w-7xl relative z-10 py-12 md:py-24">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-medium text-red-400 uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">Speak</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Data-driven strategies that deliver measurable growth and ROI
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="sm:hidden relative">
          <AnimatePresence mode="wait">
            {(() => {
              const card = cards[currentCardIndex];
              const Icon = card.icon;
              const bgImage = getCardBackground(card.title);
              
              return (
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                  className="relative group"
                >
                  {/* Card */}
                  <div 
                    className="relative rounded-2xl min-h-[340px] flex flex-col overflow-hidden"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    
                    {/* Frosted Glass Overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.92) 100%)",
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col h-full">
                      {/* Top accent line */}
                      <div 
                        className="absolute top-0 left-6 right-6 h-px"
                        style={{
                          background: "linear-gradient(90deg, transparent, #ff0000, transparent)"
                        }}
                      />
                      
                      {/* Icon */}
                      <div className="mb-5">
                        <div 
                          className="inline-flex items-center justify-center w-14 h-14 rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,0,0,0.2) 0%, rgba(255,0,0,0.08) 100%)",
                            border: "1px solid rgba(255,0,0,0.25)",
                          }}
                        >
                          <Icon className="w-7 h-7 text-red-500" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Bullets */}
                      {card.bullets && (
                        <div className="flex-1 space-y-3">
                          {card.bullets.map((bullet, bulletIdx) => (
                            <div key={bulletIdx} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-black" strokeWidth={3} />
                              </div>
                              <span className="text-sm text-white/80 leading-relaxed">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.description && !card.bullets && (
                        <p className="text-sm text-white/70 leading-relaxed flex-1">
                          {card.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={handlePrevCard}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
              aria-label="Previous card"
              data-testid="button-value-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {cards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCardIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentCardIndex 
                      ? 'w-8 h-2 bg-red-500' 
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                  data-testid={`dot-value-${idx}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextCard}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
              aria-label="Next card"
              data-testid="button-value-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === idx;
            const bgImage = getCardBackground(card.title);
            
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                viewport={{ once: true, margin: "-80px" }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,0,0,0.3) 0%, transparent 50%, rgba(255,0,0,0.1) 100%)",
                  }}
                />
                
                {/* Card */}
                <div 
                  className="relative rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300"
                  style={{
                    border: isHovered 
                      ? "1px solid rgba(255,0,0,0.3)" 
                      : "1px solid rgba(255,255,255,0.06)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{ 
                      backgroundImage: `url(${bgImage})`,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  
                  {/* Frosted Glass Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      background: isHovered 
                        ? "linear-gradient(180deg, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.88) 100%)"
                        : "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.92) 100%)",
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-5 lg:p-7 h-full flex flex-col">
                    {/* Top accent line */}
                    <div 
                      className="absolute top-0 left-8 right-8 h-px transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(90deg, transparent, #ff0000, transparent)",
                        opacity: isHovered ? 1 : 0
                      }}
                    />
                    
                    {/* Card number */}
                    <div className="absolute top-4 right-5 text-xs font-mono text-white/20">
                      0{idx + 1}
                    </div>

                    {/* Icon */}
                    <div className="mb-5">
                      <div 
                        className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl transition-all duration-300"
                        style={{
                          background: isHovered 
                            ? "linear-gradient(135deg, rgba(255,0,0,0.25) 0%, rgba(255,0,0,0.12) 100%)"
                            : "linear-gradient(135deg, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0.06) 100%)",
                          border: isHovered 
                            ? "1px solid rgba(255,0,0,0.35)" 
                            : "1px solid rgba(255,0,0,0.2)",
                        }}
                      >
                        <Icon 
                          className="w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300"
                          style={{ color: isHovered ? "#ff3333" : "#ff0000" }}
                          data-testid={`icon-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-lg lg:text-xl font-bold text-white mb-4 tracking-tight transition-colors duration-300"
                      data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {card.title}
                    </h3>

                    {/* Bullets */}
                    {card.bullets ? (
                      <div className="flex-1 space-y-2.5">
                        {card.bullets.map((bullet, bulletIdx) => (
                          <motion.div 
                            key={bulletIdx} 
                            className="flex items-start gap-3"
                            initial={false}
                            animate={{ 
                              x: isHovered ? 4 : 0,
                              transition: { delay: bulletIdx * 0.03 }
                            }}
                          >
                            <div className="flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mt-0.5">
                              <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-black" strokeWidth={3} />
                            </div>
                            <span className="text-xs lg:text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                              {bullet}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    ) : card.description ? (
                      <p 
                        className="text-xs lg:text-sm text-white/60 leading-relaxed flex-1 group-hover:text-white/80 transition-colors duration-300"
                        data-testid={`text-value-description-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {card.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
