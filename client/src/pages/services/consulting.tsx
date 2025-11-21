import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Users } from "lucide-react";

export default function ConsultingPage() {
  return (
    <div>
      <div className="layout">
        <div className="layout-box">
          High-end, full-service<br />digital marketing<br />for growing brands.
        </div>
      </div>
      <ServicePageTemplate
        icon={Users}
        title="Consulting"
        tagline="Expert advice without the agency price tag"
        description="Strategic guidance to grow your business."
        whatYouGet={[
          "Strategic marketing planning sessions",
          "Channel and budget recommendations",
          "Competitive analysis and positioning",
          "Growth roadmap and implementation plan",
          "Ongoing advisory support"
        ]}
        perfectFor="Business owners who want expert guidance, not full service"
        timeline="Flexible engagement"
        investment="Starting at $200/hour"
        status="accepting"
        accentColor="rgb(168, 85, 247)"
      />
    </div>
  );
}
