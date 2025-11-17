import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

export default function StatCounter({ value, suffix = "", prefix = "", label, delay = 0 }: StatCounterProps) {
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
      transition={{ duration: 0.5, delay }}
      className="neumorphic-card p-6 text-center"
      data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="text-4xl md:text-5xl font-black text-primary mb-2 number-pop" data-testid={`text-stat-value-${label.toLowerCase().replace(/\s/g, "-")}`}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm md:text-base text-foreground" data-testid={`text-stat-label-${label.toLowerCase().replace(/\s/g, "-")}`}>
        {label}
      </div>
    </motion.div>
  );
}
