import { useState, useEffect, useCallback, useRef } from "react";
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
  const activeIndexRef = useRef(0);

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
      const viewportMiddle = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      let closestDist = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i].element;
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        const elBottom = elTop + rect.height;
        const elCenter = elTop + rect.height * 0.3;

        if (viewportMiddle >= elTop && viewportMiddle <= elBottom) {
          const dist = Math.abs(viewportMiddle - elCenter);
          if (dist < closestDist) {
            closestDist = dist;
            current = i;
          }
        } else if (viewportMiddle >= elTop) {
          current = i;
        }
      }

      if (window.scrollY < 100) {
        current = 0;
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= docHeight - 50) {
        current = sections.length - 1;
      }

      if (current !== activeIndexRef.current) {
        activeIndexRef.current = current;
        setActiveIndex(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (index: number) => {
    const el = sections[index]?.element;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!visible || sections.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-6 top-[40%] -translate-y-1/2 z-40 hidden lg:flex flex-col items-end"
      data-testid="section-tracker"
    >
      <div className="relative flex flex-col gap-0">
        <div
          className="absolute right-[5px] top-[8px] bottom-[8px] w-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {sections.map((section, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(i)}
              className="group relative flex items-center gap-3 py-[8px] cursor-pointer"
              aria-label={`Go to ${section.label}`}
              data-testid={`tracker-dot-${i}`}
            >
              <span
                className="whitespace-nowrap text-[12px] font-semibold transition-all duration-300 leading-none"
                style={{
                  color: isActive
                    ? "#ff0000"
                    : isPast
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.25)",
                  textShadow: isActive ? "0 0 10px rgba(255,0,0,0.3)" : "none",
                }}
              >
                {section.label}
              </span>

              <div className="relative z-10 flex items-center justify-center w-[11px] h-[11px]">
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 11 : 6,
                    height: isActive ? 11 : 6,
                    background: isActive
                      ? "#ff0000"
                      : isPast
                        ? "rgba(255, 0, 0, 0.4)"
                        : "rgba(255,255,255,0.2)",
                    boxShadow: isActive
                      ? "0 0 8px rgba(255,0,0,0.6), 0 0 20px rgba(255,0,0,0.2)"
                      : "none",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
