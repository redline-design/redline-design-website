import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { BarChart3, Sparkles, Plug, TrendingUp, ArrowUp, ArrowDown, Activity, Users, DollarSign, Eye, Megaphone, LineChart, Share2, Briefcase, ShoppingCart, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
    name: "Starter",
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
    name: "Growth",
    price: "$499",
    period: "/month",
    popular: true,
    features: [
      "Everything in Starter",
      "AI-powered performance summaries",
      "Advanced filtering",
      "Benchmarking against industry peers",
      "Forecasting & trend analysis",
      "Data warehouse integrations",
      "Dedicated Customer Success Manager",
    ],
  },
  {
    name: "Pro",
    price: "Custom",
    buttonText: "Contact Us",
    features: [
      "Everything in Growth",
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
  { label: "Website Traffic", value: 24800, prefix: "", suffix: "", display: "24.8K", change: "+18%", positive: true, icon: Eye, sparkline: [30, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92] },
  { label: "Active Users", value: 3420, prefix: "", suffix: "", display: "3,420", change: "+12%", positive: true, icon: Users, sparkline: [20, 28, 35, 32, 45, 42, 55, 50, 62, 58, 70, 68] },
  { label: "Conversion Rate", value: 3.2, prefix: "", suffix: "%", display: "3.2%", change: "+0.4%", positive: true, icon: Activity, sparkline: [15, 22, 18, 28, 25, 35, 30, 38, 42, 45, 40, 48] },
  { label: "Revenue", value: 148000, prefix: "$", suffix: "", display: "$148K", change: "+22%", positive: true, icon: DollarSign, sparkline: [25, 35, 30, 48, 42, 55, 52, 68, 62, 78, 72, 88] },
];

const channelBars = [
  { name: "Organic", percent: 42, color: "rgba(255, 0, 0, 0.8)" },
  { name: "Paid", percent: 28, color: "rgba(255, 60, 60, 0.7)" },
  { name: "Social", percent: 18, color: "rgba(255, 100, 100, 0.6)" },
  { name: "Direct", percent: 12, color: "rgba(255, 140, 140, 0.5)" },
];

const weeklyData = [
  { day: "Mon", visitors: 3200, conversions: 128 },
  { day: "Tue", visitors: 4100, conversions: 164 },
  { day: "Wed", visitors: 3800, conversions: 152 },
  { day: "Thu", visitors: 4600, conversions: 184 },
  { day: "Fri", visitors: 5200, conversions: 208 },
  { day: "Sat", visitors: 2800, conversions: 112 },
  { day: "Sun", visitors: 2400, conversions: 96 },
];

function MiniSparkline({ data, color = "rgba(255, 0, 0, 0.8)" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 32;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = pathD + ` L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-fill-${data.join("")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaD}
        fill={`url(#spark-fill-${data.join("")})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="3"
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </motion.circle>
    </svg>
  );
}

function AnimatedCounter({ value, prefix = "", suffix = "", display }: { value: number; prefix?: string; suffix?: string; display: string }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = value * eased;
            if (value >= 1000) {
              setDisplayValue(prefix + (current / 1000).toFixed(1) + "K");
            } else if (value < 10) {
              setDisplayValue(prefix + current.toFixed(1) + suffix);
            } else {
              setDisplayValue(prefix + Math.round(current).toLocaleString() + suffix);
            }
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplayValue(display);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, value, prefix, suffix, display]);

  return <span ref={ref}>{displayValue}</span>;
}

