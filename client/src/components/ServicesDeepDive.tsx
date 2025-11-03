import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot, Check } from "lucide-react";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "World Class Websites",
    tagline: "Your digital storefront that works 24/7",
    status: "accepting" as const,
    accentColor: "rgb(96, 165, 250)",
    details: {
      whatYouGet: [
        "Mobile-responsive design that looks great on any device",
        "Fast loading speeds (under 3 seconds)",
        "SEO-optimized structure from day one",
        "Easy-to-update content management system",
        "Secure hosting and SSL certificate included"
      ],
      perfectFor: "Businesses that need a professional online presence without breaking the bank",
      timeline: "2-4 weeks",
      investment: "Starting at $2,500"
    }
  },
  {
    id: "ppc",
    icon: TrendingUp,
    title: "Paid Advertising",
    tagline: "Get customers today, not months from now",
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
      investment: "10-20% of ad spend (min $500/month)"
    }
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO/SEM",
    tagline: "Show up when customers are searching for you",
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
      investment: "Starting at $1,500/month"
    }
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM Setup & Automation",
    tagline: "Never lose track of a lead again",
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
      investment: "Starting at $1,200 one-time + $300/month"
    }
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & Data Analysis",
    tagline: "Know exactly what's working (and what's not)",
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
      investment: "Starting at $800 one-time + $400/month"
    }
  },
  {
    id: "design",
    icon: Palette,
    title: "Graphic Design",
    tagline: "Stand out in a sea of boring brands",
    status: "accepting" as const,
    accentColor: "rgb(99, 102, 241)",
    details: {
      whatYouGet: [
        "Custom logo and brand identity",
        "Social media graphics that stop the scroll",
        "Email templates that get opened",
        "Ad creatives optimized for conversions",
        "Unlimited revisions until you love it"
      ],
      perfectFor: "Businesses that know first impressions matter",
      timeline: "1-3 weeks depending on scope",
      investment: "Starting at $500 per project"
    }
  }
];

export default function ServicesDeepDive() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
          Want the Details?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Click any service to learn exactly what you get, who it's for, and what it costs
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2" data-testid="section-services-deep-dive">
        {services.map((service) => {
          const isExpanded = expandedId === service.id;
          const Icon = service.icon;

          return (
            <Card
              key={service.id}
              className="hover-elevate transition-all duration-300"
              data-testid={`card-service-deep-dive-${service.id}`}
            >
              <CardHeader className="p-0">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  className="w-full text-left p-2 flex items-center gap-2 hover-elevate active-elevate-2"
                  data-testid={`button-expand-service-${service.id}`}
                >
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${service.accentColor}20`,
                      color: service.accentColor
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <h3 className="text-xs font-bold text-foreground">
                        {service.title}
                      </h3>
                      {service.status === "waitlist" && (
                        <Badge variant="secondary" className="text-[10px] px-1 py-0">
                          Waitlist
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-[10px] line-clamp-1">
                      {service.tagline}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-auto"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </motion.div>
                </button>
              </CardHeader>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <CardContent className="p-3 pt-0 border-t border-border/30">
                      <div className="space-y-3">
                        {/* What You Get */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-1.5 text-xs">
                            What You Get:
                          </h4>
                          <ul className="space-y-1">
                            {service.details.whatYouGet.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Perfect For */}
                        <div className="bg-card/50 rounded-lg p-2">
                          <h4 className="font-semibold text-foreground mb-1 text-xs">
                            Perfect For:
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {service.details.perfectFor}
                          </p>
                        </div>

                        {/* Timeline & Investment */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h4 className="font-semibold text-foreground mb-0.5 text-xs">
                              Timeline:
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {service.details.timeline}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-0.5 text-xs">
                              Investment:
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {service.details.investment}
                            </p>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-1">
                          <Button
                            asChild
                            size="sm"
                            className="w-full text-xs"
                            data-testid={`button-book-${service.id}`}
                          >
                            <a href="#contact">
                              {service.status === "waitlist" ? "Join Waitlist" : "Book Free Consultation"}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
