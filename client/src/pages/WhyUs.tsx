import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";
import CTABand from "@/components/CTABand";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Target, 
  Users, 
  Briefcase, 
  Award, 
  Shield, 
  Lightbulb,
  Check,
  ArrowRight,
  Star,
  Clock,
  BarChart3,
  Rocket,
  Heart,
  MessageSquare
} from "lucide-react";

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const STATS = [
  { value: 14, suffix: "x", label: "Average ROI", icon: TrendingUp },
  { value: 500, prefix: "$", suffix: "", label: "Starting Monthly", icon: DollarSign },
  { value: 24, suffix: "hr", label: "Avg Response Time", icon: Clock },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Heart },
];

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Results-Obsessed",
    description: "We don't chase vanity metrics. Every strategy is built around driving real revenue and measurable business growth.",
    highlight: "14x average ROI"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Most updates delivered in under 24 business hours. We move at startup speed with enterprise quality.",
    highlight: "<24hr turnaround"
  },
  {
    icon: Shield,
    title: "Full Transparency",
    description: "No black boxes or hidden fees. You see exactly what we're doing, why we're doing it, and what results we're getting.",
    highlight: "Real-time reporting"
  },
  {
    icon: Users,
    title: "Dedicated Partnership",
    description: "You're not a ticket number. Get direct access to your dedicated team who knows your business inside and out.",
    highlight: "1-on-1 attention"
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discovery", description: "Deep dive into your business, goals, and competition" },
  { step: "02", title: "Strategy", description: "Custom roadmap designed for your specific objectives" },
  { step: "03", title: "Execute", description: "Launch campaigns with precision and speed" },
  { step: "04", title: "Optimize", description: "Continuous improvement based on real data" },
];

const CAPABILITIES = [
  "SEO & Content Strategy",
  "Paid Advertising (Google, Meta, LinkedIn)",
  "Website Design & Development",
  "Social Media Management",
  "Email Marketing Automation",
  "CRM Implementation",
  "Analytics & Reporting",
  "Brand Identity Design",
  "Conversion Rate Optimization",
  "Marketing Automation"
];

