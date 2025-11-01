import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import logoLarge from "@assets/v2h5UOvchlYvZ2HIPfl8w5dPIc_1762037727160.avif";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();

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
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/book-a-demo">
            <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary bg-primary/10 rounded-full text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-8 cursor-pointer hover-elevate active-elevate-2 badge-pulse transition-all fill-on-hover">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Free Consultation
            </div>
          </Link>
          <div className="mb-6">
            <img 
              src={logoLarge} 
              alt="Redline Design" 
              className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
              style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)' }}
              data-testid="img-hero-logo"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-8 tracking-wide">
            <span className="text-foreground">Digital Marketing That Drives </span>
            <span className="italic text-primary font-semibold">Real Results</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/book-a-demo">
            <Button size="lg" variant="default" className="text-base px-10 py-6 text-lg button-recessed fill-on-hover" data-testid="button-hero-book-demo">
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
