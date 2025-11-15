import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import redlineLogo from "@assets/thumbnail_Asset 1_1763247131194.png";

const Home = lazy(() => import("@/pages/Home"));

export default function LaptopIntro() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHomepage, setShowHomepage] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const services = [
    "SEO", "PPC", "Web Design", "Social Media", "Email Marketing", "Content Marketing",
    "Analytics", "Conversion Rate", "Brand Strategy", "Lead Generation", "CRM",
    "Digital Consulting", "Google Ads", "Meta Ads", "ROI Tracking", "Performance Marketing",
    "Paid Search", "Organic Growth", "Video Marketing", "Influencer Marketing",
    "Retargeting Ads", "Landing Pages", "A/B Testing", "Sales Funnels",
    "Marketing Automation", "Copywriting", "Branding", "Graphic Design", "UI/UX Design",
    "Mobile Marketing", "E-commerce Marketing", "Shopify Optimization", "WordPress SEO",
    "Web Development", "Page Speed", "Core Web Vitals", "Site Security", "SSL Certificates",
    "Link Building", "Keyword Research", "SERP Rankings", "Organic Traffic",
    "User Engagement", "Social Following", "Content Shares", "User Comments",
    "Viral Content", "Trending Topics", "Hashtag Strategy", "Instagram Stories",
    "TikTok Reels", "YouTube Ads", "LinkedIn Marketing", "Instagram Ads",
    "Facebook Campaigns", "Twitter Ads", "Pinterest Marketing", "Snapchat Ads",
    "Reddit Marketing", "Email Campaigns", "Drip Campaigns", "Segmentation",
    "Customer Personas", "Buyer Journey", "Marketing Touchpoints", "Multi-Touch Attribution",
    "Performance Metrics", "Marketing KPIs", "Analytics Dashboard", "Monthly Reports",
    "Data Insights", "Business Growth", "Scale Revenue", "Increase Sales",
    "Maximize Profit", "Quality Leads", "Sales Pipeline", "Customer Acquisition",
    "Customer Retention", "Brand Loyalty", "Referral Programs", "Online Reviews",
    "Client Testimonials", "Brand Trust", "Industry Authority", "Subject Matter Expertise",
    "Proven Results", "Marketing Success", "Campaign Optimization", "Growth Strategy",
    "Marketing Planning", "Campaign Execution", "Display Ads", "Banner Ads",
    "Native Advertising", "Sponsored Content", "Search Engine Marketing", "Local SEO",
    "National SEO", "International SEO", "Voice Search", "Mobile SEO", "Technical SEO",
    "On-Page SEO", "Off-Page SEO", "Schema Markup", "Rich Snippets", "Featured Snippets",
    "Google My Business", "Local Listings", "Citation Building", "Reputation Management",
    "Brand Monitoring", "Social Listening", "Competitor Analysis", "Market Research",
    "Audience Research", "Conversion Tracking", "Goal Tracking", "Event Tracking",
    "Heatmaps", "Session Recording", "User Testing", "Customer Feedback",
    "Net Promoter Score", "Customer Satisfaction", "Bounce Rate", "Time On Site",
    "Pages Per Session", "Click-Through Rate", "Cost Per Click", "Cost Per Lead",
    "Cost Per Acquisition", "Lifetime Value", "Return On Ad Spend", "Marketing ROI",
    "Budget Allocation", "Bid Management", "Ad Scheduling", "Geo-Targeting",
    "Demographic Targeting", "Behavioral Targeting", "Contextual Targeting",
    "Interest Targeting", "Lookalike Audiences", "Custom Audiences", "Remarketing Lists",
    "Dynamic Remarketing", "Shopping Ads", "Product Feed", "Catalog Marketing",
  ];

  useEffect(() => {
    if (isPlaying && !prefersReducedMotion) {
      // Show homepage behind words after 3 seconds
      const showTimer = setTimeout(() => {
        setShowHomepage(true);
      }, 3000);
      
      // Navigate to homepage after zoom completes (5s)
      const navTimer = setTimeout(() => {
        setLocation("/");
      }, 6000);
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(navTimer);
      };
    }
  }, [isPlaying, prefersReducedMotion, setLocation]);

  const handleLaptopClick = () => {
    if (!prefersReducedMotion) {
      setIsPlaying(true);
    } else {
      setLocation("/");
    }
  };

  if (prefersReducedMotion) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <button
          onClick={handleLaptopClick}
          className="flex flex-col items-center gap-6"
          data-testid="button-skip-intro"
        >
          <img 
            src={redlineLogo} 
            alt="Redline Design" 
            className="h-32 md:h-48 w-auto"
          />
          <span className="text-lg text-muted-foreground">Click to continue</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`laptop-intro-container ${isPlaying ? 'playing' : ''}`}>
      <div className="laptop-intro-wrapper">
        <div className="laptop-intro-scene">
          <div className="laptop-base"></div>
          
          <div 
            className={`laptop-screen ${isPlaying ? 'opening' : ''}`}
            onClick={!isPlaying ? handleLaptopClick : undefined}
            data-testid="laptop-screen"
          >
            {!isPlaying && (
              <div className="laptop-click-prompt">
                <span className="text-lg font-semibold text-white">Click to Start</span>
              </div>
            )}
            
            <div className="laptop-bezel">
              <div className={`service-word-slider ${isPlaying ? 'active' : ''}`} data-testid="service-word-slider">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="grid-item"
                    data-index={index + 1}
                  >
                    {service}
                  </div>
                ))}
                <div className="grid-item special">
                  <img 
                    src={redlineLogo} 
                    alt="Redline Design" 
                    className="logo-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showHomepage && (
        <div className="homepage-preview">
          <Suspense fallback={<div />}>
            <Home />
          </Suspense>
        </div>
      )}
    </div>
  );
}
