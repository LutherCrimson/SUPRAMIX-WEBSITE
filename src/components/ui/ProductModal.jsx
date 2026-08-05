import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Ruler, Shield, ImageOff } from 'lucide-react';

export const ProductModal = ({ product, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);

  // Reset image error when product changes
  useEffect(() => {
    setImageError(false);
  }, [product]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-brand-border backdrop-blur-xl shadow-2xl shadow-brand-navy/15"
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effect */}
            <div className="absolute -top-px -left-px -right-px h-px bg-linear-to-r from-transparent via-brand-accent/30 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-brand-bg-light/80 backdrop-blur-md border border-brand-border flex items-center justify-center text-brand-navy hover:text-brand-accent hover:bg-brand-bg-light hover:border-brand-accent/20 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Product Image */}
            {product.image && !imageError ? (
              <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
                {/* Gradient overlay at bottom for smooth transition */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-navy/80 via-transparent to-transparent" />
                {/* Category badge on image */}
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="bg-white/90 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-brand-border">
                    {product.icon}
                  </div>
                  <div>
                    <span className="text-brand-accent text-[10px] font-semibold uppercase tracking-[0.2em] block">
                      {product.category || 'Waterproofing'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {product.name}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Fallback: no image or image error — show header without image */}
                <div className="p-8 pb-0">
                  <div className="flex items-start gap-5">
                    <div className="bg-brand-bg-light w-16 h-16 rounded-2xl flex items-center justify-center border border-brand-border shrink-0">
                      {product.icon}
                    </div>
                    <div className="flex-1 pr-8">
                      <span className="text-brand-accent text-xs font-semibold uppercase tracking-[0.2em] mb-1 block">
                        {product.category || 'Waterproofing'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-wide">
                        {product.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Body */}
            <div className="p-8 space-y-7">
              {/* Description */}
              <p className="text-slate-700 leading-relaxed text-base font-medium">
                {product.fullDescription || product.description}
              </p>

              {/* Key Features */}
              <div>
                <h3 className="text-sm font-semibold text-brand-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-accent" />
                  Key Applications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="flex items-center gap-3 bg-brand-bg-light border border-brand-border rounded-xl px-4 py-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                      <span className="text-sm text-brand-muted">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              {product.specifications && (
                <div>
                  <h3 className="text-sm font-semibold text-brand-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-brand-accent" />
                    Spesifikasi Teknis
                  </h3>
                  <div className="bg-brand-bg-light/60 border border-brand-border rounded-2xl overflow-hidden">
                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`flex justify-between items-center px-5 py-3.5 ${idx !== product.specifications.length - 1 ? 'border-b border-brand-border' : ''}`}
                      >
                        <span className="text-sm text-brand-muted">{spec.label}</span>
                        <span className="text-sm font-medium text-brand-navy">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications && (
                <div>
                  <h3 className="text-sm font-semibold text-brand-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-accent" />
                    Aplikasi
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-medium px-4 py-2 rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold text-sm py-3.5 px-6 rounded-xl text-center transition-colors"
                >
                  Hubungi Kami
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 bg-brand-bg-light hover:bg-brand-border border border-brand-border text-brand-navy font-medium text-sm py-3.5 px-6 rounded-xl text-center transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-px -left-px -right-px h-px bg-linear-to-r from-transparent via-brand-accent/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
