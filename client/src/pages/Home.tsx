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
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Hero />
        <div className="layout">
          <div className="layout-box">
            High-end, full-service<br />digital marketing<br />for growing brands.
          </div>
        </div>
      </div>

      <ScrollAnimatedSection>
        <div id="learn-more">
          <HorizontalScrollServices />
        </div>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-2 px-2 sm:px-3 lg:px-4" data-testid="section-differentiators">
          <SliderCarousel slides={sliderSlides} />
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-2 px-2 sm:px-3 lg:px-4" data-testid="section-why-us">
          <ScrollValueCards
            cards={[
              {
                icon: TrendingUp,
                title: "Maximum ROI",
                bullets: [
                  "Average 7x return on investment",
                  "Some clients achieving up to 14x ROI",
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
        <section id="partners" className="py-2 px-2 sm:px-3 lg:px-4" data-testid="section-partners">
          <div className="relative mx-auto" style={{ width: "95%", maxWidth: "2400px" }}>
            <div 
              className="relative rounded-2xl px-8 py-12"
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Animated hexagon background */}
              <div className="absolute inset-0 overflow-hidden" style={{ background: "#0a0a0a" }}>
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hexPatternPartners" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                      <polygon
                        points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                        fill="none"
                        stroke="rgba(255, 0, 0, 0.2)"
                        strokeWidth="1"
                      />
                      <polygon
                        points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                        fill="rgba(255, 0, 0, 0.02)"
                        stroke="none"
                      >
                        <animate
                          attributeName="fill"
                          values="rgba(255, 0, 0, 0.02);rgba(0, 136, 255, 0.05);rgba(0, 255, 136, 0.03);rgba(255, 0, 0, 0.02)"
                          dur="8s"
                          repeatCount="indefinite"
                        />
                      </polygon>
                    </pattern>
                    
                    <pattern id="hexPatternPartnersOffset" x="50" y="43.3" width="100" height="86.6" patternUnits="userSpaceOnUse">
                      <polygon
                        points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                        fill="none"
                        stroke="rgba(0, 136, 255, 0.2)"
                        strokeWidth="1"
                      />
                      <polygon
                        points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                        fill="rgba(0, 136, 255, 0.02)"
                        stroke="none"
                      >
                        <animate
                          attributeName="fill"
                          values="rgba(0, 136, 255, 0.02);rgba(0, 255, 136, 0.05);rgba(255, 0, 0, 0.03);rgba(0, 136, 255, 0.02)"
                          dur="8s"
                          begin="2s"
                          repeatCount="indefinite"
                        />
                      </polygon>
                    </pattern>
                  </defs>
                  
                  <rect width="100%" height="100%" fill="url(#hexPatternPartners)">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 25,43.3; 0,0"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect width="100%" height="100%" fill="url(#hexPatternPartnersOffset)">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; -25,-43.3; 0,0"
                      dur="25s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </svg>
              </div>

              {/* Dark frosted glass overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
                    Some of Our Partners
                  </h2>
                </div>
                <PartnerLogos />
                
                {/* Metrics Section */}
                <div className="mt-12" data-testid="section-metrics">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCounter value={98} suffix="%" label="Client Satisfaction" icon={Heart} />
                    <StatCounter value={7} suffix="x" label="Average ROI" delay={0.1} icon={TrendingUp} />
                    <StatCounter value={15} suffix="+" label="Years of Experience" delay={0.2} icon={Award} />
                    <StatCounter value={95} suffix="%" label="Client Retention" delay={0.3} icon={Users} />
                  </div>
                </div>

                {/* Testimonials Section */}
                <div className="mt-12">
                  <TestimonialsCarousel />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <StickyConversionBar />

      <section className="w-full" data-testid="section-cta" style={{
        background: 'linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(20, 20, 20) 100%)',
        boxShadow: 'inset 0 2px 4px rgba(255, 0, 0, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 0, 0, 0.15)'
      }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
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
