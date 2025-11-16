import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot, Code, Check, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Services data
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
      investment: "Starting at $1,000 one-time + $100/month per user added"
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
      investment: "Included with all marketing plans"
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
      timeline: "1+ weeks depending on scope",
      investment: "Starting at $200 per project"
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
      investment: "Starting at $1,000/month"
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
      investment: "Starting at $1,000/month"
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
      investment: "Starting at $500 one-time + $300/month. Includes 100,000 interactions/month."
    }
  },
  {
    id: "app-dev",
    icon: Code,
    title: "App Development",
    description: "Bespoke software solutions tailored to your business needs.",
    tagline: "Build exactly what you need, nothing you don't",
    link: "/services/app-development",
    status: "accepting" as const,
    accentColor: "rgb(139, 92, 246)",
    details: {
      whatYouGet: [
        "Custom web and mobile applications",
        "API development and integrations",
        "Database design and optimization",
        "User-friendly admin dashboards",
        "Ongoing maintenance and support"
      ],
      perfectFor: "Businesses with unique processes that off-the-shelf solutions can't handle",
      timeline: "4-12 weeks depending on complexity",
      investment: "Starting at $5,000"
    }
  }
] as const;

// Card component with scroll-based animations
function ServiceCard({ 
  service, 
  index, 
  scrollYProgress,
  onSelect
}: { 
  service: typeof SERVICES_DATA[number];
  index: number;
  scrollYProgress: any;
  onSelect: (service: typeof SERVICES_DATA[number]) => void;
}) {
  // Calculate grid position - 6 columns to ensure max 2 rows for 11 cards
  const cols = 6;
  const row = Math.floor(index / cols);
  const col = index % cols;
  
  // Each card animates based on scroll progress
  const cardProgress = useTransform(
    scrollYProgress,
    [0.2, 0.3 + (index * 0.03), 0.8],
    [0, 1, 1]
  );
  
  const x = useTransform(cardProgress, [0, 1], [0, (col - 2.5) * 190]);
  const y = useTransform(cardProgress, [0, 1], [0, row * 280]);
  const rotation = useTransform(cardProgress, [0, 1], [index * 8 - 40, 0]);
  const opacity = useTransform(cardProgress, [0, 0.3, 1], [0.7, 1, 1]);

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        rotate: rotation,
        opacity,
        transformOrigin: "center center"
      }}
    >
      <Card
        className="w-[180px] h-[260px] rounded-2xl border-border/30 group hover-elevate active-elevate-2 cursor-pointer overflow-hidden relative"
        onClick={() => onSelect(service)}
        data-testid={`card-service-${service.id}`}
        style={{
          background: `linear-gradient(135deg, ${service.accentColor}15 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)`
        }}
      >
        {/* Hexagon pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Content with backdrop blur */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
        
        <CardContent className="p-3 w-full h-full flex flex-col relative z-10">
          <div className="flex flex-col text-center gap-2 flex-1">
            <div 
              className="flex-shrink-0 p-2 rounded-lg icon-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 mx-auto"
              style={{
                backgroundColor: `${service.accentColor}30`
              }}
            >
              <service.icon className="h-5 w-5" style={{ color: service.accentColor }} data-testid={`icon-service-${service.id}`} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-foreground mb-2 line-clamp-1" data-testid={`text-service-title-${service.id}`}>
                {service.title}
              </h3>
            </div>
            
            {/* Bullet Points */}
            <ul className="space-y-1.5 text-left flex-1">
              {service.details.whatYouGet.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HorizontalScrollServices() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      data-testid="section-services-horizontal"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
            What We Do
          </h2>
          <p className="text-lg text-foreground">
            Comprehensive digital marketing solutions to grow your business
          </p>
        </div>

        {/* Scroll-Based Cards Layout */}
        <div className="relative min-h-[620px] flex items-start justify-center pt-8" data-testid="container-service-cards">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              scrollYProgress={scrollYProgress}
              onSelect={setSelectedService}
            />
          ))}
        </div>
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
