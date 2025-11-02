import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/Asset 1_1762033090173.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/why-us", label: "Why Us" },
    { href: "/onboarding", label: "Onboarding" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <motion.div 
              className="hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2 cursor-pointer relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={logoImage} alt="Redline Design" className="h-10 md:h-12 w-auto" data-testid="img-logo" />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Expands to full width and height on scroll */}
          <motion.nav 
            className="hidden md:flex items-center gap-1 absolute justify-center"
            animate={{
              left: isScrolled ? "0%" : "50%",
              right: isScrolled ? "0%" : "auto",
              top: isScrolled ? "0%" : "50%",
              bottom: isScrolled ? "0%" : "auto",
              x: isScrolled ? "0%" : "-50%",
              y: isScrolled ? "0%" : "-50%",
              borderRadius: isScrolled ? "0px" : "9999px",
              paddingLeft: isScrolled ? "24px" : "16px",
              paddingRight: isScrolled ? "24px" : "16px",
              paddingTop: isScrolled ? "0px" : "8px",
              paddingBottom: isScrolled ? "0px" : "8px",
            }}
            style={{
              backgroundColor: "hsl(var(--background) / 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid hsl(var(--border) / 0.2)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            data-testid="nav-desktop"
          >
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer group rounded-lg ${
                    location === link.href ? "text-primary" : "text-foreground/80 hover:text-foreground"
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
          </motion.nav>

          {/* Right Side */}
          <div className="flex items-center gap-3 relative z-10">
            <Link href="/book-a-demo" className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  size="default" 
                  variant="default" 
                  className="button-recessed fill-on-hover font-medium" 
                  data-testid="button-nav-get-started"
                >
                  Get Started
                </Button>
              </motion.div>
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
              {navLinks.map((link, index) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block px-4 py-3 rounded-lg text-base font-medium hover-elevate active-elevate-2 cursor-pointer transition-colors ${
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
                  className="block px-4 py-3 rounded-lg text-base font-medium bg-primary/20 text-primary hover-elevate active-elevate-2 cursor-pointer mt-4"
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
