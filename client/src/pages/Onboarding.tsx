import { motion } from "framer-motion";

export default function Onboarding() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-onboarding-form">
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
        </div>
      </section>
    </div>
  );
}
