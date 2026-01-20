
import React, { useEffect, useRef } from 'react';
import { Section } from './Section';
import { motion, useInView, animate } from 'framer-motion';

interface CounterProps {
    from: number;
    to: number;
    prefix?: string;
    suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ from, to, prefix = "", suffix = "" }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(from, to, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = prefix + value.toFixed(0) + suffix;
                    }
                },
            });
            return () => controls.stop();
        }
    }, [inView, from, to, prefix, suffix]);

    return <span ref={ref}>{prefix}{from}{suffix}</span>;
};

const stats = [
    {
        value: 21,
        prefix: "",
        suffix: "x",
        label: "Increase in conversion with 5-minute response times"
    },
    {
        value: 50,
        prefix: "",
        suffix: "%",
        label: "Reduction in manual operational labor"
    },
    {
        value: 3940,
        prefix: "",
        suffix: "%",
        label: "ROI generated in real estate beta tests"
    }
];

export const CaseStudies: React.FC = () => {
    return (
        <div className="bg-slate-900">
            <Section id="impact">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Real World Impact
                    </h2>
                    <p className="mt-6 text-lg text-slate-400">
                        Our systems are designed for one thing: delivering measurable results. Based on industry benchmarks, this is the impact you can expect.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl"
                        >
                            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </h3>
                            <p className="mt-4 text-slate-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
};
