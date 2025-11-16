import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Code } from "lucide-react";

export default function AppDevelopmentPage() {
  return (
    <ServicePageTemplate
      icon={Code}
      title="App Development"
      tagline="Build exactly what you need, nothing you don't"
      description="Bespoke software solutions tailored to your business needs."
      whatYouGet={[
        "Custom web and mobile applications",
        "API development and integrations",
        "Database design and optimization",
        "User-friendly admin dashboards",
        "Ongoing maintenance and support"
      ]}
      perfectFor="Businesses with unique processes that off-the-shelf solutions can't handle"
      timeline="4-12 weeks depending on complexity"
      investment="Starting at $5,000"
      status="accepting"
    />
  );
}
