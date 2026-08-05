import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Layers, ShieldCheck, Droplets } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

export const Technology = () => {
  const layers = [
    { name: "UV Protective Shield", desc: "Nano-coating against extreme solar radiation", icon: <Sun className="w-5 h-5" /> },
    { name: "Premium Bitumen Core", desc: "Elastic structure for thermal movement", icon: <Layers className="w-5 h-5" /> },
    { name: "Reinforced Polyester", desc: "High-tensile strength for structural stress", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "Self-Adhesive Polymer", desc: "Molecular bond with the concrete surface", icon: <Droplets className="w-5 h-5" /> }
  ];

  return (
    <section id="technology" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader 
          eyebrow="The Science"
          title="Engineered Layers"
          description="A multi-barrier system designed to withstand the harshest environmental conditions on Earth."
        />
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {layers.map((layer, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex gap-6 p-6 rounded-2xl border border-brand-border bg-brand-bg-light/45 hover:bg-white hover:shadow-xl hover:border-brand-accent/20 transition-all cursor-default"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="text-brand-navy font-bold text-xl mb-1">{layer.name}</h3>
                  <p className="text-brand-muted">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="relative h-[600px] flex flex-col items-center justify-center perspective-1000">
            {/* Exploded View Visual */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ 
                  opacity: 1 - (i * 0.2), 
                  y: (i - 1.5) * 80,
                  rotateX: 60,
                  rotateZ: -20
                }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="absolute w-[80%] aspect-video rounded-lg shadow-2xl border border-brand-accent/20"
                style={{
                  background: `linear-gradient(135deg, #F0F4F8 0%, #DCE6F1 100%)`,
                }}
              >
                <div className="absolute top-4 left-4 text-xs text-brand-navy/40 font-mono">LAYER_0{i+1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
