import React from "react";
import { motion } from "framer-motion";

// Pulsing Neural Network Node
export const NeuralNetworkIcon: React.FC<{ className?: string }> = ({
  className = "w-14 h-14",
}) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Connections */}
      <motion.line
        x1="14"
        y1="14"
        x2="28"
        y2="28"
        stroke="#f97316"
        strokeWidth="1"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="42"
        y1="14"
        x2="28"
        y2="28"
        stroke="#f97316"
        strokeWidth="1"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      <motion.line
        x1="14"
        y1="42"
        x2="28"
        y2="28"
        stroke="#f97316"
        strokeWidth="1"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
      <motion.line
        x1="42"
        y1="42"
        x2="28"
        y2="28"
        stroke="#f97316"
        strokeWidth="1"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      />
      {/* Outer Nodes */}
      {[
        { cx: 14, cy: 14, delay: 0 },
        { cx: 42, cy: 14, delay: 0.3 },
        { cx: 14, cy: 42, delay: 0.6 },
        { cx: 42, cy: 42, delay: 0.9 },
      ].map((node, i) => (
        <React.Fragment key={i}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#f97316"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: node.delay }}
          />
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="7"
            fill="none"
            stroke="#f97316"
            strokeWidth="0.5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: node.delay }}
          />
        </React.Fragment>
      ))}
      {/* Center Node */}
      <motion.circle
        cx="28"
        cy="28"
        r="6"
        fill="#f97316"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="28"
        cy="28"
        r="10"
        fill="none"
        stroke="#f97316"
        strokeWidth="0.5"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  </div>
);

// Pulsing Data Flow Icon
export const DataFlowIcon: React.FC<{ className?: string }> = ({
  className = "w-14 h-14",
}) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical flow lines */}
      {[16, 28, 40].map((x, i) => (
        <React.Fragment key={i}>
          <motion.line
            x1={x}
            y1="8"
            x2={x}
            y2="48"
            stroke="#f97316"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -16 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
            opacity={0.3}
          />
          {/* Moving data dots */}
          <motion.circle
            cx={x}
            r="3"
            fill="#f97316"
            initial={{ cy: 8, opacity: 0 }}
            animate={{ cy: [8, 48], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        </React.Fragment>
      ))}
      {/* Horizontal connections */}
      <motion.line
        x1="16"
        y1="20"
        x2="40"
        y2="20"
        stroke="#ffffff"
        strokeWidth="1"
        opacity={0.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="16"
        y1="36"
        x2="40"
        y2="36"
        stroke="#ffffff"
        strokeWidth="1"
        opacity={0.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </svg>
  </div>
);

// Rotating Gear/Processing Icon
export const ProcessingIcon: React.FC<{ className?: string }> = ({
  className = "w-14 h-14",
}) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g
        style={{ originX: "50%", originY: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {/* Gear teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 28 + Math.cos(rad) * 16;
          const y1 = 28 + Math.sin(rad) * 16;
          const x2 = 28 + Math.cos(rad) * 22;
          const y2 = 28 + Math.sin(rad) * 22;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle
          cx="28"
          cy="28"
          r="14"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
        />
      </motion.g>
      {/* Center pulse */}
      <motion.circle
        cx="28"
        cy="28"
        r="5"
        fill="#f97316"
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);
