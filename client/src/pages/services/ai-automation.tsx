import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Bot } from "lucide-react";

export default function AIAutomationPage() {
  return (
    <div>
      <div className="layout">
        <div className="layout-box">
          High-end, full-service<br />digital marketing<br />for growing brands.
        </div>
      </div>
      <ServicePageTemplate
        icon={Bot}
        title="AI Automation"
        tagline="Work smarter with AI-powered automation"
        description="Automate tasks and workflows with cutting-edge AI."
        whatYouGet={[
          "Custom AI chatbots for customer service",
          "Automated content generation workflows",
          "Data analysis and reporting automation",
          "Integration with existing tools",
          "Training and ongoing optimization"
        ]}
        perfectFor="Forward-thinking businesses ready to leverage AI"
        timeline="2-4 weeks implementation"
        investment="Starting at $500 one-time + $300/month. Includes 100,000 interactions/month."
        status="accepting"
        accentColor="rgb(234, 88, 12)"
      />
    </div>
  );
}
