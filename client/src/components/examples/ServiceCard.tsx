import ServiceCard from '../ServiceCard'
import { Globe, TrendingUp, Search } from 'lucide-react'

export default function ServiceCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <ServiceCard
        icon={Globe}
        title="World-Class Websites"
        description="Custom Next.js sites that load fast, look premium, and convert."
        link="/services#web"
      />
      <ServiceCard
        icon={TrendingUp}
        title="Paid Advertising"
        description="Strategic media buying focused on ROAS—search, social, and retargeting."
        link="/services#ppc"
        delay={0.1}
      />
      <ServiceCard
        icon={Search}
        title="SEO/SEM"
        description="Technical, content, and authority work so you're found everywhere."
        link="/services#seo"
        delay={0.2}
      />
    </div>
  )
}
