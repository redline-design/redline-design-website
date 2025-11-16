import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { BlogPost as BlogPostType } from "@shared/schema";
import TextResolver from "@/components/TextResolver";

interface BlogPostCardProps {
  post: BlogPostType;
  delay?: number;
}

function BlogPostCard({ post, delay = 0 }: BlogPostCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      className={post.featured ? "md:col-span-2" : ""}
      data-testid={`blog-post-${post.slug}`}
    >
      <Card className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 shadow-2xl hover-elevate h-full group red-border-shimmer">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            {post.featured && (
              <Badge variant="default" className="bg-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <h3 className={`font-bold text-foreground mb-3 ${post.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {post.title}
          </h3>

          <p className={`text-foreground mb-6 ${post.featured ? "text-lg" : "text-base"}`}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="group-hover:text-primary transition-colors"
                data-testid={`button-read-${post.slug}`}
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-8 w-full mb-3" />
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-20 w-full mb-6" />
            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          No posts found
        </h3>
        <p className="text-lg text-muted-foreground mb-8">
          We couldn't find any blog posts in this category. Check back soon!
        </p>
      </motion.div>
    </div>
  );
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const queryKey = selectedCategory === "All" 
    ? ["/api/blog/posts"]
    : ["/api/blog/posts", { category: selectedCategory }];

  const { data: blogPosts = [], isLoading } = useQuery<BlogPostType[]>({
    queryKey,
  });

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
    return ["All", ...uniqueCategories.sort()];
  }, [blogPosts]);

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
            <TextResolver text="Latest Articles" delay={0} timeout={15} iterations={2} />
          </motion.h2>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8" data-testid="section-blog-categories">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="default"
                className={`font-semibold ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : ""
                }`}
                data-testid={`button-category-${category.toLowerCase().replace(/\s/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-blog-posts">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <LoadingSkeleton />
          ) : blogPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {blogPosts.map((post, index) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  delay={index * 0.05}
                />
              ))}
            </motion.div>
          )}
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
