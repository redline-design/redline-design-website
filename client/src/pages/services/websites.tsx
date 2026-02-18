import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Smartphone, Zap, Search, Target, Palette, Code, Rocket } from "lucide-react";
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
    name: "Cruiser",
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
    name: "Turbo",
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
    name: "V8",
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
    name: "Redline",
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
  { step: "Discovery", icon: Search, description: "Understanding your goals, audience, and brand identity" },
  { step: "Design", icon: Palette, description: "Crafting wireframes and high-fidelity mockups" },
  { step: "Development", icon: Code, description: "Building with clean, performant code" },
  { step: "Launch", icon: Rocket, description: "Testing, optimization, and go-live" },
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-4 tracking-tight section-heading-glow"
              data-testid="text-process-heading"
            >
              Our Development Process
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
              From discovery to launch, our proven four-step process delivers results at every stage.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
            <div
              className="hidden lg:block absolute top-[36px] left-[12.5%] right-[12.5%] h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,0,0,0.3), rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, rgba(255,0,0,0.3))",
              }}
            />

            {processSteps.map((item, index) => {
              const StepIcon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center relative"
                  data-testid={`card-process-${index}`}
                >
                  <div className="relative mb-6">
                    <div
                      className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full"
                      style={{
                        background: "rgba(15, 15, 15, 0.9)",
                        boxShadow: "0 0 20px rgba(255, 0, 0, 0.15)",
                        border: "3px solid rgba(255, 0, 0, 0.7)",
                      }}
                    >
                      <StepIcon className="w-7 h-7 text-red-500" />
                    </div>
                    <span
                      className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white"
                      style={{
                        background: "linear-gradient(145deg, #ff0000, #cc0000)",
                        boxShadow: "0 0 8px rgba(255, 0, 0, 0.4)",
                      }}
                      data-testid={`text-process-number-${index}`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    data-testid={`text-process-title-${index}`}
                  >
                    {item.step}
                  </h3>
                  <p
                    className="text-white/80 text-sm leading-relaxed max-w-[260px]"
                    data-testid={`text-process-description-${index}`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
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
            className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12 section-heading-glow"
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
