import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  slug: string;
  delay?: number;
}

const ArticleCard = memo(function ArticleCard({ title, excerpt, category, readTime, slug, delay = 0 }: ArticleCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={`/digital-marketing/${slug}`}>
        <Card
          className="h-full hover-elevate active-elevate-2 transition-all duration-300 backdrop-blur-md bg-card/40 border-white/10 card-float"
          data-testid={`card-article-${slug}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" data-testid={`badge-category-${category.toLowerCase()}`}>
                {category}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-foreground">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2" data-testid={`text-article-title-${slug}`}>
              {title}
            </h3>
            <p className="text-foreground line-clamp-3" data-testid={`text-article-excerpt-${slug}`}>
              {excerpt}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
});

export default ArticleCard;
