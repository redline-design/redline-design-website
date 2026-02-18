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
  { title: "Email Templates" },
  { title: "SMS Campaigns" },
  { title: "Call Recording & Tracking" },
  { title: "Sales Pipeline Stages" },
  { title: "Lead Scoring Rules" },
  { title: "Automated Follow-ups" },
  { title: "Custom Dashboards" },
  { title: "Team Training Sessions" },
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
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-crm-ecosystem" ref={ecoRef}>
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

          {/* Hub and Spoke Infographic */}
          <div className="relative">
            {/* Central Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={ecoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-8 md:mb-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20"
            >
              <div
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl flex flex-col items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,0,0.2), rgba(255,0,0,0.08))",
                  border: "1px solid rgba(255,0,0,0.4)",
                  boxShadow: "0 0 40px rgba(255,0,0,0.15), inset 0 0 20px rgba(255,0,0,0.05)",
                }}
              >
                {/* Scan lines on hub */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" style={{ opacity: 0.12 }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 7.5}%`, background: "rgba(255,255,255,0.2)" }} />
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
                <Layers className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-1" />
                <span className="text-xs md:text-sm font-bold text-white tracking-wider uppercase">CRM</span>
                <span className="text-[10px] text-white/50 font-mono">HUB</span>
              </div>
            </motion.div>

            {/* Spoke Items - Grid around hub */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:min-h-[420px]">
              {ecosystemItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredItem === index;
                const isTopRow = index < 4;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: isTopRow ? -20 : 20 }}
                    animate={ecoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative cursor-pointer transition-all duration-300 ${isTopRow ? "md:self-start" : "md:self-end"}`}
                    data-testid={`card-ecosystem-${index}`}
                  >
                    <div
                      className="relative overflow-hidden rounded-lg p-4 md:p-5"
                      style={{
                        background: isHovered ? "rgba(255, 0, 0, 0.08)" : "rgba(12, 12, 12, 0.9)",
                        border: isHovered ? "1px solid rgba(255,0,0,0.35)" : "1px solid rgba(255, 255, 255, 0.06)",
                        boxShadow: isHovered ? "0 8px 30px rgba(255,0,0,0.1)" : "none",
                        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                      }}
                    >
                      {/* Digital grid overlay */}
                      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={`h-${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 15}%`, background: "rgba(255,255,255,0.3)" }} />
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

                      <div className="relative z-10 flex items-start gap-3">
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

                      {/* Connection indicator dot */}
                      <div className="absolute hidden md:block" style={{
                        ...(isTopRow
                          ? { bottom: "-6px", left: "50%", transform: "translateX(-50%)" }
                          : { top: "-6px", left: "50%", transform: "translateX(-50%)" }
                        ),
                      }}>
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: isHovered ? "#ff0000" : "rgba(255,0,0,0.4)",
                            boxShadow: isHovered ? "0 0 8px rgba(255,0,0,0.6)" : "none",
                          }}
                          animate={ecoInView ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Connection lines (desktop only) */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10" style={{ top: 0, left: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,0,0,0.05)" />
                  <stop offset="50%" stopColor="rgba(255,0,0,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,0,0,0.05)" />
                </linearGradient>
              </defs>
              {/* Horizontal line through center */}
              <motion.line
                x1="0" y1="50%" x2="100%" y2="50%"
                stroke="url(#lineGrad)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={ecoInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
              {/* Vertical line through center */}
              <motion.line
                x1="50%" y1="10%" x2="50%" y2="90%"
                stroke="url(#lineGrad)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={ecoInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
            </svg>
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

      <ServiceCTA />
    </div>
  );
}
