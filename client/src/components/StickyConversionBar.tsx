import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ChevronDown, Lightbulb, TrendingUp, Users, Target, Eye, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, AlertTriangle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useChallengesIconContext } from "@/contexts/ChallengesIconContext";

export default function StickyConversionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('stickyBarDismissed') === 'true';
    }
    return false;
  });

  const { hasMergedIcons, isHovering, setIsHovering } = useChallengesIconContext();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const challengeIcons = [
    { Icon: Eye, className: "icon-3d-blue", label: "Visibility" },
    { Icon: MousePointerClick, className: "icon-3d-orange", label: "Conversion" },
    { Icon: LayoutGrid, className: "icon-3d-purple", label: "Integration" },
    { Icon: BarChart2, className: "icon-3d-green", label: "Analytics" },
    { Icon: Monitor, className: "icon-3d-cyan", label: "Modern Sites" },
    { Icon: Database, className: "icon-3d-pink", label: "CRM" },
    { Icon: AlertTriangle, className: "icon-3d-yellow", label: "Optimization" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingDown = currentScrollY > lastScrollY;
          
          // Only show if scrolled past 300px, not dismissed, and scrolling up
          if (currentScrollY > 300 && !isDismissed && !scrollingDown) {
            setIsVisible(true);
          } else if (currentScrollY <= 300 || scrollingDown) {
            setIsVisible(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    // Persist dismissal to localStorage
    localStorage.setItem('stickyBarDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
          data-testid="section-sticky-conversion-bar"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pointer-events-auto">
            <div className="bg-card border border-primary/30 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse" />
              
              <div className="relative p-4 sm:p-5">
                {/* Main CTA Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      Ready to grow your business?
                    </h3>
                    <p className="text-sm text-foreground/80">
                      Book a free consultation—no commitment, just real advice.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasMergedIcons && (
                      <div className="relative">
                        <button
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className="p-2 rounded-lg hover-elevate active-elevate-2 text-primary hover:text-primary transition-colors"
                          data-testid="button-challenges-icon"
                          aria-label="View Challenges We Solve"
                        >
                          <Layers className="h-6 w-6" />
                        </button>
                        
                        <AnimatePresence>
                          {isHovering && (
                            <motion.div
                              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                              transition={{ 
                                duration: prefersReducedMotion ? 0 : 0.3,
                                staggerChildren: prefersReducedMotion ? 0 : 0.05,
                                delayChildren: prefersReducedMotion ? 0 : 0.1
                              }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card/95 backdrop-blur-md border border-primary/30 rounded-xl p-3 shadow-2xl"
                              data-testid="challenges-icons-popup"
                            >
                              <div className="flex flex-col gap-2">
                                {challengeIcons.map(({ Icon, className, label }, index) => (
                                  <motion.div
                                    key={index}
                                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: prefersReducedMotion ? 0 : 0.2,
                                      delay: prefersReducedMotion ? 0 : index * 0.05
                                    }}
                                    className="flex items-center gap-2 p-2 rounded-lg hover-elevate"
                                    data-testid={`challenge-icon-${index}`}
                                  >
                                    <Icon className={`h-5 w-5 ${className}`} />
                                    <span className="text-xs text-foreground whitespace-nowrap">{label}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <Link href="/contact">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                        data-testid="button-sticky-cta"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Free Consultation
                      </Button>
                    </Link>

                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-2 rounded-lg hover-elevate active-elevate-2 text-foreground/60 hover:text-foreground transition-colors"
                      data-testid="button-toggle-explainer"
                      aria-label="New to Digital Marketing?"
                    >
                      <div className="flex items-center gap-1">
                        <Lightbulb className="h-5 w-5" />
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </button>

                    <button
                      onClick={handleDismiss}
                      className="p-2 rounded-lg hover-elevate active-elevate-2 text-foreground/60 hover:text-foreground transition-colors"
                      data-testid="button-dismiss-sticky-bar"
                      aria-label="Dismiss"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Beginner Explainer Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-border/30 space-y-4">
                          {/* Simple Explanation */}
                          <div>
                            <h5 className="text-sm font-semibold text-foreground mb-2">
                              What is Digital Marketing?
                            </h5>
                            <p className="text-sm text-foreground/90 leading-relaxed">
                              Digital marketing is how businesses reach customers online. Instead of billboards or TV ads, 
                              you connect with people where they already spend time—on Google, social media, and email. 
                              It's measurable, targeted, and way more affordable than traditional advertising.
                            </p>
                          </div>

                          {/* Simple Process */}
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div className="text-center p-3 rounded-xl bg-background/50" data-testid="card-step-reach">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                <Users className="w-5 h-5 text-primary" />
                              </div>
                              <h6 className="font-semibold text-sm text-foreground mb-1">1. Reach</h6>
                              <p className="text-xs text-foreground/70">
                                Get found by people actively searching for what you offer
                              </p>
                            </div>

                            <div className="text-center p-3 rounded-xl bg-background/50" data-testid="card-step-engage">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                <Target className="w-5 h-5 text-primary" />
                              </div>
                              <h6 className="font-semibold text-sm text-foreground mb-1">2. Engage</h6>
                              <p className="text-xs text-foreground/70">
                                Show them why your business is the right choice
                              </p>
                            </div>

                            <div className="text-center p-3 rounded-xl bg-background/50" data-testid="card-step-convert">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                              </div>
                              <h6 className="font-semibold text-sm text-foreground mb-1">3. Convert</h6>
                              <p className="text-xs text-foreground/70">
                                Turn visitors into customers and track every result
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
}
