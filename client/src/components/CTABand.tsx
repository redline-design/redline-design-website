import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface CTABandProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTABand({ title, subtitle, buttonText, buttonLink }: CTABandProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4"
      data-testid="section-cta-band"
    >
      <div 
        className="neumorphic-card max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)',
        }}
      >
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 0, 0, 0.1) 10px,
              rgba(255, 0, 0, 0.1) 20px
            )`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-6 red-glow-pulse" style={{ color: "#ff0000" }} data-testid="text-cta-title">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
              {subtitle}
            </p>
          )}
          <Link href={buttonLink}>
            <Button 
              size="lg" 
              variant="default" 
              className="text-base px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" 
              data-testid="button-cta"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
