import { Shield, Server, Headphones, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ServiceHero, BenefitsGrid, PricingSection, IncludedGrid, ServiceCTA } from "@/components/service-sections";

const benefits = [
  {
    icon: Shield,
    title: "Proactive Security",
    description: "Multi-layered cybersecurity with 24/7 threat monitoring, endpoint protection, and incident response to keep your business safe from evolving digital threats.",
  },
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "Complete oversight of your servers, networks, and cloud environments. We handle updates, patches, and performance optimization so nothing falls through the cracks.",
  },
  {
    icon: Headphones,
    title: "Dedicated Help Desk",
    description: "Fast, friendly support from real technicians who know your systems. Get expert help when you need it \u2014 not automated ticket runarounds.",
  },
  {
    icon: Clock,
    title: "99.9% Uptime Guarantee",
    description: "We proactively monitor your systems around the clock, catching and resolving issues before they impact your team's productivity.",
  },
];

const dashboardMetrics = [
  { label: "Network Uptime", value: "99.97%" },
  { label: "Threats Blocked", value: "2,847" },
  { label: "Tickets Resolved", value: "156" },
  { label: "Avg Response", value: "< 15 min" },
  { label: "Endpoints Active", value: "342" },
  { label: "Patches Applied", value: "1,203" },
  { label: "Backup Status", value: "All Clear" },
  { label: "Security Score", value: "A+" },
];

const plans = [
  {
    name: "Lite",
    price: "$19",
    period: "/computer/month",
    features: [
      "Managed Anti-Virus",
      "Managed Updates",
      "Managed Document Backup",
    ],
  },
  {
    name: "Small Business",
    price: "$29",
    period: "/computer/month",
    popular: true,
    features: [
      "Managed Anti-Virus",
      "Full Patch Management",
      "Hardware and Software Monitoring",
      "Asset Tracking",
      "Remote Password Reset",
    ],
  },
  {
    name: "Enterprise",
    price: "$39",
    period: "/computer/month",
    features: [
      "Everything in Small Business",
      "Full Backup Management",
      "Automated Remediation of Common Problems",
      "Web Filtering",
      "Risk Assessment Reports",
      "Weekly Status Reports",
    ],
  },
];

const includedItems = [
  { title: "Servers & Workstations" },
  { title: "Network Infrastructure" },
  { title: "Cloud Environments" },
  { title: "Email & Collaboration Tools" },
  { title: "Data Backup & Recovery" },
  { title: "Security & Compliance" },
  { title: "Software Licensing" },
  { title: "Vendor Coordination" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ManagedITPage() {
  return (
    <div data-testid="page-managed-it">
      <ServiceHero
        title="Managed IT Services"
        subtitle="Your Mission Control for Technology"
        description="Stop worrying about servers, security, and downtime. Our managed IT services give your business enterprise-grade infrastructure, proactive monitoring, and dedicated support \u2014 so you can focus on growth while we keep everything running at light speed."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-health-dashboard">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              data-testid="text-dashboard-heading"
            >
              System Health Dashboard
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-dashboard-subtitle">
              Real-time visibility into your entire IT environment
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {dashboardMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-5 md:p-6 rounded-md text-center"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-metric-${index}`}
              >
                <p
                  className="text-white/50 text-xs md:text-sm mb-2"
                  data-testid={`text-metric-label-${index}`}
                >
                  {metric.label}
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold text-green-400"
                  data-testid={`text-metric-value-${index}`}
                >
                  {metric.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PricingSection
        plans={plans}
        footnote="All plans include onboarding, asset documentation, and a dedicated team that knows your business inside and out."
      />

      <IncludedGrid
        title="What We Manage"
        subtitle="Comprehensive IT management tailored to your business"
        items={includedItems}
        columns={4}
      />

      <ServiceCTA />
    </div>
  );
}
