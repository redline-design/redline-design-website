import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, AlertTriangle, Search, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

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

export default function SEOChecker() {
  const [url, setUrl] = useState("");

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Free SEO Checker</h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Get an instant SEO analysis of any website. Check title tags, meta descriptions, headings, images, and more.
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Enter Website URL</CardTitle>
              <CardDescription className="text-sm">
                We'll analyze the page and provide actionable SEO recommendations
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
            <Card className="mb-8 border-destructive">
              <CardContent className="pt-6">
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
                          <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.technical)}`}>
                            {analyzeMutation.data.categoryScores.technical}
                          </div>
                          <div className="text-xs text-muted-foreground">Technical</div>
                        </div>
                        <div className="text-center p-2 bg-card border rounded-lg">
                          <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.content)}`}>
                            {analyzeMutation.data.categoryScores.content}
                          </div>
                          <div className="text-xs text-muted-foreground">Content</div>
                        </div>
                        <div className="text-center p-2 bg-card border rounded-lg">
                          <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.mobile)}`}>
                            {analyzeMutation.data.categoryScores.mobile}
                          </div>
                          <div className="text-xs text-muted-foreground">Mobile</div>
                        </div>
                        <div className="text-center p-2 bg-card border rounded-lg">
                          <div className={`text-2xl font-bold ${getScoreColor(analyzeMutation.data.categoryScores.performance)}`}>
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
                          data-testid={`issue-${index}`}
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
                          data-testid={`warning-${index}`}
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
                          data-testid={`passed-${index}`}
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
                  <Button asChild data-testid="button-seo-service">
                    <Link href="/services/seo">View SEO Services</Link>
                  </Button>
                  <Button asChild variant="outline" data-testid="button-contact-cta">
                    <Link href="/contact">Get Free Consultation</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
