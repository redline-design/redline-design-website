import Hero from "@/components/Hero";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import TabbedContent from "@/components/TabbedContent";
import ValueTile from "@/components/ValueTile";
import PartnerLogos from "@/components/PartnerLogos";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import StatCounter from "@/components/StatCounter";
import CTABand from "@/components/CTABand";
import { BarChart3, Sparkles, Globe as GlobeIcon, DollarSign, Zap, Target, Users, Briefcase, TrendingUp } from "lucide-react";

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
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">14x</div>
              <div className="text-sm text-foreground">ROI</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">350%</div>
              <div className="text-sm text-foreground">Traffic Growth</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
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
              <div key={platform} className="p-3 bg-card rounded-lg text-center text-sm font-medium">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/20 backdrop-blur-sm">
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
