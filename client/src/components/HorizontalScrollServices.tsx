import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot, Code, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TextResolver from "@/components/TextResolver";

// Services data
const SERVICES_DATA = [
  {
    id: "web",
    icon: Globe,
    title: "Websites",
    description: "Unique websites at reasonable prices.",
    tagline: "Your digital storefront that works 24/7",
    link: "/services/websites",
    status: "accepting" as const,
    accentColor: "rgb(96, 165, 250)",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
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
      investment: "25% of ad spend (min $500/month)"
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
    imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=300&fit=crop",
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
      investment: "Starting at $700/month"
    }
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM",
    description: "Streamline your customer relationships and automate workflows.",
    tagline: "Never lose track of a lead again",
    link: "/services/crm",
    status: "accepting" as const,
    accentColor: "rgb(251, 146, 60)",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
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
      investment: "Starting at $1,000 one-time + $100/month per user added"
    }
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Track everything. Understand your customers. Make data-driven decisions.",
    tagline: "Know exactly what's working (and what's not)",
    link: "/services/analytics",
    status: "accepting" as const,
    accentColor: "rgb(236, 72, 153)",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
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
      investment: "Included with all marketing plans"
    }
  },
  {
    id: "design",
    icon: Palette,
    title: "Creative",
    description: "Eye-catching designs that convert visitors into customers.",
    tagline: "Make your brand impossible to ignore",
    link: "/services/design",
    status: "accepting" as const,
    accentColor: "rgb(245, 158, 11)",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    details: {
      whatYouGet: [
        "Logo design and brand identity",
        "Social media graphics and templates",
        "Ad creatives for all platforms",
        "Email newsletter designs",
        "Unlimited revisions until you're satisfied"
      ],
      perfectFor: "Businesses that want to stand out from the competition",
      timeline: "1-2 weeks per project",
      investment: "Starting at $200 per design"
    }
  },
  {
    id: "social",
    icon: MessageSquare,
    title: "Social Media",
    description: "Build genuine connections with your audience on social platforms.",
    tagline: "Turn followers into customers",
    link: "/services/social-media",
    status: "accepting" as const,
    accentColor: "rgb(52, 211, 153)",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    details: {
      whatYouGet: [
        "Content calendar with 30 posts per month",
        "Engaging captions and hashtag research",
        "Community management and response handling",
        "Monthly performance analytics",
        "Platform-specific strategy (Instagram, Facebook, LinkedIn)"
      ],
      perfectFor: "Businesses ready to build a loyal community online",
      timeline: "Ongoing monthly service",
      investment: "Starting at $750/month"
    }
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Marketing",
    description: "Build relationships that convert with targeted email campaigns.",
    tagline: "Your customers' inbox is still the best ROI channel",
    link: "/services/email-marketing",
    status: "accepting" as const,
    accentColor: "rgb(239, 68, 68)",
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop",
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
      investment: "Starting at $1,000/month"
    }
  },
  {
    id: "reputation",
    icon: Users,
    title: "Reputation",
    description: "Manage and enhance your online reputation across all platforms.",
    tagline: "Your reputation is your most valuable asset",
    link: "/services/reputation-management",
    status: "waitlist" as const,
    accentColor: "rgb(139, 92, 246)",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    details: {
      whatYouGet: [
        "Review monitoring across all platforms",
        "Response templates and management",
        "Strategy to generate more positive reviews",
        "Crisis management for negative feedback",
        "Monthly reputation score reports"
      ],
      perfectFor: "Businesses where reviews directly impact revenue",
      timeline: "Ongoing monthly service",
      investment: "Starting at $500/month"
    }
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Solutions",
    description: "Leverage cutting-edge AI to automate and optimize your business.",
    tagline: "The future of business is here",
    link: "/services/ai-solutions",
    status: "waitlist" as const,
    accentColor: "rgb(14, 165, 233)",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    details: {
      whatYouGet: [
        "AI chatbots for customer service",
        "Content generation systems",
        "Predictive analytics and forecasting",
        "Automation of repetitive tasks",
        "Custom AI integrations"
      ],
      perfectFor: "Forward-thinking businesses ready to scale efficiently",
      timeline: "2-4 weeks setup, ongoing optimization",
      investment: "Starting at $2,000/month"
    }
  }
];

const BASE_WIDTH = 100;
const BASE_HEIGHT = 100;
const MAX_WIDTH = 150;
const MAX_HEIGHT = 150;

interface ServiceCardProps {
  service: typeof SERVICES_DATA[number];
  mouseX: any;
  onSelect: (service: typeof SERVICES_DATA[number]) => void;
}

