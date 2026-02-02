import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, TrendingUp, Sparkles, BookOpen, Zap } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { BlogPost as BlogPostType } from "@shared/schema";

const categoryBackgrounds: Record<string, string> = {
  "SEO & Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "Web Design": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  "Social Media": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  "PPC & Advertising": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  "Email Marketing": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
  "Content Strategy": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  "Analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "Branding": "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80",
  "default": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
};

function getBackgroundForCategory(category: string): string {
  return categoryBackgrounds[category] || categoryBackgrounds["default"];
}

interface BlogPostCardProps {
  post: BlogPostType;
  delay?: number;
  featured?: boolean;
}

function BlogPostCard({ post, delay = 0, featured = false }: BlogPostCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : "";

  const backgroundImage = post.imageUrl || getBackgroundForCategory(post.category);

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-full mb-8"
        data-testid={`blog-post-featured-${post.slug}`}
      >
        <Link href={`/blog/${post.slug}`}>
          <div className="group relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer blog-featured-glow">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/90 text-white border-0 backdrop-blur-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
                <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
                  {post.category}
                </Badge>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 mb-6 max-w-3xl line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-primary group-hover:translate-x-2 transition-transform duration-300">
                  <span className="font-semibold">Read Article</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="absolute top-6 right-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`blog-post-${post.slug}`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group relative h-[420px] rounded-2xl overflow-visible cursor-pointer blog-neumorphic-card">
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="mb-auto">
              <Badge 
                variant="secondary" 
                className="backdrop-blur-md bg-white/10 border-white/20 text-white/90 hover:bg-white/20"
              >
                {post.category}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-primary opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-xs font-semibold">Read</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/40">
            <ArrowRight className="h-4 w-4 text-white group-hover:text-primary transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-[500px] rounded-3xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[420px] rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-8">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          No articles yet
        </h3>
        <p className="text-lg text-muted-foreground mb-8">
          Fresh content is on its way. Check back soon for insights and strategies.
        </p>
        <Link href="/">
          <Button size="lg" className="font-semibold">
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
      
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Expert Insights</span>
          </div>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 max-w-4xl leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Digital Marketing{" "}
          <span className="text-primary relative">
            Insights
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Data-driven strategies, actionable tips, and industry trends to accelerate your business growth.
        </motion.p>
        
        <motion.div
          className="flex items-center gap-8 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Weekly Updates</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Actionable Tips</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>Expert Authors</span>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data: allPosts = [], isLoading } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog/posts"],
  });

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allPosts.map(post => post.category)));
    return ["All", ...uniqueCategories.sort()];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts;
    return allPosts.filter(post => post.category === selectedCategory);
  }, [allPosts, selectedCategory]);

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(post => post !== featuredPost);

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-8 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50" data-testid="section-blog-categories">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category ? "shadow-lg shadow-primary/25" : ""}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-blog-posts">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {featuredPost && (
                <BlogPostCard
                  post={featuredPost}
                  featured={true}
                  delay={0}
                />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8" data-testid="section-newsletter">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
            <div className="absolute inset-0 bg-card/95 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-primary/20 rounded-3xl" />
            
            <div className="relative p-12 md:p-16 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="h-9 w-9 text-primary" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Get exclusive insights, strategies, and the latest digital marketing trends delivered directly to your inbox.
              </p>
              
              <Link href="/book-a-demo">
                <Button 
                  size="lg" 
                  className="text-base px-8 py-6 font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300" 
                  data-testid="button-newsletter-subscribe"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
