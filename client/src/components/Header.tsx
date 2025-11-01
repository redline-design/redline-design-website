import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/generated_images/Redline_R_ribbon_logo_b3fc5c04.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/why-us", label: "Why Us" },
    { href: "/digital-marketing", label: "Articles" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-background/80 border-b border-border" : "bg-transparent"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 cursor-pointer">
              <img src={logoImage} alt="Redline Design" className="h-8 w-8 md:h-10 md:w-10" data-testid="img-logo" />
              <span className="text-lg md:text-xl font-bold text-foreground">Redline Design</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/book-a-demo">
              <Button variant="default" data-testid="button-book-demo">
                Book Free Consultation
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg" data-testid="nav-mobile">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`block px-3 py-2 rounded-md text-base font-medium hover-elevate active-elevate-2 cursor-pointer ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/book-a-demo">
              <Button
                variant="default"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-mobile-book-demo"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
