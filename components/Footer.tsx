import React from "react";
import { motion } from "framer-motion";

interface FooterProps {
  onBookSession: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookSession }) => {
  const email = "xenlixai@gmail.com";

  return (
    <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          id="contact"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ready to build your digital workforce?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-400">
            Let's discuss how a digital employee can transform your business
            operations.
          </p>
          <div className="mt-8 flex flex-col items-center space-y-4">
            <button
              onClick={onBookSession}
              className="relative inline-flex items-center justify-center bg-orange-500 text-white font-bold rounded-full px-10 py-4 text-lg hover:bg-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              Book a Strategy Session
            </button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm"
            >
              Or email us directly at:{" "}
              <a
                href={`mailto:${email}`}
                className="font-medium text-gray-400 hover:text-orange-500 transition-colors"
              >
                {email}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Xenlix AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
