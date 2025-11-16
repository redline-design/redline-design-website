import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SectionDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full" data-testid="section-divider">
      <motion.div 
        className="h-[2px] w-full bg-primary"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 1,
          ease: "easeOut"
        }}
      />
    </div>
  );
}
