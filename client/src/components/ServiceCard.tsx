import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        className="h-full hover-elevate active-elevate-2 transition-all duration-300 rounded-2xl group cursor-pointer backdrop-blur-md bg-card/40 border-white/10 card-float"
        data-testid={`card-service-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <CardContent className="p-8">
          {status && (
            <Badge 
              variant={status === "accepting" ? "default" : "secondary"} 
              className="mb-4 uppercase text-xs badge-pulse inline-flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "accepting" ? "bg-green-400" : "bg-yellow-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${status === "accepting" ? "bg-green-500" : "bg-yellow-500"}`}></span>
              </span>
              {status === "accepting" ? "Now Accepting New Clients" : "Waiting List"}
            </Badge>
          )}
          <h3 className="text-2xl font-bold text-foreground mb-3" data-testid={`text-service-title-${title.toLowerCase().replace(/\s/g, "-")}`}>
            {title}
          </h3>
          <p className="text-muted-foreground mb-6" data-testid={`text-service-description-${title.toLowerCase().replace(/\s/g, "-")}`}>
            {description}
          </p>
          <Link href={link}>
            <Button variant="ghost" className="px-0 hover:bg-transparent" data-testid={`button-service-${title.toLowerCase().replace(/\s/g, "-")}`}>
              Get Started →
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
