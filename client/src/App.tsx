import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagonalStripes from "@/components/DiagonalStripes";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import WhyUs from "@/pages/WhyUs";
import BookDemo from "@/pages/BookDemo";
import Onboarding from "@/pages/Onboarding";
import Articles from "@/pages/Articles";
import PolicyPage from "@/pages/PolicyPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/why-us" component={WhyUs} />
      <Route path="/book-a-demo" component={BookDemo} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/digital-marketing" component={Articles} />
      
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

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen relative">
          <DiagonalStripes />
          <Header />
          <main className="flex-1 relative z-10">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
