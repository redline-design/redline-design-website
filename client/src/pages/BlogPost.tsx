import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost as BlogPostType } from "@shared/schema";

function LoadingSkeleton() {
  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-8 w-32 mb-4" />
        </div>
        
        <Card className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="p-8 border-b border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-3/4" />
            
            <div className="flex items-center gap-6 mt-6 text-sm">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NotFoundMessage() {
  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-not-found-title">
            Blog Post Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-not-found-message">
            Sorry, we couldn't find the blog post you're looking for.
          </p>
          <Link href="/blog">
            <Button size="lg" data-testid="button-back-to-blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: ["/api/blog/posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!post || error) {
    return <NotFoundMessage />;
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 py-12" data-testid="page-blog-post">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 shadow-2xl red-border-shimmer">
            <CardHeader className="p-8 border-b border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" data-testid={`badge-category-${post.category.toLowerCase().replace(/\s/g, "-")}`}>
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="default" className="bg-primary" data-testid="badge-featured">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-post-title">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {post.publishedAt && (
                  <div className="flex items-center gap-2" data-testid="text-post-date">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                  </div>
                )}
                <div className="flex items-center gap-2" data-testid="text-post-read-time">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2" data-testid="text-post-author">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-p:text-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-foreground prose-ol:text-foreground
                  prose-li:text-foreground prose-li:marker:text-primary
                  prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary
                  prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="text-post-content"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Card className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-white/20 shadow-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Digital Marketing?
            </h2>
            <p className="text-lg text-foreground mb-6">
              Let's discuss how we can help your business grow online.
            </p>
            <Link href="/book-a-demo">
              <Button size="lg" className="text-base px-8 py-6 font-semibold" data-testid="button-book-demo">
                Book a Free Consultation
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
