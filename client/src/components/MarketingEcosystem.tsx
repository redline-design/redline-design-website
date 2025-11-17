import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Search, 
  DollarSign, 
  Share2, 
  Mail, 
  Database, 
  FileText,
  ArrowRight,
  ArrowDown
} from "lucide-react";

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const channels = [
    { icon: Search, label: "SEO", color: "#22c55e" },
    { icon: FileText, label: "Content Marketing", color: "#eab308" },
    { icon: DollarSign, label: "PPC Ads", color: "#f97316" },
    { icon: Share2, label: "Social Media", color: "#a855f7" },
  ];

  return (
    <div ref={ref} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top row - 4 channels */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div key={channel.label} className="flex items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.15,
                    type: "spring"
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon 
                      className="h-12 w-12" 
                      style={{ 
                        color: channel.color,
                        filter: `drop-shadow(0 4px 12px ${channel.color}60)`
                      }} 
                    />
                  </motion.div>
                  <span className="text-sm font-semibold text-foreground text-center">
                    {channel.label}
                  </span>
                </motion.div>

                {/* Arrow between icons (except after last) */}
                {index < channels.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 0.5, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
                    className="hidden lg:block"
                  >
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Down arrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 0.5, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex justify-center mb-12"
        >
          <ArrowDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>

        {/* Center - Website */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 1.0,
            type: "spring"
          }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Globe 
              className="h-16 w-16" 
              style={{ 
                color: "#3b82f6",
                filter: "drop-shadow(0 6px 16px rgba(59, 130, 246, 0.5))"
              }} 
            />
          </motion.div>
          <h3 className="text-xl font-bold text-foreground">Website</h3>
          <p className="text-sm text-muted-foreground">Convert visitors into leads</p>
        </motion.div>

        {/* Down arrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 0.5, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="flex justify-center mb-12"
        >
          <ArrowDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>

        {/* Bottom row - 2 channels */}
        <div className="flex flex-wrap justify-center items-center gap-16">
          {[
            { icon: Database, label: "CRM & Analytics", color: "#ec4899" },
            { icon: Mail, label: "Email Marketing", color: "#06b6d4" },
          ].map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.4 + index * 0.15,
                  type: "spring"
                }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon 
                    className="h-12 w-12" 
                    style={{ 
                      color: channel.color,
                      filter: `drop-shadow(0 4px 12px ${channel.color}60)`
                    }} 
                  />
                </motion.div>
                <span className="text-sm font-semibold text-foreground text-center">
                  {channel.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mt-16"
        >
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Your complete marketing ecosystem working together to attract, convert, and retain customers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
