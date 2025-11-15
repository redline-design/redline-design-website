import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SectionDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full py-8 flex items-center justify-center" data-testid="section-divider">
      <motion.div 
        className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ width: "80%", maxWidth: "1200px" }}
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
