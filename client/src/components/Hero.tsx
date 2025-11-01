import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import logoLarge from "@assets/Asset 3_1762033498074.png";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-2 border border-primary/30 rounded-full text-xs uppercase tracking-wider text-muted-foreground mb-8">
            Free Consultation
          </div>
          <div className="mb-6">
            <img 
              src={logoLarge} 
              alt="Redline Design" 
              className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
              data-testid="img-hero-logo"
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-primary mb-8 uppercase tracking-wide">
            Digital Marketing That Doesn't Suck
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/book-a-demo">
            <Button size="lg" variant="default" className="text-base px-10 py-6 text-lg shimmer" data-testid="button-hero-book-demo">
              Book a Free Consultation
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground" data-testid="icon-scroll-indicator" />
      </motion.div>
    </section>
  );
}
