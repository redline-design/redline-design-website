import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, DollarSign, Target, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { 
  SiFacebook, 
  SiInstagram, 
  SiX, 
  SiLinkedin, 
  SiTiktok, 
  SiYoutube, 
  SiPinterest, 
  SiSnapchat,
  SiThreads,
  SiReddit
} from "react-icons/si";

const platforms = [
  { name: "Facebook", icon: SiFacebook, color: "#1877F2" },
  { name: "Instagram", icon: SiInstagram, color: "#E4405F" },
  { name: "X (Twitter)", icon: SiX, color: "#FFFFFF" },
  { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { name: "TikTok", icon: SiTiktok, color: "#FFFFFF" },
  { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { name: "Pinterest", icon: SiPinterest, color: "#E60023" },
  { name: "Snapchat", icon: SiSnapchat, color: "#FFFC00" },
  { name: "Threads", icon: SiThreads, color: "#FFFFFF" },
  { name: "Reddit", icon: SiReddit, color: "#FF4500" },
];

export default function SocialMediaPage() {
  const accentColor = "rgb(59, 130, 246)";
  
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
                <MessageSquare className="w-12 h-12 md:w-16 md:h-16" style={{ color: accentColor }} />
              </div>
            </div>
            
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-service-title"
            >
              Social Media Marketing
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              data-testid="text-service-tagline"
            >
              Turn followers into customers
            </p>
            
            <p className="text-lg text-foreground/80 mb-8" data-testid="text-service-description">
              Build your brand and engage your audience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  data-testid="button-get-started"
                >
                  Get Started
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-platforms-heading">
              Platforms We Master
            </h2>
            <p className="text-lg text-muted-foreground mb-12" data-testid="text-platforms-description">
              We create engaging content and manage campaigns across all major social platforms
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6" data-testid="platforms-grid">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border hover-elevate active-elevate-2"
                  data-testid={`platform-card-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <platform.icon 
                    className="w-10 h-10" 
                    style={{ color: platform.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                {[
                  "Content calendar with engaging posts",
                  "Professional copywriting and graphics",
                  "Community management and engagement",
                  "Paid social advertising campaigns",
                  "Monthly performance analytics"
                ].map((item, index) => (
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
              <p className="text-foreground" data-testid="text-perfect-for">
                Businesses looking to build brand awareness and community
              </p>
            </Card>

            <Card className="p-8" data-testid="card-timeline">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Timeline</h3>
              </div>
              <p className="text-foreground" data-testid="text-timeline">
                Ongoing monthly retainer
              </p>
            </Card>

            <Card className="p-8" data-testid="card-investment">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Investment</h3>
              </div>
              <p className="text-2xl font-bold text-primary" data-testid="text-investment">
                Starting at $1,000/month
              </p>
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
              Let's discuss how we can help grow your business with our proven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  data-testid="button-cta-contact"
                >
                  Contact Us
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
