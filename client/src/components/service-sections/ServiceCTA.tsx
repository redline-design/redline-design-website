import { Clock, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

interface ServiceCTAProps {
  title?: string;
  subtitle?: string;
  preSelectedServices?: string[];
}

export default function ServiceCTA({
  title = "Ready to Get Started?",
  subtitle = "Let's discuss how we can help transform your business. Reach out today for a free consultation.",
  preSelectedServices = [],
}: ServiceCTAProps) {
  return (
    <section id="contact-form" className="py-16 md:py-24 px-4 md:px-8" data-testid="section-service-cta" data-section-label="Contact">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 0, 0, 0.2)",
                  boxShadow: "0 0 20px rgba(255, 0, 0, 0.1)",
                }}
              >
                <Rocket className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-6 tracking-tight section-heading-glow"
              data-testid="text-cta-heading"
            >
              {title}
            </h2>
            <p
              className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
              data-testid="text-cta-subtitle"
            >
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div
              className="p-7 md:p-9 rounded-2xl"
              style={{
                background: "rgba(20, 20, 20, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <ContactForm preSelectedServices={preSelectedServices} />
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-3 text-white/40 text-sm mt-6">
            <Clock className="w-4 h-4" />
            <span>Average response time under 24 business hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
