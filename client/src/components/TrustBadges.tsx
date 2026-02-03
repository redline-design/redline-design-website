import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiGoogle, SiMeta, SiShopify, SiHubspot } from "react-icons/si";

const badges = [
  {
    icon: SiGoogle,
    title: "Google Partner",
    description: "Certified Ads Expert",
    color: "#4285F4",
  },
  {
    icon: SiMeta,
    title: "Meta Partner",
    description: "Facebook & Instagram Ads",
    color: "#0081FB",
  },
  {
    icon: SiShopify,
    title: "Shopify Partner",
    description: "E-commerce Specialist",
    color: "#96BF48",
  },
  {
    icon: SiHubspot,
    title: "HubSpot Partner",
    description: "CRM & Marketing",
    color: "#FF7A59",
  },
];

export default function TrustBadges() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8"
      data-testid="section-trust-badges"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Trusted Partners
          </h2>
          <p className="text-muted-foreground">
            Certified by industry leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover-elevate text-center"
              data-testid={`badge-${badge.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div 
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${badge.color}15` }}
              >
                <badge.icon 
                  className="w-6 h-6 transition-colors duration-300" 
                  style={{ color: badge.color }}
                />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {badge.description}
              </p>
              
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ 
                  boxShadow: `0 0 30px ${badge.color}20`,
                  border: `1px solid ${badge.color}30`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
