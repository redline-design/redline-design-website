import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiGoogle, SiMeta, SiLinkedin, SiTiktok, SiYoutube, SiX } from "react-icons/si";

export default function PartnerLogos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const partners = [
    { Icon: SiGoogle, name: "Google" },
    { Icon: SiMeta, name: "Meta" },
    { Icon: SiLinkedin, name: "LinkedIn" },
    { Icon: SiTiktok, name: "TikTok" },
    { Icon: SiYoutube, name: "YouTube" },
    { Icon: SiX, name: "X" },
  ];

  return (
    <div ref={ref} className="py-12" data-testid="section-partner-logos">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-8">
          Trusted Platforms
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map(({ Icon, name }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 hover-elevate active-elevate-2 p-4 rounded-lg"
              data-testid={`logo-partner-${name.toLowerCase()}`}
            >
              <Icon className="h-12 w-12 text-foreground" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
