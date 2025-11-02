import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { TrendingUp, Users, DollarSign, Award, ArrowRight } from "lucide-react";

interface CaseStudyProps {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  services: string[];
  delay?: number;
}

function CaseStudy({ company, industry, challenge, solution, results, services, delay = 0 }: CaseStudyProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      data-testid={`case-study-${company.toLowerCase().replace(/\s/g, "-")}`}
    >
      <Card className="rounded-2xl overflow-hidden backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl hover-elevate">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-2xl font-bold text-foreground">{company}</h3>
              <Badge variant="outline" className="ml-4">{industry}</Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {services.map((service) => (
                <Badge key={service} variant="secondary" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Challenge</h4>
              <p className="text-foreground">{challenge}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Solution</h4>
              <p className="text-foreground">{solution}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {results.map((result, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-background/50">
                <result.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">{result.value}</div>
                <div className="text-xs text-muted-foreground">{result.metric}</div>
              </div>
            ))}
          </div>

          <Link href="/book-a-demo">
            <Button variant="outline" className="w-full group" data-testid={`button-case-study-${company.toLowerCase().replace(/\s/g, "-")}`}>
              Get Similar Results
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const caseStudies: CaseStudyProps[] = [
  {
    company: "TechFlow Solutions",
    industry: "SaaS",
    challenge: "A B2B SaaS company struggling with low organic traffic and poor conversion rates despite having a solid product.",
    solution: "Implemented comprehensive SEO strategy, redesigned landing pages, and launched targeted PPC campaigns focusing on decision-makers.",
    results: [
      { metric: "Organic Traffic", value: "+420%", icon: TrendingUp },
      { metric: "Lead Quality", value: "+85%", icon: Award },
      { metric: "Conversion Rate", value: "3.2%", icon: Users },
      { metric: "ROI", value: "18x", icon: DollarSign },
    ],
    services: ["SEO", "PPC", "Web Design"],
  },
  {
    company: "Urban Eats",
    industry: "Restaurant Chain",
    challenge: "Multi-location restaurant chain needed to increase online orders and improve brand awareness across 12 locations.",
    solution: "Developed location-based SEO strategy, social media campaigns showcasing menu items, and email marketing for loyalty program.",
    results: [
      { metric: "Online Orders", value: "+215%", icon: TrendingUp },
      { metric: "Social Reach", value: "500K+", icon: Users },
      { metric: "Email Open Rate", value: "42%", icon: Award },
      { metric: "Revenue Growth", value: "+65%", icon: DollarSign },
    ],
    services: ["SEO", "Social Media", "Email Marketing"],
  },
  {
    company: "FitLife Gear",
    industry: "E-commerce",
    challenge: "Athletic apparel brand facing high cart abandonment rates and struggling to compete with established brands.",
    solution: "Optimized product pages for SEO, implemented retargeting campaigns, and created engaging social media content with influencer partnerships.",
    results: [
      { metric: "Cart Recovery", value: "+145%", icon: TrendingUp },
      { metric: "ROAS", value: "12.5x", icon: DollarSign },
      { metric: "Social Engagement", value: "+320%", icon: Users },
      { metric: "Brand Awareness", value: "+180%", icon: Award },
    ],
    services: ["PPC", "Social Media", "SEO"],
  },
  {
    company: "Precision Legal",
    industry: "Legal Services",
    challenge: "Law firm with minimal online presence needed to establish authority and generate qualified leads in competitive market.",
    solution: "Built SEO-optimized website with practice area content, launched Google Ads campaigns, and developed thought leadership blog.",
    results: [
      { metric: "Qualified Leads", value: "+280%", icon: Users },
      { metric: "Page 1 Rankings", value: "45+", icon: TrendingUp },
      { metric: "Cost Per Lead", value: "-60%", icon: DollarSign },
      { metric: "Case Intake", value: "+95%", icon: Award },
    ],
    services: ["SEO", "PPC", "Web Design", "Content"],
  },
];

export default function OurWork() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-our-work-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Real Results from <span className="text-primary">Real Clients</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how we've helped businesses like yours achieve measurable growth through data-driven digital marketing strategies.
          </motion.p>
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] red-glow-pulse"
            style={{ color: "#ff0000" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Portfolio
          </motion.h2>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-case-studies">
        <div className="max-w-7xl mx-auto space-y-8">
          {caseStudies.map((study, index) => (
            <CaseStudy
              key={study.company}
              {...study}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-cta">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg text-foreground mb-8">
              Let's discuss how we can help you achieve similar results.
            </p>
            <Link href="/book-a-demo">
              <Button size="lg" className="text-base px-8 py-6 font-semibold" data-testid="button-cta-book-demo">
                Book a Free Strategy Session
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
