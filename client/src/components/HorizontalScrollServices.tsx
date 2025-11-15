import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot, ChevronDown, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Services data moved outside component to prevent re-creation on every render
const SERVICES_DATA = [
  {
    id: "web",
    icon: Globe,
    title: "World Class Websites",
    description: "Unique websites at reasonable prices.",
    tagline: "Your digital storefront that works 24/7",
    link: "/services/websites",
    status: "accepting" as const,
    accentColor: "rgb(96, 165, 250)",
    details: {
      whatYouGet: [
        "Mobile-responsive design that looks great on any device",
        "Fast loading speeds (under 3 seconds)",
        "SEO-optimized structure from day one",
        "Easy-to-update content management system",
        "Secure hosting and SSL certificate available"
      ],
      perfectFor: "Businesses that need a professional online presence without breaking the bank",
      timeline: "2-4 weeks",
      investment: "Starting at $1,000"
    }
  },
  {
    id: "ppc",
    icon: TrendingUp,
    title: "Paid Advertising",
    description: "Focusing on maximum ROI.",
    tagline: "Get customers today, not months from now",
    link: "/services/paid-advertising",
    status: "accepting" as const,
    accentColor: "rgb(167, 139, 250)",
    details: {
      whatYouGet: [
        "Google Ads campaigns targeting your ideal customers",
        "Facebook & Instagram ads that actually convert",
        "A/B tested ad copy and creative",
        "Daily monitoring and optimization",
        "Transparent reporting on every dollar spent"
      ],
      perfectFor: "Businesses ready to invest in immediate, measurable growth",
      timeline: "See results in 1-2 weeks",
      investment: "10-20% of ad spend (min $500/month)"
    }
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO/SEM",
    description: "Get found everywhere, by everyone.",
    tagline: "Show up when customers are searching for you",
    link: "/services/seo",
    status: "waitlist" as const,
    accentColor: "rgb(110, 231, 183)",
    details: {
      whatYouGet: [
        "Keyword research to find what your customers search",
        "On-page optimization for better rankings",
        "Content strategy that attracts organic traffic",
        "Local SEO for Google Maps visibility",
        "Monthly reports showing your progress"
      ],
      perfectFor: "Businesses committed to long-term sustainable growth",
      timeline: "3-6 months to see significant results",
      investment: "Starting at $1,500/month"
    }
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM Setup & Automation",
    description: "Streamline your customer relationships and automate workflows.",
    tagline: "Never lose track of a lead again",
    link: "/services/crm",
    status: "accepting" as const,
    accentColor: "rgb(251, 146, 60)",
    details: {
      whatYouGet: [
        "Custom CRM setup tailored to your business",
        "Automated follow-up sequences",
        "Lead scoring and qualification",
        "Integration with your existing tools",
        "Team training and ongoing support"
      ],
      perfectFor: "Businesses drowning in spreadsheets and missed opportunities",
      timeline: "1-2 weeks setup, ongoing optimization",
      investment: "Starting at $1,200 one-time + $300/month"
    }
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & Data Analysis",
    description: "Track everything. Understand your customers. Make data-driven decisions.",
    tagline: "Know exactly what's working (and what's not)",
    link: "/services/analytics",
    status: "accepting" as const,
    accentColor: "rgb(236, 72, 153)",
    details: {
      whatYouGet: [
        "Google Analytics 4 setup and configuration",
        "Custom dashboards showing your key metrics",
        "Conversion tracking for all your goals",
        "Monthly insights reports in plain English",
        "Data-driven recommendations"
      ],
      perfectFor: "Businesses tired of guessing what drives results",
      timeline: "1 week setup, ongoing monthly reports",
      investment: "Starting at $800 one-time + $400/month"
    }
  },
  {
    id: "design",
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching visuals that convert.",
    tagline: "Stand out in a sea of boring brands",
    link: "/services/design",
    status: "accepting" as const,
    accentColor: "rgb(249, 115, 22)",
    details: {
      whatYouGet: [
        "Custom logo and brand identity",
        "Social media graphics that stop the scroll",
        "Email templates that get opened",
        "Ad creatives optimized for conversions",
        "Unlimited revisions until you love it"
      ],
      perfectFor: "Businesses that know first impressions matter",
      timeline: "1-3 weeks depending on scope",
      investment: "Starting at $500 per project"
    }
  },
  {
    id: "social",
    icon: MessageSquare,
    title: "Social Media Marketing",
    description: "Build your brand and engage your audience.",
    tagline: "Turn followers into customers",
    link: "/services/social-media",
    status: "accepting" as const,
    accentColor: "rgb(59, 130, 246)",
    details: {
      whatYouGet: [
        "Content calendar with engaging posts",
        "Professional copywriting and graphics",
        "Community management and engagement",
        "Paid social advertising campaigns",
        "Monthly performance analytics"
      ],
      perfectFor: "Businesses looking to build brand awareness and community",
      timeline: "Ongoing monthly retainer",
      investment: "Starting at $1,200/month"
    }
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Marketing",
    description: "Nurture leads and drive conversions with targeted campaigns.",
    tagline: "Build relationships that convert",
    link: "/services/email-marketing",
    status: "accepting" as const,
    accentColor: "rgb(34, 197, 94)",
    details: {
      whatYouGet: [
        "Automated welcome and nurture sequences",
        "Monthly newsletter campaigns",
        "Segmentation and personalization",
        "A/B testing for optimization",
        "List growth strategies"
      ],
      perfectFor: "Businesses with an audience ready to be nurtured",
      timeline: "1 week setup, ongoing campaigns",
      investment: "Starting at $800/month"
    }
  },
  {
    id: "consulting",
    icon: Users,
    title: "Consulting",
    description: "Strategic guidance to grow your business.",
    tagline: "Expert advice without the agency price tag",
    link: "/services/consulting",
    status: "accepting" as const,
    accentColor: "rgb(168, 85, 247)",
    details: {
      whatYouGet: [
        "Strategic marketing planning sessions",
        "Channel and budget recommendations",
        "Competitive analysis and positioning",
        "Growth roadmap and implementation plan",
        "Ongoing advisory support"
      ],
      perfectFor: "Business owners who want expert guidance, not full service",
      timeline: "Flexible engagement",
      investment: "Starting at $200/hour"
    }
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Automation",
    description: "Automate tasks and workflows with cutting-edge AI.",
    tagline: "Work smarter with AI-powered automation",
    link: "/services/ai-automation",
    status: "accepting" as const,
    accentColor: "rgb(234, 88, 12)",
    details: {
      whatYouGet: [
        "Custom AI chatbots for customer service",
        "Automated content generation workflows",
        "Data analysis and reporting automation",
        "Integration with existing tools",
        "Training and ongoing optimization"
      ],
      perfectFor: "Forward-thinking businesses ready to leverage AI",
      timeline: "2-4 weeks implementation",
      investment: "Starting at $2,000 one-time + $300/month"
    }
  }
] as const;

