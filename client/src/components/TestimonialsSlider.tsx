import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "Redline Design transformed our entire digital presence. Within 6 months, we saw a 420% increase in organic traffic and our conversion rate tripled.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Marcus Chen",
    role: "Marketing Director",
    company: "Urban Eats",
    content: "Working with Redline Design has been a game-changer for our restaurant chain. They delivered a comprehensive strategy that increased our online orders by 215%.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Jennifer Rodriguez",
    role: "Founder",
    company: "FitLife Gear",
    content: "Their social media campaigns and retargeting strategies brought our cart abandonment rate down significantly and increased our ROAS to 12.5x. Incredible results!",
    rating: 5,
    initials: "JR",
  },
  {
    name: "David Thompson",
    role: "Managing Partner",
    company: "Precision Legal",
    content: "Our qualified leads increased by 280% and our cost per lead dropped by 60%. Highly recommend!",
    rating: 5,
    initials: "DT",
  },
  {
    name: "Emily Patel",
    role: "VP of Growth",
    company: "CloudSync Pro",
    content: "Their SEO work got us ranking for competitive keywords we thought were impossible. Traffic is up 350% and the quality of leads has never been better.",
    rating: 5,
    initials: "EP",
  },
  {
    name: "Robert Kim",
    role: "Owner",
    company: "Apex Home Services",
    content: "Finally, a marketing agency that delivers what they promise! Our phone has been ringing non-stop. Revenue is up 180% year over year.",
    rating: 5,
    initials: "RK",
  },
];

export default function TestimonialsSlider() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="py-16 overflow-hidden" data-testid="section-testimonials-slider">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            What Our Clients Say
          </h2>
          <p className="text-foreground">Real results from real businesses</p>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 animate-scroll">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-[400px]"
                data-testid={`testimonial-card-${testimonial.name.toLowerCase().replace(/\s/g, "-")}-${index}`}
              >
                <Card className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 h-full red-border-shimmer">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary mb-3" />
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-4">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
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
