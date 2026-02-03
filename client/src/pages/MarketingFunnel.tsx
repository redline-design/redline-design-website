import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ArrowDown,
  Check,
  Target,
  Users,
  Zap,
  ChevronDown
} from "lucide-react";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";

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
}

function FunnelStage({ number, title, subtitle, description, services, benefits, isLast = false }: FunnelStageProps) {
  return (
    <ScrollAnimatedSection>
      <div className="relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{number}</span>
                </div>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                  {subtitle}
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {description}
              </p>
              <div className="space-y-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={service.link}>
                    <div className="group p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 h-full cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {!isLast && (
          <div className="flex justify-center py-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-16 w-px bg-gradient-to-b from-primary/50 to-primary/10" />
              <ChevronDown className="h-5 w-5 text-primary/50 animate-bounce" />
            </motion.div>
          </div>
        )}
      </div>
    </ScrollAnimatedSection>
  );
}

export default function MarketingFunnel() {
  const funnelStages: FunnelStageProps[] = [
    {
      number: 1,
      title: "Attract & Capture",
      subtitle: "Top of Funnel",
      description: "Get your brand in front of the right people at the right time. We drive qualified traffic to your business through proven digital channels.",
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
    <div className="min-h-screen">
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto relative">
          <ScrollAnimatedSection>
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Complete Marketing Solution</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
              >
                The Marketing Funnel<br />
                <span className="text-primary">Built for Growth</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                From first impression to loyal customer—we handle every stage of your marketing funnel so you can focus on what you do best.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link href="/book-a-demo">
                  <Button size="lg" className="font-semibold shadow-lg shadow-primary/25" data-testid="button-funnel-get-started">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="font-semibold" data-testid="button-funnel-view-services">
                    View All Services
                  </Button>
                </Link>
              </motion.div>
            </div>
          </ScrollAnimatedSection>
          
          <ScrollAnimatedSection>
            <div className="flex flex-wrap justify-center gap-6 py-8 mb-8 border-y border-border/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Average 7x ROI</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>1 Week Setup</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4 text-primary" />
                <span>1 Stop Marketing Solution</span>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8" data-testid="section-funnel-stages">
        <div className="max-w-6xl mx-auto">
          {funnelStages.map((stage) => (
            <FunnelStage key={stage.number} {...stage} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" data-testid="section-funnel-cta">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimatedSection>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-card/90 backdrop-blur-xl" />
              <div className="absolute inset-0 border border-primary/20 rounded-2xl" />
              
              <div className="relative p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready for a Complete Solution?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Stop piecing together different vendors. Get one team that handles your entire marketing funnel from start to finish.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/book-a-demo">
                    <Button size="lg" className="font-semibold shadow-lg shadow-primary/25" data-testid="button-cta-book-demo">
                      Book a Strategy Call
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="font-semibold" data-testid="button-cta-contact">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}
