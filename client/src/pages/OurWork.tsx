import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import type { PortfolioItem } from "@shared/schema";
import { useState } from "react";

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="carousel-item"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`portfolio-card-${item.id}`}
    >
      <div 
        className="carousel-box cursor-pointer"
        onClick={handleClick}
      >
        <div className="carousel-title" data-testid={`portfolio-title-${item.id}`}>
          {item.title}
        </div>
        <div className="carousel-num">{String(index + 1).padStart(2, '0')}</div>
        <div className="carousel-category" data-testid={`portfolio-category-${item.id}`}>
          {item.category}
        </div>
        <img
          src={item.screenshotUrl || '/placeholder-portfolio.png'}
          alt={item.title}
          className="carousel-img"
          data-testid={`portfolio-image-${item.id}`}
        />
        <div className={`carousel-overlay ${isHovered ? 'active' : ''}`}>
          <div className="carousel-icon">
            <ExternalLink className="h-6 w-6" />
          </div>
          {item.description && (
            <p className="carousel-description" data-testid={`portfolio-description-${item.id}`}>
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioSkeleton({ index }: { index: number }) {
  return (
    <div className="carousel-item">
      <div className="carousel-box">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-12 w-12 mb-2" />
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

export default function OurWork() {
  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <div className="pt-20 portfolio-page">
      <section className="py-12 text-center" data-testid="section-portfolio-intro">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-6 red-glow-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: "#ff0000" }}
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our recent work and see how we've helped businesses create stunning digital experiences that drive results.
          </motion.p>
        </div>
      </section>

      <section className="py-12" data-testid="section-portfolio-carousel">
        {isLoading ? (
          <div className="carousel">
            {[...Array(6)].map((_, i) => (
              <PortfolioSkeleton key={i} index={i} />
            ))}
          </div>
        ) : portfolioItems.length === 0 ? (
          <div className="text-center py-20 px-4" data-testid="portfolio-empty-state">
            <p className="text-lg text-muted-foreground">No portfolio items to display yet.</p>
          </div>
        ) : (
          <div className="carousel">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      <div className="layout">
        <div className="layout-text">
          High-end, full-service<br />digital marketing<br />for growing brands.
        </div>
      </div>
    </div>
  );
}
