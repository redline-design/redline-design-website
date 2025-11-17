import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Search, 
  DollarSign, 
  Share2, 
  Mail, 
  FileText,
  BarChart3
} from "lucide-react";

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const radius = 200; // Closer to center
  const centerX = 400;
  const centerY = 350;

  const hexagons = [
    { 
      id: 1,
      icon: Search, 
      label: "SEO Strategy",
      desc: "Rank higher in search results and drive organic traffic through strategic optimization.",
      color: "#e2dc00",
      angle: -90,
      delay: 0.2
    },
    { 
      id: 2,
      icon: Share2, 
      label: "Social Media",
      desc: "Build brand awareness and engage audiences across all platforms.",
      color: "#353535",
      angle: -30,
      delay: 0.4
    },
    { 
      id: 3,
      icon: DollarSign, 
      label: "PPC Ads",
      desc: "Generate immediate leads through targeted paid campaigns.",
      color: "#353535",
      angle: 30,
      delay: 0.6
    },
    { 
      id: 4,
      icon: Mail, 
      label: "Email",
      desc: "Nurture leads with automated email sequences that convert.",
      color: "#e2dc00",
      angle: 90,
      delay: 0.8
    },
    { 
      id: 5,
      icon: FileText, 
      label: "Content",
      desc: "Establish authority with blog posts and resources.",
      color: "#353535",
      angle: 150,
      delay: 1.0
    },
    { 
      id: 6,
      icon: BarChart3, 
      label: "Analytics",
      desc: "Track performance and optimize based on data.",
      color: "#e2dc00",
      angle: 210,
      delay: 1.2
    },
  ];

  return (
    <div ref={ref} className="relative w-full px-4 py-32">
      <div className="relative mx-auto" style={{ width: "800px", height: "700px" }}>
        {/* Central Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="absolute z-20"
          style={{
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <motion.div 
            className="relative w-[200px] h-[200px] rounded-full bg-[#0a0a0a] flex flex-col items-center justify-center"
            style={{
              boxShadow: `
                12px 12px 24px rgba(0, 0, 0, 0.4),
                -8px -8px 16px rgba(255, 255, 255, 0.02)
              `,
            }}
            animate={{
              boxShadow: [
                "12px 12px 24px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02)",
                "16px 16px 32px rgba(0, 0, 0, 0.5), -12px -12px 24px rgba(255, 255, 255, 0.03)",
                "12px 12px 24px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02)",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <p className="text-[28px] font-black text-foreground leading-tight">MAIN</p>
            <p className="text-[20px] font-medium text-muted-foreground leading-tight">ECOSYSTEM</p>
          </motion.div>
        </motion.div>

        {/* Hexagons */}
        {hexagons.map((hex) => {
          const Icon = hex.icon;
          const angleRad = (hex.angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(angleRad);
          const y = centerY + radius * Math.sin(angleRad);
          const isHovered = hoveredId === hex.id;
          
          return (
            <motion.div
              key={hex.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              whileHover={{ 
                scale: 1.1,
                zIndex: 30,
              }}
              transition={{ 
                duration: 0.5, 
                delay: hex.delay,
                type: "spring",
                stiffness: 100
              }}
              className="absolute z-10 cursor-pointer"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)"
              }}
              onMouseEnter={() => setHoveredId(hex.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="relative w-[180px] h-[180px] flex flex-col items-center justify-center overflow-hidden"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                  backgroundColor: hex.color,
                }}
                animate={{
                  boxShadow: isHovered 
                    ? [
                        "0 8px 20px rgba(0, 0, 0, 0.3)",
                        "0 16px 40px rgba(0, 0, 0, 0.5)",
                        "0 8px 20px rgba(0, 0, 0, 0.3)",
                      ]
                    : "0 8px 20px rgba(0, 0, 0, 0.15)",
                }}
                transition={{
                  boxShadow: {
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Default state - Icon + Label */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ 
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? -20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: hex.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon 
                      className="h-14 w-14" 
                      style={{ 
                        color: hex.color === "#e2dc00" ? "#353535" : "#e2dc00",
                        filter: `drop-shadow(0 2px 6px rgba(0,0,0,0.3))`
                      }} 
                    />
                  </motion.div>
                  <p 
                    className="text-[18px] font-extrabold leading-tight text-center"
                    style={{ 
                      color: hex.color === "#e2dc00" ? "#353535" : "#e2dc00"
                    }}
                  >
                    {hex.label}
                  </p>
                </motion.div>

                {/* Hover state - Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center p-6"
                >
                  <p 
                    className="text-[13px] leading-relaxed text-center font-medium"
                    style={{ 
                      color: hex.color === "#e2dc00" ? "#353535" : "#e2dc00"
                    }}
                  >
                    {hex.desc}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
