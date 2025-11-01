import { Link } from "wouter";

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
    <footer className="border-t border-border bg-card/50 relative z-10" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 w-fit">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 35 Q20 5, 35 35" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Digital marketing that doesn't suck. Data-driven campaigns that turn clicks into customers.
            </p>
            <p className="text-xs text-muted-foreground">
              Average response in &lt;24 business hours
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Services</h3>
            <ul className="space-y-3">
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
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-3">
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
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-3">
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

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Redline Design LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
