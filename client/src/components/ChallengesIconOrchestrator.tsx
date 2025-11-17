import { useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { animate } from 'framer-motion';
import { useChallengesIconContext } from '@/contexts/ChallengesIconContext';

interface ChallengesIconOrchestratorProps {
  iconRefs: RefObject<SVGSVGElement>[];
}

export default function ChallengesIconOrchestrator({ iconRefs }: ChallengesIconOrchestratorProps) {
  const { setHasMergedIcons, resetAnimation } = useChallengesIconContext();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0 && !hasAnimatedRef.current) {
            if (prefersReducedMotion) {
              setHasMergedIcons(true);
              hasAnimatedRef.current = true;
            } else {
              animateIconsToBar();
            }
          } else if (entry.isIntersecting && hasAnimatedRef.current) {
            resetAnimation();
            hasAnimatedRef.current = false;
          }
        });
      },
      { threshold: 0.1, root: null }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [setHasMergedIcons, resetAnimation]);

  const animateIconsToBar = async () => {
    const stickyBar = document.querySelector('[data-testid="section-sticky-conversion-bar"]');
    if (!stickyBar) return;

    const stickyBarRect = stickyBar.getBoundingClientRect();
    const targetX = stickyBarRect.left + stickyBarRect.width / 2;
    const targetY = stickyBarRect.bottom - 60;

    const clones: HTMLDivElement[] = [];
    const animations: Promise<void>[] = [];

    iconRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const iconRect = ref.current.getBoundingClientRect();
      const clone = document.createElement('div');
      clone.style.position = 'fixed';
      clone.style.left = `${iconRect.left}px`;
      clone.style.top = `${iconRect.top}px`;
      clone.style.width = `${iconRect.width}px`;
      clone.style.height = `${iconRect.height}px`;
      clone.style.pointerEvents = 'none';
      clone.style.zIndex = '9999';
      
      const iconClone = ref.current.cloneNode(true) as SVGSVGElement;
      iconClone.style.width = '100%';
      iconClone.style.height = '100%';
      clone.appendChild(iconClone);
      
      document.body.appendChild(clone);
      clones.push(clone);

      ref.current.style.opacity = '0';

      const animation = animate(
        clone,
        {
          left: `${targetX - iconRect.width / 2}px`,
          top: `${targetY - iconRect.height / 2}px`,
          opacity: [1, 1, 0],
        },
        {
          duration: 1.2,
          delay: index * 0.05,
          ease: [0.4, 0, 0.2, 1],
        }
      );

      animations.push(animation.then(() => {}));
    });

    await Promise.all(animations);

    clones.forEach(clone => clone.remove());

    iconRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.opacity = '1';
      }
    });

    setHasMergedIcons(true);
    hasAnimatedRef.current = true;
  };

  return <div ref={sectionRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', pointerEvents: 'none' }} />;
}
