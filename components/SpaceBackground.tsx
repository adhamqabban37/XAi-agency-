import React, { useEffect, useRef } from "react";

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 200;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Star {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      size: number = 0;
      color: string = "";

      constructor() {
        this.reset();
      }
      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width; // Depth factor
        this.size = Math.random() * 2;
        this.color = Math.random() > 0.8 ? "#f97316" : "#ffffff";
      }
      update(speed: number) {
        if (!canvas) return;
        this.z -= speed;
        if (this.z <= 0) this.z = canvas.width;
      }
      draw() {
        if (!canvas || !ctx) return;
        const x =
          (this.x - canvas.width / 2) * (canvas.width / this.z) +
          canvas.width / 2;
        const y =
          (this.y - canvas.height / 2) * (canvas.width / this.z) +
          canvas.height / 2;
        const size = this.size * (canvas.width / this.z);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.min(1, 1 - this.z / canvas.width);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    const init = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) stars.push(new Star());
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "#010101";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Reduced speed multiplier from 0.05 to 0.002 to prevent "too fast" animation on deep scroll
      const speed = 1 + scrollYRef.current * 0.002;
      stars.forEach((s) => {
        s.update(speed);
        s.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#010101]"
    />
  );
};
