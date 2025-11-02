import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { Star, Quote } from "lucide-react";
import StatCounter from "@/components/StatCounter";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  delay?: number;
}

function Testimonial({ name, role, company, content, rating, initials, delay = 0 }: TestimonialProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      data-testid={`testimonial-${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      <Card className="rounded-2xl overflow-hidden backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl hover-elevate h-full">
        <CardContent className="p-8">
          <div className="mb-6">
            <Quote className="h-10 w-10 text-primary mb-4" />
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              "{content}"
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-border/50">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-foreground">{name}</div>
              <div className="text-sm text-muted-foreground">{role}, {company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "Redline Design transformed our entire digital presence. Within 6 months, we saw a 420% increase in organic traffic and our conversion rate tripled. Their data-driven approach and transparent communication made all the difference.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Marcus Chen",
    role: "Marketing Director",
    company: "Urban Eats",
    content: "Working with Redline Design has been a game-changer for our restaurant chain. They understood our unique challenges and delivered a comprehensive strategy that increased our online orders by 215%. Best ROI we've ever seen.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Jennifer Rodriguez",
    role: "Founder",
    company: "FitLife Gear",
    content: "I was skeptical about digital marketing until I partnered with Redline Design. Their social media campaigns and retargeting strategies brought our cart abandonment rate down significantly and increased our ROAS to 12.5x. Incredible results!",
    rating: 5,
    initials: "JR",
  },
  {
    name: "David Thompson",
    role: "Managing Partner",
    company: "Precision Legal",
    content: "As a law firm, we needed a partner who understood both digital marketing and our industry. Redline Design delivered beyond expectations - our qualified leads increased by 280% and our cost per lead dropped by 60%. Highly recommend!",
    rating: 5,
    initials: "DT",
  },
  {
    name: "Emily Patel",
    role: "VP of Growth",
    company: "CloudSync Pro",
    content: "The team at Redline Design doesn't just execute - they strategize. Their SEO work got us ranking for competitive keywords we thought were impossible. Traffic is up 350% and the quality of leads has never been better.",
    rating: 5,
    initials: "EP",
  },
  {
    name: "Robert Kim",
    role: "Owner",
    company: "Apex Home Services",
    content: "Finally, a marketing agency that delivers what they promise! Our phone has been ringing non-stop since implementing their local SEO and PPC strategies. Revenue is up 180% year over year. Worth every penny!",
    rating: 5,
    initials: "RK",
  },
];

export default function Testimonials() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-testimonials-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Clients <span className="text-primary">Love What We Do</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't just take our word for it - hear from the businesses we've helped grow.
          </motion.p>
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] red-glow-pulse"
            style={{ color: "#ff0000" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Client Success Stories
          </motion.h2>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50" data-testid="section-metrics">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={98} suffix="%" label="Client Satisfaction" />
            <StatCounter value={14} suffix="x" label="Average ROI" delay={0.1} />
            <StatCounter value={500} suffix="+" label="Success Stories" delay={0.2} />
            <StatCounter value={95} suffix="%" label="Client Retention" delay={0.3} />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-testimonials-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={testimonial.name}
                {...testimonial}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-cta">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-lg text-foreground mb-8">
              Join hundreds of satisfied clients who have transformed their digital presence.
            </p>
            <Link href="/book-a-demo">
              <Button size="lg" className="text-base px-8 py-6 font-semibold" data-testid="button-cta-book-demo">
                Start Your Success Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
