import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  status?: "accepting" | "waitlist";
  delay?: number;
  accentColor?: string;
}

const ServiceCard = memo(function ServiceCard({ icon: Icon, title, description, onClick, status, delay = 0, accentColor = "rgb(96, 165, 250)" }: ServiceCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="h-full"
    >
      <div 
        onClick={onClick} 
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Learn more about ${title}`}
        className="block h-full cursor-pointer"
        data-testid={`button-service-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <Card
          className="hover-elevate active-elevate-2 transition-all duration-300 rounded-2xl group backdrop-blur-md bg-card/40 border-border/30 relative overflow-hidden flex flex-col"
          style={{ height: '100%' }}
        >
          <CardContent className="p-4 sm:p-5 md:p-6 relative z-10 flex flex-col h-full justify-between text-center">
            <div>
              <motion.div
                className="mb-3 sm:mb-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl mx-auto"
                style={{ 
                  backgroundColor: `${accentColor}20`,
                  color: accentColor
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2 transition-colors" data-testid={`text-service-title-${title.toLowerCase().replace(/\s/g, "-")}`}>
                {title}
              </h3>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed" data-testid={`text-service-description-${title.toLowerCase().replace(/\s/g, "-")}`}>
                {description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-foreground text-sm font-medium group-hover:gap-3 transition-all mt-3 sm:mt-4">
              <span>Learn More</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
});

export default ServiceCard;
