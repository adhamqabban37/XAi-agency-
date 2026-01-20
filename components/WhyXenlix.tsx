
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';

const differentiators = [
  {
    title: "Execution-First Agents",
    description: "Our agents are built to perform tasks, not just answer questions. They interact with your systems to get work done.",
  },
  {
    title: "Deep Integration",
    description: "We go beyond surface-level connections, building robust integrations with the tools you rely on every day.",
  },
  {
    title: "Enterprise-Grade Security",
    description: "Security isn't an afterthought. We build with role-based access, full audit trails, and data privacy at the core.",
  },
  {
    title: "Continuous Optimization",
    description: "A digital employee is never 'done'. We provide ongoing support and optimization to expand their skills and efficiency.",
  },
];

export const WhyXenlix: React.FC = () => {
  return (
    <div className="bg-slate-900">
      <Section id="why-xenlix">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Built for Execution,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Not for Demos.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              The world is full of impressive AI demos that fail in the real world. Xenlix is different. We focus on building reliable, scalable digital employees that solve actual business problems and deliver measurable ROI.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl"
              >
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="mt-2 text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
