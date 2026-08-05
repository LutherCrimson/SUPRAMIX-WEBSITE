import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

export const Projects = () => {
  const projects = [
    {
      title: "Jakarta Mass Rapid Transit",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1579727457788-51ecbd7b12cb?auto=format&fit=crop&q=80&w=1000",
      stats: "50,000 m²"
    },
    {
      title: "Sudirman Central Business District",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1541888085449-3665bc8db38f?auto=format&fit=crop&q=80&w=1000",
      stats: "Deep Basements"
    },
    {
      title: "Bali Water Reservoir",
      category: "Utility",
      image: "https://images.unsplash.com/photo-1590558117702-861c28c8deef?auto=format&fit=crop&q=80&w=1000",
      stats: "100% Water Tight"
    }
  ];

  return (
    <section id="projects" className="py-32 bg-brand-bg-light">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <SectionHeader 
            eyebrow="Portfolio"
            title="Featured Projects"
            description="Proven performance across landmark developments and critical infrastructure."
          />
          <button className="flex items-center gap-2 text-brand-accent border border-brand-accent/20 hover:bg-brand-accent hover:text-white transition-colors bg-white px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest whitespace-nowrap">
            View All Projects
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md border border-brand-border w-10 h-10 rounded-full flex items-center justify-center text-brand-navy z-20 group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-brand-border z-20">
                  <span className="text-brand-navy text-xs font-semibold uppercase tracking-wider">{project.stats}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-brand-accent text-xs font-medium uppercase tracking-widest mb-2">{project.category}</span>
                <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-accent transition-colors">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
