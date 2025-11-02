import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot } from "lucide-react";

export default function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Handle wheel events when hovering - completely lock page scrolling and advance through services
  useEffect(() => {
    if (!isHovering) return;

    const handleWheel = (e: WheelEvent) => {
      // Completely prevent all page scrolling
      e.preventDefault();
      e.stopPropagation();

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Advance to next service (one at a time)
      if (scrollingDown && currentServiceIndex < services.length - 1) {
        setCurrentServiceIndex(prev => Math.min(prev + 1, services.length - 1));
      }
      
      // Go to previous service (one at a time)
      if (scrollingUp && currentServiceIndex > 0) {
        setCurrentServiceIndex(prev => Math.max(prev - 1, 0));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Lock all forms of scrolling
    document.body.style.overflow = 'hidden';
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHovering, currentServiceIndex]);

  const services = [
    {
      icon: Globe,
      title: "World Class Websites",
      description: "Unique websites at reasonable prices.",
      link: "/services#web",
      status: "accepting" as const,
      accentColor: "rgb(96, 165, 250)"
    },
    {
      icon: TrendingUp,
      title: "Paid Advertising",
      description: "Focusing on maximum ROI.",
      link: "/services#ppc",
      status: "accepting" as const,
      accentColor: "rgb(167, 139, 250)"
    },
    {
      icon: Search,
      title: "SEO/SEM",
      description: "Get found everywhere, by everyone.",
      link: "/services#seo",
      status: "waitlist" as const,
      accentColor: "rgb(110, 231, 183)"
    },
    {
      icon: Database,
      title: "CRM Setup & Automation",
      description: "Streamline your customer relationships and automate workflows.",
      link: "/services#crm",
      status: "accepting" as const,
      accentColor: "rgb(251, 146, 60)"
    },
    {
      icon: BarChart3,
      title: "Analytics & Data Analysis",
      description: "Track everything. Understand your customers. Make data-driven decisions.",
      link: "/services#analytics",
      status: "accepting" as const,
      accentColor: "rgb(236, 72, 153)"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Eye-catching visuals that convert.",
      link: "/services#design",
      status: "accepting" as const,
      accentColor: "rgb(249, 115, 22)"
    },
    {
      icon: MessageSquare,
      title: "Social Media Marketing",
      description: "Build your brand and engage your audience.",
      link: "/services#social",
      status: "accepting" as const,
      accentColor: "rgb(59, 130, 246)"
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Nurture leads and drive conversions with targeted campaigns.",
      link: "/services#email",
      status: "accepting" as const,
      accentColor: "rgb(34, 197, 94)"
    },
    {
      icon: Users,
      title: "Consulting",
      description: "Strategic guidance to grow your business.",
      link: "/services#consulting",
      status: "accepting" as const,
      accentColor: "rgb(168, 85, 247)"
    },
    {
      icon: Bot,
      title: "AI Automation",
      description: "Automate tasks and workflows with cutting-edge AI.",
      link: "/services#ai",
      status: "accepting" as const,
      accentColor: "rgb(234, 88, 12)"
    }
  ];

  return (
    <section 
      ref={targetRef} 
      className="relative h-[120vh] md:h-[150vh]"
      data-testid="section-services-horizontal"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-4 md:px-8 pointer-events-none">
        <motion.div 
          ref={containerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full backdrop-blur-md bg-card/40 border-2 rounded-3xl py-8 md:py-12 transition-all duration-300 relative z-50 pointer-events-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={{
            borderColor: isHovering ? "rgba(255, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.1)",
            boxShadow: isHovering 
              ? "0 0 20px rgba(255, 0, 0, 0.4), 0 0 40px rgba(255, 0, 0, 0.2), 0 0 60px rgba(255, 0, 0, 0.1)"
              : "0 0 0 rgba(255, 0, 0, 0)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.3em] mb-2 md:mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              What We Do
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground max-w-2xl mx-auto">
              Full-service digital marketing designed to drive results
            </p>
          </div>

          {/* Single service card with layering animation */}
          <div 
            className="relative h-[300px] md:h-[320px] overflow-hidden"
            data-testid="container-services-carousel"
          >
            <div className="flex justify-center items-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentServiceIndex}
                  className="flex-shrink-0 w-[280px] h-[280px] md:w-[320px] md:h-[280px]"
                  data-testid={`container-service-card-${services[currentServiceIndex].title.toLowerCase().replace(/\s/g, "-")}`}
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
                    rotateY: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: -100,
                    scale: 0.8,
                    rotateY: 20
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <ServiceCard
                    icon={services[currentServiceIndex].icon}
                    title={services[currentServiceIndex].title}
                    description={services[currentServiceIndex].description}
                    link={services[currentServiceIndex].link}
                    status={services[currentServiceIndex].status}
                    accentColor={services[currentServiceIndex].accentColor}
                    delay={0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scroll suggestion with animation */}
          <div className="mt-4 md:mt-8 flex flex-col items-center gap-2">
            <motion.p 
              className="text-center text-xs sm:text-sm text-muted-foreground"
              data-testid="text-services-scroll-hint"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll to explore all services
            </motion.p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
