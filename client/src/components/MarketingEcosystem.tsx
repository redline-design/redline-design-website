import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Search, 
  DollarSign, 
  Share2, 
  Mail, 
  Database, 
  FileText
} from "lucide-react";
import { ChevronDown } from "lucide-react";

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const topChannels = [
    { icon: Search, label: "SEO", color: "#22c55e" },
    { icon: FileText, label: "Content Marketing", color: "#eab308" },
    { icon: DollarSign, label: "PPC Advertising", color: "#f97316" },
    { icon: Share2, label: "Social Media", color: "#a855f7" },
  ];

  return (
    <div ref={ref} className="relative py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Level: Marketing Channels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {topChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`funnel-top-${index}`}
              >
                <div className="neumorphic-card p-4 rounded-2xl bg-[#1e1e1e] h-full flex flex-col items-center justify-center text-center hover-elevate active-elevate-2 cursor-pointer">
                  <Icon 
                    className="h-8 w-8 mb-2" 
                    style={{ 
                      color: channel.color,
                      filter: `drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px ${channel.color}40)`
                    }} 
                  />
                  <p className="text-xs font-semibold text-foreground leading-tight">
                    {channel.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Arrow Down */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <ChevronDown className="h-8 w-8 text-[#ff0000]" style={{
              filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))"
            }} />
            <motion.div 
              className="w-1 h-12 bg-gradient-to-b from-[#ff0000] to-transparent"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Middle Level: Website & Landing Pages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
          data-testid="funnel-middle"
        >
          <div className="neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] hover-elevate active-elevate-2 cursor-pointer">
            <div className="flex items-center justify-center gap-4">
              <Globe 
                className="h-12 w-12" 
                style={{ 
                  color: "#3b82f6",
                  filter: "drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px #3b82f640)"
                }} 
              />
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Website & Landing Pages
                </h3>
                <p className="text-xs text-muted-foreground">
                  Converting visitors into leads
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Arrow Down */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex flex-col items-center">
            <ChevronDown className="h-8 w-8 text-[#ff0000]" style={{
              filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))"
            }} />
            <motion.div 
              className="w-1 h-12 bg-gradient-to-b from-[#ff0000] to-transparent"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Level: CRM & Analytics + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            data-testid="funnel-bottom-crm"
          >
            <div className="neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] h-full flex flex-col items-center justify-center text-center hover-elevate active-elevate-2 cursor-pointer">
              <Database 
                className="h-10 w-10 mb-3" 
                style={{ 
                  color: "#ec4899",
                  filter: "drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px #ec489940)"
                }} 
              />
              <h4 className="text-sm font-bold text-foreground mb-1">
                CRM & Analytics
              </h4>
              <p className="text-xs text-muted-foreground">
                Track and nurture leads
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            data-testid="funnel-bottom-email"
          >
            <div className="neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] h-full flex flex-col items-center justify-center text-center hover-elevate active-elevate-2 cursor-pointer">
              <Mail 
                className="h-10 w-10 mb-3" 
                style={{ 
                  color: "#06b6d4",
                  filter: "drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px #06b6d440)"
                }} 
              />
              <h4 className="text-sm font-bold text-foreground mb-1">
                Email Marketing
              </h4>
              <p className="text-xs text-muted-foreground">
                Automate follow-ups
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12"
        >
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Your complete marketing funnel working together: drive traffic, convert visitors, and nurture leads into customers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
