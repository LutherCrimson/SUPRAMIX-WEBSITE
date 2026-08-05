import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEET_CSV_URL } from '../config';
import logoImg from '../assets/logo.png?url';
import { getProductsAsync, getAboutSectionAsync, defaultAboutSection, getMaintenanceAsync, getMaintenanceSync } from '../utils/dataStore';
import MaintenanceScreen from './MaintenanceScreen';

import Icon from './ui/Icon';

export default function App() {
  // Maintenance Mode state
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
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart & Commerce UI States
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  if (maintenance && maintenance.enabled) {
    return <MaintenanceScreen config={maintenance} />;
  }

  // Cursor glowing coordinates for background parallax effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Solutions Horizontal Scroll tracking
  const [solutionsScroll, setSolutionsScroll] = useState(0);

  // Featured Product Index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Interactive Newsletter State
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  // Sticky header trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy logic for navbar active tab highlight
  useEffect(() => {
    const spySections = [
      { id: 'home', key: 'home' },
      { id: 'about', key: 'about us' },
      { id: 'vision-mission', key: 'vision & mission' },
      { id: 'products', key: 'products' }
    ];

    const handleSpyScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = spySections.length - 1; i >= 0; i--) {
        const el = document.getElementById(spySections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(spySections[i].key);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleSpyScroll, { passive: true });
    handleSpyScroll();
    return () => window.removeEventListener('scroll', handleSpyScroll);
  }, []);

  // Parallax mouse tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, pageX, pageY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Relative movement values between -0.5 and 0.5
      const moveX = (clientX / width) - 0.5;
      const moveY = (clientY / height) - 0.5;

      setMousePos({ x: pageX, y: pageY });
      setParallaxOffset({ x: moveX * 50, y: moveY * 50 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show customized toasts
  const triggerNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Pre-configured fallback products with specific bitumen and structural insulation images
  const fallbackProducts = [
    {
      id: 'therma-max-pro',
      name: 'ThermaMax Pro Ultra (R-6.5)',
      category: 'Thermal Insulation',
      price: 189,
      unit: 'pack (12 sqm)',
      rating: 4.9,
      reviews: 142,
      desc: 'Top-tier high density fiberglass batts designed with dynamic thermal fibers for extreme energy isolation in roof & wall building structures.',
      features: ['98% Radiance Deflection', 'Zero Formaldehyde', 'Class A1 Fireproof'],
      image: '/Projects/sph1.jpeg'
    },
    {
      id: 'acoustic-shield-elite',
      name: 'AcousticShield Elite-Mass',
      category: 'Acoustic Insulation',
      price: 245,
      unit: 'roll (10 sqm)',
      rating: 5.0,
      reviews: 98,
      desc: 'Engineered heavy-weight viscoelastic bitumen polymer with high density core designed to eliminate low-frequency sound & structural vibrations.',
      features: ['STC Rating 68+', 'Micro-porous structure', 'Ultra-flexible install'],
      image: '/Projects/binus1.jpeg'
    },
    {
      id: 'hydro-guard-mem-3',
      name: 'HydroGuard Super Bitumen Membrane Max-3',
      category: 'Waterproofing',
      price: 210,
      unit: 'roll (15 sqm)',
      rating: 4.8,
      reviews: 81,
      desc: 'Multi-ply APP bituminous waterproofing membrane designed for structural concrete roofs, basements, and foundation decks.',
      features: ['Zero water permeability', 'Self-healing bitumen fibers', '100% Weather Resilience'],
      image: '/products/app-sand-membrane.jpg'
    },
    {
      id: 'pyro-block-armour',
      name: 'PyroBlock Core Armor Insulation',
      category: 'Fire Protection',
      price: 279,
      unit: 'pack (8 sqm)',
      rating: 4.9,
      reviews: 119,
      desc: 'Mineral wool core composite infused with hyper-refractory crystals to withstand temperatures up to 1300°C for structural steel framing.',
      features: ['ASTM E84 Gold Standard', 'Non-toxic decomposition', 'Moisture & Fire Resistant'],
      image: '/Projects/kesehatan1.jpeg'
    }
  ];

  const [premiumProducts, setPremiumProducts] = useState(fallbackProducts);
  const [aboutData, setAboutData] = useState(defaultAboutSection);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load products & about section from dataStore & handle real-time sync
  useEffect(() => {
    const loadAllData = async () => {
      const prods = await getProductsAsync();
      const abt = await getAboutSectionAsync();
      setPremiumProducts(prods);
      if (abt) setAboutData(abt);
    };
    loadAllData();

    const handleDataChange = async () => {
      const prods = await getProductsAsync();
      const abt = await getAboutSectionAsync();
      setPremiumProducts(prods);
      if (abt) setAboutData(abt);
    };
    window.addEventListener('supramix_data_change', handleDataChange);
    return () => window.removeEventListener('supramix_data_change', handleDataChange);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  useEffect(() => {
    if (!GOOGLE_SHEET_CSV_URL) return;

    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error("Failed to fetch spreadsheet data");
        const csvText = await response.text();

        // Simple and robust CSV parser
        const lines = csvText.split('\n');
        if (lines.length <= 1) throw new Error("Spreadsheet is empty or invalid format");

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));
        const parsedProducts = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Custom parser to correctly handle quotes containing commas
          const values = [];
          let insideQuote = false;
          let currentValue = '';

          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
              insideQuote = !insideQuote;
            } else if (char === ',' && !insideQuote) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue.trim());

          if (values.length < headers.length) continue;

          const row = {};
          headers.forEach((header, index) => {
            let val = values[index] || '';
            // Clean outer quotes from values
            if (val.startsWith('"') && val.endsWith('"')) {
              val = val.substring(1, val.length - 1);
            }
            row[header] = val;
          });

          if (!row.id || !row.name) continue;

          parsedProducts.push({
            id: row.id,
            name: row.name,
            category: row.category || 'Insulation',
            price: parseFloat(row.price) || 0,
            unit: row.unit || 'pack',
            rating: parseFloat(row.rating) || 5.0,
            reviews: parseInt(row.reviews) || 0,
            desc: row.desc || '',
            features: row.features ? row.features.split(';').map(f => f.trim()).filter(Boolean) : [],
            image: row.image || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600'
          });
        }

        if (parsedProducts.length > 0) {
          setPremiumProducts(parsedProducts);
        }
      } catch (err) {
        console.error("Error loading products from Google Sheets, using fallback:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const solutions = [
    {
      title: 'Thermal Insulation',
      tagline: 'ThermoMax-6.5 Carbon Series',
      desc: 'Lock ambient comfort inside. Mitigate high energy exchange with non-settling molecular fiber batts designed to drop cooling/heating loads by up to 52%.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
      specs: ['R-Value up to 8.0', '100% Recyclable Glass Matrix', 'Guaranteed Lifetime Shape Memory']
    },
    {
      title: 'Acoustic Soundproofing',
      tagline: 'SilentSymphony Acoustic Matrix',
      desc: 'Create an absolute sanctuary. High-density viscoelastic sheets absorb structural vibration, mid-range noise, and harsh low-frequency rumbles.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      specs: ['45dB Pure Reduction', 'Class Zero Smoke Emission', 'Hypoallergenic Zero-Binder Form']
    },
    {
      title: 'Advanced Waterproofing',
      tagline: 'ElastoDry Multi-Layer Membrane',
      desc: 'High-performance crystalline elastomeric membrane that responds dynamically to temperature, remaining pliable down to -40°C.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      specs: ['100% Water Tightness (6 Bar)', 'Stretch Resilience > 400%', 'UV Radiation Deflecting Face']
    },
    {
      title: 'Fire Protection Shield',
      tagline: 'PyroShield Structural Armor',
      desc: 'State-of-the-art mineral wool structural slabs designed to provide ultimate passive fire resistance for heavy steel framing and timber assemblies.',
      image: 'https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&q=80&w=1200',
      specs: ['4-Hour Certified Boundary', 'Zero Toxic Fume Outgassing', 'Non-combustible A1 Classification']
    },
    {
      title: 'Roof Solutions',
      tagline: 'OmniClimate Vented Shielding',
      desc: 'Unified sub-roof ventilation panels combined with multi-barrier insulation sheets to optimize thermal flow and prevent moisture build-up.',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
      specs: ['Under-tile Passive Vents', 'Hailproof High Density Backing', 'Seamless Interlocking Assembly']
    }
  ];

  const testimonials = [
    {
      quote: "The Thermal Max-6.5 insulation transformed our modern concrete architectural project. Our power bill decreased immediately by 48%. Visually stunning concept, stellar execution.",
      author: "Marcus Vance",
      role: "Lead Architect, ArchiModern Studio",
      location: "San Francisco, CA",
      stars: 5,
      product: "ThermaMax Pro Ultra (R-6.5)"
    },
    {
      quote: "Absolute acoustic perfection. We built our podcast studio with the AcousticShield Elite and the silence is beautiful. Our recordings are completely isolated from nearby city subway tracks.",
      author: "Elena Rostov",
      role: "Director of Audio, SoundPod Labs",
      location: "New York City, NY",
      stars: 5,
      product: "AcousticShield Elite-Mass"
    },
    {
      quote: "Installing insulation can be a safety mess. But the zero-formaldehyde, soft-touch PyroBlock series was a delight for our construction team. Safe, super high spec, and eco-friendly.",
      author: "David K. Alvarez",
      role: "Principal Developer, Alvarez Green Homes",
      location: "Denver, CO",
      stars: 5,
      product: "PyroBlock Core Armor"
    }
  ];

  // Auto-scroll solutions every 1 second (1000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setSolutionsScroll((prev) => (prev + 1) % solutions.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [solutions.length]);

  // Cart Management
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    triggerNotification(`Added ${product.name} to dynamic cart`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // Subscribe Action
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscriberEmail.trim() || !subscriberEmail.includes('@')) {
      triggerNotification("Please enter a valid email address.");
      return;
    }
    setEmailSubscribed(true);
    triggerNotification("Subscription received! Welcome to absolute comfort.");
  };

  return (
    <div className="bg-[#FAFBFD] text-slate-900 min-h-screen font-sans selection:bg-[#0F4CFF] selection:text-white overflow-x-hidden relative">

      {/* Dynamic Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#0B1F4D] text-white border border-[#0F4CFF]/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0F4CFF] animate-ping" />
          <p className="text-sm font-semibold tracking-wide">{notification}</p>
        </div>
      )}

      {/* STICKY LUXURY HEADER (Rockal / Supramix Style) */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 bg-[#0D1A3B]/95 backdrop-blur-md border-b border-white/10 ${scrolled ? 'py-2 shadow-md shadow-black/20' : 'py-3.5'
        }`}>
        <div className="max-w-375 mx-auto px-6 flex flex-col gap-3">

          {/* Row 1: Logo and Desktop Navigation */}
          <div className="flex items-center justify-between gap-6">

            {/* Logo: Supramix / Bitumen And Membrane */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 group shrink-0 cursor-pointer"
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
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-white mt-0.5 font-bold block">
                  BITUMEN AND MEMBRANE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-sm font-bold text-slate-300 whitespace-nowrap">
              {[
                { name: 'Home', link: '#home' },
                { name: 'About Us', link: '#about' },
                { name: 'Vision & Mission', link: '#vision-mission' },
                { name: 'Products', link: '#products' },
                { name: 'Partners & Clients', link: '/clients' },
                { name: 'Our Projects', link: '/projects' },
                { name: 'Contact', link: '/contact' },
                { name: 'My Account', link: '/admin' }
              ].map((item, idx) => {
                const navKey = item.name.toLowerCase();
                const isItemActive = activeTab === navKey || (item.link.startsWith('#') && activeTab === item.link.substring(1));
                return (
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
                        if (id === 'careers') {
                          triggerNotification("Careers page is coming soon!");
                          return;
                        }
                        if (id === 'account') {
                          triggerNotification("Account section is under maintenance.");
                          return;
                        }
                        const element = document.getElementById(id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                        setActiveTab(id);
                      } else {
                        setActiveTab(navKey);
                      }
                    }}
                    className={`hover:text-white transition-colors py-1.5 relative whitespace-nowrap ${isItemActive ? 'text-white font-extrabold' : ''
                      }`}
                  >
                    {item.name}
                    {isItemActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F4CFF]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
              {/* Language toggle matching user image */}
              <div
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-3 py-1.5 rounded-xl cursor-pointer transition-colors text-white text-xs font-black select-none"
                onClick={() => triggerNotification("Language is set to English (UK)")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-3 object-cover rounded-xs shadow-sm shrink-0">
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

              {/* Admin Account Icon Button */}
              <a
                href="/admin"
                className="p-1.5 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-full transition-colors flex items-center justify-center"
                title="Admin Control Panel"
              >
                <Icon name="account" className="w-5 h-5 stroke-[2.5]" />
              </a>

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
              { name: 'Home', link: '#home' },
              { name: 'About Us', link: '#about' },
              { name: 'Vision & Mission', link: '#vision-mission' },
              { name: 'Products', link: '#products' },
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
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  setActiveTab(item.name.toLowerCase());
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-3 object-cover rounded-xs shadow-sm shrink-0">
                  <rect width="50" height="30" fill="#012169" />
                  <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6" />
                  <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4" />
                  <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10" />
                  <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6" />
                </svg>
                <span>English</span>
              </div>
              <a
                href="/admin"
                className="w-full text-center bg-emerald-600 text-white py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔒 ADMIN DASHBOARD
              </a>
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

      {/* INTERACTIVE SHOPPING CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Icon name="cart" className="w-6 h-6 text-[#0F4CFF]" />
                  <h3 className="font-bold text-xl text-[#0B1F4D]">Interactive Cart</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <Icon name="close" className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="text-slate-400 font-medium mb-4">Your current estimate/cart is empty</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.location.hash = '#products';
                    }}
                    className="px-6 py-2.5 bg-linear-to-r from-[#0F4CFF] to-[#4E7DFF] text-white text-xs font-bold rounded-full"
                  >
                    Browse Materials
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <p className="font-bold text-sm text-[#0B1F4D]">{item.name}</p>
                        <p className="text-xs text-slate-500">Unit: {item.unit}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="px-2 py-0.5 bg-slate-200 text-xs rounded"
                            onClick={() => {
                              if (item.qty > 1) {
                                setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty - 1 } : c));
                              } else {
                                removeFromCart(item.id);
                              }
                            }}
                          >
                            -
                          </button>
                          <span className="text-xs font-bold">{item.qty}</span>
                          <button
                            className="px-2 py-0.5 bg-slate-200 text-xs rounded"
                            onClick={() => setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-red-500 font-semibold hover:underline mt-1 block"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-slate-500">Total Selected Items</span>
                  <span className="font-bold text-xl text-[#0B1F4D]">{cart.reduce((acc, item) => acc + item.qty, 0)} items</span>
                </div>
                <button
                  onClick={() => {
                    const itemsList = cart.map((item, idx) => `${idx + 1}. *${item.name}* (${item.qty} ${item.unit})`).join('%0A');
                    const message = `Halo SUPRAMIX, saya ingin konsultasi & pesan daftar produk berikut:%0A${itemsList}`;
                    window.open(`https://wa.me/6289664466963?text=${message}`, '_blank');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mb-2"
                >
                  Kirim Inquiry via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-36 pb-12 overflow-hidden bg-[#070D1F]">

        {/* Dynamic Background Image & Subtle Particle Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Projects/sunter1.jpeg"
            alt="Luxury Modern Architecture"
            className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-[10s] hover:scale-100"
            onError={(e) => { e.currentTarget.src = '/Projects/kesehatan3.jpeg'; }}
          />
          {/* Gradient Overlays for Cinematic Atmosphere */}
          <div className="absolute inset-0 bg-linear-to-b from-[#070D1F]/90 via-[#0B1F4D]/70 to-[#070D1F]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0F4CFF]/10 to-transparent" />
        </div>

        {/* Dynamic Glowing Mouse Follower (Simulates Custom Dynamic Depth) */}
        <div
          className="absolute top-0 left-0 pointer-events-none w-150 h-150 rounded-full bg-[#0F4CFF]/15 blur-[120px] mix-blend-screen transition-transform duration-300 ease-out z-0 hidden md:block"
          style={{
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          }}
        />

        {/* Hero Contents */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white flex flex-col items-center">

          {/* Premium Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in-down">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-[#4E7DFF] uppercase">The Science of Ultimate Insulation</span>
          </div>

          {/* High-Impact Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-none mb-6 max-w-5xl">
            Waterproofing <span className="bg-clip-text text-transparent bg-linear-to-r from-[#0F4CFF] via-[#4E7DFF] to-white">Solution</span> <br />
            For A Better Home.
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-normal">
            For All Waterproofing Solution <br /> Super Bitumen mix
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#products"
              className="px-8 py-4 w-full sm:w-auto rounded-full text-sm font-bold bg-linear-to-r from-[#0F4CFF] to-[#4E7DFF] hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 tracking-wider flex items-center justify-center gap-2"
            >
              Shop Materials
              <Icon name="arrowRight" className="w-4 h-4" />
            </a>
            <a
              href="#solutions"
              className="px-8 py-4 w-full sm:w-auto rounded-full text-sm font-bold bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 tracking-wider flex items-center justify-center gap-2"
            >
              Explore Solutions
            </a>
          </div>



        </div>

        {/* Elegant Bottom Transition Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-1">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-15 fill-[#FAFBFD]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,91.33,26.49,173.39,46,258,68.21,321.39,56.44Z" />
          </svg>
        </div>
      </section>
      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-black tracking-widest text-[#0F4CFF] uppercase bg-blue-50 px-4 py-1.5 rounded-full">
                {aboutData.badge_text || 'About Us'}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0B1F4D] tracking-tight mt-6 mb-8 leading-tight">
                {aboutData.title || 'Supramix Technology of Insulating Material'}
              </h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium mb-8">
                {aboutData.description || 'Supramix is a leading manufacturer and distributor established in 2019 focusing in Bituminous products, waterproofing membranes, and polymer insulation solutions.'}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-[#0B1F4D]">
                    {aboutData.stat1_number || '2019'}
                  </h4>
                  <p className="text-slate-700 text-base font-semibold mt-1">
                    {aboutData.stat1_label || 'Established Foundation'}
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-[#0F4CFF]">
                    {aboutData.stat2_number || '100%'}
                  </h4>
                  <p className="text-slate-700 text-base font-semibold mt-1">
                    {aboutData.stat2_label || 'Indonesia Coverage'}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-105 group border border-slate-200">
              <img
                src={aboutData.image_url || '/products/app-sand-membrane.jpg'}
                alt={aboutData.image_caption || 'Bitumen Waterproofing Membrane Application'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.currentTarget.src = '/Projects/kesehatan1.jpeg'; }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B1F4D]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  {aboutData.image_badge || 'Building Structure Application'}
                </p>
                <p className="text-base font-semibold text-white">
                  {aboutData.image_caption || 'APP Bituminous Waterproofing Membrane Roll on Concrete Deck'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED OUR VISION & OUR MISSION SECTION (Symmetrical 2-Column Grid) */}
      <section id="vision-mission" className="py-24 bg-slate-50 border-y border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#0F4CFF] uppercase bg-blue-50 px-4 py-1.5 rounded-full">Core Foundation</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B1F4D] tracking-tight mt-4 mb-6">
              Our Vision & Our Mission
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
              Driving innovation, technical literacy, and premium bitumen waterproofing standards across Indonesia's construction industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Our Vision */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between h-full group">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#070D1F] border border-blue-500/30 p-2.5 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform shrink-0">
                    <img src={logoImg?.src || logoImg} alt="SUPRAMIX Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest text-[#0F4CFF] uppercase bg-blue-50 px-3 py-1 rounded-full">Our Vision</span>
                    <h3 className="text-xl md:text-2xl font-black text-[#0B1F4D] mt-1">One-Stop Bitumen Solution</h3>
                  </div>
                </div>

                <p className="text-slate-800 text-base md:text-lg leading-relaxed font-medium mb-8">
                  To be the premier one-stop solution for high-grade bitumen products and advanced waterproofing membranes with curated, uncompromising quality across all regions in Indonesia.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3 text-base font-semibold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Curated Premium Bituminous Standards</span>
                </div>
                <div className="flex items-center gap-3 text-base font-semibold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Nationwide Island Distribution Network</span>
                </div>
                <div className="flex items-center gap-3 text-base font-semibold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Sustainable Structural Protection</span>
                </div>
              </div>
            </div>

            {/* Card 2: Our Mission */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between h-full group">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#070D1F] border border-blue-500/30 p-2.5 flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform shrink-0">
                    <img src={logoImg?.src || logoImg} alt="SUPRAMIX Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest text-[#0F4CFF] uppercase bg-blue-50 px-3 py-1 rounded-full">Our Mission</span>
                    <h3 className="text-xl md:text-2xl font-black text-[#0B1F4D] mt-1">Technical Education & Awareness</h3>
                  </div>
                </div>

                <p className="text-slate-800 text-base md:text-lg leading-relaxed font-medium mb-8">
                  Educating all stakeholders about specialized waterproofing solutions, raising technical awareness and decision-making capabilities through comprehensive training systems provided onsite, offsite, and online.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3 text-base font-semibold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span>Onsite & Offsite Stakeholder Training</span>
                </div>
                <div className="flex items-center gap-3 text-base font-semibold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span>Expert Technical Application Support</span>
                </div>
                <div className="flex items-center gap-3 text-base font-semibold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span>Comprehensive Online Knowledge Base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS CAROUSEL & ECO SYSTEM */}
      <section id="products" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#0F4CFF] uppercase bg-blue-50 px-4 py-1.5 rounded-full">Elite Material Inventory</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B1F4D] tracking-tight mt-4 mb-6">
              Engineered Product Architecture
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
              Select our highly engineered premium packs, optimized to block climatic flux, prevent acoustic leakage, and provide pristine passive safety.
            </p>
          </div>

          {/* Interactive Material Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loadingProducts ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between overflow-hidden animate-pulse">
                  <div>
                    <div className="h-40 bg-slate-200 rounded-2xl mb-4" />
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-5/6 mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="h-3 bg-slate-200 rounded w-2/3" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div className="space-y-2 w-1/3">
                      <div className="h-3 bg-slate-200 rounded" />
                      <div className="h-5 bg-slate-200 rounded" />
                    </div>
                    <div className="w-10 h-10 bg-slate-200 rounded-2xl" />
                  </div>
                </div>
              ))
            ) : (
              premiumProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-100 hover:border-[#0F4CFF]/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image Showcase */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Indicator Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#0B1F4D]">
                      {product.category}
                    </div>
                  </div>

                  {/* Content Core */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Stars and feedback */}
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        <Icon name="star" className="w-4 h-4" />
                        <span className="text-xs text-slate-800 font-bold">{product.rating}</span>
                        <span className="text-slate-500 text-xs font-medium">({product.reviews} reviews)</span>
                      </div>

                      {/* Features list bullet pointers */}
                      <div className="space-y-1.5 mb-6">
                        {product.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Packaging Unit</p>
                          <p className="text-xs font-extrabold text-[#0B1F4D]">
                            {product.unit}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const msg = encodeURIComponent(`Halo SUPRAMIX, saya ingin bertanya dan konsultasi mengenai produk: *${product.name}*`);
                            window.open(`https://wa.me/6289664466963?text=${msg}`, '_blank');
                          }}
                          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl active:scale-95 transition-all relative z-10 cursor-pointer shadow-md"
                          title="Tanyakan via WhatsApp"
                        >
                          <Icon name="cart" className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </section>











      {/* FOOTER SECTION */}
      <footer className="bg-[#070D1F] border-t border-white/5 text-slate-400 pt-20 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

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
                SUPRAMIX is a global manufacturer of high-performance thermal insulation, bitumen waterproofing, waterproofing membranes, acoustic insulation, and building insulation systems.
              </p>
            </div>

            {/* Products column */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Products</h4>
              <ul className="space-y-3 text-xs">
                {premiumProducts.map((prod, i) => (
                  <li key={i}>
                    <a
                      href="#products"
                      className="hover:text-white transition-colors"
                      onClick={() => triggerNotification(`Browsing specs for: ${prod.name}`)}
                    >
                      {prod.name.split(' ')[0]} Batts
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
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
            <div className="flex gap-6 items-center">
              <a href="#" className="hover:text-slate-400 transition-colors" onClick={(e) => { e.preventDefault(); triggerNotification("Showing Privacy Policy documentation."); }}>Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors" onClick={(e) => { e.preventDefault(); triggerNotification("Showing Terms of Service documentation."); }}>Terms of Service</a>
              <a href="/admin" className="text-[#0F4CFF] hover:text-white font-bold transition-colors">Admin Panel</a>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL (Quick View) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm hover:bg-slate-100 rounded-full transition-colors border border-slate-200/60 text-slate-800 cursor-pointer"
              title="Close modal"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>

            {/* Left Column: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100 relative min-h-62.5 md:min-h-100 shrink-0">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#0B1F4D] border border-slate-100">
                {selectedProduct.category}
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
              <div>
                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 text-amber-400 mb-3">
                  <Icon name="star" className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold text-slate-800">{selectedProduct.rating}</span>
                  <span className="text-slate-400 text-xs">({selectedProduct.reviews} reviews)</span>
                </div>

                {/* Product Name */}
                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">
                  {selectedProduct.name}
                </h3>

                {/* Formatted Description */}
                <div className="text-slate-700 text-base leading-relaxed mb-6 space-y-2">
                  {(() => {
                    const text = selectedProduct.desc || '';
                    // Remove raw LLM prompt introductions if present
                    const cleaned = text.replace(/^(?:bahasa\s+Inggris[^\n]*\n*|---|\s*)*/i, '').trim();
                    const lines = cleaned.split(/\n+/);
                    return lines.map((line, idx) => {
                      const trimmed = line.trim();
                      if (!trimmed) return null;
                      if (trimmed.startsWith('#')) {
                        const headerText = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
                        return (
                          <h4 key={idx} className="font-bold text-[#0B1F4D] text-sm mt-3 mb-1 uppercase tracking-wider">
                            {headerText}
                          </h4>
                        );
                      }
                      if (trimmed === '---') {
                        return <hr key={idx} className="my-2 border-slate-200" />;
                      }
                      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                      const content = parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      });
                      return (
                        <p key={idx} className="text-slate-700 text-base leading-relaxed font-medium mb-2">
                          {content}
                        </p>
                      );
                    });
                  })()}
                </div>

                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Features</p>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedProduct.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Action */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Packaging Unit</p>
                  <p className="text-lg font-bold text-[#0B1F4D]">
                    {selectedProduct.unit}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const msg = encodeURIComponent(`Halo SUPRAMIX, saya ingin bertanya dan konsultasi mengenai produk: *${selectedProduct.name}* (Kategori: ${selectedProduct.category})`);
                    window.open(`https://wa.me/6289664466963?text=${msg}`, '_blank');
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Icon name="cart" className="w-5 h-5" />
                  <span>Tanya via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
