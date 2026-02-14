import { motion } from "framer-motion";
import { Globe, TrendingUp, Search, Database, BarChart3, Palette, MessageSquare, Mail, Users, Bot, ArrowRight, Server } from "lucide-react";

const SERVICES_DATA = [
  {
    id: "web",
    icon: Globe,
    title: "Websites",
    description: "Custom-built websites that captivate visitors and convert them into loyal customers. From responsive design to e-commerce solutions, we build digital experiences that define your brand.",
    tagline: "Your digital storefront that works 24/7",
    link: "/services/websites",
    status: "accepting" as const,
    accentColor: "rgb(96, 165, 250)",
    details: {
      whatYouGet: [
        "Mobile-responsive design",
        "Fast loading speeds",
        "SEO-optimized structure",
        "Easy content management"
      ],
      timeline: "2-4 weeks",
      investment: "From $1,000"
    }
  },
  {
    id: "ppc",
    icon: TrendingUp,
    title: "Paid Advertising",
    description: "Precision-targeted pay-per-click campaigns that maximize your ROI. Our data-driven approach ensures every dollar works harder to bring qualified leads to your doorstep.",
    tagline: "Get customers today, not months from now",
    link: "/services/paid-advertising",
    status: "accepting" as const,
    accentColor: "rgb(167, 139, 250)",
    details: {
      whatYouGet: [
        "Google & Meta Ads campaigns",
        "A/B tested ad creative",
        "Daily optimization",
        "Transparent reporting"
      ],
      timeline: "Results in 1-2 weeks",
      investment: "25% of ad spend"
    }
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO/SEM",
    description: "Dominate search rankings with our comprehensive SEO strategies. We optimize every aspect of your online presence to drive organic traffic and build lasting authority.",
    tagline: "Show up when customers are searching",
    link: "/services/seo",
    status: "waitlist" as const,
    accentColor: "rgb(110, 231, 183)",
    details: {
      whatYouGet: [
        "Keyword research",
        "On-page optimization",
        "Content strategy",
        "Local SEO & Maps"
      ],
      timeline: "3-6 months",
      investment: "From $700/mo"
    }
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM",
    description: "Seamless CRM integration that unifies your customer data and streamlines your sales pipeline. Connect every touchpoint for a 360-degree view of your customers.",
    tagline: "Never lose track of a lead again",
    link: "/services/crm",
    status: "accepting" as const,
    accentColor: "rgb(251, 146, 60)",
    details: {
      whatYouGet: [
        "Custom CRM setup",
        "Automated follow-ups",
        "Lead scoring",
        "Team training"
      ],
      timeline: "1-2 weeks",
      investment: "From $500/mo"
    }
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Transform raw data into actionable insights with unified dashboards. Connect all your marketing channels and track performance in real time with AI-powered analysis.",
    tagline: "Know exactly what's working",
    link: "/services/analytics",
    status: "accepting" as const,
    accentColor: "rgb(248, 113, 113)",
    details: {
      whatYouGet: [
        "Custom dashboards",
        "Conversion tracking",
        "ROI measurement",
        "Monthly insights"
      ],
      timeline: "1-2 weeks setup",
      investment: "From $300/mo"
    }
  },
  {
    id: "design",
    icon: Palette,
    title: "Design",
    description: "Stunning visual identities that make your brand unforgettable. From logos to complete brand systems, we design assets that resonate with your audience.",
    tagline: "Visual identity that converts",
    link: "/services/design",
    status: "accepting" as const,
    accentColor: "rgb(244, 114, 182)",
    details: {
      whatYouGet: [
        "Logo & brand identity",
        "Marketing materials",
        "Social media graphics",
        "Presentation design"
      ],
      timeline: "1-3 weeks",
      investment: "From $500"
    }
  },
  {
    id: "social",
    icon: MessageSquare,
    title: "Social Media",
    description: "Build and engage your community across every platform. We create content strategies that grow your following and turn followers into customers.",
    tagline: "Engage and grow your audience",
    link: "/services/social-media",
    status: "accepting" as const,
    accentColor: "rgb(34, 211, 238)",
    details: {
      whatYouGet: [
        "Content calendar",
        "Daily posting",
        "Community management",
        "Growth strategy"
      ],
      timeline: "Ongoing",
      investment: "From $600/mo"
    }
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Marketing",
    description: "Nurture leads into loyal customers with automated email sequences. Smart segmentation and A/B testing ensure every message drives engagement and revenue.",
    tagline: "Direct line to your audience",
    link: "/services/email-marketing",
    status: "accepting" as const,
    accentColor: "rgb(163, 230, 53)",
    details: {
      whatYouGet: [
        "Email template design",
        "Automation sequences",
        "List segmentation",
        "A/B testing"
      ],
      timeline: "1-2 weeks setup",
      investment: "From $400/mo"
    }
  },
  {
    id: "consulting",
    icon: Users,
    title: "Consulting",
    description: "Expert marketing guidance tailored to your unique business challenges. From strategy sessions to team training, we help you build internal marketing capabilities.",
    tagline: "Strategy tailored to you",
    link: "/services/consulting",
    status: "accepting" as const,
    accentColor: "rgb(253, 224, 71)",
    details: {
      whatYouGet: [
        "Strategy sessions",
        "Marketing audits",
        "Team training",
        "Ongoing support"
      ],
      timeline: "Flexible",
      investment: "From $150/hr"
    }
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Solutions",
    description: "Harness the power of artificial intelligence to automate your marketing workflows. Smart funnels that nurture leads and close deals while you sleep.",
    tagline: "The future of business is here",
    link: "/services/ai-automation",
    status: "accepting" as const,
    accentColor: "rgb(14, 165, 233)",
    details: {
      whatYouGet: [
        "AI chatbots",
        "Content generation",
        "Predictive analytics",
        "Task automation"
      ],
      timeline: "2-4 weeks",
      investment: "From $250/hr"
    }
  },
  {
    id: "managed-it",
    icon: Server,
    title: "Managed IT",
    description: "Enterprise-grade infrastructure, proactive monitoring, and dedicated support. Stop worrying about servers, security, and downtime — we keep everything running.",
    tagline: "Your mission control for technology",
    link: "/services/managed-it",
    status: "accepting" as const,
    accentColor: "rgb(34, 197, 94)",
    details: {
      whatYouGet: [
        "24/7 monitoring",
        "Cybersecurity",
        "Help desk support",
        "Backup management"
      ],
      timeline: "Ongoing",
      investment: "From $19/pc/mo"
    }
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function HorizontalScrollServices() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions to propel your business forward
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES_DATA.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <a
                href={service.link}
                className="block h-full rounded-xl p-6 sm:p-7 transition-all duration-300 group hover-elevate"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}
                data-testid={`card-service-${service.id}`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                  <service.icon className="w-6 h-6 text-red-500" />
                </div>

                <h3 className="text-white font-semibold text-lg mb-3">
                  {service.title}
                </h3>

                <p className="text-white/90 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <span className="inline-flex items-center gap-1.5 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