export default function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[number] | null>(null);

  // Memoize services data to prevent re-creation
  const services = useMemo(() => SERVICES_DATA, []);
  const servicesLength = useMemo(() => services.length, [services]);

  // Calculate cards per page based on viewport width
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const updateCardsPerPage = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) {
          setCardsPerPage(1); // Mobile: 1 card
        } else if (width < 1024) {
          setCardsPerPage(2); // Tablet: 2 cards
        } else {
          setCardsPerPage(3); // Desktop: 3 cards
        }
      }, 100); // Debounce resize
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  // Clamp currentIndex when cardsPerPage changes to prevent overflow
  useEffect(() => {
    const maxIndex = servicesLength - cardsPerPage;
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [cardsPerPage, currentIndex, servicesLength]);

  // Check if we're at the last service
  const isAtLastService = useMemo(
    () => currentIndex + cardsPerPage >= servicesLength,
    [currentIndex, cardsPerPage, servicesLength]
  );

  // Handle wheel events on container with RAF throttling - no document.body manipulation
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isHovering) return;

    let rafId: number | null = null;
    let accumulatedDelta = 0;
    const DELTA_THRESHOLD = 50; // Minimum delta to trigger change - optimized for performance

    const handleWheel = (e: WheelEvent) => {
      const maxIndex = servicesLength - cardsPerPage;
      
      // If at last service and scrolling down, allow normal page scroll
      if (currentIndex >= maxIndex && e.deltaY > 0) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      accumulatedDelta += e.deltaY;

      // Use RAF to throttle updates
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (Math.abs(accumulatedDelta) >= DELTA_THRESHOLD) {
            const scrollingDown = accumulatedDelta > 0;
            const scrollingUp = accumulatedDelta < 0;

            if (scrollingDown && currentIndex < maxIndex) {
              setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
            } else if (scrollingUp && currentIndex > 0) {
              setCurrentIndex(prev => Math.max(prev - 1, 0));
            }

            accumulatedDelta = 0;
          }
          rafId = null;
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering, currentIndex, cardsPerPage, servicesLength]);

  return (
    <section 
      ref={targetRef} 
      className="relative h-[120vh] md:h-[150vh]"
      data-testid="section-services-horizontal"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-4 md:px-8 pointer-events-none">
        {/* Left scroll indicator */}
        <motion.div
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          data-testid="indicator-scroll-left"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown 
              className="w-8 h-8 md:w-10 md:h-10 text-primary" 
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))"
              }}
            />
          </motion.div>
          <motion.p
            className="text-xs md:text-sm text-primary font-medium vertical-text"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              filter: "drop-shadow(0 0 4px rgba(255, 0, 0, 0.4))"
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll Down
          </motion.p>
        </motion.div>

        {/* Right scroll indicator */}
        <motion.div
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          data-testid="indicator-scroll-right"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            <ChevronDown 
              className="w-8 h-8 md:w-10 md:h-10 text-primary" 
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))"
              }}
            />
          </motion.div>
          <motion.p
            className="text-xs md:text-sm text-primary font-medium vertical-text"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              filter: "drop-shadow(0 0 4px rgba(255, 0, 0, 0.4))"
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            Scroll Down
          </motion.p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 w-full backdrop-blur-md bg-card/40 border-2 rounded-3xl py-4 md:py-5 transition-all duration-300 relative z-50 pointer-events-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={{
            borderColor: isHovering ? "rgba(255, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.1)",
            boxShadow: isHovering 
              ? "0 0 15px rgba(255, 0, 0, 0.15), 0 0 30px rgba(255, 0, 0, 0.08)"
              : "0 0 0 rgba(255, 0, 0, 0)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.3em] mb-2 red-glow-pulse" style={{ color: "#ff0000" }}>
              What We Do
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground max-w-2xl mx-auto">
              Full-service digital marketing designed to drive results
            </p>
          </div>

          {/* Horizontal cards scrolling right to left, replacing one at a time */}
          <div 
            className="relative h-[320px] md:h-[340px] overflow-visible py-2"
            data-testid="container-services-carousel"
          >
            <div className="flex justify-center items-center gap-4 md:gap-6 h-full px-2">
              <AnimatePresence mode="popLayout">
                {services
                  .slice(currentIndex, currentIndex + cardsPerPage)
                  .map((service, index) => (
                    <motion.div
                      key={service.title}
                      className="flex-shrink-0 w-[280px] h-[280px] md:w-[320px] md:h-[280px]"
                      data-testid={`container-service-card-${service.title.toLowerCase().replace(/\s/g, "-")}`}
                      initial={{ 
                        opacity: 0, 
                        x: 100,
                        scale: 0.8,
                        rotateY: -20
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: 1,
                        rotateY: 0,
                        zIndex: index
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -100,
                        scale: 0.8,
                        rotateY: 20
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px"
                      }}
                    >
                      <ServiceCard
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        status={service.status}
                        accentColor={service.accentColor}
                        delay={0}
                        onClick={() => setSelectedService(service)}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress bar with scroll hint animation */}
          <div className="mt-3 md:mt-4 w-full max-w-3xl mx-auto">
            <div 
              role="progressbar" 
              aria-label="Service scroll progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(((currentIndex + cardsPerPage) / servicesLength) * 100)}
              className="h-1 bg-border/30 rounded-full overflow-hidden"
              data-testid="progressbar-services"
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + cardsPerPage) / servicesLength) * 100}%` }}
              />
            </div>
            <div className="flex flex-col items-center gap-2 mt-2">
              <AnimatePresence mode="wait">
                {isAtLastService ? (
                  // Show "scroll outside" message when at last service
                  <motion.div
                    key="scroll-outside"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.p 
                      className="text-center text-xs sm:text-sm text-primary font-medium"
                      data-testid="text-services-scroll-outside"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Scroll outside the box to continue
                    </motion.p>
                    <div className="flex flex-col items-center gap-1 h-12">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-2 rounded-full bg-primary/30 border border-primary/50"
                          animate={{
                            y: [-5, 15],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  // Show normal scroll hint
                  <motion.div
                    key="scroll-inside"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.p 
                      className="text-center text-xs sm:text-sm text-muted-foreground"
                      data-testid="text-services-scroll-hint"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Scroll to explore all services
                    </motion.p>
                    <div className="flex items-center gap-1 overflow-hidden w-20 h-8">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-6 rounded bg-primary/20 border border-primary/40 flex-shrink-0"
                          animate={{
                            x: [20, -40],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => { if (!open) setSelectedService(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-service-details">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${selectedService.accentColor}20`,
                      color: selectedService.accentColor
                    }}
                  >
                    <selectedService.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <DialogTitle className="text-xl font-bold text-foreground" data-testid={`text-dialog-title-${selectedService.id}`}>
                        {selectedService.title}
                      </DialogTitle>
                      {selectedService.status === "waitlist" && (
                        <Badge variant="secondary" className="text-xs">
                          Waitlist
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {selectedService.tagline}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* What You Get */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-base">
                    What You Get:
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.details.whatYouGet.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: selectedService.accentColor }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perfect For */}
                <div className="bg-card/50 rounded-lg p-4 border border-border/30">
                  <h4 className="font-semibold text-foreground mb-2 text-base">
                    Perfect For:
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedService.details.perfectFor}
                  </p>
                </div>

                {/* Timeline & Investment */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/30 rounded-lg p-4 border border-border/20">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      Timeline:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedService.details.timeline}
                    </p>
                  </div>
                  <div className="bg-card/30 rounded-lg p-4 border border-border/20">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      Investment:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedService.details.investment}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button
                    asChild
                    size="default"
                    className="w-full"
                    data-testid={`button-book-${selectedService.id}`}
                  >
                    <a href="#contact">
                      {selectedService.status === "waitlist" ? "Join Waitlist" : "Book Free Consultation"}
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
