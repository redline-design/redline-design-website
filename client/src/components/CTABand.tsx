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
      className="py-20"
      data-testid="section-cta-band"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4 red-glow-pulse" style={{ color: "#ff0000" }} data-testid="text-cta-title">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-subtitle">
            {subtitle}
          </p>
        )}
        <Link href={buttonLink}>
          <Button size="lg" variant="default" className="text-base px-8" data-testid="button-cta">
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
