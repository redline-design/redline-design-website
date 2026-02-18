import { Link } from "wouter";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ServiceHero({ title, subtitle, description }: ServiceHeroProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-service-hero">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold text-red-500 mb-6 tracking-tight section-heading-glow"
            data-testid="text-hero-title"
          >
            {title}
          </h1>

          <p
            className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            {subtitle}
          </p>

          <p
            className="text-base md:text-lg text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-description"
          >
            {description}
          </p>

          <div className="flex justify-center">
            <Link href="/contact">
              <div
                className="inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-medium text-black rounded-md cursor-pointer transition-all hover:scale-[1.03] nav-glow-btn"
                style={{
                  background: "linear-gradient(145deg, #ff0000, #cc0000)",
                }}
                data-testid="button-hero-get-started"
              >
                <Rocket className="h-5 w-5" />
                Get Started
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
