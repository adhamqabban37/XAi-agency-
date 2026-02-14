import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FloatingShape {
  size: number;
  x: string;
  y: string;
  color: string;
  speed: number;
  blur: number;
  opacity: number;
  delay: number;
}

// Large atmospheric glass orbs
const shapes: FloatingShape[] = [
  {
    size: 280,
    x: "8%",
    y: "15%",
    color: "rgba(34, 211, 238, 0.08)",
    speed: 0.3,
    blur: 60,
    opacity: 0.6,
    delay: 0,
  },
  {
    size: 200,
    x: "75%",
    y: "25%",
    color: "rgba(59, 130, 246, 0.08)",
    speed: 0.5,
    blur: 50,
    opacity: 0.5,
    delay: 0.5,
  },
  {
    size: 160,
    x: "60%",
    y: "55%",
    color: "rgba(139, 92, 246, 0.06)",
    speed: 0.2,
    blur: 40,
    opacity: 0.4,
    delay: 1,
  },
  {
    size: 240,
    x: "20%",
    y: "70%",
    color: "rgba(34, 211, 238, 0.06)",
    speed: 0.4,
    blur: 55,
    opacity: 0.5,
    delay: 1.5,
  },
  {
    size: 120,
    x: "85%",
    y: "80%",
    color: "rgba(59, 130, 246, 0.07)",
    speed: 0.6,
    blur: 35,
    opacity: 0.4,
    delay: 2,
  },
  {
    size: 180,
    x: "45%",
    y: "35%",
    color: "rgba(139, 92, 246, 0.05)",
    speed: 0.35,
    blur: 45,
    opacity: 0.35,
    delay: 0.8,
  },
];

// Bokeh particle configuration
interface BokehParticle {
  x: number; // percentage
  y: number; // percentage
  size: number;
  color: string;
  speed: number;
  pulseDelay: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
}

const BOKEH_COLORS = [
  "rgba(34, 211, 238, 0.25)", // cyan
  "rgba(59, 130, 246, 0.2)", // blue
  "rgba(139, 92, 246, 0.18)", // violet
  "rgba(34, 211, 238, 0.15)", // cyan lighter
  "rgba(99, 102, 241, 0.2)", // indigo
];

function generateBokeh(count: number): BokehParticle[] {
  const particles: BokehParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 8,
      color: BOKEH_COLORS[i % BOKEH_COLORS.length],
      speed: 0.1 + Math.random() * 0.5,
      pulseDelay: Math.random() * 4,
      driftX: -20 + Math.random() * 40,
      driftY: -15 + Math.random() * 30,
      driftDuration: 10 + Math.random() * 15,
    });
  }
  return particles;
}

const GlassShape: React.FC<{ shape: FloatingShape }> = ({ shape }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, -500 * shape.speed]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: shape.x,
        top: shape.y,
        width: shape.size,
        height: shape.size,
        y,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: shape.opacity,
        scale: 1,
        x: [0, 15, -10, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay: shape.delay },
        scale: { duration: 1.5, delay: shape.delay },
        x: {
          duration: 12 + shape.delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 15 + shape.delay * 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
          backdropFilter: `blur(${shape.blur}px)`,
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: `0 0 ${shape.blur}px ${shape.color}`,
        }}
      />
    </motion.div>
  );
};

const BokehNode: React.FC<{ particle: BokehParticle }> = ({ particle }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, -300 * particle.speed]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        y,
      }}
      animate={{
        x: [0, particle.driftX, -particle.driftX * 0.5, 0],
        y: [0, particle.driftY, -particle.driftY * 0.7, 0],
        scale: [1, 1.4, 0.8, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: particle.driftDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: particle.pulseDelay,
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        }}
      />
    </motion.div>
  );
};

// Subtle data-flow connection lines between random points
const DataFlowLine: React.FC<{
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  color: string;
  delay: number;
  duration: number;
}> = ({ x1, y1, x2, y2, color, delay, duration }) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={color}
    strokeWidth="0.5"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: [0, 1, 0], opacity: [0, 0.15, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export const GlassmorphismBackground: React.FC = () => {
  const bokehParticles = useMemo(() => generateBokeh(30), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Layer 1: Large atmospheric glass orbs (deepest, slowest) */}
      {shapes.map((shape, index) => (
        <GlassShape key={`glass-${index}`} shape={shape} />
      ))}

      {/* Layer 2: Data flow connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <DataFlowLine
          x1="10%"
          y1="20%"
          x2="35%"
          y2="40%"
          color="rgba(34,211,238,0.3)"
          delay={0}
          duration={6}
        />
        <DataFlowLine
          x1="65%"
          y1="15%"
          x2="85%"
          y2="45%"
          color="rgba(139,92,246,0.25)"
          delay={2}
          duration={7}
        />
        <DataFlowLine
          x1="40%"
          y1="60%"
          x2="70%"
          y2="80%"
          color="rgba(59,130,246,0.2)"
          delay={3.5}
          duration={8}
        />
        <DataFlowLine
          x1="20%"
          y1="75%"
          x2="50%"
          y2="55%"
          color="rgba(34,211,238,0.2)"
          delay={1}
          duration={5.5}
        />
        <DataFlowLine
          x1="75%"
          y1="65%"
          x2="90%"
          y2="30%"
          color="rgba(139,92,246,0.18)"
          delay={4}
          duration={6.5}
        />
      </svg>

      {/* Layer 3: Bokeh particles (closest, fastest parallax) */}
      {bokehParticles.map((particle, index) => (
        <BokehNode key={`bokeh-${index}`} particle={particle} />
      ))}
    </div>
  );
};
