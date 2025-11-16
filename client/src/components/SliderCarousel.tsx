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
          <div className="slider-carousel-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="slider-carousel-title"
                  initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  {getSlideAtPosition(1).title}
                </motion.div>
                <motion.div
                  className="slider-carousel-description"
                  initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
                >
                  {getSlideAtPosition(1).description}
                </motion.div>
                
                {getSlideAtPosition(1).stats && (
                  <motion.div
                    className="slider-carousel-stats"
                    initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
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
                  initial={{ opacity: 0, y: 100, filter: 'blur(33px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: 'easeInOut', delay: 0.7 }}
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

        {/* Slides 2, 3, 4+ - Preview cards */}
        {[2, 3, 4, 5, 6].map((position) => {
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
