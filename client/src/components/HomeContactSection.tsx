import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "sales@redlinedesignllc.com",
    href: "mailto:sales@redlinedesignllc.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(208) 867-4526",
    href: "tel:+12088674526",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Serving clients nationwide",
    href: null,
  },
];

export default function HomeContactSection() {
  return (
    <section
      className="py-20 md:py-32 px-4 md:px-8"
      data-testid="section-home-contact"
      data-section-label="Contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-6 tracking-tight section-heading-glow"
              data-testid="text-contact-heading"
            >
              Ready to Grow?
            </h2>
            <p
              className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
              data-testid="text-contact-subtitle"
            >
              Let's talk about your business goals and build a marketing
              strategy that delivers real, measurable results.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              const inner = (
                <div
                  key={detail.label}
                  className="flex items-center gap-3"
                  data-testid={`contact-detail-${detail.label.toLowerCase()}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">
                      {detail.label}
                    </p>
                    <p className="text-white font-medium text-sm">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );

              if (detail.href) {
                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="block group"
                    data-testid={`link-contact-${detail.label.toLowerCase()}`}
                  >
                    {inner}
                  </a>
                );
              }

              return <div key={detail.label}>{inner}</div>;
            })}
          </div>

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
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg" data-testid="text-form-title">
                    Send us a message
                  </h3>
                  <p className="text-white/50 text-xs">We'll get back to you shortly</p>
                </div>
              </div>
              <ContactForm />
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
