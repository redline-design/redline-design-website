import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  profilePhotoUrl: string | null;
}

interface StarBurst {
  id: number;
  x: number;
  y: number;
}

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [starBursts, setStarBursts] = useState<StarBurst[]>([]);
  const burstCounter = useRef(0);
  const burstTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    
    // Clear any existing timeout
    if (burstTimeoutRef.current) {
      clearTimeout(burstTimeoutRef.current);
    }
    
    // Only trigger star burst animation if reduced motion is not preferred
    if (!prefersReducedMotion) {
      const newBursts: StarBurst[] = [];
      for (let i = 0; i < 5; i++) {
        newBursts.push({
          id: burstCounter.current++,
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
        });
      }
      setStarBursts(newBursts);
      
      // Clear bursts after animation
      burstTimeoutRef.current = setTimeout(() => setStarBursts([]), 1000);
    }
  }, [emblaApi, prefersReducedMotion]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      // Clear timeout on cleanup
      if (burstTimeoutRef.current) {
        clearTimeout(burstTimeoutRef.current);
      }
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
          What Our Clients Say
        </h2>
        <p className="text-lg text-foreground">Real Results. Real Reviews.</p>
      </div>

      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, index) => (
            <div key={review.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_90%] md:flex-[0_0_80%] lg:flex-[0_0_70%] px-4">
              <TestimonialCard
                review={review}
                isActive={index === selectedIndex}
                starBursts={index === selectedIndex ? starBursts : []}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          size="icon"
          variant="outline"
          onClick={scrollPrev}
          className="rounded-full hover:bg-primary/10 hover:border-primary"
          data-testid="button-carousel-prev"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={scrollNext}
          className="rounded-full hover:bg-primary/10 hover:border-primary"
          data-testid="button-carousel-next"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
            data-testid={`button-carousel-dot-${index}`}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  review: Review;
  isActive: boolean;
  starBursts: StarBurst[];
  prefersReducedMotion: boolean;
}

function TestimonialCard({ review, isActive, starBursts, prefersReducedMotion }: TestimonialCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip mouse tracking if reduced motion is preferred
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Disable 3D tilt effects when reduced motion is preferred
  const rotateX = isHovered && !prefersReducedMotion ? mousePosition.y * -10 : 0;
  const rotateY = isHovered && !prefersReducedMotion ? mousePosition.x * 10 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1 : 0.9,
        rotateX,
        rotateY,
      }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
      style={{ 
        transformStyle: prefersReducedMotion ? "flat" : "preserve-3d",
        perspective: prefersReducedMotion ? undefined : 1000,
      }}
      className="relative"
      data-testid={`card-testimonial-${review.id}`}
    >
      <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-white/10 overflow-hidden">
        <CardContent className="p-8 md:p-12 relative">
          {/* Star Burst Particles */}
          <AnimatePresence>
            {starBursts.map((burst) => (
              <motion.div
                key={burst.id}
                initial={{ 
                  opacity: 1, 
                  scale: 0,
                  x: "50%",
                  y: "0%",
                }}
                animate={{ 
                  opacity: 0, 
                  scale: [0, 1.5, 0],
                  x: `calc(50% + ${burst.x}px)`,
                  y: `calc(0% + ${burst.y}px)`,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 left-0 pointer-events-none z-20"
              >
                <Star className="h-4 w-4 text-primary fill-primary" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Profile with Parallax */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              style={{
                transform: isHovered && !prefersReducedMotion
                  ? `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 5}px, 20px)`
                  : "translate3d(0px, 0px, 0px)",
              }}
              transition={{ 
                type: prefersReducedMotion ? "tween" : "spring", 
                stiffness: 150, 
                damping: 15,
                duration: prefersReducedMotion ? 0.2 : undefined
              }}
              className="relative"
            >
              {review.profilePhotoUrl ? (
                <img
                  src={review.profilePhotoUrl}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  data-testid={`img-profile-${review.id}`}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-2xl font-bold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-foreground" data-testid={`text-reviewer-name-${review.id}`}>
                {review.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {review.role} {review.company && `at ${review.company}`}
              </p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Review Content */}
          <p className="text-foreground text-lg leading-relaxed italic" data-testid={`text-review-content-${review.id}`}>
            "{review.content}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
