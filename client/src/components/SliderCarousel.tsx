import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

interface SliderCarouselProps {
  slides: SliderSlide[];
}

export function SliderCarousel({ slides }: SliderCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNavClick = (index: number) => {
    // Calculate the currentIndex needed to display the clicked slide at position 1
    const targetIndex = (index - 1 + slides.length) % slides.length;
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

  if (slides.length === 0) return null;

  const getSlideAtPosition = (position: number) => {
    const index = (currentIndex + position) % slides.length;
    return slides[index >= 0 ? index : index + slides.length];
  };

  // Calculate which slide is currently active (displayed at position 1)
  const activeSlideIndex = (currentIndex + 1) % slides.length;

  return (
    <div className="slider-carousel-container" data-testid="slider-carousel">
      <div className="slider-carousel-slide">
        {/* Slides 0 and 1 - Full screen */}
        <div
          className="slider-carousel-item slider-carousel-item-0"
          style={{
            backgroundImage: `url(${getSlideAtPosition(0).image})`,
          }}
          data-testid={`slide-${getSlideAtPosition(0).id}`}
        />
        
        <div
          className="slider-carousel-item slider-carousel-item-1"
          style={{
            backgroundImage: `url(${getSlideAtPosition(1).image})`,
          }}
          data-testid={`slide-${getSlideAtPosition(1).id}-active`}
        >
          {/* Navigation Bar */}
          <div className="slider-carousel-nav-bar md:static md:bottom-auto" data-testid="slider-nav-bar">
            {/* Mobile: Left Arrow */}
            <button
              onClick={handlePrev}
              className="slider-carousel-nav-button md:hidden"
              disabled={isAnimating}
              aria-label="Previous slide"
              data-testid="button-slider-prev-mobile"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="slider-carousel-nav-items">
              {slides.map((slide, index) => (
                <button 
                  key={slide.id}
                  onClick={() => handleNavClick(index)}
                  disabled={isAnimating}
                  className={`slider-carousel-nav-item ${index === activeSlideIndex ? 'active' : ''}`}
                  data-testid={`nav-item-${index}`}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                >
                  <span className="slider-carousel-nav-number">{index + 1}</span>
                  <span className="slider-carousel-nav-title">{slide.title}</span>
                </button>
              ))}
            </div>

            {/* Mobile: Right Arrow */}
            <button
              onClick={handleNext}
              className="slider-carousel-nav-button md:hidden"
              disabled={isAnimating}
              aria-label="Next slide"
              data-testid="button-slider-next-mobile"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="slider-carousel-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  className="slider-carousel-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {getSlideAtPosition(1).title}
                </motion.div>
                <motion.div
                  className="slider-carousel-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                >
                  {getSlideAtPosition(1).description}
                </motion.div>
                
                {getSlideAtPosition(1).stats && (
                  <motion.div
                    className="slider-carousel-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                    data-testid="slider-stats-container"
                  >
                    {getSlideAtPosition(1).stats?.map((stat, idx) => {
                      const statId = stat.label.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <div 
                          key={idx} 
                          className="slider-carousel-stat-item"
                          data-testid={`stat-card-${statId}`}
                        >
                          <div 
                            className="slider-carousel-stat-value"
                            data-testid={`stat-value-${statId}`}
                          >
                            {stat.value}
                          </div>
                          <div 
                            className="slider-carousel-stat-label"
                            data-testid={`stat-label-${statId}`}
                          >
                            {stat.label}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
                
                <motion.a
                  href={getSlideAtPosition(1).buttonLink}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                  data-testid="button-slider-cta"
                >
                  <button className="slider-carousel-button">
                    {getSlideAtPosition(1).buttonText}
                  </button>
                </motion.a>
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
                backgroundImage: `url(${slide.image})`,
              }}
              data-testid={`slide-preview-${position}`}
            />
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="slider-carousel-buttons" data-testid="slider-carousel-controls">
        <button
          onClick={handlePrev}
          className="slider-carousel-nav-button"
          disabled={isAnimating}
          aria-label="Previous slide"
          data-testid="button-slider-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="slider-carousel-nav-button"
          disabled={isAnimating}
          aria-label="Next slide"
          data-testid="button-slider-next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
