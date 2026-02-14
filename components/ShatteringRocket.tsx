import React, { useState, useEffect } from "react";

export const ShatteringRocket: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [entryComplete, setEntryComplete] = useState(false);

  // Initial Entry Animation
  useEffect(() => {
    const timer = setTimeout(() => setEntryComplete(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- ROCKET DYNAMICS ---
  const dStart = 150;
  const dEnd = 500;
  const progress = Math.min(
    1,
    Math.max(0, (scrollY - dStart) / (dEnd - dStart)),
  );

  // Autonomous patrol movement (Sine/Cosine)
  const time = Date.now() * 0.0015;
  const idleX = Math.sin(time) * 30;
  const idleY = Math.cos(time * 0.5) * 20;

  // Entry Transition (Top-Down)
  const entryY = entryComplete ? 0 : -500;

  const rocketX = entryComplete ? 75 + idleX / 10 : 75;
  const rocketY = entryComplete ? 250 + scrollY * 0.8 + idleY : entryY;
  const rocketScale = 1 - progress * 0.7;
  const rocketOpacity = 1 - progress;

  // Hide completely when scrolled far past
  if (progress >= 1) return null;

  return (
    <div
      className="fixed z-40 pointer-events-none transition-all duration-1000 ease-out"
      style={{
        left: `${rocketX}vw`,
        top: `${rocketY}px`,
        opacity: rocketOpacity,
        transform: `translate(-50%, -50%) rotate(${15 + scrollY * 0.1}deg) scale(${rocketScale})`,
      }}
    >
      <div className="relative w-24 h-40">
        {/* Hull Piece */}
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            transform: `translate(${progress * 80}px, ${progress * -40}px) rotate(${progress * 25}deg)`,
          }}
        >
          <svg
            viewBox="0 0 60 120"
            className="w-full h-full drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          >
            <path
              d="M30 5 C45 35 50 65 50 100 L10 100 C10 65 15 35 30 5"
              fill="#111"
              stroke="#444"
              strokeWidth="1"
            />
            <circle
              cx="30"
              cy="45"
              r="7"
              fill="#00ffff"
              fillOpacity="0.6"
              style={{
                transform: `translate(${progress * -150}px, ${progress * -150}px)`,
                transition: "transform 0.5s",
              }}
            />
          </svg>
        </div>

        {/* Wing Left */}
        <div
          className="absolute top-[60%] left-[-10px] w-12 h-16 transition-transform duration-700"
          style={{
            transform: `translate(${progress * -200}px, ${progress * 150}px) rotate(${progress * -120}deg)`,
          }}
        >
          <svg viewBox="0 0 30 50">
            <path d="M30 0 L0 40 L30 30 Z" fill="#f97316" />
          </svg>
        </div>

        {/* Wing Right */}
        <div
          className="absolute top-[60%] right-[-10px] w-12 h-16 transition-transform duration-700"
          style={{
            transform: `translate(${progress * 200}px, ${progress * 120}px) rotate(${progress * 120}deg)`,
          }}
        >
          <svg viewBox="0 0 30 50">
            <path d="M0 0 L30 40 L0 30 Z" fill="#f97316" />
          </svg>
        </div>

        {/* Thruster Burn */}
        <div
          className={`absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center ${progress > 0.05 ? "opacity-0" : "opacity-100"}`}
        >
          <div className="w-6 h-20 bg-gradient-to-t from-transparent via-orange-500 to-orange-200 blur-lg animate-pulse" />
          <div className="w-2 h-10 bg-white blur-sm -mt-10" />
        </div>
      </div>
    </div>
  );
};
