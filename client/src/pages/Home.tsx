import Hero from "@/components/Hero";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import { SliderCarousel } from "@/components/SliderCarousel";
import PartnerLogos from "@/components/PartnerLogos";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import StatCounter from "@/components/StatCounter";
import CTABand from "@/components/CTABand";
import StickyConversionBar from "@/components/StickyConversionBar";
import SectionDivider from "@/components/SectionDivider";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import TextResolver from "@/components/TextResolver";
import GlowCard from "@/components/GlowCard";
import ScrollValueCards from "@/components/ScrollValueCards";
import { BarChart3, Sparkles, Globe, DollarSign, Zap, Target, Users, Briefcase, TrendingUp, AlertTriangle, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, Eye, FileText, LineChart, MapPin, Smartphone } from "lucide-react";
import { SiGoogleads, SiMeta, SiLinkedin, SiTiktok, SiYoutube, SiX, SiReddit, SiPinterest } from "react-icons/si";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import analyticsImage from '@assets/stock_images/digital_marketing_an_90e73fbc.jpg';
import seoImage from '@assets/stock_images/seo_search_engine_op_279c13f9.jpg';
import ppcImage from '@assets/stock_images/paid_advertising_ppc_08198c97.jpg';
import webDesignImage from '@assets/stock_images/web_design_developme_eb1d2180.jpg';
import socialMediaImage from '@assets/stock_images/social_media_marketi_6046bd61.jpg';

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  // Platform icons mapping
  const platforms = [
    { name: 'Google Ads', icon: SiGoogleads },
    { name: 'Meta Ads', icon: SiMeta },
    { name: 'LinkedIn', icon: SiLinkedin },
    { name: 'TikTok', icon: SiTiktok },
    { name: 'YouTube', icon: SiYoutube },
    { name: 'Twitter', icon: SiX },
    { name: 'Reddit', icon: SiReddit },
    { name: 'Pinterest', icon: SiPinterest },
  ];

  // Simplified statistics - outcome-focused for beginners
  const stats = [
    { value: "7x", label: "Average ROI", subtitle: "average 7x ROI, up to 14x seen", testId: "stat-roi" },
    { value: "76%", label: "of consumers", subtitle: "research online before purchasing", testId: "stat-online-research" },
    { value: "3x", label: "More Leads", subtitle: "with digital vs traditional marketing", testId: "stat-lead-increase" },
    { value: "5.1B", label: "Social Users", subtitle: "active social media users worldwide", testId: "stat-social-users" },
  ];

  // Duplicate stats for seamless infinite loop
  const duplicatedStats = [...stats, ...stats, ...stats];

  // Slider carousel slides for services - The Redline Difference
  const sliderSlides = [
    {
      id: 'results',
      title: 'Marketing That Works',
      description: 'We cut through the marketing nonsense and focus on what actually drives revenue. Real strategies. Real metrics. Real growth.',
      image: analyticsImage,
      buttonText: 'See Our Results',
      buttonLink: '/why-us',
      stats: [
        { value: '7x', label: 'Avg ROI' },
        { value: '50k+', label: 'Leads Generated' },
        { value: '95%', label: 'Client Retention' },
      ],
    },
    {
      id: 'roi',
      title: 'ROI That Stacks Up',
      description: 'Our clients see an average return of 7x on their marketing spend, with some achieving up to 14x. We focus on revenue growth and customer acquisition.',
      image: ppcImage,
      buttonText: 'Calculate Your ROI',
      buttonLink: '/services/ppc',
      stats: [
        { value: '14x', label: 'Max ROI' },
        { value: '7x', label: 'Average ROI' },
        { value: '2.5x', label: 'Industry Avg' },
      ],
    },
    {
      id: 'reach',
      title: 'Cross-Platform Reach',
      description: 'From Google to Meta, TikTok to LinkedIn—we help you reach your audience wherever they are, with messaging that converts.',
      image: socialMediaImage,
      buttonText: 'Explore Platforms',
      buttonLink: '/services/social-media',
      stats: [
        { value: '8+', label: 'Platforms' },
        { value: '5.1B', label: 'Social Users' },
        { value: '76%', label: 'Research Online' },
      ],
    },
    {
      id: 'content',
      title: 'Content & SEO',
      description: 'Quality content drives organic traffic and establishes authority. Our SEO-optimized strategy combines research, analysis, and storytelling.',
      image: seoImage,
      buttonText: 'Boost Rankings',
      buttonLink: '/services/seo',
      stats: [
        { value: '300%', label: 'Avg Traffic Increase' },
        { value: '68%', label: 'Organic CTR Lift' },
        { value: '#1', label: 'Ranking Goal' },
      ],
    },
    {
      id: 'analytics',
      title: 'Data-Driven Growth',
      description: 'Stop guessing. Start growing. We implement comprehensive analytics tracking and provide real-time dashboards that optimize spend.',
      image: webDesignImage,
      buttonText: 'View Analytics',
      buttonLink: '/services/analytics',
      stats: [
        { value: '100%', label: 'Visibility' },
        { value: '24/7', label: 'Monitoring' },
        { value: '3x', label: 'More Leads' },
      ],
    },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="glass-stat-card" data-testid="stat-roi">
              <div className="text-3xl font-bold text-primary">7x</div>
              <div className="text-sm text-foreground">Avg ROI</div>
              <div className="glass-stat-accents">
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-light"></div>
                <div className="glass-stat-light sm"></div>
                <div className="glass-stat-top-light"></div>
              </div>
            </div>
            <div className="glass-stat-card" data-testid="stat-leads">
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-sm text-foreground">Leads Generated</div>
              <div className="glass-stat-accents">
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-light"></div>
                <div className="glass-stat-light sm"></div>
                <div className="glass-stat-top-light"></div>
              </div>
            </div>
            <div className="glass-stat-card" data-testid="stat-retention">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-foreground">Client Retention</div>
              <div className="glass-stat-accents">
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-accent"></div>
                <div className="glass-stat-light"></div>
                <div className="glass-stat-light sm"></div>
                <div className="glass-stat-top-light"></div>
              </div>
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
            Our clients see an average return of 7x on their marketing spend, with some achieving up to 14x. We focus on what matters: revenue growth and customer acquisition at scale.
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
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div 
                  key={platform.name} 
                  className="p-4 neumorphic-card flex flex-col items-center justify-center gap-2 cursor-pointer" 
                  data-testid={`platform-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="w-8 h-8 text-foreground" />
                  <span className="text-xs font-medium text-foreground">{platform.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: 'content',
      label: 'Content & SEO',
      icon: FileText,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Content Marketing That Ranks</h3>
          <p className="text-foreground mb-4">
            Quality content drives organic traffic and establishes authority. Our SEO-optimized content strategy combines keyword research, competitive analysis, and engaging storytelling to boost your search rankings and attract qualified leads.
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Keyword-optimized blog posts and landing pages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Technical SEO audits and implementation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Link building and domain authority growth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Local SEO optimization for Google Business Profile</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'analytics',
      label: 'Data-Driven Growth',
      icon: LineChart,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Analytics That Drive Decisions</h3>
          <p className="text-foreground mb-4">
            Stop guessing. Start growing. We implement comprehensive analytics tracking across all channels, providing real-time dashboards and actionable insights that optimize your marketing spend and maximize conversions.
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Google Analytics 4 setup and custom event tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Conversion funnel analysis and optimization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Attribution modeling for multi-channel campaigns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Custom dashboards with real-time performance metrics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Competitive benchmarking and market analysis</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'local',
      label: 'Local Marketing',
      icon: MapPin,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Dominate Your Local Market</h3>
          <p className="text-foreground mb-4">
            For local businesses, visibility in your area is everything. We optimize your Google Business Profile, manage local citations, and run geo-targeted ad campaigns to ensure customers in your area find you first.
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Google Business Profile optimization and management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Local citation building across 50+ directories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Location-based PPC campaigns on Google and Meta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Review generation and reputation management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Neighborhood-targeted social media advertising</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'mobile',
      label: 'Mobile Strategy',
      icon: Smartphone,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Mobile-First Marketing</h3>
          <p className="text-foreground mb-4">
            Over 60% of searches happen on mobile devices. Our mobile-first approach ensures your website, ads, and landing pages deliver seamless experiences on smartphones and tablets, maximizing conversions from mobile traffic.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 neumorphic-card cursor-pointer" data-testid="mobile-stat-traffic">
              <div className="text-2xl font-bold text-primary mb-1">63%</div>
              <div className="text-sm text-foreground">Mobile Search Traffic</div>
            </div>
            <div className="p-4 neumorphic-card cursor-pointer" data-testid="mobile-stat-conversion">
              <div className="text-2xl font-bold text-primary mb-1">2.5x</div>
              <div className="text-sm text-foreground">Mobile Conversion Lift</div>
            </div>
          </div>
          <ul className="space-y-2 text-foreground mt-4">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Mobile-responsive website design and optimization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Mobile-specific ad creative and landing pages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Click-to-call and location-based mobile ads</span>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Hero />

      <ScrollAnimatedSection>
        <div id="learn-more">
          <HorizontalScrollServices />
        </div>
      </ScrollAnimatedSection>

      <SectionDivider />

      {/* Common Challenges We Solve */}
      <ScrollAnimatedSection>
        <section className="py-2 px-2 sm:px-3 lg:px-4 neumorphic-section" data-testid="section-challenges">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#ff0000" }}>
              <TextResolver text="Common Challenges We Solve" delay={0} timeout={15} iterations={2} />
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              <TextResolver text="Are you struggling with any of these pain points? You're not alone." delay={200} timeout={10} iterations={1} />
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer" 
              data-testid="card-challenge-visibility"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <Eye className="h-4 w-4" style={{ color: 'rgb(59, 130, 246)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Low Visibility & High Ad Costs</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Struggling to get found online while watching ad costs skyrocket? We optimize your presence for maximum visibility at minimal cost.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer" 
              data-testid="card-challenge-conversion"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <MousePointerClick className="h-4 w-4" style={{ color: 'rgb(249, 115, 22)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Poor Website Conversion</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Traffic without conversions is just noise. We design and optimize for one thing: turning visitors into customers.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer" 
              data-testid="card-challenge-fragmented"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <LayoutGrid className="h-4 w-4" style={{ color: 'rgb(168, 85, 247)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Fragmented Marketing</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Juggling multiple agencies and tools that don't talk to each other? We unify your marketing under one roof.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer" 
              data-testid="card-challenge-tracking"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <BarChart2 className="h-4 w-4" style={{ color: 'rgb(34, 197, 94)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">No ROI Tracking</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Can't measure what's working? Our transparent analytics show you exactly where every dollar goes and what it returns.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer" 
              data-testid="card-challenge-outdated"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <Monitor className="h-4 w-4" style={{ color: 'rgb(6, 182, 212)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Outdated Websites</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Your website should be your best salesperson. We build modern, fast, conversion-focused sites that work 24/7.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer" 
              data-testid="card-challenge-crm"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <Database className="h-4 w-4" style={{ color: 'rgb(236, 72, 153)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">No CRM Integration</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Leads slipping through the cracks? We set up and optimize your CRM so no opportunity is ever missed.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard 
              className="neumorphic-card p-4 cursor-pointer col-span-2" 
              data-testid="card-challenge-fatigue"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="neumorphic-inset p-2.5 rounded-lg">
                  <AlertTriangle className="h-4 w-4" style={{ color: 'rgb(234, 179, 8)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Ad Fatigue & Wasted Spend</h3>
                  <p className="text-xs text-muted-foreground leading-snug">Burning through ad budgets with diminishing returns? Our data-driven approach ensures every campaign stays fresh and effective.</p>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-2 px-2 sm:px-3 lg:px-4 neumorphic-section" data-testid="section-differentiators">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              <TextResolver text="The Redline Difference" delay={0} timeout={15} iterations={2} />
            </h2>
            <p className="text-lg text-foreground">
              <TextResolver text="Comprehensive Digital Marketing Solutions" delay={200} timeout={10} iterations={1} />
            </p>
          </div>

          <SliderCarousel slides={sliderSlides} />
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-2 px-2 sm:px-3 lg:px-4 neumorphic-section" data-testid="section-why-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] red-glow-pulse" style={{ color: "#ff0000" }}>
              <TextResolver text="Why Choose Us" delay={0} timeout={15} iterations={2} />
            </h2>
          </div>
          <ScrollValueCards
            cards={[
              {
                icon: TrendingUp,
                title: "Maximum ROI",
                description: "We've seen returns up to 14x.",
                index: 0,
              },
              {
                icon: DollarSign,
                title: "Surprisingly Affordable",
                description: "Plans start at $500/mo.",
                index: 1,
              },
              {
                icon: Zap,
                title: "Quick Turnaround",
                description: "Most updates in <24 business hours.",
                index: 2,
              },
              {
                icon: Target,
                title: "Success Driven",
                description: "We measure everything that matters.",
                index: 3,
              },
              {
                icon: Briefcase,
                title: "Full Service",
                description: "Web, CRM, creative—one team.",
                index: 4,
              },
              {
                icon: Users,
                title: "Individual Focus",
                description: "Personalized strategies for your business.",
                index: 5,
              },
            ]}
          />
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section id="partners" className="py-2 px-2 sm:px-3 lg:px-4 neumorphic-section" data-testid="section-partners">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              Some of Our Partners
            </h2>
          </div>
          <PartnerLogos />
          
          {/* Metrics Section */}
          <div className="mt-12" data-testid="section-metrics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCounter value={98} suffix="%" label="Client Satisfaction" />
              <StatCounter value={7} suffix="x" label="Average ROI" delay={0.1} />
              <StatCounter value={15} suffix="+" label="Years of Experience" delay={0.2} />
              <StatCounter value={95} suffix="%" label="Client Retention" delay={0.3} />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-12">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-2 px-2 sm:px-3 lg:px-4 neumorphic-section" data-testid="section-cta">
        <div className="max-w-7xl mx-auto">
          <CTABand
            title="Book a Free Consultation Today!"
            subtitle="Let's discuss how we can grow your business with data-driven marketing."
            buttonText="Get Started"
            buttonLink="/book-a-demo"
          />
        </div>
      </section>
      </ScrollAnimatedSection>

      <StickyConversionBar />
    </div>
  );
}
