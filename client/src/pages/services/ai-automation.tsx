import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Zap, Filter, Bot, GraduationCap, Mail, Calendar, UserPlus, Eye, Lightbulb, Scale, MousePointerClick } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Smart Automation",
    description: "Automate repetitive tasks across your business so your team can focus on strategy, creativity, and closing deals.",
  },
  {
    icon: Filter,
    title: "Sales Funnel Design",
    description: "Build high-converting sales funnels that nurture leads on autopilot, guiding prospects from awareness to purchase.",
  },
  {
    icon: Bot,
    title: "Custom AI Solutions",
    description: "Get AI workflows and tools tailored specifically to your business processes, industry, and unique challenges.",
  },
  {
    icon: GraduationCap,
    title: "Expert Training",
    description: "Learn to leverage AI tools yourself with hands-on training sessions that empower your team to stay ahead of the curve.",
  },
];

const funnelStages = [
  { label: "Awareness", description: "Attract prospects through targeted content and advertising", width: "100%", icon: Eye },
  { label: "Interest", description: "Engage leads with valuable resources and personalized outreach", width: "80%", icon: Lightbulb },
  { label: "Decision", description: "Present compelling offers and address objections automatically", width: "60%", icon: Scale },
  { label: "Action", description: "Convert with optimized checkout and onboarding flows", width: "40%", icon: MousePointerClick },
];

const useCases = [
  {
    icon: Bot,
    title: "Lead Qualification Bot",
    description: "AI that scores and routes leads based on behavior, demographics, and engagement to your sales team instantly.",
  },
  {
    icon: Mail,
    title: "Email Nurture Sequences",
    description: "Automated follow-up campaigns that deliver the right message at the right time to move leads through your funnel.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Self-service scheduling funnels that let prospects book calls and demos without back-and-forth emails.",
  },
  {
    icon: UserPlus,
    title: "Customer Onboarding",
    description: "Automated welcome flows that guide new customers through setup, training, and first-value milestones.",
  },
];

const pricingPlans = [
  {
    name: "Custom AI Integration/Training",
    price: "$250",
    period: "/hour",
    description: "Expert-led AI automation and sales funnel development tailored to your business",
    features: [
      "Custom AI workflow design",
      "Sales funnel architecture",
      "Chatbot development",
      "Email automation sequences",
      "Lead scoring systems",
      "Process optimization",
      "Staff training sessions",
      "Ongoing consultation",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AIAutomationPage() {
  return (
    <div data-testid="page-ai-automation">
      <ServiceHero
        title="AI Automation & Sales Funnels"
        subtitle="Harness AI to Grow Your Business"
        description="Automate your marketing workflows and build smart sales funnels that nurture leads and close deals around the clock. From custom AI solutions to staff training, we help you work smarter, not harder."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-sales-funnel" data-section-label="Funnel">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-funnel-heading"
            >
              The Sales Funnel
            </h2>
            <p
              className="text-white/50 text-base md:text-lg"
              data-testid="text-funnel-subtitle"
            >
              Guide prospects through every stage with intelligent automation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            {funnelStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-lg"
                  style={{
                    width: stage.width,
                  }}
                  data-testid={`card-funnel-stage-${index}`}
                >
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, rgba(220, 38, 38, ${0.15 - index * 0.03}), rgba(20, 20, 20, 0.95))`,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  />

                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px),
                        repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)`,
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.04) 50%, transparent 100%)",
                      width: "40%",
                    }}
                    animate={{ x: ["-40%", "300%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                  />

                  <div className="relative z-10 flex items-center gap-4 p-5 md:p-6">
                    <motion.div
                      className="flex-shrink-0 w-11 h-11 rounded flex items-center justify-center"
                      style={{
                        background: "rgba(255,0,0,0.1)",
                        border: "1px solid rgba(255,0,0,0.25)",
                        boxShadow: "0 0 12px rgba(255,0,0,0.1)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 8px rgba(255,0,0,0.1)",
                          "0 0 16px rgba(255,0,0,0.25)",
                          "0 0 8px rgba(255,0,0,0.1)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                    >
                      <Icon className="w-5 h-5 text-red-500" />
                    </motion.div>

                    <div className="flex-1 text-left">
                      <h3
                        className="text-lg font-semibold text-white mb-0.5"
                        data-testid={`text-funnel-stage-title-${index}`}
                      >
                        {stage.label}
                      </h3>
                      <p
                        className="text-white/60 text-sm"
                        data-testid={`text-funnel-stage-description-${index}`}
                      >
                        {stage.description}
                      </p>
                    </div>

                    <motion.div
                      className="flex-shrink-0 flex items-center gap-1.5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider hidden sm:inline">Active</span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 3 }}
                        style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <PricingSection
        plans={pricingPlans}
        footnote="Projects typically range from 10-40 hours depending on complexity. We provide a detailed scope and estimate before starting."
      />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-use-cases" data-section-label="Use Cases">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-use-cases-heading"
            >
              Use Cases
            </h2>
            <p
              className="text-white/50 text-base md:text-lg"
              data-testid="text-use-cases-subtitle"
            >
              Real-world automations that drive measurable results
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const efficiencyValues = [96, 92, 89, 94];
              const effVal = efficiencyValues[index % efficiencyValues.length];
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-lg group"
                  data-testid={`card-use-case-${index}`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "rgba(20, 20, 20, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "0.5rem",
                    }}
                  />

                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px),
                        repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)`,
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(255,0,0,0.03) 50%, transparent 100%)",
                      height: "40%",
                    }}
                    animate={{ y: ["-40%", "250%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 + index * 0.5, ease: "linear" }}
                  />

                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{
                      background: "linear-gradient(180deg, #ff0000, rgba(255,0,0,0.2))",
                      borderRadius: "0.5rem 0 0 0.5rem",
                    }}
                  />

                  <div className="relative p-5 md:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,0,0,0.05))",
                            border: "1px solid rgba(255,0,0,0.2)",
                          }}
                        >
                          <Icon className="w-5 h-5 text-red-500" />
                        </div>
                        <motion.div
                          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          style={{ boxShadow: "0 0 6px rgba(34,197,94,0.5)" }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3
                            className="text-base font-semibold text-white truncate"
                            data-testid={`text-use-case-title-${index}`}
                          >
                            {useCase.title}
                          </h3>
                          <span className="text-[10px] font-mono text-green-400/70 flex-shrink-0 flex items-center gap-1">
                            <motion.span
                              className="inline-block w-1 h-1 rounded-full bg-green-400"
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            DEPLOYED
                          </span>
                        </div>
                        <p
                          className="text-white/55 text-sm leading-relaxed"
                          data-testid={`text-use-case-description-${index}`}
                        >
                          {useCase.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Efficiency</span>
                          <span className="text-xs font-mono font-bold text-red-400">{effVal}%</span>
                        </div>
                        <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #ff0000, rgba(255,0,0,0.5))" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${effVal}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div className="flex-shrink-0 w-px h-6" style={{ background: "rgba(255,255,255,0.08)" }} />

                      <div className="flex-shrink-0 flex items-center gap-1.5">
                        {[0, 1, 2, 3].map((bar) => (
                          <motion.div
                            key={bar}
                            className="w-[3px] rounded-full"
                            style={{
                              background: bar < 3 ? "rgba(255,0,0,0.6)" : "rgba(255,255,255,0.1)",
                              height: `${8 + bar * 4}px`,
                            }}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 + bar * 0.08 + 0.5 }}
                          />
                        ))}
                        <span className="text-[9px] font-mono text-white/25 ml-0.5">AUTO</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <ServiceCTA />
    </div>
  );
}
