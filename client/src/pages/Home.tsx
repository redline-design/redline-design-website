import Hero from "@/components/Hero";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import ServicesDeepDive from "@/components/ServicesDeepDive";
import TabbedContent from "@/components/TabbedContent";
import ValueTile from "@/components/ValueTile";
import PartnerLogos from "@/components/PartnerLogos";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import StatCounter from "@/components/StatCounter";
import CTABand from "@/components/CTABand";
import StickyConversionBar from "@/components/StickyConversionBar";
import { BarChart3, Sparkles, Globe, DollarSign, Zap, Target, Users, Briefcase, TrendingUp, AlertTriangle, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  // Simplified statistics - outcome-focused for beginners
  const stats = [
    { value: "14x", label: "Average ROI", subtitle: "returns on your marketing investment", testId: "stat-roi" },
    { value: "76%", label: "of consumers", subtitle: "research online before purchasing", testId: "stat-online-research" },
    { value: "3x", label: "More Leads", subtitle: "with digital vs traditional marketing", testId: "stat-lead-increase" },
  ];

  // Duplicate stats for seamless infinite loop
  const duplicatedStats = [...stats, ...stats, ...stats];

  const tabs = [
    {
      id: 'results',
      label: 'Marketing That Works',
      icon: BarChart3,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">No BS. Just Results.</h3>
          <p className="text-foreground mb-4">
            We cut through the marketing nonsense and focus on what actually drives revenue. Real strategies. Real metrics. Real growth.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-roi">
              <div className="text-3xl font-bold text-primary">14x</div>
              <div className="text-sm text-foreground">ROI</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-traffic">
              <div className="text-3xl font-bold text-primary">350%</div>
              <div className="text-sm text-foreground">Traffic Growth</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-retention">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-foreground">Client Retention</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'roi',
      label: 'ROI That Stacks Up',
      icon: Sparkles,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Returns up to 14x Your Investment</h3>
          <p className="text-foreground mb-4">
            Our clients see an average return of 8-14x on their marketing spend. We focus on what matters: revenue growth and customer acquisition at scale.
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Performance-based optimization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Real-time campaign adjustments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Transparent reporting and analytics</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'reach',
      label: "It's a Big World",
      icon: Globe,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Cross-Platform Reach</h3>
          <p className="text-foreground mb-4">
            From Google to Meta, TikTok to LinkedIn—we help you reach your audience wherever they are, with messaging that converts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {['Google Ads', 'Meta Ads', 'LinkedIn', 'TikTok', 'YouTube', 'Twitter', 'Reddit', 'Pinterest'].map((platform) => (
              <div 
                key={platform} 
                className="p-3 bg-card rounded-lg text-center text-sm font-medium cursor-pointer hover-elevate active-elevate-2" 
                data-testid={`platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Hero />
      
      <div id="learn-more">
        <HorizontalScrollServices />
      </div>

      {/* Service Deep Dive - Progressive Disclosure */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-card/20" data-testid="section-services-detail">
        <div className="max-w-7xl mx-auto">
          <ServicesDeepDive />
        </div>
      </section>

      {/* Common Challenges We Solve */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" data-testid="section-challenges">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              Common Challenges We Solve
            </h2>
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              Are you struggling with any of these pain points? You're not alone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              className="bg-card rounded-xl p-6 cursor-pointer hover-elevate active-elevate-2" 
              data-testid="card-challenge-visibility"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Low Visibility & High Ad Costs</h3>
                  <p className="text-sm text-muted-foreground">Struggling to get found online while watching ad costs skyrocket? We optimize your presence for maximum visibility at minimal cost.</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-card rounded-xl p-6 cursor-pointer hover-elevate active-elevate-2" 
              data-testid="card-challenge-conversion"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MousePointerClick className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Poor Website Conversion</h3>
                  <p className="text-sm text-muted-foreground">Traffic without conversions is just noise. We design and optimize for one thing: turning visitors into customers.</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-card rounded-xl p-6 cursor-pointer hover-elevate active-elevate-2" 
              data-testid="card-challenge-fragmented"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Fragmented Marketing</h3>
                  <p className="text-sm text-muted-foreground">Juggling multiple agencies and tools that don't talk to each other? We unify your marketing under one roof.</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-card rounded-xl p-6 cursor-pointer hover-elevate active-elevate-2" 
              data-testid="card-challenge-tracking"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No ROI Tracking</h3>
                  <p className="text-sm text-muted-foreground">Can't measure what's working? Our transparent analytics show you exactly where every dollar goes and what it returns.</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-card rounded-xl p-6 cursor-pointer hover-elevate active-elevate-2" 
              data-testid="card-challenge-outdated"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Outdated Websites</h3>
                  <p className="text-sm text-muted-foreground">Your website should be your best salesperson. We build modern, fast, conversion-focused sites that work 24/7.</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-card rounded-xl p-6 cursor-pointer hover-elevate active-elevate-2" 
              data-testid="card-challenge-crm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No CRM Integration</h3>
                  <p className="text-sm text-muted-foreground">Leads slipping through the cracks? We set up and optimize your CRM so no opportunity is ever missed.</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-card rounded-xl p-6 cursor-pointer md:col-span-2 lg:col-span-3 hover-elevate active-elevate-2" 
              data-testid="card-challenge-fatigue"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Ad Fatigue & Wasted Spend</h3>
                  <p className="text-sm text-muted-foreground">Burning through ad budgets with diminishing returns? Our data-driven approach ensures every campaign stays fresh and effective.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm" data-testid="section-differentiators">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              The Redline Difference
            </h2>
            <p className="text-lg text-foreground">
              Keys to Digital Success
            </p>
          </div>

          <TabbedContent tabs={tabs} />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-why-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueTile
              icon={TrendingUp}
              title="Maximum ROI"
              description="We've seen returns up to 14x."
            />
            <ValueTile
              icon={DollarSign}
              title="Surprisingly Affordable"
              description="Plans start at $500/mo."
              delay={0.1}
            />
            <ValueTile
              icon={Zap}
              title="Quick Turnaround"
              description="Most updates in <24 business hours."
              delay={0.2}
            />
            <ValueTile
              icon={Target}
              title="Success Driven"
              description="We measure everything that matters."
              delay={0.3}
            />
            <ValueTile
              icon={Briefcase}
              title="Full Service"
              description="Web, CRM, creative—one team."
              delay={0.4}
            />
            <ValueTile
              icon={Users}
              title="Individual Focus"
              description="Personalized strategies for your business."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50" data-testid="section-metrics">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={98} suffix="%" label="Client Satisfaction" />
            <StatCounter value={14} suffix="x" label="Average ROI" delay={0.1} />
            <StatCounter value={500} suffix="+" label="Success Stories" delay={0.2} />
            <StatCounter value={95} suffix="%" label="Client Retention" delay={0.3} />
          </div>
        </div>
      </section>

      <section id="partners" className="py-16 px-4 sm:px-6 lg:px-8" data-testid="section-partners">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              Some of Our Partners
            </h2>
          </div>
          <PartnerLogos />

          {/* Industry Statistics - Auto-Scrolling */}
          <div className="mt-16" data-testid="section-stats-carousel">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4 pointer-events-none"
                animate={{
                  x: prefersReducedMotion ? 0 : [0, -100 * stats.length],
                }}
                transition={{
                  x: {
                    duration: prefersReducedMotion ? 0 : stats.length * 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedStats.map((stat, index) => (
                  <div 
                    key={`${stat.testId}-${index}`}
                    className="flex-shrink-0 w-[280px] sm:w-[320px]"
                  >
                    <div className="text-center p-4 bg-card rounded-lg" data-testid={index < stats.length ? stat.testId : undefined}>
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-foreground font-medium mb-0.5">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Gradient overlays for fade effect */}
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-card/30 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-card/30 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-cta">
        <div className="max-w-7xl mx-auto">
          <CTABand
            title="Book a Free Consultation Today!"
            subtitle="Let's discuss how we can grow your business with data-driven marketing."
            buttonText="Get Started"
            buttonLink="/book-a-demo"
          />
        </div>
      </section>

      <StickyConversionBar />
    </div>
  );
}
