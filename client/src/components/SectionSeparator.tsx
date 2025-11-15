import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionSeparatorProps {
  variant?: "pulse" | "diagonal" | "gradient";
}

export default function SectionSeparator({ variant = "pulse" }: SectionSeparatorProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  if (variant === "diagonal") {
    return (
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-background transform -skew-y-2"></div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-1 my-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </motion.div>
    );
  }

  // Default: pulse variant
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-px my-24 mx-auto max-w-4xl"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
    </motion.div>
  );
}
