import { useRef, useState, useEffect, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  glowColor?: string;
}

export default function GlowCard({ children, className = "", "data-testid": testId }: GlowCardProps) {
  return (
    <div
      className={`glow-card ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
