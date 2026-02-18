import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, Sparkles, CalendarCheck } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import logoLarge from "@assets/v2h5UOvchlYvZ2HIPfl8w5dPIc_1762041101932.avif";
import newLogoFull from "@assets/RedlineLogoFull_1763765504169.png";
import TextResolver from "@/components/TextResolver";

export default function Hero() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = prefersReducedMotion ? 1 : useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = prefersReducedMotion ? 1 : useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = prefersReducedMotion ? 0 : useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 text-center"
        style={{ opacity, scale, y }}
      >
        {/* Logo */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            {/* Base logo */}
            <img 
              src={newLogoFull} 
              alt="Redline Design" 
              loading="eager"
              className="w-full"
              data-testid="img-hero-logo"
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.h2 
          className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.3em] -mt-4 mb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ color: "#ff0000" }}
        >
          <TextResolver 
            text="Digital Marketing That Doesn't Suck" 
            delay={400}
            timeout={20}
            iterations={2}
          />
        </motion.h2>

        {/* Badge - Moved to bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.6 }}
          className="mt-12"
        >
          <Link href="/book-a-demo">
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border/50 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground hover-elevate active-elevate-2 transition-all subtle-shimmer"
              style={{
                background: 'rgba(15, 15, 15, 0.85)',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span>Free Strategy Session Available</span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="absolute inset-x-0 bottom-32 z-10 flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <Link href="/book-a-demo">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              variant="default" 
              className="text-base px-8 py-6 font-semibold" 
              data-testid="button-hero-book-demo"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Your Free Consultation
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 0, 0, 0.2)',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <ChevronDown className="h-6 w-6" style={{ color: '#ff0000' }} data-testid="icon-scroll-indicator" />
        </div>
      </motion.div>
    </section>
    </>
  );
}
