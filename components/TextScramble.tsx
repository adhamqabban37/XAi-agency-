import React, { useState, useEffect, useCallback } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number; // ms before starting
  speed?: number; // ms per character reveal
  scrambleSpeed?: number; // ms between scramble ticks
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = "",
  delay = 500,
  speed = 40,
  scrambleSpeed = 30,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const randomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }, []);

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    let revealedCount = 0;
    let scrambleInterval: ReturnType<typeof setInterval>;
    let revealInterval: ReturnType<typeof setInterval>;

    // Scramble effect: continuously randomize unrevealed characters
    scrambleInterval = setInterval(() => {
      const result = text
        .split("")
        .map((char, i) => {
          if (i < revealedCount) return char;
          if (char === " ") return " ";
          return randomChar();
        })
        .join("");
      setDisplayed(result);
    }, scrambleSpeed);

    // Reveal effect: gradually lock in correct characters
    revealInterval = setInterval(() => {
      revealedCount++;
      if (revealedCount > text.length) {
        clearInterval(scrambleInterval);
        clearInterval(revealInterval);
        setDisplayed(text);
      }
    }, speed);

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(revealInterval);
    };
  }, [isStarted, text, speed, scrambleSpeed, randomChar]);

  if (!isStarted) {
    // Show scrambled placeholder
    return (
      <span className={className}>
        {text.split("").map((char, i) => (
          <span key={i} className="inline-block" style={{ opacity: 0.3 }}>
            {char === " " ? "\u00A0" : randomChar()}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {displayed.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: i < text.length && displayed[i] === text[i] ? 1 : 0.5,
            color:
              i < text.length && displayed[i] === text[i]
                ? undefined
                : "#22d3ee",
            transition: "color 0.1s, opacity 0.1s",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};
