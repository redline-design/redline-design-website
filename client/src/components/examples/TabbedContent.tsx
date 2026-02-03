import TabbedContent from '../TabbedContent'
import { BarChart3, Sparkles, Globe } from 'lucide-react'

export default function TabbedContentExample() {
  const tabs = [
    {
      id: 'results',
      label: 'Measurable Results',
      icon: BarChart3,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Data-Driven Results. Facts, Not Feelings.</h3>
          <p className="text-muted-foreground mb-4">
            Every campaign is tracked, measured, and optimized for maximum performance. We don't guess—we know what works.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">7x</div>
              <div className="text-sm text-muted-foreground">ROI</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">350%</div>
              <div className="text-sm text-muted-foreground">Traffic Growth</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Client Retention</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'roi',
      label: 'ROI That Stacks Up',
      icon: Sparkles,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Returns of 7x Your Investment</h3>
          <p className="text-muted-foreground mb-4">
            Our clients see an average return of 7x on their marketing spend. We focus on what matters: revenue growth and customer acquisition at scale.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Performance-based optimization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Real-time campaign adjustments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Transparent reporting and analytics</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'reach',
      label: "It's a Big World",
      icon: Globe,
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Cross-Platform Reach</h3>
          <p className="text-muted-foreground mb-4">
            From Google to Meta, TikTok to LinkedIn—we help you reach your audience wherever they are, with messaging that converts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {['Google Ads', 'Meta Ads', 'LinkedIn', 'TikTok', 'YouTube', 'Twitter', 'Reddit', 'Pinterest'].map((platform) => (
              <div key={platform} className="p-3 bg-card rounded-lg text-center text-sm font-medium">
                {platform}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <TabbedContent tabs={tabs} />
    </div>
  )
}
