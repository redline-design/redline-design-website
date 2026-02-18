import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
}

function AnimatedPercent({ target, delay = 0 }: { target: number; delay?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = Date.now();
          const duration = 1200;
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          setTimeout(tick, delay);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay]);

  return <span ref={ref}>{value}%</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BenefitsGrid({ benefits }: BenefitsGridProps) {
  const impactValues = [97, 94, 91, 88, 96, 93, 89, 95];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-benefits" data-section-label="Benefits">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
            data-testid="text-benefits-heading"
          >
            Why It Matters
          </h2>
          <p className="text-white/50 text-base md:text-lg">
            Core capabilities that drive measurable results
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const impactVal = impactValues[index % impactValues.length];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative overflow-hidden rounded-lg group"
                data-testid={`card-benefit-${index}`}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "0.5rem",
                  }}
                />

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px),
                      repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)`,
                  }}
                />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(255,0,0,0.03) 50%, transparent 100%)",
                    height: "40%",
                  }}
                  animate={{ y: ["-40%", "250%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 + index * 0.5, ease: "linear" }}
                />

                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    background: "linear-gradient(180deg, #ff0000, rgba(255,0,0,0.2))",
                    borderRadius: "0.5rem 0 0 0.5rem",
                  }}
                />

                <div className="relative p-5 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,0,0,0.05))",
                          border: "1px solid rgba(255,0,0,0.2)",
                        }}
                      >
                        <Icon className="w-5 h-5 text-red-500" />
                      </div>
                      <motion.div
                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        style={{ boxShadow: "0 0 6px rgba(34,197,94,0.5)" }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          className="text-base font-semibold text-white truncate"
                          data-testid={`text-benefit-title-${index}`}
                        >
                          {benefit.title}
                        </h3>
                        <span className="text-[10px] font-mono text-green-400/70 flex-shrink-0 flex items-center gap-1">
                          <motion.span
                            className="inline-block w-1 h-1 rounded-full bg-green-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ACTIVE
                        </span>
                      </div>
                      <p
                        className="text-white/55 text-sm leading-relaxed"
                        data-testid={`text-benefit-description-${index}`}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Impact Score</span>
                        <span className="text-xs font-mono font-bold text-red-400">
                          <AnimatedPercent target={impactVal} delay={index * 150} />
                        </span>
                      </div>
                      <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #ff0000, rgba(255,0,0,0.5))" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${impactVal}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-px h-6" style={{ background: "rgba(255,255,255,0.08)" }} />

                    <div className="flex-shrink-0 flex items-center gap-1.5">
                      {[0, 1, 2, 3].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-[3px] rounded-full"
                          style={{
                            background: bar < 3 ? "rgba(255,0,0,0.6)" : "rgba(255,255,255,0.1)",
                            height: `${8 + bar * 4}px`,
                          }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + bar * 0.08 + 0.5 }}
                        />
                      ))}
                      <span className="text-[9px] font-mono text-white/25 ml-0.5">SIG</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
