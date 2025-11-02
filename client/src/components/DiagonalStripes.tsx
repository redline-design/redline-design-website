import { memo } from "react";

const DiagonalStripes = memo(function DiagonalStripes() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="diagonal-stripes"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="20"
              stroke="rgba(255, 255, 255, 0.02)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
      </svg>
    </div>
  );
});

DiagonalStripes.displayName = "DiagonalStripes";

export default DiagonalStripes;
