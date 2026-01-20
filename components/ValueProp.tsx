
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';

const CheckIcon: React.FC = () => (
  <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const valuePoints = [
  "Autonomous Operation: Agents work 24/7 without human intervention.",
  "Tool Integration: Connects to your existing software stack (APIs, databases, etc.).",
  "Complex Reasoning: Capable of multi-step problem-solving and decision-making.",
  "Secure & Auditable: All actions are logged for complete transparency and control."
];

export const ValueProp: React.FC = () => {
  return (
    <Section>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Stop Installing Software.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Start Hiring Digital Employees.
          </span>
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          Xenlix agents are more than chatbots. They are skilled, autonomous members of your team, designed to execute tasks, manage workflows, and drive business outcomes.
        </p>
      </div>
      <div className="mt-16 max-w-2xl mx-auto">
        <ul className="space-y-6">
          {valuePoints.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-start space-x-4 p-4 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <CheckIcon />
              <span className="text-slate-300">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
