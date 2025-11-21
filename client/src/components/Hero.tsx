import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, Sparkles, CalendarCheck } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import logoLarge from "@assets/v2h5UOvchlYvZ2HIPfl8w5dPIc_1762041101932.avif";
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
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 text-center"
        style={{ opacity, scale, y }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <Link href="/book-a-demo">
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border/50 bg-card/30 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-foreground mb-8 hover-elevate active-elevate-2 transition-all subtle-shimmer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free Strategy Session Available</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <style>{`
            @keyframes heroLogoShimmer {
              0%, 100% {
                clip-path: inset(100% 0 0 0);
              }
              50% {
                clip-path: inset(0 0 0 0);
              }
            }
          `}</style>
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            {/* Base logo */}
            <img 
              src={logoLarge} 
              alt="Redline Design" 
              loading="eager"
              className="w-full"
              data-testid="img-hero-logo"
            />
            {/* Red glow overlay - only affects red parts */}
            <img 
              src={logoLarge} 
              alt="" 
              loading="eager"
              className="w-full absolute inset-0"
              style={{
                filter: 'brightness(2.5) saturate(3) hue-rotate(-10deg) contrast(1.5) sepia(0.3)',
                animation: 'heroLogoShimmer 4s ease-in-out infinite',
                mixBlendMode: 'lighten',
                WebkitMaskImage: 'linear-gradient(to right, rgba(255,0,0,1), rgba(255,0,0,1))',
                maskImage: 'linear-gradient(to right, rgba(255,0,0,1), rgba(255,0,0,1))'
              }}
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.h2 
          className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.3em] mb-12 red-glow-pulse"
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

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll</span>
          <ChevronDown className="h-6 w-6 text-foreground" data-testid="icon-scroll-indicator" />
        </div>
      </motion.div>
    </section>
    </>
  );
}
