import React from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";

const FlagshipSystem: React.FC = () => {
  const capabilities = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Sub-5-Second Lead Response",
      description: "Instant engagement with every inbound lead, 24/7/365",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "AI Intent Qualification",
      description:
        "Analyzes budget, timeline, and urgency in natural conversation",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      title: "Automatic CRM Sync",
      description:
        "Seamless integration with HubSpot, Pipedrive, and major CRMs",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "SMS and Email Follow-ups",
      description: "Multi-channel nurturing with personalized messaging",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Human Handoff with Context",
      description: "Seamless transfer to agents with full conversation history",
    },
  ];

  const architecture = [
    {
      layer: "AI Orchestration Layer",
      description: "Coordinates multi-step workflows and decision-making",
    },
    {
      layer: "Large Language Model Reasoning",
      description: "Advanced natural language understanding and generation",
    },
    {
      layer: "CRM & Messaging Integrations",
      description: "Real-time synchronization with business systems",
    },
    {
      layer: "Monitoring & Optimization",
      description: "Continuous learning and performance improvement",
    },
  ];

  return (
    <Section id="flagship-system">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold uppercase tracking-wide">
              Beta System – In Development
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Flagship AI Systems
          </h2>

          <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Real Estate Digital Sales Associate
          </h3>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Proprietary AI system by Xenlix AI
          </p>

          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Turn every lead into a conversation within 5 seconds. Increase
            speed-to-lead by 95% and boost conversion rates with intelligent
            qualification.
          </p>
        </motion.div>

        {/* Quick Answer for AEO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 rounded-lg"
        >
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-cyan-400">What it does:</strong> The Real
            Estate Digital Sales Associate is an AI-powered lead response system
            that instantly engages real estate prospects, qualifies their intent
            (budget, timeline, urgency), and seamlessly hands off qualified
            leads to human agents with full conversation context—all while
            syncing to your CRM automatically.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
            An AI-powered Digital Sales Associate designed specifically for real
            estate agencies and brokerages. This system provides instant
            response to every inbound lead, qualifies prospect intent through
            natural conversation, and automatically syncs all data to your CRM
            with seamless human handoff.
          </p>
          <p className="text-slate-400 max-w-4xl mx-auto">
            Built to solve the critical problem of missed revenue from slow
            response times—where 78% of buyers choose the first agent who
            responds.
          </p>
        </motion.div>

        {/* Core Capabilities */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-10 text-center"
          >
            Core Capabilities
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    {capability.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {capability.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Architecture */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-10 text-center"
          >
            System Architecture
          </motion.h3>

          <div className="max-w-3xl mx-auto space-y-4">
            {architecture.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4 p-5 bg-slate-900/50 border-l-4 border-cyan-500 rounded-lg hover:bg-slate-900/70 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-full font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {layer.layer}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {layer.description}
                    </p>
                  </div>
                </div>

                {index < architecture.length - 1 && (
                  <div className="ml-8 h-4 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Value Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              The Problem We're Solving
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              <strong className="text-cyan-400">
                78% of buyers choose the first agent who responds.
              </strong>{" "}
              Yet the average real estate agent takes 4–24 hours to follow up on
              a lead. This delay costs agencies millions in lost commissions
              every year.
            </p>
            <p className="text-slate-400">
              Our AI Digital Sales Associate eliminates response delays
              entirely, ensuring every prospect receives instant, intelligent
              engagement—turning speed into your competitive advantage.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Request Early Access
          </a>
          <p className="mt-4 text-slate-400">
            Limited pilot program spots available for qualified real estate
            agencies
          </p>
        </motion.div>

        {/* Trust Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            * This system is currently in pilot development. Features,
            capabilities, and integrations are subject to change as we refine
            the platform based on real-world testing and client feedback. Early
            access participants will receive priority support and influence on
            feature development.
          </p>
        </motion.div>
      </div>

      {/* SEO-optimized FAQ snippet */}
      <div className="sr-only">
        <h3>Frequently Asked Questions About AI Real Estate Lead Automation</h3>
        <div>
          <h4>What is an AI sales agent for real estate?</h4>
          <p>
            An AI sales agent for real estate is an automated system that
            instantly responds to leads, qualifies prospects through natural
            conversation, and hands off ready-to-close opportunities to human
            agents with full context.
          </p>
        </div>
        <div>
          <h4>How does AI lead qualification work?</h4>
          <p>
            AI lead qualification uses natural language processing to engage
            prospects in conversation, extract key information like budget,
            timeline, and urgency, and score leads based on buying intent—all
            automatically within seconds.
          </p>
        </div>
        <div>
          <h4>Can AI integrate with my real estate CRM?</h4>
          <p>
            Yes. The Real Estate Digital Sales Associate integrates seamlessly
            with HubSpot, Pipedrive, and other major CRMs, automatically syncing
            all lead data and conversation history in real-time.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default FlagshipSystem;
