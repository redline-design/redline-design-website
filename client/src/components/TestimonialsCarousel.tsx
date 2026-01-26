import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState, useRef, useEffect } from "react";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  profilePhotoUrl: string | null;
}

export default function TestimonialsCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const [currentCard, setCurrentCard] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !reviews || reviews.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('[data-card-width]')?.getAttribute('data-card-width');
      
      if (cardWidth) {
        const width = parseFloat(cardWidth);
        const gap = 4; // gap-1 = 0.25rem = 4px
        const totalWidth = width + gap;
        const index = Math.round(scrollLeft / totalWidth) % reviews.length;
        setCurrentCard(index);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [reviews]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Duplicate reviews to create seamless loop
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="relative overflow-hidden snap-x snap-always scroll-smooth"
        style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
      >
        <motion.div
          className="flex gap-4 pointer-events-none"
          animate={{
            x: prefersReducedMotion ? 0 : [0, -100 * reviews.length],
          }}
          transition={{
            x: {
              duration: prefersReducedMotion ? 0 : reviews.length * 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] snap-start"
              data-card-width="380"
            >
              <TestimonialCard review={review} />
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for fade effect */}
        <div 
          className="absolute top-0 left-0 w-32 h-full pointer-events-none z-10" 
          style={{ background: "linear-gradient(to right, rgba(10,10,10,0.95), transparent)" }}
        />
        <div 
          className="absolute top-0 right-0 w-32 h-full pointer-events-none z-10" 
          style={{ background: "linear-gradient(to left, rgba(10,10,10,0.95), transparent)" }}
        />
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  review: Review;
}

function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <div className="h-full p-1" data-testid={`card-testimonial-${review.id}`}>
      <div 
        className="rounded-xl h-full transition-all duration-300 overflow-hidden relative"
        style={{
          background: "rgba(20, 20, 20, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
        }}
      >
        {/* Top accent line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #ff0000, transparent)" }}
        />
        
        <CardContent className="p-5 relative">
          {/* Quote icon */}
          <div className="absolute top-4 right-4 opacity-10">
            <Quote className="w-10 h-10 text-white" style={{ transform: "rotate(180deg)" }} />
          </div>
          
          {/* Rating Stars - moved to top */}
          <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                style={{
                  color: i < review.rating ? "#fbbf24" : "rgba(255,255,255,0.15)",
                  fill: i < review.rating ? "#fbbf24" : "transparent"
                }}
              />
            ))}
          </div>

          {/* Review Content */}
          <p 
            className="text-white/90 text-sm leading-relaxed mb-5 line-clamp-4" 
            data-testid={`text-review-content-${review.id}`}
          >
            "{review.content}"
          </p>
          
          {/* Divider */}
          <div className="h-px bg-white/10 mb-4" />

          {/* Profile - at bottom */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              {review.profilePhotoUrl ? (
                <img
                  src={review.profilePhotoUrl}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "2px solid rgba(255, 0, 0, 0.3)" }}
                  data-testid={`img-profile-${review.id}`}
                />
              ) : (
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    background: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
                    boxShadow: "0 2px 8px rgba(255, 0, 0, 0.3)"
                  }}
                >
                  <span className="text-sm font-bold text-white">
                    {review.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm text-white truncate" data-testid={`text-reviewer-name-${review.id}`}>
                {review.name}
              </h3>
              <p className="text-xs text-white/50 truncate">
                {review.role}{review.company && ` at ${review.company}`}
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
