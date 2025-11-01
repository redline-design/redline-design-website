import { motion } from "framer-motion";

export default function Onboarding() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-onboarding-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Client <span className="text-primary">Onboarding</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Complete our comprehensive onboarding form to help us deliver exceptional results for your business
          </motion.p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8" data-testid="section-onboarding-form">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden backdrop-blur-md bg-card/40 border border-white/10 shadow-2xl"
          >
            <iframe
              src="https://onboard-redline6.replit.app?embed=true&theme=dark"
              width="100%"
              height="900"
              style={{
                border: 'none',
                borderRadius: '1rem',
              }}
              title="Client Onboarding Form"
              data-testid="iframe-onboarding"
              className="w-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{" "}
              <a
                href="mailto:hello@redlinedesignllc.com"
                className="text-primary hover:underline"
                data-testid="link-contact-email"
              >
                hello@redlinedesignllc.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
