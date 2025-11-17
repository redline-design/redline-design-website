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
        
        {/* Slide 1 - Active */}
        <div
          className={`slider-carousel-item slider-carousel-item-1 ${getGradientClassForColor(getSlideAtPosition(0).color)}`}
          data-testid={`challenge-slide-${getSlideAtPosition(0).id}-active`}
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
                    className={`challenges-slider-icon-wrapper challenge-icon-${getSlideAtPosition(0).color}`}
                    initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {(() => {
                      const Icon = getSlideAtPosition(0).icon;
                      return <Icon className="w-10 h-10 sm:w-12 sm:h-12" />;
                    })()}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="challenges-slider-title"
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                  >
                    {getSlideAtPosition(0).title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="challenges-slider-description"
                    initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                  >
                    {getSlideAtPosition(0).description}
                  </motion.p>

                  {/* Content Grid: Pain Points & Solutions */}
                  <motion.div
                    className="challenges-slider-content-grid"
                    initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                  >
                    {/* Pain Points */}
                    <div className="challenges-slider-section">
                      <h4 className="challenges-slider-section-title">Pain Points</h4>
                      <ul className="challenges-slider-list">
                        {getSlideAtPosition(0).painPoints.map((point, idx) => (
                          <li key={idx} className="challenges-slider-list-item">
                            <span className="challenges-slider-bullet">×</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div className="challenges-slider-section">
                      <h4 className="challenges-slider-section-title">How We Fix It</h4>
                      <ul className="challenges-slider-list">
                        {getSlideAtPosition(0).solutions.map((solution, idx) => (
                          <li key={idx} className="challenges-slider-list-item">
                            <span className="challenges-slider-bullet-success">✓</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Stat Bar */}
                  <motion.div
                    className="challenges-slider-stat-bar"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                  >
                    <div className="challenges-slider-stat-value">{getSlideAtPosition(0).stat.value}</div>
                    <div className="challenges-slider-stat-label">{getSlideAtPosition(0).stat.label}</div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.a
                    href={getSlideAtPosition(0).buttonLink}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
                    data-testid="button-challenge-cta"
                  >
                    <button className="challenges-slider-cta-button">
                      {getSlideAtPosition(0).buttonText}
                    </button>
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slides 2, 3 - Preview cards */}
        {[1, 2].map((position, idx) => {
          const slide = getSlideAtPosition(position);
          return (
            <div
              key={`preview-${position}`}
              className={`slider-carousel-item slider-carousel-item-${position + 1} ${getGradientClassForColor(slide.color)}`}
              data-testid={`challenge-slide-preview-${position + 1}`}
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
