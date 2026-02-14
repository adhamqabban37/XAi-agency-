import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextScramble } from "./TextScramble";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

interface HeroProps {
  onBookSession: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookSession }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // "Disintegration" transforms mimicking the rocket pieces flying apart
  // Title (H1) flies top-left
  const h1X = useTransform(scrollY, [0, 500], [0, -200]);
  const h1Y = useTransform(scrollY, [0, 500], [0, -150]);
  const h1Rotate = useTransform(scrollY, [0, 500], [0, -10]);
  const h1Opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Subtitle (H2) flies mid-right
  const h2X = useTransform(scrollY, [0, 500], [0, 200]);
  const h2Y = useTransform(scrollY, [0, 500], [0, -50]);
  const h2Rotate = useTransform(scrollY, [0, 500], [0, 5]);
  const h2Opacity = useTransform(scrollY, [50, 400], [1, 0]);

  // Description flies bottom-left
  const pX = useTransform(scrollY, [0, 500], [0, -150]);
  const pY = useTransform(scrollY, [0, 500], [0, 100]);
  const pRotate = useTransform(scrollY, [0, 500], [0, -5]);
  const pOpacity = useTransform(scrollY, [100, 400], [1, 0]);

  // Buttons fly bottom-right
  const btnX = useTransform(scrollY, [0, 500], [0, 150]);
  const btnY = useTransform(scrollY, [0, 500], [0, 150]);
  const btnRotate = useTransform(scrollY, [0, 500], [0, 10]);
  const btnOpacity = useTransform(scrollY, [150, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-8 text-center"
        >
          <motion.div
            variants={itemVariants}
            style={{ x: h1X, y: h1Y, rotate: h1Rotate, opacity: h1Opacity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-sm text-orange-300 font-medium">
              AI-Powered Automation
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{ x: h1X, y: h1Y, rotate: h1Rotate, opacity: h1Opacity }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-500 pb-2"
          >
            <TextScramble
              text="AI Agency"
              delay={300}
              speed={70}
              scrambleSpeed={50}
            />
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            style={{ x: h2X, y: h2Y, rotate: h2Rotate, opacity: h2Opacity }}
            className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-200"
          >
            <TextScramble
              text="Deploy Digital Employees That Work 24/7"
              delay={1800}
              speed={60}
              scrambleSpeed={50}
            />
          </motion.h2>
          <motion.p
            variants={itemVariants}
            style={{ x: pX, y: pY, rotate: pRotate, opacity: pOpacity }}
            className="max-w-xl text-base md:text-lg text-gray-400"
          >
            AI automation that doesn't just chat — it executes. We build
            autonomous AI agents that integrate with your tools and workflows to
            automate business tasks, reduce costs by 40-60%, and scale
            operations.
          </motion.p>
          <motion.div
            variants={itemVariants}
            style={{ x: btnX, y: btnY, rotate: btnRotate, opacity: btnOpacity }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button
              onClick={onBookSession}
              className="w-full sm:w-auto bg-orange-500 text-white font-bold rounded-full px-8 py-3 text-lg hover:bg-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              Hire a Digital Employee
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto bg-transparent border-2 border-white/10 text-gray-300 font-bold rounded-full px-8 py-3 text-lg hover:bg-white/5 hover:text-white hover:border-orange-500/30 transform hover:scale-105 transition-all duration-300"
            >
              View AI Services
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
