import StatCounter from '../StatCounter'

export default function StatCounterExample() {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCounter value={7} suffix="x" label="Average ROI" />
      <StatCounter value={500} prefix="$" label="Starting Budget/mo" delay={0.1} />
      <StatCounter value={24} label="Response Hours" delay={0.2} />
      <StatCounter value={95} suffix="+" label="Client Satisfaction" delay={0.3} />
    </div>
  )
}
