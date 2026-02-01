import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { PortfolioItem } from "@shared/schema";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

function PortfolioCard({ item, index }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={item.url || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`portfolio-card-${item.id}`}
      style={{
        background: "rgba(20, 20, 20, 0.9)",
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }}
    >
      {/* Screenshot */}
      <div className="aspect-[16/10] overflow-hidden relative">
        {item.screenshotUrl ? (
          <motion.img
            src={item.screenshotUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            data-testid={`portfolio-image-${item.id}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-white/30 text-sm">No preview</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <motion.div 
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.url && (
            <div className="flex items-center gap-2 text-white font-medium">
              <span>Visit Site</span>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          )}
        </motion.div>

        {/* Logo overlay */}
        {item.logoUrl && (
          <div className="absolute top-3 left-3 bg-white/95 rounded-lg p-2 shadow-lg">
            <img
              src={item.logoUrl}
              alt={`${item.title} logo`}
              className="h-6 w-auto object-contain"
            />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className="text-xs bg-black/60 text-white border-0 backdrop-blur-sm"
          >
            {item.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 
            className="font-semibold text-white text-base leading-tight line-clamp-1 group-hover:text-red-400 transition-colors"
            data-testid={`portfolio-title-${item.id}`}
          >
            {item.title}
          </h3>
          {item.url && (
            <ExternalLink className="w-4 h-4 text-white/40 flex-shrink-0 group-hover:text-red-400 transition-colors" />
          )}
        </div>
        {item.description && (
          <p className="text-white/50 text-sm mt-1.5 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Bottom accent line on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "linear-gradient(90deg, transparent, #ff0000, transparent)" }}
      />
    </motion.a>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-xl overflow-hidden" style={{ background: "rgba(20, 20, 20, 0.9)" }}>
          <Skeleton className="aspect-[16/10] w-full" />
          <div className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OurWork() {
  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(portfolioItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-red-500">Work</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real results for real businesses. Explore our portfolio of successful projects.
          </p>
        </motion.div>

        {/* Category Filter */}
        {portfolioItems.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
                data-testid={`filter-${category}`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        {isLoading ? (
          <PortfolioSkeleton />
        ) : portfolioItems.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid="portfolio-empty-state"
          >
            <p className="text-lg text-white/50">No portfolio items to display yet.</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
            data-testid="section-portfolio-grid"
          >
            {filteredItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Stats Section */}
        {portfolioItems.length > 0 && (
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div 
              className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl"
              style={{
                background: "rgba(20, 20, 20, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{portfolioItems.length}+</div>
                <div className="text-white/50 text-sm">Projects</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{categories.length - 1}</div>
                <div className="text-white/50 text-sm">Industries</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">100%</div>
                <div className="text-white/50 text-sm">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
