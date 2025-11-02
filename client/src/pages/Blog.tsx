import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";

interface BlogPostProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  slug: string;
  featured?: boolean;
  delay?: number;
}

function BlogPost({ title, excerpt, category, readTime, date, slug, featured = false, delay = 0 }: BlogPostProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      className={featured ? "md:col-span-2" : ""}
      data-testid={`blog-post-${slug}`}
    >
      <Card className="rounded-2xl overflow-hidden backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl hover-elevate h-full group">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{category}</Badge>
            {featured && (
              <Badge variant="default" className="bg-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <h3 className={`font-bold text-foreground mb-3 ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {title}
          </h3>

          <p className={`text-foreground mb-6 ${featured ? "text-lg" : "text-base"}`}>
            {excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="group-hover:text-primary transition-colors"
              data-testid={`button-read-${slug}`}
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const blogPosts: BlogPostProps[] = [
  {
    title: "The Complete Guide to SEO in 2024: What's Changed and What Still Works",
    excerpt: "Search algorithms are constantly evolving. Learn the latest SEO strategies that are driving real results in 2024, from Core Web Vitals to AI-generated content considerations.",
    category: "SEO",
    readTime: "8 min read",
    date: "Oct 28, 2024",
    slug: "seo-guide-2024",
    featured: true,
  },
  {
    title: "5 PPC Mistakes That Are Wasting Your Ad Budget",
    excerpt: "Stop throwing money away on ineffective ads. Discover the most common PPC pitfalls and how to avoid them for better ROI.",
    category: "PPC",
    readTime: "6 min read",
    date: "Oct 25, 2024",
    slug: "ppc-mistakes",
  },
  {
    title: "How to Build a High-Converting Landing Page",
    excerpt: "Your landing page can make or break your campaign. Learn the psychology and design principles behind pages that convert visitors into customers.",
    category: "Web Design",
    readTime: "7 min read",
    date: "Oct 22, 2024",
    slug: "high-converting-landing-page",
  },
  {
    title: "Social Media Marketing: Platform-Specific Strategies That Work",
    excerpt: "One size doesn't fit all in social media. Get platform-specific tactics for Facebook, Instagram, LinkedIn, and TikTok.",
    category: "Social Media",
    readTime: "10 min read",
    date: "Oct 19, 2024",
    slug: "social-media-strategies",
  },
  {
    title: "Email Marketing Automation: Set It and Watch It Convert",
    excerpt: "Create automated email sequences that nurture leads and drive sales while you sleep. Complete with templates and best practices.",
    category: "Email Marketing",
    readTime: "9 min read",
    date: "Oct 15, 2024",
    slug: "email-automation",
  },
  {
    title: "Local SEO: How to Dominate Your Geographic Market",
    excerpt: "For local businesses, showing up in local search results is crucial. Master Google Business Profile optimization and local citation strategies.",
    category: "SEO",
    readTime: "7 min read",
    date: "Oct 12, 2024",
    slug: "local-seo-guide",
  },
  {
    title: "The ROI of Content Marketing: Measuring What Matters",
    excerpt: "Content marketing is a long game, but you need to track progress. Learn which metrics actually indicate success and how to measure them.",
    category: "Content Marketing",
    readTime: "8 min read",
    date: "Oct 8, 2024",
    slug: "content-marketing-roi",
  },
  {
    title: "Mobile-First Design: Why Your Website Must Adapt",
    excerpt: "With mobile traffic exceeding desktop, your website's mobile experience can't be an afterthought. Design principles for the mobile-first era.",
    category: "Web Design",
    readTime: "6 min read",
    date: "Oct 5, 2024",
    slug: "mobile-first-design",
  },
];

export default function Blog() {
  return (
    <div className="pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-blog-intro">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Digital Marketing <span className="text-primary">Insights & Strategies</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Expert advice, industry trends, and actionable strategies to grow your business online.
          </motion.p>
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.3em] red-glow-pulse"
            style={{ color: "#ff0000" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Latest Articles
          </motion.h2>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-blog-posts">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPost
                key={post.slug}
                {...post}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" data-testid="section-newsletter">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Never Miss an Update
            </h2>
            <p className="text-lg text-foreground mb-8">
              Get the latest digital marketing insights delivered straight to your inbox.
            </p>
            <Link href="/book-a-demo">
              <Button size="lg" className="text-base px-8 py-6 font-semibold" data-testid="button-newsletter-subscribe">
                Subscribe to Newsletter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
