import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";
import TextResolver from "@/components/TextResolver";

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function TestimonialsSlider() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  if (isLoading) {
    return (
      <div ref={ref} className="py-16 overflow-hidden" data-testid="section-testimonials-slider">
        <div className="text-center mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            What Our Clients Say
          </h2>
          <p className="text-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="py-16 overflow-hidden" data-testid="section-testimonials-slider">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            <TextResolver text="What Our Clients Say" delay={0} timeout={15} iterations={2} />
          </h2>
          <p className="text-foreground">
            <TextResolver text="Real results from real businesses" delay={200} timeout={10} iterations={1} />
          </p>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 animate-scroll">
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[400px]"
                data-testid={`testimonial-card-${review.name.toLowerCase().replace(/\s/g, "-")}-${index}`}
              >
                <Card className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 h-full red-border-shimmer">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary mb-3" />
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-4">
                      "{review.content}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                      <Avatar className="h-10 w-10">
                        {review.profilePhotoUrl && (
                          <AvatarImage 
                            src={review.profilePhotoUrl} 
                            alt={review.name}
                          />
                        )}
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                          {getInitials(review.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{review.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {review.role}{review.company ? `, ${review.company}` : ""}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
