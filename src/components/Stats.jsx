import React from 'react';
import { motion } from 'framer-motion';

export const Stats = () => {
  return (
    <section className="py-20 border-y border-brand-border/10 bg-brand-navy">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Durability", value: "25Y+" },
            { label: "Global Projects", value: "1.2K" },
            { label: "Heat Resilience", value: "110°C" },
            { label: "Coverage", value: "15M m²" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-brand-border uppercase tracking-widest text-[10px] md:text-xs font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
