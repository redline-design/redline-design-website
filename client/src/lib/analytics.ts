/**
 * Google Analytics 4 event tracking utilities
 * Measurement ID: G-YR3YR7L7HE
 */

// Extend Window interface for gtag
declare global {
    interface Window {
          gtag?: (...args: any[]) => void;
          dataLayer?: any[];
    }
}

/**
 * Send a custom event to Google Analytics 4
 */
export function trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
  ) {
    if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", eventName, params);
    }
}

/**
 * Track contact form submission (conversion event)
 */
export function trackContactFormSubmission(services: string[]) {
    trackEvent("generate_lead", {
          event_category: "contact",
          event_label: "contact_form_submission",
          value: 1,
    });
    trackEvent("contact_form_submit", {
          form_name: "main_contact_form",
          services_selected: services.join(", ") || "none",
          services_count: services.length,
    });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
    ctaName: string,
    ctaLocation: string
  ) {
    trackEvent("cta_click", {
          event_category: "engagement",
          cta_name: ctaName,
          cta_location: ctaLocation,
    });
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick() {
    trackEvent("click_to_call", {
          event_category: "contact",
          event_label: "phone_click",
    });
}

/**
 * Track service interest selection in contact form
 */
export function trackServiceSelection(serviceId: string, selected: boolean) {
    trackEvent("service_interest", {
          event_category: "engagement",
          service_id: serviceId,
          action: selected ? "selected" : "deselected",
    });
}
