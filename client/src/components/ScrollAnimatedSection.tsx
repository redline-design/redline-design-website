import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollAnimatedSection({ children, className = "" }: ScrollAnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const { ref, inView, entry } = useInView({
    threshold: [0, 0.7],
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && entry && entry.intersectionRatio >= 0.7) {
      setIsCompleted(true);
    } else if (entry && entry.boundingClientRect.top > 0 && entry.intersectionRatio < 0.3) {
      setIsCompleted(false);
    }
  }, [inView, entry]);

  return (
    <motion.div
      ref={ref}
      className={className}
      data-section-completed={isCompleted}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ 
        once: false,
        margin: "-10% 0px -10% 0px",
        amount: 0.3
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut"
      }}
      style={{
        willChange: "transform, opacity",
        contain: "layout paint"
      }}
    >
      {children}
    </motion.div>
  );
}
