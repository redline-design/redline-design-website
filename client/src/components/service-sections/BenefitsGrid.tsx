import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12 section-heading-glow"
          data-testid="text-benefits-heading"
        >
          Why It Matters
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 md:p-8 rounded-md"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-benefit-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold text-white mb-2"
                      data-testid={`text-benefit-title-${index}`}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-white/60 text-sm leading-relaxed"
                      data-testid={`text-benefit-description-${index}`}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
