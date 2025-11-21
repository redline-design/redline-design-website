import { useScrollProgressImperative } from "@/hooks/use-scroll";
import { useRef } from "react";

export default function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useScrollProgressImperative((progress) => {
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleY(${progress / 100})`;
    }
  });

  return (
    <div 
      className="fixed left-0 top-0 w-1 h-screen bg-white/5 z-50 pointer-events-none"
      data-testid="scroll-progress-bar"
    >
      <div
        ref={fillRef}
        className="w-full h-full bg-gradient-to-b from-primary to-primary/60 origin-top"
        style={{
          transform: 'scaleY(0)',
          boxShadow: "0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)",
        }}
        data-testid="scroll-progress-fill"
      />
    </div>
  );
}
