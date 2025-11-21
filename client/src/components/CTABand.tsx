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
      className="py-8 px-4 text-center relative"
      style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.5) 0%, rgba(20, 20, 20, 0.3) 100%)',
        boxShadow: 'inset 0 1px 2px rgba(255, 0, 0, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 0, 0, 0.1)'
      }}
      data-testid="section-cta-band"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-3 red-glow-pulse" style={{ color: "#ff0000" }} data-testid="text-cta-title">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            {subtitle}
          </p>
        )}
        <Link href={buttonLink}>
          <Button 
            size="sm" 
            variant="default" 
            className="font-semibold" 
            data-testid="button-cta"
          >
            {buttonText}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
