import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, DollarSign, Target, ArrowRight, Search, AlertCircle, CheckCircle2, AlertTriangle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SEOIssue {
  type: string;
  message: string;
  severity?: string;
  value?: string;
  count?: number;
}

interface SEOAnalysis {
  url: string;
  timestamp: string;
  score: number;
  issues: SEOIssue[];
  warnings: SEOIssue[];
  passed: SEOIssue[];
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    issues: number;
  };
  categoryScores?: {
    technical: number;
    content: number;
    mobile: number;
    performance: number;
  };
  performance?: {
    loadTime: number;
    score: number;
    recommendations: string[];
  };
  mobile?: {
    score: number;
    hasViewport: boolean;
    hasMediaQueries: boolean;
    hasFlexbox: boolean;
    hasGrid: boolean;
    recommendations: string[];
  };
}

export default function SEOPage() {
  const [url, setUrl] = useState("");
  const accentColor = "rgb(110, 231, 183)";

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/seo-checker", { url });
      return await response.json() as SEOAnalysis;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      analyzeMutation.mutate(url.trim());
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background/80 via-card/40 to-background/80 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-border">
                <Search className="w-12 h-12 md:w-16 md:h-16" style={{ color: accentColor }} />
              </div>
            </div>
            
            <Badge variant="secondary" className="mb-4">Join Waitlist</Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">SEO/SEM</h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Show up when customers are searching for you
            </p>
            
            <p className="text-lg text-foreground/80 mb-8">
              Get found everywhere, by everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" data-testid="link-hero-join-waitlist">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" data-testid="button-hero-join-waitlist">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/book-a-demo" data-testid="link-hero-book-demo">
                <Button size="lg" variant="outline" data-testid="button-hero-book-demo">Book a Demo</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Service Details */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">What You Get</h2>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Keyword research to find what your customers search",
                  "On-page optimization for better rankings",
                  "Content strategy that attracts organic traffic",
                  "Local SEO for Google Maps visibility",
                  "Monthly reports showing your progress"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`list-benefit-${index}`}>
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Perfect For</h3>
              </div>
              <p className="text-foreground">Businesses committed to long-term sustainable growth</p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Timeline</h3>
              </div>
              <p className="text-foreground">3-6 months to see significant results</p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Investment</h3>
              </div>
              <p className="text-2xl font-bold text-primary">Starting at $700/month</p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Free SEO Checker Tool - Integrated */}
      <div className="bg-card/40 backdrop-blur-sm border-y border-border py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Globe className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Try Our Free SEO Checker</h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Get an instant SEO analysis of your website. See how you stack up before committing to our services.
              </p>
            </div>

            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Enter Website URL</CardTitle>
                <CardDescription className="text-sm">
                  We'll analyze your page and provide actionable SEO recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                    data-testid="input-url"
                  />
                  <Button 
                    type="submit" 
                    disabled={analyzeMutation.isPending}
                    data-testid="button-analyze"
                  >
                    {analyzeMutation.isPending ? (
                      <>Analyzing...</>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {analyzeMutation.error && (
              <Card className="mb-4 border-destructive">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    <p data-testid="text-error">
                      {(analyzeMutation.error as any)?.message || "Failed to analyze URL"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {analyzeMutation.data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-3">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Overall SEO Score</CardTitle>
                        <CardDescription className="break-all text-xs">
                          {analyzeMutation.data.url}
                        </CardDescription>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getScoreColor(analyzeMutation.data.score)}`} data-testid="text-score">
                          {analyzeMutation.data.score}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getScoreLabel(analyzeMutation.data.score)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-2 bg-green-500/10 rounded-lg">
                        <div className="text-xl font-bold text-green-500" data-testid="text-passed-count">
                          {analyzeMutation.data.summary.passed}
                        </div>
                        <div className="text-xs text-muted-foreground">Passed</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-500/10 rounded-lg">
                        <div className="text-xl font-bold text-yellow-500" data-testid="text-warnings-count">
                          {analyzeMutation.data.summary.warnings}
                        </div>
                        <div className="text-xs text-muted-foreground">Warnings</div>
                      </div>
                      <div className="text-center p-2 bg-red-500/10 rounded-lg">
                        <div className="text-xl font-bold text-red-500" data-testid="text-issues-count">
                          {analyzeMutation.data.summary.issues}
                        </div>
                        <div className="text-xs text-muted-foreground">Issues</div>
                      </div>
                    </div>

                    {analyzeMutation.data.categoryScores && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Category Breakdown</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-card border rounded-lg">
                            <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.technical)}`} data-testid="text-category-technical">
                              {analyzeMutation.data.categoryScores.technical}
                            </div>
                            <div className="text-xs text-muted-foreground">Technical</div>
                          </div>
                          <div className="text-center p-2 bg-card border rounded-lg">
                            <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.content)}`} data-testid="text-category-content">
                              {analyzeMutation.data.categoryScores.content}
                            </div>
                            <div className="text-xs text-muted-foreground">Content</div>
                          </div>
                          <div className="text-center p-2 bg-card border rounded-lg">
                            <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.mobile)}`} data-testid="text-category-mobile">
                              {analyzeMutation.data.categoryScores.mobile}
                            </div>
                            <div className="text-xs text-muted-foreground">Mobile</div>
                          </div>
                          <div className="text-center p-2 bg-card border rounded-lg">
                            <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.performance)}`} data-testid="text-category-performance">
                              {analyzeMutation.data.categoryScores.performance}
                            </div>
                            <div className="text-xs text-muted-foreground">Performance</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {analyzeMutation.data.performance && (
                  <Card className="mb-3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Performance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs font-medium">Load Time: {analyzeMutation.data.performance.loadTime}ms</span>
                        <span className={`text-xs font-bold ${getScoreColor(analyzeMutation.data.performance.score)}`}>
                          Score: {analyzeMutation.data.performance.score}/100
                        </span>
                      </div>
                      {analyzeMutation.data.performance.recommendations.length > 0 && (
                        <ul className="space-y-1">
                          {analyzeMutation.data.performance.recommendations.map((rec, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0 text-yellow-500" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                )}

                {analyzeMutation.data.mobile && (
                  <Card className="mb-3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Mobile Responsiveness</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">Mobile Score:</span>
                        <span className={`text-xs font-bold ${getScoreColor(analyzeMutation.data.mobile.score)}`}>
                          {analyzeMutation.data.mobile.score}/100
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${analyzeMutation.data.mobile.hasViewport ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-xs">Viewport</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${analyzeMutation.data.mobile.hasMediaQueries ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="text-xs">Media Queries</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${analyzeMutation.data.mobile.hasFlexbox ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="text-xs">Flexbox</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${analyzeMutation.data.mobile.hasGrid ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="text-xs">Grid</span>
                        </div>
                      </div>
                      {analyzeMutation.data.mobile.recommendations.length > 0 && (
                        <ul className="space-y-1">
                          {analyzeMutation.data.mobile.recommendations.map((rec, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0 text-yellow-500" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                )}

                {analyzeMutation.data.issues.length > 0 && (
                  <Card className="mb-3 border-red-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-1.5 text-red-500 text-base">
                        <AlertCircle className="w-4 h-4" />
                        Critical Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        {analyzeMutation.data.issues.map((issue, index) => (
                          <div 
                            key={index} 
                            className="p-2 bg-red-500/10 rounded-lg"
                            data-testid={`text-issue-${index}`}
                          >
                            <p className="text-xs font-medium">{issue.message}</p>
                            {issue.value && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Current: {issue.value}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {analyzeMutation.data.warnings.length > 0 && (
                  <Card className="mb-3 border-yellow-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-1.5 text-yellow-500 text-base">
                        <AlertTriangle className="w-4 h-4" />
                        Warnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        {analyzeMutation.data.warnings.map((warning, index) => (
                          <div 
                            key={index} 
                            className="p-2 bg-yellow-500/10 rounded-lg"
                            data-testid={`text-warning-${index}`}
                          >
                            <p className="text-xs font-medium">{warning.message}</p>
                            {warning.value && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Current: {warning.value}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {analyzeMutation.data.passed.length > 0 && (
                  <Card className="border-green-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-1.5 text-green-500 text-base">
                        <CheckCircle2 className="w-4 h-4" />
                        Passed Checks
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        {analyzeMutation.data.passed.map((check, index) => (
                          <div 
                            key={index} 
                            className="p-2 bg-green-500/10 rounded-lg"
                            data-testid={`text-passed-${index}`}
                          >
                            <p className="text-xs font-medium">{check.message}</p>
                            {check.value && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {check.value}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                  <h3 className="text-base font-bold mb-1">Ready to dominate search results?</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Our SEO experts will fix these issues and boost your rankings in 3-6 months
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button asChild data-testid="button-seo-get-started">
                      <Link href="/contact" data-testid="link-seo-get-started">Get Started with SEO</Link>
                    </Button>
                    <Button asChild variant="outline" data-testid="button-seo-consultation">
                      <Link href="/contact" data-testid="link-seo-consultation">Get Free Consultation</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 text-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our waitlist and be the first to know when we open up spots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="link-cta-join-waitlist">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" data-testid="button-cta-join-waitlist">
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/" data-testid="link-cta-view-services">
              <Button size="lg" variant="outline" data-testid="button-cta-view-services">View All Services</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
