import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect, useState, useCallback } from "react";
import { 
  Search, 
  TrendingUp, 
  Share2, 
  Globe, 
  Database, 
  Bot, 
  Workflow, 
  BarChart3, 
  ArrowRight, 
  Check,
  Target,
  Zap,
  ChevronDown,
  Sparkles,
  ArrowDown,
  Rocket,
  Crown,
  Star
} from "lucide-react";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GlowingOrb({ delay, size, x, y, color = "primary" }: { delay: number; size: number; x: string; y: string; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color === "primary" ? "bg-primary/30" : color === "orange" ? "bg-orange-500/20" : "bg-yellow-500/20"} blur-[100px]`}
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -50, 0],
        x: [0, 30, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function AnimatedGradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px]"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(255,100,0,0.15) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)",
          ],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px]"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,150,0,0.1) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(255,0,0,0.1) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(255,150,0,0.1) 0%, transparent 70%)",
          ],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ElementType;
  name: string;
  description: string;
  link: string;
  color: string;
  index: number;
}

function ServiceCard({ icon: Icon, name, description, link, color, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <Link href={link}>
        <motion.div 
          ref={cardRef}
          className="group relative p-6 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 h-full cursor-pointer overflow-hidden"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 50 }}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-15 transition-all duration-500`}
          />
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)"
            }}
          />
          <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-500" />
          
          <div className="relative" style={{ transform: "translateZ(20px)" }}>
            <motion.div 
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-xl`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-7 w-7 text-white" />
            </motion.div>
            
            <h4 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {name}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>
            
            <motion.div
              className="flex items-center gap-2 text-sm font-semibold text-primary"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ x: 5 }}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn More</span>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

interface FunnelStageProps {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  services: {
    icon: React.ElementType;
    name: string;
    description: string;
    link: string;
  }[];
  benefits: string[];
  isLast?: boolean;
  color: string;
}

function FunnelStage({ number, title, subtitle, description, services, benefits, isLast = false, color }: FunnelStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start"
      >
        <div className="lg:w-1/3">
          <div className="sticky top-24">
            <motion.div 
              className="flex items-start gap-5 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} blur-2xl opacity-60`}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-2xl`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <span className="text-3xl font-black text-white">{number}</span>
                </motion.div>
              </div>
              <div className="pt-1">
                <Badge className={`bg-gradient-to-r ${color} text-white border-0 mb-2 shadow-lg`}>
                  {subtitle}
                </Badge>
                <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                  {title}
                </h3>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                >
                  <motion.div 
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0 mt-0.5 shadow-lg`}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Check className="h-3.5 w-3.5 text-white" />
                  </motion.div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <ServiceCard
                key={service.name}
                {...service}
                color={color}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {!isLast && (
        <div className="flex justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <motion.div
                className={`absolute inset-0 w-2 bg-gradient-to-b ${color} blur-md`}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className={`w-2 h-32 bg-gradient-to-b ${color} rounded-full shadow-lg`} />
            </div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-2"
            >
              <ChevronDown className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function HeroStatCard({ value, suffix, label, icon: Icon, delay }: { value: number; suffix: string; label: string; icon: React.ElementType; delay: number }) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.div
            className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="h-5 w-5 text-primary" />
          </motion.div>
          <span className="text-4xl md:text-5xl font-black text-foreground">
            <AnimatedCounter value={value} suffix={suffix} />
          </span>
        </div>
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
      </div>
    </motion.div>
  );
}

