import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/trailers';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/3d-preview', label: '3D Experience' },
    { path: '/products', label: 'Products & Fleet' },
    { path: '/about-us', label: 'Engineering & Plant' },
    { path: '/contact', label: 'Contact Sales' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-20 bg-[#FFFBF7]/95 backdrop-blur-md border-b border-[#EFE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={COMPANY_INFO.logo}
                alt="Sameer Trailers"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative py-2 text-sm font-bold tracking-wide transition-colors group"
                  >
                    <span className={isActive ? 'text-[#F68722]' : 'text-[#3B3A3A] group-hover:text-[#F68722]'}>
                      {link.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F68722] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-xs font-bold text-[#3B3A3A] hover:text-[#F68722] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F68722]/10 flex items-center justify-center text-[#F68722] group-hover:bg-[#F68722] group-hover:text-white transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-mono-specs">{COMPANY_INFO.phoneDisplay}</span>
              </a>

              <Link
                to="/contact"
                className="relative px-5 py-2.5 bg-[#3B3A3A] hover:bg-[#202020] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200 active:scale-95 flex items-center gap-2 group overflow-hidden"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="p-2.5 rounded-xl bg-white border border-[#EFE8DF] text-[#F68722] active:scale-95 transition-transform"
                aria-label="Call Sameer Trailers"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#3B3A3A] text-white cursor-pointer active:scale-95 transition-transform"
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Overlay Mobile Window (Fixed on top of page, does NOT push content down) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-20 z-40 md:hidden">
            
            {/* Dark Frosted Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Slide-Down Floating Navigation Window */}
            <motion.div
              initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="relative bg-[#FFFBF7] border-b border-[#EFE8DF] shadow-2xl rounded-b-3xl overflow-hidden px-5 pt-3 pb-6 space-y-3"
            >
              <div className="space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04, ease: 'easeOut' }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-[#F68722] text-white shadow-md shadow-[#F68722]/20'
                            : 'text-[#3B3A3A] bg-white border border-[#EFE8DF] hover:bg-[#F5EFE8] active:bg-[#ECE5DC]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#736F6A]'}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Call & Quote Action inside Floating Window */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                className="pt-3 border-t border-[#EFE8DF] space-y-2"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 bg-[#F68722] text-white text-center font-bold text-xs uppercase tracking-wider rounded-xl block shadow-lg shadow-[#F68722]/25 active:scale-95 transition-transform"
                >
                  Request Factory Quotation
                </Link>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full py-3 bg-white border border-[#EFE8DF] text-[#3B3A3A] text-center font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Phone className="w-4 h-4 text-[#F68722]" />
                  <span>Call: {COMPANY_INFO.phoneDisplay}</span>
                </a>
              </motion.div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
