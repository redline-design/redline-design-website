import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot, Code, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    details: {
      whatYouGet: [
        "Mobile-responsive design",
        "Fast loading speeds",
        "SEO-optimized structure",
        "Easy content management"
      ],
      timeline: "2-4 weeks",
      investment: "From $1,000"
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
        "Google & Meta Ads campaigns",
        "A/B tested ad creative",
        "Daily optimization",
        "Transparent reporting"
      ],
      timeline: "Results in 1-2 weeks",
      investment: "25% of ad spend"
    }
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO/SEM",
    description: "Get found everywhere, by everyone.",
    tagline: "Show up when customers are searching",
    link: "/services/seo",
    status: "waitlist" as const,
    accentColor: "rgb(110, 231, 183)",
    details: {
      whatYouGet: [
        "Keyword research",
        "On-page optimization",
        "Content strategy",
        "Local SEO & Maps"
      ],
      timeline: "3-6 months",
      investment: "From $700/mo"
    }
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM",
    description: "Streamline your customer relationships.",
    tagline: "Never lose track of a lead again",
    link: "/services/crm",
    status: "accepting" as const,
    accentColor: "rgb(251, 146, 60)",
    details: {
      whatYouGet: [
        "Custom CRM setup",
        "Automated follow-ups",
        "Lead scoring",
        "Team training"
      ],
      timeline: "1-2 weeks",
      investment: "From $500/mo"
    }
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Make data-driven decisions.",
    tagline: "Know exactly what's working",
    link: "/services/analytics",
    status: "accepting" as const,
    accentColor: "rgb(248, 113, 113)",
    details: {
      whatYouGet: [
        "Custom dashboards",
        "Conversion tracking",
        "ROI measurement",
        "Monthly insights"
      ],
      timeline: "1-2 weeks setup",
      investment: "From $300/mo"
    }
  },
  {
    id: "design",
    icon: Palette,
    title: "Design",
    description: "Stand out from the competition.",
    tagline: "Visual identity that converts",
    link: "/services/design",
    status: "accepting" as const,
    accentColor: "rgb(244, 114, 182)",
    details: {
      whatYouGet: [
        "Logo & brand identity",
        "Marketing materials",
        "Social media graphics",
        "Presentation design"
      ],
      timeline: "1-3 weeks",
      investment: "From $500"
    }
  },
  {
    id: "social",
    icon: MessageSquare,
    title: "Social Media",
    description: "Build your community.",
    tagline: "Engage and grow your audience",
    link: "/services/social-media",
    status: "accepting" as const,
    accentColor: "rgb(34, 211, 238)",
    details: {
      whatYouGet: [
        "Content calendar",
        "Daily posting",
        "Community management",
        "Growth strategy"
      ],
      timeline: "Ongoing",
      investment: "From $600/mo"
    }
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Marketing",
    description: "Nurture leads into customers.",
    tagline: "Direct line to your audience",
    link: "/services/email-marketing",
    status: "accepting" as const,
    accentColor: "rgb(163, 230, 53)",
    details: {
      whatYouGet: [
        "Email template design",
        "Automation sequences",
        "List segmentation",
        "A/B testing"
      ],
      timeline: "1-2 weeks setup",
      investment: "From $400/mo"
    }
  },
  {
    id: "consulting",
    icon: Users,
    title: "Consulting",
    description: "Expert marketing guidance.",
    tagline: "Strategy tailored to you",
    link: "/services/consulting",
    status: "accepting" as const,
    accentColor: "rgb(253, 224, 71)",
    details: {
      whatYouGet: [
        "Strategy sessions",
        "Marketing audits",
        "Team training",
        "Ongoing support"
      ],
      timeline: "Flexible",
      investment: "From $150/hr"
    }
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Solutions",
    description: "Leverage cutting-edge AI.",
    tagline: "The future of business is here",
    link: "/services/ai-solutions",
    status: "waitlist" as const,
    accentColor: "rgb(14, 165, 233)",
    details: {
      whatYouGet: [
        "AI chatbots",
        "Content generation",
        "Predictive analytics",
        "Task automation"
      ],
      timeline: "2-4 weeks",
      investment: "From $2,000/mo"
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
}

function ServiceCard({ service, mouseX }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    const center = bounds.x + bounds.width / 2;
    return Math.abs(val - center);
  });

  const widthSync = useTransform(distance, [0, 150], [MAX_WIDTH, BASE_WIDTH]);
  const heightSync = useTransform(distance, [0, 150], [MAX_HEIGHT, BASE_HEIGHT]);

  const width = useSpring(widthSync, { stiffness: 400, damping: 30 });
  const height = useSpring(heightSync, { stiffness: 400, damping: 30 });

  const updateTooltipPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    }
  };

  const handleMouseEnter = () => {
    updateTooltipPosition();
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className="flex-shrink-0 relative"
      data-testid={`card-service-${service.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Details Box - Rendered via Portal */}
      {isHovered && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed w-64 pointer-events-none"
            style={{ 
              zIndex: 99999,
              left: tooltipPosition.x,
              top: tooltipPosition.y - 12,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div 
              className="rounded-xl p-4 relative"
              style={{
                background: "rgba(15, 15, 15, 0.98)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${service.accentColor}40`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px ${service.accentColor}20`
              }}
            >
              {/* Top accent line */}
              <div 
                className="absolute top-0 left-4 right-4 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
              />
              
              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <service.icon className="w-4 h-4" style={{ color: service.accentColor }} />
                <h4 className="font-bold text-white text-sm">{service.title}</h4>
                {service.status === "waitlist" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">Waitlist</span>
                )}
              </div>
              
              {/* Tagline */}
              <p className="text-white/60 text-xs mb-3">{service.tagline}</p>
              
              {/* What You Get */}
              <div className="space-y-1.5 mb-3">
                {service.details.whatYouGet.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                    <span className="text-white/70 text-xs leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              
              {/* Timeline & Investment */}
              <div className="flex gap-3 text-xs border-t border-white/10 pt-3">
                <div>
                  <span className="text-white/40 block">Timeline</span>
                  <span className="text-white/80 font-medium">{service.details.timeline}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Investment</span>
                  <span className="text-white/80 font-medium">{service.details.investment}</span>
                </div>
              </div>
              
              {/* Arrow pointing down */}
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                style={{ 
                  background: "rgba(15, 15, 15, 0.98)",
                  borderRight: `1px solid ${service.accentColor}40`,
                  borderBottom: `1px solid ${service.accentColor}40`
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      <a
        href={service.link}
        className="luminous-card cursor-pointer relative group h-full block"
        style={{
          '--accent-color': service.accentColor
        } as React.CSSProperties}
      >
        {/* Luminous card layers */}
        <div className="luminous-layers">
          <div className="hex-pattern-overlay"></div>
          <div className="light-layers">
            <div className="srl"></div>
            <div className="srt"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="card-content py-0 px-2 w-full h-full flex flex-col items-center justify-center relative z-10">
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
                style={{ color: '#1a1a1a' }} 
                data-testid={`icon-service-${service.id}`} 
              />
            </div>
          </div>
        </div>
        
        {/* Title bubble on hover */}
        <div className="service-title-bubble" data-testid={`text-service-title-${service.id}`}>
          <span className="text-xs font-bold tracking-tight whitespace-nowrap uppercase">
            {service.title}
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function HorizontalScrollServices() {
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
      className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-visible"
      data-testid="section-services-horizontal"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto overflow-visible">
        {/* Desktop Title */}
        <div className="hidden md:block text-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            <TextResolver text="What We Do" delay={0} timeout={15} iterations={2} />
          </h2>
          <p className="text-lg text-foreground">
            <TextResolver text="Comprehensive digital marketing solutions to grow your business" delay={200} timeout={10} iterations={1} />
          </p>
        </div>

        {/* Mobile Carousel Layout */}
        <div 
          className="md:hidden relative rounded-2xl px-3 py-6 mt-8"
          style={{
            background: 'rgba(15, 15, 15, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          {/* Title on mobile */}
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              <TextResolver text="What We Do" delay={0} timeout={15} iterations={2} />
            </h2>
            <p className="text-lg text-foreground">
              <TextResolver text="Comprehensive digital marketing solutions to grow your business" delay={200} timeout={10} iterations={1} />
            </p>
          </div>

          <div>
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
                  <a
                    key={service.id}
                    href={service.link}
                    className="cursor-pointer flex-1"
                    data-testid={`card-service-${service.id}`}
                  >
                    <div
                      className="luminous-card relative group h-full aspect-square"
                      style={{
                        '--accent-color': service.accentColor,
                        minHeight: '90px',
                        maxHeight: '90px'
                      } as React.CSSProperties}
                    >
                      <div className="luminous-layers">
                        <div className="hex-pattern-overlay"></div>
                        <div className="light-layers">
                          <div className="srl"></div>
                          <div className="srt"></div>
                        </div>
                      </div>
                      
                      <div className="card-content py-2 px-1 w-full h-full flex flex-col items-center justify-center gap-1 relative z-10">
                        <div className="icon-3d-container transition-all duration-400 flex-shrink-0">
                          <div 
                            className="icon-circle-filled"
                            style={{
                              '--icon-color': service.accentColor,
                              backgroundColor: service.accentColor,
                              width: '2rem',
                              height: '2rem'
                            } as React.CSSProperties}
                          >
                            <service.icon 
                              className="icon-cutout h-4 w-4" 
                              style={{ color: '#1a1a1a' }} 
                              data-testid={`icon-service-${service.id}`} 
                            />
                          </div>
                        </div>
                        <div className="text-center w-full">
                          <span className="text-[8px] font-bold tracking-tighter uppercase block leading-tight">
                            {service.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
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

        {/* Desktop Dock-Style Layout */}
        <div className="hidden md:flex justify-center overflow-visible">
          <div 
            className="relative inline-flex items-end justify-center gap-2 px-6 py-2 rounded-2xl"
            style={{
              background: 'rgba(15, 15, 15, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              transform: 'translateZ(0)',
              willChange: 'transform',
              overflow: 'visible'
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
