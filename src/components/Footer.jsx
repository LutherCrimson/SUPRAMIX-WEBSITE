import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-brand-navy border-t border-brand-border/10 py-20">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-brand-accent rounded-sm rotate-45" />
            <span className="text-white font-bold text-xl uppercase">SUPRATAMA JAYA</span>
          </div>
          <p className="text-brand-border/70 max-w-sm mb-8 leading-relaxed">
            Revolutionizing waterproofing standards with premium engineering technology. Protecting infrastructure globally for over two decades.
          </p>
          <div className="flex gap-4">
             {/* Simple social icons placeholders */}
             <div className="w-10 h-10 rounded-full border border-brand-border/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer text-white">
                <Globe className="w-4 h-4" />
             </div>
             <div className="w-10 h-10 rounded-full border border-brand-border/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer text-white">
                <ShieldCheck className="w-4 h-4" />
             </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">EXPLORE</h4>
          <ul className="space-y-4 text-brand-border/60 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">Membrane Systems</li>
            <li className="hover:text-white transition-colors cursor-pointer">Technical Diagrams</li>
            <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
            <li className="hover:text-white transition-colors cursor-pointer">Certifications</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">CONTACT</h4>
          <ul className="space-y-4 text-brand-border/60 text-sm">
            <li>Jakarta, Indonesia</li>
            <li>hello@supratamajaya.com</li>
            <li>+62 (21) 5000-TECH</li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-brand-border/10 pt-10 text-brand-border/40 text-xs uppercase tracking-widest gap-4">
        <span>© 2024 PT SUPRATAMA JAYA. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-10">
          <span className="hover:text-brand-border/80 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-brand-border/80 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);
