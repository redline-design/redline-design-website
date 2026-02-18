import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, TrendingUp, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function BeginnerExplainer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" data-testid="section-beginner-explainer">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-card/60 backdrop-blur-md border-primary/20">
          <CardContent className="p-6 sm:p-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full text-left group"
              data-testid="button-toggle-explainer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                      New to Digital Marketing?
                    </h2>
                    <p className="text-sm text-foreground/70">
                      {isExpanded ? "Click to hide" : "Click to learn the basics"}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-foreground/60" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-border/30 space-y-6">
                    {/* Simple Explanation */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        What is Digital Marketing?
                      </h3>
                      <p className="text-foreground/90 leading-relaxed">
                        Digital marketing is how businesses reach customers online. Instead of billboards or TV ads, 
                        you connect with people where they already spend time—on Google, social media, and email. 
                        It's measurable, targeted, and way more affordable than traditional advertising.
                      </p>
                    </div>

                    {/* Simple Process */}
                    <div className="grid sm:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 rounded-xl bg-background/50" data-testid="card-step-reach">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">1. Reach</h4>
                        <p className="text-sm text-foreground/70">
                          Get found by people actively searching for what you offer
                        </p>
                      </div>

                      <div className="text-center p-4 rounded-xl bg-background/50" data-testid="card-step-engage">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">2. Engage</h4>
                        <p className="text-sm text-foreground/70">
                          Show them why your business is the right choice
                        </p>
                      </div>

                      <div className="text-center p-4 rounded-xl bg-background/50" data-testid="card-step-convert">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">3. Convert</h4>
                        <p className="text-sm text-foreground/70">
                          Turn visitors into customers and track every result
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-6 border-t border-border/30 text-center">
                      <p className="text-foreground/90 mb-4">
                        Still have questions? Let's talk. No jargon, no pressure—just honest advice.
                      </p>
                      <Link href="/contact">
                        <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-explainer-cta">
                          Book a Free Consultation
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
