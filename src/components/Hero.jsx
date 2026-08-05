import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import gambarProduk from '../assets/3d.png?url';
import 'react-rain-animation/lib/style.css';

export const Hero = () => {
  const [RainComponent, setRainComponent] = useState(null);

  useEffect(() => {
    import('react-rain-animation').then((mod) => {
      setRainComponent(() => mod.default.default || mod.default);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40">
      <div className="absolute inset-0 bg-brand-bg-light" />

      {/* Rain Animation Background */}
      {RainComponent && (
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-20">
          <RainComponent numDrops={300} />
        </div>
      )}

      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-accent/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-[120px] font-bold text-brand-navy tracking-tighter leading-[0.9] mb-8">
            SUPRATAMA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-navy">Waterproofing Membrane.</span>
          </h1>
          <p className="text-brand-muted text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light">
            PT Supratama Jaya was established to provide high-quality, carefully curated waterproofing solutions that are easily accessible to end users. We are committed to helping clients effectively address leakage issues while enhancing the durability, protection, and long-term resilience of their properties.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button variant="primary">EXPLORE TECHNOLOGY</Button>
            <Button variant="secondary">REQUEST CONSULTATION <ArrowRight className="w-4 h-4" /></Button>
          </div>
        </motion.div>

        {/* Floating Membrane Visual (Simulated 3D) */}
        <motion.div
          className="mt-20 relative h-[300px] w-full max-w-4xl mx-auto"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-light via-transparent to-transparent z-10" />
          <div className="relative w-full h-full perspective-1000 transform-gpu rotate-x-45 flex items-center justify-center">
            {/* Layers of the membrane */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-[600px] h-[400px] border border-brand-accent/15 rounded-lg shadow-2xl backdrop-blur-sm bg-center bg-cover bg-no-repeat"
                style={{
                  /* Layer 0 (teratas) akan menampilkan gambar produk, layer lainnya menjadi bayangan di bawahnya */
                  backgroundImage: i === 0 ? `url(${gambarProduk})` : 'none',
                  backgroundColor: i === 0 ? 'transparent' : 'rgba(0, 82, 204, 0.05)',
                  zIndex: 3 - i,
                  transform: `translateZ(${i * 40}px) translateY(${i * -10}px)`
                }}
              />
            ))}

          </div>
        </motion.div>
      </div>
    </section>
  );
};
