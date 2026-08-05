import React, { useState, useEffect } from 'react';
import { Mail, Clock, Building2 } from 'lucide-react';
import logoImg from '../assets/logo.png?url';
import { getMaintenanceAsync, getMaintenanceSync } from '../utils/dataStore';
import MaintenanceScreen from './MaintenanceScreen';

import Icon from './ui/Icon';

export default function ContactApp() {
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

  // Header state placeholders
  const [wishlistCount] = useState(2);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

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

            {/* Logo: Supramix / Bitumen And Membrane */}
            <a
              href="/"
              className="flex items-center gap-1 group flex-shrink-0 cursor-pointer"
            >
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
                  className={`hover:text-white transition-colors py-1.5 relative whitespace-nowrap ${item.link === '/contact' ? 'text-white font-extrabold' : 'text-slate-300'}`}
                  onClick={(e) => {
                    if (item.link === '/admin') {
                      e.preventDefault();
                      window.location.href = '/admin';
                      return;
                    }
                    if (item.link.startsWith('#')) {
                      e.preventDefault();
                      const id = item.link.substring(1);
                      if (id === 'careers') {
                        triggerNotification("Careers page is coming soon!");
                        return;
                      }
                      if (id === 'account') {
                        triggerNotification("Account section is under maintenance.");
                        return;
                      }
                    }
                  }}
                >
                  {item.name}
                  {item.name === 'Contact' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F4CFF]" />
                  )}
                </a>
              ))}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              {/* Language toggle matching user image */}
              <div
                className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors py-1.5"
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

              {/* Search Icon button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors"
                title="Search Products"
              >
                <Icon name="search" className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* GET IN TOUCH Button */}
              <a
                href="/contact"
                className="bg-[#0F4CFF] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-5 rounded transition-colors uppercase tracking-wider shadow-sm"
              >
                GET IN TOUCH
              </a>
            </div>

            {/* Mobile Actions & Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
                title="Search Products"
              >
                <Icon name="search" className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl"
                title="Toggle Menu"
              >
                <Icon name={mobileMenuOpen ? "close" : "menu"} className="w-6 h-6" />
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0B1F4D] border-b border-white/10 p-4 shadow-xl md:hidden z-50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search Products..."
                className="w-full px-4 py-2 bg-slate-900/60 border border-white/10 rounded focus:outline-none focus:border-white/30 text-sm text-white placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => {
                  triggerNotification(`Showing results for: "${searchQuery}"`);
                  setSearchOpen(false);
                }}
                className="px-5 py-2 bg-[#0F4CFF] text-white rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Find
              </button>
            </div>
          </div>
        )}

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
                    if (id === 'careers') {
                      triggerNotification("Careers page is coming soon!");
                      return;
                    }
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
            <div className="pt-4 flex flex-col gap-4 border-t border-white/5">
              <div
                className="flex items-center gap-2 text-slate-300 hover:text-white py-2 text-sm font-bold cursor-pointer"
                onClick={() => {
                  triggerNotification("Language is set to English (UK)");
                  setMobileMenuOpen(false);
                }}
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
              <a
                href="/contact"
                className="w-full text-center bg-[#0F4CFF] text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-36 pb-12 overflow-hidden bg-[#070D1F]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&q=80&w=1920"
            alt="Supramix Technical Building"
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
            <span className="text-xs font-bold tracking-widest text-[#4E7DFF] uppercase">Technical & Project Support</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 max-w-4xl">
            Contact the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F4CFF] via-[#4E7DFF] to-white">SUPRAMIX</span> Expert
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Our technical consultants are ready to help you find the right solutions for your project's thermal insulation, waterproofing, acoustic, and fire protection needs.
          </p>
        </div>
      </section>

      {/* CORE CONTACT SECTION */}
      <section className="py-20 relative z-10 -mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">

            {/* LEFT CARD: CONTACT DETAILS */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#0B1F4D] border-b border-slate-100 pb-4 mb-6">
                  Informasi Kontak
                </h3>

                <div className="space-y-6">
                  {/* Whatsapp Detail */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.48 4.967 1.48 5.432 0 9.85-4.414 9.853-9.843.002-2.63-1.023-5.102-2.886-6.968C16.71 1.96 14.238.937 11.606.936c-5.437 0-9.857 4.417-9.86 9.848-.001 1.777.472 3.4 1.408 4.981L2.2 21.058l4.447-1.904zm12.302-7.854c-.3-.15-1.771-.875-2.046-.975-.276-.102-.476-.152-.676.152-.2.3-.776.976-.951 1.177-.176.2-.351.224-.651.075-1.203-.602-1.961-1.03-2.735-2.355-.195-.333.195-.31.558-1.033.06-.12.03-.225-.015-.326-.045-.1-.476-1.147-.651-1.572-.171-.41-.358-.353-.49-.36-.126-.007-.272-.008-.418-.008a.8.8 0 00-.58.272c-.2.2-.763.745-.763 1.817 0 1.072.78 2.106.89 2.257.11.15 1.533 2.34 3.714 3.28.518.224.922.358 1.238.459.52.165.994.142 1.368.086.417-.06 1.77-.723 2.021-1.42.25-.697.25-1.297.175-1.422-.075-.125-.275-.2-.575-.35z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Fast Response(WhatsApp)</h4>
                      <p className="text-xs text-slate-500 mt-1">Get Instant Consultation on Your Material Requirements.</p>
                      <a
                        href="https://wa.me/89664466963"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 font-extrabold text-sm hover:underline block mt-1.5 font-mono"
                      >
                        (+62) 89664466963
                      </a>
                    </div>
                  </div>

                  {/* Instagram Detail */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Instagram</h4>
                      <p className="text-xs text-slate-500 mt-1">Connect with Us on Social Media.</p>
                      <a
                        href="https://www.instagram.com/supramix_indonesia?igsh=YTNldzI4eDZ4Y3Q3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0F4CFF] font-extrabold text-sm hover:underline block mt-1.5 font-mono"
                      >
                        @supramix_indonesia
                      </a>
                    </div>
                  </div>

                  {/* Email Detail */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Contact Us via Email</h4>
                      <p className="text-xs text-slate-500 mt-1">Send Us Your Project Drawings or Request a Quotation.</p>
                      <a
                        href="mailto:supratamaatapjaya@gmail.com"
                        className="text-[#0F4CFF] font-extrabold text-sm hover:underline block mt-1.5"
                      >
                        supratamaatapjaya@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clock Detail inside first card */}
              <div className="flex items-start gap-4 pt-6 border-t border-slate-100 mt-auto">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Office Hours</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Monday -Friday: 08.00 AM - 17.00PM (WIB) <br />
                    Saturday: 08.00 AM - 12.00 PM (WIB)
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT CARD: OFFICE LOCATION */}
            <div className="bg-[#0B1F4D] text-white p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#0F4CFF]/15 blur-[50px] rounded-full pointer-events-none" />
              <div>
                <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[#4E7DFF]" />
                  Head Office
                </h3>
                <p className="text-base text-slate-300 leading-relaxed mb-6">
                  Plaza Aminta lt 5/504, Jl TB Simatupang, Lebak Bulus, Jakarta Selatan., <br />
                  Jakarta-Indonesia
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR BRANCHES SECTION */}
      <section className="py-16 bg-[#FAFBFD] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0B1F4D] mb-12">
            Our Branches
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Head Office Card */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100/50 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-[#0B1F4D]">
                Factory
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                الظهير الصحراوى العاشر من رمضان،, Cairo Governorate, Egypt
              </p>
              <p className="text-slate-500 text-sm md:text-base font-mono">

              </p>
            </div>

            {/* Workshop Card */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100/50 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-[#0B1F4D]">
                Workshop
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Jl Dipatiukur no 41, RT 01/09, Cibodas, Tangerang
              </p>
            </div>
          </div>
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
                <li>+62 896-6446-6963</li>
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
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors" onClick={(e) => { e.preventDefault(); triggerNotification("Showing Privacy Policy."); }}>Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors" onClick={(e) => { e.preventDefault(); triggerNotification("Showing Terms of Service."); }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
