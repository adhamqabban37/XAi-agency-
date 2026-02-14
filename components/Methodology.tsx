import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    name: "Discover",
    description:
      "We analyze your workflows and bottlenecks to identify high-impact automation opportunities.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
  },
  {
    name: "Design",
    description:
      "Our architects design a system tailored for execution, including skills, tool integrations, and logic.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>
    ),
  },
  {
    name: "Deploy",
    description:
      "The digital employee is integrated with your existing tools (CRMs, APIs) and deployed into your environment.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 0 1-.375 1.5-1.5 1.5 0 0 0-.375 1.125m-9 0h18M3 7.5h18M3 12h18m-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  },
  {
    name: "Optimize",
    description:
      "We continuously refine the system for maximum ROI, reliability, and enhanced capabilities.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
        />
      </svg>
    ),
  },
];

const stepColors = [
  "from-orange-500/20 to-orange-500/5",
  "from-white/10 to-white/5",
  "from-orange-400/20 to-orange-400/5",
  "from-gray-500/20 to-gray-500/5",
];

const stepAccents = [
  "text-orange-500",
  "text-white",
  "text-orange-400",
  "text-gray-400",
];
const stepBorders = [
  "border-orange-500/30",
  "border-white/30",
  "border-orange-400/30",
  "border-gray-400/30",
];

export const Methodology: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="methodology"
      ref={containerRef}
      className="relative h-auto lg:min-h-[180vh] xl:min-h-[220vh]"
    >
      <div className="hidden lg:flex sticky top-0 h-screen items-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Sticky text content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  A Framework for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-white">
                    Execution
                  </span>
                </h2>
                <p className="mt-6 text-lg text-gray-400">
                  Our proven 4-step process ensures your digital employees are
                  effective, integrated, and delivering value from day one.
                </p>
              </motion.div>

              {/* Vertical progress line */}
              <div className="mt-10 relative">
                <div className="absolute left-[15px] top-0 w-[2px] h-full bg-white/10 rounded-full" />
                <motion.div
                  className="absolute left-[15px] top-0 w-[2px] bg-gradient-to-b from-orange-500 to-white rounded-full"
                  style={{ height: lineHeight }}
                />
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const stepStart = index / steps.length;
                    const stepEnd = (index + 0.5) / steps.length;
                    return (
                      <StepIndicator
                        key={step.name}
                        step={step}
                        index={index}
                        scrollProgress={scrollYProgress}
                        rangeStart={stepStart}
                        rangeEnd={stepEnd}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Scroll-driven step cards */}
            <div className="hidden lg:block relative h-[400px]">
              {steps.map((step, index) => (
                <StepCard
                  key={step.name}
                  step={step}
                  index={index}
                  scrollProgress={scrollYProgress}
                  totalSteps={steps.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback: regular stacked cards */}
      <div className="lg:hidden container mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            A Framework for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-white">
              Execution
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Our proven 4-step process ensures your digital employees are
            effective, integrated, and delivering value from day one.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-8 bg-slate-900/80 backdrop-blur-sm border ${stepBorders[index]} rounded-xl overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stepColors[index]} opacity-50`}
              />
              <div className="relative z-10">
                <div
                  className={`flex items-center justify-center w-16 h-16 mb-6 bg-slate-800 border border-slate-700 rounded-full ${stepAccents[index]}`}
                >
                  {step.icon}
                </div>
                <div className="text-xs font-mono text-slate-500 mb-2">
                  STEP {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-white">{step.name}</h3>
                <p className="mt-2 text-slate-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component: Left side step indicators
const StepIndicator: React.FC<{
  step: (typeof steps)[0];
  index: number;
  scrollProgress: any;
  rangeStart: number;
  rangeEnd: number;
}> = ({ step, index, scrollProgress, rangeStart, rangeEnd }) => {
  const opacity = useTransform(
    scrollProgress,
    [rangeStart, rangeEnd],
    [0.3, 1],
  );
  const scale = useTransform(scrollProgress, [rangeStart, rangeEnd], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex items-center gap-4 pl-8 py-2"
    >
      <div
        className={`w-2 h-2 rounded-full ${stepAccents[index]} bg-current flex-shrink-0`}
      />
      <div>
        <span className="text-xs font-mono text-slate-500">
          STEP {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-white font-semibold">{step.name}</h3>
      </div>
    </motion.div>
  );
};

// Sub-component: Right side animated cards
const StepCard: React.FC<{
  step: (typeof steps)[0];
  index: number;
  scrollProgress: any;
  totalSteps: number;
}> = ({ step, index, scrollProgress, totalSteps }) => {
  const rangeStart = Math.max(0, (index - 0.5) / totalSteps);
  const rangeActive = index / totalSteps;
  const rangeEnd = Math.min(1, (index + 1) / totalSteps);

  const y = useTransform(
    scrollProgress,
    [rangeStart, rangeActive, rangeEnd],
    [80, 0, -80],
  );
  const opacity = useTransform(
    scrollProgress,
    [rangeStart, rangeActive, rangeEnd],
    [0, 1, 0],
  );
  const scale = useTransform(
    scrollProgress,
    [rangeStart, rangeActive, rangeEnd],
    [0.9, 1, 0.9],
  );

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className={`absolute inset-0 p-10 bg-slate-900/90 backdrop-blur-sm border ${stepBorders[index]} rounded-2xl overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stepColors[index]} opacity-40`}
      />
      <div className="relative z-10 flex flex-col justify-center h-full">
        <div
          className={`flex items-center justify-center w-20 h-20 mb-8 bg-slate-800 border border-slate-700 rounded-2xl ${stepAccents[index]}`}
        >
          {step.icon}
        </div>
        <div className="text-xs font-mono text-slate-500 mb-3">
          STEP {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">{step.name}</h3>
        <p className="text-lg text-slate-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};