export default function MarketingFunnel() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);

  const funnelStages: FunnelStageProps[] = [
    {
      number: 1,
      title: "Attract & Capture",
      subtitle: "Top of Funnel",
      description: "Get your brand in front of the right people at the right time. We drive qualified traffic to your business through proven digital channels.",
      color: "from-red-600 to-red-500",
      services: [
        {
          icon: Search,
          name: "SEO",
          description: "Rank higher in search results and attract organic traffic that converts.",
          link: "/services/seo"
        },
        {
          icon: TrendingUp,
          name: "PPC Advertising",
          description: "Targeted ads on Google and social platforms for immediate visibility.",
          link: "/services/paid-advertising"
        },
        {
          icon: Share2,
          name: "Social Media",
          description: "Build awareness and engage your audience across social platforms.",
          link: "/services/social-media"
        }
      ],
      benefits: [
        "Increase brand visibility by 300%+",
        "Target your ideal customer precisely",
        "Track every dollar spent and its return"
      ]
    },
    {
      number: 2,
      title: "Convert & Engage",
      subtitle: "Your Digital Storefront",
      description: "Turn visitors into leads with a high-converting website. Your website is your 24/7 salesperson—make every visit count.",
      color: "from-red-500 to-orange-500",
      services: [
        {
          icon: Globe,
          name: "Website Design",
          description: "Fast, beautiful websites built to convert visitors into customers.",
          link: "/services/websites"
        }
      ],
      benefits: [
        "Mobile-responsive, fast-loading pages",
        "Conversion-optimized user experience",
        "SEO-ready from day one"
      ]
    },
    {
      number: 3,
      title: "Nurture & Organize",
      subtitle: "Customer Management",
      description: "Never lose track of a lead again. Organize your contacts, automate follow-ups, and build lasting relationships.",
      color: "from-orange-500 to-amber-500",
      services: [
        {
          icon: Database,
          name: "CRM Setup",
          description: "Centralize all your customer data and interactions in one place.",
          link: "/services/crm"
        }
      ],
      benefits: [
        "360° view of every customer",
        "Automated lead scoring & nurturing",
        "Seamless team collaboration"
      ]
    },
    {
      number: 4,
      title: "Automate & Scale",
      subtitle: "Sales Process Optimization",
      description: "Work smarter, not harder. Automate repetitive tasks, integrate AI, and streamline your entire sales process.",
      color: "from-amber-500 to-yellow-500",
      services: [
        {
          icon: Bot,
          name: "AI Integration",
          description: "Custom AI solutions for chat, content, and customer service.",
          link: "/services/ai-automation"
        },
        {
          icon: Workflow,
          name: "Workflow Automation",
          description: "Automate tasks, notifications, and handoffs between systems.",
          link: "/services/ai-automation"
        }
      ],
      benefits: [
        "Save 10+ hours per week on manual tasks",
        "AI-powered customer interactions",
        "Seamless integrations across your stack"
      ]
    },
    {
      number: 5,
      title: "Measure & Optimize",
      subtitle: "Analytics & ROI",
      description: "Know exactly what's working and what's not. Get clear reporting on your marketing ROI and make data-driven decisions.",
      color: "from-yellow-500 to-green-500",
      services: [
        {
          icon: BarChart3,
          name: "Analytics & Reporting",
          description: "Custom dashboards showing your key metrics and ROI.",
          link: "/services/analytics"
        }
      ],
      benefits: [
        "Real-time performance dashboards",
        "Clear ROI on every marketing channel",
        "Monthly insights and recommendations"
      ],
      isLast: true
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedGradientMesh />
        <ParticleField />
        
        <GlowingOrb delay={0} size={500} x="5%" y="15%" color="primary" />
        <GlowingOrb delay={2} size={400} x="75%" y="5%" color="orange" />
        <GlowingOrb delay={4} size={350} x="85%" y="55%" color="primary" />
        <GlowingOrb delay={1} size={450} x="-5%" y="65%" color="orange" />
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        </div>
        
        <motion.div 
          className="max-w-7xl mx-auto relative z-10 py-20"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 mb-10"
                whileHover={{ scale: 1.05 }}
                animate={{ boxShadow: ["0 0 20px rgba(255,0,0,0)", "0 0 40px rgba(255,0,0,0.3)", "0 0 20px rgba(255,0,0,0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </motion.div>
                <span className="text-base font-bold text-primary">Complete Marketing Solution</span>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="h-5 w-5 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-[0.9] tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                The Marketing
              </motion.span>
              <br />
              <motion.span 
                className="relative inline-block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto]" style={{ animation: "gradient 3s linear infinite" }}>
                  Funnel
                </span>
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 blur-3xl -z-10"
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.span>
              <br />
              <motion.span 
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Built for Growth
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              From first impression to loyal customer—we handle every stage of your marketing funnel so you can focus on what you do best.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center justify-center gap-5 mb-16"
            >
              <Link href="/book-a-demo">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Button size="lg" className="relative font-bold text-lg px-10 py-7 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border-0" data-testid="button-funnel-get-started">
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg" className="font-bold text-lg px-10 py-7 border-2" data-testid="button-funnel-view-services">
                    View All Services
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <HeroStatCard value={7} suffix="x" label="Average ROI" icon={TrendingUp} delay={1.0} />
            <HeroStatCard value={1} suffix=" Week" label="Setup Time" icon={Zap} delay={1.1} />
            <HeroStatCard value={1} suffix=" Stop" label="Complete Solution" icon={Target} delay={1.2} />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-muted-foreground/50" />
          </div>
        </motion.div>
      </section>

      <section className="py-32 md:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-testid="section-funnel-stages">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-12 h-[2px] bg-gradient-to-r from-transparent to-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <Badge className="bg-gradient-to-r from-primary to-orange-500 text-white border-0 text-sm px-6 py-2.5 shadow-xl shadow-primary/20">
                The Complete Journey
              </Badge>
              <motion.div
                className="w-12 h-[2px] bg-gradient-to-l from-transparent to-orange-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground mb-8 leading-[0.95]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Every Stage.{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto]" style={{ animation: "gradient 4s linear infinite" }}>
                  Covered.
                </span>
                <motion.span
                  className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-2xl -z-10"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              See how we transform strangers into loyal customers through our{" "}
              <span className="text-foreground font-semibold">proven 5-stage process</span>.
            </motion.p>
            
            <motion.div
              className="flex items-center justify-center gap-3 mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.div
                  key={num}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/20 border border-primary/30 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + num * 0.1 }}
                  whileHover={{ scale: 1.1, borderColor: "rgba(255, 0, 0, 0.6)" }}
                >
                  <span className="text-sm font-bold text-primary">{num}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {funnelStages.map((stage) => (
            <FunnelStage key={stage.number} {...stage} />
          ))}
        </div>
      </section>

      <section className="py-32 md:py-48 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-testid="section-funnel-cta">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{ 
              background: [
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,0,0,0.12) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,100,0,0.12) 0%, transparent 70%)",
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,0,0,0.12) 0%, transparent 70%)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl"
            animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-2xl"
            animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-[5%] w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/15 to-transparent blur-2xl"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-orange-500/20 to-primary/30 blur-3xl rounded-[4rem]"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              
              <div className="relative rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-orange-500/15 to-transparent" />
                <div className="absolute inset-0 bg-card/85 backdrop-blur-3xl" />
                
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 17.32V52.68L30 60L0 52.68V17.32L30 0z' fill='none' stroke='%23ff000010' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: "60px 60px",
                  }}
                />
                
                <div className="absolute inset-[1px] border border-primary/20 rounded-[2.5rem]" />
                
                <div className="relative p-10 md:p-16 lg:p-24 text-center">
                  <motion.div
                    className="flex items-center justify-center gap-4 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 blur-xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div 
                        className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center shadow-2xl"
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        <Crown className="h-8 w-8 text-white" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="w-16 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </motion.div>
                  
                  <motion.h2 
                    className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-6 leading-[1.1]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Ready for a{" "}
                    <span className="relative inline-block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto]" style={{ animation: "gradient 4s linear infinite" }}>
                        Complete Solution?
                      </span>
                    </span>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Stop piecing together different vendors. Get{" "}
                    <span className="text-foreground font-semibold">one team</span> that handles your{" "}
                    <span className="text-foreground font-semibold">entire marketing funnel</span> from start to finish.
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Link href="/book-a-demo">
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -2 }} 
                        whileTap={{ scale: 0.98 }}
                        className="relative group"
                      >
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"
                          animate={{ opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Button size="lg" className="relative font-bold text-base md:text-lg px-8 md:px-14 py-7 md:py-8 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border-0 rounded-xl shadow-2xl" data-testid="button-cta-book-demo">
                          Book a Strategy Call
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/contact">
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -2 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="outline" size="lg" className="font-bold text-base md:text-lg px-8 md:px-14 py-7 md:py-8 border-2 rounded-xl backdrop-blur-sm" data-testid="button-cta-contact">
                          Contact Us
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Free consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>No obligation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Custom strategy</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
