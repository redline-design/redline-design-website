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
  angle: number;
}

const channels: Channel[] = [
  { icon: Globe, label: "Website & Landing Pages", color: "#3b82f6", angle: 0 },
  { icon: Search, label: "SEO", color: "#22c55e", angle: 51.4 },
  { icon: DollarSign, label: "PPC Advertising", color: "#f97316", angle: 102.8 },
  { icon: Share2, label: "Social Media", color: "#a855f7", angle: 154.2 },
  { icon: Mail, label: "Email Marketing", color: "#06b6d4", angle: 205.6 },
  { icon: Database, label: "CRM & Analytics", color: "#ec4899", angle: 257 },
  { icon: FileText, label: "Content Marketing", color: "#eab308", angle: 308.4 },
];

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative py-12 px-4">
      {/* Desktop: Circular Layout */}
      <div className="hidden lg:block relative w-full max-w-5xl mx-auto aspect-square">
        {/* Central Hub */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          data-testid="ecosystem-hub"
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
            <div className="relative neumorphic-card p-8 rounded-full bg-[#1e1e1e]">
              <Target className="h-16 w-16 text-[#ff0000]" style={{
                filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))"
              }} />
            </div>

            {/* Hub label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm font-bold text-foreground">Your Business</p>
            </div>
          </div>
        </motion.div>

        {/* Channels */}
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          const radius = 280;
          const angleInRadians = (channel.angle * Math.PI) / 180;
          const x = Math.cos(angleInRadians) * radius;
          const y = Math.sin(angleInRadians) * radius;

          return (
            <motion.div
              key={channel.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="absolute top-1/2 left-1/2 z-10"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              data-testid={`ecosystem-channel-${index}`}
            >
              {/* Animated connection line */}
              <svg
                className="absolute top-1/2 left-1/2 -z-10 pointer-events-none"
                style={{
                  width: `${Math.abs(x) + 100}px`,
                  height: `${Math.abs(y) + 100}px`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <motion.line
                  x1={x < 0 ? Math.abs(x) + 50 : 50}
                  y1={y < 0 ? Math.abs(y) + 50 : 50}
                  x2={x < 0 ? 50 : Math.abs(x) + 50}
                  y2={y < 0 ? 50 : Math.abs(y) + 50}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                />
                <defs>
                  <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
                    <stop offset="100%" stopColor={channel.color} stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Animated particle */}
                <motion.circle
                  r="3"
                  fill={channel.color}
                  initial={{ opacity: 0 }}
                  animate={isInView ? {
                    cx: [x < 0 ? Math.abs(x) + 50 : 50, x < 0 ? 50 : Math.abs(x) + 50],
                    cy: [y < 0 ? Math.abs(y) + 50 : 50, y < 0 ? 50 : Math.abs(y) + 50],
                    opacity: [0, 1, 1, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                  style={{ filter: `drop-shadow(0 0 4px ${channel.color})` }}
                />
              </svg>

              {/* Channel node */}
              <div className="relative neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] cursor-pointer hover-elevate active-elevate-2">
                <Icon 
                  className="h-10 w-10 mb-2" 
                  style={{ 
                    color: channel.color,
                    filter: `drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 2px ${channel.color}40)`
                  }} 
                />
                <p className="text-xs font-semibold text-foreground text-center max-w-[120px]">
                  {channel.label}
                </p>
              </div>
            </motion.div>
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
