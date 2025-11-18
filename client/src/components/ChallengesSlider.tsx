import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, AlertTriangle, LucideIcon } from 'lucide-react';

interface ChallengeSlide {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  stat: {
    value: string;
    label: string;
  };
  buttonText: string;
  buttonLink: string;
}

interface ChallengesSliderProps {
  challenges: ChallengeSlide[];
}

export function ChallengesSlider({ challenges }: ChallengesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating || challenges.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating || challenges.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNavClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);

  if (challenges.length === 0) return null;

  const getSlideAtPosition = (position: number) => {
    const index = (currentIndex + position) % challenges.length;
    return challenges[index >= 0 ? index : index + challenges.length];
  };

  const activeSlideIndex = currentIndex;

  // Get CSS class for animated gradient background based on challenge color
  const getGradientClassForColor = (color: string) => {
    const gradientClasses: Record<string, string> = {
      blue: 'challenge-bg-blue',
      orange: 'challenge-bg-orange',
      purple: 'challenge-bg-purple',
      green: 'challenge-bg-green',
      cyan: 'challenge-bg-cyan',
      pink: 'challenge-bg-pink',
      yellow: 'challenge-bg-yellow',
    };
    return gradientClasses[color] || gradientClasses.blue;
  };

  return (
    <div className="slider-carousel-container" data-testid="challenges-slider">
      <div className="slider-carousel-slide">
        {/* Slide 0 - Background */}
        <div
          className={`slider-carousel-item slider-carousel-item-0 ${getGradientClassForColor(getSlideAtPosition(-1).color)}`}
          data-testid={`challenge-slide-${getSlideAtPosition(-1).id}`}
        />

        {/* Slides 2, 3 - Preview cards */}
        {[1, 2].map((position, idx) => {
          const slide = getSlideAtPosition(position);
          const Icon = slide.icon;
          return (
            <div
              key={`preview-${position}`}
              className={`slider-carousel-item slider-carousel-item-${position + 1} ${getGradientClassForColor(slide.color)}`}
              data-testid={`challenge-slide-preview-${position + 1}`}
            >
              {/* Preview Content */}
              <div className="challenge-preview-content">
                <div className={`challenge-preview-icon challenge-icon-${slide.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="challenge-preview-title">{slide.title}</h4>
                <p className="challenge-preview-description">{slide.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="slider-carousel-buttons" data-testid="challenges-carousel-controls">
        <button
          onClick={handlePrev}
          className="slider-carousel-nav-button"
          disabled={isAnimating}
          aria-label="Previous challenge"
          data-testid="button-challenge-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="slider-carousel-nav-button"
          disabled={isAnimating}
          aria-label="Next challenge"
          data-testid="button-challenge-next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
