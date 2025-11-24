import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  icon: LucideIcon;
}

export default function StatCounter({ value, suffix = "", prefix = "", label, delay = 0, icon: Icon }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
      } : { 
        opacity: 0, 
        y: 30, 
        rotateX: -15 
      }}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.05,
        rotateY: 5,
        z: 50,
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 min-h-[120px] md:min-h-[200px]"
      style={{
        background: "linear-gradient(145deg, rgba(25, 25, 25, 0.7), rgba(15, 15, 15, 0.7))",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: `
          12px 12px 24px rgba(0, 0, 0, 0.5),
          -8px -8px 16px rgba(40, 40, 40, 0.1),
          inset 1px 1px 2px rgba(255, 255, 255, 0.03),
          inset -1px -1px 2px rgba(0, 0, 0, 0.3)
        `,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      {/* Animated glow on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0.1) 40%, transparent 70%)`,
            animation: prefersReducedMotion ? "none" : "pulseGlow 2s ease-in-out infinite",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <div className="relative h-full flex flex-col items-center justify-center p-2 md:p-6 z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="mb-1 md:mb-4"
        >
          <div
            className="w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.05))",
              border: "1px solid rgba(255, 0, 0, 0.3)",
              boxShadow: `
                inset 2px 2px 4px rgba(0, 0, 0, 0.4),
                inset -2px -2px 4px rgba(255, 0, 0, 0.1),
                0 4px 12px rgba(255, 0, 0, 0.3)
              `,
            }}
          >
            <Icon 
              className="w-4 h-4 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
              style={{ 
                color: "#ff0000",
                filter: "drop-shadow(0 2px 4px rgba(255, 0, 0, 0.5))"
              }}
            />
          </div>
        </motion.div>

        {/* Number */}
        <motion.div
          className="text-2xl md:text-6xl font-black mb-0.5 md:mb-3"
          style={{
            color: "#ff0000",
            textShadow: "0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)",
            filter: isHovered ? "brightness(1.3)" : "brightness(1)",
            transition: "filter 0.3s ease",
          }}
          data-testid={`text-stat-value-${label.toLowerCase().replace(/\s/g, "-")}`}
        >
          {prefix}{count}{suffix}
        </motion.div>

        {/* Label */}
        <div 
          className="text-[8px] md:text-base font-semibold text-foreground uppercase tracking-tight md:tracking-wider"
          data-testid={`text-stat-label-${label.toLowerCase().replace(/\s/g, "-")}`}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}
