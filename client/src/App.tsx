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
              
              <h2 className="text-2xl font-bold mb-4">1. Introduction & Purpose</h2>
              <p className="mb-4">
                This Information Security Policy (the "Policy") is an official directive from the leadership of Redline Design. It underscores our unwavering commitment to safeguarding the information assets critical to our operations, the sensitive data entrusted to us by our clients, and our overall business reputation from a wide array of security threats.
              </p>
              <p className="mb-4">
                The digital marketing landscape, while offering immense opportunities, also presents significant risks, including phishing attacks, data breaches, and account takeovers, which can lead to severe financial, regulatory, and reputational damage if not proactively managed.
              </p>
              <p className="mb-4">
                The purpose of this Policy is to establish a comprehensive framework of standards, procedures, and responsibilities to protect Redline Design's information assets. This protection is founded on the core principles of Confidentiality, Integrity, and Availability (CIA Triad):
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Confidentiality:</strong> Ensuring that information is accessible only to those authorized to have access.</li>
                <li><strong>Integrity:</strong> Safeguarding the accuracy and completeness of information and processing methods.</li>
                <li><strong>Availability:</strong> Ensuring that authorized users have access to information and associated assets when required.</li>
              </ul>
              <p className="mb-4">
                The scope of this Policy is comprehensive, applying to all employees (full-time, part-time, temporary), contractors, consultants, third-party vendors, and any other individuals or entities who have access to Redline Design's information systems, networks, and data, regardless of location. It covers all information assets owned, leased, or managed by Redline Design, including but not limited to hardware, software, data (electronic and physical), client materials, Customer Relationship Management (CRM) systems, email lists, customer databases, Pay-Per-Click (PPC) platform accounts, and social media profiles.
              </p>

              <h2 className="text-2xl font-bold mb-4">2. Roles and Responsibilities</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Leadership:</strong> Provides visible support and allocates necessary resources for information security.</li>
                <li><strong>Designated Security Lead:</strong> Oversees the implementation, maintenance, and enforcement of this Policy.</li>
                <li><strong>Managers/Team Leaders:</strong> Ensure their teams understand and comply with this Policy.</li>
                <li><strong>All Users:</strong> Responsible for protecting information assets and reporting security incidents.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">3. Information Classification and Handling</h2>
              <p className="mb-4">
                Information assets are classified based on sensitivity to ensure appropriate protection:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Highly Confidential / Restricted:</strong> Information whose unauthorized disclosure could cause severe financial loss, legal liability, or significant reputational damage. Examples include client-provided Personally Identifiable Information (PII), strategic business plans, and authentication credentials for critical systems. Access is on a strict need-to-know basis with MFA, storage must be encrypted, transmission must be encrypted, and disposal must be secure (e.g., cryptographic erasure).</li>
                <li><strong>Confidential:</strong> Sensitive business information intended for internal use. Unauthorized disclosure could cause moderate harm. Examples include detailed client campaign strategies, internal financial reports, and employee records. Access is role-based, storage should be encrypted, transmission must be encrypted, and disposal must be secure.</li>
                <li><strong>Internal Use Only:</strong> Information not intended for public disclosure, where unauthorized disclosure could lead to minor impact. Examples include internal project plans and operational procedures. Access is limited to Redline Design personnel, stored on company-managed systems, transmitted over secure channels, and disposed of via standard deletion.</li>
                <li><strong>Public:</strong> Information explicitly approved for public release. Examples include press releases and published marketing materials. No specific handling restrictions apply beyond general IT good practice.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">4. Access Control</h2>
              <p className="mb-4">Access control ensures that Users can only access the information and resources necessary to perform their job duties.</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Principle of Least Privilege (PoLP):</strong> Users shall be granted only the minimum level of access rights necessary for their job responsibilities. Access rights are reviewed regularly.</li>
                <li><strong>Unique User IDs:</strong> Each User shall be assigned a unique User ID. Sharing credentials is strictly prohibited.</li>
                <li><strong>Strong Passwords/Passphrases:</strong> All Users must use strong, unique passwords/passphrases (minimum 12 characters, complexity requirements).</li>
                <li><strong>Multi-Factor Authentication (MFA):</strong> MFA must be enabled on all critical systems and accounts, especially those accessing Highly Confidential information or administrative functions.</li>
                <li><strong>Account Lockout and Session Management:</strong> Systems shall implement account lockout after failed login attempts and automatic session timeouts.</li>
                <li><strong>Access Reviews:</strong> Access rights shall be reviewed at least quarterly and immediately upon role changes.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">5. Data Protection and Encryption</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Encryption at Rest:</strong> Highly Confidential and Confidential data must be encrypted when stored.</li>
                <li><strong>Encryption in Transit:</strong> All data transmission must use secure protocols (TLS/SSL for web traffic, encrypted email for sensitive content).</li>
                <li><strong>Data Backup and Recovery:</strong> Regular backups of critical data must be performed, stored securely, and tested periodically.</li>
                <li><strong>Data Retention and Disposal:</strong> Data must be retained only as long as necessary and securely disposed of when no longer needed.</li>
                <li><strong>Mobile Device Security (MDM/BYOD):</strong> Company-owned devices will be managed with security settings. Personal devices used for work must comply with the BYOD policy, which includes requirements for device registration, MDM software, strong passcodes, and encryption. Loss or theft of a device used for work must be reported immediately.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">6. Network Security</h2>
              <p className="mb-4">A layered approach to network security is essential to protect against network-based threats.</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Firewall Management:</strong> Firewalls shall be implemented at the network perimeter and reviewed regularly.</li>
                <li><strong>Intrusion Detection/Prevention Systems (IDS/IPS):</strong> IDS/IPS solutions shall be deployed to monitor for and block malicious activity.</li>
                <li><strong>Secure Wi-Fi Network Configuration:</strong> All wireless networks must use strong encryption (WPA2 or WPA3). A separate, isolated guest Wi-Fi network shall be provided for visitors.</li>
                <li><strong>Network Vulnerability Management:</strong> Regular network vulnerability scanning and periodic penetration testing shall be conducted.</li>
                <li><strong>Network Segmentation:</strong> The network may be segmented to isolate critical systems or environments handling highly sensitive data.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">7. System Security</h2>
              <p className="mb-4">The security of individual systems is critical to prevent exploitation.</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>System Hardening:</strong> All systems must be securely configured ("hardened") by removing unnecessary services and changing default credentials.</li>
                <li><strong>Malware Protection:</strong> Enterprise-grade antivirus/anti-malware software must be installed and maintained on all servers and workstations. Users are prohibited from disabling it.</li>
                <li><strong>Secure Software Development Practices:</strong> If Redline Design develops custom software, it must adhere to secure software development lifecycle (SSDLC) practices.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">8. Physical Security</h2>
              <p className="mb-4">Physical security is a critical component of a holistic information security strategy.</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Equipment Security:</strong> Servers and critical network equipment shall be located in secure areas.</li>
                <li><strong>Secure Disposal of Media:</strong> Physical media containing sensitive data must be securely disposed of (e.g., shredding, degaussing).</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">9. Human Resources Security</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Background Checks:</strong> Background checks may be conducted for roles with access to highly sensitive data, subject to local laws.</li>
                <li><strong>Onboarding and Offboarding Procedures:</strong> Formalized procedures manage access rights throughout a User's lifecycle. Upon termination, all access rights must be promptly revoked and company assets returned.</li>
                <li><strong>Confidentiality and Non-Disclosure Agreements (NDAs):</strong> All employees and contractors must sign confidentiality agreements.</li>
                <li><strong>Acceptable Use:</strong> Users must not use Redline Design resources for illegal activities or personal gain that conflicts with company interests.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">10. Third-Party/Vendor Management</h2>
              <p className="mb-4">Third-party vendors can introduce security risks if not properly managed.</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Due Diligence:</strong> Before engaging a third party that will handle sensitive data, Redline Design must assess their security posture.</li>
                <li><strong>Contractual Security Requirements:</strong> All contracts must include specific security and data protection clauses, including confidentiality, data breach notification, and audit rights.</li>
                <li><strong>Regular Review:</strong> The security posture of critical third parties should be reviewed periodically.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">11. Social Media Use Policy</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Official Redline Design Brand Accounts:</strong> Only designated personnel are permitted to manage official social media accounts. Accounts must use strong passwords and MFA.</li>
                <li><strong>Employee Personal Use of Social Media:</strong> Employees must act responsibly. If identifying as an employee, a disclaimer ("Opinions are my own") must be included. Disclosing confidential information is strictly prohibited. Professional conduct is required.</li>
                <li><strong>Official Social Media Brand Accounts for Clients:</strong> Only designated personnel are permitted to manage official social media accounts. Accounts must use strong passwords and MFA.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">12. Monitoring, Logging, and Auditing</h2>
              <p className="mb-4">Continuous monitoring and auditing are essential for a proactive security strategy.</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>System and Network Logging:</strong> Sufficient logging shall be enabled on critical systems and network devices. Logs must be protected from unauthorized access and tampering.</li>
                <li><strong>Log Review and Analysis:</strong> Logs shall be reviewed regularly for suspicious activity.</li>
                <li><strong>Security Audits and Assessments:</strong> Periodic internal and external security audits, vulnerability assessments, and penetration tests shall be conducted.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">13. Incident Response and Business Continuity</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Incident Reporting:</strong> All security incidents and suspected breaches must be reported immediately to the Designated Security Lead.</li>
                <li><strong>Incident Response Plan (IRP):</strong> A documented Incident Response Plan shall be maintained to guide the response to security incidents.</li>
                <li><strong>Business Continuity and Disaster Recovery (BC/DR):</strong> Plans shall be in place to ensure business operations can continue in the event of a disaster.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">14. Policy Exceptions & Violations</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Policy Exceptions:</strong> Requests for exceptions must be submitted in writing to the Designated Security Lead, will only be granted for legitimate business needs, and must be documented.</li>
                <li><strong>Policy Violations:</strong> Failure to comply may result in disciplinary action, up to and including termination. Suspected violations should be reported immediately.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">15. Policy Review and Updates</h2>
              <p className="mb-4">
                This Policy will be reviewed at least annually or more frequently as needed. The Designated Security Lead is responsible for overseeing the review process. Updates will be communicated to all Users.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/nda">
        <PolicyPage
          title="Mutual Non-Disclosure Agreement"
          content={
            <div>
              <p className="text-muted-foreground mb-4">Template</p>
              
              <p className="mb-4">
                This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of [Date] (the "Effective Date"), by and between:
              </p>
              
              <p className="mb-4">
                <strong>Party 1:</strong> Redline Design, with its principal place of business at 55 N Mechant St #444, American Fork, Utah, 84003
              </p>
              
              <p className="mb-4">and</p>
              
              <p className="mb-4">
                <strong>Party 2:</strong> [Counterparty Name], with its principal place of business at [Counterparty Address] (the "Counterparty").
              </p>
              
              <p className="mb-4">
                Redline Design and the Counterparty are each referred to herein as a "Party" and, collectively, as the "Parties."
              </p>

              <h2 className="text-2xl font-bold mb-4">1. Purpose</h2>
              <p className="mb-4">
                The Parties intend to engage in discussions concerning a potential business relationship or project (the "Permitted Purpose"). In the course of these discussions, either Party may disclose certain confidential, proprietary, or non-public information to the other. This Agreement is intended to protect such information from unauthorized use or disclosure.
              </p>

              <h2 className="text-2xl font-bold mb-4">2. Definition of Confidential Information</h2>
              <p className="mb-4">
                "Confidential Information" means any and all non-public information, whether disclosed orally, in writing, in electronic form, or by any other means, by one Party (the "Disclosing Party") to the other Party (the "Receiving Party"). Confidential Information includes, but is not limited to:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Business Information:</strong> Business plans, strategies, financial information, pricing, customer and client lists, marketing plans, and operational methods.</li>
                <li><strong>Client Information:</strong> Any data, materials, or information related to the Disclosing Party's clients, including campaign data, customer lists, and strategic plans.</li>
                <li><strong>Technical Information:</strong> Trade secrets, proprietary software, source code, algorithms, know-how, designs, technical specifications, and system architecture.</li>
                <li><strong>Creative Information:</strong> Unpublished creative works, concepts, marketing materials, and intellectual property.</li>
                <li>Any information that is marked "Confidential," "Proprietary," or with a similar legend, or that a reasonable person would understand to be confidential under the circumstances.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">3. Exclusions from Confidential Information</h2>
              <p className="mb-4">Confidential Information does not include information that the Receiving Party can demonstrate:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Was publicly known and made generally available in the public domain prior to the time of disclosure by the Disclosing Party;</li>
                <li>Becomes publicly known and made generally available after disclosure by the Disclosing Party to the Receiving Party through no action or inaction of the Receiving Party;</li>
                <li>Was already in the possession of the Receiving Party at the time of disclosure by the Disclosing Party, without any confidentiality restrictions;</li>
                <li>Was obtained by the Receiving Party from a third party without a breach of such third party's obligations of confidentiality; or</li>
                <li>Was independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">4. Obligations of the Receiving Party</h2>
              <p className="mb-4">The Receiving Party agrees to:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Hold the Disclosing Party's Confidential Information in strict confidence and take all reasonable precautions to protect it.</li>
                <li>Use the Confidential Information solely for the Permitted Purpose and for no other purpose.</li>
                <li>Not disclose any Confidential Information to any third party without the prior written consent of the Disclosing Party.</li>
                <li>Restrict disclosure of Confidential Information to its employees, contractors, agents, or legal/financial advisors (collectively, "Representatives") who have a legitimate "need-to-know" for the Permitted Purpose, and who are bound by confidentiality obligations at least as restrictive as those in this Agreement. The Receiving Party shall be responsible for any breach of this Agreement by its Representatives.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">5. Compelled Disclosure</h2>
              <p className="mb-4">
                If the Receiving Party is compelled by law, regulation, or court order to disclose any of the Confidential Information, it shall provide the Disclosing Party with prompt written notice of such requirement so that the Disclosing Party may seek a protective order or other appropriate remedy. The Receiving Party shall provide reasonable assistance to the Disclosing Party in this effort. If disclosure is ultimately required, the Receiving Party shall furnish only that portion of the Confidential Information that it is legally required to disclose.
              </p>

              <h2 className="text-2xl font-bold mb-4">6. Return of Information</h2>
              <p className="mb-4">
                Upon the written request of the Disclosing Party, or upon the termination of the business discussions between the Parties, the Receiving Party shall promptly return to the Disclosing Party or securely destroy all documents and materials (and all copies thereof) containing the Disclosing Party's Confidential Information. At the Disclosing Party's request, the Receiving Party shall provide written certification of its compliance with this section.
              </p>

              <h2 className="text-2xl font-bold mb-4">7. No License or Warranty</h2>
              <p className="mb-4">
                Nothing in this Agreement is intended to grant any rights to the Receiving Party under any patent, copyright, trademark, or other intellectual property right of the Disclosing Party, nor shall this Agreement grant the Receiving Party any rights in or to the Confidential Information except for the limited right to review such information for the Permitted Purpose. All Confidential Information is provided "as is," and the Disclosing Party makes no warranties, express, implied, or otherwise, regarding its accuracy, completeness, or performance.
              </p>

              <h2 className="text-2xl font-bold mb-4">8. Term</h2>
              <p className="mb-4">
                The term of this Agreement shall be for a period of one (1) year from the Effective Date. However, the obligations of confidentiality with respect to any Confidential Information disclosed during the term shall survive the termination or expiration of this Agreement for a period of five (5) years thereafter. For information that constitutes a "trade secret" under applicable law, the confidentiality obligations shall survive indefinitely.
              </p>

              <h2 className="text-2xl font-bold mb-4">9. Remedies</h2>
              <p className="mb-4">
                The Receiving Party acknowledges that any unauthorized use or disclosure of Confidential Information will cause irreparable harm to the Disclosing Party, for which monetary damages would be an inadequate remedy. Accordingly, the Disclosing Party shall be entitled to seek equitable relief, including an injunction and specific performance, in the event of any breach or threatened breach of this Agreement, in addition to any other remedies available at law or in equity.
              </p>

              <h2 className="text-2xl font-bold mb-4">10. General Provisions</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Governing Law and Jurisdiction:</strong> This Agreement shall be governed by and construed in accordance with the laws of the State of Utah, without regard to its conflict of laws principles. The Parties consent to the exclusive jurisdiction of the state and federal courts located in Salt Lake County, Utah.</li>
                <li><strong>Entire Agreement:</strong> This Agreement contains the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior and contemporaneous agreements, whether written or oral.</li>
                <li><strong>Amendment and Waiver:</strong> This Agreement may not be amended except by a written instrument signed by both Parties. No failure or delay by a Party in exercising any right hereunder shall operate as a waiver thereof.</li>
                <li><strong>Severability:</strong> If any provision of this Agreement is found to be unenforceable, the remainder shall be enforced as fully as possible, and the unenforceable provision shall be deemed modified to the limited extent required to permit its enforcement in a manner most closely representing the original intention of the Parties.</li>
                <li><strong>Notices:</strong> Any notice required or permitted by this Agreement shall be in writing and shall be delivered as follows, with notice deemed given as of the date of receipt: by personal delivery, by reputable overnight courier, or by registered or certified mail, postage prepaid, return receipt requested.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Execution</h2>
              <p className="mb-4">
                IN WITNESS WHEREOF, the Parties have executed this Mutual Non-Disclosure Agreement by their duly authorized representatives as of the Effective Date.
              </p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-bold">REDLINE DESIGN</p>
                  <p className="mt-2">By: ___________________________</p>
                  <p>Name: ___________________________</p>
                  <p>Title: ___________________________</p>
                </div>
                
                <div className="mt-6">
                  <p className="font-bold">[COUNTERPARTY NAME]</p>
                  <p className="mt-2">By: ___________________________</p>
                  <p>Name: ___________________________</p>
                  <p>Title: ___________________________</p>
                </div>
              </div>
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
              
              <h2 className="text-2xl font-bold mb-4">1. Introduction & Purpose</h2>
              <p className="mb-4">
                This Incident Response Plan (IRP or "Plan") establishes the framework for Redline Design to respond to and manage security incidents in a timely, effective, and coordinated manner. The primary goal is to minimize the adverse impact of such incidents on Redline Design's operations, assets, reputation, and its clients.
              </p>
              <p className="mb-4">
                The purpose of this IRP is to:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Establish procedures for prompt incident detection, analysis, containment, eradication, and recovery</li>
                <li>Define roles and responsibilities for the Incident Response Team (IRT)</li>
                <li>Ensure compliance with all legal and regulatory obligations</li>
                <li>Facilitate a post-incident review process for continuous improvement</li>
              </ul>
              <p className="mb-4">
                The scope of this plan applies to all suspected or confirmed security incidents affecting Redline Design's information systems, data, and services.
              </p>

              <h2 className="text-2xl font-bold mb-4">2. Roles, Responsibilities, and Contact Information</h2>
              <p className="mb-4">
                A pre-defined Incident Response Team (IRT) is established to ensure an organized and efficient response. An up-to-date contact list for all IRT members and external resources shall be maintained and be readily accessible.
              </p>
              <p className="mb-4">
                <strong>Incident Response Team (IRT) Members:</strong>
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Incident Response Coordinator/Manager (IRC)</strong></li>
                <li><strong>Technical Lead(s)</strong></li>
                <li><strong>Communications Lead</strong></li>
                <li><strong>Human Resources (HR) Lead</strong></li>
              </ul>
              <p className="mb-4">
                <strong>Contact Information:</strong><br />
                Ryan Howard: 208-867-4526, Ryan@redline.design
              </p>

              <h2 className="text-2xl font-bold mb-4">3. Incident Classification and Severity Levels</h2>
              <p className="mb-4">
                A security incident is any adverse event that threatens the confidentiality, integrity, or availability of Redline Design's information assets. Incidents are classified by severity to guide the response:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Critical (Extreme):</strong> Catastrophic impact posing an imminent threat to business operations or resulting in massive data loss. Requires immediate IRT activation and escalation to executive management.</li>
                <li><strong>High:</strong> Severe impact causing significant disruption to critical services or compromise of sensitive client data. Requires full IRT activation and escalation.</li>
                <li><strong>Medium:</strong> Moderate impact with localized disruption or minor data compromise. Requires IRT activation with focused response.</li>
                <li><strong>Low:</strong> Minimal impact with no significant service disruption or data compromise. Can often be handled by technical staff with IRT notification.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">4. Incident Response Procedure</h2>
              <p className="mb-4">
                The incident response procedure follows a structured six-phase approach:
              </p>
              
              <h3 className="text-xl font-bold mb-3">Phase 1: Preparation</h3>
              <p className="mb-4">
                Preparation includes maintaining this IRP, training staff, implementing security controls, and ensuring tools and resources are available for incident response.
              </p>

              <h3 className="text-xl font-bold mb-3">Phase 2: Detection and Analysis</h3>
              <p className="mb-4">
                Incidents are detected through various sources including monitoring systems, security alerts, user reports, and external notifications. Upon detection, the incident is analyzed to determine its nature, scope, and severity. The IRC is immediately notified, and the IRT is activated based on severity.
              </p>

              <h3 className="text-xl font-bold mb-3">Phase 3: Containment</h3>
              <p className="mb-4">
                The goal is to limit the incident's scope. Short-term actions may include isolating affected systems or disabling compromised accounts. Evidence must be preserved during this phase.
              </p>

              <h3 className="text-xl font-bold mb-3">Phase 4: Eradication</h3>
              <p className="mb-4">
                This phase focuses on eliminating the root cause of the incident, such as removing malware and patching vulnerabilities.
              </p>

              <h3 className="text-xl font-bold mb-3">Phase 5: Recovery</h3>
              <p className="mb-4">
                The objective is to restore affected systems and services to normal, secure operation from clean backups. Restored systems are validated and closely monitored.
              </p>

              <h3 className="text-xl font-bold mb-3">Phase 6: Post-Incident Activity / Lessons Learned</h3>
              <p className="mb-4">
                A post-incident review meeting is held to analyze the incident and the response. A formal report is generated, and the IRP and other security controls are updated based on lessons learned to prevent future incidents.
              </p>

              <h2 className="text-2xl font-bold mb-4">5. Communication Plan</h2>
              <p className="mb-4">
                Effective communication is critical during an incident.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Internal Communications</h3>
              <p className="mb-4">
                The IRT will use designated secure channels. Employees will be notified as needed. The IRC will provide regular updates to executive management for high-severity incidents.
              </p>

              <h3 className="text-xl font-bold mb-3">External Communications</h3>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Client Notification:</strong> If an incident affects client data or services, affected clients will be notified promptly and transparently.</li>
                <li><strong>Law Enforcement:</strong> The decision to involve law enforcement for criminal activity will be made by Legal Counsel and Executive Management.</li>
                <li><strong>Breach Notification Procedures:</strong> Redline Design will comply with all applicable data breach notification laws. Notifications to individuals will be factual and provide clear steps they can take to protect themselves.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">6. Legal and Regulatory Considerations</h2>
              <p className="mb-4">
                The IRT, led by Legal Counsel, must be aware of all relevant laws and contractual obligations.
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Evidence Preservation and Chain of Custody:</strong> Evidence must be handled in a forensically sound manner to maintain its integrity for potential legal action.</li>
                <li><strong>Interaction with Legal Counsel:</strong> Legal Counsel should be involved early in significant incidents to advise on obligations and manage legal risks.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">7. Training and Awareness</h2>
              <p className="mb-4">
                All IRT members shall receive regular training on incident response procedures. All employees shall receive security awareness training that includes how to recognize and report potential security incidents.
              </p>

              <h2 className="text-2xl font-bold mb-4">8. Plan Maintenance and Review</h2>
              <p className="mb-4">
                This Incident Response Plan shall be reviewed at least annually and updated as needed to reflect changes in technology, threats, organizational structure, or lessons learned from actual incidents or exercises.
              </p>
            </div>
          }
        />
      </Route>
      
      <Route path="/sda">
        <PolicyPage
          title="Subcontractor Data Agreement"
          content={
            <div>
              <h2 className="text-2xl font-bold mb-4">Preamble</h2>
              <p className="mb-4">
                This Subcontractor Data Agreement (the "Agreement" or "DPA") is entered into as of [Effective Date] by and between Redline Design ("Company") and [Subcontractor Name] ("Subcontractor").
              </p>
              <p className="mb-4">
                This Agreement sets forth the terms and conditions under which Subcontractor may Process Personal Data on behalf of Company (and/or on behalf of Company's clients) in connection with the provision of services (the "Services") as defined in the Master Services Agreement ("Principal Agreement").
              </p>
              <p className="mb-4">
                In the event of any conflict between this DPA and the Principal Agreement concerning the Processing of Personal Data, this DPA shall prevail.
              </p>

              <h2 className="text-2xl font-bold mb-4">1. Definitions</h2>
              <p className="mb-4">
                Terms such as "Applicable Data Protection Laws," "Company Personal Data," "Controller," "Data Subject," "Personal Data," "Personal Data Breach," "Processing," "Processor," and "Sub-processor" shall have the meanings aligned with relevant laws such as GDPR and CCPA/CPRA. This agreement uses these terms to ensure legal clarity.
              </p>

              <h2 className="text-2xl font-bold mb-4">2. Scope of Processing</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Instructions for Processing:</strong> Subcontractor shall Process Company Personal Data only on documented instructions from Company.</li>
                <li><strong>Details of Processing:</strong> The subject-matter, duration, nature, purpose, types of data, and categories of Data Subjects are set forth in Annex 1 to this agreement.</li>
                <li><strong>Compliance with Laws:</strong> Subcontractor shall comply with all Applicable Data Protection Laws.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">3. Roles and Responsibilities of the Parties</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Company's Role:</strong> Company is either a Controller or a Processor of the Company Personal Data and warrants that it has a lawful basis to provide the data to Subcontractor for Processing.</li>
                <li><strong>Subcontractor's Role:</strong> Subcontractor is a Processor (or Sub-processor) of the Company Personal Data.</li>
                <li><strong>CCPA/CPRA Specific Obligations:</strong> Subcontractor confirms it is a "Service Provider" or "Contractor," shall not "sell" or "share" Company Personal Data, and shall not retain, use, or disclose the data for any purpose other than performing the Services.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">4. Subcontractor's Obligations</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Security Measures:</strong> Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, as detailed in Annex 2.</li>
                <li><strong>Confidentiality:</strong> Ensure that persons authorized to Process Company Personal Data are subject to confidentiality obligations.</li>
                <li><strong>Sub-processors:</strong> Obtain Company's prior written consent before engaging any Sub-processor. Ensure Sub-processors are bound by equivalent data protection obligations.</li>
                <li><strong>Assistance to Company:</strong> Assist Company in responding to Data Subject rights requests and in meeting its own compliance obligations regarding security, breach notification, and data protection impact assessments.</li>
                <li><strong>Personal Data Breach Notification:</strong> Notify Company without undue delay, and in any event within 48 hours, after becoming aware of a Personal Data Breach. The notification will describe the nature of the breach, likely consequences, and measures taken.</li>
                <li><strong>Data Deletion or Return:</strong> At Company's choice, delete or return all Company Personal Data after the end of the Services and provide written certification of such deletion.</li>
                <li><strong>Information and Audit:</strong> Make available all information necessary to demonstrate compliance and allow for audits conducted by Company or a mandated auditor.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">5. Company's Obligations</h2>
              <p className="mb-4">
                Company shall provide clear and lawful instructions, ensure it has a valid lawful basis for the Processing, and inform Subcontractor of any relevant changes.
              </p>

              <h2 className="text-2xl font-bold mb-4">6. Audit Rights</h2>
              <p className="mb-4">
                Company has the right to conduct audits (not more than once annually, unless a breach occurs) to verify Subcontractor's compliance with this DPA. Subcontractor may provide relevant third-party audit reports (e.g., SOC 2 Type II) as an alternative.
              </p>

              <h2 className="text-2xl font-bold mb-4">7. Liability and Indemnification</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Liability:</strong> Each Party's liability is subject to the limitations in the Principal Agreement, but these shall not limit liability for gross negligence, willful misconduct, or breaches of confidentiality related to Personal Data.</li>
                <li><strong>Indemnification:</strong> Subcontractor shall indemnify and hold harmless Company from any claims or losses arising from Subcontractor's breach of this DPA.</li>
                <li><strong>Insurance:</strong> Subcontractor shall maintain appropriate Commercial General Liability, Professional Liability, and Cyber Liability insurance.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">8. Term and Termination</h2>
              <p className="mb-4">
                This DPA remains in effect as long as Subcontractor Processes Company Personal Data. Company may terminate this DPA and the Principal Agreement for a material breach by Subcontractor. Obligations regarding data deletion, return, and confidentiality shall survive termination.
              </p>

              <h2 className="text-2xl font-bold mb-4">9. General Provisions</h2>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Governing Law:</strong> This DPA shall be governed by the same law as the Principal Agreement.</li>
                <li><strong>Amendments:</strong> Any amendments must be in writing and signed by both Parties.</li>
                <li><strong>Severability:</strong> If any provision is found unenforceable, the remainder shall remain in effect.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Annex 1: Details of Processing</h2>
              <p className="mb-4">
                This annex should specify:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Subject-matter:</strong> The services being provided (e.g., digital marketing services, web development, analytics).</li>
                <li><strong>Duration:</strong> The term of the engagement.</li>
                <li><strong>Nature and Purpose:</strong> Marketing campaign execution, website hosting, analytics, or other agreed-upon services.</li>
                <li><strong>Types of Personal Data:</strong> Contact information, behavioral data, technical identifiers (IP addresses, cookies), etc.</li>
                <li><strong>Categories of Data Subjects:</strong> Clients' customers, website visitors, or other end users.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Annex 2: Minimum Security Measures</h2>
              <p className="mb-4">
                This annex details the minimum technical and organizational security measures Subcontractor must implement:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Maintaining information security policies</li>
                <li>Enforcing strong access controls with MFA</li>
                <li>Encrypting data at rest and in transit</li>
                <li>Implementing network security controls like firewalls and IDS/IPS</li>
                <li>Maintaining physical security</li>
                <li>Having a documented incident response plan</li>
                <li>Ensuring business continuity</li>
                <li>Adhering to secure software development practices</li>
              </ul>
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
