import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Mail } from "lucide-react";

export default function EmailMarketingPage() {
  return (
    <ServicePageTemplate
      icon={Mail}
      title="Email Marketing"
      tagline="Build relationships that convert"
      description="Nurture leads and drive conversions with targeted campaigns."
      whatYouGet={[
        "Automated welcome and nurture sequences",
        "Monthly newsletter campaigns",
        "Segmentation and personalization",
        "A/B testing for optimization",
        "List growth strategies"
      ]}
      perfectFor="Businesses with an audience ready to be nurtured"
      timeline="1 week setup, ongoing campaigns"
      investment="Starting at $1,000/month"
      status="accepting"
      accentColor="rgb(34, 197, 94)"
    />
  );
}
