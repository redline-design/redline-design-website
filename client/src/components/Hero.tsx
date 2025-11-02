import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, Sparkles } from "lucide-react";
import logoLarge from "@assets/v2h5UOvchlYvZ2HIPfl8w5dPIc_1762041101932.avif";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed animated gradient background */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60"></div>
      </div>

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
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/30 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-primary mb-8 cursor-pointer hover-elevate active-elevate-2 transition-all"
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
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img 
            src={logoLarge} 
            alt="Redline Design" 
            className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)' }}
            data-testid="img-hero-logo"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="text-foreground">Digital Marketing That Drives </span>
          <span className="italic text-primary font-extrabold bg-clip-text">Real Results</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          We help ambitious brands dominate their market with data-driven strategies and measurable ROI
        </motion.p>

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
                className="text-base px-8 py-6 font-semibold button-recessed fill-on-hover shadow-lg shadow-primary/20" 
                data-testid="button-hero-book-demo"
              >
                Book Your Free Consultation
              </Button>
            </motion.div>
          </Link>
          <Link href="/services">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 font-semibold border-primary/30 hover:bg-primary/10" 
                data-testid="button-hero-view-services"
              >
                Explore Our Services
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
          <ChevronDown className="h-6 w-6 text-primary" data-testid="icon-scroll-indicator" />
        </div>
      </motion.div>
    </section>
    </>
  );
}
