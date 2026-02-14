import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

interface BookingPageProps {
  onGoBack: () => void;
}

const FormInput: React.FC<{
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ id, label, type = "text", value, onChange, required }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      required={required}
      aria-required={required}
      autoComplete={id === "email" ? "email" : "on"}
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
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BOOKING_ENDPOINT = "/.netlify/functions/send-booking";
  const isValidEmail = (value: string) =>
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.company.trim() ||
      !isValidEmail(formData.email)
    ) {
      setError("Please complete all required fields with a valid work email.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `New Strategy Session Request from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          company: formData.company,
          message: message || "Not provided",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send your request. Please try again later.");
      }

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(
          result.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <button
        onClick={onGoBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
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
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-slate-900/50 border border-cyan-400/30 rounded-xl p-10"
            >
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-slate-300">
                Your request has been received. We will be in touch within 24
                hours to schedule your strategy session.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Book a Strategy Session
              </h1>
              <p className="text-slate-400 mb-10">
                Let's architect your first digital employee. Fill out the form
                below to get started.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <FormInput
                  id="name"
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FormInput
                  id="company"
                  label="Company Name"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <FormInput
                  id="email"
                  label="Work Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="relative">
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder=" "
                    aria-label="Tell us about your project"
                    aria-required="false"
                    autoComplete="off"
                    className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 peer"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-3.5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm"
                  >
                    Tell us about your project (optional)
                  </label>
                </div>
                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full bg-cyan-400 text-slate-900 font-bold rounded-full px-8 py-3 text-lg hover:bg-cyan-300 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
