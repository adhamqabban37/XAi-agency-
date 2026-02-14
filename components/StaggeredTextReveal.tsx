import React from "react";
import { motion } from "framer-motion";

interface StaggeredTextRevealProps {
  text: string;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration for each letter (seconds) */
  letterDuration?: number;
  /** Stagger between letters (seconds) */
  stagger?: number;
  /** Starting letter-spacing in px */
  fromSpacing?: number;
  /** Ending letter-spacing in px */
  toSpacing?: number;
}

export const StaggeredTextReveal: React.FC<StaggeredTextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  letterDuration = 0.6,
  stagger = 0.03,
  fromSpacing = 12,
  toSpacing = 0,
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      letterSpacing: `${fromSpacing}px`,
      filter: "blur(4px)",
      y: 8,
    },
    visible: {
      opacity: 1,
      letterSpacing: `${toSpacing}px`,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: letterDuration,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  // Split text into words to allow proper wrapping
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={letterVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {/* Add space between words (except after last word) */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
};
