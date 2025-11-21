import { useScroll } from "@/hooks/use-scroll";

export default function ScrollProgressBar() {
  const { scrollProgress } = useScroll();

  return (
    <div className="fixed left-0 top-0 w-1 h-screen bg-white/5 z-50 pointer-events-none">
      <div
        className="w-full h-full bg-gradient-to-b from-primary to-primary/60 origin-top transition-transform duration-75 ease-out"
        style={{
          transform: `scaleY(${scrollProgress / 100})`,
          boxShadow: "0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)",
        }}
      />
    </div>
  );
}
