import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ServiceWordSlider() {
  const prefersReducedMotion = useReducedMotion();

  const services = [
    "SEO",
    "PPC",
    "Web Design",
    "Social Media",
    "Email Marketing",
    "Content",
    "Analytics",
    "Conversion",
    "Brand Strategy",
    "Lead Generation",
    "CRM",
    "Consulting",
    "Google Ads",
    "Meta Ads",
    "ROI Tracking",
    "Marketing",
  ];

  const centerWord = "DIGITAL";

  if (prefersReducedMotion) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <h2 className="text-6xl md:text-8xl font-bold text-primary">
          {centerWord}
        </h2>
      </div>
    );
  }

  return (
    <div className="service-word-slider" data-testid="service-word-slider">
      {services.map((service, index) => (
        <div
          key={index}
          className="grid-item"
          data-index={index + 1}
        >
          {service}
        </div>
      ))}
      <div className="grid-item special">
        <b>{centerWord}</b>
      </div>
    </div>
  );
}
