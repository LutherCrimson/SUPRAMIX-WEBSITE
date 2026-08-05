import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Factory } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

export const Applications = () => {
  const apps = [
    { title: "Rooftop Structures", icon: <Home />, img: "https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=1000" },
    { title: "Industrial Basements", icon: <Building2 />, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" },
    { title: "Power Infrastructure", icon: <Factory />, img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000" },
    { title: "Commercial Skyscrapers", icon: <Building2 />, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" },
  ];

  return (
    <section id="applications" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader 
          eyebrow="Implementation"
          title="Universal Versatility"
          description="Engineered for high-stakes environments where structural integrity is non-negotiable."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {apps.map((app, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-brand-navy/60 z-10 group-hover:bg-brand-navy/40 transition-colors" />
              <img src={app.img} alt={app.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="text-brand-accent mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {app.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{app.title}</h3>
                <p className="text-zinc-400 text-sm group-hover:text-white transition-colors">Learn more about this application</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
