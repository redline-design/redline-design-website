import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Smartphone, Zap, Search, Target } from "lucide-react";
import {
  SiReact, SiWordpress, SiShopify, SiNextdotjs, SiTailwindcss, SiNodedotjs,
  SiWix, SiSquarespace, SiWebflow, SiFigma, SiAdobephotoshop, SiAdobeillustrator,
  SiGoogleanalytics, SiGoogleads, SiMeta, SiMailchimp, SiHubspot, SiStripe,
  SiPhp, SiMysql, SiMongodb, SiAmazonwebservices, SiCloudflare, SiVercel
} from "react-icons/si";

const benefits = [
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Your website will look and function flawlessly on every device — from desktop monitors to smartphones and tablets."
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized load times and streamlined code ensure your visitors never wait, reducing bounce rates and boosting engagement."
  },
  {
    icon: Search,
    title: "SEO-Ready",
    description: "Every page is built with search engines in mind, from semantic markup to meta tags, giving you a head start on rankings."
  },
  {
    icon: Target,
    title: "Conversion-Focused",
    description: "Strategically designed layouts and calls-to-action that turn casual visitors into loyal customers."
  }
];

const pricingPlans = [
  {
    name: "Lunar",
    price: "$1,000",
    period: "One-time",
    features: [
      "Single-page website",
      "Mobile responsive",
      "Contact form",
      "Basic SEO setup",
      "2 rounds of revisions"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Orbital",
    price: "$2,000",
    period: "One-time",
    popular: true,
    features: [
      "Up to 5 pages",
      "Custom design",
      "CMS integration",
      "Advanced SEO",
      "Analytics setup",
      "3 rounds of revisions"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Stellar",
    price: "$3,000",
    period: "One-time",
    features: [
      "Up to 10 pages",
      "E-commerce ready",
      "Custom animations",
      "Blog integration",
      "Priority support",
      "Unlimited revisions"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Supernova",
    price: "Contact Us",
    period: "Custom pricing",
    features: [
      "Unlimited pages",
      "Custom web applications",
      "API integrations",
      "Dedicated project manager",
      "Ongoing maintenance",
      "SLA guarantee"
    ],
    buttonText: "Contact Us",
    buttonLink: "/contact"
  }
];

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  { name: "Shopify", icon: SiShopify, color: "#96BF48" },
  { name: "Webflow", icon: SiWebflow, color: "#4353FF" },
  { name: "Wix", icon: SiWix, color: "#0C6EFC" },
  { name: "Squarespace", icon: SiSquarespace, color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
  { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
  { name: "Meta Ads", icon: SiMeta, color: "#0081FB" },
  { name: "Mailchimp", icon: SiMailchimp, color: "#FFE01B" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
];

const processSteps = [
  { step: "Discovery", description: "Understanding your goals, audience, and brand identity" },
  { step: "Design", description: "Crafting wireframes and high-fidelity mockups" },
  { step: "Development", description: "Building with clean, performant code" },
  { step: "Launch", description: "Testing, optimization, and go-live" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function WebsitesPage() {
  return (
    <div className="min-h-screen">
      <ServiceHero
        title="Website Design & Development"
        subtitle="Building Digital Experiences"
        description="We craft custom, high-performance websites that captivate your audience and convert visitors into customers. From single-page sites to complex web applications, every pixel is designed with purpose."
      />

      <BenefitsGrid benefits={benefits} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-process">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            data-testid="text-process-heading"
          >
            Our Development Process
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 md:p-8 rounded-md text-center"
                style={{
                  background: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`card-process-${index}`}
              >
                <div
                  className="text-3xl font-bold text-red-500 mb-3"
                  data-testid={`text-process-number-${index}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3
                  className="text-lg font-semibold text-white mb-2"
                  data-testid={`text-process-title-${index}`}
                >
                  {item.step}
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  data-testid={`text-process-description-${index}`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PricingSection plans={pricingPlans} />

      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-technologies">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            data-testid="text-technologies-heading"
          >
            Technologies We Use
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 rounded-md flex flex-col items-center gap-3"
                  style={{
                    background: "rgba(20, 20, 20, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  data-testid={`card-tech-${index}`}
                >
                  <Icon
                    className="w-10 h-10"
                    style={{ color: tech.color }}
                    data-testid={`icon-tech-${index}`}
                  />
                  <span
                    className="text-sm text-white/80 font-medium"
                    data-testid={`text-tech-name-${index}`}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <ServiceCTA />
    </div>
  );
}
