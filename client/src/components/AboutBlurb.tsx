import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "95%", label: "Client Retention" },
  { value: "7x", label: "Average ROI" },
];

export default function AboutBlurb() {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-8"
      data-testid="section-about-blurb"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
              About Us
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Who We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
              Are
            </span>
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Redline Design was built on a simple idea: businesses deserve
            marketing that actually works. We're a team of strategists,
            designers, and data nerds who treat your budget like our own —
            focused on real results, not vanity metrics. From startups to
            established brands, we build custom strategies that drive measurable
            growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-16">
              {index > 0 && (
                <div className="w-px h-10 bg-white/10" />
              )}
              <div data-testid={`stat-about-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
