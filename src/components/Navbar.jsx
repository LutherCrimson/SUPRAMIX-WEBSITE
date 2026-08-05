import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import logoImg from '../assets/logo.png?url';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  const navItems = ['Technology', 'Products', 'Applications', 'Projects'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl py-4 border-b border-brand-border/80' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1 relative z-50 cursor-pointer"
          >
            <img src={logoImg?.src || logoImg} alt="SUPRATAMA JAYA Logo" className="h-15 w-auto rounded-sm object-cover" />
            <span className="text-brand-navy font-bold text-xl tracking-tighter uppercase">SUPRATAMA JAYA</span>
          </a>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-brand-muted">
            {navItems.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-accent transition-colors uppercase tracking-widest">{item}</a>
            ))}
            <Button variant="primary" className="text-xs py-2 px-6">GET CONSULTATION</Button>
          </div>

          <button
            className="text-brand-navy md:hidden relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-menu"
            ref={mobileMenuRef}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-8 text-lg font-medium text-brand-muted">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-brand-navy transition-colors uppercase tracking-widest text-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8"
              >
                <Button variant="primary" className="py-4 px-8 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  GET CONSULTATION
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
