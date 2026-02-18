import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Target, RefreshCw, BarChart3, Globe, ArrowRight, Eye, MousePointer, UserCheck, DollarSign } from "lucide-react";
import { SiGoogleads, SiMeta, SiTiktok, SiLinkedin, SiYoutube, SiX, SiYelp, SiPinterest } from "react-icons/si";
import { Monitor } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

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
    name: "Performance Max",
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
  { title: "Impressions", description: "Your ads seen by thousands", icon: Eye, value: "50K+", width: "100%" },
  { title: "Clicks", description: "Engaged visitors to your site", icon: MousePointer, value: "5K+", width: "82%" },
  { title: "Leads", description: "Qualified prospects captured", icon: UserCheck, value: "500+", width: "64%" },
  { title: "Conversions", description: "Revenue-generating customers", icon: DollarSign, value: "150+", width: "48%" },
];

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  if (inView && !hasAnimated.current) {
    hasAnimated.current = true;
    const duration = 1800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  return <span className="tabular-nums">{count}</span>;
}

export default function PaidAdvertisingPage() {
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null);
  const { ref: roiRef, inView: roiInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: funnelRef, inView: funnelInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div data-testid="page-paid-advertising">
      <ServiceHero
        title="PPC Advertising"
        subtitle="Precision-Targeted Campaigns"
        description="Maximize your return on every advertising dollar with data-driven pay-per-click campaigns. We combine strategic targeting, compelling creative, and relentless optimization to deliver qualified leads at scale."
      />

      <BenefitsGrid benefits={benefits} />

      {/* Platforms Section */}
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-platforms" data-section-label="Platforms">
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
            <p className="text-white/80 text-base md:text-lg" data-testid="text-platforms-subtitle">
              We run campaigns across every major advertising platform
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 md:gap-4">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const isHovered = hoveredPlatform === index;
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredPlatform(index)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: isHovered ? "rgba(30, 30, 30, 0.95)" : "rgba(15, 15, 15, 0.8)",
                    border: isHovered ? `1px solid ${platform.color}40` : "1px solid rgba(255, 255, 255, 0.06)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered ? `0 12px 40px -10px ${platform.color}25` : "none",
                  }}
                  data-testid={`card-platform-${index}`}
                >
                  <Icon
                    className="w-8 h-8 transition-all duration-300"
                    style={{
                      color: platform.color,
                      filter: isHovered ? `drop-shadow(0 0 10px ${platform.color}60)` : "none",
                    }}
                  />
                  <span
                    className="text-xs font-medium text-center leading-tight transition-colors duration-300"
                    style={{ color: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)" }}
                    data-testid={`text-platform-name-${index}`}
                  >
                    {platform.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PricingSection
        plans={pricingPlans}
        footnote="Minimum spend is $1,000/mo per platform. We handle everything from creative to placement so you can focus on running your business."
      />

      {/* ROI Comparison - Animated Bar Infographic */}
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-roi-comparison" data-section-label="ROI" ref={roiRef}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-roi-heading"
            >
              ROI Comparison
            </h2>
            <p className="text-white/80 text-base md:text-lg" data-testid="text-roi-subtitle">
              See how our results stack up against the industry average
            </p>
          </motion.div>

          <div className="space-y-8 mb-12">
            {/* Industry Average */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              data-testid="card-roi-industry"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-sm font-medium text-white/70" data-testid="text-roi-industry-label">
                    Industry Average ROI
                  </span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white/50 font-mono" data-testid="text-roi-industry-value">
                  <AnimatedCounter value={2} inView={roiInView} />x
                </span>
              </div>
              <div
                className="relative w-full h-4 rounded overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-full border-r" style={{ width: `${100 / 14}%`, borderColor: "rgba(255,255,255,0.03)" }} />
                  ))}
                </div>
                <motion.div
                  className="absolute inset-y-0 left-0"
                  initial={{ width: 0 }}
                  animate={roiInView ? { width: "28.5%" } : { width: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.35))" }}
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      boxShadow: "0 0 6px rgba(255,255,255,0.3)",
                    }}
                  />
                </motion.div>
              </div>
              <p className="text-white/40 text-xs mt-2" data-testid="text-roi-industry-source">
                Source: Google Economic Impact Study
              </p>
            </motion.div>

            {/* Redline Design ROI */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-testid="card-roi-redline"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" style={{ boxShadow: "0 0 8px rgba(255,0,0,0.6)" }} />
                  <span className="text-sm font-medium text-white/90" data-testid="text-roi-redline-label">
                    Redline Design ROI
                  </span>
                </div>
                <span className="text-3xl md:text-4xl font-bold text-red-500 font-mono" data-testid="text-roi-redline-value" style={{ textShadow: "0 0 20px rgba(255,0,0,0.4)" }}>
                  <AnimatedCounter value={7} inView={roiInView} />x
                </span>
              </div>
              <div
                className="relative w-full h-4 rounded overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,0,0,0.15)",
                }}
              >
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-full border-r" style={{ width: `${100 / 14}%`, borderColor: "rgba(255,255,255,0.03)" }} />
                  ))}
                </div>
                <motion.div
                  className="absolute inset-y-0 left-0"
                  initial={{ width: 0 }}
                  animate={roiInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: "linear-gradient(90deg, #ff000044, #ff0000aa, #ff0000)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 w-[30%] right-0"
                    initial={{ opacity: 0 }}
                    animate={roiInView ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
                    transition={{ duration: 2, delay: 2.2, repeat: Infinity, repeatDelay: 3 }}
                    style={{ background: "linear-gradient(90deg, transparent, #ff0000, rgba(255,255,255,0.4))" }}
                  />
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1"
                    style={{
                      background: "rgba(255,200,200,0.9)",
                      boxShadow: "0 0 8px #ff0000, 0 0 16px rgba(255,0,0,0.5), 0 0 2px rgba(255,255,255,0.8)",
                    }}
                  />
                </motion.div>
              </div>
              <p className="text-white/60 text-xs mt-2" data-testid="text-roi-redline-source">
                3.5x the industry average
              </p>
            </motion.div>
          </div>

          {/* Scale markers */}
          <div className="flex justify-between max-w-4xl mx-auto mb-4 px-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span key={n} className="text-[10px] font-mono text-white/25">{n}x</span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            data-testid="text-roi-summary"
          >
            For every $1 spent on Google Ads, businesses earn an average of $2. Our clients average $7.
          </motion.p>
        </div>
      </section>

      {/* Funnel Infographic */}
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-sales-funnel" data-section-label="Funnel" ref={funnelRef}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-funnel-heading"
            >
              How We Maximize Your ROI
            </h2>
            <p className="text-white/80 text-base md:text-lg" data-testid="text-funnel-subtitle">
              Our proven funnel optimization turns ad spend into revenue
            </p>
          </motion.div>

          <div className="space-y-0 max-w-3xl mx-auto">
            {funnelSteps.map((step, index) => {
              const StepIcon = step.icon;
              const intensity = 0.08 + index * 0.12;
              const isLast = index === funnelSteps.length - 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  animate={funnelInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto"
                  style={{ width: step.width }}
                  data-testid={`card-funnel-step-${index}`}
                >
                  <div
                    className="relative overflow-hidden px-6 py-5 md:px-8 md:py-6"
                    style={{
                      background: `rgba(255, 0, 0, ${intensity})`,
                      borderLeft: `1px solid rgba(255, 0, 0, ${intensity + 0.15})`,
                      borderRight: `1px solid rgba(255, 0, 0, ${intensity + 0.15})`,
                      borderTop: index === 0 ? `1px solid rgba(255, 0, 0, ${intensity + 0.15})` : "none",
                      borderBottom: isLast ? `1px solid rgba(255, 0, 0, ${intensity + 0.15})` : "none",
                    }}
                  >
                    {/* Horizontal scan lines */}
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.15 }}>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute left-0 right-0 h-px"
                          style={{ top: `${(i + 1) * 11}%`, background: "rgba(255,255,255,0.15)" }}
                        />
                      ))}
                    </div>

                    {/* Vertical grid lines */}
                    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1 }}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px"
                          style={{ left: `${(i + 1) * 8}%`, background: "rgba(255,255,255,0.12)" }}
                        />
                      ))}
                    </div>

                    {/* Sweeping scan bar */}
                    <motion.div
                      className="absolute inset-y-0 w-[15%] pointer-events-none"
                      initial={{ left: "-15%" }}
                      animate={funnelInView ? { left: ["-15%", "115%"] } : {}}
                      transition={{
                        duration: 2.5,
                        delay: index * 0.4 + 1.2,
                        repeat: Infinity,
                        repeatDelay: 4 + index,
                        ease: "linear",
                      }}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.12), rgba(255,255,255,0.06), transparent)",
                      }}
                    />

                    {/* Left edge glow */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-px"
                      style={{
                        background: `rgba(255, 0, 0, ${0.4 + index * 0.15})`,
                        boxShadow: `0 0 6px rgba(255,0,0,${0.2 + index * 0.1})`,
                      }}
                    />
                    {/* Right edge glow */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-px"
                      style={{
                        background: `rgba(255, 0, 0, ${0.4 + index * 0.15})`,
                        boxShadow: `0 0 6px rgba(255,0,0,${0.2 + index * 0.1})`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-5 w-full">
                      <div
                        className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded flex items-center justify-center"
                        style={{
                          background: `rgba(255, 0, 0, ${0.2 + index * 0.12})`,
                          border: `1px solid rgba(255,0,0,${0.3 + index * 0.1})`,
                          boxShadow: isLast ? "0 0 20px rgba(255,0,0,0.25), inset 0 0 8px rgba(255,0,0,0.1)" : "none",
                        }}
                      >
                        <StepIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm md:text-base font-bold text-white tracking-wide uppercase"
                          data-testid={`text-funnel-title-${index}`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-white/70 text-xs md:text-sm hidden sm:block"
                          data-testid={`text-funnel-description-${index}`}
                        >
                          {step.description}
                        </p>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <motion.span
                          className="text-xl md:text-2xl font-bold font-mono block"
                          style={{
                            color: isLast ? "#ff0000" : "rgba(255,255,255,0.95)",
                            textShadow: isLast ? "0 0 15px rgba(255,0,0,0.5)" : "none",
                          }}
                          initial={{ opacity: 0 }}
                          animate={funnelInView ? { opacity: 1 } : {}}
                          transition={{ delay: index * 0.2 + 0.8 }}
                          data-testid={`text-funnel-value-${index}`}
                        >
                          {step.value}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Connector lines between stages */}
                  {!isLast && (
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center">
                        <div className="w-px h-2" style={{ background: `rgba(255,0,0,${0.3 + index * 0.1})` }} />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={funnelInView ? { scale: 1 } : {}}
                          transition={{ delay: index * 0.18 + 0.5 }}
                        >
                          <ArrowRight className="w-3 h-3 text-red-500/50 rotate-90" />
                        </motion.div>
                        <div className="w-px h-2" style={{ background: `rgba(255,0,0,${0.3 + index * 0.1})` }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceCTA />
    </div>
  );
}
