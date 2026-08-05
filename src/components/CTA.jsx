import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const CTA = () => (
  <section className="py-40 relative overflow-hidden bg-gradient-to-br from-brand-navy to-brand-accent">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-[150px] rounded-full" />
    
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl md:text-8xl font-bold text-white mb-10 tracking-tighter">
          BUILD WITHOUT <br /> COMPROMISE.
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button variant="primary" className="bg-white text-brand-navy hover:bg-brand-bg-light hover:text-brand-navy px-12 py-4 text-lg border-white shadow-md">CONTACT US</Button>
          <Button variant="secondary" className="border-white/30 text-white hover:bg-white/10 px-12 py-4 text-lg">GET SPECIFICATION DATA</Button>
        </div>
      </motion.div>
    </div>
  </section>
);
