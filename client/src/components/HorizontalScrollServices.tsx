import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot } from "lucide-react";

export default function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Calculate how far to translate based on scroll
  // Increased translation for much faster scrolling (was -85%, now -110%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Update progress value for accessibility - properly handles cleanup
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressPercent(Math.round(latest * 100));
  });

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
      className="relative h-[150vh] md:h-[200vh]"
      data-testid="section-services-horizontal"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.3em] mb-2 md:mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              What We Do
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground max-w-2xl mx-auto px-4">
              Full-service digital marketing designed to drive results
            </p>
          </div>

          {/* Horizontal scrolling container */}
          <motion.div 
            style={{ x }}
            className="flex gap-4 md:gap-8 pb-4 md:pb-8"
          >
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="flex-shrink-0 w-[85vw] h-[240px] sm:w-[300px] sm:h-[260px] md:w-[320px] md:h-[280px]"
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
              </div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="mt-4 md:mt-8 w-full max-w-3xl mx-auto px-4">
            <div 
              role="progressbar" 
              aria-label="Service scroll progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              className="h-1 bg-border/30 rounded-full overflow-hidden"
            >
              <motion.div 
                style={{ width: progressWidth }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 md:mt-3">
              Scroll to explore all services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
