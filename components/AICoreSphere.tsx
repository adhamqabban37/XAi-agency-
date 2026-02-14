import React from "react";
import { motion } from "framer-motion";

/**
 * A hyper-realistic CSS/SVG 3D sphere with internal neural filaments,
 * obsidian black glass texture, and glowing blue-violet energy core.
 */
export const AICoreSphere: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow bloom */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main sphere container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
      >
        {/* Glass sphere body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 35% 30%, rgba(255,255,255,0.12) 0%, transparent 50%),
              radial-gradient(ellipse 80% 80% at 50% 50%, rgba(15,23,42,0.95) 0%, rgba(2,6,23,1) 100%)
            `,
            border: "1px solid rgba(34,211,238,0.15)",
            boxShadow: `
              inset 0 0 60px rgba(34,211,238,0.08),
              inset 0 0 120px rgba(139,92,246,0.05),
              0 0 40px rgba(34,211,238,0.1),
              0 0 80px rgba(139,92,246,0.05)
            `,
          }}
        />

        {/* Inner neural network SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sphere-mask" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="85%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="circle-mask">
              <circle cx="150" cy="150" r="140" fill="url(#sphere-mask)" />
            </mask>
            <linearGradient
              id="filament-cyan"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="filament-violet"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="filament-blue"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-filter">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g mask="url(#circle-mask)" filter="url(#glow-filter)">
            {/* Neural network filaments - cyan */}
            <motion.path
              d="M80,150 Q120,100 150,120 T220,140"
              stroke="url(#filament-cyan)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M100,200 Q140,160 170,180 T240,170"
              stroke="url(#filament-cyan)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.path
              d="M70,120 Q110,80 150,100 T230,90"
              stroke="url(#filament-cyan)"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Neural network filaments - violet */}
            <motion.path
              d="M120,80 Q150,130 180,110 T200,200"
              stroke="url(#filament-violet)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.path
              d="M90,170 Q130,130 160,160 T210,120"
              stroke="url(#filament-violet)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            />

            {/* Neural network filaments - blue */}
            <motion.path
              d="M130,220 Q160,180 180,200 T220,160"
              stroke="url(#filament-blue)"
              strokeWidth="1.3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.path
              d="M60,160 Q100,120 140,150 T200,130"
              stroke="url(#filament-blue)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />

            {/* Neural nodes - pulsing dots at intersections */}
            {[
              { cx: 150, cy: 120, color: "#22d3ee", delay: 0 },
              { cx: 170, cy: 180, color: "#8b5cf6", delay: 0.5 },
              { cx: 120, cy: 160, color: "#3b82f6", delay: 1 },
              { cx: 200, cy: 140, color: "#22d3ee", delay: 1.5 },
              { cx: 100, cy: 130, color: "#8b5cf6", delay: 0.8 },
              { cx: 180, cy: 110, color: "#3b82f6", delay: 0.3 },
              { cx: 140, cy: 200, color: "#22d3ee", delay: 1.2 },
              { cx: 160, cy: 90, color: "#8b5cf6", delay: 0.7 },
            ].map((node, i) => (
              <React.Fragment key={i}>
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="2.5"
                  fill={node.color}
                  animate={{
                    r: [2, 3.5, 2],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="2.5"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="0.5"
                  animate={{
                    r: [3, 8],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeOut",
                  }}
                />
              </React.Fragment>
            ))}
          </g>
        </svg>

        {/* Specular highlight (top-left glass reflection) */}
        <div
          className="absolute rounded-full"
          style={{
            top: "8%",
            left: "15%",
            width: "40%",
            height: "25%",
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            transform: "rotate(-20deg)",
          }}
        />

        {/* Bottom rim light */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "5%",
            left: "20%",
            width: "60%",
            height: "15%",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Orbiting ring */}
      <motion.div
        className="absolute inset-[-15%] rounded-full"
        style={{
          border: "1px solid rgba(34,211,238,0.1)",
          borderTop: "1px solid rgba(34,211,238,0.3)",
          transform: "rotateX(70deg)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Second orbiting ring */}
      <motion.div
        className="absolute inset-[-8%] rounded-full"
        style={{
          border: "1px solid rgba(139,92,246,0.08)",
          borderBottom: "1px solid rgba(139,92,246,0.25)",
          transform: "rotateX(65deg) rotateZ(30deg)",
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
