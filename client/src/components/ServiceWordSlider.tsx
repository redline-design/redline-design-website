import { useReducedMotion } from "@/hooks/useReducedMotion";
import redlineLogo from "@assets/generated_images/Redline_R_ribbon_logo_b3fc5c04.png";

export default function ServiceWordSlider() {
  const prefersReducedMotion = useReducedMotion();

  const services = [
    "SEO",
    "PPC",
    "Web Design",
    "Social Media",
    "Email Marketing",
    "Content",
    "Analytics",
    "Conversion",
    "Brand Strategy",
    "Lead Generation",
    "CRM",
    "Consulting",
    "Google Ads",
    "Meta Ads",
    "ROI Tracking",
    "Marketing",
    "Paid Ads",
    "Organic Growth",
    "Video Marketing",
    "Influencer",
    "Retargeting",
    "Landing Pages",
    "A/B Testing",
    "Funnels",
    "Automation",
    "Copywriting",
    "Branding",
    "Graphic Design",
    "UI/UX",
    "Mobile Apps",
    "E-commerce",
    "Shopify",
    "WordPress",
    "React",
    "Performance",
    "Speed",
    "Hosting",
    "Security",
    "SSL",
    "Backlinks",
    "Keywords",
    "Rankings",
    "Traffic",
    "Engagement",
    "Followers",
    "Likes",
    "Shares",
    "Comments",
    "Viral",
    "Trending",
    "Hashtags",
    "Stories",
    "Reels",
    "TikTok",
    "YouTube",
    "LinkedIn",
    "Instagram",
    "Facebook",
    "Twitter",
    "Pinterest",
    "Snapchat",
    "Reddit",
    "Threads",
    "Campaigns",
    "Targeting",
    "Audiences",
    "Segments",
    "Personas",
    "Journeys",
    "Touchpoints",
    "Attribution",
    "Metrics",
    "KPIs",
    "Dashboard",
    "Reports",
    "Insights",
    "Data",
    "Growth",
    "Scale",
    "Revenue",
    "Profit",
    "Leads",
    "Sales",
    "Customers",
    "Retention",
    "Loyalty",
    "Referrals",
    "Reviews",
    "Testimonials",
    "Trust",
    "Authority",
    "Expertise",
    "Results",
    "Success",
    "Optimization",
    "Strategy",
    "Planning",
    "Execution",
  ];

  if (prefersReducedMotion) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <img 
          src={redlineLogo} 
          alt="Redline Design" 
          className="h-32 md:h-48 w-auto"
        />
      </div>
    );
  }

  return (
    <div className="service-word-slider-container">
      <div className="service-word-slider" data-testid="service-word-slider">
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
  );
}
