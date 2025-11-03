import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot } from "lucide-react";

export default function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  
  // Services data
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

  // Calculate cards per page based on viewport width
  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerPage(1); // Mobile: 1 card
      } else if (width < 1024) {
        setCardsPerPage(2); // Tablet: 2 cards
      } else {
        setCardsPerPage(3); // Desktop: 3 cards
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  // Clamp currentIndex when cardsPerPage changes to prevent overflow
  useEffect(() => {
    const maxIndex = services.length - cardsPerPage;
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [cardsPerPage, currentIndex, services.length]);

  // Check if we're at the last service
  const isAtLastService = currentIndex + cardsPerPage >= services.length;

  // Handle wheel events when hovering - completely lock page scrolling and advance one card at a time
  useEffect(() => {
    if (!isHovering) return;

    const handleWheel = (e: WheelEvent) => {
      const maxIndex = services.length - cardsPerPage;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // If at last service and scrolling down, allow normal page scroll to continue
      if (currentIndex >= maxIndex && scrollingDown) {
        // Don't prevent default - let the page scroll normally
        return;
      }

      // Otherwise prevent page scrolling and handle card navigation
      e.preventDefault();
      e.stopPropagation();

      // Advance to next card (shift window by 1)
      if (scrollingDown && currentIndex < maxIndex) {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
      }
      
      // Go to previous card (shift window by 1)
      if (scrollingUp && currentIndex > 0) {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const maxIndex = services.length - cardsPerPage;
      // Allow touch scrolling when at the last service
      if (currentIndex >= maxIndex) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    // Only lock scrolling if not at the last service
    if (!isAtLastService) {
      document.body.style.overflow = 'hidden';
    }
    
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHovering, currentIndex, cardsPerPage, services.length, isAtLastService]);

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
            borderColor: isHovering ? "rgba(255, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.1)",
            boxShadow: isHovering 
              ? "0 0 15px rgba(255, 0, 0, 0.15), 0 0 30px rgba(255, 0, 0, 0.08)"
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

          {/* Horizontal cards scrolling right to left, replacing one at a time */}
          <div 
            className="relative h-[300px] md:h-[320px] overflow-hidden"
            data-testid="container-services-carousel"
          >
            <div className="flex justify-center items-center gap-4 md:gap-6 h-full">
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
                        link={service.link}
                        status={service.status}
                        accentColor={service.accentColor}
                        delay={0}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress bar with scroll hint animation */}
          <div className="mt-4 md:mt-8 w-full max-w-3xl mx-auto">
            <div 
              role="progressbar" 
              aria-label="Service scroll progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(((currentIndex + cardsPerPage) / services.length) * 100)}
              className="h-1 bg-border/30 rounded-full overflow-hidden"
              data-testid="progressbar-services"
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + cardsPerPage) / services.length) * 100}%` }}
              />
            </div>
            <div className="flex flex-col items-center gap-3 mt-3">
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
    </section>
  );
}
