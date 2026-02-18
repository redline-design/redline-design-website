import { ServiceHero, BenefitsGrid, PricingSection, ServiceCTA } from "@/components/service-sections";
import { motion } from "framer-motion";
import { Smartphone, Zap, Search, Target, Palette, Code, Rocket, ArrowRight, ChevronLeft, ChevronRight, X, Pause, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { PortfolioItem } from "@shared/schema";
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
    name: "Starter",
    price: "$1,000",
    period: "One-time",
    features: [
      "Single-page website",
      "Mobile responsive",
      "Contact form",
      "Basic SEO setup",
      "2 rounds of revisions",
      "$25/mo hosting included"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Growth",
    price: "$2,000",
    period: "One-time",
    popular: true,
    features: [
      "Up to 5 pages",
      "Custom design",
      "CMS integration",
      "Advanced SEO",
      "Analytics setup",
      "3 rounds of revisions",
      "$25/mo hosting included"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Pro",
    price: "$3,000",
    period: "One-time",
    features: [
      "Up to 10 pages",
      "E-commerce ready",
      "Custom animations",
      "Blog integration",
      "Priority support",
      "Unlimited revisions",
      "$25/mo hosting included"
    ],
    buttonText: "Get Started",
    buttonLink: "/contact"
  },
  {
    name: "Enterprise",
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

      <PortfolioGallerySection />

      <ServiceCTA />
    </div>
  );
}

function PortfolioGallerySection() {
  const { data: items = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const withScreenshots = items.filter((item) => item.screenshotUrl);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedItem) return;
      const idx = withScreenshots.findIndex((i) => i.id === selectedItem.id);
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowRight" && idx < withScreenshots.length - 1)
        setSelectedItem(withScreenshots[idx + 1]);
      if (e.key === "ArrowLeft" && idx > 0)
        setSelectedItem(withScreenshots[idx - 1]);
    },
    [selectedItem, withScreenshots]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="section-portfolio-gallery">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-8 w-48 mx-auto rounded bg-white/10 animate-pulse mb-12" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 aspect-[16/10] rounded-lg bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (withScreenshots.length === 0) return null;

  const duplicated = [...withScreenshots, ...withScreenshots];
  const animationDuration = withScreenshots.length * 5;

  return (
    <>
      <section className="py-16 md:py-24 overflow-hidden" data-testid="section-portfolio-gallery">
        <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-red-500 mb-3 section-heading-glow"
              data-testid="text-portfolio-gallery-heading"
            >
              Our Work
            </h2>
            <p
              className="text-white/50 text-base md:text-lg mb-6"
              data-testid="text-portfolio-gallery-subtitle"
            >
              Real websites we've built for real businesses
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/our-work">
                <span
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                  data-testid="link-view-all-work"
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgb(10,10,10), transparent)" }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, rgb(10,10,10), transparent)" }}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            <button
              onClick={() => setScrollDirection(-1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                scrollDirection === -1
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
              data-testid="button-scroll-left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isPaused
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
              data-testid="button-scroll-pause"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setScrollDirection(1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                scrollDirection === 1
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
              data-testid="button-scroll-right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            ref={scrollRef}
            className="flex gap-5 pb-14"
            animate={isPaused ? {} : { x: scrollDirection === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{
              x: {
                duration: animationDuration,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-72 md:w-96 group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedItem(item)}
                data-testid={`gallery-item-${index}`}
              >
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.screenshotUrl!}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                      Click to expand
                    </span>
                  </div>

                  <div
                    className="p-3"
                    style={{ background: "rgba(15, 15, 15, 0.95)" }}
                  >
                    <div className="flex items-center gap-2">
                      {item.logoUrl && (
                        <img
                          src={item.logoUrl}
                          alt={`${item.title} logo`}
                          className="h-5 w-auto object-contain rounded"
                        />
                      )}
                      <span className="text-sm font-medium text-white truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              data-testid="button-lightbox-close"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const idx = withScreenshots.findIndex((i) => i.id === selectedItem.id);
              return (
                <>
                  {idx > 0 && (
                    <button
                      onClick={() => setSelectedItem(withScreenshots[idx - 1])}
                      className="absolute left-2 md:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      data-testid="button-lightbox-prev"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {idx < withScreenshots.length - 1 && (
                    <button
                      onClick={() => setSelectedItem(withScreenshots[idx + 1])}
                      className="absolute right-2 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      data-testid="button-lightbox-next"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </>
              );
            })()}

            <motion.div
              className="relative z-10 max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={selectedItem.id}
            >
              <div
                className="overflow-hidden rounded-lg"
                style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
              >
                <img
                  src={selectedItem.screenshotUrl!}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[75vh] object-contain bg-black"
                  data-testid="lightbox-image"
                />
                <div
                  className="p-4 flex items-center gap-3"
                  style={{ background: "rgba(15, 15, 15, 0.98)" }}
                >
                  {selectedItem.logoUrl && (
                    <img
                      src={selectedItem.logoUrl}
                      alt={`${selectedItem.title} logo`}
                      className="h-7 w-auto object-contain rounded"
                    />
                  )}
                  <div>
                    <h3 className="text-white font-semibold text-lg" data-testid="lightbox-title">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.description && (
                      <p className="text-white/50 text-sm mt-0.5">{selectedItem.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