function ServiceCard({ service, mouseX, onSelect }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    const center = bounds.x + bounds.width / 2;
    return Math.abs(val - center);
  });

  const widthSync = useTransform(distance, [0, 150], [MAX_WIDTH, BASE_WIDTH]);
  const heightSync = useTransform(distance, [0, 150], [MAX_HEIGHT, BASE_HEIGHT]);

  const width = useSpring(widthSync, { stiffness: 400, damping: 30 });
  const height = useSpring(heightSync, { stiffness: 400, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className="flex-shrink-0"
      data-testid={`card-service-${service.id}`}
    >
      <div
        className="luminous-card cursor-pointer relative group h-full"
        onClick={() => onSelect(service)}
        style={{
          '--accent-color': service.accentColor
        } as React.CSSProperties}
      >
        {/* Luminous card layers */}
        <div className="luminous-layers">
          {/* Hexagon Pattern Overlay */}
          <div className="hex-pattern-overlay"></div>
          
          {/* Light layers */}
          <div className="light-layers">
            <div className="srl"></div>
            <div className="srt"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="card-content py-0 px-2 w-full h-full flex flex-col items-center justify-center relative z-10">
          {/* 3D Icon with filled circle and cutout */}
          <div className="icon-3d-container transition-all duration-400">
            <div 
              className="icon-circle-filled"
              style={{
                '--icon-color': service.accentColor,
                backgroundColor: service.accentColor,
                width: '4.5rem',
                height: '4.5rem'
              } as React.CSSProperties}
            >
              <service.icon 
                className="icon-cutout h-8 w-8" 
                style={{ 
                  color: '#1a1a1a'
                }} 
                data-testid={`icon-service-${service.id}`} 
              />
            </div>
          </div>
        </div>
        
        {/* Title as chat bubble above card - hidden by default, shown on hover */}
        <div className="service-title-bubble" data-testid={`text-service-title-${service.id}`}>
          <span className="text-xs font-bold tracking-tight whitespace-nowrap uppercase">
            {service.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HorizontalScrollServices() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[number] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Infinity);
  
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(SERVICES_DATA.length / ITEMS_PER_PAGE);
  
  const getCurrentPageServices = () => {
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return SERVICES_DATA.slice(start, end);
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
    };

    const handleMouseLeave = () => {
      mouseX.set(Infinity);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [mouseX]);

  return (
    <section 
      className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative"
      data-testid="section-services-horizontal"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            <TextResolver text="What We Do" delay={0} timeout={15} iterations={2} />
          </h2>
          <p className="text-lg text-foreground">
            <TextResolver text="Comprehensive digital marketing solutions to grow your business" delay={200} timeout={10} iterations={1} />
          </p>
        </div>

        {/* Mobile Carousel Layout (hidden on md+) */}
        <div className="md:hidden relative">
          <div 
            className="rounded-2xl px-3 py-4"
            style={{
              background: 'rgba(15, 15, 15, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row items-center justify-center gap-1 w-full"
              >
                {getCurrentPageServices().map((service) => (
                  <div
                    key={service.id}
                    className="cursor-pointer flex-1"
                    onClick={() => setSelectedService(service)}
                    data-testid={`card-service-${service.id}`}
                  >
                    <div
                      className="luminous-card relative group h-full"
                      style={{
                        '--accent-color': service.accentColor,
                        minHeight: '60px',
                        maxHeight: '60px'
                      } as React.CSSProperties}
                    >
                      <div className="luminous-layers">
                        <div className="hex-pattern-overlay"></div>
                        <div className="light-layers">
                          <div className="srl"></div>
                          <div className="srt"></div>
                        </div>
                      </div>
                      
                      <div className="card-content py-1 px-0.5 w-full h-full flex flex-col items-center justify-center gap-0.5 relative z-10">
                        <div className="icon-3d-container transition-all duration-400 flex-shrink-0">
                          <div 
                            className="icon-circle-filled"
                            style={{
                              '--icon-color': service.accentColor,
                              backgroundColor: service.accentColor,
                              width: '1.25rem',
                              height: '1.25rem'
                            } as React.CSSProperties}
                          >
                            <service.icon 
                              className="icon-cutout h-2.5 w-2.5" 
                              style={{ color: '#1a1a1a' }} 
                              data-testid={`icon-service-${service.id}`} 
                            />
                          </div>
                        </div>
                        <div className="text-center w-full">
                          <span className="text-[7px] font-bold tracking-tighter uppercase block leading-tight">
                            {service.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows and Dots */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={handlePrevPage}
              className="w-10 h-10 rounded-lg border-2 border-white/30 flex items-center justify-center transition-all"
              style={{
                background: "rgba(15, 15, 15, 0.8)",
                color: "#fff"
              }}
              aria-label="Previous page"
              data-testid="button-services-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Page Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`transition-all ${idx === currentPage ? 'w-6 h-2 bg-red-600' : 'w-2 h-2 bg-white/30'} rounded-full`}
                  aria-label={`Go to page ${idx + 1}`}
                  data-testid={`dot-services-${idx}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              className="w-10 h-10 rounded-lg border-2 border-white/30 flex items-center justify-center transition-all"
              style={{
                background: "rgba(15, 15, 15, 0.8)",
                color: "#fff"
              }}
              aria-label="Next page"
              data-testid="button-services-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Dock-Style Layout (hidden on mobile, shown on md+) */}
        <div className="hidden md:flex justify-center">
          <div 
            className="relative inline-flex items-end justify-center gap-2 px-6 py-2 rounded-2xl overflow-visible"
            style={{
              background: 'rgba(15, 15, 15, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            <div 
              ref={containerRef}
              className="relative flex items-end justify-center gap-4 overflow-visible" 
              data-testid="container-service-cards"
              style={{ height: BASE_HEIGHT + 10 }}
            >
              {SERVICES_DATA.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  mouseX={mouseX}
                  onSelect={setSelectedService}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => { if (!open) setSelectedService(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-service-details">
          {selectedService && (
            <div 
              className="absolute inset-0 -z-10 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedService.accentColor}08 0%, transparent 50%, ${selectedService.accentColor}05 100%)`
              }}
            />
          )}
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="icon-circle-filled"
                      style={{
                        '--icon-color': selectedService.accentColor,
                        backgroundColor: selectedService.accentColor
                      } as React.CSSProperties}
                    >
                      <selectedService.icon 
                        className="icon-cutout h-5 w-5" 
                        style={{ 
                          color: '#1a1a1a'
                        }} 
                      />
                    </div>
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

              <div className="space-y-6 mt-4 relative">
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
                    <a href="/contact">
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
