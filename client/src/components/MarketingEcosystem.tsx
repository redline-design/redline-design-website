import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

  const hexagons = [
    { 
      id: 1,
      icon: Search, 
      label: "SEO Strategy",
      desc: "Rank higher in search results and drive organic traffic to your website through strategic optimization.",
      color: "#e2dc00",
      position: "top-[0px] left-1/2 -translate-x-1/2",
      textPosition: "top-[-100px] left-1/2 -translate-x-1/2 text-center",
      delay: 0.2
    },
    { 
      id: 2,
      icon: Share2, 
      label: "Social Media",
      desc: "Build brand awareness and engage audiences across Facebook, Instagram, and LinkedIn.",
      color: "#353535",
      position: "top-[150px] right-[50px]",
      textPosition: "top-[40px] left-[240px] text-left",
      delay: 0.4
    },
    { 
      id: 3,
      icon: DollarSign, 
      label: "PPC Advertising",
      desc: "Generate immediate leads through targeted Google Ads and social media campaigns.",
      color: "#353535",
      position: "bottom-[150px] right-[50px]",
      textPosition: "bottom-[40px] left-[240px] text-left",
      delay: 0.6
    },
    { 
      id: 4,
      icon: Mail, 
      label: "Email Marketing",
      desc: "Nurture leads with automated email sequences that guide prospects to conversion.",
      color: "#e2dc00",
      position: "bottom-[0px] left-1/2 -translate-x-1/2",
      textPosition: "bottom-[-100px] left-1/2 -translate-x-1/2 text-center",
      delay: 0.8
    },
    { 
      id: 5,
      icon: FileText, 
      label: "Content Marketing",
      desc: "Establish authority with blog posts, videos, and resources that attract ideal customers.",
      color: "#353535",
      position: "bottom-[150px] left-[50px]",
      textPosition: "bottom-[40px] right-[240px] text-right",
      delay: 1.0
    },
    { 
      id: 6,
      icon: BarChart3, 
      label: "Analytics",
      desc: "Track performance metrics and optimize campaigns based on data-driven insights.",
      color: "#e2dc00",
      position: "top-[150px] left-[50px]",
      textPosition: "top-[40px] right-[240px] text-right",
      delay: 1.2
    },
  ];

  return (
    <div ref={ref} className="relative w-full px-4 py-32">
      <div className="relative max-w-5xl mx-auto" style={{ minHeight: "700px" }}>
        {/* Central Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative w-[185px] h-[185px] rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-8 border-[#e7e8ea]">
            <p className="text-[26px] font-black text-black leading-tight">MAIN</p>
            <p className="text-[32px] font-medium text-[#7c7b7b] leading-tight">HEADING</p>
          </div>
        </motion.div>

        {/* Hexagons */}
        {hexagons.map((hex) => {
          const Icon = hex.icon;
          
          return (
            <div key={hex.id}>
              {/* Hexagon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: hex.delay,
                  type: "spring",
                  stiffness: 100
                }}
                className={`absolute ${hex.position} z-10`}
              >
                <div 
                  className="relative w-[215px] h-[215px] flex flex-col items-center justify-center"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                    backgroundColor: hex.color,
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: hex.delay + 0.3 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <Icon 
                      className="h-16 w-16" 
                      style={{ 
                        color: hex.color === "#e2dc00" ? "#353535" : "#e2dc00",
                        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.2))`
                      }} 
                    />
                    <p 
                      className="text-[20px] font-extrabold leading-tight text-center px-4"
                      style={{ 
                        color: hex.color === "#e2dc00" ? "#353535" : "#e2dc00"
                      }}
                    >
                      {hex.label}
                    </p>
                  </motion.div>
                </div>

                {/* Connector line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: hex.delay + 0.2 }}
                  className="absolute w-[3px] h-[30px] bg-[#7c7b7b] left-1/2 -translate-x-1/2"
                  style={{
                    top: hex.position.includes("top-[0px]") ? "100%" : 
                         hex.position.includes("bottom-[0px]") ? "auto" : 
                         hex.position.includes("top-[150px]") ? "100%" : "auto",
                    bottom: hex.position.includes("bottom-[0px]") ? "100%" :
                            hex.position.includes("bottom-[150px]") ? "100%" : "auto",
                    transformOrigin: hex.position.includes("bottom") ? "bottom" : "top",
                  }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: hex.delay + 0.5 }}
                  className="absolute w-[12px] h-[12px] rounded-full bg-[#7c7b7b] left-1/2 -translate-x-1/2"
                  style={{
                    top: hex.position.includes("top-[0px]") ? "calc(100% + 30px)" : 
                         hex.position.includes("top-[150px]") ? "calc(100% + 30px)" : "auto",
                    bottom: hex.position.includes("bottom-[0px]") ? "calc(100% + 30px)" :
                            hex.position.includes("bottom-[150px]") ? "calc(100% + 30px)" : "auto",
                  }}
                />
              </motion.div>

              {/* Description Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: hex.delay + 0.4 }}
                className={`absolute ${hex.textPosition} w-[240px]`}
              >
                <p className="text-[14px] text-neutral-800 leading-relaxed">
                  {hex.desc}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
