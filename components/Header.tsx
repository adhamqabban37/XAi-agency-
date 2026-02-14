import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const NavLink: React.FC<{
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}> = ({ children, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-slate-400 hover:text-white transition-colors duration-300"
  >
    {children}
  </a>
);

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
          <a href="#" className="flex items-center space-x-3">
            <Logo className="h-10 w-auto" />
            <span className="text-xl font-bold text-white">Xenlix</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#methodology">Process</NavLink>
            <NavLink href="#impact">Impact</NavLink>
            <NavLink href="#why-xenlix">Why Xenlix</NavLink>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-block bg-orange-500/10 text-orange-300 border border-orange-500/30 rounded-full px-6 py-2 text-sm font-medium hover:bg-orange-500/20 transition-all duration-300"
          >
            Contact Us
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              id="mobile-nav"
              className="md:hidden mt-2 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-2xl p-4"
            >
              <nav className="flex flex-col space-y-4">
                <NavLink
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </NavLink>
                <NavLink
                  href="#methodology"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Process
                </NavLink>
                <NavLink
                  href="#impact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Impact
                </NavLink>
                <NavLink
                  href="#why-xenlix"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Why Xenlix
                </NavLink>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-orange-500/10 text-orange-300 border border-orange-500/30 rounded-full px-5 py-2 text-sm font-medium hover:bg-orange-500/20 transition-colors duration-300 text-center"
                >
                  Contact Us
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
