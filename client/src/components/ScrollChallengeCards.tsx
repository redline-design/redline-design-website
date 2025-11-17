import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Eye, MousePointerClick, LayoutGrid, BarChart2, Monitor, Database, AlertTriangle } from "lucide-react";

interface ChallengeCardData {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
}

const challenges: ChallengeCardData[] = [
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

interface ChallengeCardProps {
  challenge: ChallengeCardData;
  index: number;
  prefersReducedMotion: boolean;
}

function ChallengeCard({ challenge, index, prefersReducedMotion }: ChallengeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const Icon = challenge.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <Card
        className="h-full transition-all duration-300 rounded-2xl backdrop-blur-md bg-card/40 border-white/10 group hover-elevate active-elevate-2"
        data-testid={`card-challenge-${challenge.id}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className={`challenge-icon-wrapper challenge-icon-${challenge.color} flex-shrink-0`}>
                <Icon className="h-6 w-6" data-testid={`icon-challenge-${challenge.id}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight" data-testid={`text-challenge-title-${challenge.id}`}>
                {challenge.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-challenge-description-${challenge.id}`}>
              {challenge.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ScrollChallengeCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative" data-testid="container-challenge-cards">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, idx) => (
          <ChallengeCard 
            key={challenge.id}
            challenge={challenge}
            index={idx}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
