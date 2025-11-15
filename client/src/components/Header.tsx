import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [location] = useLocation();
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return; // Skip if update already scheduled
      
      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        setIsScrolled(currentScrollY > 50);
        
        // Show nav when scrolling up, hide when scrolling down
        if (currentScrollY < 100) {
          // Always show when near top
          setShowNav(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowNav(true);
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down
          setShowNav(false);
        }
        
        setLastScrollY(currentScrollY);
        rafRef.current = undefined;
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [lastScrollY]);

  const serviceLinks = [
    { href: "/services/websites", label: "Websites" },
    { href: "/services/paid-advertising", label: "Paid Advertising" },
    { href: "/services/seo", label: "SEO/SEM" },
    { href: "/services/crm", label: "CRM & Automation" },
    { href: "/services/analytics", label: "Analytics" },
    { href: "/services/design", label: "Graphic Design" },
    { href: "/services/social-media", label: "Social Media" },
    { href: "/services/email-marketing", label: "Email Marketing" },
    { href: "/services/consulting", label: "Consulting" },
    { href: "/services/ai-automation", label: "AI Automation" },
    { href: "/services/app-development", label: "App Development" },
  ];

  const navLinks = [
    { href: "/why-us", label: "Why Us" },
    { href: "/our-work", label: "Our Work" },
    { href: "/blog", label: "Blog" },
  ];

  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative h-20 flex items-center justify-center">
          {/* Desktop Navigation - Centered pill */}
          <AnimatePresence>
            {showNav && (
              <motion.nav 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:flex items-center gap-1 rounded-full px-4 py-2"
                style={{
                  backgroundColor: "hsl(var(--background) / 0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid hsl(var(--border) / 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
                }}
                data-testid="nav-desktop"
              >
            {/* Home Icon */}
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors group rounded-lg ${
                  location === "/" ? "text-primary" : "text-foreground"
                }`}
                data-testid="link-nav-home"
              >
                <Home className="h-5 w-5" />
                <span 
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    location === "/" ? "w-6" : "w-0 group-hover:w-6"
                  }`}
                />
              </motion.div>
            </Link>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group rounded-lg flex items-center gap-1 ${
                    location.startsWith("/services") ? "text-primary" : "text-foreground"
                  }`}
                  data-testid="button-nav-services"
                >
                  Services
                  <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                  <span 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      location.startsWith("/services") ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {serviceLinks.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link href={service.href}>
                      <div className="w-full cursor-pointer" data-testid={`link-dropdown-${service.label.toLowerCase().replace(/\s/g, "-")}`}>
                        {service.label}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 + 0.2 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group rounded-lg ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      location === link.href ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </motion.div>
              </Link>
            ))}
            
            {/* Get Started Button */}
            <Link href="/book-a-demo">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover-elevate active-elevate-2 transition-all ml-1 primary-button-fill"
                data-testid="button-nav-get-started"
              >
                Get Started
              </motion.div>
            </Link>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Mobile Menu Button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden" 
            data-testid="nav-mobile"
          >
            <div className="px-6 py-6 space-y-2">
              {/* Home Link */}
              <Link href="/">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover-elevate active-elevate-2 transition-colors ${
                    location === "/" ? "text-primary bg-primary/10" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-home"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </motion.div>
              </Link>
              
              {/* Services Expandable Menu */}
              <div>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium hover-elevate active-elevate-2 transition-colors ${
                    location.startsWith("/services") ? "text-primary bg-primary/10" : "text-foreground"
                  }`}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  data-testid="button-mobile-services"
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </motion.button>
                
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 ml-4 space-y-1 overflow-hidden"
                    >
                      {serviceLinks.map((service, idx) => (
                        <Link key={service.href} href={service.href}>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="px-4 py-2 rounded-lg text-sm text-foreground hover-elevate active-elevate-2"
                            onClick={() => {
                              setServicesOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            data-testid={`link-mobile-service-${service.label.toLowerCase().replace(/\s/g, "-")}`}
                          >
                            {service.label}
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {navLinks.map((link, index) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 2) * 0.1 }}
                    className={`block px-4 py-3 rounded-lg text-base font-medium hover-elevate active-elevate-2 transition-colors ${
                      location === link.href ? "text-primary bg-primary/10" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <Link href="/book-a-demo">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="block px-4 py-3 rounded-lg text-base font-medium bg-primary text-white hover-elevate active-elevate-2 mt-4 primary-button-fill"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-get-started"
                >
                  Get Started
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
