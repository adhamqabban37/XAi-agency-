import React from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { StaggeredTextReveal } from "./StaggeredTextReveal";
import { MouseGlow } from "./MouseGlow";

const differentiators = [
  {
    title: "Execution-First Agents",
    description:
      "Our agents are built to perform tasks, not just answer questions. They interact with your systems to get work done.",
  },
  {
    title: "Deep Integration",
    description:
      "We go beyond surface-level connections, building robust integrations with the tools you rely on every day.",
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Security isn't an afterthought. We build with role-based access, full audit trails, and data privacy at the core.",
  },
  {
    title: "Continuous Optimization",
    description:
      "A digital employee is never 'done'. We provide ongoing support and optimization to expand their skills and efficiency.",
  },
];

export const WhyXenlix: React.FC = () => {
  return (
    <div className="">
      <Section id="why-xenlix">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              <StaggeredTextReveal
                text="Built for Execution,"
                fromSpacing={10}
                toSpacing={-0.5}
                stagger={0.025}
                letterDuration={0.5}
              />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-white">
                <StaggeredTextReveal
                  text="Not for Demos."
                  delay={0.4}
                  fromSpacing={10}
                  toSpacing={-0.5}
                  stagger={0.03}
                  letterDuration={0.5}
                />
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              The world is full of impressive AI demos that fail in the real
              world. Xenlix is different. We focus on building reliable,
              scalable digital employees that solve actual business problems and
              deliver measurable ROI.
            </p>
          </div>
          <MouseGlow radius={350} color="rgba(139, 92, 246, 0.06)">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    filter: "blur(6px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative p-6 rounded-xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(148,163,184,0.08)",
                  }}
                >
                  {/* Iridescent hover glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, transparent 50%, rgba(139,92,246,0.06) 100%)",
                    }}
                  />
                  {/* Top iridescent edge */}
                  <div
                    className="absolute top-0 left-[15%] right-[15%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(139,92,246,0.3), transparent)",
                    }}
                  />
                  <div className="relative z-10">
                    <h3 className="font-bold text-white text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MouseGlow>
        </div>
      </Section>
    </div>
  );
};
