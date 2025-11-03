import { motion } from "framer-motion";
import { Zap, MessageSquare, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 backdrop-blur-sm" data-testid="section-about-hero">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: "#ff0000" }}
          >
            Meet the Team
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The people behind Digital Marketing That Doesn't Suck
          </motion.p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-team-members">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Ryan Howard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl p-8 cursor-pointer hover-elevate active-elevate-2"
              data-testid="card-team-ryan"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">Ryan Howard</h2>
                <p className="text-xl text-primary font-semibold">President</p>
                <p className="text-sm text-muted-foreground italic mt-2">"Work hard, play harder."</p>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-foreground">
                  Lives life 100 MPH at a time, plays with fire.
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Fast Lane Drive Member</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Co-Owner of Heroes Coaching & Rehabilitation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Co-Founder of Cosmos Digital Marketing</span>
                  </li>
                </ul>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 mb-6 italic text-foreground">
                "Burning rubber or the midnight oil, I'm all about momentum. I thrive on fast-paced work, great music, spontaneous travel, and meeting people who challenge the norm. Marketing is my playground, and I bring energy, precision, and a relentless work ethic to every project I take on. Life isn't meant to be static—so I'm always moving forward."
              </blockquote>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Marketing Strategy</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">High-Velocity Execution</span>
                </div>
              </div>
            </motion.div>

            {/* Peru Mendoza */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-2xl p-8 cursor-pointer hover-elevate active-elevate-2"
              data-testid="card-team-peru"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">Peru Mendoza</h2>
                <p className="text-xl text-primary font-semibold">Director of Development</p>
                <p className="text-sm text-muted-foreground italic mt-2">"Like a mullet. Business in the front, party in the back."</p>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-foreground">
                  Officially, I'm the Director of Development at Redline Design. Unofficially? I make sure our brilliant team builds robust digital solutions that work exceptionally and actually help your bottom line.
                </p>
                <p className="text-foreground">
                  I focus on smart technical strategy and clear oversight – no confusing jargon, just effective execution explained clearly (in English or Spanish!). We build solutions designed to deliver results, not confusion, because great communication is key to digital marketing that doesn't suck.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 mb-6 italic text-foreground">
                "If that sounds like the approach you need, book a meeting with me. Let's talk impressive outcomes."
              </blockquote>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Bilingual (English/Spanish)</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Strategic Partnerships</span>
                </div>
              </div>
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
