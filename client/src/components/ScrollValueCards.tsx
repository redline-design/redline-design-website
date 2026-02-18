import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

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

const metricData: Record<string, { value: number; suffix: string; label: string }> = {
  "Maximum ROI": { value: 7, suffix: "x", label: "Avg Return" },
  "Surprisingly Affordable": { value: 500, suffix: "", label: "Starting /mo" },
  "Quick Turnaround": { value: 24, suffix: "hr", label: "Turnaround" },
  "Success Driven": { value: 100, suffix: "%", label: "Transparency" },
  "Full Service": { value: 10, suffix: "+", label: "Services" },
  "Individual Focus": { value: 1, suffix: ":1", label: "Dedicated" },
};

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  if (inView && !hasAnimated.current) {
    hasAnimated.current = true;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  return (
    <span className="tabular-nums">
      {value >= 100 ? `$${count}` : count}{suffix}
    </span>
  );
}

function ProgressRing({ progress, color, size = 80, strokeWidth = 3, delay = 0, inView }: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
  inView: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
        transition={{ duration: 1.5, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export default function ScrollValueCards({ cards }: ScrollValueCardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const progressValues = [92, 95, 88, 100, 97, 90];

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      data-testid="container-value-cards"
    >
      <div className="mx-auto px-4 md:px-8 lg:px-12 max-w-7xl relative z-10 py-12 md:py-24">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-4 tracking-tight section-heading-glow">
            Results That Speak
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
              const metric = metricData[card.title] || { value: 0, suffix: "", label: "" };
              const progress = progressValues[currentCardIndex] || 90;
              const color = card.accentColor || "#ff0000";

              return (
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,10,0.8)" }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                    />

                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
                        <ProgressRing progress={progress} color={color} size={80} strokeWidth={3} delay={0} inView={true} />
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                      </div>

                      <div className="text-3xl font-bold text-white mb-1 font-mono">
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={true} />
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-3">{metric.label}</div>

                      <h3 className="text-lg font-bold text-white mb-4">{card.title}</h3>

                      {card.bullets && (
                        <div className="space-y-2 w-full text-left">
                          {card.bullets.map((bullet, bulletIdx) => (
                            <div key={bulletIdx} className="flex items-start gap-2.5">
                              <div className="flex-shrink-0 w-1 h-1 rounded-full mt-2" style={{ background: color }} />
                              <span className="text-sm text-white/70 leading-relaxed">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

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
                      ? "w-8 h-2 bg-red-500"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
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

        {/* Desktop Infographic */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              const isActive = activeCard === idx;
              const metric = metricData[card.title] || { value: 0, suffix: "", label: "" };
              const progress = progressValues[idx] || 90;
              const color = card.accentColor || "#ff0000";

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                  data-testid={`card-value-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}15, transparent 40%)`,
                    }}
                  />

                  <div
                    className="relative rounded-2xl overflow-hidden h-full transition-all duration-500"
                    style={{
                      border: isActive ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.06)",
                      background: isActive
                        ? "rgba(12,12,12,0.95)"
                        : "rgba(10,10,10,0.7)",
                      transform: isActive ? "translateY(-6px)" : "translateY(0)",
                      boxShadow: isActive ? `0 20px 60px -15px ${color}20, 0 0 0 1px ${color}10` : "none",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    <div className="p-5 lg:p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="relative flex-shrink-0">
                          <div className="relative w-16 h-16 lg:w-[72px] lg:h-[72px] flex items-center justify-center">
                            <ProgressRing
                              progress={progress}
                              color={color}
                              size={72}
                              strokeWidth={2.5}
                              delay={idx * 0.12}
                              inView={inView}
                            />
                            <div
                              className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-full flex items-center justify-center transition-all duration-300"
                              style={{
                                background: isActive ? `${color}20` : `${color}10`,
                                border: `1px solid ${color}25`,
                              }}
                            >
                              <Icon
                                className="w-5 h-5 lg:w-6 lg:h-6 transition-all duration-300"
                                style={{
                                  color: isActive ? color : `${color}cc`,
                                  filter: isActive ? `drop-shadow(0 0 8px ${color}60)` : "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 pt-1">
                          <motion.div
                            className="text-2xl lg:text-3xl font-bold font-mono leading-none mb-0.5"
                            style={{ color }}
                            initial={false}
                            animate={{
                              textShadow: isActive ? `0 0 20px ${color}50` : "none",
                            }}
                          >
                            <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
                          </motion.div>
                          <div className="text-[10px] lg:text-[11px] text-white/35 uppercase tracking-[0.15em] font-medium">
                            {metric.label}
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-white/15 pt-0.5">
                          0{idx + 1}
                        </div>
                      </div>

                      <h3
                        className="text-base lg:text-lg font-bold text-white mb-3 tracking-tight transition-colors duration-300"
                        style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.9)" }}
                        data-testid={`text-value-title-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {card.title}
                      </h3>

                      <div className="flex-1 space-y-1.5">
                        {card.bullets?.map((bullet, bulletIdx) => (
                          <motion.div
                            key={bulletIdx}
                            className="flex items-center gap-2.5"
                            initial={false}
                            animate={{
                              x: isActive ? 3 : 0,
                              opacity: isActive ? 1 : 0.6,
                              transition: { delay: bulletIdx * 0.02, duration: 0.3 },
                            }}
                          >
                            <motion.div
                              className="flex-shrink-0 w-[3px] h-[3px] rounded-full"
                              style={{ background: isActive ? color : "rgba(255,255,255,0.25)" }}
                              initial={false}
                              animate={{
                                scale: isActive ? [1, 1.5, 1] : 1,
                                transition: { delay: bulletIdx * 0.04, duration: 0.4 },
                              }}
                            />
                            <span
                              className="text-xs lg:text-[13px] leading-relaxed transition-colors duration-300"
                              style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}
                            >
                              {bullet}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        className="mt-4 pt-3 flex items-center justify-between"
                        style={{ borderTop: `1px solid ${isActive ? `${color}20` : "rgba(255,255,255,0.04)"}` }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              background: color,
                              boxShadow: isActive ? `0 0 8px ${color}80` : "none",
                            }}
                          />
                          <span
                            className="text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300"
                            style={{ color: isActive ? `${color}cc` : "rgba(255,255,255,0.2)" }}
                          >
                            Active
                          </span>
                        </div>
                        <div
                          className="h-[2px] rounded-full transition-all duration-700"
                          style={{
                            width: isActive ? "40%" : "0%",
                            background: `linear-gradient(90deg, ${color}, transparent)`,
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-10 lg:mt-14 flex justify-center gap-6 lg:gap-10 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Clients Served", value: "200+" },
              { label: "Revenue Generated", value: "$50M+" },
              { label: "Client Retention", value: "94%" },
              { label: "Avg Response Time", value: "<2hr" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center" data-testid={`stat-summary-${idx}`}>
                <div className="text-lg lg:text-xl font-bold text-white font-mono mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
