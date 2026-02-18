import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCTAProps {
  title?: string;
  subtitle?: string;
}

export default function ServiceCTA({
  title = "Ready to Get Started?",
  subtitle = "Let's discuss how we can help transform your business. Reach out today for a free consultation.",
}: ServiceCTAProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-service-cta" data-section-label="Get Started">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-red-500 mb-4 section-heading-glow"
            data-testid="text-cta-heading"
          >
            {title}
          </h2>
          <p
            className="text-white/80 text-base md:text-lg mb-10 leading-relaxed"
            data-testid="text-cta-subtitle"
          >
            {subtitle}
          </p>

          <div className="flex justify-center">
            <Link href="/contact">
              <div
                className="inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-medium text-black rounded-md cursor-pointer transition-all hover:scale-[1.03] nav-glow-btn"
                style={{
                  background: "linear-gradient(145deg, #ff0000, #cc0000)",
                }}
                data-testid="button-cta-contact"
              >
                <Rocket className="h-5 w-5" />
                Contact Us
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
