import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiGoogle, SiMeta, SiLinkedin, SiTiktok, SiYoutube, SiX, SiShopify, SiWordpress, SiWix, SiSnapchat, SiFacebook, SiGoogleads, SiGoogleanalytics, SiFramer, SiYelp } from "react-icons/si";

export default function PartnerLogos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const partners = [
    { Icon: SiGoogle, name: "Google" },
    { Icon: SiGoogleads, name: "Google Ads" },
    { Icon: SiGoogleanalytics, name: "Google Analytics" },
    { Icon: SiMeta, name: "Meta" },
    { Icon: SiFacebook, name: "Facebook" },
    { Icon: SiSnapchat, name: "Snapchat" },
    { Icon: SiLinkedin, name: "LinkedIn" },
    { Icon: SiTiktok, name: "TikTok" },
    { Icon: SiYoutube, name: "YouTube" },
    { Icon: SiX, name: "X" },
    { Icon: SiShopify, name: "Shopify" },
    { Icon: SiWordpress, name: "WordPress" },
    { Icon: SiWix, name: "Wix" },
    { Icon: SiFramer, name: "Framer" },
    { Icon: SiYelp, name: "Yelp" },
  ];

  return (
    <div ref={ref} className="overflow-hidden" data-testid="section-partner-logos">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative">
          <div className="flex gap-12 animate-scroll">
            {[...partners, ...partners, ...partners].map(({ Icon, name }, index) => (
              <div
                key={`${name}-${index}`}
                className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                data-testid={`logo-partner-${name.toLowerCase()}-${index}`}
              >
                <Icon className="h-10 w-10 md:h-12 md:w-12 text-foreground" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
