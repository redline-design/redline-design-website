import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagonalStripes from "@/components/DiagonalStripes";
import AnimatedBackground from "@/components/AnimatedBackground";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const WhyUs = lazy(() => import("@/pages/WhyUs"));
const BookDemo = lazy(() => import("@/pages/BookDemo"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const OurWork = lazy(() => import("@/pages/OurWork"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Articles = lazy(() => import("@/pages/Articles"));
const PolicyPage = lazy(() => import("@/pages/PolicyPage"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/why-us" component={WhyUs} />
      <Route path="/our-work" component={OurWork} />
      <Route path="/blog" component={Blog} />
      <Route path="/book-a-demo" component={BookDemo} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/digital-marketing" component={Articles} />
      <Route path="/admin" component={Admin} />
      
      <Route path="/tos">
        <PolicyPage
          title="Terms of Service"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing or using Redline Design LLC's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              <h2 className="text-2xl font-bold mb-4">2. Services</h2>
              <p className="mb-4">
                Redline Design LLC provides digital marketing services including but not limited to SEO, PPC, web design, social media marketing, and email marketing.
              </p>
              <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
              <p className="mb-4">
                Payment terms will be outlined in individual service agreements. Standard payment is due upon receipt of invoice unless otherwise agreed upon in writing.
              </p>
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                All materials created by Redline Design LLC remain our property until full payment is received. Upon payment, specified deliverables transfer to the client.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/privacy">
        <PolicyPage
          title="Privacy Policy"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, including name, email address, phone number, and any messages you send through our contact forms.
              </p>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
              </p>
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell your personal information. We may share information with service providers who assist us in operating our business.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/data-use">
        <PolicyPage
          title="Data Use Policy"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
              <p className="mb-4">
                We collect and process data to deliver effective digital marketing services to our clients.
              </p>
              <h2 className="text-2xl font-bold mb-4">Data Storage</h2>
              <p className="mb-4">
                All data is stored securely using industry-standard encryption and security measures.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/information-security">
        <PolicyPage
          title="Information Security Policy"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">Security Measures</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect the security of your personal information.
              </p>
              <h2 className="text-2xl font-bold mb-4">Data Breach Notification</h2>
              <p className="mb-4">
                In the event of a data breach, we will notify affected parties in accordance with applicable laws and regulations.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/nda">
        <PolicyPage
          title="Non-Disclosure Agreement"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">Confidential Information</h2>
              <p className="mb-4">
                Redline Design LLC agrees to keep all client information confidential and will not disclose any proprietary information to third parties.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/irp">
        <PolicyPage
          title="Incident Response Plan"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">Incident Management</h2>
              <p className="mb-4">
                Our incident response plan outlines procedures for identifying, responding to, and recovering from security incidents.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/sda">
        <PolicyPage
          title="Service Delivery Agreement"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h2 className="text-2xl font-bold mb-4">Service Commitments</h2>
              <p className="mb-4">
                Redline Design LLC commits to delivering services as outlined in individual client agreements, with response times of less than 24 business hours for most requests.
              </p>
            </div>
          }
        />
      </Route>

      <Route path="/blog/:slug" component={BlogPost} />

      <Route component={NotFound} />
    </Switch>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const checkMobile = () => {
      const viewportWidth = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      const isMobileDevice = viewportWidth < 768 || isMobileUA || (isTouchDevice && viewportWidth < 1024);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const updatePosition = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <ScrollProgressBar />
        <div className="flex flex-col min-h-screen relative">
          <AnimatedBackground />
          <DiagonalStripes />
          <Header />
          <main className="flex-1 relative z-10">
            <Suspense fallback={<LoadingFallback />}>
              <Router />
            </Suspense>
          </main>
          <Footer />
          <ChatWidget />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
