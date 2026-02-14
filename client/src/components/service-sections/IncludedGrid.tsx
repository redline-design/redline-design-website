import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IncludedItem {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

interface IncludedGridProps {
  title: string;
  subtitle?: string;
  items: IncludedItem[];
  columns?: 2 | 3 | 4;
}

function getGridCols(cols: number): string {
  if (cols === 2) return "grid-cols-1 md:grid-cols-2";
  if (cols === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function IncludedGrid({ title, subtitle, items, columns = 3 }: IncludedGridProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-included">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            data-testid="text-included-heading"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/50 text-base md:text-lg" data-testid="text-included-subtitle">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid gap-6 ${getGridCols(columns)}`}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-5 md:p-6 rounded-md"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-included-${index}`}
              >
                <div className="flex items-start gap-3">
                  {Icon && (
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-red-500" />
                    </div>
                  )}
                  <div>
                    <h3
                      className="text-sm font-semibold text-white mb-1"
                      data-testid={`text-included-title-${index}`}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className="text-white/50 text-xs leading-relaxed"
                        data-testid={`text-included-description-${index}`}
                      >
                        {item.description}
                      </p>
                    )}
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
