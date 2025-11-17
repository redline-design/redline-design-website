import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Eye, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, AlertTriangle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import GlowCard from './GlowCard';

const challenges = [
  {
    id: 'visibility',
    icon: Eye,
    color: 'blue',
    title: 'Low Visibility & High Ad Costs',
    description: 'Struggling to get found online while watching ad costs skyrocket? We optimize your presence for maximum visibility at minimal cost.',
  },
  {
    id: 'conversion',
    icon: MousePointerClick,
    color: 'orange',
    title: 'Poor Website Conversion',
    description: 'Traffic without conversions is just noise. We design and optimize for one thing: turning visitors into customers.',
  },
  {
    id: 'fragmented',
    icon: LayoutGrid,
    color: 'purple',
    title: 'Fragmented Marketing',
    description: 'Juggling multiple agencies and tools that don\'t talk to each other? We unify your marketing under one roof.',
  },
  {
    id: 'tracking',
    icon: BarChart2,
    color: 'green',
    title: 'No ROI Tracking',
    description: 'Can\'t measure what\'s working? Our transparent analytics show exactly where every dollar goes and what it returns.',
  },
  {
    id: 'outdated',
    icon: Monitor,
    color: 'cyan',
    title: 'Outdated Websites',
    description: 'Your website should be your best salesperson. We build modern, fast, conversion-focused sites that work 24/7.',
  },
  {
    id: 'crm',
    icon: Database,
    color: 'pink',
    title: 'No CRM Integration',
    description: 'Leads slipping through the cracks? We set up and optimize your CRM so no opportunity is ever missed.',
  },
  {
    id: 'fatigue',
    icon: AlertTriangle,
    color: 'yellow',
    title: 'Ad Fatigue & Wasted Spend',
    description: 'Burning through ad budgets with diminishing returns? Our data-driven approach ensures every campaign stays fresh.',
  },
];

export default function ChallengesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1536px)': { slidesToScroll: 4 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] 2xl:flex-[0_0_calc(25%-15px)]"
              >
                <GlowCard
                  className="p-7 cursor-pointer h-full group hover:scale-[1.02] transition-transform duration-300"
                  data-testid={`card-challenge-${challenge.id}`}
                >
                  <div className="flex flex-col gap-5 h-full backdrop-blur-sm bg-black/20 p-6 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className={`challenge-icon-wrapper challenge-icon-${challenge.color} flex-shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight pt-0.5">{challenge.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">{challenge.description}</p>
                  </div>
                </GlowCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="neumorphic-button p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous challenges"
          data-testid="button-challenges-prev"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="neumorphic-button p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next challenges"
          data-testid="button-challenges-next"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}
