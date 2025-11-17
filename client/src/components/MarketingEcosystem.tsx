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
  TrendingUp
} from "lucide-react";

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const items = [
    { 
      icon: Search, 
      label: "SEO Strategy", 
      desc: "Organic search optimization to drive qualified traffic to your website through strategic keyword targeting and content.",
      color: "#26bf19",
      lineColor: "#26bf19"
    },
    { 
      icon: DollarSign, 
      label: "PPC Advertising", 
      desc: "Targeted paid campaigns across Google Ads and social platforms to generate immediate leads and conversions.",
      color: "#cd0000",
      lineColor: "#cd0000"
    },
    { 
      icon: Share2, 
      label: "Social Media", 
      desc: "Build brand awareness and engage your audience across Facebook, Instagram, LinkedIn, and other platforms.",
      color: "#cd00ac",
      lineColor: "#cd00ac"
    },
    { 
      icon: FileText, 
      label: "Content Marketing", 
      desc: "Strategic blog posts, videos, and resources that establish authority and attract your ideal customers.",
      color: "#8b00cd",
      lineColor: "#8b00cd"
    },
    { 
      icon: Mail, 
      label: "Email Automation", 
      desc: "Nurture leads with personalized email sequences that guide prospects through your sales funnel.",
      color: "#0077cd",
      lineColor: "#0077cd"
    },
  ];

  return (
    <div ref={ref} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Main Header Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-[#1e1e1e] rounded-2xl p-8 border-4 border-[#2a2a2a]"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 className="text-3xl font-bold text-center text-foreground leading-tight">
                MARKETING ECOSYSTEM
              </h3>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="relative space-y-8">
            {/* SVG Lines Layer */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ zIndex: 0 }}
              viewBox="0 0 600 800"
              preserveAspectRatio="none"
            >
              <defs>
                {items.map((item, i) => (
                  <linearGradient key={`gradient-${i}`} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={item.lineColor} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={item.lineColor} stopOpacity="0.8" />
                  </linearGradient>
                ))}
              </defs>

              {/* Line to first card */}
              <motion.path
                d="M -100 80 Q 100 80, 150 60"
                stroke={`url(#gradient-0)`}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.circle
                cx="150"
                cy="60"
                r="5"
                fill={items[0].color}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.1 }}
              />

              {/* Line to second card */}
              <motion.path
                d="M -100 200 Q 50 200, 150 200"
                stroke={`url(#gradient-1)`}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.circle
                cx="150"
                cy="200"
                r="5"
                fill={items[1].color}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.3 }}
              />

              {/* Line to third card */}
              <motion.path
                d="M -100 320 Q 80 360, 150 360"
                stroke={`url(#gradient-2)`}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <motion.circle
                cx="150"
                cy="360"
                r="5"
                fill={items[2].color}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.5 }}
              />

              {/* Line to fourth card */}
              <motion.path
                d="M -100 450 Q 50 520, 150 530"
                stroke={`url(#gradient-3)`}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
              <motion.circle
                cx="150"
                cy="530"
                r="5"
                fill={items[3].color}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.7 }}
              />

              {/* Line to fifth card */}
              <motion.path
                d="M -100 580 Q 100 680, 150 700"
                stroke={`url(#gradient-4)`}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.1 }}
              />
              <motion.circle
                cx="150"
                cy="700"
                r="5"
                fill={items[4].color}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.9 }}
              />
            </svg>

            {/* Cards */}
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative z-10"
                >
                  <div 
                    className="bg-[#1e1e1e] rounded-xl p-6 border-4 border-[#2a2a2a] relative overflow-hidden"
                    style={{
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {/* Colored accent border - top right */}
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-bl-xl"
                      style={{
                        borderRight: `15px solid ${item.color}`,
                        borderTop: `15px solid ${item.color}`,
                        borderTopRightRadius: "0.75rem",
                      }}
                    />

                    <div className="flex gap-4 items-start">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#2a2a2a] rounded-lg p-3 border-2 border-[#3a3a3a]">
                          <Icon 
                            className="h-10 w-10" 
                            style={{ 
                              color: item.color,
                              filter: `drop-shadow(0 2px 8px ${item.color}40)`
                            }} 
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 
                          className="text-lg font-bold mb-2 uppercase tracking-wide"
                          style={{ color: item.color }}
                        >
                          {item.label}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
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
