import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { BlogPost, InsertBlogPost, UpdateBlogPost, User, Review, InsertReview, PortfolioItem, InsertPortfolioItem, UpdatePortfolioItem, ContactSubmission } from "@shared/schema";
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
  Mail,
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
import { Switch } from "@/components/ui/switch";
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
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  hasWebsite: z.boolean().default(true),
});

type PortfolioFormData = z.infer<typeof portfolioFormSchema>;

const reviewFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(1, "Review content is required"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

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
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteReview, setDeleteReview] = useState<Review | null>(null);
  const [deleteContactSubmission, setDeleteContactSubmission] = useState<ContactSubmission | null>(null);
  
  // Collapsible section states (all collapsed by default)
  const [isEmployeeToolsOpen, setIsEmployeeToolsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isBlogPostsOpen, setIsBlogPostsOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isContactSubmissionsOpen, setIsContactSubmissionsOpen] = useState(false);

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

  const { data: portfolioItems = [], isLoading: isLoadingPortfolio } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
    enabled: isAuthenticated,
  });

  const { data: contactSubmissions = [], isLoading: isLoadingContactSubmissions } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact-submissions"],
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

  const deleteContactSubmissionMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/contact-submissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-submissions"] });
      toast({
        title: "Success",
        description: "Contact submission deleted",
      });
      setDeleteContactSubmission(null);
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
        description: "Failed to delete submission",
        variant: "destructive",
      });
    },
  });

  const updateContactStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/contact-submissions/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-submissions"] });
      toast({
        title: "Success",
        description: "Submission status updated",
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
        description: "Failed to update status",
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

  const createPortfolioMutation = useMutation({
    mutationFn: async (data: InsertPortfolioItem) => {
      return await apiRequest("POST", "/api/portfolio", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Portfolio item created successfully",
      });
      setIsPortfolioDialogOpen(false);
      setEditingPortfolioItem(null);
      portfolioForm.reset();
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
        description: "Failed to create portfolio item",
        variant: "destructive",
      });
    },
  });

  const updateDisplayOrderMutation = useMutation({
    mutationFn: async ({ id, displayOrder }: { id: string; displayOrder: number }) => {
      return await apiRequest("PATCH", `/api/portfolio/${id}/display-order`, { displayOrder });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Display order updated successfully",
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
        description: "Failed to update display order",
        variant: "destructive",
      });
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: InsertReview) => {
      return await apiRequest("POST", "/api/reviews", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Success",
        description: "Review created successfully",
      });
      setIsReviewDialogOpen(false);
      reviewForm.reset();
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
        description: "Failed to create review",
        variant: "destructive",
      });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertReview }) => {
      return await apiRequest("PATCH", `/api/reviews/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Success",
        description: "Review updated successfully",
      });
      setIsReviewDialogOpen(false);
      setEditingReview(null);
      reviewForm.reset();
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
        description: "Failed to update review",
        variant: "destructive",
      });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
      setDeleteReview(null);
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
        description: "Failed to delete review",
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
      hasWebsite: true,
    },
  });

  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      content: "",
    },
  });

  useEffect(() => {
    if (editingPortfolioItem) {
      portfolioForm.reset({
        title: editingPortfolioItem.title,
        url: editingPortfolioItem.url || "",
        description: editingPortfolioItem.description || "",
        category: editingPortfolioItem.category,
        hasWebsite: !!editingPortfolioItem.url,
      });
      setIsPortfolioDialogOpen(true);
    }
  }, [editingPortfolioItem]);

  useEffect(() => {
    if (editingReview) {
      reviewForm.reset({
        name: editingReview.name,
        role: editingReview.role || "",
        company: editingReview.company || "",
        content: editingReview.content,
      });
      setIsReviewDialogOpen(true);
    }
  }, [editingReview]);

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
        excerpt: post.excerpt || "",
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

  const handleOpenPortfolioDialog = (item?: PortfolioItem) => {
    if (item) {
      setEditingPortfolioItem(item);
      portfolioForm.reset({
        title: item.title,
        url: item.url || "",
        description: item.description || "",
        category: item.category,
        hasWebsite: !!item.url,
      });
    } else {
      setEditingPortfolioItem(null);
      portfolioForm.reset({
        title: "",
        url: "",
        description: "",
        category: "Web Design",
        hasWebsite: true,
      });
    }
    setIsPortfolioDialogOpen(true);
  };

  const onPortfolioSubmit = (data: PortfolioFormData) => {
    const portfolioData: InsertPortfolioItem = {
      title: data.title,
      url: data.hasWebsite && data.url ? data.url : null,
      description: data.description || null,
      category: data.category,
      screenshotUrl: null,
      logoUrl: null,
      featured: false,
      displayOrder: 0,
    };
    
    if (editingPortfolioItem) {
      updatePortfolioMutation.mutate({ 
        id: editingPortfolioItem.id, 
        data: portfolioData
      });
    } else {
      createPortfolioMutation.mutate(portfolioData);
    }
  };

  const handleOpenReviewDialog = (review?: Review) => {
    if (review) {
      setEditingReview(review);
      reviewForm.reset({
        name: review.name,
        role: review.role || "",
        company: review.company || "",
        content: review.content,
      });
    } else {
      setEditingReview(null);
      reviewForm.reset({
        name: "",
        role: "",
        company: "",
        content: "",
      });
    }
    setIsReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setIsReviewDialogOpen(false);
    setEditingReview(null);
    reviewForm.reset();
  };

  const onReviewSubmit = (data: ReviewFormData) => {
    const reviewData: InsertReview = {
      ...data,
      role: data.role || null,
      company: data.company || null,
      rating: 5,
      googleReviewId: null,
      profilePhotoUrl: null,
      reviewDate: null,
    };

    if (editingReview) {
      updateReviewMutation.mutate({ id: editingReview.id, data: reviewData });
    } else {
      createReviewMutation.mutate(reviewData);
    }
  };

  // PortfolioCard component
  const PortfolioCard = ({
    item,
    index,
    totalItems,
    onEdit,
    onDelete,
    onUploadScreenshot,
    onUploadLogo,
    onDisplayOrderChange,
    isUpdatingDisplayOrder,
    isUploadingScreenshot,
    isUploadingLogo,
  }: {
    item: PortfolioItem;
    index: number;
    totalItems: number;
    onEdit: () => void;
    onDelete: () => void;
    onUploadScreenshot: (file: File) => void;
    onUploadLogo: (file: File) => void;
    onDisplayOrderChange: (newOrder: number) => void;
    isUpdatingDisplayOrder: boolean;
    isUploadingScreenshot: boolean;
    isUploadingLogo: boolean;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        data-testid={`card-portfolio-${item.id}`}
      >
        <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg hover-elevate h-full">
          <div className="flex items-center justify-between p-4 border-b border-border/50 gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Display Order:</span>
              <Select
                value={item.displayOrder?.toString() || "0"}
                onValueChange={(value) => onDisplayOrderChange(parseInt(value))}
                disabled={isUpdatingDisplayOrder}
              >
                <SelectTrigger 
                  className="w-24" 
                  data-testid={`select-display-order-${item.id}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.max(totalItems, 20) }, (_, i) => i).map((order) => (
                    <SelectItem key={order} value={order.toString()}>
                      {order === 0 ? "0 (First)" : order}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="secondary">{item.category}</Badge>
          </div>
          
          <div className="aspect-video overflow-hidden bg-muted relative">
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
            <CardTitle className="text-lg line-clamp-2">
              {item.title}
            </CardTitle>
            {item.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {item.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.url!, '_blank')}
                    data-testid={`button-view-${item.id}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Site
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  data-testid={`button-edit-portfolio-${item.id}`}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onDelete}
                  data-testid={`button-delete-portfolio-${item.id}`}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor={`screenshot-upload-${item.id}`}>
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                    disabled={isUploadingScreenshot}
                    data-testid={`button-upload-screenshot-${item.id}`}
                  >
                    <span className="cursor-pointer">
                      {isUploadingScreenshot ? (
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
                      onUploadScreenshot(file);
                      e.target.value = '';
                    }
                  }}
                />
                
                <label htmlFor={`logo-upload-${item.id}`}>
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                    disabled={isUploadingLogo}
                    data-testid={`button-logo-${item.id}`}
                  >
                    <span className="cursor-pointer">
                      {isUploadingLogo ? (
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
                      onUploadLogo(file);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
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
                          Reviews
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Manage customer reviews and testimonials
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
                  <CardContent>
                    <div className="mb-6 flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {reviews.length} review{reviews.length !== 1 ? 's' : ''} total
                      </p>
                      <Button
                        onClick={() => handleOpenReviewDialog()}
                        data-testid="button-create-review"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Review
                      </Button>
                    </div>

                    {isLoadingReviews ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : reviews.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No reviews yet. Click "Create Review" to add your first review.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((review) => (
                          <div
                            key={review.id}
                            className="p-4 bg-background rounded-lg border border-border"
                            data-testid={`card-review-${review.id}`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">
                                  {review.name}
                                </p>
                                {review.role && (
                                  <p className="text-xs text-muted-foreground">
                                    {review.role}
                                    {review.company && ` at ${review.company}`}
                                  </p>
                                )}
                                <div className="flex gap-0.5 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 text-primary fill-primary"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                              {review.content}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenReviewDialog(review)}
                                data-testid={`button-edit-review-${review.id}`}
                              >
                                <Pencil className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteReview(review)}
                                data-testid={`button-delete-review-${review.id}`}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
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
                    <div className="mb-6">
                      <Button
                        onClick={() => handleOpenPortfolioDialog()}
                        data-testid="button-create-portfolio"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Portfolio Item
                      </Button>
                    </div>

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
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                  totalItems={portfolioItems.length}
                  onEdit={() => handleOpenPortfolioDialog(item)}
                  onDelete={() => setDeletePortfolioItem(item)}
                  onUploadScreenshot={(file) => uploadScreenshotMutation.mutate({ id: item.id, file })}
                  onUploadLogo={(file) => uploadLogoMutation.mutate({ id: item.id, file })}
                  onDisplayOrderChange={(newOrder) => updateDisplayOrderMutation.mutate({ id: item.id, displayOrder: newOrder })}
                  isUpdatingDisplayOrder={updateDisplayOrderMutation.isPending}
                  isUploadingScreenshot={uploadScreenshotMutation.isPending && uploadScreenshotMutation.variables?.id === item.id}
                  isUploadingLogo={uploadLogoMutation.isPending && uploadLogoMutation.variables?.id === item.id}
                />
              ))}
            </motion.div>
          )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          </motion.div>

          {/* Contact Submissions Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Collapsible open={isContactSubmissionsOpen} onOpenChange={setIsContactSubmissionsOpen}>
              <Card className="rounded-2xl backdrop-blur-md bg-card/40 border-border/50 shadow-lg">
                <CollapsibleTrigger className="w-full" data-testid="button-toggle-contact-submissions">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-left">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                          <Mail className="h-6 w-6 text-primary" />
                          Contact Submissions
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          View and manage lead inquiries from the contact form
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          isContactSubmissionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="mb-6 flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {contactSubmissions.length} submission{contactSubmissions.length !== 1 ? 's' : ''} total
                      </p>
                    </div>

                    {isLoadingContactSubmissions ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : contactSubmissions.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No contact submissions yet. Leads will appear here when people fill out the contact form.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {contactSubmissions.map((submission) => (
                          <Card key={submission.id} className="rounded-lg border border-border bg-background/50" data-testid={`card-submission-${submission.id}`}>
                            <CardContent className="p-6">
                              <div className="flex flex-col gap-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-foreground mb-1">{submission.name}</h3>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                      <p>Email: {submission.email}</p>
                                      <p>Phone: {submission.phone}</p>
                                      <p className="text-xs">Submitted: {format(new Date(submission.createdAt), 'MMM d, yyyy h:mm a')}</p>
                                    </div>
                                  </div>
                                  <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                                    {submission.status}
                                  </Badge>
                                </div>
                                
                                {submission.servicesInterested && submission.servicesInterested.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-foreground mb-2">Services Interested:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {submission.servicesInterested.map((service) => (
                                        <Badge key={service} variant="outline" className="text-xs">
                                          {service}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {submission.message && (
                                  <div>
                                    <p className="text-sm font-medium text-foreground mb-1">Message:</p>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                                  </div>
                                )}

                                {submission.smsConsent && (
                                  <div className="text-xs text-muted-foreground">
                                    ✓ Consented to SMS communications
                                  </div>
                                )}

                                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                                  {submission.status === 'new' ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateContactStatusMutation.mutate({ id: submission.id, status: 'responded' })}
                                      disabled={updateContactStatusMutation.isPending}
                                      data-testid={`button-mark-responded-${submission.id}`}
                                    >
                                      <CheckCircle2 className="h-4 w-4 mr-1" />
                                      Mark as Responded
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => updateContactStatusMutation.mutate({ id: submission.id, status: 'new' })}
                                      disabled={updateContactStatusMutation.isPending}
                                      data-testid={`button-mark-new-${submission.id}`}
                                    >
                                      Mark as New
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => setDeleteContactSubmission(submission)}
                                    data-testid={`button-delete-submission-${submission.id}`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
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
                name="hasWebsite"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Has Website URL</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Toggle off if you only want to upload an image and name
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="switch-portfolio-has-website"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {portfolioForm.watch("hasWebsite") && (
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
              )}

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

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={handleCloseReviewDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingReview ? "Edit Review" : "Create New Review"}
            </DialogTitle>
            <DialogDescription>
              {editingReview
                ? "Update the review details below."
                : "Add a new customer review. All reviews are 5-star ratings."}
            </DialogDescription>
          </DialogHeader>
          <Form {...reviewForm}>
            <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-4">
              <FormField
                control={reviewForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Customer name"
                        data-testid="input-review-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reviewForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title/Role (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., CEO, Manager, Owner"
                        data-testid="input-review-role"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reviewForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Company name"
                        data-testid="input-review-company"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reviewForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Content *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="What did the customer say about your service?"
                        rows={5}
                        data-testid="input-review-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  All reviews are automatically set to 5 stars
                </p>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseReviewDialog}
                  data-testid="button-cancel-review"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createReviewMutation.isPending || updateReviewMutation.isPending}
                  data-testid="button-save-review"
                >
                  {(createReviewMutation.isPending || updateReviewMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingReview ? "Save Changes" : "Create Review"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Review Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteReview}
        onOpenChange={(open) => !open && setDeleteReview(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the review from "{deleteReview?.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-review">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteReview && deleteReviewMutation.mutate(deleteReview.id)}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteReviewMutation.isPending}
              data-testid="button-confirm-delete-review"
            >
              {deleteReviewMutation.isPending ? (
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

      {/* Contact Submission Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteContactSubmission}
        onOpenChange={(open) => !open && setDeleteContactSubmission(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the contact submission from "{deleteContactSubmission?.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-submission">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteContactSubmission && deleteContactSubmissionMutation.mutate(deleteContactSubmission.id)}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteContactSubmissionMutation.isPending}
              data-testid="button-confirm-delete-submission"
            >
              {deleteContactSubmissionMutation.isPending ? (
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
