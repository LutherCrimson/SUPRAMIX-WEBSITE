import React, { useState, useEffect } from 'react';
import { Mail, Clock, Building2, Award, Users, Globe, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png?url';
import { getPartnersAsync, getProjectsAsync, getMaintenanceAsync, getMaintenanceSync } from '../utils/dataStore';
import MaintenanceScreen from './MaintenanceScreen';

export default function ClientsApp() {
  const [maintenance, setMaintenance] = useState(getMaintenanceSync());

  useEffect(() => {
    getMaintenanceAsync().then(cfg => {
      if (cfg) setMaintenance(cfg);
    });

    const handleDataChange = async () => {
      const cfg = await getMaintenanceAsync();
      if (cfg) setMaintenance(cfg);
    };
    window.addEventListener('supramix_data_change', handleDataChange);
    return () => window.removeEventListener('supramix_data_change', handleDataChange);
  }, []);

  // Navigation & Scroll State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (maintenance && maintenance.enabled) {
    return <MaintenanceScreen config={maintenance} />;
  }

  // Trigger notification toast
  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Sticky header trigger
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadDynamicData = async () => {
      const partnersList = await getPartnersAsync();
      const projectsList = await getProjectsAsync();

      const mergedClients = partnersList.map((partner) => {
        // Find related projects for this partner or fallback to all matching
        const relatedProj = projectsList.filter(p =>
          p.clientName?.toLowerCase().includes(partner.name.toLowerCase()) ||
          p.clientName?.toLowerCase().includes(partner.shortName?.toLowerCase())
        );

        const projectTitles = relatedProj.length > 0
          ? relatedProj.map(p => p.title)
          : [partner.sector || 'Commercial Project Showcase'];

        const materialsList = relatedProj.length > 0
          ? relatedProj.map(p => p.materialsUsed).filter(Boolean).join(' & ')
          : 'Waterproofing & Insulation Systems';

        return {
          id: partner.id,
          name: partner.name,
          shortName: partner.shortName || partner.name,
          sector: partner.sector || 'Partner',
          projects: projectTitles,
          materials: materialsList,
          logo: partner.logo || '/Projects/kesehatan1.jpeg',
          image: partner.logo || '/Projects/kesehatan1.jpeg',
          images: [partner.logo || '/Projects/kesehatan1.jpeg'],
          description: partner.description
        };
      });

      setClients(mergedClients);
    };

    loadDynamicData();

    const handleDataChange = () => {
      loadDynamicData();
    };
    window.addEventListener('supramix_data_change', handleDataChange);
    return () => window.removeEventListener('supramix_data_change', handleDataChange);
  }, []);

  const statistics = [
    { value: "500+", label: "Our Projects", icon: <Building2 className="w-5 h-5" /> },
    { value: "12M+", label: "Our Projects", icon: <Award className="w-5 h-5" /> },
    { value: "35+", label: "Our Projects", icon: <Globe className="w-5 h-5" /> },
    { value: "99.8%", label: "Our Projects", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-[#FAFBFD] text-slate-900 min-h-screen font-sans selection:bg-[#0F4CFF] selection:text-white overflow-x-hidden relative">

      {/* Dynamic Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#0B1F4D] text-white border border-[#0F4CFF]/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0F4CFF] animate-ping" />
          <p className="text-sm font-semibold tracking-wide">{notification}</p>
        </div>
      )}

      {/* STICKY LUXURY HEADER */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 bg-[#0D1A3B]/95 backdrop-blur-md border-b border-white/10 ${scrolled ? 'py-2 shadow-md shadow-black/20' : 'py-3.5'
        }`}>
        <div className="max-w-[1500px] mx-auto px-6 flex flex-col gap-3">

          {/* Row 1: Logo and Desktop Navigation */}
          <div className="flex items-center justify-between gap-6">

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

            {/* Desktop Navigation Links */}
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
                  onClick={(e) => {
                    if (item.link === '/admin') {
                      e.preventDefault();
                      window.location.href = '/admin';
                      return;
                    }
                    if (item.link.startsWith('#')) {
                      e.preventDefault();
                      const id = item.link.substring(1);
                      if (id === 'account') {
                        triggerNotification("Account section is under maintenance.");
                        return;
                      }
                    }
                  }}
                  className={`hover:text-white transition-colors py-1.5 relative whitespace-nowrap ${item.link === '/clients' ? 'text-white font-extrabold' : 'text-slate-300'
                    }`}
                >
                  {item.name}
                  {item.link === '/clients' && (
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
                onClick={() => triggerNotification("Language is set to English (UK)")}
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

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0B1F4D] border-b border-white/10 py-6 px-6 shadow-2xl flex flex-col gap-4 z-50">
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
                onClick={(e) => {
                  if (item.link.startsWith('#')) {
                    e.preventDefault();
                    const id = item.link.substring(1);
                    if (id === 'account') {
                      triggerNotification("Account section is under maintenance.");
                      return;
                    }
                  }
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/admin"
              className="w-full text-center bg-emerald-600 text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔒 ADMIN DASHBOARD
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-36 pb-12 overflow-hidden bg-[#070D1F]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920"
            alt="Supramix Project Portfolio"
            className="w-full h-full object-cover object-center opacity-30 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1F]/90 via-[#0B1F4D]/80 to-[#FAFBFD]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4CFF]/15 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F4CFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F4CFF]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-[#4E7DFF] uppercase">Our Trusted Partners</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 max-w-4xl">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F4CFF] via-[#4E7DFF] to-white">Prestigious</span> Clients
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Leading developers, state-owned contractors, and builders across Indonesia choose SUPRAMIX for precision-engineered waterproofing, thermal barriers, and insulation.
          </p>
        </div>
      </section>


      {/* CLIENTS GRID SECTION */}
      <section className="py-12 bg-[#FAFBFD]">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-[#0F4CFF] uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full">Project Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F4D] mt-4 mb-4">Enterprise Collaborations</h2>
            <p className="text-sm text-slate-500">Explore some of PT SUPRAMIX's notable corporate partnerships and national building projects.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {clients.map((client, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedClient(client);
                  setActiveImgIdx(0);
                }}
                className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase bg-[#0B1F4D]/5 text-[#0b1f4d] px-3 py-1 rounded-full">
                        {client.sector}
                      </span>
                      <div className="text-xs text-slate-400 font-semibold mt-2">{client.year}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1F4D] mb-1 group-hover:text-[#0F4CFF] transition-colors flex items-center gap-2">
                    {client.name}
                    <svg className="w-4 h-4 text-[#0F4CFF] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h3>
                  <p className="text-xs font-extrabold text-slate-400 mb-6 tracking-wide">{client.shortName}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Key Projects & Structures:</h4>
                      <ul className="space-y-2">
                        {client.projects.map((proj, pIdx) => (
                          <li key={pIdx} className="flex items-start text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0F4CFF] mr-2.5 mt-2 flex-shrink-0" />
                            <span>{proj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {client.materials && (
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-500 uppercase tracking-wider">Materials Supplied:</span>
                        <span className="font-bold text-[#0B1F4D] bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-50">{client.materials}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-50 text-right">
                  <span className="text-[11px] font-extrabold text-[#0F4CFF] group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                    Click to view project photo & details →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-[#0B1F4D] tracking-tight">
            Partner with the Industry Standard
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Need specifications, technical diagrams, or sample mockups for your next premium project? Our expert consultants are at your service.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0F4CFF] hover:bg-[#0036D6] text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all cursor-pointer"
          >
            Consult Our Engineering Team
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#070D1F] border-t border-white/5 text-slate-400 pt-20 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

            {/* Brand column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <img
                  src={logoImg?.src || logoImg}
                  alt="SUPRAMIX Logo"
                  className="h-8 w-auto object-contain"
                />
                <div>
                  <span className="text-base font-extrabold tracking-wider text-white">
                    SUPRAMIX
                  </span>
                  <p className="text-[8px] uppercase tracking-widest text-[#0F4CFF] font-bold">Premium Materials</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed max-w-sm">
                SUPRAMIX adalah produsen global bahan peredam panas, pelindung kedap air bitumen, membran kedap air, peredam suara, dan sistem isolasi bangunan berspesifikasi tinggi.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Material Utama</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="/#products" className="hover:text-white transition-colors">Bitumen Membrane</a></li>
                <li><a href="/#products" className="hover:text-white transition-colors">Thermal Insul Batts</a></li>
                <li><a href="/#products" className="hover:text-white transition-colors">Acoustic Viscoelastic</a></li>
                <li><a href="/#products" className="hover:text-white transition-colors">PyroBlock Core Armour</a></li>
              </ul>
            </div>

            {/* Solutions Column */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Solusi Bangunan</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="/#solutions" className="hover:text-white transition-colors">Kedap Air Foundation</a></li>
                <li><a href="/#solutions" className="hover:text-white transition-colors">Peredam Panas Dinding</a></li>
                <li><a href="/#solutions" className="hover:text-white transition-colors">Studio Soundproofing</a></li>
                <li><a href="/#solutions" className="hover:text-white transition-colors">Pasif Damkar Boundary</a></li>
              </ul>
            </div>

            {/* Technical Support Column */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Technical Support</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li>Jakarta, Indonesia</li>
                <li>supratamaatapjaya@gmail.com</li>
                <li>+6289664466963</li>
                <li className="pt-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                    Online Helpdesk
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-slate-500 gap-4">
            <span>&copy; {new Date().getFullYear()} SUPRAMIX Pty Ltd. All Rights Reserved.</span>
            <div className="flex gap-6 items-center">
              <a href="#" onClick={(e) => { e.preventDefault(); triggerNotification("Terms of Service"); }} className="hover:text-white transition-colors">Terms</a>
              <a href="#" onClick={(e) => { e.preventDefault(); triggerNotification("Privacy Policy"); }} className="hover:text-white transition-colors">Privacy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); triggerNotification("Sitemap"); }} className="hover:text-white transition-colors">Sitemap</a>
              <a href="/admin" className="text-[#0F4CFF] hover:text-white font-bold transition-colors">Admin Panel</a>
            </div>
          </div>

        </div>
      </footer>

      {/* POPUP MODAL FOR SELECTED CLIENT PREVIEW */}
      {selectedClient && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
              title="Close Preview"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hero Project Image Banner */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedClient.images?.[activeImgIdx] || selectedClient.image}
                alt={selectedClient.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-[#0F4CFF] text-white px-3 py-1 rounded-full inline-block mb-2">
                    {selectedClient.sector}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight drop-shadow-sm">{selectedClient.name}</h3>
                  <p className="text-xs text-slate-300 font-semibold">{selectedClient.shortName} • {selectedClient.year}</p>
                </div>
                {selectedClient.images && (
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                    Photo {activeImgIdx + 1} of {selectedClient.images.length}
                  </span>
                )}
              </div>
            </div>

            {/* Multiple Images Thumbnail Gallery Selector */}
            {selectedClient.images && selectedClient.images.length > 0 && (
              <div className="px-6 pt-4 pb-3 bg-slate-50 border-b border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Project Photo Gallery (Click to preview photo):</p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {selectedClient.images.map((imgUrl, iIdx) => (
                    <button
                      key={iIdx}
                      onClick={() => setActiveImgIdx(iIdx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${activeImgIdx === iIdx
                        ? 'border-[#0F4CFF] ring-2 ring-[#0F4CFF]/30 scale-105 shadow-md'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img src={imgUrl} alt={`Gallery preview ${iIdx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Body Content */}
            <div className="p-6 md:p-8 space-y-6">




              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F4CFF] hover:bg-[#0036D6] text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Consult Engineering Team
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
