
import React from 'react';
import { Section } from './Section';

export const Vision: React.FC = () => {
  return (
    <Section id="vision" className="relative text-center">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Building What Comes Next
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          We believe the future of work isn't about humans competing with AI, but collaborating with it. Digital employees will become as commonplace as computers, freeing human potential to focus on creativity, strategy, and innovation. Xenlix is building that future, one digital employee at a time.
        </p>
      </div>
      {/* Decorative background grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>
    </Section>
  );
};
