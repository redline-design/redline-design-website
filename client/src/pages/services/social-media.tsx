import ServicePageTemplate from "@/components/ServicePageTemplate";
import { MessageSquare } from "lucide-react";

export default function SocialMediaPage() {
  return (
    <ServicePageTemplate
      icon={MessageSquare}
      title="Social Media Marketing"
      tagline="Turn followers into customers"
      description="Build your brand and engage your audience."
      whatYouGet={[
        "Content calendar with engaging posts",
        "Professional copywriting and graphics",
        "Community management and engagement",
        "Paid social advertising campaigns",
        "Monthly performance analytics"
      ]}
      perfectFor="Businesses looking to build brand awareness and community"
      timeline="Ongoing monthly retainer"
      investment="Starting at $1,200/month"
      status="accepting"
      accentColor="rgb(59, 130, 246)"
    />
  );
}
