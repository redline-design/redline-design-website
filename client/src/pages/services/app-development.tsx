import { Code, Layers, Maximize, Wrench } from "lucide-react";
import { ServiceHero, BenefitsGrid, PricingSection, IncludedGrid, ServiceCTA } from "@/components/service-sections";

const benefits = [
  {
    icon: Code,
    title: "Custom Solutions",
    description: "Purpose-built applications designed around your specific business processes, not the other way around.",
  },
  {
    icon: Layers,
    title: "Modern Tech Stack",
    description: "Built with industry-leading technologies like React, Node.js, and cloud infrastructure for reliability and performance.",
  },
  {
    icon: Maximize,
    title: "Scalable Architecture",
    description: "Designed to handle growth from day one, with clean code and modular architecture that's easy to maintain.",
  },
  {
    icon: Wrench,
    title: "Ongoing Support",
    description: "We don't just build and disappear. Ongoing maintenance, updates, and support keep your application running smoothly.",
  },
];

const plans = [
  {
    name: "Cruiser",
    price: "$5,000",
    period: ", One-time",
    features: [
      "Simple web application",
      "Up to 5 core features",
      "Responsive design",
      "Basic authentication",
      "30 days of support",
    ],
  },
  {
    name: "Turbo",
    price: "$15,000",
    period: ", One-time",
    popular: true,
    features: [
      "Complex web application",
      "Up to 15 features",
      "Custom integrations",
      "Admin dashboard",
      "User management",
      "90 days of support",
    ],
  },
  {
    name: "Redline",
    price: "Contact Us",
    period: ", Custom pricing",
    features: [
      "Full-scale platform",
      "Unlimited features",
      "API development",
      "Cloud infrastructure",
      "Dedicated project manager",
      "Ongoing maintenance",
      "SLA guarantee",
    ],
  },
];

const techItems = [
  { title: "React & Next.js" },
  { title: "Node.js & Express" },
  { title: "PostgreSQL & MongoDB" },
  { title: "AWS & Cloud" },
  { title: "REST & GraphQL APIs" },
  { title: "CI/CD Pipeline" },
];

export default function AppDevelopmentPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero
        title="App Development"
        subtitle="Build Exactly What You Need"
        description="From web applications to mobile apps, we build custom software solutions tailored to your business. Clean code, modern architecture, and scalable infrastructure that grows with you."
      />

      <BenefitsGrid benefits={benefits} />

      <PricingSection plans={plans} />

      <IncludedGrid title="Technologies We Use" items={techItems} columns={3} />

      <ServiceCTA />
    </div>
  );
}
