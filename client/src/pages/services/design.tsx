import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Palette } from "lucide-react";

export default function DesignPage() {
  return (
    <ServicePageTemplate
      icon={Palette}
      title="Graphic Design"
      tagline="Stand out in a sea of boring brands"
      description="Eye-catching visuals that convert."
      whatYouGet={[
        "Custom logo and brand identity",
        "Social media graphics that stop the scroll",
        "Email templates that get opened",
        "Ad creatives optimized for conversions",
        "Unlimited revisions until you love it"
      ]}
      perfectFor="Businesses that know first impressions matter"
      timeline="1+ weeks depending on scope"
      investment="Starting at $200 per project"
      status="accepting"
      accentColor="rgb(249, 115, 22)"
    />
  );
}
