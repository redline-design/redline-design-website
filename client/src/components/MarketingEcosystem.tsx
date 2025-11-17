import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Search, 
  DollarSign, 
  Share2, 
  Mail, 
  FileText
} from "lucide-react";

export default function MarketingEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative w-full px-4 py-20">
      <div className="relative max-w-6xl mx-auto" style={{ minHeight: "800px" }}>
        {/* Main Header Box - Left Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="absolute left-0 top-[200px] w-[240px]"
        >
          <div className="relative">
            {/* Outer box with shadow */}
            <div className="bg-[#2a2a2a] rounded-[20px] p-1 shadow-[inset_0px_4px_20px_0px_rgba(0,0,0,0.25)]">
              {/* Inner box */}
              <div className="bg-[#2a2a2a] border-4 border-white rounded-[20px] p-8">
                <h3 className="text-2xl font-bold text-center text-muted-foreground leading-tight">
                  MARKETING ECOSYSTEM
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SVG Lines Container */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="line-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#26bf19" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#26bf19" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cd0000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cd0000" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-magenta" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cd00ac" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cd00ac" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b00cd" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b00cd" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0077cd" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0077cd" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Line to Card 1 */}
          <motion.path
            d="M 280 240 Q 320 100, 360 100"
            stroke="url(#line-green)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.circle cx="360" cy="100" r="6" fill="#26bf19"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.0 }}
          />

          {/* Line to Card 2 */}
          <motion.path
            d="M 280 260 Q 340 240, 360 240"
            stroke="url(#line-red)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.circle cx="360" cy="240" r="6" fill="#cd0000"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.2 }}
          />

          {/* Line to Card 3 */}
          <motion.path
            d="M 280 280 Q 340 360, 360 380"
            stroke="url(#line-magenta)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.circle cx="360" cy="380" r="6" fill="#cd00ac"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.4 }}
          />

          {/* Line to Card 4 */}
          <motion.path
            d="M 280 300 Q 340 500, 360 530"
            stroke="url(#line-purple)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.circle cx="360" cy="530" r="6" fill="#8b00cd"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.6 }}
          />

          {/* Line to Card 5 */}
          <motion.path
            d="M 280 320 Q 340 640, 360 680"
            stroke="url(#line-blue)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          <motion.circle cx="360" cy="680" r="6" fill="#0077cd"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.8 }}
          />
        </svg>

        {/* Card 1 - SEO */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute left-[350px] top-[50px]"
        >
          <div className="relative">
            {/* Colored border wrapper */}
            <div className="absolute left-[30px] top-0 w-[106px] h-[143px] border-r-[15px] border-b-[15px] border-[#26bf19] rounded-br-[20px] rounded-tr-[20px]" />
            
            {/* Icon box */}
            <div className="relative bg-[#2a2a2a] border-4 border-white rounded-[10px] w-[125px] h-[125px] flex items-center justify-center">
              <Search className="h-14 w-14 text-[#26bf19]" style={{ filter: "drop-shadow(0 2px 8px #26bf1960)" }} />
            </div>

            {/* Text on the right */}
            <div className="absolute left-[150px] top-[10px] w-[350px]">
              <h4 className="text-[15px] font-bold text-[#26bf19] mb-2 tracking-wide uppercase">SEO Strategy</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Organic search optimization to drive qualified traffic through strategic keyword targeting and technical excellence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 - PPC */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute left-[350px] top-[190px]"
        >
          <div className="relative">
            {/* Colored border wrapper */}
            <div className="absolute left-[30px] top-0 w-[106px] h-[143px] border-r-[15px] border-b-[15px] border-[#cd0000] rounded-br-[20px] rounded-tr-[20px]" />
            
            {/* Icon box */}
            <div className="relative bg-[#2a2a2a] border-4 border-white rounded-[10px] w-[125px] h-[125px] flex items-center justify-center">
              <DollarSign className="h-14 w-14 text-[#cd0000]" style={{ filter: "drop-shadow(0 2px 8px #cd000060)" }} />
            </div>

            {/* Text on the right */}
            <div className="absolute left-[150px] top-[10px] w-[350px]">
              <h4 className="text-[15px] font-bold text-[#cd0000] mb-2 tracking-wide uppercase">PPC Advertising</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Targeted paid campaigns across Google Ads and social platforms to generate immediate leads and conversions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 - Social */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute left-[350px] top-[340px]"
        >
          <div className="relative">
            {/* Colored border wrapper */}
            <div className="absolute left-[30px] top-0 w-[106px] h-[143px] border-r-[15px] border-b-[15px] border-[#cd00ac] rounded-br-[20px] rounded-tr-[20px]" />
            
            {/* Icon box */}
            <div className="relative bg-[#2a2a2a] border-4 border-white rounded-[10px] w-[125px] h-[125px] flex items-center justify-center">
              <Share2 className="h-14 w-14 text-[#cd00ac]" style={{ filter: "drop-shadow(0 2px 8px #cd00ac60)" }} />
            </div>

            {/* Text on the right */}
            <div className="absolute left-[150px] top-[10px] w-[350px]">
              <h4 className="text-[15px] font-bold text-[#cd00ac] mb-2 tracking-wide uppercase">Social Media</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Build brand awareness and engage your audience across Facebook, Instagram, LinkedIn, and other platforms.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 4 - Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="absolute left-[350px] top-[500px]"
        >
          <div className="relative">
            {/* Colored border wrapper */}
            <div className="absolute left-[30px] top-0 w-[106px] h-[143px] border-r-[15px] border-b-[15px] border-[#8b00cd] rounded-br-[20px] rounded-tr-[20px]" />
            
            {/* Icon box */}
            <div className="relative bg-[#2a2a2a] border-4 border-white rounded-[10px] w-[125px] h-[125px] flex items-center justify-center">
              <FileText className="h-14 w-14 text-[#8b00cd]" style={{ filter: "drop-shadow(0 2px 8px #8b00cd60)" }} />
            </div>

            {/* Text on the right */}
            <div className="absolute left-[150px] top-[10px] w-[350px]">
              <h4 className="text-[15px] font-bold text-[#8b00cd] mb-2 tracking-wide uppercase">Content Marketing</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Strategic blog posts, videos, and resources that establish authority and attract your ideal customers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 5 - Email */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="absolute left-[350px] top-[660px]"
        >
          <div className="relative">
            {/* Colored border wrapper */}
            <div className="absolute left-[30px] top-0 w-[106px] h-[143px] border-r-[15px] border-b-[15px] border-[#0077cd] rounded-br-[20px] rounded-tr-[20px]" />
            
            {/* Icon box */}
            <div className="relative bg-[#2a2a2a] border-4 border-white rounded-[10px] w-[125px] h-[125px] flex items-center justify-center">
              <Mail className="h-14 w-14 text-[#0077cd]" style={{ filter: "drop-shadow(0 2px 8px #0077cd60)" }} />
            </div>

            {/* Text on the right */}
            <div className="absolute left-[150px] top-[10px] w-[350px]">
              <h4 className="text-[15px] font-bold text-[#0077cd] mb-2 tracking-wide uppercase">Email Automation</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Nurture leads with personalized email sequences that guide prospects through your sales funnel.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
