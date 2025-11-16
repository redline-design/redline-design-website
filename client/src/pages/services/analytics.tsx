import ServicePageTemplate from "@/components/ServicePageTemplate";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <ServicePageTemplate
      icon={BarChart3}
      title="Analytics & Data Analysis"
      tagline="Know exactly what's working (and what's not)"
      description="Track everything. Understand your customers. Make data-driven decisions."
      whatYouGet={[
        "Google Analytics 4 setup and configuration",
        "Custom dashboards showing your key metrics",
        "Conversion tracking for all your goals",
        "Monthly insights reports in plain English",
        "Data-driven recommendations"
      ]}
      perfectFor="Businesses tired of guessing what drives results"
      timeline="1 week setup, ongoing monthly reports"
      investment="Included with all marketing plans"
      status="accepting"
      accentColor="rgb(236, 72, 153)"
    />
  );
}
