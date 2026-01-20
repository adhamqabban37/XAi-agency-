
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface BookingPageProps {
  onGoBack: () => void;
}

const FormInput: React.FC<{ id: string; label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, label, type = 'text', value, onChange }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 peer"
    />
    <label
      htmlFor={id}
      className="absolute left-4 -top-3.5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm"
    >
      {label}
    </label>
  </div>
);

export const BookingPage: React.FC<BookingPageProps> = ({ onGoBack }) => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '' });
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server.
    console.log({ ...formData, message });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <button
        onClick={onGoBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to site</span>
      </button>

      <div className="w-full max-w-2xl mx-auto text-center">
        <Logo className="h-12 w-12 mx-auto mb-6" />
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-slate-900/50 border border-cyan-400/30 rounded-xl p-10"
            >
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-slate-300">Your request has been received. We will be in touch within 24 hours to schedule your strategy session.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book a Strategy Session</h1>
              <p className="text-slate-400 mb-10">Let's architect your first digital employee. Fill out the form below to get started.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <FormInput id="name" label="Full Name" value={formData.name} onChange={handleInputChange} />
                <FormInput id="company" label="Company Name" value={formData.company} onChange={handleInputChange} />
                <FormInput id="email" label="Work Email" type="email" value={formData.email} onChange={handleInputChange} />
                <div className="relative">
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder=" "
                    className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 peer"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-3.5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm"
                  >
                    Tell us about your project (optional)
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-cyan-400 text-slate-900 font-bold rounded-full px-8 py-3 text-lg hover:bg-cyan-300 transform hover:scale-105 transition-all duration-300"
                >
                  Submit Request
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
