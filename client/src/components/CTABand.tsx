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
  phoneNumber?: string;
  phoneHref?: string;
}

export default function CTABand({ title, subtitle, buttonText, buttonLink, phoneNumber, phoneHref }: CTABandProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="py-8 px-4 text-center relative"
      data-testid="section-cta-band"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
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
        {phoneNumber && phoneHref && (
          <p className="mt-4 text-sm text-white/60">
            Or call us at{" "}
            <a href={phoneHref} className="text-white/70 hover:text-white transition-colors underline" data-testid="link-cta-phone">
              {phoneNumber}
            </a>
          </p>
        )}
      </div>
    </motion.div>
  );
}
