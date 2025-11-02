import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateScrollProgress = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
        
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleY(${progress / 100})`;
        }
      });
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 w-1 h-screen bg-white/5 z-50 pointer-events-none">
      <div
        ref={progressRef}
        className="w-full h-full bg-gradient-to-b from-primary to-primary/60 origin-top"
        style={{
          transform: "scaleY(0)",
          boxShadow: "0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)",
        }}
      />
    </div>
  );
}
