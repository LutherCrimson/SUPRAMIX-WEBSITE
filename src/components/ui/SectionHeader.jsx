import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ eyebrow, title, description, centered = false }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-brand-accent font-semibold tracking-widest uppercase text-base md:text-lg block mb-4"
    >
      {eyebrow}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-6xl font-bold text-brand-navy mb-6 leading-tight"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-brand-muted text-lg md:text-xl max-w-2xl leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
);
