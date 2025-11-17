import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, AlertTriangle, LucideIcon } from 'lucide-react';

interface ChallengeSlide {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
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
    const targetIndex = (index - 1 + challenges.length) % challenges.length;
    if (isAnimating || targetIndex === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(targetIndex);
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

  const activeSlideIndex = (currentIndex + 1) % challenges.length;

  // Generate gradient background based on challenge color
  const getGradientForColor = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
      orange: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #fb923c 100%)',
      purple: 'linear-gradient(135deg, #581c87 0%, #9333ea 50%, #a855f7 100%)',
      green: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #4ade80 100%)',
      cyan: 'linear-gradient(135deg, #164e63 0%, #0891b2 50%, #22d3ee 100%)',
      pink: 'linear-gradient(135deg, #831843 0%, #db2777 50%, #f472b6 100%)',
      yellow: 'linear-gradient(135deg, #713f12 0%, #ca8a04 50%, #facc15 100%)',
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <div className="slider-carousel-container" data-testid="challenges-slider">
      <div className="slider-carousel-slide">
        {/* Slide 0 - Background */}
        <div
          className="slider-carousel-item slider-carousel-item-0"
          style={{
            background: getGradientForColor(getSlideAtPosition(0).color),
          }}
          data-testid={`challenge-slide-${getSlideAtPosition(0).id}`}
        />
        
        {/* Slide 1 - Active */}
        <div
          className="slider-carousel-item slider-carousel-item-1"
          style={{
            background: getGradientForColor(getSlideAtPosition(1).color),
          }}
          data-testid={`challenge-slide-${getSlideAtPosition(1).id}-active`}
        >
          {/* Top Navigation Bar */}
          <div className="slider-carousel-nav-bar" data-testid="challenges-nav-bar">
            <div className="slider-carousel-nav-items">
              {challenges.map((challenge, index) => (
                <button 
                  key={challenge.id}
                  onClick={() => handleNavClick(index)}
                  disabled={isAnimating}
                  className={`slider-carousel-nav-item ${index === activeSlideIndex ? 'active' : ''}`}
                  data-testid={`challenge-nav-item-${index}`}
                  aria-label={`Go to challenge ${index + 1}: ${challenge.title}`}
                >
                  <span className="slider-carousel-nav-number">{index + 1}</span>
                  <span className="slider-carousel-nav-title">{challenge.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Frosted Glass Content Overlay */}
          <div className="slider-carousel-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="challenges-slider-content-wrapper"
              >
                {/* Frosted Glass Card */}
                <div className="challenges-slider-frosted-card">
                  {/* Icon */}
                  <motion.div
                    className={`challenges-slider-icon-wrapper challenge-icon-${getSlideAtPosition(1).color}`}
                    initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {(() => {
                      const Icon = getSlideAtPosition(1).icon;
                      return <Icon className="w-12 h-12 sm:w-16 sm:h-16" />;
                    })()}
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    className="slider-carousel-title"
                    initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
                  >
                    {getSlideAtPosition(1).title}
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    className="slider-carousel-description"
                    initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
                  >
                    {getSlideAtPosition(1).description}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.a
                    href={getSlideAtPosition(1).buttonLink}
                    initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.6 }}
                    data-testid="button-challenge-cta"
                  >
                    <button className="slider-carousel-button">
                      {getSlideAtPosition(1).buttonText}
                    </button>
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slides 2, 3 - Preview cards */}
        {[2, 3].map((position) => {
          const slide = getSlideAtPosition(position);
          return (
            <div
              key={`preview-${position}`}
              className={`slider-carousel-item slider-carousel-item-${position}`}
              style={{
                background: getGradientForColor(slide.color),
              }}
              data-testid={`challenge-slide-preview-${position}`}
            />
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
