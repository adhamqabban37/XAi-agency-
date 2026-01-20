
import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';

const useCases = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v.01M12 12v.01M12 16v.01M12 16v.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
        ),
        title: "The 24/7 Sales Associate",
        description: "Captures and qualifies leads from any channel in under 5 minutes. Never let a hot lead go cold again."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: "The Scheduling Coordinator",
        description: "Handles all appointment booking, rescheduling, and reminders across multiple calendars to eliminate no-shows."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: "The Onboarding Specialist",
        description: "Automates user education, guides new customers through setup, and answers common questions to reduce churn."
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

export const UseCases: React.FC = () => {
    return (
        <Section id="services">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Hire Your First Digital Employee
                </h2>
                <p className="mt-6 text-lg text-slate-400">
                    Instead of buying more software, hire a digital team member trained for a specific, high-value role.
                </p>
            </div>

            <motion.div 
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
            >
                {useCases.map((useCase, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className="group relative p-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center justify-center w-14 h-14 mb-6 bg-slate-800 border border-slate-700 rounded-full text-cyan-400">
                                {useCase.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                            <p className="text-slate-400">{useCase.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};
