import { Link } from "wouter";
import logoImage from "@assets/Asset 1_1762033090173.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useState, memo } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SERVICES = [
  { href: "/services#seo", label: "SEO & SEM" },
  { href: "/services#ppc", label: "Paid Advertising" },
  { href: "/services#web", label: "Web Design" },
  { href: "/services#social", label: "Social Media" },
];

const COMPANY = [
  { href: "/services", label: "What We Do" },
  { href: "/why-us", label: "Why Us?" },
  { href: "/#partners", label: "Our Partners" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/book-a-demo", label: "Book a Demo" },
];

const POLICIES = [
  { href: "/tos", label: "TOS" },
  { href: "/privacy", label: "Privacy" },
  { href: "/data-use", label: "Data Use" },
  { href: "/information-security", label: "Information Security" },
  { href: "/nda", label: "NDA" },
  { href: "/irp", label: "IRP" },
  { href: "/sda", label: "SDA" },
];

const Footer = memo(function Footer() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-card/30 backdrop-blur-xl relative z-10" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="hover-elevate active-elevate-2 rounded-md p-2">
                <img src={logoImage} alt="Redline Design" loading="lazy" className="h-8 w-auto" />
              </div>
            </Link>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573886695631"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/redlinedesignllc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
              <CollapsibleTrigger className="flex items-center gap-1 hover-elevate active-elevate-2 rounded px-2 py-1" data-testid="button-toggle-services">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Services</h3>
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <ul className="space-y-1">
                  {SERVICES.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
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
              <CollapsibleTrigger className="flex items-center gap-1 hover-elevate active-elevate-2 rounded px-2 py-1" data-testid="button-toggle-company">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Company</h3>
                <ChevronDown className={`h-4 w-4 transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <ul className="space-y-1">
                  {COMPANY.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
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
              <CollapsibleTrigger className="flex items-center gap-1 hover-elevate active-elevate-2 rounded px-2 py-1" data-testid="button-toggle-legal">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Legal</h3>
                <ChevronDown className={`h-4 w-4 transition-transform ${legalOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <ul className="space-y-1">
                  {POLICIES.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
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
          </div>

          <p className="text-xs text-muted-foreground md:text-right mt-4 md:mt-0">
            © {new Date().getFullYear()} Redline Design LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
