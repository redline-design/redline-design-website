import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCounter from "@/components/StatCounter";
import CTABand from "@/components/CTABand";
import { Search, TrendingUp, Globe, Share2, Mail } from "lucide-react";
import { Link } from "wouter";

interface ServiceSectionProps {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  outcomes: string[];
  delay?: number;
}

function ServiceSection({ id, icon: Icon, title, description, features, outcomes, delay = 0 }: ServiceSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 150px"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ 
        scale,
        opacity,
      }}
      className="scroll-mt-24 sticky top-[100px] mb-6"
      data-testid={`section-service-${id}`}
    >
      <Card className="rounded-2xl overflow-hidden backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="flex items-start gap-6 mb-6">
            <motion.div 
              className="flex-shrink-0 p-4 rounded-xl bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-3 red-glow-pulse" style={{ color: "#ff0000" }}>{title}</h2>
              <p className="text-lg text-foreground">{description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">What We Do</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Expected Outcomes</h3>
              <ul className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground">
                    <span className="text-primary mt-1">→</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/book-a-demo">
            <Button size="lg" variant="default" data-testid={`button-get-plan-${id}`}>
              Get a Plan
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-services-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            From Clicks to Customers: <span className="text-primary">Mastering the Art</span> of Digital Marketing
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive digital marketing services designed to grow your business
          </motion.p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50" data-testid="section-metrics">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={14} suffix="x" label="Average ROI" />
            <StatCounter value={350} suffix="%" label="Traffic Growth" delay={0.1} />
            <StatCounter value={2} suffix="x" label="Conversion Rate" delay={0.2} />
            <StatCounter value={95} suffix="%" label="Client Retention" delay={0.3} />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="section-service-details">
        <div className="max-w-5xl mx-auto">
          <ServiceSection
            id="seo"
            icon={Search}
            title="SEO & SEM"
            description="Technical, content, and authority work so you're found everywhere."
            features={[
              "Technical SEO audits and optimization",
              "Keyword research and content strategy",
              "Link building and authority development",
              "Local SEO for multi-location businesses",
              "Ongoing monitoring and reporting",
            ]}
            outcomes={[
              "Increased organic traffic by 200-500%",
              "Higher search rankings for target keywords",
              "Improved domain authority and trust",
              "More qualified leads from search",
            ]}
          />

          <ServiceSection
            id="ppc"
            icon={TrendingUp}
            title="Paid Advertising (PPC)"
            description="Strategic media buying focused on ROAS—search, social, and retargeting."
            features={[
              "Google Ads campaign management",
              "Meta (Facebook/Instagram) advertising",
              "LinkedIn and TikTok ads",
              "Retargeting and remarketing campaigns",
              "A/B testing and conversion optimization",
            ]}
            outcomes={[
              "8-14x return on ad spend (ROAS)",
              "Lower cost per lead (CPL) over time",
              "Higher click-through rates (CTR)",
              "Better audience targeting and segmentation",
            ]}
            delay={0.1}
          />

          <ServiceSection
            id="web"
            icon={Globe}
            title="Web Design & Development"
            description="Custom Next.js sites that load fast, look premium, and convert."
            features={[
              "Modern, responsive web design",
              "Next.js and React development",
              "Performance optimization (95+ Lighthouse scores)",
              "Conversion-focused UX/UI",
              "E-commerce and custom functionality",
            ]}
            outcomes={[
              "Lightning-fast page load times",
              "Mobile-optimized experiences",
              "Higher conversion rates",
              "Scalable, maintainable codebase",
            ]}
            delay={0.2}
          />

          <ServiceSection
            id="social"
            icon={Share2}
            title="Social Media Marketing"
            description="Build your brand and engage your audience across all major platforms."
            features={[
              "Content strategy and creation",
              "Community management",
              "Influencer partnerships",
              "Social media advertising",
              "Analytics and reporting",
            ]}
            outcomes={[
              "Increased brand awareness",
              "Higher engagement rates",
              "Community growth",
              "More social-driven conversions",
            ]}
            delay={0.3}
          />

          <ServiceSection
            id="email"
            icon={Mail}
            title="Email & Lifecycle Marketing"
            description="Nurture leads and retain customers with targeted email campaigns."
            features={[
              "Email marketing automation",
              "Segmentation and personalization",
              "Lifecycle campaign development",
              "A/B testing and optimization",
              "CRM integration",
            ]}
            outcomes={[
              "Higher email open and click rates",
              "Increased customer lifetime value",
              "Better lead nurturing",
              "Automated revenue generation",
            ]}
            delay={0.4}
          />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-services-cta">
        <div className="max-w-7xl mx-auto">
          <CTABand
            title="Ready to Get Started?"
            subtitle="Let's create a custom digital marketing plan for your business."
            buttonText="Book Free Consultation"
            buttonLink="/book-a-demo"
          />
        </div>
      </section>
    </div>
  );
}
