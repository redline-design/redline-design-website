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

function GrowthEngineVisualization() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  
  const stages = [
    { 
      icon: Search,
      label: "ATTRACT", 
      description: "SEO, PPC, Social",
      color: "from-red-600 to-red-500",
      glowColor: "rgba(239, 68, 68, 0.6)"
    },
    { 
      icon: Globe,
      label: "CONVERT", 
      description: "Your Website",
      color: "from-orange-500 to-amber-500",
      glowColor: "rgba(249, 115, 22, 0.6)"
    },
    { 
      icon: Database,
      label: "NURTURE", 
      description: "CRM & Email",
      color: "from-amber-500 to-yellow-500",
      glowColor: "rgba(245, 158, 11, 0.6)"
    },
    { 
      icon: Bot,
      label: "AUTOMATE", 
      description: "AI & Workflows",
      color: "from-yellow-500 to-lime-500",
      glowColor: "rgba(234, 179, 8, 0.6)"
    },
    { 
      icon: BarChart3,
      label: "OPTIMIZE", 
      description: "Analytics & ROI",
      color: "from-lime-500 to-green-500",
      glowColor: "rgba(132, 204, 22, 0.6)"
    },
  ];

  const containerSize = 380;
  const nodeSize = 80;
  const radius = 145;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div 
        className="relative"
        style={{ width: containerSize, height: containerSize }}
      >
        <svg 
          className="absolute inset-0" 
          width={containerSize} 
          height={containerSize} 
          viewBox={`0 0 ${containerSize} ${containerSize}`}
        >
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <motion.circle
            cx={containerSize / 2}
            cy={containerSize / 2}
            r={radius + 25}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
          
          {stages.map((_, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const outerX = containerSize / 2 + Math.cos(angle) * (radius - 10);
            const outerY = containerSize / 2 + Math.sin(angle) * (radius - 10);
            const innerX = containerSize / 2 + Math.cos(angle) * 55;
            const innerY = containerSize / 2 + Math.sin(angle) * 55;
            
            return (
              <motion.line
                key={`line-${index}`}
                x1={outerX}
                y1={outerY}
                x2={innerX}
                y2={innerY}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="text-muted-foreground/30"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              />
            );
          })}
        </svg>
        
        {stages.map((stage, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180);
          const x = containerSize / 2 + Math.cos(angle) * radius - nodeSize / 2;
          const y = containerSize / 2 + Math.sin(angle) * radius - nodeSize / 2;
          
          return (
            <motion.div
              key={stage.label}
              className="absolute"
              style={{ left: x, top: y, width: nodeSize, height: nodeSize }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setActiveStage(index)}
              onMouseLeave={() => setActiveStage(null)}
            >
              <motion.div
                className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${stage.color} flex flex-col items-center justify-center cursor-pointer`}
                whileHover={{ scale: 1.12 }}
                animate={{
                  boxShadow: activeStage === index 
                    ? `0 0 40px ${stage.glowColor}, 0 8px 32px rgba(0,0,0,0.3)` 
                    : `0 8px 24px rgba(0,0,0,0.25)`
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent" />
                <stage.icon className="h-7 w-7 text-white mb-1 relative z-10 drop-shadow-md" />
                <span className="text-[10px] font-bold text-white relative z-10 drop-shadow-sm">{stage.label}</span>
              </motion.div>
              
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                style={{ top: nodeSize + 8 }}
                animate={{ 
                  opacity: activeStage === index ? 1 : 0,
                  y: activeStage === index ? 0 : -5
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs font-medium text-foreground bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50 shadow-lg">
                  {stage.description}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
        
        <motion.div
          className="absolute"
          style={{ 
            left: containerSize / 2 - 48, 
            top: containerSize / 2 - 48,
            width: 96,
            height: 96
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-[-10px] rounded-full bg-gradient-conic from-red-500 via-yellow-500 via-green-500 to-red-500 blur-xl opacity-40" 
              style={{ background: "conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #84cc16, #22c55e, #84cc16, #eab308, #f97316, #ef4444)" }}
            />
          </motion.div>
          <motion.div
            className="relative w-full h-full rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 flex flex-col items-center justify-center shadow-2xl border-2 border-white/20"
            animate={{ 
              boxShadow: [
                "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)",
                "0 0 50px rgba(34, 197, 94, 0.6), 0 0 80px rgba(34, 197, 94, 0.3)",
                "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Crown className="h-9 w-9 text-white drop-shadow-lg" />
            <span className="text-[9px] font-black text-white tracking-wider mt-0.5">REVENUE</span>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.p 
        className="text-sm text-muted-foreground mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <span className="text-primary font-medium">Hover</span> each stage to explore
      </motion.p>
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
      
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" data-testid="section-growth-engine">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Growth Engine</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Five integrated services working together to drive revenue
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-8 bg-gradient-to-br from-primary/15 via-orange-500/10 to-green-500/10 blur-3xl rounded-full"
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <div className="relative bg-card/70 backdrop-blur-2xl rounded-[2rem] border border-border/50 p-10 md:p-16 shadow-2xl">
                <GrowthEngineVisualization />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative" data-testid="section-funnel-stages">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Badge className="bg-gradient-to-r from-primary to-orange-500 text-white border-0 text-sm px-6 py-2 shadow-lg">
                The Complete Journey
              </Badge>
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6">
              Every Stage.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Covered.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how we transform strangers into loyal customers through our proven 5-stage process.
            </p>
          </motion.div>
          
          {funnelStages.map((stage) => (
            <FunnelStage key={stage.number} {...stage} />
          ))}
        </div>
      </section>

      <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-testid="section-funnel-cta">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{ 
              background: [
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,0,0,0.15) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,100,0,0.15) 0%, transparent 70%)",
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,0,0,0.15) 0%, transparent 70%)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative rounded-[3rem] overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/40 via-orange-500/20 to-transparent"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="absolute inset-0 bg-card/80 backdrop-blur-3xl" />
              <div className="absolute inset-0 border-2 border-primary/30 rounded-[3rem]" />
              
              <div className="relative p-12 md:p-20 text-center">
                <motion.div 
                  className="relative w-24 h-24 mx-auto mb-10"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 blur-2xl"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="relative w-full h-full rounded-3xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center shadow-2xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <Crown className="h-12 w-12 text-white" />
                  </motion.div>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight"
                >
                  Ready for a
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">
                    Complete Solution?
                  </span>
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                  Stop piecing together different vendors. Get one team that handles your entire marketing funnel from start to finish.
                </motion.p>
                
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-5"
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
                      <Button size="lg" className="relative font-bold text-lg px-12 py-8 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border-0" data-testid="button-cta-book-demo">
                        Book a Strategy Call
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="lg" className="font-bold text-lg px-12 py-8 border-2" data-testid="button-cta-contact">
                        Contact Us
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
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
