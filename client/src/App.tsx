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
const Contact = lazy(() => import("@/pages/Contact"));
const WebsitesPage = lazy(() => import("@/pages/services/websites"));
const PaidAdvertisingPage = lazy(() => import("@/pages/services/paid-advertising"));
const SEOPage = lazy(() => import("@/pages/services/seo"));
const CRMPage = lazy(() => import("@/pages/services/crm"));
const AnalyticsPage = lazy(() => import("@/pages/services/analytics"));
const DesignPage = lazy(() => import("@/pages/services/design"));
const SocialMediaPage = lazy(() => import("@/pages/services/social-media"));
const EmailMarketingPage = lazy(() => import("@/pages/services/email-marketing"));
const ConsultingPage = lazy(() => import("@/pages/services/consulting"));
const AIAutomationPage = lazy(() => import("@/pages/services/ai-automation"));
const AppDevelopmentPage = lazy(() => import("@/pages/services/app-development"));
const SEOChecker = lazy(() => import("@/pages/SEOChecker"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/websites" component={WebsitesPage} />
      <Route path="/services/paid-advertising" component={PaidAdvertisingPage} />
      <Route path="/services/seo" component={SEOPage} />
      <Route path="/services/crm" component={CRMPage} />
      <Route path="/services/analytics" component={AnalyticsPage} />
      <Route path="/services/design" component={DesignPage} />
      <Route path="/services/social-media" component={SocialMediaPage} />
      <Route path="/services/email-marketing" component={EmailMarketingPage} />
      <Route path="/services/consulting" component={ConsultingPage} />
      <Route path="/services/ai-automation" component={AIAutomationPage} />
      <Route path="/services/app-development" component={AppDevelopmentPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/seo-checker" component={SEOChecker} />
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
              
              <h2 className="text-2xl font-bold mb-4">1. Introduction & Purpose</h2>
              <p className="mb-4">
                Redline Design is committed to the ethical, lawful, and transparent use of all data it collects, processes, and stores, particularly personal data. We recognize the profound responsibility that comes with handling personal information and are dedicated to upholding the privacy rights of individuals.
              </p>
              <p className="mb-4">
                Compliance with evolving data protection regulations like the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act/California Privacy Rights Act (CCPA/CPRA) is a legal imperative and a cornerstone of building client and consumer trust.
              </p>
              <p className="mb-4">
                The purpose of this Data Use Policy is to ensure that all personal data handled by Redline Design is done in strict accordance with applicable data protection laws, industry best practices, and the principles outlined herein. The scope of this Policy applies to all personal data processed by Redline Design, its employees, contractors, and any third parties acting on its behalf.
              </p>

              <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person ('Data Subject'), such as a name, an identification number, location data, or an online identifier.</li>
                <li><strong>Sensitive Personal Information:</strong> Personal Data revealing racial or ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric data, health data, or data concerning a person's sex life or sexual orientation. Redline Design generally does not process this data unless explicitly required and legally protected.</li>
                <li><strong>Processing:</strong> Any operation performed on Personal Data, such as collection, recording, storage, use, disclosure, or destruction.</li>
                <li><strong>Data Subject:</strong> The individual to whom Personal Data relates.</li>
                <li><strong>Controller:</strong> The entity that determines the purposes and means of processing Personal Data. Redline Design is a Controller for its own data and typically a Processor for client data.</li>
                <li><strong>Processor:</strong> An entity that processes Personal Data on behalf of a Controller.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">3. Principles of Data Processing</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Lawfulness, Fairness, and Transparency:</strong> Data will be processed lawfully, fairly, and in a transparent manner.</li>
                <li><strong>Purpose Limitation:</strong> Data will be collected for specified, explicit, and legitimate purposes.</li>
                <li><strong>Data Minimization:</strong> Data collected will be adequate, relevant, and limited to what is necessary.</li>
                <li><strong>Accuracy:</strong> Personal Data will be accurate and kept up to date.</li>
                <li><strong>Storage Limitation:</strong> Data will be kept in an identifiable form for no longer than is necessary.</li>
                <li><strong>Integrity and Confidentiality (Security):</strong> Data will be processed securely to protect against unauthorized access, loss, or damage.</li>
                <li><strong>Accountability:</strong> Redline Design is responsible for and must be able to demonstrate compliance with these principles.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">4. Lawful Basis for Processing</h2>
              <p className="mb-4">All processing of Personal Data must be based on a valid lawful basis:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Consent Management:</strong> Where consent is the basis, it must be freely given, specific, informed, and unambiguous. Data Subjects have the right to withdraw consent at any time. Records of consent will be maintained. For email marketing, a double opt-in process will be used where appropriate.</li>
                <li><strong>Legitimate Interests:</strong> Data may be processed based on legitimate interests, provided these are not overridden by the rights of the Data Subject. A Legitimate Interests Assessment (LIA) will be conducted when relying on this basis.</li>
                <li><strong>Other Lawful Bases:</strong> Other bases, such as performance of a contract or legal obligation, will be used where appropriate.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">5. Data Collection and Use Practices</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Transparency and Notice at Collection:</strong> At the point of collection, Data Subjects will be provided with a clear Privacy Notice detailing the who, what, why, and how of data processing.</li>
                <li><strong>Cookie Policy and Consent Banners:</strong> A clear Cookie Policy will be maintained. Websites will use cookie consent banners that allow users to accept, reject, or customize their preferences for non-essential cookies. Non-essential cookies will not be placed before valid consent is obtained.</li>
                <li><strong>Email Marketing:</strong> All email marketing will comply with anti-spam laws. Explicit opt-in consent will be obtained, and a clear unsubscribe mechanism will be provided in every marketing email.</li>
                <li><strong>Targeted Advertising and Profiling:</strong> When engaging in targeted advertising or profiling, we will ensure transparency and provide opt-out mechanisms as required by law.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">6. Data Subject Rights</h2>
              <p className="mb-4">Data Subjects have the following rights regarding their Personal Data:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Right to Access:</strong> To request access to their Personal Data.</li>
                <li><strong>Right to Delete/Erasure:</strong> To request the deletion of their Personal Data.</li>
                <li><strong>Right to Rectification:</strong> To request the correction of inaccurate data.</li>
                <li><strong>Right to Restrict Processing:</strong> To request a halt to processing under certain conditions.</li>
                <li><strong>Right to Data Portability:</strong> To receive a copy of their data in a machine-readable format.</li>
                <li><strong>Right to Object:</strong> To object to processing, especially for direct marketing.</li>
                <li><strong>Right to Opt-Out of Sale or Sharing (CCPA/CPRA):</strong> To opt-out of the "sale" or "sharing" of their information.</li>
                <li><strong>Right to Limit Use and Disclosure of Sensitive Personal Information (CPRA):</strong> To limit the use of their sensitive data.</li>
                <li><strong>Right to Non-Discrimination:</strong> To not be discriminated against for exercising privacy rights.</li>
              </ul>
              <p className="mb-4">
                Procedures are in place for submitting requests, verifying identity, and responding within legally mandated timeframes. When acting as a Processor, Redline Design will assist the client (Controller) in responding to these requests.
              </p>

              <h2 className="text-2xl font-bold mb-4">7. Data Sharing and Third Parties</h2>
              <p className="mb-4">
                Personal Data will only be shared with third parties when there is a lawful basis and a written contract (DPA) is in place. Due diligence will be conducted on all third parties.
              </p>
              <p className="mb-4">
                <strong>International Data Transfers:</strong> For transfers of data outside regions like the EEA or UK, appropriate safeguards such as Standard Contractual Clauses (SCCs) will be implemented to ensure data protection.
              </p>

              <h2 className="text-2xl font-bold mb-4">8. Data Security</h2>
              <p className="mb-4">
                Redline Design is committed to implementing appropriate technical and organizational security measures to protect Personal Data. Specific details are outlined in Redline Design's Information Security Policy, which is an integral part of this data governance framework.
              </p>

              <h2 className="text-2xl font-bold mb-4">9. Data Retention and Disposal</h2>
              <p className="mb-4">
                Personal Data will be retained only as long as necessary to fulfill the purposes for which it was collected or as required by law. Data retention schedules will be maintained for different categories of data. Once no longer needed, data will be securely disposed of (e.g., cryptographic erasure, shredding).
              </p>

              <h2 className="text-2xl font-bold mb-4">10. Data Protection Officer/Contact</h2>
              <p className="mb-4">
                A designated Data Protection Contact or Designated Security Lead is responsible for overseeing data protection compliance at Redline Design.
              </p>

              <h2 className="text-2xl font-bold mb-4">11. Breach Notification</h2>
              <p className="mb-4">
                In the event of a data breach, Redline Design will follow established procedures to assess, contain, and remediate the breach, and will notify affected parties and regulatory authorities as required by applicable laws.
              </p>

              <h2 className="text-2xl font-bold mb-4">12. Policy Review and Updates</h2>
              <p className="mb-4">
                This Policy will be reviewed at least annually and updated as required by changes in laws or business practices.
              </p>

              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <p className="mb-4">
                For any questions regarding this Data Use Policy or to exercise Data Subject rights, please contact the Data Protection Contact / Designated Security Lead at Redline Design.
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
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>();
  const isHoveringRef = useRef(false);

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
    
    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
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
      const shouldHover = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      if (shouldHover !== isHoveringRef.current) {
        isHoveringRef.current = shouldHover;
        cursor.classList.toggle('hover', shouldHover);
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
      className="custom-cursor"
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
