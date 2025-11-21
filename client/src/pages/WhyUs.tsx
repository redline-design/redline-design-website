import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";
import ValueTile from "@/components/ValueTile";
import CTABand from "@/components/CTABand";
import SectionDivider from "@/components/SectionDivider";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { TrendingUp, DollarSign, Zap, Target, Users, Briefcase, Award, Shield, Lightbulb } from "lucide-react";

export default function WhyUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  useEffect(() => {
    if (reviews.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length, isHovered]);

  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="pt-20">
      <ScrollAnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-why-us-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-6 red-glow-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: "#ff0000" }}
          >
            We Think We're Pretty Cool
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            And we think you will too. Here's why businesses choose Redline Design for their digital marketing needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="default" data-testid="button-see-pricing">
                  See Pricing Options
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-background/90 border-white/20">
                <DialogHeader>
                  <DialogTitle>Let's Discuss Your Budget</DialogTitle>
                  <DialogDescription>
                    Plans start at $500/mo. Fill out the form below and we'll create a custom proposal for your business.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30" data-testid="section-core-values">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              What Sets Us Apart
            </h2>
            <p className="text-lg text-foreground">
              Our commitment to results, transparency, and partnership
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueTile
              icon={TrendingUp}
              title="Maximum ROI"
              description="We've seen returns up to 14x. Our data-driven approach focuses on what actually drives revenue."
            />
            <ValueTile
              icon={DollarSign}
              title="Surprisingly Affordable"
              description="Plans start at $500/mo. Enterprise-level marketing without enterprise-level prices."
              delay={0.1}
            />
            <ValueTile
              icon={Zap}
              title="Quick Turnaround"
              description="Most updates in <24 business hours. We move fast so you can stay ahead of the competition."
              delay={0.2}
            />
            <ValueTile
              icon={Target}
              title="Success Driven"
              description="We measure everything that matters. No vanity metrics—just real business outcomes."
              delay={0.3}
            />
            <ValueTile
              icon={Briefcase}
              title="Full Service"
              description="Web, CRM, creative—one team. Everything you need under one roof."
              delay={0.4}
            />
            <ValueTile
              icon={Users}
              title="Individual Focus"
              description="Personalized strategies for your business. No cookie-cutter solutions here."
              delay={0.5}
            />
          </div>
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-additional-benefits">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }}>
              More Reasons to Choose Redline
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full"
              >
                <div
                  className="neumorphic-card h-full text-center p-8 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%)",
                    boxShadow: `
                      8px 8px 16px rgba(0, 0, 0, 0.9),
                      -4px -4px 8px rgba(255, 255, 255, 0.02),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                      inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                    `,
                  }}
                >
                  <motion.div 
                    className="inline-flex p-5 rounded-lg mb-6"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(255, 0, 0, 0.05) 100%)",
                      border: "1.5px solid rgba(255, 0, 0, 0.3)",
                      boxShadow: `
                        6px 6px 12px rgba(0, 0, 0, 0.4),
                        -3px -3px 8px rgba(255, 255, 255, 0.02),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                        0 0 16px rgba(255, 0, 0, 0.2)
                      `,
                    }}
                  >
                    <Award className="h-8 w-8 text-primary drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wider">Industry Expertise</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    We've worked across dozens of industries and know what works. From e-commerce to B2B SaaS, we've got you covered.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full"
              >
                <div
                  className="neumorphic-card h-full text-center p-8 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%)",
                    boxShadow: `
                      8px 8px 16px rgba(0, 0, 0, 0.9),
                      -4px -4px 8px rgba(255, 255, 255, 0.02),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                      inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                    `,
                  }}
                >
                  <motion.div 
                    className="inline-flex p-5 rounded-lg mb-6"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(255, 0, 0, 0.05) 100%)",
                      border: "1.5px solid rgba(255, 0, 0, 0.3)",
                      boxShadow: `
                        6px 6px 12px rgba(0, 0, 0, 0.4),
                        -3px -3px 8px rgba(255, 255, 255, 0.02),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                        0 0 16px rgba(255, 0, 0, 0.2)
                      `,
                    }}
                  >
                    <Shield className="h-8 w-8 text-primary drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wider">Transparency & Trust</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    No black boxes. We show you exactly what we're doing, why we're doing it, and what results we're getting.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full"
              >
                <div
                  className="neumorphic-card h-full text-center p-8 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%)",
                    boxShadow: `
                      8px 8px 16px rgba(0, 0, 0, 0.9),
                      -4px -4px 8px rgba(255, 255, 255, 0.02),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                      inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                    `,
                  }}
                >
                  <motion.div 
                    className="inline-flex p-5 rounded-lg mb-6"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(255, 0, 0, 0.05) 100%)",
                      border: "1.5px solid rgba(255, 0, 0, 0.3)",
                      boxShadow: `
                        6px 6px 12px rgba(0, 0, 0, 0.4),
                        -3px -3px 8px rgba(255, 255, 255, 0.02),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                        0 0 16px rgba(255, 0, 0, 0.2)
                      `,
                    }}
                  >
                    <Lightbulb className="h-8 w-8 text-primary drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wider">Strategic Partnership</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    We're not just vendors—we're partners in your success. Your wins are our wins, and we're invested in your growth.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30" data-testid="section-testimonial">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {currentReview && (
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <blockquote className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                    "{currentReview.content}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <div className="font-bold text-foreground">{currentReview.name}</div>
                      <div className="text-sm text-foreground">
                        {currentReview.role && currentReview.company 
                          ? `${currentReview.role}, ${currentReview.company}`
                          : currentReview.role || currentReview.company || ''}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-why-us-cta">
        <div className="max-w-7xl mx-auto">
          <CTABand
            title="Ready to See What We Can Do for You?"
            subtitle="Let's have a conversation about your goals and how we can help you achieve them."
            buttonText="Book Free Consultation"
            buttonLink="/book-a-demo"
          />
        </div>
      </section>
      </ScrollAnimatedSection>
    </div>
  );
}
