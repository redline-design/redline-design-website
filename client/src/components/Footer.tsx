import { Link } from "wouter";
import logoImage from "@assets/Asset 1_1762033090173.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Footer() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const services = [
    { href: "/services#seo", label: "SEO & SEM" },
    { href: "/services#ppc", label: "Paid Advertising" },
    { href: "/services#web", label: "Web Design" },
    { href: "/services#social", label: "Social Media" },
  ];

  const company = [
    { href: "/services", label: "What We Do" },
    { href: "/why-us", label: "Why Us?" },
    { href: "/#partners", label: "Our Partners" },
    { href: "/book-a-demo", label: "Book a Demo" },
  ];

  const policies = [
    { href: "/tos", label: "TOS" },
    { href: "/privacy", label: "Privacy" },
    { href: "/data-use", label: "Data Use" },
    { href: "/information-security", label: "Information Security" },
    { href: "/nda", label: "NDA" },
    { href: "/irp", label: "IRP" },
    { href: "/sda", label: "SDA" },
  ];

  return (
    <footer className="border-t border-white/10 bg-card/30 backdrop-blur-xl relative z-10" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 mb-1.5 cursor-pointer hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 w-fit">
                <img src={logoImage} alt="Redline Design" className="h-4 w-auto" />
              </div>
            </Link>
            <p className="text-xs text-muted-foreground mb-1">
              Digital marketing that doesn't suck.
            </p>
            <p className="text-xs text-muted-foreground mb-1.5">
              Average response in &lt;24 business hours
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=61573886695631"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/redlinedesignllc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate active-elevate-2 rounded px-2 py-1 -ml-2" data-testid="button-toggle-services">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Services</h3>
              <ChevronDown className={`h-3 w-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1">
              <ul className="space-y-0.5">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span
                        className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer block py-0.5"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={companyOpen} onOpenChange={setCompanyOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate active-elevate-2 rounded px-2 py-1 -ml-2" data-testid="button-toggle-company">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Company</h3>
              <ChevronDown className={`h-3 w-3 transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1">
              <ul className="space-y-0.5">
                {company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span
                        className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer block py-0.5"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={legalOpen} onOpenChange={setLegalOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate active-elevate-2 rounded px-2 py-1 -ml-2" data-testid="button-toggle-legal">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Legal</h3>
              <ChevronDown className={`h-3 w-3 transition-transform ${legalOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1">
              <ul className="space-y-0.5">
                {policies.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span
                        className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer block py-0.5"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Redline Design LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
