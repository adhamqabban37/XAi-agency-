import React from "react";
import { Section } from "./Section";
import { motion } from "framer-motion";
import {
  NeuralNetworkIcon,
  DataFlowIcon,
  ProcessingIcon,
} from "./AnimatedAIIcons";
import { StaggeredTextReveal } from "./StaggeredTextReveal";
import { MouseGlow } from "./MouseGlow";

const useCases = [
  {
    animatedIcon: <NeuralNetworkIcon className="w-10 h-10" />,
    title: "The 24/7 Sales Associate",
    description:
      "Captures and qualifies leads from any channel in under 5 minutes. Never let a hot lead go cold again.",
  },
  {
    animatedIcon: <DataFlowIcon className="w-10 h-10" />,
    title: "The Scheduling Coordinator",
    description:
      "Handles all appointment booking, rescheduling, and reminders across multiple calendars to eliminate no-shows.",
  },
  {
    animatedIcon: <ProcessingIcon className="w-10 h-10" />,
    title: "The Onboarding Specialist",
    description:
      "Automates user education, guides new customers through setup, and answers common questions to reduce churn.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const UseCases: React.FC = () => {
  return (
    <Section id="services">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          <StaggeredTextReveal
            text="Hire Your First Digital Employee"
            fromSpacing={10}
            toSpacing={-0.5}
            stagger={0.025}
            letterDuration={0.5}
          />
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          Instead of buying more software, hire a digital team member trained
          for a specific, high-value role.
        </p>
      </div>

      <MouseGlow
        className="mt-16"
        radius={400}
        color="rgba(249, 115, 22, 0.15)"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Iridescent border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                }}
              />
              {/* Top edge iridescent line */}
              <div
                className="absolute top-0 left-[10%] right-[10%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)",
                }}
              />
              {/* Micro-detail noise texture overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                }}
              />
              {/* Corner glow accent */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 group-hover:scale-150 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 h-24 w-24 bg-purple-500/5 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/8 group-hover:scale-125 transition-all duration-700"></div>

              <div className="relative z-10">
                <div
                  className="flex items-center justify-center w-14 h-14 mb-6 rounded-xl text-cyan-400"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)",
                    border: "1px solid rgba(34,211,238,0.15)",
                    boxShadow: "0 0 20px rgba(34,211,238,0.05)",
                  }}
                >
                  {useCase.animatedIcon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-slate-400">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </MouseGlow>
    </Section>
  );
};
