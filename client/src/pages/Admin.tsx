import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { BlogPost, InsertBlogPost, UpdateBlogPost, User, Review, PortfolioItem, InsertPortfolioItem, UpdatePortfolioItem } from "@shared/schema";
import { insertBlogPostSchema, insertPortfolioItemSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Star,
  Upload,
  ChevronDown,
  ExternalLink,
  FileText,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const categories = [
  "SEO",
  "PPC",
  "Web Design",
  "Social Media",
  "Email Marketing",
  "Content Marketing",
];

const portfolioCategories = [
  "Photography",
  "E-commerce",
  "Automotive",
  "Healthcare",
  "Beauty & Wellness",
  "Professional Services",
  "Food & Beverage",
  "Technology",
  "Real Estate",
  "Education",
];

const formSchema = insertBlogPostSchema.omit({
  publishedAt: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().nullable().transform(val => val ?? ""),
  readTime: z.string().min(1, "Read time is required"),
});

type FormData = z.infer<typeof formSchema>;

const portfolioFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

type PortfolioFormData = z.infer<typeof portfolioFormSchema>;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Admin() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null);
  const [isPortfolioDialogOpen, setIsPortfolioDialogOpen] = useState(false);
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
  const [deletePortfolioItem, setDeletePortfolioItem] = useState<PortfolioItem | null>(null);
  
  // Collapsible section states (all collapsed by default)
  const [isEmployeeToolsOpen, setIsEmployeeToolsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isBlogPostsOpen, setIsBlogPostsOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: blogPosts = [], isLoading: isLoadingPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts", "includeUnpublished"],
    queryFn: async () => {
      const response = await fetch("/api/blog/posts?includeUnpublished=true");
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      return response.json();
    },
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: reviews = [], isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
    enabled: isAuthenticated,
  });

  const syncReviewsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/reviews/sync");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Success",
        description: data.message || "Reviews synced successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to sync reviews",
        variant: "destructive",
      });
    },
  });

  const { data: portfolioItems = [], isLoading: isLoadingPortfolio } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
    enabled: isAuthenticated,
  });

  const deletePortfolioMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/portfolio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      });
      setDeletePortfolioItem(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      });
    },
  });

  const captureScreenshotMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("POST", `/api/portfolio/${id}/screenshot`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Screenshot captured successfully",
      });
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error?.details || "Failed to capture screenshot. Make sure SCREENSHOTONE_API_KEY is configured.",
        variant: "destructive",
      });
    },
  });

  const uploadLogoMutation = useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }) => {
      const formData = new FormData();
      formData.append('logo', file);
      
      const response = await fetch(`/api/portfolio/${id}/upload-logo`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload logo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to upload logo",
        variant: "destructive",
      });
    },
  });

  const uploadScreenshotMutation = useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }) => {
      const formData = new FormData();
      formData.append('screenshot', file);
      
      const response = await fetch(`/api/portfolio/${id}/upload-screenshot`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload screenshot');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Screenshot uploaded successfully",
      });
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to upload screenshot",
        variant: "destructive",
      });
    },
  });

  const updatePortfolioMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePortfolioItem }) => {
      return await apiRequest("PATCH", `/api/portfolio/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Portfolio item updated successfully",
      });
      setIsPortfolioDialogOpen(false);
      setEditingPortfolioItem(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update portfolio item",
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      readTime: "",
      featured: false,
      published: false,
    },
  });

  const portfolioForm = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    if (editingPortfolioItem) {
      portfolioForm.reset({
        title: editingPortfolioItem.title,
        url: editingPortfolioItem.url,
        description: editingPortfolioItem.description || "",
        category: editingPortfolioItem.category,
      });
      setIsPortfolioDialogOpen(true);
    }
  }, [editingPortfolioItem]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return await apiRequest("POST", "/api/blog/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBlogPost }) => {
      return await apiRequest("PUT", `/api/blog/posts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setIsDialogOpen(false);
      setEditingPost(null);
      form.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/blog/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      setDeletePost(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author || "",
        readTime: post.readTime,
        featured: post.featured,
        published: post.published,
      });
    } else {
      setEditingPost(null);
      const userName = user?.firstName
        ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
        : "";
      form.reset({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        author: userName,
        readTime: "",
        featured: false,
        published: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
    form.reset();
  };

  const onSubmit = (data: FormData) => {
    let publishedAt: Date | null = null;
    
    if (data.published) {
      // If publishing, preserve existing publishedAt or set to now
      publishedAt = editingPost?.publishedAt ? new Date(editingPost.publishedAt) : new Date();
    }
    
    const postData: InsertBlogPost = {
      ...data,
      publishedAt,
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: postData });
    } else {
      createMutation.mutate(postData);
    }
  };

  const handleTitleChange = (value: string) => {
    form.setValue("title", value);
    if (!editingPost && !form.getValues("slug")) {
      form.setValue("slug", generateSlug(value));
    }
  };

  const handleClosePortfolioDialog = () => {
    setIsPortfolioDialogOpen(false);
    setEditingPortfolioItem(null);
    portfolioForm.reset();
  };

  const onPortfolioSubmit = (data: PortfolioFormData) => {
    if (editingPortfolioItem) {
      updatePortfolioMutation.mutate({ 
        id: editingPortfolioItem.id, 
        data: {
          ...data,
          description: data.description || null,
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-12 px-4 sm:px-6 lg:px-8" data-testid="section-admin">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <h1 className="text-4xl md:text-5xl font-black text-foreground">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <Button
                onClick={() => handleOpenDialog()}
                size="lg"
                data-testid="button-create-post"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Post
              </Button>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your blog posts and content
            </p>
          </motion.div>

          {/* Employee Tools Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Collapsible open={isEmployeeToolsOpen} onOpenChange={setIsEmployeeToolsOpen}>
              <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg">
                <CollapsibleTrigger className="w-full" data-testid="button-toggle-employee-tools">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <ExternalLink className="h-6 w-6 text-primary" />
                        Employee Tools
                      </CardTitle>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          isEmployeeToolsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-6 rounded-lg border border-border bg-background hover-elevate" data-testid="card-hosting-link">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <ExternalLink className="h-5 w-5" />
                            Website Hosting
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Manage client website hosting subscriptions
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open("https://buy.stripe.com/7sY5kD3F26iL3jfeImgbm00", "_blank")}
                          data-testid="button-hosting-link"
                        >
                          Open Subscription Link
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      <div className="p-6 rounded-lg border border-border bg-background hover-elevate" data-testid="card-seo-tool">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <ExternalLink className="h-5 w-5" />
                            Redline Ascend SEO
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Access the SEO analysis and optimization tool
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open("https://redline-ascend-seo-redline6.replit.app", "_blank")}
                          data-testid="button-seo-tool"
                        >
                          Open SEO Tool
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      <div className="p-6 rounded-lg border border-border bg-background hover-elevate" data-testid="card-onboarding">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <ExternalLink className="h-5 w-5" />
                            Client Onboarding
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Access the client onboarding system
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open("https://onboard-redline6.replit.app", "_blank")}
                          data-testid="button-onboarding"
                        >
                          Open Onboarding
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </motion.div>

          {/* Reviews Management Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Collapsible open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
              <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg">
                <CollapsibleTrigger className="w-full" data-testid="button-toggle-reviews">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-left">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                          <Star className="h-6 w-6 text-primary" />
                          Google Reviews
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sync 5-star reviews from Google Business Profile
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          isReviewsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardHeader className="pt-0">
                    <div className="flex justify-end">
                      <Button
                        onClick={() => syncReviewsMutation.mutate()}
                        disabled={syncReviewsMutation.isPending}
                        data-testid="button-sync-reviews"
                      >
                        {syncReviewsMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Reviews
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
              <CardContent>
                {isLoadingReviews ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No reviews synced yet. Click "Sync Reviews" to fetch 5-star reviews from Google.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-foreground">
                      {reviews.length} review{reviews.length !== 1 ? 's' : ''} synced
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {reviews.slice(0, 6).map((review) => (
                        <div
                          key={review.id}
                          className="p-4 bg-background rounded-lg border border-border"
                          data-testid={`review-${review.id}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {review.profilePhotoUrl ? (
                              <img
                                src={review.profilePhotoUrl}
                                alt={review.name}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">
                                  {review.name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {review.name}
                              </p>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-3 w-3 text-primary fill-primary"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-3">
                            {review.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </motion.div>

          {/* Blog Posts Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Collapsible open={isBlogPostsOpen} onOpenChange={setIsBlogPostsOpen}>
              <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg">
                <CollapsibleTrigger className="w-full" data-testid="button-toggle-blog-posts">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        Blog Posts
                      </CardTitle>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          isBlogPostsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>

          {isLoadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="rounded-2xl">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="rounded-2xl text-center py-16">
                <CardContent>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    No blog posts yet
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Get started by creating your first blog post
                  </p>
                  <Button onClick={() => handleOpenDialog()} data-testid="button-create-first-post">
                    <Plus className="mr-2 h-5 w-5" />
                    Create New Post
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  data-testid={`card-post-${post.id}`}
                >
                  <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg hover-elevate h-full">
                    <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          {post.published ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <XCircle className="h-3 w-3 mr-1" />
                              Draft
                            </Badge>
                          )}
                          {post.featured && (
                            <Badge variant="default" className="bg-primary">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(new Date(post.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(post)}
                          data-testid={`button-edit-${post.id}`}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeletePost(post)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-delete-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          </motion.div>

          {/* Portfolio Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Collapsible open={isPortfolioOpen} onOpenChange={setIsPortfolioOpen}>
              <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg">
                <CollapsibleTrigger className="w-full" data-testid="button-toggle-portfolio">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                        Portfolio Items
                      </CardTitle>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          isPortfolioOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>

          {isLoadingPortfolio ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="rounded-2xl">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full mb-4" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : portfolioItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="rounded-2xl text-center py-16">
                <CardContent>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    No portfolio items yet
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Portfolio items will appear here
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  data-testid={`card-portfolio-${item.id}`}
                >
                  <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg hover-elevate h-full">
                    <div className="aspect-video overflow-hidden rounded-t-2xl bg-muted relative">
                      {item.screenshotUrl ? (
                        <img
                          src={item.screenshotUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No screenshot
                        </div>
                      )}
                      {item.logoUrl && (
                        <div className="absolute top-2 left-2 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-lg">
                          <img
                            src={item.logoUrl}
                            alt={`${item.title} logo`}
                            className="h-8 w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg line-clamp-2">
                          {item.title}
                        </CardTitle>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.url, '_blank')}
                            data-testid={`button-view-${item.id}`}
                          >
                            View Site
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPortfolioItem(item)}
                            data-testid={`button-edit-portfolio-${item.id}`}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeletePortfolioItem(item)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-portfolio-${item.id}`}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => captureScreenshotMutation.mutate(item.id)}
                            disabled={captureScreenshotMutation.isPending}
                            data-testid={`button-screenshot-${item.id}`}
                          >
                            {captureScreenshotMutation.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                Capturing...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Auto Screenshot
                              </>
                            )}
                          </Button>
                          <label htmlFor={`screenshot-upload-${item.id}`}>
                            <Button
                              variant="secondary"
                              size="sm"
                              asChild
                              disabled={uploadScreenshotMutation.isPending}
                              data-testid={`button-upload-screenshot-${item.id}`}
                            >
                              <span className="cursor-pointer">
                                {uploadScreenshotMutation.isPending ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="h-4 w-4 mr-1" />
                                    Upload Screenshot
                                  </>
                                )}
                              </span>
                            </Button>
                          </label>
                          <input
                            id={`screenshot-upload-${item.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                uploadScreenshotMutation.mutate({ id: item.id, file });
                                e.target.value = '';
                              }
                            }}
                          />
                          <label htmlFor={`logo-upload-${item.id}`}>
                            <Button
                              variant="secondary"
                              size="sm"
                              asChild
                              disabled={uploadLogoMutation.isPending}
                              data-testid={`button-logo-${item.id}`}
                            >
                              <span className="cursor-pointer">
                                {uploadLogoMutation.isPending ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="h-4 w-4 mr-1" />
                                    Upload Logo
                                  </>
                                )}
                              </span>
                            </Button>
                          </label>
                          <input
                            id={`logo-upload-${item.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                uploadLogoMutation.mutate({ id: item.id, file });
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          </motion.div>
        </div>
      </section>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {editingPost
                ? "Make changes to your blog post"
                : "Fill in the details to create a new blog post"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter blog post title"
                        data-testid="input-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="blog-post-slug"
                        data-testid="input-slug"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Brief summary of the blog post"
                        rows={3}
                        data-testid="input-excerpt"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Full blog post content"
                        rows={10}
                        data-testid="input-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 8 min read"
                          data-testid="input-read-time"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Author name"
                        data-testid="input-author"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap items-center gap-6">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-featured"
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer">Featured</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-published"
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer">Published</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-submit"
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : editingPost ? (
                    "Update Post"
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Portfolio Edit Dialog */}
      <Dialog open={isPortfolioDialogOpen} onOpenChange={handleClosePortfolioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
            <DialogDescription>
              Update the details for this portfolio item. You can also capture a screenshot or upload a logo using the buttons below.
            </DialogDescription>
          </DialogHeader>

          <Form {...portfolioForm}>
            <form onSubmit={portfolioForm.handleSubmit(onPortfolioSubmit)} className="space-y-6">
              <FormField
                control={portfolioForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter client name"
                        data-testid="input-portfolio-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={portfolioForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com"
                        data-testid="input-portfolio-url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={portfolioForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-portfolio-category">
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {portfolioCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={portfolioForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Brief description of the project"
                        rows={3}
                        data-testid="input-portfolio-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClosePortfolioDialog}
                  data-testid="button-cancel-portfolio-edit"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updatePortfolioMutation.isPending}
                  data-testid="button-save-portfolio"
                >
                  {updatePortfolioMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletePost}
        onOpenChange={(open) => !open && setDeletePost(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post "{deletePost?.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePost && deleteMutation.mutate(deletePost.id)}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Portfolio Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletePortfolioItem}
        onOpenChange={(open) => !open && setDeletePortfolioItem(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the portfolio item "{deletePortfolioItem?.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-portfolio">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePortfolioItem && deletePortfolioMutation.mutate(deletePortfolioItem.id)}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deletePortfolioMutation.isPending}
              data-testid="button-confirm-delete-portfolio"
            >
              {deletePortfolioMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
