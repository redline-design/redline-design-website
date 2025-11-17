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

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const topChannels = [
    { icon: Search, label: "SEO", color: "#22c55e", number: "01" },
    { icon: FileText, label: "Content Marketing", color: "#eab308", number: "02" },
    { icon: DollarSign, label: "PPC Advertising", color: "#f97316", number: "03" },
    { icon: Share2, label: "Social Media", color: "#a855f7", number: "04" },
  ];

  return (
    <div ref={ref} className="relative py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Top Level */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {topChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="relative neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] text-center">
                  {/* Floating number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: channel.color,
                      boxShadow: `0 4px 12px ${channel.color}40`,
                    }}
                  >
                    <motion.span
                      animate={isInView ? {
                        y: [0, -2, 0],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {channel.number}
                    </motion.span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + index * 0.1,
                      type: "spring"
                    }}
                    className="mb-4"
                  >
                    <Icon 
                      className="h-12 w-12 mx-auto" 
                      style={{ 
                        color: channel.color,
                        filter: `drop-shadow(0 2px 8px ${channel.color}40)`
                      }} 
                    />
                  </motion.div>
                  
                  {/* Label */}
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.4 + index * 0.1
                    }}
                    className="text-sm font-semibold text-foreground"
                  >
                    {channel.label}
                  </motion.h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Connector arrows */}
        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 0.4, scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#ff0000] to-[#3b82f6]" />
        </motion.div>

        {/* Middle Level */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 0.8,
            type: "spring",
            stiffness: 80
          }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <div className="relative neumorphic-card p-8 rounded-2xl bg-[#1e1e1e]">
            {/* Number badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: 1.0,
                type: "spring",
                stiffness: 200
              }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-sm font-bold"
              style={{
                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.4)",
              }}
            >
              <motion.span
                animate={isInView ? {
                  y: [0, -2, 0],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                05
              </motion.span>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.1,
                  type: "spring"
                }}
              >
                <Globe 
                  className="h-16 w-16" 
                  style={{ 
                    color: "#3b82f6",
                    filter: "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))"
                  }} 
                />
              </motion.div>
              
              <div className="text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-2xl font-bold text-foreground mb-1"
                >
                  Website & Landing Pages
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="text-sm text-muted-foreground"
                >
                  Converting visitors into qualified leads
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connector arrows */}
        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 0.4, scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center mb-12"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#3b82f6] to-[#ec4899]" />
        </motion.div>

        {/* Bottom Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {[
            { icon: Database, label: "CRM & Analytics", desc: "Track and nurture", color: "#ec4899", number: "06" },
            { icon: Mail, label: "Email Marketing", desc: "Automate follow-ups", color: "#06b6d4", number: "07" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="relative neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] text-center h-full">
                  {/* Floating number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 4px 12px ${item.color}40`,
                    }}
                  >
                    <motion.span
                      animate={isInView ? {
                        y: [0, -2, 0],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.8 + index * 0.3,
                      }}
                    >
                      {item.number}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.7 + index * 0.1,
                      type: "spring"
                    }}
                    className="mb-4"
                  >
                    <Icon 
                      className="h-12 w-12 mx-auto" 
                      style={{ 
                        color: item.color,
                        filter: `drop-shadow(0 2px 8px ${item.color}40)`
                      }} 
                    />
                  </motion.div>
                  
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
                    className="text-sm font-semibold text-foreground mb-1"
                  >
                    {item.label}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.9 + index * 0.1 }}
                    className="text-xs text-muted-foreground"
                  >
                    {item.desc}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="text-center mt-16"
        >
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Your complete marketing funnel working in harmony: drive traffic, convert visitors, and nurture leads into loyal customers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
