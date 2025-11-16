import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollAnimatedSection({ children, className = "" }: ScrollAnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const { ref, inView } = useInView({
    threshold: 0.7,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      data-section-visible={inView}
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
    >
      {children}
    </motion.div>
  );
}
