import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Database } from "lucide-react";

export default function CRMPage() {
  return (
    <ServicePageTemplate
      icon={Database}
      title="CRM Setup & Automation"
      tagline="Never lose track of a lead again"
      description="Streamline your customer relationships and automate workflows."
      whatYouGet={[
        "Custom CRM setup tailored to your business",
        "Automated follow-up sequences",
        "Lead scoring and qualification",
        "Integration with your existing tools",
        "Team training and ongoing support"
      ]}
      perfectFor="Businesses drowning in spreadsheets and missed opportunities"
      timeline="1-2 weeks setup, ongoing optimization"
      investment="Starting at $1,000 one-time + $100/month per user added"
      status="accepting"
    />
  );
}
