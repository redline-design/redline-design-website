import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { BarChart3, Sparkles, Plug, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const benefits = [
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    description:
      "See all your key metrics in one place with live dashboards that update automatically. No more switching between tools or waiting for reports.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Get automated performance summaries and trend analysis that surface what matters most, so you can act fast and stay ahead of the competition.",
  },
  {
    icon: Plug,
    title: "120+ Integrations",
    description:
      "Connect every data source you use — Google Analytics, HubSpot, Meta Ads, Shopify, and more — into a single unified reporting platform.",
  },
  {
    icon: TrendingUp,
    title: "Benchmarking & Forecasting",
    description:
      "Compare your performance against industry peers and forecast future trends to make smarter, data-backed decisions.",
  },
];

const plans = [
  {
    name: "Lunar",
    price: "$199",
    period: "/month",
    features: [
      "3 data sources included",
      "Unlimited users",
      "Unlimited dashboards",
      "Pre-built dashboard templates",
      "Goals & alerts",
      "Hourly data refresh",
      "24 months historical data",
    ],
  },
  {
    name: "Orbital",
    price: "$499",
    period: "/month",
    popular: true,
    features: [
      "Everything in Lunar",
      "AI-powered performance summaries",
      "Advanced filtering",
      "Benchmarking against industry peers",
      "Forecasting & trend analysis",
      "Data warehouse integrations",
      "Dedicated Customer Success Manager",
    ],
  },
  {
    name: "Supernova",
    price: "Custom",
    buttonText: "Contact Us",
    features: [
      "Everything in Orbital",
      "100 data sources included",
      "15-minute sync intervals",
      "White-label branding",
      "SSO & advanced security (2FA)",
      "Priority support",
      "Personalized onboarding specialist",
      "Custom fiscal calendar support",
    ],
  },
];

const kpiCards = [
  { label: "Website Traffic", value: "24.8K", change: "+18%", positive: true },
  { label: "Conversion Rate", value: "3.2%", change: "+0.4%", positive: true },
  { label: "Revenue", value: "$148K", change: "+22%", positive: true },
];

const channelBars = [
  { name: "Organic", percent: 42 },
  { name: "Paid", percent: 28 },
  { name: "Social", percent: 18 },
  { name: "Direct", percent: 12 },
];

const dataSourceCategories = [
  { title: "Advertising", items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads"] },
  { title: "Analytics", items: ["Google Analytics 4", "Adobe Analytics", "Mixpanel", "Amplitude"] },
  { title: "Social Media", items: ["Instagram", "Facebook", "LinkedIn", "X (Twitter)"] },
  { title: "CRM & Sales", items: ["HubSpot", "Salesforce", "Close CRM", "Pipedrive"] },
  { title: "E-Commerce", items: ["Shopify", "WooCommerce", "Stripe", "PayPal"] },
  { title: "SEO", items: ["Google Search Console", "SEMrush", "Ahrefs", "Moz"] },
];

const cardStyle = {
  background: "rgba(20, 20, 20, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

export default function AnalyticsPage() {
  return (
    <div data-testid="page-analytics">
      <ServiceHero
        title="Analytics & Reporting"
        subtitle="Data-Driven Decisions"
        description="Transform raw data into actionable insights with unified analytics dashboards. Connect all your marketing channels, track performance in real time, and make smarter decisions backed by AI-powered analysis."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-dashboard-preview">
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
              data-testid="text-dashboard-heading"
            >
              Your Dashboard at a Glance
            </h2>
            <p
              className="text-white/50 text-base md:text-lg"
              data-testid="text-dashboard-subtitle"
            >
              All your key performance indicators in one unified view
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {kpiCards.map((kpi, index) => (
              <div
                key={index}
                className="p-6 rounded-md"
                style={cardStyle}
                data-testid={`card-kpi-${index}`}
              >
                <p className="text-white/50 text-sm mb-2" data-testid={`text-kpi-label-${index}`}>
                  {kpi.label}
                </p>
                <div className="flex items-end gap-3">
                  <span
                    className="text-3xl font-bold text-red-500 section-heading-glow"
                    data-testid={`text-kpi-value-${index}`}
                  >
                    {kpi.value}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      kpi.positive ? "text-green-400" : "text-red-400"
                    }`}
                    data-testid={`text-kpi-change-${index}`}
                  >
                    {kpi.positive ? (
                      <ArrowUp className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5" />
                    )}
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}

            <div
              className="p-6 rounded-md"
              style={cardStyle}
              data-testid="card-kpi-channel-mix"
            >
              <p className="text-white/50 text-sm mb-2" data-testid="text-kpi-label-channel">
                Channel Mix
              </p>
              <div className="flex items-end gap-3 mb-4">
                <span
                  className="text-3xl font-bold text-red-500 section-heading-glow"
                  data-testid="text-kpi-value-channel"
                >
                  4.7x
                </span>
                <span className="text-white/50 text-sm">ROI</span>
              </div>
              <div className="space-y-3">
                {channelBars.map((channel, index) => (
                  <div key={index} data-testid={`bar-channel-${index}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-xs">{channel.name}</span>
                      <span className="text-white/50 text-xs">{channel.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5">
                      <div
                        className="h-2 rounded-full bg-red-500/80"
                        style={{ width: `${channel.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PricingSection
        plans={plans}
        footnote="All plans include unlimited users and dashboards. Annual billing saves up to 20%."
      />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-data-sources">
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
              data-testid="text-datasources-heading"
            >
              Connect Your Data Sources
            </h2>
            <p
              className="text-white/50 text-base md:text-lg"
              data-testid="text-datasources-subtitle"
            >
              Pull data from 120+ tools into one powerful dashboard
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {dataSourceCategories.map((category, index) => (
              <div
                key={index}
                className="p-6 rounded-md"
                style={cardStyle}
                data-testid={`card-datasource-${index}`}
              >
                <h3
                  className="text-lg font-semibold text-white mb-4"
                  data-testid={`text-datasource-title-${index}`}
                >
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-white/60 text-sm flex items-center gap-2"
                      data-testid={`text-datasource-item-${index}-${itemIndex}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ServiceCTA />
    </div>
  );
}