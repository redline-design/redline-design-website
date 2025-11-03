import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function StickyConversionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    // Check localStorage on mount
    if (typeof window !== 'undefined') {
      return localStorage.getItem('stickyBarDismissed') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
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
            <div className="bg-card border border-primary/30 rounded-2xl shadow-2xl backdrop-blur-xl p-4 sm:p-5 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse" />
              
              <div className="relative flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                    Ready to grow your business?
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Book a free consultation—no commitment, just real advice.
                  </p>
                </div>

                <div className="flex items-center gap-3">
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
                    onClick={handleDismiss}
                    className="p-2 rounded-lg hover-elevate active-elevate-2 text-foreground/60 hover:text-foreground transition-colors"
                    data-testid="button-dismiss-sticky-bar"
                    aria-label="Dismiss"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
