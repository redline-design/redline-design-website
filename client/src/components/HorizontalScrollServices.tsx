import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot } from "lucide-react";

export default function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
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

  // Clamp currentPage when cardsPerPage changes to prevent empty carousel
  useEffect(() => {
    const totalPages = Math.ceil(services.length / cardsPerPage);
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [cardsPerPage, currentPage]);

  // Update progress value for accessibility - properly handles cleanup
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const percent = Math.round(latest * 100);
    setProgressPercent(percent);
    
    // Calculate which page we should be on (snap points)
    const totalPages = Math.ceil(services.length / cardsPerPage);
    const newPage = Math.min(Math.floor((percent / 100) * totalPages), totalPages - 1);
    
    // Only update if page actually changed to avoid redundant renders
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  });

  // Strict scroll locking - completely prevent all scrolling when hovering
  useEffect(() => {
    if (!isHovering) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Completely lock the page from scrolling
    document.body.style.overflow = 'hidden';
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('scroll', preventScroll);
    };
  }, [isHovering]);

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
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-4 md:px-8">
        <motion.div 
          ref={containerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full backdrop-blur-md bg-card/40 border-2 rounded-3xl py-8 md:py-12 transition-all duration-300"
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

          {/* Snapping horizontal cards with layering animation */}
          <div 
            className="relative h-[300px] md:h-[320px] overflow-hidden"
            data-testid="container-services-carousel"
          >
            <div className="flex justify-center items-center gap-4 md:gap-6 h-full">
              <AnimatePresence mode="popLayout">
                {services
                  .slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage)
                  .map((service, index) => (
                    <motion.div
                      key={`${currentPage}-${service.title}`}
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

          {/* Progress bar */}
          <div className="mt-4 md:mt-8 w-full max-w-3xl mx-auto">
            <div 
              role="progressbar" 
              aria-label="Service scroll progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              className="h-1 bg-border/30 rounded-full overflow-hidden"
              data-testid="progressbar-services"
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentPage + 1) / Math.ceil(services.length / cardsPerPage) * 100}%` }}
              />
            </div>
            <p 
              className="text-center text-xs sm:text-sm text-muted-foreground mt-2 md:mt-3"
              data-testid="text-services-progress"
              aria-live="polite"
            >
              Scroll to explore all services ({currentPage + 1}/{Math.ceil(services.length / cardsPerPage)})
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
