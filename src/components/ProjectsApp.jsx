import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { getProjectsAsync } from '../utils/dataStore';
import { Building2, MapPin, Calendar, Layers, ShieldCheck, ArrowUpRight, Search, X, Icon as LucideIcon } from 'lucide-react';

export default function ProjectsApp() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const projs = await getProjectsAsync();
      setProjects(projs);
    };
    loadProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = projects.filter(proj => {
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      proj.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.materialsUsed?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 font-sans antialiased selection:bg-[#0F4CFF] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070D1F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 group flex-shrink-0 cursor-pointer">
            <img
              src={logoImg?.src || logoImg}
              alt="SUPRAMIX Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white leading-none">
                SUPRAMIX
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.08em] text-white mt-0.5 font-bold block">
                BITUMEN AND MEMBRANE
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-sm font-bold text-slate-300 whitespace-nowrap">
            {[
              { name: 'Home', link: '/' },
              { name: 'About Us', link: '/#about' },
              { name: 'Products', link: '/#products' },
              { name: 'Partners & Clients', link: '/clients' },
              { name: 'Our Projects', link: '/projects' },
              { name: 'Contact', link: '/contact' },
              { name: 'My Account', link: '/admin' }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className={`hover:text-white transition-colors py-1.5 relative whitespace-nowrap ${
                  item.link === '/projects' ? 'text-white font-extrabold' : 'text-slate-300'
                }`}
              >
                {item.name}
                {item.link === '/projects' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F4CFF]" />
                )}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {/* Language toggle */}
            <div
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-3 py-1.5 rounded-xl cursor-pointer transition-colors text-white text-xs font-black select-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-3 object-cover rounded-[2px] shadow-sm flex-shrink-0">
                <rect width="50" height="30" fill="#012169" />
                <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6" />
                <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4" />
                <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10" />
                <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6" />
              </svg>
              <span>English</span>
            </div>

            {/* GET IN TOUCH Button */}
            <a
              href="/contact"
              className="bg-[#0F4CFF] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-5 rounded transition-colors uppercase tracking-wider shadow-sm"
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <div className="w-6 h-6 flex flex-col justify-center gap-1.5"><div className="h-0.5 w-full bg-white rounded-full"></div><div className="h-0.5 w-full bg-white rounded-full"></div></div>}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0B152C] border-b border-white/10 p-6 space-y-4">
            {[
              { name: 'Home', link: '/' },
              { name: 'About Us', link: '/#about' },
              { name: 'Products', link: '/#products' },
              { name: 'Partners & Clients', link: '/clients' },
              { name: 'Our Projects', link: '/projects' },
              { name: 'Contact', link: '/contact' },
              { name: 'My Account', link: '/admin' }
            ].map((item, idx) => (
              <a key={idx} href={item.link} className="block text-slate-200 font-bold py-2 hover:text-[#0F4CFF]">
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-[#0B152C] via-[#070D1F] to-[#070D1F]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0F4CFF]/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
            <Building2 className="w-4 h-4 text-[#0F4CFF]" />
            <span className="text-xs font-bold tracking-widest text-[#4E7DFF] uppercase">Engineering Showcase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Portofolio <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F4CFF] via-[#4E7DFF] to-white">Proyek Landmark</span> SUPRAMIX
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Track Record of Commercial Infrastructure, Healthcare Facilities, Universities, and Luxury Residential Projects Utilizing SUPRAMIX Waterproofing & Thermal Insulation Systems.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="pt-8 max-w-4xl mx-auto space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari proyek, lokasi, atau material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0F4CFF] focus:ring-1 focus:ring-[#0F4CFF] transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#0F4CFF] text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID SECTION */}
      <section className="py-16 px-6 bg-[#FAFBFD] text-slate-900 rounded-t-[40px]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F4D]">Daftar Proyek Konstruksi</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Menampilkan {filteredProjects.length} proyek terdaftar</p>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-base font-bold text-slate-700">Tidak ada proyek yang sesuai pencarian.</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau pilih kategori "All".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((proj, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedProject(proj)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image Container */}
                    <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                      <img
                        src={proj.image || '/Projects/sunter1.jpeg'}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/Projects/sunter1.jpeg'; }}
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3.5 py-1 rounded-full text-xs font-bold text-[#0B1F4D] shadow-sm border border-white">
                        {proj.category || 'Infrastructure'}
                      </div>
                      <div className="absolute top-4 right-4 bg-[#0B1F4D]/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0F4CFF]" />
                        <span>{proj.year || '2023'}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#0F4CFF]" />
                          <span>{proj.location || 'Indonesia'}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F4D] group-hover:text-[#0F4CFF] transition-colors leading-snug">
                          {proj.title}
                        </h3>
                      </div>

                      {proj.clientName && (
                        <div className="inline-block bg-blue-50/70 border border-blue-100 rounded-xl px-3 py-1.5 text-xs font-bold text-[#0F4CFF]">
                          Klien: {proj.clientName}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {proj.desc}
                      </p>

                      {proj.materialsUsed && (
                        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs">
                          <Layers className="w-4 h-4 text-[#0F4CFF] flex-shrink-0" />
                          <span className="font-semibold text-slate-500">Material:</span>
                          <span className="font-bold text-[#0B1F4D] truncate">{proj.materialsUsed}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 text-right">
                    <span className="text-xs font-extrabold text-[#0F4CFF] group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                      Detail Proyek & Gambar <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur hover:bg-slate-100 rounded-full border border-slate-200 text-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100 relative flex-shrink-0">
              <img
                src={selectedProject.image || '/Projects/sunter1.jpeg'}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#0B1F4D]">
                {selectedProject.category}
              </div>
            </div>

            {/* Right Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh] text-slate-900">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#0F4CFF] uppercase tracking-wider block">
                  {selectedProject.location} • {selectedProject.year}
                </span>

                <h3 className="text-2xl font-extrabold text-[#0B1F4D]">
                  {selectedProject.title}
                </h3>

                {selectedProject.clientName && (
                  <p className="text-xs font-bold text-slate-500">
                    Klien / Kontraktor: <span className="text-[#0B1F4D]">{selectedProject.clientName}</span>
                  </p>
                )}

                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-1">Deskripsi Proyek</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedProject.desc}
                  </p>
                </div>

                {selectedProject.materialsUsed && (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 space-y-1">
                    <span className="text-xs font-extrabold uppercase text-[#0F4CFF] block">Material Terpasang:</span>
                    <p className="text-sm font-bold text-[#0B1F4D]">{selectedProject.materialsUsed}</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <a
                  href={`https://wa.me/6289664466963?text=${encodeURIComponent(`Halo SUPRAMIX, saya tertarik dengan informasi proyek: ${selectedProject.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm text-center shadow-md transition-colors"
                >
                  Konsultasi Proyek via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#070D1F] border-t border-white/10 py-12 text-slate-400 text-xs text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <p>© {new Date().getFullYear()} PT SUPRAMIX. All rights reserved. Precision Waterproofing & Insulation Systems.</p>
        </div>
      </footer>
    </div>
  );
}
