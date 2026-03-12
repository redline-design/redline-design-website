import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
        queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  const logout = async () => {
    await fetch("/api/logout", { credentials: "include" });
    queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    window.location.href = "/";
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
    logout,
  };
}
