import { Calendar, Users, Target, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiLinkedin,
  SiTiktok,
  SiYoutube,
  SiPinterest,
} from "react-icons/si";

const benefits = [
  {
    icon: Calendar,
    title: "Content Strategy",
    description: "Develop a content calendar with engaging, on-brand posts tailored to each platform's unique audience and algorithm.",
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Build genuine relationships with your audience through responsive engagement, conversation, and community building.",
  },
  {
    icon: Target,
    title: "Paid Social Campaigns",
    description: "Launch targeted advertising campaigns across social platforms to reach new audiences and drive measurable results.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Track every metric that matters with detailed monthly reports showing growth, engagement, and ROI.",
  },
];

const platforms = [
  { name: "Facebook", icon: SiFacebook, color: "#1877F2" },
  { name: "Instagram", icon: SiInstagram, color: "#E4405F" },
  { name: "X", icon: SiX, color: "#FFFFFF" },
  { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { name: "TikTok", icon: SiTiktok, color: "#FFFFFF" },
  { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { name: "Pinterest", icon: SiPinterest, color: "#E60023" },
];

const plans = [
  {
    name: "Lunar",
    price: "$1,000",
    period: "/month",
    features: [
      "3 platforms managed",
      "12 posts per month",
      "Basic content calendar",
      "Community monitoring",
      "Monthly reporting",
    ],
  },
  {
    name: "Orbital",
    price: "$2,000",
    period: "/month",
    popular: true,
    features: [
      "5 platforms managed",
      "20 posts per month",
      "Custom content creation",
      "Active community management",
      "Paid social campaigns",
      "Bi-weekly reporting",
      "Influencer outreach",
    ],
  },
  {
    name: "Supernova",
    price: "$3,500",
    period: "/month",
    features: [
      "All platforms managed",
      "30+ posts per month",
      "Premium content (video + photo)",
      "Full community management",
      "Advanced paid campaigns",
      "Weekly strategy calls",
      "Dedicated social media manager",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero
        title="Social Media Marketing"
        subtitle="Build Your Brand Online"
        description="Build your brand and engage your audience across all major social platforms. We create scroll-stopping content, manage communities, and run targeted campaigns that turn followers into customers."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-platforms">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-platforms-heading"
            >
              Platforms We Manage
            </h2>
            <p className="text-white/50 text-base md:text-lg" data-testid="text-platforms-subtitle">
              We create and manage content across all major social platforms
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
            data-testid="platforms-grid"
          >
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                variants={itemVariants}
                className="flex flex-col items-center gap-3 p-5 rounded-md"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-platform-${index}`}
              >
                <platform.icon
                  className="w-8 h-8"
                  style={{ color: platform.color }}
                />
                <span className="text-white/70 text-sm font-medium" data-testid={`text-platform-name-${index}`}>
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PricingSection plans={plans} />

      <ServiceCTA />
    </div>
  );
}
