import ServicePageTemplate from "@/components/ServicePageTemplate";
import { TrendingUp } from "lucide-react";

export default function PaidAdvertisingPage() {
  return (
    <ServicePageTemplate
      icon={TrendingUp}
      title="Paid Advertising"
      tagline="Get customers today, not months from now"
      description="Focusing on maximum ROI."
      whatYouGet={[
        "Google Ads campaigns targeting your ideal customers",
        "Facebook & Instagram ads that actually convert",
        "A/B tested ad copy and creative",
        "Daily monitoring and optimization",
        "Transparent reporting on every dollar spent"
      ]}
      perfectFor="Businesses ready to invest in immediate, measurable growth"
      timeline="See results in 1-2 weeks"
      investment="25% of ad spend (min $500/month)"
      status="accepting"
    />
  );
}
