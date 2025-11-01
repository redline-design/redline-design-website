import ValueTile from '../ValueTile'
import { TrendingUp, DollarSign, Zap, Target, Users, Briefcase } from 'lucide-react'

export default function ValueTileExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ValueTile
        icon={TrendingUp}
        title="Maximum ROI"
        description="We've seen returns up to 14x."
      />
      <ValueTile
        icon={DollarSign}
        title="Surprisingly Affordable"
        description="Plans start at $500/mo."
        delay={0.1}
      />
      <ValueTile
        icon={Zap}
        title="Quick Turnaround"
        description="Most updates in <24 business hours."
        delay={0.2}
      />
      <ValueTile
        icon={Target}
        title="Success Driven"
        description="We measure everything that matters."
        delay={0.3}
      />
      <ValueTile
        icon={Briefcase}
        title="Full Service"
        description="Web, CRM, creative—one team."
        delay={0.4}
      />
      <ValueTile
        icon={Users}
        title="Individual Focus"
        description="Personalized strategies for your business."
        delay={0.5}
      />
    </div>
  )
}
