import { motion } from "framer-motion";

interface StatCardWithGraphProps {
  value: string;
  label: string;
  subtitle: string;
  trend: "up" | "down";
  trendValue: string;
  graphData: number[];
  color: string;
  testId?: string;
}

export default function StatCardWithGraph({
  value,
  label,
  subtitle,
  trend,
  trendValue,
  graphData,
  color,
  testId
}: StatCardWithGraphProps) {
  const max = Math.max(...graphData);
  const min = Math.min(...graphData);
  const range = max - min || 1;
  
  const points = graphData.map((value, index) => {
    const x = (index / (graphData.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const pathD = `M ${points}`;

  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-card shadow-lg"
      data-testid={testId}
    >
      {/* Content */}
      <div className="px-6 pt-8 pb-24 text-center relative z-10">
        <h4 className="text-sm uppercase text-muted-foreground tracking-wide mb-2">
          {label}
        </h4>
        <h3 className="text-4xl font-bold text-foreground my-3">
          {value}
        </h3>
        <p 
          className="text-sm font-semibold flex items-center justify-center gap-1"
          style={{ color }}
        >
          <span>{trend === "up" ? "▲" : "▼"}</span>
          <span>{trendValue}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>

      {/* Mini Graph */}
      <div className="absolute bottom-0 inset-x-0 h-20">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id={`gradient-${testId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d={`${pathD} L 100,100 L 0,100 Z`}
            fill={`url(#gradient-${testId})`}
          />
          
          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
