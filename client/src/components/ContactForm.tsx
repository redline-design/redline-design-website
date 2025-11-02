import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    smsConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Thank you! We'll get back to you within 24 business hours.");
    setFormData({ name: "", email: "", phone: "", message: "", smsConsent: false });
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
