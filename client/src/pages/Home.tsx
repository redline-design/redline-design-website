import Hero from "@/components/Hero";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import { SliderCarousel } from "@/components/SliderCarousel";
import PartnerLogos from "@/components/PartnerLogos";
import TrustBadges from "@/components/TrustBadges";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import StatCounter from "@/components/StatCounter";
import CTABand from "@/components/CTABand";
import StickyConversionBar from "@/components/StickyConversionBar";
import SectionDivider from "@/components/SectionDivider";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import TextResolver from "@/components/TextResolver";
import GlowCard from "@/components/GlowCard";
import ScrollValueCards from "@/components/ScrollValueCards";
import ProcessSteps from "@/components/ProcessSteps";
import HomeContactSection from "@/components/HomeContactSection";
import AboutBlurb from "@/components/AboutBlurb";
import { BarChart3, Sparkles, Globe, DollarSign, Zap, Target, Users, Briefcase, TrendingUp, FileText, LineChart, MapPin, Smartphone, Eye, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, AlertTriangle, Heart, Award } from "lucide-react";
import { SiGoogleads, SiMeta, SiLinkedin, SiTiktok, SiYoutube, SiX, SiReddit, SiPinterest } from "react-icons/si";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import analyticsImage from '@assets/generated_images/analytics_dashboard_data_visualization_c2fe954e.png';
import seoImage from '@assets/generated_images/seo_optimization_workspace_588cf445.png';
import ppcImage from '@assets/generated_images/ppc_campaign_management_dashboard_70cb822e.png';
import webDesignImage from '@assets/generated_images/data_analytics_growth_center_3fe12d50.png';
import socialMediaImage from '@assets/generated_images/social_media_analytics_hub_216308e5.png';
import automationImage from '@assets/generated_images/marketing_automation_workflow_dashboard_1a5087a7.png';
import roiAttributionImage from '@assets/generated_images/roi_attribution_analytics_center_b97acdf0.png';

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
    { value: "7x", label: "Average ROI", subtitle: "average 7x ROI across clients", testId: "stat-roi" },
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
      description: 'Our clients see an average return of 7x on their marketing spend. We focus on revenue growth and customer acquisition.',
      image: ppcImage,
      buttonText: 'Calculate Your ROI',
      buttonLink: '/services/ppc',
      stats: [
        { value: '7x', label: 'Avg ROI' },
        { value: '95%', label: 'Retention' },
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
    {
      id: 'automation',
      title: 'Marketing Automation',
      description: 'Scale your marketing with intelligent automation. Trigger-based campaigns, customer journey mapping, and AI-powered insights that work while you sleep.',
      image: automationImage,
      buttonText: 'Explore Automation',
      buttonLink: '/services/ai-automation',
      stats: [
        { value: '85%', label: 'Time Saved' },
        { value: '3.5x', label: 'Lead Nurture Rate' },
        { value: '24/7', label: 'Active Campaigns' },
      ],
    },
    {
      id: 'attribution',
      title: 'ROI Attribution',
      description: 'Know exactly where every dollar goes and what it returns. Multi-touch attribution modeling shows you which channels drive real revenue.',
      image: roiAttributionImage,
      buttonText: 'Track ROI',
      buttonLink: '/services/analytics',
      stats: [
        { value: '100%', label: 'Budget Visibility' },
        { value: '2.8x', label: 'ROAS Average' },
        { value: '99%', label: 'Accuracy' },
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
          <h3 className="text-2xl font-bold mb-4">Returns of 7x Your Investment</h3>
          <p className="text-foreground mb-4">
            Our clients see an average return of 7x on their marketing spend. We focus on what matters: revenue growth and customer acquisition at scale.
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
      <div data-section-label="Home" style={{ position: 'relative', minHeight: '100vh' }}>
        <Hero />
      </div>

      <ScrollAnimatedSection>
        <div id="learn-more" data-section-label="Services">
          <HorizontalScrollServices />
        </div>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-20 md:py-32 px-4 md:px-8" data-testid="section-differentiators" data-section-label="Solutions">
          <SliderCarousel slides={sliderSlides} />
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <AboutBlurb />
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-20 md:py-32 px-4 md:px-8" data-testid="section-why-us" data-section-label="Why Us">
          <ScrollValueCards
            cards={[
              {
                icon: TrendingUp,
                title: "Maximum ROI",
                bullets: [
                  "Average 7x return on investment",
                  "Consistent 7x ROI across clients",
                  "Focus relentlessly on revenue growth",
                  "Data-driven optimization strategies",
                  "Continuous A/B testing & refinement",
                  "ROI tracking across all channels"
                ],
                index: 0,
                accentColor: "#ff0000",
              },
              {
                icon: DollarSign,
                title: "Surprisingly Affordable",
                bullets: [
                  "Enterprise-level marketing from $500/mo",
                  "No long-term contracts required",
                  "No hidden fees or surprises",
                  "Flexible pricing plans for all budgets",
                  "Month-to-month billing options",
                  "Scale up or down as needed"
                ],
                index: 1,
                accentColor: "#00ff88",
              },
              {
                icon: Zap,
                title: "Quick Turnaround",
                bullets: [
                  "Most updates within 24 business hours",
                  "Fast-paced execution on all projects",
                  "Capitalize on opportunities quickly",
                  "Agile workflow processes",
                  "Rapid response to market changes",
                  "Launch campaigns in days, not weeks"
                ],
                index: 2,
                accentColor: "#ffaa00",
              },
              {
                icon: Target,
                title: "Success Driven",
                bullets: [
                  "Measure everything that matters",
                  "Real-time performance dashboards",
                  "Track conversions and ROI live",
                  "Customer acquisition cost tracking",
                  "Detailed analytics & insights reports",
                  "Goal-oriented campaign planning"
                ],
                index: 3,
                accentColor: "#0088ff",
              },
              {
                icon: Briefcase,
                title: "Full Service",
                bullets: [
                  "Web design & development",
                  "SEO, PPC & paid advertising",
                  "Social media & content marketing",
                  "Email marketing & CRM integration",
                  "Graphic design & branding",
                  "Analytics & conversion optimization"
                ],
                index: 4,
                accentColor: "#aa00ff",
              },
              {
                icon: Users,
                title: "Individual Focus",
                bullets: [
                  "Personalized strategies for your business",
                  "Tailored to your industry & audience",
                  "No cookie-cutter solutions",
                  "Dedicated account management",
                  "Custom reporting for your needs",
                  "Direct access to your marketing team"
                ],
                index: 5,
                accentColor: "#ff0088",
              },
            ]}
          />
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <ProcessSteps />
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section id="partners" className="py-20 md:py-32 px-4 md:px-8" data-testid="section-partners" data-section-label="Partners">
          <div className="max-w-7xl mx-auto">
            
            {/* Partners Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Trusted By</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 tracking-tight section-heading-glow">
                Our Partners
              </h2>
            </motion.div>
            
            <div className="mb-20">
              <PartnerLogos />
            </div>

            {/* Trust Badges Section */}
            <TrustBadges />
            
            {/* Metrics Section */}
            <div data-testid="section-metrics" className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-2">
                  The Numbers Speak
                </h3>
                <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
                  Our track record of delivering measurable results
                </p>
              </motion.div>
              
              <div className="py-4 md:py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                  <StatCounter value={98} suffix="%" label="Client Satisfaction" icon={Heart} />
                  <StatCounter value={7} suffix="x" label="Average ROI" delay={0.1} icon={TrendingUp} />
                  <StatCounter value={15} suffix="+" label="Years of Experience" delay={0.2} icon={Award} />
                  <StatCounter value={95} suffix="%" label="Client Retention" delay={0.3} icon={Users} />
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Testimonials</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-2">
                  What Our Clients Say
                </h3>
                <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
                  Real feedback from businesses we've helped grow
                </p>
              </motion.div>
              <TestimonialsCarousel />
            </div>
            
          </div>
        </section>
      </ScrollAnimatedSection>

      <SectionDivider />
      <ScrollAnimatedSection>
        <HomeContactSection />
      </ScrollAnimatedSection>

      <StickyConversionBar />

      <div className="w-full" data-testid="section-cta-footer" data-section-label="Get Started" style={{
        background: 'linear-gradient(180deg, rgb(26, 26, 26) 0%, rgb(18, 18, 18) 50%, rgb(15, 15, 15) 100%)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid rgba(255, 0, 0, 0.2)',
        position: 'relative',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}>
        {/* Simplified depth effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(255, 0, 0, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
          opacity: 0.8
        }} />
        <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
          <CTABand
            title="Book a Free Consultation Today!"
            subtitle="Let's discuss how we can grow your business with data-driven marketing."
            buttonText="Get Started"
            buttonLink="/book-a-demo"
            phoneNumber="(208) 867-4526"
            phoneHref="tel:+12088674526"
          />
        </section>
      </div>
    </div>
  );
}
