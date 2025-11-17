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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const topChannels = [
    { icon: Search, label: "SEO", color: "#22c55e" },
    { icon: FileText, label: "Content Marketing", color: "#eab308" },
    { icon: DollarSign, label: "PPC Advertising", color: "#f97316" },
    { icon: Share2, label: "Social Media", color: "#a855f7" },
  ];

  return (
    <div ref={ref} className="relative py-16 px-4">
      <div className="max-w-5xl mx-auto relative">
        {/* Ambient glow background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 0, 0, 0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Top Level: Marketing Channels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {topChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                data-testid={`funnel-top-${index}`}
              >
                <div className="relative group">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${channel.color}20 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />
                  
                  <div className="relative neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] h-full flex flex-col items-center justify-center text-center hover-elevate active-elevate-2 cursor-pointer overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        background: `linear-gradient(135deg, ${channel.color} 0%, transparent 100%)`,
                      }}
                    />
                    
                    {/* Animated icon container */}
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                      className="relative mb-3"
                    >
                      <Icon 
                        className="h-10 w-10 relative z-10" 
                        style={{ 
                          color: channel.color,
                          filter: `drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 3px ${channel.color}60)`
                        }} 
                      />
                      {/* Icon glow */}
                      <div 
                        className="absolute inset-0 blur-md opacity-40"
                        style={{ backgroundColor: channel.color }}
                      />
                    </motion.div>
                    
                    <p className="text-sm font-bold text-foreground leading-tight relative z-10">
                      {channel.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flowing connector with particles */}
        <div className="relative h-24 mb-12">
          {/* Multiple flowing lines */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                width: "2px",
                height: "100%",
                background: "linear-gradient(to bottom, #ff000080, #ff000020)",
                opacity: 0.3,
                left: `calc(50% + ${(i - 1.5) * 40}px)`,
              }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
            />
          ))}
          
          {/* Animated particles flowing down */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute left-1/2 w-1 h-1 rounded-full"
              style={{
                backgroundColor: "#ff0000",
                boxShadow: "0 0 8px #ff0000",
                left: `calc(50% + ${Math.sin(i) * 50}px)`,
              }}
              animate={isInView ? {
                y: [0, 96],
                opacity: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Middle Level: Website & Landing Pages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7, type: "spring", stiffness: 80 }}
          className="mb-12 relative"
          data-testid="funnel-middle"
        >
          {/* Prominent glow */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-3xl"
            style={{
              background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative neumorphic-card p-8 rounded-3xl bg-[#1e1e1e] hover-elevate active-elevate-2 cursor-pointer overflow-hidden">
            {/* Gradient background */}
            <div 
              className="absolute inset-0 opacity-[0.07]"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              }}
            />
            
            {/* Hexagon pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative flex items-center justify-center gap-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Globe 
                  className="h-16 w-16" 
                  style={{ 
                    color: "#3b82f6",
                    filter: "drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 4px #3b82f680)"
                  }} 
                />
              </motion.div>
              
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                  Website & Landing Pages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Converting visitors into qualified leads
                </p>
              </div>
            </div>

            {/* Pulsing accent border */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-3xl border-2 border-[#3b82f6] pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Flowing connector with particles */}
        <div className="relative h-24 mb-12">
          {/* Multiple flowing lines */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                width: "2px",
                height: "100%",
                background: "linear-gradient(to bottom, #3b82f680, #ff000020)",
                opacity: 0.4,
                left: `calc(50% + ${(i - 1) * 30}px)`,
              }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
            />
          ))}
          
          {/* Animated particles flowing down */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`particle2-${i}`}
              className="absolute left-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "#3b82f6",
                boxShadow: "0 0 10px #3b82f6",
                left: `calc(50% + ${Math.cos(i) * 40}px)`,
              }}
              animate={isInView ? {
                y: [0, 96],
                opacity: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1 + i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Bottom Level: CRM & Analytics + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Database, label: "CRM & Analytics", desc: "Track and nurture leads", color: "#ec4899" },
            { icon: Mail, label: "Email Marketing", desc: "Automate follow-ups", color: "#06b6d4" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.0 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                data-testid={`funnel-bottom-${index}`}
              >
                <div className="relative group">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${item.color}20 0%, transparent 70%)`,
                      filter: "blur(25px)",
                    }}
                  />

                  <div className="relative neumorphic-card p-6 rounded-2xl bg-[#1e1e1e] h-full flex flex-col items-center justify-center text-center hover-elevate active-elevate-2 cursor-pointer overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        background: `linear-gradient(135deg, ${item.color} 0%, transparent 100%)`,
                      }}
                    />

                    {/* Animated icon */}
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "easeInOut",
                      }}
                      className="relative mb-4"
                    >
                      <Icon 
                        className="h-12 w-12 relative z-10" 
                        style={{ 
                          color: item.color,
                          filter: `drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(-1px -1px 3px ${item.color}60)`
                        }} 
                      />
                      <div 
                        className="absolute inset-0 blur-lg opacity-30"
                        style={{ backgroundColor: item.color }}
                      />
                    </motion.div>
                    
                    <h4 className="text-base font-bold text-foreground mb-2 relative z-10">
                      {item.label}
                    </h4>
                    <p className="text-xs text-muted-foreground relative z-10">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom text with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your complete marketing funnel working in harmony: drive traffic, convert visitors, and nurture leads into loyal customers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
