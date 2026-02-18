import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Target, Palette, BookOpen, Image } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Brand Strategy",
    description: "Develop a purposeful visual direction rooted in market research, audience insights, and your unique competitive positioning.",
  },
  {
    icon: Palette,
    title: "Logo Design",
    description: "Create memorable brand marks that capture your essence and leave a lasting impression across every touchpoint.",
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines",
    description: "Build a consistent identity system with comprehensive rules for typography, color, spacing, and usage across all media.",
  },
  {
    icon: Image,
    title: "Marketing Materials",
    description: "Design collateral that converts — from business cards and brochures to social media assets and digital ads.",
  },
];

const processSteps = [
  { number: 1, title: "Research", description: "Deep-dive into your brand, competitors, and target audience to inform every design decision." },
  { number: 2, title: "Concept", description: "Explore multiple creative directions through mood boards, sketches, and style studies." },
  { number: 3, title: "Design", description: "Craft polished visuals and assets that bring your brand story to life." },
  { number: 4, title: "Refine", description: "Iterate with your feedback to perfect every detail until it's exactly right." },
  { number: 5, title: "Deliver", description: "Export final assets in every format you need, ready for print and digital." },
];

const logoPlans = [
  {
    name: "Essentials",
    price: "$400",
    period: "One-time",
    features: [
      "3 initial logo concepts",
      "2 rounds of revisions",
      "Final files (PNG, SVG, PDF)",
      "Color & B/W versions",
      "Brand color palette",
    ],
  },
];

const brandGuidePlans = [
  {
    name: "Professional",
    price: "$800",
    period: "One-time",
    features: [
      "Brand color palette",
      "Typography guidelines",
      "Usage rules & spacing",
      "Digital & print specs",
      "Brand voice overview",
    ],
  },
  {
    name: "Premium",
    price: "$1,500",
    period: "One-time",
    popular: true,
    features: [
      "Everything in Professional",
      "Custom logo design included",
      "Social media templates",
      "Business card design",
      "Email signature template",
      "Brand story document",
    ],
  },
  {
    name: "Elite",
    price: "$2,500",
    period: "One-time",
    features: [
      "Everything in Premium",
      "Extended collateral design",
      "Presentation templates",
      "Packaging guidelines",
      "Brand photography direction",
      "Quarterly brand review",
    ],
  },
];

const customDesignPlans = [
  {
    name: "Pit Crew Studio",
    price: "$250",
    period: "/hour",
    description: "Need something specific? Our design team is available for custom projects of any scope.",
    features: [
      "Marketing materials",
      "Social media graphics",
      "Print design",
      "Infographic design",
      "Ad creative",
      "Illustration",
    ],
  },
];

const brandingStats = [
  { value: "94%", label: "of first impressions are design-related" },
  { value: "80%", label: "of consumers recognize brands by color" },
  { value: "23%", label: "revenue increase with consistent branding" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DesignPage() {
  return (
    <div data-testid="page-design">
      <ServiceHero
        title="Graphic Design & Branding"
        subtitle="Create Unforgettable Visual Identities"
        description="From logos and brand systems to marketing materials that convert, we craft visual identities that resonate with your audience and set you apart from the competition."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-branding-process" data-section-label="Process">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow" data-testid="text-process-heading">
              Our Branding Process
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-process-subtitle">
              A proven workflow from discovery to delivery
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="p-6 rounded-md text-center"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-process-step-${step.number}`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 font-bold text-sm" data-testid={`text-step-number-${step.number}`}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2" data-testid={`text-step-title-${step.number}`}>
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed" data-testid={`text-step-description-${step.number}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div data-testid="section-pricing-logo">
        <PricingSection plans={logoPlans} title="Logo Design" subtitle="Professional logo packages for every stage of your brand" />
      </div>

      <div data-testid="section-pricing-brand-guide">
        <PricingSection plans={brandGuidePlans} title="Brand Guide Packages" subtitle="Comprehensive brand identity systems — each tier builds on the last" />
      </div>

      <div data-testid="section-pricing-custom">
        <PricingSection plans={customDesignPlans} title="Custom Design" subtitle="Tailored design solutions for your unique needs" />
      </div>

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-branding-stats" data-section-label="Stats">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow" data-testid="text-stats-heading">
              What Makes Great Branding
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-stats-subtitle">
              The numbers speak for themselves
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {brandingStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-md text-center"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-stat-${index}`}
              >
                <p className="text-4xl md:text-5xl font-bold text-red-500 mb-3" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </p>
                <p className="text-white/60 text-sm leading-relaxed" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ServiceCTA preSelectedServices={["branding"]} />
    </div>
  );
}