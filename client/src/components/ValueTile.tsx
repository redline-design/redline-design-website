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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay }}
      className="value-card-wrapper"
      style={{ '--i': index } as React.CSSProperties}
    >
      <Card
        className="value-card h-full transition-all duration-300 rounded-2xl backdrop-blur-md bg-card/40 border-white/10 group flex items-center"
        data-testid={`card-value-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <CardContent className="p-5 w-full">
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 icon-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Icon className="h-6 w-6 text-primary" data-testid={`icon-value-${title.toLowerCase().replace(/\s/g, "-")}`} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1" data-testid={`text-value-title-${title.toLowerCase().replace(/\s/g, "-")}`}>
                {title}
              </h3>
              <p className="text-xs text-foreground" data-testid={`text-value-description-${title.toLowerCase().replace(/\s/g, "-")}`}>
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
