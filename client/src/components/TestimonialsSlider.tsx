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
    name: "Pete Gallego",
    role: "Business Owner",
    company: "Google Review",
    content: "I met Ryan through a very good friend, and we were searching for someone or a company to generate leads for us. At the time I met Ryan, we were only getting about two leads a week. Once Ryan got involved and started designing our ads, everything changed. We've launched record-breaking months and even opened new stores!",
    rating: 5,
    initials: "PG",
  },
  {
    name: "Mason Small",
    role: "Business Owner",
    company: "Google Review",
    content: "This is an amazing option to grow your business. Ryan has been nothing but helpful in walking me through all the steps and making my dreams come true. He's made an amazing platform to track every step of your business's growth and overcoming issues to continue growing.",
    rating: 5,
    initials: "MS",
  },
  {
    name: "Emily Check",
    role: "Store Owner",
    company: "Google Review",
    content: "I'm a complete ditz when it comes to marketing and advertising and trying to get people to actually VISIT my website. I was pretty lost and frustrated but these guys helped get traffic to my store that beyond surpassed my expectations! They made digital marketing clear, effective, and profitable.",
    rating: 5,
    initials: "EC",
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
