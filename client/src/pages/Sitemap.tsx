import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Home, Briefcase, Users, FolderOpen, BookOpen, Mail, 
  Globe, TrendingUp, Search, Database, BarChart3, Palette,
  MessageSquare, Bot, Code, FileText, Shield, Server
} from "lucide-react";

const sitemapData = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", path: "/", icon: Home },
      { name: "Services", path: "/services", icon: Briefcase },
      { name: "Why Choose Us", path: "/why-us", icon: Users },
      { name: "Our Work", path: "/our-work", icon: FolderOpen },
      { name: "Blog", path: "/blog", icon: BookOpen },
      { name: "Contact", path: "/contact", icon: Mail },
    ]
  },
  {
    title: "Services",
    links: [
      { name: "Websites", path: "/services/websites", icon: Globe },
      { name: "Paid Advertising", path: "/services/paid-advertising", icon: TrendingUp },
      { name: "SEO/SEM", path: "/services/seo", icon: Search },
      { name: "CRM", path: "/services/crm", icon: Database },
      { name: "Analytics", path: "/services/analytics", icon: BarChart3 },
      { name: "Design", path: "/services/design", icon: Palette },
      { name: "Social Media", path: "/services/social-media", icon: MessageSquare },
      { name: "Email Marketing", path: "/services/email-marketing", icon: Mail },
      { name: "AI & Automation", path: "/services/ai-automation", icon: Bot },
      { name: "App Development", path: "/services/app-development", icon: Code },
      { name: "Consulting", path: "/services/consulting", icon: Users },
      { name: "Managed IT", path: "/services/managed-it", icon: Server },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Digital Marketing Articles", path: "/digital-marketing", icon: BookOpen },
      { name: "Book a Demo", path: "/book-a-demo", icon: Mail },
      { name: "SEO Checker Tool", path: "/seo-checker", icon: Search },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", path: "/tos", icon: FileText },
      { name: "Privacy Policy", path: "/privacy", icon: Shield },
    ]
  }
];

export default function Sitemap() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Site<span className="text-primary">map</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find everything you need on our website
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sitemapData.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="space-y-4"
              data-testid={`sitemap-section-${section.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <h2 className="text-lg font-bold text-foreground border-b border-primary/30 pb-2">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link 
                      href={link.path}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-1 group cursor-pointer"
                      data-testid={`sitemap-link-${link.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for?{" "}
            <Link href="/contact">
              <span className="text-primary hover:underline cursor-pointer">Contact us</span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
