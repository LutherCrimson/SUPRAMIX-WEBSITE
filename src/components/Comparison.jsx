import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

export const Comparison = () => {
  const rows = [
    { feature: "Service Life", conventional: "5-10 Years", supa: "25+ Years Guaranteed" },
    { feature: "Tensile Strength", conventional: "Standard", supa: "High-Grade Reinforced" },
    { feature: "UV Resistance", conventional: "Degrades rapidly", supa: "Extreme Heat Stability" },
    { feature: "Flexibility", conventional: "Becomes brittle", supa: "Maintains elasticity at -10°C" },
    { feature: "Installation", conventional: "Torch-applied (High risk)", supa: "Cold-applied (Precision safety)" },
  ];

  return (
    <section className="py-32 bg-brand-bg">
      <div className="container mx-auto px-6">
        <SectionHeader 
          centered
          eyebrow="Comparison"
          title="The New Standard"
        />
        
        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/5 bg-brand-card/30 backdrop-blur-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-8 text-zinc-500 font-medium">Feature</th>
                <th className="p-8 text-zinc-500 font-medium">Conventional</th>
                <th className="p-8 text-white font-bold bg-brand-card">PT Supratama Jaya</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-8 text-zinc-300 font-medium">{row.feature}</td>
                  <td className="p-8 text-zinc-500">{row.conventional}</td>
                  <td className="p-8 text-white font-bold bg-brand-card/50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                      {row.supa}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
