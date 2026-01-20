import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";

interface FAQItem {
  question: string;
  answer: string;
  keywords?: string[];
}

const faqs: FAQItem[] = [
  {
    question: "What are AI agents and how do they work?",
    answer:
      "AI agents are autonomous digital employees powered by artificial intelligence that can perform complex tasks without human intervention. They integrate with your existing tools (APIs, databases, CRM systems), use advanced reasoning to make decisions, and execute workflows automatically 24/7. Unlike chatbots, AI agents can access multiple systems, analyze data, and complete multi-step processes independently.",
    keywords: ["AI agents", "autonomous AI", "digital employees"],
  },
  {
    question: "How does AI automation reduce business costs?",
    answer:
      "AI automation reduces costs by eliminating repetitive manual tasks, reducing human error by up to 90%, and operating continuously without breaks. Businesses typically see 40-60% reduction in operational costs, 3-5x faster task completion, and can reallocate staff to higher-value activities. There are no sick days, overtime, or training costs.",
    keywords: ["cost reduction", "ROI", "efficiency"],
  },
  {
    question: "What AI services does Xenlix AI provide?",
    answer:
      "Xenlix AI provides comprehensive AI solutions including: AI Automation Services (process automation, workflow optimization), AI Agent Deployment (24/7 sales associates, scheduling coordinators, onboarding specialists), AI Analytics Solutions (data insights, predictive analytics), and AI Consulting (strategy, implementation, integration). We also offer custom AI development using FastAPI, Python, React, and SQL databases.",
    keywords: ["AI services", "AI automation", "AI consulting"],
  },
  {
    question: "How quickly can I deploy AI agents in my business?",
    answer:
      "Deployment timelines vary by complexity: Simple automations (lead capture, email responses) can be deployed in 1 week. Standard AI agents (scheduling, customer support) take 2-3 weeks. Complex custom solutions (multi-system integrations, advanced analytics) require 4-6 weeks. We provide a free consultation to assess your needs and create a detailed timeline.",
    keywords: ["deployment", "implementation timeline"],
  },
  {
    question: "Is AI automation secure and compliant?",
    answer:
      "Yes. All Xenlix AI solutions are built with enterprise-grade security. Every agent action is logged and auditable, data is encrypted in transit and at rest, and we comply with SOC 2, GDPR, HIPAA, and other industry standards. You maintain full control with role-based access, audit trails, and the ability to pause or modify any automation.",
    keywords: ["security", "compliance", "GDPR", "auditable"],
  },
  {
    question: "What's the ROI of implementing AI automation?",
    answer:
      "Most businesses see positive ROI within 3-6 months. Typical returns include: 40-60% reduction in operational costs, 70-80% time savings on repetitive tasks, 3-5x increase in lead response speed, and 25-40% improvement in customer satisfaction. Use our ROI calculator to estimate your specific savings based on your business metrics.",
    keywords: ["ROI", "return on investment", "savings"],
  },
  {
    question: "Can AI agents integrate with my existing software?",
    answer:
      "Yes. Xenlix AI agents integrate with virtually any software through APIs, webhooks, and direct database connections. Common integrations include: CRM systems (Salesforce, HubSpot), calendars (Google Calendar, Outlook), communication tools (Slack, Microsoft Teams), databases (SQL, PostgreSQL, MongoDB), and custom enterprise software. We handle all technical integration work.",
    keywords: ["integration", "APIs", "CRM", "software"],
  },
  {
    question: "Do I need technical expertise to use AI agents?",
    answer:
      "No. Xenlix AI handles all technical implementation, training, and maintenance. You interact with agents through simple interfaces – email, chat, or dashboards. We provide comprehensive training for your team, ongoing support, and a dedicated account manager. The agents are designed to be as easy to 'manage' as hiring a regular employee.",
    keywords: ["ease of use", "no code", "user friendly"],
  },
  {
    question: "What industries benefit most from AI automation?",
    answer:
      "AI automation delivers value across all industries, with particularly high impact in: Professional Services (law, accounting, consulting), Healthcare (patient scheduling, records management), Real Estate (lead qualification, scheduling), E-commerce (customer support, inventory), Financial Services (data processing, compliance), and SaaS companies (onboarding, customer success).",
    keywords: ["industries", "use cases", "applications"],
  },
  {
    question: "How do AI agents compare to hiring human employees?",
    answer:
      "AI agents complement human teams rather than replace them. Key differences: AI agents work 24/7/365, cost 70-80% less than full-time employees, require no training or benefits, scale instantly, never make careless errors, and handle unlimited volume. Humans provide creativity, empathy, complex judgment, and strategic thinking. The best approach combines both for maximum efficiency.",
    keywords: ["AI vs humans", "digital employees", "cost comparison"],
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Frequently Asked Questions
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              About AI Automation
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Get answers to common questions about AI agents, automation, and how
            Xenlix AI can transform your business
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none group"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="border-t border-slate-800 pt-4">
                        <p className="text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.keywords && faq.keywords.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {faq.keywords.map((keyword, kidx) => (
                              <span
                                key={kidx}
                                className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </Section>
  );
};
