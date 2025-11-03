import Hero from "@/components/Hero";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import TabbedContent from "@/components/TabbedContent";
import ValueTile from "@/components/ValueTile";
import PartnerLogos from "@/components/PartnerLogos";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import StatCounter from "@/components/StatCounter";
import CTABand from "@/components/CTABand";
import { BarChart3, Sparkles, Globe as GlobeIcon, DollarSign, Zap, Target, Users, Briefcase, TrendingUp, AlertTriangle, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, Eye } from "lucide-react";

export default function Home() {
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
      icon: GlobeIcon,
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
      
      <HorizontalScrollServices />

      {/* Bilingual Services Badge */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/20 backdrop-blur-sm" data-testid="section-bilingual">
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/20 cursor-pointer hover-elevate active-elevate-2" 
            data-testid="card-bilingual-services"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary rounded-xl">
                  <GlobeIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Bilingual Services Available</h3>
                  <p className="text-muted-foreground">We speak your language—English & Spanish</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="px-6 py-3 bg-card rounded-lg border border-border">
                  <span className="font-bold text-foreground">English</span>
                </div>
                <div className="px-6 py-3 bg-card rounded-lg border border-border">
                  <span className="font-bold text-foreground">Español</span>
                </div>
              </div>
            </div>
          </div>
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

          {/* Industry Statistics */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-xl font-bold mb-2 text-foreground">Why Digital Marketing Matters</h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                The digital landscape is massive—and your business needs to be visible in it
              </p>
            </div>
            
            {/* Global Reach Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-internet-users">
                <div className="text-4xl font-bold text-primary mb-2">5.35B</div>
                <div className="text-sm text-foreground font-medium mb-1">Internet Users</div>
                <div className="text-xs text-muted-foreground">globally connected and searching</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-online-shoppers">
                <div className="text-4xl font-bold text-primary mb-2">248M</div>
                <div className="text-sm text-foreground font-medium mb-1">Americans Shop Online</div>
                <div className="text-xs text-muted-foreground">ready to buy from businesses like yours</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-global-online">
                <div className="text-4xl font-bold text-primary mb-2">66%</div>
                <div className="text-sm text-foreground font-medium mb-1">Global Population Online</div>
                <div className="text-xs text-muted-foreground">and that number keeps growing</div>
              </div>
            </div>

            {/* Marketing Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-online-research">
                <div className="text-4xl font-bold text-primary mb-2">76%</div>
                <div className="text-sm text-foreground font-medium mb-1">of consumers</div>
                <div className="text-xs text-muted-foreground">research online before purchasing</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-seo-revenue">
                <div className="text-4xl font-bold text-primary mb-2">5.3x</div>
                <div className="text-sm text-foreground font-medium mb-1">higher revenue</div>
                <div className="text-xs text-muted-foreground">for businesses with strong SEO</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-email-roi">
                <div className="text-4xl font-bold text-primary mb-2">$42</div>
                <div className="text-sm text-foreground font-medium mb-1">average ROI</div>
                <div className="text-xs text-muted-foreground">for every $1 spent on email marketing</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg cursor-pointer hover-elevate active-elevate-2" data-testid="stat-ppc-conversion">
                <div className="text-4xl font-bold text-primary mb-2">200%</div>
                <div className="text-sm text-foreground font-medium mb-1">average increase</div>
                <div className="text-xs text-muted-foreground">in conversion with PPC campaigns</div>
              </div>
            </div>
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
            <p className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
              Who We Work With
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              Some of Our Partners
            </h2>
            <p className="text-lg text-foreground">
              We have a variety of partners across different platforms.
            </p>
          </div>
          <PartnerLogos />
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
    </div>
  );
}
