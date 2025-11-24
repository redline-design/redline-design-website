import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
          className="flex gap-1 pointer-events-none"
          animate={{
            x: prefersReducedMotion ? 0 : [0, -100 * reviews.length],
          }}
          transition={{
            x: {
              duration: prefersReducedMotion ? 0 : reviews.length * 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-[90vw] sm:w-[380px] md:w-[450px] snap-start"
              data-card-width="380"
            >
              <TestimonialCard review={review} />
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-card/20 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-card/20 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  review: Review;
}

function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <div className="h-full" data-testid={`card-testimonial-${review.id}`}>
      <div 
        className="rounded-xl h-full transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%)",
          boxShadow: `
            8px 8px 16px rgba(0, 0, 0, 0.9),
            -4px -4px 8px rgba(255, 255, 255, 0.02),
            inset 1px 1px 2px rgba(255, 255, 255, 0.05),
            inset -1px -1px 2px rgba(0, 0, 0, 0.2)
          `,
        }}
      >
        <CardContent className="p-6">
          {/* Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              {review.profilePhotoUrl ? (
                <img
                  src={review.profilePhotoUrl}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  data-testid={`img-profile-${review.id}`}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-xl font-bold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground" data-testid={`text-reviewer-name-${review.id}`}>
                {review.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {review.role} {review.company && `at ${review.company}`}
              </p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Review Content */}
          <p className="text-foreground text-sm leading-relaxed italic line-clamp-4" data-testid={`text-review-content-${review.id}`}>
            "{review.content}"
          </p>
        </CardContent>
      </div>
    </div>
  );
}
