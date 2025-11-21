import { useSyncExternalStore, useEffect, useRef } from "react";

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  isScrolled: boolean;
  isScrollingDown: boolean;
  isScrollingUp: boolean;
  showHeader: boolean;
}

type ScrollKey = keyof ScrollState;

// Singleton scroll manager - only one scroll listener for all components
class ScrollManager {
  private listeners = new Map<ScrollKey, Set<() => void>>();
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
  private lastUpdateTime = Date.now();
  private hasScrollListener = false;

  private updateState = () => {
    if (this.rafId) return;

    this.rafId = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;
      
      // Simple, reliable direction detection
      const delta = currentScrollY - this.lastScrollY;
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;
      
      // Simple header show/hide logic
      let showHeader = true;
      if (currentScrollY < 50) {
        showHeader = true;
      } else if (isScrollingDown) {
        showHeader = false;
      } else if (isScrollingUp) {
        showHeader = true;
      }

      const newState: ScrollState = {
        scrollY: currentScrollY,
        scrollProgress: progress,
        isScrolled: currentScrollY > 50,
        isScrollingDown,
        isScrollingUp,
        showHeader,
      };

      // Only notify listeners for values that actually changed
      (Object.keys(newState) as ScrollKey[]).forEach((key) => {
        if (this.state[key] !== newState[key]) {
          const keyListeners = this.listeners.get(key);
          if (keyListeners) {
            keyListeners.forEach(listener => listener());
          }
        }
      });

      this.state = newState;
      this.lastScrollY = currentScrollY;
      this.rafId = null;
    });
  };

  subscribe(keys: ScrollKey[], listener: () => void) {
    // Add listener to each key's set
    keys.forEach(key => {
      if (!this.listeners.has(key)) {
        this.listeners.set(key, new Set());
      }
      this.listeners.get(key)!.add(listener);
    });
    
    // Start scroll listener if needed
    if (!this.hasScrollListener) {
      window.addEventListener("scroll", this.updateState, { passive: true });
      this.hasScrollListener = true;
      // Initial update
      this.updateState();
    }

    return () => {
      // Remove listener from each key's set
      keys.forEach(key => {
        const keyListeners = this.listeners.get(key);
        if (keyListeners) {
          keyListeners.delete(listener);
          if (keyListeners.size === 0) {
            this.listeners.delete(key);
          }
        }
      });
      
      // Stop scroll listener if no more listeners
      if (this.listeners.size === 0) {
        window.removeEventListener("scroll", this.updateState);
        this.hasScrollListener = false;
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      }
    };
  }

  getSnapshot = () => this.state;
  getValue = (key: ScrollKey) => this.state[key];
}

// Single instance shared across all components
const scrollManager = new ScrollManager();

/**
 * Optimized scroll hook - only re-renders when requested keys change
 * Use this for components that need specific scroll values
 */
export function useScrollValue<K extends ScrollKey>(keys: K[]): Pick<ScrollState, K> {
  const snapshot = useSyncExternalStore(
    (callback) => scrollManager.subscribe(keys, callback),
    () => scrollManager.getSnapshot(),
    () => scrollManager.getSnapshot()
  );

  const result = {} as Pick<ScrollState, K>;
  keys.forEach(key => {
    result[key] = snapshot[key];
  });
  
  return result;
}

/**
 * Legacy hook for backward compatibility - returns full state
 * WARNING: This will re-render on ANY scroll value change
 */
export function useScroll(): ScrollState {
  return useSyncExternalStore(
    (callback) => scrollManager.subscribe(['scrollY', 'scrollProgress', 'isScrolled', 'isScrollingDown', 'isScrollingUp', 'showHeader'], callback),
    () => scrollManager.getSnapshot(),
    () => scrollManager.getSnapshot()
  );
}

/**
 * Imperative scroll progress hook - updates DOM directly without re-renders
 * Use this for ScrollProgressBar to avoid React overhead
 */
export function useScrollProgressImperative(callback: (progress: number) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        callbackRef.current(progress);
        rafId = null;
      });
    };

    // Emit initial value immediately
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const initialProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    callbackRef.current(initialProgress);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