const dataSourceCategories = [
  { title: "Advertising", icon: Megaphone, items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads"] },
  { title: "Analytics", icon: LineChart, items: ["Google Analytics 4", "Adobe Analytics", "Mixpanel", "Amplitude"] },
  { title: "Social Media", icon: Share2, items: ["Instagram", "Facebook", "LinkedIn", "X (Twitter)"] },
  { title: "CRM & Sales", icon: Briefcase, items: ["HubSpot", "Salesforce", "Close CRM", "Pipedrive"] },
  { title: "E-Commerce", icon: ShoppingCart, items: ["Shopify", "WooCommerce", "Stripe", "PayPal"] },
  { title: "SEO", icon: Search, items: ["Google Search Console", "SEMrush", "Ahrefs", "Moz"] },
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

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-dashboard-preview" data-section-label="Dashboard">
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

          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              background: "rgba(10, 10, 10, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: "0 0 80px rgba(255, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[11px] font-mono text-white/30 tracking-wider">REDLINE ANALYTICS</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono text-green-400/60">LIVE</span>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              >
                {kpiCards.map((kpi, index) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative p-4 rounded-md overflow-hidden"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                      data-testid={`card-kpi-${index}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-red-500/60" />
                          <span className="text-[11px] text-white/40 font-medium" data-testid={`text-kpi-label-${index}`}>
                            {kpi.label}
                          </span>
                        </div>
                        <span
                          className={`flex items-center gap-0.5 text-[10px] font-mono font-medium ${
                            kpi.positive ? "text-green-400" : "text-red-400"
                          }`}
                          data-testid={`text-kpi-change-${index}`}
                        >
                          {kpi.positive ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                          {kpi.change}
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-2">
                        <span
                          className="text-2xl md:text-3xl font-bold font-mono text-white"
                          data-testid={`text-kpi-value-${index}`}
                          style={{ textShadow: "0 0 20px rgba(255,0,0,0.15)" }}
                        >
                          <AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} display={kpi.display} />
                        </span>
                        <MiniSparkline data={kpi.sparkline} />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:col-span-3 p-4 rounded-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  data-testid="card-weekly-chart"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-white/40 font-medium">Weekly Performance</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] text-white/30">Visitors</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                        <span className="text-[10px] text-white/30">Conversions</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-[140px]">
                    {weeklyData.map((day, index) => {
                      const maxVisitors = Math.max(...weeklyData.map(d => d.visitors));
                      const barHeight = (day.visitors / maxVisitors) * 120;
                      const convHeight = (day.conversions / maxVisitors) * 120;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex items-end justify-center gap-0.5" style={{ height: "120px" }}>
                            <motion.div
                              className="flex-1 rounded-sm max-w-[20px]"
                              initial={{ height: 0 }}
                              whileInView={{ height: barHeight }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                              style={{
                                background: "linear-gradient(to top, rgba(255,0,0,0.6), rgba(255,0,0,0.2))",
                                border: "1px solid rgba(255,0,0,0.2)",
                              }}
                            />
                            <motion.div
                              className="flex-1 rounded-sm max-w-[20px]"
                              initial={{ height: 0 }}
                              whileInView={{ height: convHeight }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                              style={{
                                background: "linear-gradient(to top, rgba(255,0,0,0.3), rgba(255,0,0,0.1))",
                                border: "1px solid rgba(255,0,0,0.1)",
                              }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-white/25 mt-1">{day.day}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="lg:col-span-2 p-4 rounded-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  data-testid="card-kpi-channel-mix"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-white/40 font-medium" data-testid="text-kpi-label-channel">Channel Mix</span>
                    <span className="text-xs font-mono text-red-500" data-testid="text-kpi-value-channel">7x ROI</span>
                  </div>

                  <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-5">
                    {channelBars.map((channel, index) => (
                      <motion.div
                        key={index}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${channel.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ background: channel.color }}
                        className="rounded-sm"
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    {channelBars.map((channel, index) => (
                      <div key={index} data-testid={`bar-channel-${index}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-sm" style={{ background: channel.color }} />
                            <span className="text-white/60 text-xs">{channel.name}</span>
                          </div>
                          <span className="text-xs font-mono text-white/40">{channel.percent}%</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/5">
                          <motion.div
                            className="h-1 rounded-full"
                            style={{ background: channel.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${channel.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute top-0 left-0 w-full h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.3), transparent)" }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
      </section>

      <PricingSection
        plans={plans}
        footnote="All plans include unlimited users and dashboards. Annual billing saves up to 20%."
      />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-data-sources" data-section-label="Data Sources">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataSourceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative overflow-hidden rounded-lg group"
                  data-testid={`card-datasource-${index}`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "rgba(20, 20, 20, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "0.5rem",
                    }}
                  />

                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg"
                    style={{ background: "linear-gradient(180deg, #ff0000, rgba(255,0,0,0.3))" }}
                  />

                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.5) 24px, rgba(255,255,255,0.5) 25px),
                        repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.5) 24px, rgba(255,255,255,0.5) 25px)`,
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(255,0,0,0.03) 50%, transparent 100%)",
                      height: "40%",
                    }}
                    animate={{ y: ["-40%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                  />

                  <div className="relative z-10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center"
                        style={{
                          background: "rgba(255,0,0,0.1)",
                          border: "1px solid rgba(255,0,0,0.2)",
                        }}
                      >
                        <Icon className="w-4 h-4 text-red-500" />
                      </div>
                      <h3
                        className="text-sm font-bold text-white uppercase tracking-wider"
                        data-testid={`text-datasource-title-${index}`}
                      >
                        {category.title}
                      </h3>
                      <motion.div
                        className="ml-auto flex items-center gap-1.5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 + 0.5 }}
                      >
                        <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider hidden sm:inline">Connected</span>
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 3 }}
                          style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-0">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.08 + itemIndex * 0.06 + 0.2 }}
                          className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-b-0"
                          data-testid={`text-datasource-item-${index}-${itemIndex}`}
                        >
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(255,0,0,0.08)" }}
                          >
                            <Plug className="w-2.5 h-2.5 text-red-500/60" />
                          </div>
                          <span className="text-white/80 text-sm font-medium flex-1">{item}</span>
                          <div className="flex items-center gap-1">
                            <div className="w-8 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(90deg, #ff0000, rgba(255,0,0,0.5))" }}
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 + itemIndex * 0.1 + 0.4 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceCTA preSelectedServices={["analytics"]} />
    </div>
  );
}