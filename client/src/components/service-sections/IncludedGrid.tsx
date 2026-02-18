import { motion } from "framer-motion";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface IncludedItem {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

interface IncludedGridProps {
  title: string;
  subtitle?: string;
  items: IncludedItem[];
  columns?: 2 | 3 | 4;
}

function getGridCols(cols: number): string {
  if (cols === 2) return "grid-cols-1 md:grid-cols-2";
  if (cols === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
}

export default function IncludedGrid({ title, subtitle, items, columns = 3 }: IncludedGridProps) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-included" data-section-label="Included" ref={ref}>
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
            data-testid="text-included-heading"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/80 text-base md:text-lg" data-testid="text-included-subtitle">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className={`grid gap-3 md:gap-4 ${getGridCols(columns)}`}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                data-testid={`card-included-${index}`}
              >
                <div
                  className="relative overflow-hidden rounded-lg group"
                  style={{
                    background: "rgba(12, 12, 12, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  {/* Digital grid overlay */}
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.05 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={`h-${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 18}%`, background: "rgba(255,255,255,0.3)" }} />
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * 15}%`, background: "rgba(255,255,255,0.3)" }} />
                    ))}
                  </div>

                  {/* Animated fill bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: "linear-gradient(90deg, rgba(255,0,0,0.06), rgba(255,0,0,0.02), transparent)",
                    }}
                  />

                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.06 + 0.2 }}
                    style={{
                      background: "linear-gradient(180deg, #ff0000, rgba(255,0,0,0.4))",
                      transformOrigin: "top",
                      boxShadow: "0 0 8px rgba(255,0,0,0.3)",
                    }}
                  />

                  {/* Scan sweep */}
                  <motion.div
                    className="absolute inset-y-0 w-[25%] pointer-events-none"
                    initial={{ left: "-25%" }}
                    animate={inView ? { left: ["-25%", "125%"] } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.15 + 1,
                      repeat: Infinity,
                      repeatDelay: 8 + index * 0.3,
                      ease: "linear",
                    }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.06), transparent)",
                    }}
                  />

                  <div className="relative z-10 flex items-center gap-3 px-4 py-3.5 md:px-5 md:py-4">
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.06 + 0.4, type: "spring", stiffness: 300 }}
                    >
                      {Icon ? (
                        <div
                          className="w-9 h-9 rounded flex items-center justify-center"
                          style={{
                            background: "rgba(255,0,0,0.1)",
                            border: "1px solid rgba(255,0,0,0.2)",
                          }}
                        >
                          <Icon className="w-4 h-4 text-red-500" />
                        </div>
                      ) : (
                        <div
                          className="w-9 h-9 rounded flex items-center justify-center"
                          style={{
                            background: "rgba(255,0,0,0.1)",
                            border: "1px solid rgba(255,0,0,0.2)",
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-sm font-bold text-white tracking-wide"
                        data-testid={`text-included-title-${index}`}
                      >
                        {item.title}
                      </h3>
                      {item.description && (
                        <p
                          className="text-white/60 text-xs leading-relaxed mt-0.5"
                          data-testid={`text-included-description-${index}`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Status indicator */}
                    <motion.div
                      className="flex-shrink-0 flex items-center gap-1.5"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.08 + 0.6 }}
                    >
                      <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider hidden sm:inline">Included</span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={inView ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] } : {}}
                        transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                        style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
