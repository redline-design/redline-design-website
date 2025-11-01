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
          {/* Animated border glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 blur-xl" />
          </div>

          <CardContent className="p-8 relative z-10">
            <motion.div
              className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="h-7 w-7" />
            </motion.div>

            {status && (
              <Badge 
                variant={status === "accepting" ? "default" : "secondary"} 
                className="mb-5 uppercase text-xs inline-flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "accepting" ? "bg-green-400" : "bg-yellow-400"}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${status === "accepting" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                </span>
                {status === "accepting" ? "Now Accepting Clients" : "Waiting List"}
              </Badge>
            )}

            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors" data-testid={`text-service-title-${title.toLowerCase().replace(/\s/g, "-")}`}>
              {title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-service-description-${title.toLowerCase().replace(/\s/g, "-")}`}>
              {description}
            </p>

            <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all" data-testid={`button-service-${title.toLowerCase().replace(/\s/g, "-")}`}>
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
