import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Search } from "lucide-react";

export default function SEOPage() {
  return (
    <ServicePageTemplate
      icon={Search}
      title="SEO/SEM"
      tagline="Show up when customers are searching for you"
      description="Get found everywhere, by everyone."
      whatYouGet={[
        "Keyword research to find what your customers search",
        "On-page optimization for better rankings",
        "Content strategy that attracts organic traffic",
        "Local SEO for Google Maps visibility",
        "Monthly reports showing your progress"
      ]}
      perfectFor="Businesses committed to long-term sustainable growth"
      timeline="3-6 months to see significant results"
      investment="Starting at $1,500/month"
      status="waitlist"
      accentColor="rgb(110, 231, 183)"
    />
  );
}
