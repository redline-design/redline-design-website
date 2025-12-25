import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioItem } from "@shared/schema";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  totalItems: number;
  active: number;
  onClick: () => void;
}

function PortfolioCard({ item, index, totalItems, active, onClick }: PortfolioCardProps) {
  const getZIndex = (index: number, active: number, totalItems: number): number => {
    const distance = Math.abs(index - active);
    return totalItems - distance;
  };

  const zIndex = getZIndex(index, active, totalItems);
  const activeValue = (index - active) / totalItems;

  return (
    <div
      className="carousel-item"
      style={{
        '--zIndex': zIndex,
        '--active': activeValue,
        '--items': totalItems,
      } as React.CSSProperties}
      onClick={onClick}
      data-testid={`portfolio-card-${item.id}`}
    >
      <div className="carousel-box" style={{ '--opacity': zIndex / totalItems * 3 - 2 } as React.CSSProperties}>
        <div className="carousel-title" data-testid={`portfolio-title-${item.id}`}>
          {item.title}
        </div>
        <div className="carousel-num">{String(index + 1).padStart(2, '0')}</div>
        <img
          src={item.screenshotUrl || '/placeholder-portfolio.png'}
          alt={item.title}
          className="carousel-img"
          data-testid={`portfolio-image-${item.id}`}
        />
      </div>
    </div>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="text-center py-20">
      <Skeleton className="h-12 w-64 mx-auto mb-4" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
  );
}

export default function OurWork() {
  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const [progress, setProgress] = useState(50);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const speedWheel = 0.15;
  const speedDrag = -0.75;

  useEffect(() => {
    if (portfolioItems.length > 0) {
      const clampedProgress = Math.max(0, Math.min(progress, 100));
      const newActive = Math.floor((clampedProgress / 100) * (portfolioItems.length - 1));
      setActive(newActive);
    }
  }, [progress, portfolioItems.length]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const wheelProgress = e.deltaY * speedWheel;
    setProgress(prev => prev + wheelProgress);
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    setIsDown(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const mouseProgress = (clientX - startX) * speedDrag;
    setProgress(prev => prev + mouseProgress);
    setStartX(clientX);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleCardClick = (index: number) => {
    const itemCount = portfolioItems.length;
    if (itemCount <= 1) return;
    const newProgress = (index / (itemCount - 1)) * 100;
    setProgress(Math.max(0, Math.min(newProgress, 100)));
  };

  const goToPrevious = () => {
    if (portfolioItems.length <= 1) return;
    const newActive = active > 0 ? active - 1 : portfolioItems.length - 1;
    const newProgress = (newActive / (portfolioItems.length - 1)) * 100;
    setProgress(Math.max(0, Math.min(newProgress, 100)));
  };

  const goToNext = () => {
    if (portfolioItems.length <= 1) return;
    const newActive = active < portfolioItems.length - 1 ? active + 1 : 0;
    const newProgress = (newActive / (portfolioItems.length - 1)) * 100;
    setProgress(Math.max(0, Math.min(newProgress, 100)));
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const wheelListener = (e: Event) => handleWheel(e as WheelEvent);
    const mouseDownListener = (e: Event) => handleMouseDown(e as MouseEvent);
    const touchStartListener = (e: Event) => handleMouseDown(e as TouchEvent);
    const mouseMoveListener = (e: Event) => handleMouseMove(e as MouseEvent);
    const touchMoveListener = (e: Event) => handleMouseMove(e as TouchEvent);

    carousel.addEventListener('wheel', wheelListener, { passive: false });
    carousel.addEventListener('mousedown', mouseDownListener);
    carousel.addEventListener('touchstart', touchStartListener);
    
    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('touchmove', touchMoveListener);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      carousel.removeEventListener('wheel', wheelListener);
      carousel.removeEventListener('mousedown', mouseDownListener);
      carousel.removeEventListener('touchstart', touchStartListener);
      
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('touchmove', touchMoveListener);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDown, startX, portfolioItems.length]);

  if (isLoading) {
    return (
      <div className="pt-20 portfolio-page">
        <PortfolioSkeleton />
      </div>
    );
  }

  if (portfolioItems.length === 0) {
    return (
      <div className="pt-20 portfolio-page">
        <div className="text-center py-20 px-4" data-testid="portfolio-empty-state">
          <p className="text-lg text-muted-foreground">No portfolio items to display yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      {/* Desktop Navigation Arrows */}
      <div className="portfolio-nav-arrows" data-testid="portfolio-nav-arrows">
        <button
          onClick={goToPrevious}
          className="portfolio-nav-btn"
          aria-label="Previous project"
          data-testid="button-portfolio-prev"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="portfolio-nav-btn"
          aria-label="Next project"
          data-testid="button-portfolio-next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="carousel" ref={carouselRef} data-testid="section-portfolio-carousel">
        {portfolioItems.map((item, index) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={index}
            totalItems={portfolioItems.length}
            active={active}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      <div className="portfolio-progress" data-testid="portfolio-progress">
        <span className="progress-number" data-testid="portfolio-progress-count">
          {String(active + 1).padStart(2, '0')}
        </span>
        <span className="progress-divider">/</span>
        <span className="progress-total">
          {String(portfolioItems.length).padStart(2, '0')}
        </span>
      </div>

      <div className="layout">
        <div className="layout-box">
          High-end, full-service<br />digital marketing<br />for growing brands.
        </div>
      </div>
    </div>
  );
}
