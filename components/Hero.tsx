import React from "react";
import { motion } from "framer-motion";

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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface HeroProps {
  onBookSession: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookSession }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center pt-20 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20"></div>

        {/* Animated Dots */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div
          className="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Floating Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.line
            x1="10%"
            y1="20%"
            x2="90%"
            y2="30%"
            stroke="url(#gradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="20%"
            y1="80%"
            x2="80%"
            y2="70%"
            stroke="url(#gradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center space-y-8"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400"
        >
          AI Automation Services & AI Agents
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-300"
        >
          Deploy Digital Employees That Work 24/7
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg md:text-xl text-slate-400"
        >
          AI automation that doesn't just chat — it executes. We build
          autonomous AI agents that integrate with your tools and workflows to
          automate business tasks, reduce costs by 40-60%, and scale operations.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button
            onClick={onBookSession}
            className="w-full sm:w-auto bg-cyan-400 text-slate-900 font-bold rounded-full px-8 py-3 text-lg hover:bg-cyan-300 transform hover:scale-105 transition-all duration-300"
          >
            Hire a Digital Employee
          </button>
          <a
            href="#services"
            className="w-full sm:w-auto bg-transparent border-2 border-slate-700 text-slate-300 font-bold rounded-full px-8 py-3 text-lg hover:bg-slate-800 hover:border-slate-600 transform hover:scale-105 transition-all duration-300"
          >
            View AI Services
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
