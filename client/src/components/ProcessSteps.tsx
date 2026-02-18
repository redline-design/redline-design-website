import { motion } from "framer-motion";
import { Search, Map, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Discovery",
    icon: Search,
    description:
      "We dive deep into your business, audience, and competitors to understand your unique market position and growth opportunities.",
  },
  {
    number: 2,
    title: "Strategy",
    icon: Map,
    description:
      "Our team builds a custom roadmap aligned with your goals, combining data insights with proven marketing frameworks.",
  },
  {
    number: 3,
    title: "Launch",
    icon: Rocket,
    description:
      "We execute with precision — deploying campaigns, building assets, and activating channels for maximum impact from day one.",
  },
  {
    number: 4,
    title: "Optimize",
    icon: RefreshCw,
    description:
      "Continuous monitoring, A/B testing, and refinement ensure your campaigns keep improving and delivering stronger results.",
  },
];

export default function ProcessSteps() {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-8"
      data-testid="section-process"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
              Our Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 tracking-tight section-heading-glow">
            How It Works
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
            From discovery to optimization, our proven four-step process
            delivers measurable results at every stage.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
          <div
            className="hidden lg:block absolute top-[36px] left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(255,0,0,0.3), rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, rgba(255,0,0,0.3))",
            }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center relative"
              data-testid={`process-step-${step.number}`}
            >
              <div
                className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full mb-6"
                style={{
                  background: "#cc0000",
                  boxShadow: "0 4px 20px rgba(255, 0, 0, 0.25)",
                }}
              >
                <step.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-[260px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
