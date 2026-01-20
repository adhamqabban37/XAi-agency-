
import React, { useState, useMemo, useEffect } from 'react';
import { Section } from './Section';
import { motion, useInView, animate } from 'framer-motion';

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const [prevValue, setPrevValue] = useState(0);

    useEffect(() => {
        const controls = animate(prevValue, value, {
            duration: 1,
            ease: "easeOut",
            onUpdate(latest) {
                if (ref.current) {
                    ref.current.textContent = latest.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                    });
                }
            },
            onComplete() {
                setPrevValue(value);
            }
        });
        return () => {
            controls.stop();
            setPrevValue(value);
        };
    }, [value]);

    return <span ref={ref}></span>;
};

export const ROICalculator: React.FC = () => {
    const [leads, setLeads] = useState(100);
    const [dealValue, setDealValue] = useState(5000);

    const potentialRevenue = useMemo(() => {
        const qualificationRate = 0.75; // Assumption
        const closeRate = 0.15; // Assumption
        return leads * qualificationRate * closeRate * dealValue;
    }, [leads, dealValue]);

    return (
        <Section>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Calculate Your Potential ROI
                        </h2>
                        <p className="mt-4 text-lg text-slate-400">
                            See how much revenue you could be recapturing by responding to leads instantly.
                        </p>
                        <div className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="leads" className="block text-sm font-medium text-slate-300">How many leads do you get per month?</label>
                                <input
                                    type="number"
                                    id="leads"
                                    value={leads}
                                    onChange={(e) => setLeads(Number(e.target.value))}
                                    className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="dealValue" className="block text-sm font-medium text-slate-300">What is your average deal value?</label>
                                <input
                                    type="number"
                                    id="dealValue"
                                    value={dealValue}
                                    onChange={(e) => setDealValue(Number(e.target.value))}
                                    className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center bg-slate-950/50 border border-cyan-400/20 rounded-xl p-8">
                        <p className="text-slate-400">Potential Revenue Recaptured Monthly</p>
                        <div className="my-4 text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                            <AnimatedNumber value={potentialRevenue} />
                        </div>
                        <p className="text-xs text-slate-500">
                            *Calculation based on industry-standard assumptions for increased lead qualification and close rates from instant engagement.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};
