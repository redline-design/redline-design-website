import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Search, Target, Share2, Mail, Monitor, Palette, FileText, Bot, Users, BarChart3, LucideIcon } from "lucide-react";

interface Service {
  id: string;
  name: string;
  icon: LucideIcon;
}

const services: Service[] = [
  { id: "seo", name: "SEO", icon: Search },
  { id: "ppc", name: "PPC", icon: Target },
  { id: "social-media", name: "Social Media Marketing", icon: Share2 },
  { id: "email-marketing", name: "Email Marketing", icon: Mail },
  { id: "web-design", name: "Website Design & Development", icon: Monitor },
  { id: "branding", name: "Branding & Design", icon: Palette },
  { id: "content-creation", name: "Content Creation", icon: FileText },
  { id: "ai-automation", name: "AI Automation", icon: Bot },
  { id: "crm-setup", name: "CRM Setup & Automation", icon: Users },
  { id: "analytics", name: "Analytics & Data Analysis", icon: BarChart3 },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    smsConsent: false,
    servicesInterested: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(serviceId)
        ? prev.servicesInterested.filter(id => id !== serviceId)
        : [...prev.servicesInterested, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Thank you! We'll get back to you within 24 business hours.");
    setFormData({ name: "", email: "", phone: "", message: "", smsConsent: false, servicesInterested: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="John Doe"
            data-testid="input-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="john@example.com"
            data-testid="input-email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          placeholder="(555) 123-4567"
          data-testid="input-phone"
        />
      </div>

      <div className="space-y-3">
        <Label>Services Interested In</Label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = formData.servicesInterested.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                className={`
                  flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-300
                  ${isSelected 
                    ? 'bg-green-500/10 border-green-500 text-green-500' 
                    : 'bg-muted/20 border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40'
                  }
                `}
                data-testid={`button-service-${service.id}`}
                title={service.name}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs text-center leading-tight">{service.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project..."
          rows={5}
          data-testid="input-message"
        />
      </div>

      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
        <Checkbox
          id="smsConsent"
          checked={formData.smsConsent}
          onCheckedChange={(checked) => setFormData({ ...formData, smsConsent: checked as boolean })}
          data-testid="checkbox-sms-consent"
        />
        <div className="text-sm text-muted-foreground">
          <Label htmlFor="smsConsent" className="font-normal">
            You agree to receive automated follow-up, reminder, and promotional messages at the phone number provided.
            Consent is not a condition of purchase. Reply STOP to end or HELP for help. Message and data rates may apply.
            View our{" "}
            <Link href="/tos">
              <span className="text-primary hover:underline">Terms of Service</span>
            </Link>{" "}
            and{" "}
            <Link href="/privacy">
              <span className="text-primary hover:underline">Privacy Policy</span>
            </Link>
            .
          </Label>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting} data-testid="button-submit-contact">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Average response in &lt;24 business hours
      </p>
    </form>
  );
}
