import React from "react";
import { Section } from "./Section";
import { motion } from "framer-motion";

const ProblemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);

const SolutionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-orange-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const problems = [
  "Leads go cold waiting for follow-up.",
  "Your team is overwhelmed with manual data entry.",
  "Valuable time is lost on repetitive tasks.",
  "Growth is bottlenecked by operational drag.",
];

const solutions = [
  "Agents that work 24/7, so you never miss an opportunity.",
  "Direct integration into your workflow, no new software to learn.",
  "Autonomous execution of complex tasks.",
  "Systems that scale with your business, not against it.",
];

export const ProblemSolution: React.FC = () => {
  return (
    <div className="">
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <ProblemIcon />
              <h2 className="text-3xl font-bold text-white">The Problem</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Your team is brilliant, but they're bogged down. Opportunities are
              slipping through the cracks because everyone is stretched too
              thin.
            </p>
            <ul className="space-y-4">
              {problems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#8211;</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-slate-950 border border-cyan-400/30 p-8 rounded-xl shadow-2xl shadow-cyan-500/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <SolutionIcon />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                The Xenlix Solution
              </h2>
            </div>
            <p className="text-slate-400 mb-6">
              We deploy agentic systems that work while you sleep. They don't
              get tired, they don't miss leads, and they execute flawlessly.
            </p>
            <ul className="space-y-4">
              {solutions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">&#43;</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};
