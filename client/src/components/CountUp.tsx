import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function CountUp({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2,
  delay = 0,
  className = ""
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState("0");

  // Handle reduced motion preference changes - stop animation immediately
  useEffect(() => {
    if (prefersReducedMotion && isInView) {
      // Stop any ongoing animation and show final value immediately
      motionValue.stop();
      motionValue.set(value);
      setDisplayValue(value.toString());
    }
  }, [prefersReducedMotion, isInView, motionValue, value]);

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = springValue.on("change", (latest) => {
      // Format the number with appropriate decimal places
      const formatted = latest < 10 && value >= 10 
        ? latest.toFixed(1) 
        : Math.floor(latest).toString();
      setDisplayValue(formatted);
    });

    return () => unsubscribe();
  }, [springValue, value, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : delay }}
    >
      <span>
        {prefix}{displayValue}{suffix}
      </span>
    </motion.div>
  );
}
