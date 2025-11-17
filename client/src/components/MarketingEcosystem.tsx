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
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const topChannels = [
    { icon: Search, label: "SEO", color: "#22c55e" },
    { icon: FileText, label: "Content Marketing", color: "#eab308" },
    { icon: DollarSign, label: "PPC Advertising", color: "#f97316" },
    { icon: Share2, label: "Social Media", color: "#a855f7" },
  ];

  return (
    <div ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Funnel background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1000px]"
          style={{
            background: "linear-gradient(180deg, rgba(255, 0, 0, 0.2) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)",
            clipPath: "polygon(10% 0%, 90% 0%, 70% 100%, 30% 100%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Top Level - Widest */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {topChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.label}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <div className="group relative">
                    {/* Neumorphic card with proper shadows */}
                    <div className="relative bg-[#1a1a1a] rounded-3xl p-6 cursor-pointer overflow-hidden"
                      style={{
                        boxShadow: `
                          12px 12px 24px rgba(0, 0, 0, 0.4),
                          -8px -8px 16px rgba(255, 255, 255, 0.02)
                        `,
                      }}
                    >
                      {/* Inner subtle gradient */}
                      <div 
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                          background: `linear-gradient(135deg, ${channel.color}20 0%, transparent 100%)`,
                        }}
                      />

                      {/* Glowing top edge */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-30"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${channel.color}, transparent)`,
                        }}
                      />

                      <div className="relative flex flex-col items-center text-center">
                        {/* Icon with glow */}
                        <motion.div
                          whileHover={{ scale: 1.1, y: -4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative mb-4"
                        >
                          <Icon 
                            className="h-12 w-12 relative z-10" 
                            style={{ 
                              color: channel.color,
                              filter: `drop-shadow(0 4px 12px ${channel.color}60)`
                            }} 
                          />
                          {/* Pulsing glow */}
                          <motion.div
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                            className="absolute inset-0 blur-xl"
                            style={{ backgroundColor: channel.color }}
                          />
                        </motion.div>
                        
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                          {channel.label}
                        </h4>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div 
                      className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: `radial-gradient(circle at center, ${channel.color}20 0%, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Flowing particles and lines */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative h-32 mb-16"
        >
          {/* Funnel contour lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff0000" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Left funnel line */}
            <motion.path
              d="M 100 0 L 250 128"
              stroke="url(#funnelGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.2, delay: 0.7 }}
            />
            
            {/* Right funnel line */}
            <motion.path
              d="M 900 0 L 750 128"
              stroke="url(#funnelGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.2, delay: 0.7 }}
            />
          </svg>

          {/* Animated particles flowing down */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={`p1-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                backgroundColor: i % 2 === 0 ? "#ff0000" : "#3b82f6",
                boxShadow: `0 0 10px ${i % 2 === 0 ? "#ff0000" : "#3b82f6"}`,
              }}
              animate={isInView ? {
                y: [0, 128],
                x: [0, (i - 2.5) * 10],
                opacity: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.8 + i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Middle Level - Medium width with premium neumorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <div className="relative group">
            {/* Premium neumorphic card */}
            <div 
              className="relative bg-[#1a1a1a] rounded-[32px] p-10 cursor-pointer overflow-hidden"
              style={{
                boxShadow: `
                  16px 16px 32px rgba(0, 0, 0, 0.5),
                  -12px -12px 24px rgba(255, 255, 255, 0.03),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {/* Gradient background */}
              <div 
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                }}
              />

              {/* Glowing border animation */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-[32px]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #ec4899)",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Rotating icon */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <Globe 
                    className="h-20 w-20" 
                    style={{ 
                      color: "#3b82f6",
                      filter: "drop-shadow(0 8px 16px rgba(59, 130, 246, 0.4))"
                    }} 
                  />
                  {/* Orbital ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-[#3b82f6] rounded-full opacity-20"
                    style={{ width: "120%", height: "120%", top: "-10%", left: "-10%" }}
                  />
                </motion.div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
                    Website & Landing Pages
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">
                    Converting visitors into qualified leads
                  </p>
                </div>
              </div>
            </div>

            {/* Ambient glow */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-8 rounded-[40px] -z-10"
              style={{
                background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>
        </motion.div>

        {/* Flowing connector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
          className="relative h-32 mb-16"
        >
          <svg className="absolute inset-0 w-full h-full">
            {/* Left funnel line */}
            <motion.path
              d="M 250 0 L 350 128"
              stroke="url(#funnelGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.2, delay: 1.2 }}
            />
            
            {/* Right funnel line */}
            <motion.path
              d="M 750 0 L 650 128"
              stroke="url(#funnelGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.2, delay: 1.2 }}
            />
          </svg>

          {/* Particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`p2-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${35 + i * 8}%`,
                backgroundColor: "#3b82f6",
                boxShadow: "0 0 12px #3b82f6",
              }}
              animate={isInView ? {
                y: [0, 128],
                opacity: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.3 + i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Bottom Level - Narrowest */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Database, label: "CRM & Analytics", desc: "Track and nurture leads", color: "#ec4899" },
              { icon: Mail, label: "Email Marketing", desc: "Automate follow-ups", color: "#06b6d4" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.5 + index * 0.15,
                    type: "spring"
                  }}
                >
                  <div className="group relative">
                    {/* Neumorphic card */}
                    <div 
                      className="relative bg-[#1a1a1a] rounded-3xl p-8 cursor-pointer overflow-hidden h-full"
                      style={{
                        boxShadow: `
                          12px 12px 24px rgba(0, 0, 0, 0.4),
                          -8px -8px 16px rgba(255, 255, 255, 0.02)
                        `,
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}20 0%, transparent 100%)`,
                        }}
                      />

                      <div 
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-30"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                        }}
                      />

                      <div className="relative flex flex-col items-center text-center">
                        <motion.div
                          whileHover={{ scale: 1.1, y: -4 }}
                          className="relative mb-4"
                        >
                          <Icon 
                            className="h-14 w-14 relative z-10" 
                            style={{ 
                              color: item.color,
                              filter: `drop-shadow(0 4px 12px ${item.color}60)`
                            }} 
                          />
                          <motion.div
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                            className="absolute inset-0 blur-xl"
                            style={{ backgroundColor: item.color }}
                          />
                        </motion.div>
                        
                        <h4 className="text-base font-bold text-foreground mb-2 uppercase tracking-wider">
                          {item.label}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div 
                      className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: `radial-gradient(circle at center, ${item.color}20 0%, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your complete marketing funnel working in harmony: drive traffic, convert visitors, and nurture leads into loyal customers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
