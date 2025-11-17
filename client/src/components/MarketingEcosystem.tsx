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
  Target
} from "lucide-react";

interface Channel {
  icon: any;
  label: string;
  color: string;
}

const channels: Channel[] = [
  { icon: Globe, label: "Website & Landing Pages", color: "#3b82f6" },
  { icon: Search, label: "SEO", color: "#22c55e" },
  { icon: DollarSign, label: "PPC Advertising", color: "#f97316" },
  { icon: Share2, label: "Social Media", color: "#a855f7" },
  { icon: Mail, label: "Email Marketing", color: "#06b6d4" },
  { icon: Database, label: "CRM & Analytics", color: "#ec4899" },
  { icon: FileText, label: "Content Marketing", color: "#eab308" },
];

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const RADIUS = 300; // Distance from center to channels

  return (
    <div ref={ref} className="relative py-12 px-4">
      {/* Desktop: Circular Layout */}
      <div className="hidden lg:block relative w-full max-w-4xl mx-auto aspect-square">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Pulsing rings */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Main hub */}
              <div className="relative neumorphic-card p-6 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                <Target className="h-12 w-12 text-[#ff0000]" style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))"
                }} />
              </div>

              {/* Hub label */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-sm font-bold text-foreground">Your Business</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Channels arranged in circle */}
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          const totalChannels = channels.length;
          const angle = (index * 360) / totalChannels; // Distribute evenly

          return (
            <div
              key={channel.label}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
            >
              {/* Connection line */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: 0.5 } : {}}
                transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                className="absolute left-1/2 -translate-x-1/2 origin-top z-0"
                style={{
                  width: "2px",
                  height: `${RADIUS}px`,
                  background: `linear-gradient(to bottom, #ff0000, ${channel.color})`,
                }}
              />

              {/* Channel card wrapper - positioned at end of line */}
              <div
                style={{
                  transform: `translateY(-${RADIUS}px)`,
                }}
                className="absolute left-1/2 -translate-x-1/2"
              >
                {/* Counter-rotate the card so it's upright */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  style={{
                    transform: `rotate(-${angle}deg)`,
                  }}
                  data-testid={`ecosystem-channel-${index}`}
                >
                  <div className="neumorphic-card p-4 rounded-2xl bg-[#1e1e1e] cursor-pointer hover-elevate active-elevate-2 w-32 h-32 flex flex-col items-center justify-center">
                    <Icon 
                      className="h-10 w-10 mb-2 flex-shrink-0" 
                      style={{ 
                        color: channel.color,
                        filter: `drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px ${channel.color}40)`
                      }} 
                    />
                    <p className="text-xs font-semibold text-foreground text-center leading-tight">
                      {channel.label}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Animated particle on the line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? {
                  y: [0, -RADIUS],
                  opacity: [0, 1, 1, 0],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: channel.color,
                  filter: `drop-shadow(0 0 4px ${channel.color})`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile/Tablet: Grid Layout */}
      <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Central Hub - Full width on mobile */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-2 md:col-span-3 flex justify-center mb-4"
          data-testid="ecosystem-hub-mobile"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <div className="relative neumorphic-card p-8 rounded-full bg-[#1e1e1e]">
              <Target className="h-12 w-12 text-[#ff0000]" style={{
                filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))"
              }} />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm font-bold text-foreground">Your Business</p>
            </div>
          </div>
        </motion.div>

        {/* Channels in grid */}
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <motion.div
              key={channel.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              data-testid={`ecosystem-channel-mobile-${index}`}
            >
              <div className="neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] cursor-pointer hover-elevate active-elevate-2 h-full flex flex-col items-center justify-center text-center">
                <Icon 
                  className="h-10 w-10 mb-3" 
                  style={{ 
                    color: channel.color,
                    filter: `drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px ${channel.color}40)`
                  }} 
                />
                <p className="text-sm font-semibold text-foreground">
                  {channel.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center mt-16"
      >
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          All channels work together, feeding data into your CRM and analytics for a complete view of your marketing performance.
        </p>
      </motion.div>
    </div>
  );
}
