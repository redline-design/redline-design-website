import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 95, suffix: "%", label: "Client Retention" },
  { value: 7, suffix: "x", label: "Average ROI" },
];

const faqItems = [
  {
    id: "services",
    question: "What services does Redline Design offer?",
    answer:
      "We provide a full suite of digital marketing services including SEO, PPC advertising, web design & development, social media marketing, email marketing, AI automation, CRM setup & management, analytics & reporting, and branding & graphic design. Whether you need one service or a complete marketing overhaul, we tailor solutions to fit your business goals.",
  },
  {
    id: "results-timeline",
    question: "How long does it take to see results?",
    answer:
      "Timelines vary by channel. PPC campaigns can generate leads within days of launch. Social media marketing typically shows meaningful engagement growth in 1\u20133 months. SEO is a longer-term investment, with most clients seeing significant organic traffic gains in 3\u20136 months. We set realistic expectations upfront and provide transparent progress reports throughout.",
  },
  {
    id: "outside-area",
    question: "Do you work with businesses outside your area?",
    answer:
      "Absolutely. While we love working with local businesses, we serve clients nationwide. Our team collaborates remotely with companies across the country, delivering the same hands-on service regardless of location.",
  },
  {
    id: "difference",
    question: "What makes Redline Design different?",
    answer:
      "Our clients see an average 7x return on their marketing investment. We\u2019re data-driven, transparent, and fast. Every account gets a dedicated account manager, real-time reporting dashboards, and a team that treats your budget like our own. Most campaign updates are delivered within 24 business hours.",
  },
  {
    id: "pricing",
    question: "How much do your services cost?",
    answer:
      "Our plans start at $500 per month, with custom pricing based on the scope and goals of your project. Every business is different, so we build tailored packages rather than one-size-fits-all plans. Schedule a free consultation and we\u2019ll provide a transparent quote with no hidden fees.",
  },
  {
    id: "contracts",
    question: "Do I need a long-term contract?",
    answer:
      "No. We operate on a month-to-month basis with no long-term commitments. We believe our results should earn your business every month\u2014not a contract. You\u2019re free to adjust, scale, or pause services whenever you need to.",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplayValue(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function CircuitAnimation() {
  const circuitPaths = [
    "M 200 80 L 200 140 L 280 140 L 280 200",
    "M 120 200 L 180 200 L 180 280 L 240 280",
    "M 320 160 L 320 240 L 260 240 L 260 300",
    "M 80 160 L 140 160 L 140 100 L 200 100",
    "M 200 300 L 200 340 L 140 340 L 140 280",
    "M 300 120 L 300 80 L 240 80",
    "M 100 260 L 100 320 L 160 320",
    "M 280 300 L 320 300 L 320 260",
  ];

  const nodePositions = [
    { x: 200, y: 200, size: 18, primary: true },
    { x: 200, y: 80, size: 6 },
    { x: 280, y: 200, size: 8 },
    { x: 120, y: 200, size: 7 },
    { x: 240, y: 280, size: 6 },
    { x: 320, y: 160, size: 5 },
    { x: 260, y: 300, size: 6 },
    { x: 80, y: 160, size: 5 },
    { x: 200, y: 340, size: 5 },
    { x: 140, y: 280, size: 6 },
    { x: 300, y: 80, size: 5 },
    { x: 100, y: 320, size: 5 },
    { x: 320, y: 260, size: 5 },
    { x: 200, y: 140, size: 5 },
    { x: 280, y: 140, size: 5 },
    { x: 140, y: 160, size: 5 },
    { x: 200, y: 100, size: 5 },
    { x: 240, y: 80, size: 5 },
    { x: 160, y: 320, size: 5 },
    { x: 320, y: 300, size: 5 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto" data-testid="circuit-animation">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,30,15,0.2)" />
            <stop offset="100%" stopColor="rgba(255,0,0,0)" />
          </radialGradient>
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="200" cy="200" r="160" fill="url(#coreGlow)" />

        {circuitPaths.map((d, i) => (
          <g key={`path-${i}`}>
            <path
              d={d}
              fill="none"
              stroke="rgba(130,140,170,0.12)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              d={d}
              fill="none"
              stroke={i % 3 === 0 ? "rgba(255,40,20,0.6)" : "rgba(160,175,220,0.4)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20 200"
              filter={i % 3 === 0 ? "url(#redGlow)" : "url(#softGlow)"}
              animate={{ strokeDashoffset: [220, -220] }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
            />
          </g>
        ))}

        {nodePositions.map((node, i) => {
          if (node.primary) {
            return (
              <g key={`node-${i}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={30}
                  fill="none"
                  stroke="rgba(255,30,15,0.15)"
                  strokeWidth="1"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  fill="none"
                  stroke="rgba(255,30,15,0.25)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <circle cx={node.x} cy={node.y} r={node.size * 0.5} fill="#cc0000" filter="url(#redGlow)" />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size * 0.3}
                  fill="#ff4444"
                  animate={{ opacity: [0.8, 1, 0.8], scale: [0.85, 1.15, 0.85] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              </g>
            );
          }
          const isAccent = i % 4 === 0;
          return (
            <g key={`node-${i}`}>
              {isAccent && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 4}
                  fill="none"
                  stroke="rgba(255,30,15,0.1)"
                  strokeWidth="0.5"
                />
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size * 0.5}
                fill={isAccent ? "#cc2200" : "rgba(160,170,210,0.6)"}
                filter={isAccent ? "url(#redGlow)" : "url(#softGlow)"}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 2 + (i % 3) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            </g>
          );
        })}

        <motion.rect
          x="186"
          y="186"
          width="28"
          height="28"
          rx="2"
          fill="none"
          stroke="rgba(255,40,20,0.3)"
          strokeWidth="0.8"
          animate={{ rotate: 45 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>
    </div>
  );
}

export default function AboutBlurb() {
  return (
    <section
      className="py-20 md:py-32 px-4 md:px-8"
      data-testid="section-about-blurb"
      data-section-label="About Us"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 tracking-tight leading-tight mb-4 section-heading-glow" data-testid="heading-about">
              About Redline Design
            </h2>
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest mb-8">
              Driving Measurable Growth Since Day One
            </p>

            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Redline Design was founded with a singular mission: to break the
              boundaries of traditional digital marketing. We believe every
              business deserves a marketing strategy that delivers real,
              measurable results — not vanity metrics.
            </p>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Our team of seasoned strategists, designers, and technologists work
              in concert to deliver results that defy expectations. From startups
              finding their footing to established enterprises reaching new
              heights, we tailor every strategy to your unique goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <CircuitAnimation />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-20 md:mb-28"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
              data-testid={`stat-about-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            data-testid="accordion-faq"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-white/10"
                data-testid={`faq-item-${item.id}`}
              >
                <AccordionTrigger
                  className="text-left text-white hover:text-red-400 hover:no-underline py-5 text-base md:text-lg font-medium"
                  data-testid={`faq-trigger-${item.id}`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-white/50 text-sm md:text-base leading-relaxed pb-4"
                  data-testid={`faq-content-${item.id}`}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
