import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  status?: "accepting" | "waitlist";
  delay?: number;
}

export default function ServiceCard({ icon: Icon, title, description, link, status, delay = 0 }: ServiceCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

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
    >
      <Link href={link}>
        <Card
          className="h-full hover-elevate active-elevate-2 transition-all duration-300 rounded-2xl group cursor-pointer backdrop-blur-md bg-card/40 border-border/30 relative overflow-hidden"
          data-testid={`card-service-${title.toLowerCase().replace(/\s/g, "-")}`}
        >
          <CardContent className="p-8 relative z-10">
            <motion.div
              className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-foreground/10 text-foreground"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="h-7 w-7" />
            </motion.div>

            <h3 className="text-2xl font-bold text-foreground mb-3 transition-colors" data-testid={`text-service-title-${title.toLowerCase().replace(/\s/g, "-")}`}>
              {title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-service-description-${title.toLowerCase().replace(/\s/g, "-")}`}>
              {description}
            </p>

            <div className="inline-flex items-center gap-2 text-foreground font-medium group-hover:gap-3 transition-all" data-testid={`button-service-${title.toLowerCase().replace(/\s/g, "-")}`}>
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
      </Link>
    </motion.div>
  );
}
