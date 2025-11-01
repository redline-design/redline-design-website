import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

export default function ServiceCard({ icon: Icon, title, description, link, delay = 0 }: ServiceCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        className="h-full hover-elevate active-elevate-2 transition-all duration-300 rounded-2xl group cursor-pointer"
        data-testid={`card-service-${title.toLowerCase().replace(/\s/g, "-")}`}
      >
        <CardContent className="p-8">
          <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" data-testid={`icon-service-${title.toLowerCase().replace(/\s/g, "-")}`} />
          </div>
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
