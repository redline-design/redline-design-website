import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TrackedSection {
  id: string;
  label: string;
  element: HTMLElement;
}

export default function SectionTracker() {
  const [sections, setSections] = useState<TrackedSection[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const scanSections = useCallback(() => {
    const elements = document.querySelectorAll("[data-section-label]");
    const tracked: TrackedSection[] = [];
    elements.forEach((el, i) => {
      const label = el.getAttribute("data-section-label") || `Section ${i + 1}`;
      tracked.push({
        id: `section-${i}`,
        label,
        element: el as HTMLElement,
      });
    });
    setSections(tracked);
    setVisible(tracked.length > 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(scanSections, 500);

    const observer = new MutationObserver(() => {
      setTimeout(scanSections, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [scanSections]);

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].element.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollY >= top) {
          current = i;
        }
      }
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (index: number) => {
    const el = sections[index]?.element;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!visible || sections.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      data-testid="section-tracker"
    >
      {sections.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(i)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${section.label}`}
            data-testid={`tracker-dot-${i}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive ? "#ff0000" : "rgba(255,255,255,0.25)",
                boxShadow: isActive ? "0 0 8px rgba(255,0,0,0.5), 0 0 16px rgba(255,0,0,0.2)" : "none",
              }}
            />
            <span
              className="absolute right-6 whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: "rgba(0,0,0,0.85)",
                color: isActive ? "#ff4444" : "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
