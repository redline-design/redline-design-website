import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import type { PortfolioItem } from "@shared/schema";

function PortfolioCard({ item, delay = 0 }: { item: PortfolioItem; delay?: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleClick = () => {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      data-testid={`portfolio-card-${item.id}`}
    >
      <Card 
        className="rounded-2xl overflow-hidden backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl hover-elevate cursor-pointer group"
        onClick={handleClick}
      >
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <img
              src={item.screenshotUrl || '/placeholder-portfolio.png'}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-testid={`portfolio-image-${item.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors" data-testid={`portfolio-title-${item.id}`}>
                {item.title}
              </h3>
              <Badge variant="secondary" className="shrink-0" data-testid={`portfolio-category-${item.id}`}>
                {item.category}
              </Badge>
            </div>
            
            {item.description && (
              <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`portfolio-description-${item.id}`}>
                {item.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PortfolioSkeleton() {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-video w-full" />
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function OurWork() {
  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-portfolio-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-primary">Portfolio</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our recent work and see how we've helped businesses create stunning digital experiences that drive results.
          </motion.p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-portfolio-grid">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <PortfolioSkeleton key={i} />
              ))}
            </div>
          ) : portfolioItems.length === 0 ? (
            <div className="text-center py-20" data-testid="portfolio-empty-state">
              <p className="text-lg text-muted-foreground">No portfolio items to display yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
