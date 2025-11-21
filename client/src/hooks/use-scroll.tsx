import { useSyncExternalStore } from "react";

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  isScrolled: boolean;
  isScrollingDown: boolean;
  isScrollingUp: boolean;
  showHeader: boolean;
}

// Singleton scroll manager - only one scroll listener for all components
class ScrollManager {
  private listeners = new Set<() => void>();
  private state: ScrollState = {
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
    isScrollingDown: false,
    isScrollingUp: false,
    showHeader: true,
  };
  private rafId: number | null = null;
  private lastScrollY = 0;

  private updateState = () => {
    if (this.rafId) return;

    this.rafId = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;
      
      const isScrollingDown = currentScrollY > this.lastScrollY;
      const isScrollingUp = currentScrollY < this.lastScrollY;
      
      // Determine if header should show
      let showHeader = true;
      if (currentScrollY < 100) {
        showHeader = true;
      } else if (isScrollingUp) {
        showHeader = true;
      } else if (isScrollingDown) {
        showHeader = false;
      }

      this.state = {
        scrollY: currentScrollY,
        scrollProgress: progress,
        isScrolled: currentScrollY > 50,
        isScrollingDown,
        isScrollingUp,
        showHeader,
      };

      this.lastScrollY = currentScrollY;
      this.rafId = null;
      
      // Notify all subscribers
      this.listeners.forEach(listener => listener());
    });
  };

  subscribe(listener: () => void) {
    // Start listening to scroll events if this is the first subscriber
    const wasEmpty = this.listeners.size === 0;
    this.listeners.add(listener);
    
    if (wasEmpty) {
      window.addEventListener("scroll", this.updateState, { passive: true });
      // Initial update
      this.updateState();
    }

    return () => {
      this.listeners.delete(listener);
      
      // Stop listening if no more subscribers
      if (this.listeners.size === 0) {
        window.removeEventListener("scroll", this.updateState);
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      }
    };
  }

  getSnapshot = () => this.state;
}

// Single instance shared across all components
const scrollManager = new ScrollManager();

/**
 * Unified scroll hook using singleton pattern
 * Only one scroll listener regardless of how many components use this hook
 */
export function useScroll(): ScrollState {
  return useSyncExternalStore(
    (callback) => scrollManager.subscribe(callback),
    () => scrollManager.getSnapshot(),
    () => scrollManager.getSnapshot()
  );
}