export default function WhyUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  useEffect(() => {
    if (reviews.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length, isHovered]);

  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        data-testid="section-why-us-hero"
      >
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 0, 0, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255, 0, 0, 0.08), transparent)
            `
          }}
        />
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
              style={{
                background: "rgba(255, 0, 0, 0.1)",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                color: "#ff0000"
              }}
            >
              Why Choose Redline
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">We Don't Just </span>
              <span className="red-glow-pulse" style={{ color: "#ff0000" }}>Market</span>
              <br />
              <span className="text-foreground">We </span>
              <span className="red-glow-pulse" style={{ color: "#ff0000" }}>Accelerate Growth</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Partner with an agency that's as invested in your success as you are. 
              Data-driven strategies, transparent reporting, and results that speak for themselves.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-base px-8" data-testid="button-get-started">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-background/90 border-white/20">
                  <DialogHeader>
                    <DialogTitle>Let's Discuss Your Goals</DialogTitle>
                    <DialogDescription>
                      Plans start at $500/mo. Fill out the form below and we'll create a custom proposal for your business.
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="/our-work" data-testid="link-view-work">View Our Work</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10" data-testid="section-stats">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{
                    background: "rgba(255, 0, 0, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.2)"
                  }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: "#ff0000" }} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    prefix={stat.prefix} 
                    duration={1.5}
                  />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-testid="section-differentiators">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              What Sets Us Apart
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're not your typical agency. Here's what makes Redline different.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="group relative h-full p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: "rgba(20, 20, 20, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255, 0, 0, 0.05), transparent 70%)"
                    }}
                  />
                  
                  <div className="relative flex gap-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.05))",
                        border: "1px solid rgba(255, 0, 0, 0.25)"
                      }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: "#ff0000" }} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: "rgba(255, 0, 0, 0.1)",
                            color: "#ff0000"
                          }}
                        >
                          {item.highlight}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section 
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "rgba(255, 0, 0, 0.02)" }}
        data-testid="section-process"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven framework that delivers consistent results
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-red-500/30 to-transparent" />
                )}
                
                <div className="text-center">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 font-bold text-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.05))",
                      border: "1px solid rgba(255, 0, 0, 0.3)",
                      color: "#ff0000"
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-testid="section-capabilities">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
                Full-Service Capabilities
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Everything you need to dominate your digital presence, all under one roof.
              </p>
              <p className="text-muted-foreground mb-8">
                No more juggling multiple vendors or agencies. We handle the complete 
                digital marketing stack so you can focus on running your business.
              </p>
              <Button size="lg" asChild>
                <a href="/services" data-testid="link-explore-services">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="p-8 rounded-2xl"
                style={{
                  background: "rgba(20, 20, 20, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CAPABILITIES.map((capability, index) => (
                    <motion.div
                      key={capability}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div 
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255, 0, 0, 0.2)" }}
                      >
                        <Check className="w-3 h-3" style={{ color: "#ff0000" }} />
                      </div>
                      <span className="text-sm text-foreground">{capability}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {reviews.length > 0 && (
        <section 
          className="py-24 px-4 sm:px-6 lg:px-8"
          style={{ background: "rgba(255, 0, 0, 0.02)" }}
          data-testid="section-testimonial"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
                What Our Clients Say
              </h2>
            </motion.div>

            <div 
              className="relative p-8 md:p-12 rounded-3xl"
              style={{
                background: "rgba(20, 20, 20, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Quote decoration */}
              <div 
                className="absolute top-6 left-8 text-6xl font-serif opacity-20"
                style={{ color: "#ff0000" }}
              >
                "
              </div>
              
              {currentReview && (
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-current" 
                        style={{ color: "#fbbf24" }} 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-foreground text-center mb-8 leading-relaxed">
                    "{currentReview.content}"
                  </blockquote>
                  
                  <div className="flex flex-col items-center">
                    {currentReview.profilePhotoUrl && (
                      <img 
                        src={currentReview.profilePhotoUrl} 
                        alt={currentReview.name}
                        className="w-14 h-14 rounded-full mb-3 object-cover"
                        style={{ border: "2px solid rgba(255, 0, 0, 0.3)" }}
                      />
                    )}
                    <div className="font-bold text-foreground">{currentReview.name}</div>
                    {(currentReview.role || currentReview.company) && (
                      <div className="text-sm text-muted-foreground">
                        {currentReview.role && currentReview.company 
                          ? `${currentReview.role}, ${currentReview.company}`
                          : currentReview.role || currentReview.company}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Pagination dots */}
              {reviews.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentReviewIndex ? 'w-6 bg-red-500' : 'bg-white/20'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                      data-testid={`dot-review-${index}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-testid="section-final-cta">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-12 rounded-3xl text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.05))",
              border: "1px solid rgba(255, 0, 0, 0.25)"
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "#ff0000" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: "#ff0000" }} />
            
            <div className="relative">
              <Rocket className="w-12 h-12 mx-auto mb-6" style={{ color: "#ff0000" }} />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Accelerate Your Growth?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join the businesses that have transformed their digital presence with Redline. 
                Let's build something remarkable together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-base px-8" data-testid="button-book-consultation">
                      Book Free Consultation <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-background/90 border-white/20">
                    <DialogHeader>
                      <DialogTitle>Let's Talk Growth</DialogTitle>
                      <DialogDescription>
                        Tell us about your business and goals. We'll create a custom strategy just for you.
                      </DialogDescription>
                    </DialogHeader>
                    <ContactForm />
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="text-base px-8" asChild>
                  <a href="/book-a-demo" data-testid="link-schedule-call">Schedule a Call</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
