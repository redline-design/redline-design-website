import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScrollValue } from "@/hooks/use-scroll";
import redlineLogo from "@assets/RedlineLogoFull_1763765504169.png";

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
    { href: "/services/managed-it", label: "Managed IT" },
  ];

  const navLinks = [
    { href: "/why-us", label: "Why Us" },
    { href: "/blog", label: "Blog" },
  ];

  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid transparent",
      }}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ opacity: 0.8 }}
              data-testid="link-nav-home"
            >
              <img
                src={redlineLogo}
                alt="Redline Design"
                className="h-7 sm:h-8 w-auto"
              />
            </motion.div>
          </Link>

          <nav
            className="hidden md:flex items-center gap-1"
            data-testid="nav-desktop"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group flex items-center gap-1 ${
                    location.startsWith("/services") ? "text-red-500" : "text-white/70 hover:text-white"
                  }`}
                  data-testid="button-nav-services"
                >
                  Services
                  <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                </button>
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

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href ? "text-red-500" : "text-white/70 hover:text-white"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </div>
              </Link>
            ))}

            <Link href="/book-a-demo">
              <div
                className="ml-4 px-5 py-2 text-sm font-medium text-white rounded-full cursor-pointer flex items-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(145deg, #ff0000, #cc0000)",
                  boxShadow: "0 2px 10px rgba(255, 0, 0, 0.25)",
                }}
                data-testid="button-nav-get-started"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}
            data-testid="nav-mobile"
          >
            <div className="px-6 py-6 space-y-1">
              <Link href="/">
                <div
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location === "/" ? "text-red-500" : "text-white/70"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-home"
                >
                  Home
                </div>
              </Link>

              <div>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.startsWith("/services") ? "text-red-500" : "text-white/70"
                  }`}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  data-testid="button-mobile-services"
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 space-y-0.5 overflow-hidden"
                    >
                      {serviceLinks.map((service) => (
                        <Link key={service.href} href={service.href}>
                          <div
                            className="px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white transition-colors"
                            onClick={() => {
                              setServicesOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            data-testid={`link-mobile-service-${service.label.toLowerCase().replace(/\s/g, "-")}`}
                          >
                            {service.label}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location === link.href ? "text-red-500" : "text-white/70"
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
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-base font-medium text-white mt-4 cursor-pointer"
                  style={{
                    background: "linear-gradient(145deg, #ff0000, #cc0000)",
                    boxShadow: "0 2px 10px rgba(255, 0, 0, 0.25)",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-get-started"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
