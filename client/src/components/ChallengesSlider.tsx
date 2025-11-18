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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Calculate max scroll based on pages (groups of visible cards)
  // For desktop showing 2 cards per page, we have ceil(length / 2) pages
  // For mobile showing 1 card per page, we have length pages
  // maxScroll is pages - 1 (since we start at 0)
  const getMaxScroll = () => {
    if (typeof window === 'undefined') return Math.max(0, challenges.length - 1);
    // Desktop/tablet shows 2 cards, mobile shows 1
    const visibleCards = window.innerWidth >= 640 ? 2 : 1;
    const totalPages = Math.ceil(challenges.length / visibleCards);
    return Math.max(0, totalPages - 1);
  };

  const handleNext = () => {
    if (isAnimating || challenges.length === 0) return;
    setIsAnimating(true);
    const maxScroll = getMaxScroll();
    setScrollPosition((prev) => Math.min(prev + 1, maxScroll));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating || challenges.length === 0) return;
    setIsAnimating(true);
    setScrollPosition((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, scrollPosition]);

  if (challenges.length === 0) return null;
  
  const maxScroll = getMaxScroll();

  return (
    <div className="challenges-carousel-wrapper" data-testid="challenges-slider">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="challenges-nav-arrow challenges-nav-arrow-left"
        disabled={scrollPosition === 0 || isAnimating}
        aria-label="Previous challenge"
        data-testid="button-challenge-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={handleNext}
        className="challenges-nav-arrow challenges-nav-arrow-right"
        disabled={scrollPosition >= maxScroll || isAnimating}
        aria-label="Next challenge"
        data-testid="button-challenge-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Cards Container */}
      <div className="challenges-cards-container">
        <motion.div
          className="challenges-cards-track"
          animate={{
            x: `calc(-${scrollPosition * 100}% - ${scrollPosition * 24}px)`
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.id}
                className="challenge-card"
                data-testid={`challenge-card-${challenge.id}`}
              >
                {/* Icon */}
                <div className={`challenge-card-icon challenge-icon-${challenge.color}`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="challenge-card-title">{challenge.title}</h3>

                {/* Description */}
                <p className="challenge-card-description">{challenge.description}</p>

                {/* Pain Points */}
                <div className="challenge-card-section">
                  <h4 className="challenge-card-section-title">Pain Points</h4>
                  <ul className="challenge-card-list">
                    {challenge.painPoints.slice(0, 3).map((point, idx) => (
                      <li key={idx} className="challenge-card-list-item">
                        <span className="challenge-card-bullet">×</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="challenge-card-section">
                  <h4 className="challenge-card-section-title">How We Fix It</h4>
                  <ul className="challenge-card-list">
                    {challenge.solutions.slice(0, 3).map((solution, idx) => (
                      <li key={idx} className="challenge-card-list-item">
                        <span className="challenge-card-bullet-success">✓</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stat */}
                <div className="challenge-card-stat">
                  <div className="challenge-card-stat-value">{challenge.stat.value}</div>
                  <div className="challenge-card-stat-label">{challenge.stat.label}</div>
                </div>

                {/* CTA */}
                <a href={challenge.buttonLink} data-testid={`button-challenge-cta-${challenge.id}`}>
                  <button className="challenge-card-cta">
                    {challenge.buttonText}
                  </button>
                </a>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
