import { Zap, Users, FlaskConical, BarChart3 } from "lucide-react";
import { ServiceHero, BenefitsGrid, PricingSection, IncludedGrid, ServiceCTA } from "@/components/service-sections";

const benefits = [
  {
    icon: Zap,
    title: "Automated Sequences",
    description: "Set up automated email flows that nurture leads through your sales funnel without lifting a finger.",
  },
  {
    icon: Users,
    title: "Segmentation",
    description: "Deliver personalized content based on behavior, demographics, and purchase history for maximum relevance.",
  },
  {
    icon: FlaskConical,
    title: "A/B Testing",
    description: "Continuously optimize subject lines, content, and send times to maximize open rates and conversions.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track opens, clicks, conversions, and revenue attribution to understand exactly what drives results.",
  },
];

const plans = [
  {
    name: "Cruiser",
    price: "$500",
    period: "/month",
    features: [
      "Up to 5,000 subscribers",
      "4 campaigns per month",
      "Welcome sequence setup",
      "Basic segmentation",
      "Monthly reporting",
    ],
  },
  {
    name: "Turbo",
    price: "$1,000",
    period: "/month",
    popular: true,
    features: [
      "Up to 25,000 subscribers",
      "8 campaigns per month",
      "Advanced automation sequences",
      "Dynamic segmentation",
      "A/B testing",
      "Bi-weekly reporting",
      "Landing page design",
    ],
  },
  {
    name: "Redline",
    price: "$2,000",
    period: "/month",
    features: [
      "Unlimited subscribers",
      "Unlimited campaigns",
      "Full automation suite",
      "Advanced personalization",
      "Revenue attribution",
      "Weekly strategy calls",
      "Dedicated email specialist",
    ],
  },
];

const includedItems = [
  { title: "Template Design" },
  { title: "List Management" },
  { title: "Deliverability Optimization" },
  { title: "Spam Compliance" },
  { title: "Analytics Dashboard" },
  { title: "Unsubscribe Management" },
];

export default function EmailMarketingPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero
        title="Email Marketing"
        subtitle="Build Relationships That Convert"
        description="Nurture leads and drive conversions with targeted email campaigns that deliver the right message to the right person at the right time. From welcome sequences to re-engagement campaigns, every email is crafted for results."
      />

      <BenefitsGrid benefits={benefits} />

      <PricingSection plans={plans} />

      <IncludedGrid title="Every Plan Includes" items={includedItems} />

      <ServiceCTA />
    </div>
  );
}
