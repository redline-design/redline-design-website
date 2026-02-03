import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiGoogle, SiMeta, SiLinkedin, SiTiktok, SiYoutube, SiX, SiShopify, SiWordpress, SiWix, SiSnapchat, SiFacebook, SiGoogleads, SiGoogleanalytics, SiFramer, SiYelp } from "react-icons/si";

const badges = [
  { icon: SiGoogle, title: "Google", color: "#4285F4" },
  { icon: SiGoogleads, title: "Google Ads", color: "#4285F4" },
  { icon: SiGoogleanalytics, title: "Google Analytics", color: "#E37400" },
  { icon: SiMeta, title: "Meta", color: "#0081FB" },
  { icon: SiFacebook, title: "Facebook", color: "#1877F2" },
  { icon: SiSnapchat, title: "Snapchat", color: "#FFFC00" },
  { icon: SiLinkedin, title: "LinkedIn", color: "#0A66C2" },
  { icon: SiTiktok, title: "TikTok", color: "#FF0050" },
  { icon: SiYoutube, title: "YouTube", color: "#FF0000" },
  { icon: SiX, title: "X", color: "#ffffff" },
  { icon: SiShopify, title: "Shopify", color: "#96BF48" },
  { icon: SiWordpress, title: "WordPress", color: "#21759B" },
  { icon: SiWix, title: "Wix", color: "#0C6EFC" },
  { icon: SiFramer, title: "Framer", color: "#0055FF" },
  { icon: SiYelp, title: "Yelp", color: "#D32323" },
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

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover-elevate text-center"
              data-testid={`badge-${badge.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div 
                className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${badge.color}15` }}
              >
                <badge.icon 
                  className="w-5 h-5 transition-colors duration-300" 
                  style={{ color: badge.color }}
                />
              </div>
              <h3 className="font-medium text-foreground text-xs">
                {badge.title}
              </h3>
              
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
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
