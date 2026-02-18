import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ServiceHero({ title, subtitle, description }: ServiceHeroProps) {
  const words = title.split(" ");
  const lastWord = words.pop();
  const leadingWords = words.join(" ");

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-service-hero">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            data-testid="text-hero-title"
          >
            {leadingWords}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
              {lastWord}
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/50 mb-4 max-w-2xl mx-auto"
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2" data-testid="button-hero-get-started">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/book-a-demo">
              <Button size="lg" variant="outline" data-testid="button-hero-book-demo">
                Book a Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
