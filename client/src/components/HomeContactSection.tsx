import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
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
    value: "(888) 695-2710",
    href: "tel:+18886952710",
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
      className="py-16 md:py-24 px-4 md:px-8"
      data-testid="section-home-contact"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
              Contact Us
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
              Touch
            </span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">
            Ready to grow your business? Reach out and let&apos;s talk strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="space-y-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 p-5 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    data-testid={`contact-detail-${detail.label.toLowerCase()}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                        {detail.label}
                      </p>
                      <p className="text-white text-sm md:text-base">
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
                      className="block transition-opacity hover:opacity-80"
                      data-testid={`link-contact-${detail.label.toLowerCase()}`}
                    >
                      {content}
                    </a>
                  );
                }

                return content;
              })}
            </div>

            <div
              className="p-5 rounded-lg mt-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-white/60 text-sm leading-relaxed">
                Average response time is less than 24 business hours. We look
                forward to learning about your business and building a strategy
                that delivers real results.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div
              className="p-6 md:p-8 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
