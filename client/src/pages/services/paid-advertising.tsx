import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Target, RefreshCw, BarChart3, Globe, ArrowRight } from "lucide-react";
import { SiGoogleads, SiMeta, SiTiktok, SiLinkedin, SiYoutube, SiX, SiYelp, SiPinterest } from "react-icons/si";
import { Monitor } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Data-Driven Targeting",
    description: "Reach the right audience at the right time with precision targeting powered by real-time data and advanced analytics.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Optimization",
    description: "Continuous campaign improvement through A/B testing, bid adjustments, and performance monitoring around the clock.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description: "Full visibility into every metric that matters — from impressions and clicks to conversions and cost per acquisition.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Reach",
    description: "Advertise everywhere your customers are — from search engines and social media to video platforms and beyond.",
  },
];

const platforms = [
  { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
  { name: "Meta", icon: SiMeta, color: "#0081FB" },
  { name: "TikTok", icon: SiTiktok, color: "#FFFFFF" },
  { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { name: "X", icon: SiX, color: "#FFFFFF" },
  { name: "Microsoft", icon: Monitor, color: "#00A4EF" },
  { name: "Yelp", icon: SiYelp, color: "#D32323" },
  { name: "Pinterest", icon: SiPinterest, color: "#E60023" },
];

const pricingPlans = [
  {
    name: "Full Throttle",
    price: "25%",
    period: "of total ad spend",
    description: "Full-service PPC management — we handle everything so you can focus on growing your business",
    features: [
      "Campaign strategy & setup",
      "Ad creative design",
      "Audience targeting & segmentation",
      "A/B testing",
      "Bid management",
      "Weekly performance reports",
      "Landing page recommendations",
    ],
    popular: true,
  },
];

const funnelSteps = [
  { title: "Impressions", description: "Your ads seen by thousands" },
  { title: "Clicks", description: "Engaged visitors to your site" },
  { title: "Leads", description: "Qualified prospects captured" },
  { title: "Conversions", description: "Revenue-generating customers" },
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

export default function PaidAdvertisingPage() {
  return (
    <div data-testid="page-paid-advertising">
      <ServiceHero
        title="PPC Advertising"
        subtitle="Precision-Targeted Campaigns"
        description="Maximize your return on every advertising dollar with data-driven pay-per-click campaigns. We combine strategic targeting, compelling creative, and relentless optimization to deliver qualified leads at scale."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-platforms">
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
              data-testid="text-platforms-heading"
            >
              Platforms We Manage
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-platforms-subtitle">
              Advertise where your customers are
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  variants={itemVariants}
                  className="flex flex-col items-center gap-3 p-6 rounded-md"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  data-testid={`card-platform-${index}`}
                >
                  <Icon className="w-8 h-8" style={{ color: platform.color }} />
                  <span className="text-white/70 text-sm font-medium" data-testid={`text-platform-name-${index}`}>
                    {platform.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <PricingSection
        plans={pricingPlans}
        footnote="No minimum spend required. We handle everything from creative to placement so you can focus on running your business."
      />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-roi-comparison">
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
              data-testid="text-roi-heading"
            >
              ROI Comparison
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-roi-subtitle">
              See how our results stack up against the industry average
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10"
          >
            <div
              className="p-8 rounded-md text-center flex flex-col items-center justify-center"
              style={{
                background: "rgba(20, 20, 20, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              data-testid="card-roi-industry"
            >
              <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4" data-testid="text-roi-industry-label">
                Industry Average ROI
              </p>
              <p className="text-5xl md:text-6xl font-bold text-white/40 mb-3" data-testid="text-roi-industry-value">
                2x
              </p>
              <p className="text-white/30 text-xs" data-testid="text-roi-industry-source">
                Source: Google Economic Impact Study
              </p>
            </div>

            <div
              className="p-8 rounded-md text-center flex flex-col items-center justify-center"
              style={{
                background: "rgba(20, 20, 20, 0.95)",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                boxShadow: "0 0 30px rgba(255, 0, 0, 0.08)",
              }}
              data-testid="card-roi-redline"
            >
              <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4" data-testid="text-roi-redline-label">
                Redline Design ROI
              </p>
              <p className="text-6xl md:text-8xl font-bold text-red-500 mb-3" data-testid="text-roi-redline-value">
                7x
              </p>
              <p className="text-white/50 text-xs" data-testid="text-roi-redline-source">
                3.5x the industry average
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            data-testid="text-roi-summary"
          >
            For every $1 spent on Google Ads, businesses earn an average of $2. Our clients average $7.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-sales-funnel">
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
              data-testid="text-funnel-heading"
            >
              How We Maximize Your ROI
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-funnel-subtitle">
              Our proven funnel optimization turns ad spend into revenue
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0"
          >
            {funnelSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center p-6"
                data-testid={`card-funnel-step-${index}`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-xl font-bold"
                  style={{
                    background: `rgba(255, 0, 0, ${0.1 + index * 0.08})`,
                    border: `1px solid rgba(255, 0, 0, ${0.2 + index * 0.1})`,
                    color: "#ff0000",
                  }}
                  data-testid={`text-funnel-number-${index}`}
                >
                  {index + 1}
                </div>
                <h3
                  className="text-lg font-semibold text-white mb-2"
                  data-testid={`text-funnel-title-${index}`}
                >
                  {step.title}
                </h3>
                <p
                  className="text-white/50 text-sm"
                  data-testid={`text-funnel-description-${index}`}
                >
                  {step.description}
                </p>
                {index < funnelSteps.length - 1 && (
                  <div className="hidden md:flex absolute right-0 translate-x-1/2 z-10" style={{ top: "52px", transform: "translateX(50%) translateY(-50%)" }}>
                    <ArrowRight className="w-5 h-5 text-red-500/60" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ServiceCTA />
    </div>
  );
}
