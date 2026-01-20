
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';

const steps = [
  {
    name: "Discover",
    description: "We analyze your workflows and bottlenecks to identify high-impact automation opportunities.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    )
  },
  {
    name: "Design",
    description: "Our architects design a system tailored for execution, including skills, tool integrations, and logic.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
      </svg>
    )
  },
  {
    name: "Deploy",
    description: "The digital employee is integrated with your existing tools (CRMs, APIs) and deployed into your environment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.375 1.5-1.5 1.5 0 0 0-.375 1.125m-9 0h18M3 7.5h18M3 12h18m-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    )
  },
  {
    name: "Optimize",
    description: "We continuously refine the system for maximum ROI, reliability, and enhanced capabilities.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
      </svg>
    )
  }
];

export const Methodology: React.FC = () => {
  return (
    <Section id="methodology">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">A Framework for Execution</h2>
        <p className="mt-6 text-lg text-slate-400">
          Our proven 4-step process ensures your digital employees are effective, integrated, and delivering value from day one.
        </p>
      </div>
      <div className="mt-20 relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2">
          <svg width="100%" height="2" className="overflow-visible">
            <motion.line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: "linear" }}
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#020617" />
                <stop offset="20%" stopColor="#22d3ee" />
                <stop offset="80%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.25 }}
              className="relative z-10 text-center p-6 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-slate-800 border border-slate-700 rounded-full text-cyan-400">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{step.name}</h3>
              <p className="mt-2 text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
