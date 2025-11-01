import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TabbedContent from "@/components/TabbedContent";
import ValueTile from "@/components/ValueTile";
import PartnerLogos from "@/components/PartnerLogos";
import CTABand from "@/components/CTABand";
import { Globe, TrendingUp, Search, BarChart3, Sparkles, Globe as GlobeIcon, DollarSign, Zap, Target, Users, Briefcase } from "lucide-react";

export default function Home() {
  const tabs = [
    {
      id: 'results',
      label: 'Measurable Results',
      icon: BarChart3,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Data-Driven Results. Facts, Not Feelings.</h3>
          <p className="text-muted-foreground mb-4">
            Every campaign is tracked, measured, and optimized for maximum performance. We don't guess—we know what works.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">14x</div>
              <div className="text-sm text-muted-foreground">ROI</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">350%</div>
              <div className="text-sm text-muted-foreground">Traffic Growth</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Client Retention</div>
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
          <p className="text-muted-foreground mb-4">
            Our clients see an average return of 8-14x on their marketing spend. We focus on what matters: revenue growth and customer acquisition at scale.
          </p>
          <ul className="space-y-2 text-muted-foreground">
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
          <p className="text-muted-foreground mb-4">
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
      
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Full-service digital marketing designed to drive results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Globe}
              title="World Class Websites"
              description="Unique websites at reasonable prices."
              link="/services#web"
              status="accepting"
            />
            <ServiceCard
              icon={TrendingUp}
              title="Paid Advertising"
              description="Focusing on maximum ROI."
              link="/services#ppc"
              status="accepting"
              delay={0.1}
            />
            <ServiceCard
              icon={Search}
              title="SEO/SEM"
              description="Get found everywhere, by everyone."
              link="/services#seo"
              status="waitlist"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm" data-testid="section-differentiators">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              The Redline Difference
            </h2>
            <p className="text-lg text-muted-foreground">
              Keys to Digital Success
            </p>
          </div>
          <TabbedContent tabs={tabs} />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-why-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
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

      <section id="partners" className="py-16 px-4 sm:px-6 lg:px-8 bg-card/20 backdrop-blur-sm" data-testid="section-partners">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Who We Work With
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Some of Our Partners
            </h2>
            <p className="text-lg text-muted-foreground">
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
