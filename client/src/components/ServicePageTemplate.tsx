import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, DollarSign, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";

interface ServicePageTemplateProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description?: string;
  whatYouGet: string[];
  perfectFor: string;
  timeline: string;
  investment: string;
  status: "accepting" | "waitlist";
  accentColor?: string;
}

export default function ServicePageTemplate({
  icon: Icon,
  title,
  tagline,
  description,
  whatYouGet,
  perfectFor,
  timeline,
  investment,
  status,
  accentColor = "#737373"
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen">
      <ScrollAnimatedSection>
        <div className="relative overflow-hidden bg-gradient-to-br from-background/80 via-card/40 to-background/80 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div 
                className="p-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-border"
                data-testid="service-icon"
              >
                <Icon className="w-12 h-12 md:w-16 md:h-16" style={{ color: accentColor }} />
              </div>
            </div>
            
            {status === "waitlist" && (
              <Badge 
                variant="secondary" 
                className="mb-4"
                data-testid="badge-waitlist"
              >
                Join Waitlist
              </Badge>
            )}
            
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-service-title"
            >
              {title}
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              data-testid="text-service-tagline"
            >
              {tagline}
            </p>
            
            {description && (
              <p className="text-lg text-foreground/80 mb-8" data-testid="text-service-description">
                {description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  data-testid="button-get-started"
                >
                  {status === "waitlist" ? "Join Waitlist" : "Get Started"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/book-a-demo">
                <Button 
                  size="lg" 
                  variant="outline"
                  data-testid="button-book-demo"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full" data-testid="card-what-you-get">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">What You Get</h2>
              </div>
              
              <ul className="space-y-4">
                {whatYouGet.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3"
                    data-testid={`list-item-benefit-${index}`}
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-8" data-testid="card-perfect-for">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Perfect For</h3>
              </div>
              <p className="text-foreground" data-testid="text-perfect-for">{perfectFor}</p>
            </Card>

            <Card className="p-8" data-testid="card-timeline">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Timeline</h3>
              </div>
              <p className="text-foreground" data-testid="text-timeline">{timeline}</p>
            </Card>

            <Card className="p-8" data-testid="card-investment">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Investment</h3>
              </div>
              <p className="text-2xl font-bold text-primary" data-testid="text-investment">{investment}</p>
            </Card>
          </motion.div>
        </div>
      </div>
      </ScrollAnimatedSection>

      <SectionDivider />

      <ScrollAnimatedSection>
        <div className="bg-card/40 backdrop-blur-sm border-y border-border py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-heading">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
              {status === "waitlist" 
                ? "Join our waitlist and be the first to know when we open up spots."
                : "Let's discuss how we can help grow your business with our proven strategies."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  data-testid="button-cta-contact"
                >
                  {status === "waitlist" ? "Join Waitlist" : "Contact Us"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg"
                  variant="outline"
                  data-testid="button-view-all-services"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      </ScrollAnimatedSection>
    </div>
  );
}
