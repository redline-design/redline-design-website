import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScrollValue } from "@/hooks/use-scroll";

export default function Header() {
  const { isScrolled, showHeader } = useScrollValue(['isScrolled', 'showHeader']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative h-20 flex items-center justify-center">
          {/* Desktop Navigation - Centered pill */}
          <AnimatePresence>
            {showHeader && (
              <motion.nav 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:flex items-center gap-1 rounded-full px-4 py-2"
                style={{
                  background: "linear-gradient(145deg, rgba(18, 18, 18, 0.95), rgba(8, 8, 8, 0.95))",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(40, 40, 40, 0.1), 0 8px 20px rgba(0, 0, 0, 0.4)",
                  transform: "translateZ(0)",
                  willChange: "transform"
                }}
                data-testid="nav-desktop"
              >
            {/* Home Icon */}
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -2 }}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group rounded-lg ${
                  location === "/" ? "text-primary" : "text-foreground"
                }`}
                style={{
                  background: location === "/" 
                    ? "linear-gradient(145deg, rgba(255, 30, 30, 0.3), rgba(200, 0, 0, 0.2))"
                    : "linear-gradient(145deg, rgba(45, 45, 45, 0.9), rgba(25, 25, 25, 0.8))",
                  boxShadow: location === "/"
                    ? "inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -3px -3px 6px rgba(255, 0, 0, 0.15), 0 4px 12px rgba(255, 0, 0, 0.4), 0 0 20px rgba(255, 0, 0, 0.2)"
                    : "4px 4px 8px rgba(0, 0, 0, 0.6), -2px -2px 6px rgba(60, 60, 60, 0.3), inset 1px 1px 2px rgba(80, 80, 80, 0.2)",
                  border: location === "/"
                    ? "1px solid rgba(255, 0, 0, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.15)",
                  transform: "translateZ(0)"
                }}
                data-testid="link-nav-home"
              >
                <Home 
                  className="h-5 w-5" 
                  style={{ 
                    filter: location === "/" 
                      ? "drop-shadow(0 2px 6px rgba(255, 0, 0, 0.6))" 
                      : "drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1))" 
                  }}
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
                  whileHover={{ y: -2 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group rounded-lg flex items-center gap-1 ${
                    location.startsWith("/services") ? "text-primary" : "text-foreground"
                  }`}
                  style={{
                    background: location.startsWith("/services")
                      ? "linear-gradient(145deg, rgba(255, 30, 30, 0.3), rgba(200, 0, 0, 0.2))"
                      : "linear-gradient(145deg, rgba(45, 45, 45, 0.9), rgba(25, 25, 25, 0.8))",
                    boxShadow: location.startsWith("/services")
                      ? "inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -3px -3px 6px rgba(255, 0, 0, 0.15), 0 4px 12px rgba(255, 0, 0, 0.4), 0 0 20px rgba(255, 0, 0, 0.2)"
                      : "4px 4px 8px rgba(0, 0, 0, 0.6), -2px -2px 6px rgba(60, 60, 60, 0.3), inset 1px 1px 2px rgba(80, 80, 80, 0.2)",
                    border: location.startsWith("/services")
                      ? "1px solid rgba(255, 0, 0, 0.4)"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                    transform: "translateZ(0)"
                  }}
                  data-testid="button-nav-services"
                >
                  <span className="relative inline-block">
                    Services
                  </span>
                  <ChevronDown 
                    className="h-3 w-3 transition-transform group-hover:translate-y-0.5" 
                    style={{ 
                      filter: "drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1))" 
                    }}
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
                  whileHover={{ y: -2 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group rounded-lg ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                  style={{
                    background: location === link.href
                      ? "linear-gradient(145deg, rgba(255, 30, 30, 0.3), rgba(200, 0, 0, 0.2))"
                      : "linear-gradient(145deg, rgba(45, 45, 45, 0.9), rgba(25, 25, 25, 0.8))",
                    boxShadow: location === link.href
                      ? "inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -3px -3px 6px rgba(255, 0, 0, 0.15), 0 4px 12px rgba(255, 0, 0, 0.4), 0 0 20px rgba(255, 0, 0, 0.2)"
                      : "4px 4px 8px rgba(0, 0, 0, 0.6), -2px -2px 6px rgba(60, 60, 60, 0.3), inset 1px 1px 2px rgba(80, 80, 80, 0.2)",
                    border: location === link.href
                      ? "1px solid rgba(255, 0, 0, 0.4)"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                    transform: "translateZ(0)"
                  }}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <span className="relative inline-block">
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}
            
            {/* Get Started Button */}
            <Link href="/book-a-demo">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all ml-1 flex items-center gap-2"
                style={{
                  background: "linear-gradient(145deg, #ff3333, #dd0000)",
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.7), -3px -3px 8px rgba(255, 80, 80, 0.4), inset 0 2px 1px rgba(255, 255, 255, 0.3), inset 0 -2px 1px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 0, 0, 0.5)",
                  transform: "translateZ(0)",
                  border: "1.5px solid rgba(255, 50, 50, 0.6)"
                }}
                data-testid="button-nav-get-started"
              >
                <span style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)" }}>Get Started</span>
                <ArrowRight 
                  className="h-4 w-4" 
                  style={{ 
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))" 
                  }}
                />
              </motion.div>
            </Link>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Mobile Menu Button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-md transition-all duration-300"
              style={{
                background: "linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(15, 15, 15, 0.9))",
                boxShadow: isMobileMenuOpen
                  ? "inset 2px 2px 4px rgba(0, 0, 0, 0.5), inset -2px -2px 4px rgba(40, 40, 40, 0.1)"
                  : "3px 3px 6px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(40, 40, 40, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transform: "translateZ(0)"
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X 
                  className="h-6 w-6" 
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
                />
              ) : (
                <Menu 
                  className="h-6 w-6" 
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
                />
              )}
            </motion.button>
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
            className="md:hidden border-t border-border/50 overflow-hidden" 
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
            data-testid="nav-mobile"
          >
            <div className="px-6 py-6 space-y-2">
              {/* Home Link */}
              <Link href="/">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    location === "/" ? "text-primary" : "text-foreground"
                  }`}
                  style={{
                    background: location === "/"
                      ? "linear-gradient(145deg, rgba(255, 0, 0, 0.15), rgba(200, 0, 0, 0.1))"
                      : "linear-gradient(145deg, rgba(25, 25, 25, 0.6), rgba(15, 15, 15, 0.4))",
                    boxShadow: location === "/"
                      ? "inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 0, 0, 0.1), 0 2px 8px rgba(255, 0, 0, 0.2)"
                      : "2px 2px 4px rgba(0, 0, 0, 0.4), -1px -1px 3px rgba(40, 40, 40, 0.1)",
                    transform: "translateZ(0)"
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-home"
                >
                  <Home 
                    className="h-5 w-5" 
                    style={{ 
                      filter: location === "/" 
                        ? "drop-shadow(0 2px 4px rgba(255, 0, 0, 0.4))" 
                        : "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))" 
                    }}
                  />
                  <span>Home</span>
                </motion.div>
              </Link>
              
              {/* Services Expandable Menu */}
              <div>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    location.startsWith("/services") ? "text-primary" : "text-foreground"
                  }`}
                  style={{
                    background: location.startsWith("/services")
                      ? "linear-gradient(145deg, rgba(255, 0, 0, 0.15), rgba(200, 0, 0, 0.1))"
                      : "linear-gradient(145deg, rgba(25, 25, 25, 0.6), rgba(15, 15, 15, 0.4))",
                    boxShadow: location.startsWith("/services")
                      ? "inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 0, 0, 0.1), 0 2px 8px rgba(255, 0, 0, 0.2)"
                      : "2px 2px 4px rgba(0, 0, 0, 0.4), -1px -1px 3px rgba(40, 40, 40, 0.1)",
                    transform: "translateZ(0)"
                  }}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  data-testid="button-mobile-services"
                >
                  <span>Services</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))" }}
                  />
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
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 rounded-lg text-sm text-foreground transition-all duration-300"
                            style={{
                              background: "linear-gradient(145deg, rgba(20, 20, 20, 0.6), rgba(12, 12, 12, 0.4))",
                              boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(35, 35, 35, 0.1)",
                              transform: "translateZ(0)"
                            }}
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
                    whileTap={{ scale: 0.98 }}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      location === link.href ? "text-primary" : "text-foreground"
                    }`}
                    style={{
                      background: location === link.href
                        ? "linear-gradient(145deg, rgba(255, 0, 0, 0.15), rgba(200, 0, 0, 0.1))"
                        : "linear-gradient(145deg, rgba(25, 25, 25, 0.6), rgba(15, 15, 15, 0.4))",
                      boxShadow: location === link.href
                        ? "inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 0, 0, 0.1), 0 2px 8px rgba(255, 0, 0, 0.2)"
                        : "2px 2px 4px rgba(0, 0, 0, 0.4), -1px -1px 3px rgba(40, 40, 40, 0.1)",
                      transform: "translateZ(0)"
                    }}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-white mt-4 transition-all duration-300"
                  style={{
                    background: "linear-gradient(145deg, #ff1a1a, #cc0000)",
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.5), -2px -2px 4px rgba(255, 50, 50, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    transform: "translateZ(0)",
                    border: "1px solid rgba(255, 0, 0, 0.3)"
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-get-started"
                >
                  <span style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}>Get Started</span>
                  <ArrowRight 
                    className="h-5 w-5" 
                    style={{ 
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))" 
                    }}
                  />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
