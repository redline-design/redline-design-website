import ArticleCard from '../ArticleCard'

export default function ArticleCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ArticleCard
        title="The Complete Guide to SEO in 2025"
        excerpt="Learn the latest SEO strategies that actually work. From technical optimization to content marketing, we cover it all."
        category="SEO"
        readTime="8 min read"
        slug="complete-guide-seo-2025"
      />
      <ArticleCard
        title="How to Maximize Your PPC ROI"
        excerpt="Discover proven tactics to improve your paid advertising campaigns and get more bang for your buck."
        category="PPC"
        readTime="6 min read"
        slug="maximize-ppc-roi"
        delay={0.1}
      />
      <ArticleCard
        title="Building High-Converting Landing Pages"
        excerpt="The anatomy of landing pages that convert. Learn what works and what doesn't from real examples."
        category="Web Design"
        readTime="10 min read"
        slug="high-converting-landing-pages"
        delay={0.2}
      />
    </div>
  )
}
