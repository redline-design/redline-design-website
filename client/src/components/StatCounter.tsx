import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group text-center"
      data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      {/* Icon */}
      <div className="mx-auto mb-4 md:mb-5">
        <Icon 
          className="w-10 h-10 md:w-12 md:h-12 mx-auto" 
          style={{ color: "rgba(255, 0, 0, 0.5)" }}
          strokeWidth={1.5}
        />
      </div>

      {/* Number */}
      <motion.div
        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 tabular-nums"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #999999 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        data-testid={`text-stat-value-${label.toLowerCase().replace(/\s/g, "-")}`}
      >
        {prefix}{count}{suffix}
      </motion.div>

      {/* Label */}
      <div 
        className="text-xs md:text-sm text-white/70 font-medium tracking-wide"
        data-testid={`text-stat-label-${label.toLowerCase().replace(/\s/g, "-")}`}
      >
        {label}
      </div>
    </motion.div>
  );
}
