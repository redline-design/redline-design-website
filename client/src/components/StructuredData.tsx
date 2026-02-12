import { useEffect } from "react";

interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType: string;
  };
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
}

interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  serviceType: string;
  areaServed: string;
}

interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

const organizationData: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Redline Design LLC",
  url: "https://www.redlinedesignllc.com",
  logo: "https://res.cloudinary.com/diafl1c7n/image/upload/v1/redline/logo.png",
  description: "Full-stack digital marketing agency specializing in SEO, PPC, web design, social media marketing, and email marketing services.",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61573886695631",
    "https://www.instagram.com/redlineprojectllc/"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salt Lake City",
    addressRegion: "UT",
    addressCountry: "US"
  }
};

const websiteData: WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Redline Design LLC",
  url: "https://www.redlinedesignllc.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.redlinedesignllc.com/blog?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const services: ServiceSchema[] = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development",
    description: "Custom website design and development services with mobile-responsive designs, fast loading speeds, and SEO optimization.",
    provider: { "@type": "Organization", name: "Redline Design LLC" },
    serviceType: "Web Design",
    areaServed: "United States"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Search Engine Optimization (SEO)",
    description: "Comprehensive SEO services including keyword research, on-page optimization, content strategy, and local SEO.",
    provider: { "@type": "Organization", name: "Redline Design LLC" },
    serviceType: "SEO Services",
    areaServed: "United States"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pay-Per-Click Advertising (PPC)",
    description: "Google Ads and Meta Ads campaign management with A/B testing, daily optimization, and transparent reporting.",
    provider: { "@type": "Organization", name: "Redline Design LLC" },
    serviceType: "Digital Advertising",
    areaServed: "United States"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Social Media Marketing",
    description: "Social media management including content creation, community management, and growth strategy.",
    provider: { "@type": "Organization", name: "Redline Design LLC" },
    serviceType: "Social Media Marketing",
    areaServed: "United States"
  }
];

export default function StructuredData() {
  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-structured-data]');
    existingScripts.forEach(script => script.remove());

    const schemas = [organizationData, websiteData, ...services];
    
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', `schema-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-structured-data]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null;
}
