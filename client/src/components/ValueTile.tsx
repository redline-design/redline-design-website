import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ValueTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  index?: number;
}

export default function ValueTile({ icon: Icon, title, description, delay = 0, index = 0 }: ValueTileProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="value-card-wrapper"
      style={{ '--i': index } as React.CSSProperties}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="h-full"
      >
        <Card
          className="neumorphic-card h-full transition-all duration-300 rounded-2xl group flex items-center hover-elevate"
          style={{
            background: "linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%)",
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.9),
              -4px -4px 8px rgba(255, 255, 255, 0.02),
              inset 1px 1px 2px rgba(255, 255, 255, 0.05),
              inset -1px -1px 2px rgba(0, 0, 0, 0.2)
            `,
          }}
          data-testid={`card-value-${title.toLowerCase().replace(/\s/g, "-")}`}
        >
          <CardContent className="p-6 w-full">
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <motion.div 
                className="flex-shrink-0 p-4 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(255, 0, 0, 0.05) 100%)",
                  border: "1.5px solid rgba(255, 0, 0, 0.3)",
                  boxShadow: `
                    6px 6px 12px rgba(0, 0, 0, 0.4),
                    -3px -3px 8px rgba(255, 255, 255, 0.02),
                    inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                    0 0 16px rgba(255, 0, 0, 0.2)
                  `,
                }}
              >
                <Icon className="h-7 w-7 text-primary drop-shadow-lg" data-testid={`icon-value-${title.toLowerCase().replace(/\s/g, "-")}`} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: delay + 0.2, duration: 0.4 }}
              >
                <h3 className="text-base font-bold text-foreground mb-2 uppercase tracking-wider" data-testid={`text-value-title-${title.toLowerCase().replace(/\s/g, "-")}`}>
                  {title}
                </h3>
                <p className="text-xs text-foreground/80 leading-relaxed" data-testid={`text-value-description-${title.toLowerCase().replace(/\s/g, "-")}`}>
                  {description}
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
