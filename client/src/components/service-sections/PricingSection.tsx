import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

interface PricingSectionProps {
  plans: Plan[];
  footnote?: string;
  title?: string;
  subtitle?: string;
}

function getGridCols(count: number): string {
  if (count === 1) return "grid-cols-1 max-w-md mx-auto";
  if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto";
  if (count === 3) return "grid-cols-1 md:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
}

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

export default function PricingSection({ plans, footnote, title, subtitle }: PricingSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-pricing" data-section-label="Pricing">
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-pricing-heading"
            >{title}</h2>
            {subtitle && (
              <p className="text-white/50 text-base md:text-lg" data-testid="text-pricing-subtitle">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid gap-6 ${getGridCols(plans.length)}`}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-6 md:p-8 rounded-lg flex flex-col"
              style={{
                background: "rgba(20, 20, 20, 0.95)",
                border: "1px solid rgba(255, 0, 0, 0.2)",
                boxShadow: "0 0 20px rgba(255, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              }}
              data-testid={`card-plan-${index}`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge
                  variant="default"
                  className="bg-red-600 text-white shadow-lg"
                  style={{ boxShadow: "0 0 12px rgba(255, 0, 0, 0.4)" }}
                  data-testid={`badge-plan-${index}`}
                >
                  {plan.popular ? "Most Popular" : plans.length === 1 ? "Expert Service" : `Tier ${index + 1}`}
                </Badge>
              </div>

              <h3
                className="text-lg font-semibold text-red-500 mb-2 mt-2"
                data-testid={`text-plan-name-${index}`}
              >
                {plan.name}
              </h3>

              <div className="mb-1">
                <span
                  className="text-3xl md:text-4xl font-bold text-white whitespace-nowrap"
                  data-testid={`text-plan-price-${index}`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-white/40 text-sm ml-1">{plan.period}</span>
                )}
              </div>

              {plan.description && (
                <p
                  className="text-white/50 text-sm mb-5"
                  data-testid={`text-plan-description-${index}`}
                >
                  {plan.description}
                </p>
              )}

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, fi) => (
                  <li
                    key={fi}
                    className="flex items-start gap-2 text-sm text-white/70"
                    data-testid={`list-plan-feature-${index}-${fi}`}
                  >
                    <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.buttonLink || "/contact"}>
                <div
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-2.5 text-sm font-medium text-black rounded-md cursor-pointer transition-all hover:scale-[1.03] nav-glow-btn"
                  style={{
                    background: "linear-gradient(145deg, #ff0000, #cc0000)",
                  }}
                  data-testid={`button-plan-cta-${index}`}
                >
                  {plan.buttonText || "Get Started"}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center text-white/40 text-sm mt-8"
            data-testid="text-pricing-footnote"
          >
            {footnote}
          </motion.p>
        )}
      </div>
    </section>
  );
}
