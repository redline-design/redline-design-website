import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Globe } from "lucide-react";

export default function WebsitesPage() {
  return (
    <ServicePageTemplate
      icon={Globe}
      title="World Class Websites"
      tagline="Your digital storefront that works 24/7"
      description="Unique websites at reasonable prices."
      whatYouGet={[
        "Mobile-responsive design that looks great on any device",
        "Fast loading speeds (under 3 seconds)",
        "SEO-optimized structure from day one",
        "Easy-to-update content management system",
        "Secure hosting and SSL certificate available"
      ]}
      perfectFor="Businesses that need a professional online presence without breaking the bank"
      timeline="2-4 weeks"
      investment="Starting at $1,000"
      status="accepting"
      accentColor="rgb(96, 165, 250)"
    />
  );
}
