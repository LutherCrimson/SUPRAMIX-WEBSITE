import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplets, ArrowRight, Layers, Box, Zap, Clock } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { ProductModal } from './ui/ProductModal';

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "APP SAND MEMBRANE",
      description: "Industrial-grade crystalline waterproofing admixture for extreme water pressure resistance.",
      fullDescription: "APP Sand Membrane is a high-performance waterproofing membrane manufactured from APP (Atactic Polypropylene) Modified Bitumen and finished with a fine sand surface coating. It is specifically designed to provide reliable, long-term waterproofing protection for various building structures against water penetration and leakage.",
      icon: <Shield className="w-7 h-7 text-brand-accent" />,
      image: "/products/app-sand-membrane.jpg",
      category: "Membrane",
      features: ["Concrete roof waterproofing", "Basement waterproofing systems", "Concrete decks and rooftops", "Concrete gutters and drainage channels", "Wet areas such as bathrooms, balconies, and terraces", "Underground structures requiring water-resistant protection"],
      specifications: [
        { label: "Ketebalan", value: "1.5 - 2.0 mm" },
        { label: "Tekanan Air Maks.", value: "12 bar" },
        { label: "Suhu Operasi", value: "-20°C hingga +80°C" },
        { label: "Umur Pakai", value: "> 25 tahun" },
        { label: "Warna", value: "Abu-abu" },
      ],
      applications: ["Basement", "Tangki Air", "Terowongan", "Kolam Renang", "Dam & Bendungan"],
    },
    {
      name: "APP PE MEMBRANE",
      description: "High-performance flexible polymer-modified waterproofing slurry for dynamic structures.",
      fullDescription: "APP PE Membrane adalah slurry waterproofing fleksibel berbasis polimer modifikasi tinggi. Dirancang khusus untuk struktur dinamis yang mengalami pergerakan dan getaran, produk ini memiliki elastisitas superior yang mampu menjembatani retakan dan tetap mempertahankan integritas waterproofing.",
      icon: <Droplets className="w-7 h-7 text-brand-accent" />,
      image: "/products/app-pe-membrane.jpg",
      category: "Membrane",
      features: ["Superior elasticity", "Crack bridging ability", "UV resistant", "Seamless application", "Eco-friendly formula"],
      specifications: [
        { label: "Elongasi", value: "> 300%" },
        { label: "Ketebalan", value: "1.0 - 1.5 mm" },
        { label: "Daya Rekat", value: "> 1.5 MPa" },
        { label: "Ketahanan UV", value: "Excellent" },
        { label: "Warna", value: "Biru / Abu-abu" },
      ],
      applications: ["Atap & Dek", "Balkon", "Kamar Mandi", "Jembatan", "Struktur Bergerak"],
    },
    {
      name: "BASALT SPRING MEMBRANE",
      description: "High-grade polyurethane sealant for expansion and construction joints.",
      fullDescription: "Basalt Spring Membrane adalah sealant polyurethane grade tinggi yang dirancang khusus untuk sambungan ekspansi dan konstruksi. Produk ini memberikan adhesi yang sangat baik pada berbagai substrat dan mampu mengakomodasi pergerakan sambungan yang signifikan tanpa kehilangan sifat waterproofing.",
      icon: <Layers className="w-7 h-7 text-brand-accent" />,
      image: "/products/basalt-spring-membrane.jpg",
      category: "Sealant",
      features: ["Excellent adhesion", "High movement capability", "Weather resistant", "Chemical resistant", "Long-lasting flexibility"],
      specifications: [
        { label: "Tipe", value: "Polyurethane 1K" },
        { label: "Pergerakan Sambungan", value: "±25%" },
        { label: "Shore A Hardness", value: "25 - 35" },
        { label: "Skin Over Time", value: "45 - 60 menit" },
        { label: "Warna", value: "Abu-abu / Hitam" },
      ],
      applications: ["Sambungan Ekspansi", "Curtain Wall", "Fasad Bangunan", "Precast Panel", "Jalan & Jembatan"],
    },
    {
      name: "BASALT SPRING GREEN",
      description: "Advanced acrylic polymer waterproof coating for exposed structures.",
      fullDescription: "Basalt Spring Green adalah coating waterproof berbasis polimer akrilik tingkat lanjut yang dirancang untuk struktur yang terpapar langsung terhadap cuaca. Formula breathable-nya memungkinkan uap air keluar dari substrat sambil tetap memblokir penetrasi air dari luar, menjadikannya ideal untuk aplikasi eksterior.",
      icon: <Box className="w-7 h-7 text-brand-accent" />,
      image: "/products/basalt-spring-green.jpg",
      category: "Coating",
      features: ["Seamless membrane", "Reflects UV rays", "Breathable formula", "Anti-fungal properties", "Color-stable finish"],
      specifications: [
        { label: "Tipe", value: "Acrylic Polymer" },
        { label: "Coverage", value: "1.0 - 1.5 kg/m²" },
        { label: "Elongasi", value: "> 200%" },
        { label: "Reflektansi UV", value: "> 85%" },
        { label: "Warna", value: "Hijau / Putih" },
      ],
      applications: ["Dinding Eksterior", "Atap Beton", "Struktur Terpapar", "Parkir Bertingkat", "Stadion & Arena"],
    },
    {
      name: "PRIME COAT WB",
      description: "Low-viscosity epoxy injection resin for structural concrete repair.",
      fullDescription: "Prime Coat WB adalah resin injeksi epoksi viskositas rendah yang dirancang untuk perbaikan struktural beton. Produk ini memiliki kemampuan penetrasi yang dalam ke dalam retakan dan pori-pori beton, memberikan kekuatan kompresif tinggi dan menghentikan kebocoran aktif secara efektif.",
      icon: <Zap className="w-7 h-7 text-brand-accent" />,
      image: "/products/prime-coat-wb.jpg",
      category: "Repair",
      features: ["Deep penetration", "High compressive strength", "Stops active leaks", "Chemical resistant", "Excellent bonding"],
      specifications: [
        { label: "Tipe", value: "Epoxy Resin 2K" },
        { label: "Viskositas", value: "< 500 mPa·s" },
        { label: "Kuat Tekan", value: "> 60 MPa" },
        { label: "Pot Life", value: "30 - 40 menit" },
        { label: "Warna", value: "Transparan / Kuning" },
      ],
      applications: ["Perbaikan Retakan", "Injeksi Beton", "Grouting", "Penguatan Struktur", "Perbaikan Dam"],
    },
    {
      name: "COATING-PU MODIFIED",
      description: "Ultra-fast setting hydraulic cement that instantly stops running water.",
      fullDescription: "Coating-PU Modified adalah semen hidrolik setting ultra-cepat yang dirancang untuk menghentikan aliran air secara instan. Produk ini mengembang saat mengeras, menciptakan segel permanen yang ideal untuk situasi darurat waterproofing dan perbaikan kebocoran aktif dalam waktu hitungan menit.",
      icon: <Clock className="w-7 h-7 text-brand-accent" />,
      image: "/products/coating-pu-modified.jpg",
      category: "Coating",
      features: ["Sets in 1-3 minutes", "Expands as it sets", "Permanent seal", "Works underwater", "No shrinkage"],
      specifications: [
        { label: "Tipe", value: "Polyurethane Modified" },
        { label: "Setting Time", value: "1 - 3 menit" },
        { label: "Ekspansi", value: "0.05 - 0.1%" },
        { label: "Kuat Tekan", value: "> 35 MPa (28 hari)" },
        { label: "Warna", value: "Abu-abu" },
      ],
      applications: ["Kebocoran Aktif", "Shaft Elevator", "Utilitas Bawah Tanah", "Pipa & Penetrasi", "Perbaikan Darurat"],
    },
  ];

  return (
    <section id="products" className="py-32 bg-brand-bg-light">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Our Catalog"
          title="Engineered Products"
          description="Advanced formulations designed to solve the most complex waterproofing challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white border border-brand-border rounded-3xl overflow-hidden hover:border-brand-accent/30 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
            >
              {/* Product Image / Icon Area */}
              {product.image ? (
                <div className="relative w-full h-[200px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <div className="hidden w-full h-full items-center justify-center bg-brand-bg-light">
                    {product.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-border">
                    <span className="text-brand-accent text-[10px] font-semibold uppercase tracking-wider">{product.category}</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 pb-0">
                  <div className="bg-brand-bg-light w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-brand-border group-hover:border-brand-accent/85 transition-colors">
                    {product.icon}
                  </div>
                </div>
              )}

              <div className="p-8 pt-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-brand-navy mb-3 tracking-wide">{product.name}</h3>
                <p className="text-brand-muted mb-6 leading-relaxed text-sm flex-grow">{product.description}</p>

                <ul className="space-y-3 mb-6">
                  {product.features.slice(0, 3).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-sm text-brand-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-3 mt-1.5 flex-shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-sm text-brand-accent font-medium group-hover:text-brand-accent-hover transition-colors mt-auto pt-6 border-t border-brand-border">
                  View Specifications <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
