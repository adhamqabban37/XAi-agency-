import React, { useRef, useState, useCallback } from "react";

interface MouseGlowProps {
  children: React.ReactNode;
  className?: string;
  /** Glow radius in px */
  radius?: number;
  /** Glow color (CSS color string) */
  color?: string;
  /** Glow opacity 0–1 */
  opacity?: number;
}

/**
 * Wraps children in a container that renders a large, soft radial gradient
 * that follows the mouse cursor. Creates a subtle spotlight / glow effect
 * behind card grids.
 */
export const MouseGlow: React.FC<MouseGlowProps> = ({
  children,
  className = "",
  radius = 350,
  color = "rgba(249, 115, 22, 0.07)",
  opacity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {/* Radial glow that tracks mouse */}
      {glowPos && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(${radius}px circle at ${glowPos.x}px ${glowPos.y}px, ${color}, transparent 70%)`,
          }}
        />
      )}
      {/* Content renders above the glow */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
