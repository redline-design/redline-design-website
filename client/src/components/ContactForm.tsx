import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Search, Target, Share2, Mail, Monitor, Palette, FileText, Bot, Users, BarChart3, LucideIcon, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Service {
  id: string;
  name: string;
  icon: LucideIcon;
}

const services: Service[] = [
  { id: "seo", name: "SEO", icon: Search },
  { id: "ppc", name: "PPC", icon: Target },
  { id: "social-media", name: "Social Media", icon: Share2 },
  { id: "email-marketing", name: "Email", icon: Mail },
  { id: "web-design", name: "Web Design", icon: Monitor },
  { id: "branding", name: "Branding", icon: Palette },
  { id: "content-creation", name: "Content", icon: FileText },
  { id: "ai-automation", name: "AI", icon: Bot },
  { id: "crm-setup", name: "CRM", icon: Users },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
];

interface ContactFormProps {
  preSelectedServices?: string[];
}

export default function ContactForm({ preSelectedServices = [] }: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    smsConsent: true,
    servicesInterested: preSelectedServices,
  });

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(serviceId)
        ? prev.servicesInterested.filter(id => id !== serviceId)
        : [...prev.servicesInterested, serviceId]
    }));
  };

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 business hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "", smsConsent: true, servicesInterested: [] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Name *"
          data-testid="input-name"
        />
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="Email *"
          data-testid="input-email"
        />
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          placeholder="Phone *"
          data-testid="input-phone"
        />
      </div>

      <div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = formData.servicesInterested.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-all duration-200"
                style={{
                  background: isSelected ? "rgba(255, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.03)",
                  border: isSelected ? "1px solid rgba(255, 0, 0, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                }}
                data-testid={`button-service-${service.id}`}
                title={service.name}
              >
                <Icon className="h-4 w-4" style={{ color: isSelected ? "#ff0000" : "rgba(255,255,255,0.4)" }} />
                <span className="text-[9px] leading-tight text-center" style={{ color: isSelected ? "#ff0000" : "rgba(255,255,255,0.35)" }}>{service.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Textarea
        id="message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Tell us about your project..."
        rows={2}
        data-testid="input-message"
      />

      <div className="flex items-center gap-2">
        <Checkbox
          id="smsConsent"
          checked={formData.smsConsent}
          onCheckedChange={(checked) => setFormData({ ...formData, smsConsent: checked as boolean })}
          className="h-3.5 w-3.5"
          data-testid="checkbox-sms-consent"
        />
        <Label htmlFor="smsConsent" className="font-normal text-[10px] text-white/30 leading-tight cursor-pointer">
          I agree to receive follow-up messages. Reply STOP to end. <Link href="/tos"><span className="text-red-500/50 hover:underline">Terms</span></Link> & <Link href="/privacy"><span className="text-red-500/50 hover:underline">Privacy</span></Link>
        </Label>
      </div>

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-2.5 text-sm font-medium text-black rounded-md cursor-pointer transition-all hover:scale-[1.03] nav-glow-btn disabled:opacity-50 disabled:hover:scale-100"
        style={{
          background: "linear-gradient(145deg, #ff0000, #cc0000)",
        }}
        data-testid="button-submit-contact"
      >
        {submitMutation.isPending ? "Sending..." : "Send Message"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
