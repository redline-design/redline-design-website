import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollAnimatedSection({ children, className = "" }: ScrollAnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
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
