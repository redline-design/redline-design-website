import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Asset 1_1762033090173.png";

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
    { href: "/services", label: "What We Do" },
    { href: "/why-us", label: "Why Us?" },
    { href: "/onboarding", label: "Client Onboarding" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/40 border-b border-white/20 shadow-lg transition-all duration-300"
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 md:h-20">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link href="/" data-testid="link-home">
              <div className="hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 cursor-pointer">
                <img src={logoImage} alt="Redline Design" className="h-12 md:h-14 w-auto" data-testid="img-logo" />
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center justify-center gap-8" data-testid="nav-desktop">
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

          {/* Right: Get Started Button */}
          <div className="flex justify-end items-center gap-4">
            <Link href="/book-a-demo" className="hidden md:block">
              <Button size="default" variant="default" className="button-recessed" data-testid="button-nav-get-started">
                Get Started
              </Button>
            </Link>
            
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
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-background/60 backdrop-blur-2xl" data-testid="nav-mobile">
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
              <div
                className="block px-3 py-2 rounded-md text-base font-medium hover-elevate active-elevate-2 cursor-pointer text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-get-started"
              >
                Get Started
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
