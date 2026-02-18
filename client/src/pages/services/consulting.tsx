import { Search, Map, DollarSign, GraduationCap } from "lucide-react";
import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";

const benefits = [
  {
    icon: Search,
    title: "Marketing Audits",
    description: "Comprehensive analysis of your current marketing efforts with clear recommendations for improvement and growth.",
  },
  {
    icon: Map,
    title: "Channel Strategy",
    description: "Identify the right marketing channels for your business and develop a roadmap for maximum impact.",
  },
  {
    icon: DollarSign,
    title: "Budget Planning",
    description: "Optimize your marketing spend with data-driven budget allocation across channels for the best ROI.",
  },
  {
    icon: GraduationCap,
    title: "Team Coaching",
    description: "Empower your in-house team with training sessions and ongoing advisory support.",
  },
];

const plans = [
  {
    name: "Misc Hourly Work",
    price: "$250",
    period: "/hour",
    description: "One-on-one consulting with a senior digital marketing strategist",
    features: [
      "Marketing audit & analysis",
      "Channel strategy development",
      "Budget optimization",
      "Competitive analysis",
      "Growth roadmap",
      "Team training sessions",
      "Ongoing advisory support",
      "Monthly check-ins",
    ],
  },
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero
        title="Digital Marketing Consulting"
        subtitle="Expert Guidance for Your Growth"
        description="Get strategic advice from experienced digital marketing professionals. Whether you need a full marketing audit, channel strategy, or hands-on coaching, we provide actionable insights that drive real results."
      />

      <BenefitsGrid benefits={benefits} />

      <PricingSection
        plans={plans}
        subtitle="Flexible hourly support for any project need"
        footnote="Retainer packages available for ongoing consulting. Contact us for custom arrangements."
      />

      <ServiceCTA />
    </div>
  );
}
