import { motion } from "framer-motion";
import { Target, Zap, TrendingUp, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm" data-testid="section-about-hero" data-section-label="About">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: "#ff0000" }}
          >
            About Redline Design
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Digital Marketing That Doesn't Suck
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-about-mission" data-section-label="Mission">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-foreground mb-4">
                We exist to deliver digital marketing that actually works. No fluff, no empty promises, just data-driven strategies that drive real ROI for your business.
              </p>
              <p className="text-lg text-foreground mb-4">
                In a world full of agencies that over-promise and under-deliver, we're different. We focus on what matters: measurable results, transparent reporting, and partnerships built on trust.
              </p>
              <p className="text-lg text-foreground">
                Whether it's SEO, PPC, web design, or social media marketing, we bring expertise, energy, and execution to every project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-card rounded-xl p-6 hover-elevate active-elevate-2">
                <Target className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Results-Focused</h3>
                <p className="text-sm text-muted-foreground">Data-driven strategies that deliver measurable ROI</p>
              </div>

              <div className="bg-card rounded-xl p-6 hover-elevate active-elevate-2">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Fast Execution</h3>
                <p className="text-sm text-muted-foreground">Quick turnaround without sacrificing quality</p>
              </div>

              <div className="bg-card rounded-xl p-6 hover-elevate active-elevate-2">
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Growth-Minded</h3>
                <p className="text-sm text-muted-foreground">Strategies designed to scale with your business</p>
              </div>

              <div className="bg-card rounded-xl p-6 hover-elevate active-elevate-2">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Partner Approach</h3>
                <p className="text-sm text-muted-foreground">We succeed when you succeed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20" data-testid="section-about-differentiation" data-section-label="Why Us">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Sets Us Apart
          </motion.h2>

          <div className="space-y-8">
            <motion.div
              className="bg-card rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">No BS, Just Results</h3>
              <p className="text-foreground">
                We cut through the marketing jargon and focus on what matters: driving traffic, generating leads, and increasing revenue. Our transparent reporting shows exactly what's working and what's not.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">Full-Service Excellence</h3>
              <p className="text-foreground">
                From SEO and PPC to web design and social media, we handle everything under one roof. No need to juggle multiple vendors—we've got you covered.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">Speed & Agility</h3>
              <p className="text-foreground">
                We move fast because we know your business can't wait. Quick turnarounds, rapid deployment, and agile adjustments based on real-time data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to work with us?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can grow your business with data-driven marketing.
          </p>
          <a href="/book-a-demo">
            <motion.button
              className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover-elevate active-elevate-2 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-about-cta"
            >
              Book Your Free Consultation
            </motion.button>
          </a>
        </div>
      </section>
    </div>
  );
}
