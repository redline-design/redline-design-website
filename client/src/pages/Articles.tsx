import { useState } from "react";
import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", "SEO", "PPC", "Web Design", "Social Media", "Email Marketing"];

  const articles = [
    {
      title: "The Complete Guide to SEO in 2025",
      excerpt: "Learn the latest SEO strategies that actually work. From technical optimization to content marketing, we cover everything you need to rank higher and drive organic traffic.",
      category: "SEO",
      readTime: "8 min read",
      slug: "complete-guide-seo-2025",
    },
    {
      title: "How to Maximize Your PPC ROI",
      excerpt: "Discover proven tactics to improve your paid advertising campaigns and get more bang for your buck. Real strategies from campaigns generating 10x+ ROAS.",
      category: "PPC",
      readTime: "6 min read",
      slug: "maximize-ppc-roi",
    },
    {
      title: "Building High-Converting Landing Pages",
      excerpt: "The anatomy of landing pages that convert. Learn what works and what doesn't from real examples and case studies across industries.",
      category: "Web Design",
      readTime: "10 min read",
      slug: "high-converting-landing-pages",
    },
    {
      title: "Social Media Strategy for B2B Companies",
      excerpt: "Yes, social media works for B2B too. Here's how to build a presence that generates leads and builds authority in your industry.",
      category: "Social Media",
      readTime: "7 min read",
      slug: "social-media-b2b-strategy",
    },
    {
      title: "Email Marketing Automation That Actually Works",
      excerpt: "Stop sending one-off campaigns. Build automated email sequences that nurture leads and drive revenue on autopilot.",
      category: "Email Marketing",
      readTime: "9 min read",
      slug: "email-automation-guide",
    },
    {
      title: "Technical SEO: The Foundation of Rankings",
      excerpt: "Before you create content, make sure your technical foundation is solid. This guide covers everything from site speed to structured data.",
      category: "SEO",
      readTime: "12 min read",
      slug: "technical-seo-foundation",
    },
  ];

  const filteredArticles = selectedCategory && selectedCategory !== "All"
    ? articles.filter((article) => article.category === selectedCategory)
    : articles;

  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-articles-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Digital Marketing <span className="text-primary">Insights</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Practical tips, strategies, and tactics—no fluff, just actionable advice
          </motion.p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-articles-filter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (selectedCategory === null && category === "All") ? "default" : "outline"}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                readTime={article.readTime}
                slug={article.slug}
                delay={index * 0.1}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
