import { ServiceHero, BenefitsGrid, PricingSection, IncludedGrid, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import {
  Zap,
  Database,
  MessageSquare,
  BarChart3,
  Mail,
  GitBranch,
  Smartphone,
  Phone,
  Filter,
  Users,
  FileText,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Automated Workflows",
    description:
      "Eliminate manual tasks and let your CRM handle repetitive processes automatically, freeing your team to focus on closing deals.",
  },
  {
    icon: Database,
    title: "Unified Data",
    description:
      "Get a 360-degree view of every customer with all interactions, purchases, and communications consolidated in one platform.",
  },
  {
    icon: MessageSquare,
    title: "Smart Communication",
    description:
      "Manage texts, emails, and phone calls all in one place. Never miss a follow-up or let a lead slip through the cracks.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track every interaction and measure performance with detailed reporting dashboards that reveal what's working and what needs attention.",
  },
];

const ecosystemItems = [
  { icon: Mail, title: "Email Templates", description: "Custom branded templates" },
  { icon: GitBranch, title: "Workflows", description: "Automated task sequences" },
  { icon: Smartphone, title: "Texting & SMS", description: "Two-way messaging" },
  { icon: Phone, title: "Phone Calls", description: "Call tracking & recording" },
  { icon: Filter, title: "Pipeline", description: "Visual deal stages" },
  { icon: Users, title: "Contacts", description: "Unified customer profiles" },
  { icon: BarChart3, title: "Reporting", description: "Real-time dashboards" },
  { icon: FileText, title: "Documents", description: "Proposals & contracts" },
];

const plans = [
  {
    name: "Lunar",
    price: "$49",
    period: "/user/month",
    features: [
      "Unlimited leads & contacts",
      "Up to 3 pipelines",
      "Built-in calling, SMS & email",
      "Workflow automation",
      "Enhanced reporting",
      "API access",
    ],
  },
  {
    name: "Orbital",
    price: "$109",
    period: "/user/month",
    popular: true,
    features: [
      "Everything in Lunar",
      "Up to 10 pipelines",
      "Power Dialer",
      "AI Email Assistant",
      "Email sequences & automation",
      "Advanced reporting & analytics",
      "Custom fields & workflows",
    ],
  },
  {
    name: "Supernova",
    price: "$149",
    period: "/user/month",
    features: [
      "Everything in Orbital",
      "Up to 25 pipelines",
      "Predictive Dialer",
      "Call coaching & transcription",
      "Role-based permissions",
      "Priority support & dedicated manager",
      "Advanced security (SSO, 2FA)",
    ],
  },
];

const includedItems = [
  { title: "Email Templates" },
  { title: "SMS Campaigns" },
  { title: "Call Recording & Tracking" },
  { title: "Sales Pipeline Stages" },
  { title: "Lead Scoring Rules" },
  { title: "Automated Follow-ups" },
  { title: "Custom Dashboards" },
  { title: "Team Training Sessions" },
];

const ecosystemContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const ecosystemItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function CRMPage() {
  return (
    <div data-testid="page-crm">
      <ServiceHero
        title="CRM Integration"
        subtitle="Unify Your Customer Data"
        description="Streamline your sales pipeline and customer management with a powerful CRM that connects every touchpoint. From lead capture to deal close, manage your entire customer journey in one unified platform."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-crm-ecosystem">
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
              data-testid="text-ecosystem-heading"
            >
              The CRM Ecosystem
            </h2>
            <p
              className="text-white/50 text-base md:text-lg"
              data-testid="text-ecosystem-subtitle"
            >
              Everything connects to your central hub for seamless management
            </p>
          </motion.div>

          <motion.div
            variants={ecosystemContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {ecosystemItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={ecosystemItemVariants}
                  className="p-5 md:p-6 rounded-md text-center"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  data-testid={`card-ecosystem-${index}`}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                  <h3
                    className="text-sm font-semibold text-white mb-1"
                    data-testid={`text-ecosystem-title-${index}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-white/50 text-xs leading-relaxed"
                    data-testid={`text-ecosystem-description-${index}`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <PricingSection
        plans={plans}
        footnote="Volume discounts available for teams of 10+. Includes full onboarding and training."
      />

      <IncludedGrid
        title="What We Set Up For You"
        subtitle="A complete CRM implementation tailored to your business"
        items={includedItems}
        columns={4}
      />

      <ServiceCTA />
    </div>
  );
}
