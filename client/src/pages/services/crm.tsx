import { ServiceHero, BenefitsGrid, PricingSection, IncludedGrid, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  Layers,
} from "lucide-react";
import { useState } from "react";

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
    name: "Starter",
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
    name: "Growth",
    price: "$109",
    period: "/user/month",
    popular: true,
    features: [
      "Everything in Starter",
      "Up to 10 pipelines",
      "Power Dialer",
      "AI Email Assistant",
      "Email sequences & automation",
      "Advanced reporting & analytics",
      "Custom fields & workflows",
    ],
  },
  {
    name: "Pro",
    price: "$149",
    period: "/user/month",
    features: [
      "Everything in Growth",
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
  { title: "Email Templates", icon: Mail },
  { title: "SMS Campaigns", icon: Smartphone },
  { title: "Call Recording & Tracking", icon: Phone },
  { title: "Sales Pipeline Stages", icon: Filter },
  { title: "Lead Scoring Rules", icon: BarChart3 },
  { title: "Automated Follow-ups", icon: GitBranch },
  { title: "Custom Dashboards", icon: Layers },
  { title: "Team Training Sessions", icon: Users },
];

export default function CRMPage() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { ref: ecoRef, inView: ecoInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div data-testid="page-crm">
      <ServiceHero
        title="CRM Integration"
        subtitle="Unify Your Customer Data"
        description="Streamline your sales pipeline and customer management with a powerful CRM that connects every touchpoint. From lead capture to deal close, manage your entire customer journey in one unified platform."
      />

      <BenefitsGrid benefits={benefits} />

      {/* CRM Ecosystem Infographic */}
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-crm-ecosystem" data-section-label="Ecosystem" ref={ecoRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-ecosystem-heading"
            >
              The CRM Ecosystem
            </h2>
            <p
              className="text-white/80 text-base md:text-lg"
              data-testid="text-ecosystem-subtitle"
            >
              Everything connects to your central hub for seamless management
            </p>
          </motion.div>

          {/* Central Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={ecoInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-8"
          >
            <div
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,0,0,0.2), rgba(255,0,0,0.08))",
                border: "1px solid rgba(255,0,0,0.4)",
                boxShadow: "0 0 40px rgba(255,0,0,0.15), inset 0 0 20px rgba(255,0,0,0.05)",
              }}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" style={{ opacity: 0.12 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 9}%`, background: "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={ecoInView ? { opacity: [0, 0.15, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(255,0,0,0.3) 50%, transparent 60%)" }} />
              </motion.div>
              <Layers className="w-7 h-7 md:w-8 md:h-8 text-red-500 mb-1" />
              <span className="text-xs font-bold text-white tracking-wider uppercase">CRM</span>
              <span className="text-[10px] text-white/50 font-mono">HUB</span>
            </div>
          </motion.div>

          {/* Spoke Items - Simple grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {ecosystemItems.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredItem === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={ecoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative cursor-pointer"
                  data-testid={`card-ecosystem-${index}`}
                >
                  <div
                    className="relative overflow-hidden rounded-lg p-4 md:p-5 transition-all duration-300"
                    style={{
                      background: isHovered ? "rgba(255, 0, 0, 0.08)" : "rgba(12, 12, 12, 0.9)",
                      border: isHovered ? "1px solid rgba(255,0,0,0.35)" : "1px solid rgba(255, 255, 255, 0.06)",
                      boxShadow: isHovered ? "0 8px 30px rgba(255,0,0,0.1)" : "none",
                      transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                    }}
                  >
                    {/* Digital grid overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={`h-${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 18}%`, background: "rgba(255,255,255,0.3)" }} />
                      ))}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * 22}%`, background: "rgba(255,255,255,0.3)" }} />
                      ))}
                    </div>

                    {/* Scan sweep */}
                    <motion.div
                      className="absolute inset-y-0 w-[30%] pointer-events-none"
                      initial={{ left: "-30%" }}
                      animate={ecoInView ? { left: ["-30%", "130%"] } : {}}
                      transition={{
                        duration: 2,
                        delay: index * 0.3 + 1.5,
                        repeat: Infinity,
                        repeatDelay: 6 + index * 0.5,
                        ease: "linear",
                      }}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.08), transparent)",
                      }}
                    />

                    {/* Left accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      initial={{ scaleY: 0 }}
                      animate={ecoInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.08 + 0.4 }}
                      style={{
                        background: "linear-gradient(180deg, #ff0000, rgba(255,0,0,0.3))",
                        transformOrigin: "top",
                        boxShadow: "0 0 6px rgba(255,0,0,0.3)",
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-3">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isHovered ? "rgba(255,0,0,0.2)" : "rgba(255,0,0,0.08)",
                          border: `1px solid rgba(255,0,0,${isHovered ? 0.5 : 0.15})`,
                          boxShadow: isHovered ? "0 0 12px rgba(255,0,0,0.2)" : "none",
                        }}
                      >
                        <Icon className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-sm font-bold text-white mb-0.5 tracking-wide"
                          data-testid={`text-ecosystem-title-${index}`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-white/60 text-xs leading-relaxed"
                          data-testid={`text-ecosystem-description-${index}`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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

      <ServiceCTA preSelectedServices={["crm-setup"]} />
    </div>
  );
}
