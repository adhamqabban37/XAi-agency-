import { useEffect } from "react";

export const SchemaMarkup = () => {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Xenlix AI",
      url: "https://www.xenlixai.com",
      logo: "https://www.xenlixai.com/logo.png",
      description:
        "Xenlix AI provides cutting-edge AI automation, AI agents, and analytics solutions for businesses seeking digital transformation.",
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "xenlixai@gmail.com",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://www.linkedin.com/company/xenlix-ai",
        "https://twitter.com/xenlixai",
      ],
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Automation and Consulting Services",
      provider: {
        "@type": "Organization",
        name: "Xenlix AI",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Automation Services",
              description:
                "Deploy autonomous AI agents to automate business processes, reduce manual work, and increase efficiency 24/7.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Analytics Solutions",
              description:
                "Advanced AI-powered analytics and insights to drive data-driven decision making and business intelligence.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Consulting",
              description:
                "Expert AI strategy consulting to help businesses implement and scale artificial intelligence solutions.",
            },
          },
        ],
      },
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Xenlix AI",
      url: "https://www.xenlixai.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.xenlixai.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    // Software Application Schema (for AI Agents)
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Xenlix AI Agents",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud-based",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Free consultation for AI automation services",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "127",
      },
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What are AI agents?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI agents are autonomous digital employees that can perform complex tasks, integrate with your existing tools, and work 24/7 without human intervention. They use advanced AI to reason, make decisions, and execute workflows automatically.",
          },
        },
        {
          "@type": "Question",
          name: "How does AI automation improve business efficiency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI automation eliminates repetitive manual tasks, reduces human error, and operates continuously. Businesses typically see 40-60% reduction in operational costs and 3-5x faster task completion rates.",
          },
        },
        {
          "@type": "Question",
          name: "What AI services does Xenlix AI provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Xenlix AI provides AI automation services, AI agent deployment, AI analytics solutions, and AI consulting. Our services include lead qualification, scheduling automation, customer onboarding, and custom AI integrations.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can I deploy AI agents?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most AI agent deployments take 2-4 weeks from consultation to full implementation. Simple automations can be deployed in as little as 1 week.",
          },
        },
        {
          "@type": "Question",
          name: "Is AI automation secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All Xenlix AI agents are secure and auditable. Every action is logged, encrypted, and complies with industry security standards including SOC 2 and GDPR.",
          },
        },
      ],
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.xenlixai.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Services",
          item: "https://www.xenlixai.com/#services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Case Studies",
          item: "https://www.xenlixai.com/#case-studies",
        },
      ],
    };

    // Create and append schema scripts to head
    const schemas = [
      organizationSchema,
      serviceSchema,
      websiteSchema,
      softwareSchema,
      faqSchema,
      breadcrumbSchema,
    ];

    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null; // This component doesn't render any visible content
};
