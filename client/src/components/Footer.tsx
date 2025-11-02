import { Link } from "wouter";
import logoImage from "@assets/Asset 1_1762033090173.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 mb-3 cursor-pointer hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 w-fit">
                <img src={logoImage} alt="Redline Design" className="h-5 w-auto" />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">
              Digital marketing that doesn't suck. Data-driven campaigns that turn clicks into customers.
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Average response in &lt;24 business hours
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61573886695631"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/redlinedesignllc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Services</h3>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Redline Design LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
