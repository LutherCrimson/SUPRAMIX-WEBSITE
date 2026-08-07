// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Lock,
  Key,
  Plus,
  Trash2,
  Edit3,
  Save,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  CheckCircle,
  FolderKanban,
  Users,
  Package,
  ShieldCheck,
  X,
  Building2,
  ExternalLink,
  ArrowLeft,
  Eye,
  EyeOff,
  Info,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getProjects,
  saveProject,
  deleteProject,
  getPartners,
  savePartner,
  deletePartner,
  getAdminPasscode,
  setAdminPasscode,
  getProductsAsync,
  saveProductAsync,
  deleteProductAsync,
  getProjectsAsync,
  saveProjectAsync,
  deleteProjectAsync,
  getPartnersAsync,
  savePartnerAsync,
  deletePartnerAsync,
  getAdminPasscodeAsync,
  setAdminPasscodeAsync,
  verifyAdminPasscodeServer,
  getAboutSectionAsync,
  saveAboutSectionAsync,
  defaultAboutSection,
  getMaintenanceAsync,
  saveMaintenanceAsync,
  defaultMaintenanceConfig,
  exportAllData,
  importAllData,
  resetAllDataToDefault,
  resetAllDataToDefaultAsync,
  isSupabaseActive
} from '../utils/dataStore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'projects', 'partners', 'about', 'maintenance', 'settings'
  const [notification, setNotification] = useState('');

  // Datasets
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [aboutForm, setAboutForm] = useState(defaultAboutSection);
  const [savingAbout, setSavingAbout] = useState(false);

  // Maintenance state
  const [maintenanceForm, setMaintenanceForm] = useState(defaultMaintenanceConfig);
  const [savingMaintenance, setSavingMaintenance] = useState(false);

  // Modals / Forms
  const [productForm, setProductForm] = useState(null); // null or object
  const [projectForm, setProjectForm] = useState(null);
  const [partnerForm, setPartnerForm] = useState(null);

  // Passcode update form
  const [newPasscode, setNewPasscode] = useState('');

  // Handle direct file upload to base64 Data URL
  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Check auth session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authSession = sessionStorage.getItem('supramix_admin_auth');
      if (authSession === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Database status
  const [isDbActive, setIsDbActive] = useState(false);

  // Load data
  const loadAllData = async () => {
    setIsDbActive(isSupabaseActive());
    const prods = await getProductsAsync();
    const projs = await getProjectsAsync();
    const parts = await getPartnersAsync();
    const aboutData = await getAboutSectionAsync();
    const maintData = await getMaintenanceAsync();
    setProducts(prods);
    setProjects(projs);
    setPartners(parts);
    if (aboutData) setAboutForm(aboutData);
    if (maintData) setMaintenanceForm(maintData);
  };

  const handleSaveAbout = async (e) => {
    if (e) e.preventDefault();
    setSavingAbout(true);
    try {
      const updated = await saveAboutSectionAsync(aboutForm);
      setAboutForm(updated);
      notify('Section About Us berhasil disimpan & diperbarui!');
    } catch (err) {
      alert('Gagal menyimpan About Section: ' + err.message);
    } finally {
      setSavingAbout(false);
    }
  };

  const handleSaveMaintenance = async (e) => {
    if (e) e.preventDefault();
    setSavingMaintenance(true);
    try {
      const updated = await saveMaintenanceAsync(maintenanceForm);
      setMaintenanceForm(updated);
      notify(`Mode Pemeliharaan ${updated.enabled ? 'AKTIF' : 'NONAKTIF'} & berhasil disimpan!`);
    } catch (err) {
      alert('Gagal menyimpan Pengaturan Maintenance Mode: ' + err.message);
    } finally {
      setSavingMaintenance(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = await verifyAdminPasscodeServer(passcodeInput);
    if (isValid) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('supramix_admin_auth', 'true');
      }
      setLoginError('');
    } else {
      setLoginError('Password / Passcode salah. Coba lagi.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('supramix_admin_auth');
    }
  };

  // --- PRODUCT HANDLERS ---
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name) return alert('Nama produk wajib diisi!');
    const featuresArr = typeof productForm.features === 'string'
      ? productForm.features.split(';').map(f => f.trim()).filter(Boolean)
      : (productForm.features || []);

    await saveProductAsync({
      ...productForm,
      price: parseFloat(productForm.price) || 0,
      rating: parseFloat(productForm.rating) || 5.0,
      reviews: parseInt(productForm.reviews) || 0,
      features: featuresArr
    });
    await loadAllData();
    setProductForm(null);
    notify('Produk berhasil disimpan!');
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      await deleteProductAsync(id);
      await loadAllData();
      notify('Produk berhasil dihapus.');
    }
  };

  // --- PROJECT HANDLERS ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title) return alert('Judul project wajib diisi!');
    await saveProjectAsync(projectForm);
    await loadAllData();
    setProjectForm(null);
    notify('Project berhasil disimpan!');
  };

  const handleDeleteProject = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus project ini?')) {
      await deleteProjectAsync(id);
      await loadAllData();
      notify('Project berhasil dihapus.');
    }
  };

  // --- PARTNER HANDLERS ---
  const handleSavePartner = async (e) => {
    e.preventDefault();
    if (!partnerForm.name) return alert('Nama mitra/klien wajib diisi!');
    await savePartnerAsync(partnerForm);
    await loadAllData();
    setPartnerForm(null);
    notify('Mitra/Klien berhasil disimpan!');
  };

  const handleDeletePartner = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus partner ini?')) {
      await deletePartnerAsync(id);
      await loadAllData();
      notify('Mitra/Klien berhasil dihapus.');
    }
  };

  // --- BACKUP & RESTORE ---
  const handleExport = () => {
    const data = exportAllData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `supramix_data_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    notify('Data berhasil di-export sebagai JSON!');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importAllData(parsed);
        await loadAllData();
        notify('Data berhasil di-import!');
      } catch (err) {
        alert('File JSON tidak valid atau rusak!');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    if (confirm('PERINGATAN: Ini akan mengisikan & mengembalikan seluruh data produk, project, dan partner ke database Supabase Cloud & Local. Lanjutkan?')) {
      await resetAllDataToDefaultAsync();
      await loadAllData();
      notify('Data telah berhasil di-inject & di-sync ke Supabase Cloud!');
    }
  };

  const handleChangePasscode = async (e) => {
    e.preventDefault();
    if (!newPasscode || newPasscode.trim().length < 4) {
      return alert('Password minimal 4 karakter!');
    }
    const res = await setAdminPasscodeAsync(newPasscode.trim());
    if (res && res.success) {
      setNewPasscode('');
      notify('Password Admin berhasil diperbarui di Supabase!');
    } else {
      alert(`Gagal menyimpan password baru: ${res?.error || 'Unknown error'}`);
    }
  };

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070D1F] flex items-center justify-center p-6 text-slate-200">
        <div className="max-w-md w-full bg-[#0B152C] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-[#0F4CFF]/20 border border-[#0F4CFF]/40 text-[#0F4CFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wide">SUPRAMIX ADMIN</h1>
            <p className="text-xs text-slate-400">Silakan masukkan password untuk mengakses Control Panel Admin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Password / Admin PIN</label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Masukkan password admin"
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0F4CFF] transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onMouseDown={() => setShowPasscode(true)}
                  onMouseUp={() => setShowPasscode(false)}
                  onMouseLeave={() => setShowPasscode(false)}
                  onTouchStart={() => setShowPasscode(true)}
                  onTouchEnd={() => setShowPasscode(false)}
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer select-none"
                  title="Tekan & tahan atau klik untuk melihat password"
                >
                  {showPasscode ? <Eye className="w-4 h-4 text-[#0F4CFF]" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0F4CFF] hover:bg-[#0F4CFF]/80 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#0F4CFF]/25 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Masuk Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <a href="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* ADMIN HEADER */}
      <header className="bg-[#0B152C] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0F4CFF] rounded-xl flex items-center justify-center text-white font-black text-lg">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold tracking-wide">SUPRAMIX</span>
                <span className="text-[10px] bg-[#0F4CFF]/20 text-[#0F4CFF] border border-[#0F4CFF]/30 font-bold px-2 py-0.5 rounded-full uppercase">Single Admin</span>
                {isDbActive ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Supabase Cloud Active
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1" title="Mode LocalStorage. Tambahkan URL & Anon Key di file .env untuk mengaktifkan Cloud Database">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    LocalStorage Mode
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Control Panel Manajemen Produk, Project & Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Website Live
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* OVERVIEW STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0B152C] border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Produk</p>
              <h3 className="text-2xl font-black text-white">{products.length}</h3>
            </div>
          </div>

          <div className="bg-[#0B152C] border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Project Showcase</p>
              <h3 className="text-2xl font-black text-white">{projects.length}</h3>
            </div>
          </div>

          <div className="bg-[#0B152C] border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Partner & Klien</p>
              <h3 className="text-2xl font-black text-white">{partners.length}</h3>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'products'
                ? 'bg-white/5 text-white border-[#0F4CFF]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Package className="w-4 h-4" />
            Produk & Deskripsi ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'projects'
                ? 'bg-white/5 text-white border-[#0F4CFF]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Project Hasil Produk ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'partners'
                ? 'bg-white/5 text-white border-[#0F4CFF]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            Partner & Klien ({partners.length})
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'about'
                ? 'bg-white/5 text-white border-[#0F4CFF]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Info className="w-4 h-4" />
            Tentang Kami (About Section)
          </button>

          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 relative ${
              activeTab === 'maintenance'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            Mode Pemeliharaan (Maintenance)
            {maintenanceForm.enabled && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'settings'
                ? 'bg-white/5 text-white border-[#0F4CFF]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Key className="w-4 h-4" />
            Pengaturan & Backup
          </button>
        </div>

        {/* TAB 1: PRODUK MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">Daftar Produk</h2>
                <p className="text-xs text-slate-400">Kelola katalog produk, deskripsi, harga, dan gambar.</p>
              </div>
              <button
                onClick={() => setProductForm({
                  id: '',
                  name: '',
                  category: 'Thermal Insulation',
                  price: 0,
                  unit: 'pack',
                  rating: 5.0,
                  reviews: 0,
                  desc: '',
                  features: '',
                  image: ''
                })}
                className="bg-[#0F4CFF] hover:bg-[#0F4CFF]/80 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#0F4CFF]/20"
              >
                <Plus className="w-4 h-4" />
                Tambah Produk Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-[#0B152C] border border-white/10 rounded-2xl overflow-hidden shadow-sm hover:border-white/20 transition-all flex flex-col justify-between">
                  <div>
                    {prod.image && (
                      <div className="h-44 bg-slate-800 overflow-hidden relative">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-[#070D1F]/80 backdrop-blur-md text-[#0F4CFF] border border-[#0F4CFF]/30 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                          {prod.category}
                        </span>
                      </div>
                    )}
                    <div className="p-5 space-y-3">
                      <h3 className="font-extrabold text-white text-base leading-snug">{prod.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{prod.desc}</p>
                      
                      {prod.features && prod.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {prod.features.slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                        <span className="text-emerald-400 font-extrabold">${prod.price} <span className="text-slate-400 font-normal">/{prod.unit}</span></span>
                        <span className="text-slate-400">Rating: ⭐ {prod.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => setProductForm({
                        ...prod,
                        features: Array.isArray(prod.features) ? prod.features.join('; ') : prod.features
                      })}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs py-2 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs px-3 py-2 rounded-xl border border-red-500/20 transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">Project Hasil Produk</h2>
                <p className="text-xs text-slate-400">Kelola portofolio project pemasangan dan penggunaan produk SUPRAMIX.</p>
              </div>
              <button
                onClick={() => setProjectForm({
                  id: '',
                  title: '',
                  clientName: '',
                  category: 'Infrastructure',
                  materialsUsed: '',
                  location: 'Jakarta, Indonesia',
                  year: new Date().getFullYear().toString(),
                  desc: '',
                  image: ''
                })}
                className="bg-[#0F4CFF] hover:bg-[#0F4CFF]/80 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#0F4CFF]/20"
              >
                <Plus className="w-4 h-4" />
                Tambah Project Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-[#0B152C] border border-white/10 rounded-2xl overflow-hidden shadow-sm hover:border-white/20 transition-all flex flex-col justify-between">
                  <div>
                    {proj.image && (
                      <div className="h-48 bg-slate-800 overflow-hidden relative">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-[#070D1F]/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                          {proj.category}
                        </span>
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <div>
                        <span className="text-[11px] text-slate-400 font-semibold">{proj.clientName} ({proj.year})</span>
                        <h3 className="font-extrabold text-white text-lg leading-snug">{proj.title}</h3>
                      </div>
                      
                      <p className="text-xs text-slate-400 leading-relaxed">{proj.desc}</p>
                      
                      {proj.materialsUsed && (
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Material Digunakan:</span>
                          <span className="text-xs text-[#0F4CFF] font-semibold">{proj.materialsUsed}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => setProjectForm(proj)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs py-2 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Project
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs px-3 py-2 rounded-xl border border-red-500/20 transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PARTNERS MANAGEMENT */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">Partner & Klien</h2>
                <p className="text-xs text-slate-400">Kelola daftar perusahaan mitra, instansi, dan klien resmi SUPRAMIX.</p>
              </div>
              <button
                onClick={() => setPartnerForm({
                  id: '',
                  name: '',
                  shortName: '',
                  sector: 'Construction',
                  description: '',
                  logo: '',
                  website: '#'
                })}
                className="bg-[#0F4CFF] hover:bg-[#0F4CFF]/80 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#0F4CFF]/20"
              >
                <Plus className="w-4 h-4" />
                Tambah Partner Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((part) => (
                <div key={part.id} className="bg-[#0B152C] border border-white/10 rounded-2xl p-5 shadow-sm hover:border-white/20 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="h-20 bg-white/5 rounded-xl flex items-center justify-center p-3 border border-white/5">
                      {part.logo ? (
                        <img src={part.logo} alt={part.name} className="max-h-full max-w-full object-contain rounded" />
                      ) : (
                        <Building2 className="w-8 h-8 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] text-[#0F4CFF] font-bold uppercase">{part.sector}</span>
                      <h3 className="font-extrabold text-white text-base leading-snug">{part.name}</h3>
                      {part.shortName && <span className="text-xs text-slate-400">({part.shortName})</span>}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{part.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => setPartnerForm(part)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs py-2 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePartner(part.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs px-3 py-2 rounded-xl border border-red-500/20 transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Password Management */}
            <div className="bg-[#0B152C] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0F4CFF]/10 text-[#0F4CFF] rounded-xl">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Ubah Password Admin</h3>
                  <p className="text-xs text-slate-400">Ganti kata sandi utama untuk masuk ke Dashboard ini.</p>
                </div>
              </div>

              <form onSubmit={handleChangePasscode} className="space-y-4 pt-2">
                <div className="relative">
                  <input
                    type={showNewPasscode ? "text" : "password"}
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Masukkan password baru"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl pl-4 pr-12 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#0F4CFF]"
                  />
                  <button
                    type="button"
                    onMouseDown={() => setShowNewPasscode(true)}
                    onMouseUp={() => setShowNewPasscode(false)}
                    onMouseLeave={() => setShowNewPasscode(false)}
                    onTouchStart={() => setShowNewPasscode(true)}
                    onTouchEnd={() => setShowNewPasscode(false)}
                    onClick={() => setShowNewPasscode(!showNewPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer select-none"
                    title="Tekan & tahan atau klik untuk melihat password"
                  >
                    {showNewPasscode ? <Eye className="w-4 h-4 text-[#0F4CFF]" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-[#0F4CFF] hover:bg-[#0F4CFF]/80 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Password Baru
                </button>
              </form>
            </div>

            {/* Backup & Restore Data */}
            <div className="bg-[#0B152C] border border-white/10 p-6 rounded-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Backup & Restore Data</h3>
                  <p className="text-xs text-slate-400">Export data ke file JSON atau Import dari file cadangan.</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleExport}
                    className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export Backup Data (JSON)
                  </button>

                  <label className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Import Data (JSON)
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={handleReset}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset ke Data Default Bawaan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ABOUT SECTION MANAGEMENT */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#0B152C] border border-white/10 p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#0F4CFF]/10 text-[#0F4CFF] rounded-xl">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">Kelola Section About Us</h3>
                    <p className="text-xs text-slate-400">Sunting teks, statistik, dan gambar section "About Us" utama di halaman depan.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveAbout} className="space-y-4 text-xs">
                {/* Badge Text */}
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Teks Badge Atas</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.badge_text || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, badge_text: e.target.value })}
                    placeholder="Contoh: About Us"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>

                {/* Judul Utama */}
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Judul Utama (Title)</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.title || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                    placeholder="Contoh: Supramix Technology of Insulating Material"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Deskripsi Utama (Description)</label>
                  <textarea
                    rows={4}
                    required
                    value={aboutForm.description || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                    placeholder="Tulis deskripsi lengkap profil perusahaan..."
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF] leading-relaxed"
                  />
                </div>

                {/* Stat 1 & Stat 2 */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#070D1F] p-3 rounded-xl border border-white/5 space-y-2">
                    <p className="font-bold text-[#0F4CFF]">Statistik 1</p>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Angka / Nilai (ex: 2019)</label>
                      <input
                        type="text"
                        value={aboutForm.stat1_number || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, stat1_number: e.target.value })}
                        className="w-full bg-[#0B152C] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Label Keterangan</label>
                      <input
                        type="text"
                        value={aboutForm.stat1_label || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, stat1_label: e.target.value })}
                        className="w-full bg-[#0B152C] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="bg-[#070D1F] p-3 rounded-xl border border-white/5 space-y-2">
                    <p className="font-bold text-[#0F4CFF]">Statistik 2</p>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Angka / Nilai (ex: 100%)</label>
                      <input
                        type="text"
                        value={aboutForm.stat2_number || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, stat2_number: e.target.value })}
                        className="w-full bg-[#0B152C] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Label Keterangan</label>
                      <input
                        type="text"
                        value={aboutForm.stat2_label || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, stat2_label: e.target.value })}
                        className="w-full bg-[#0B152C] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Gambar URL & Upload */}
                <div className="pt-2">
                  <label className="block text-slate-400 mb-1 font-semibold">URL Gambar / Foto</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aboutForm.image_url || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, image_url: e.target.value })}
                      placeholder="/products/app-sand-membrane.jpg atau https://..."
                      className="flex-1 bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                    />
                    <label className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-2.5 rounded-xl cursor-pointer transition-colors flex items-center gap-1 shrink-0">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setAboutForm({ ...aboutForm, image_url: url }))}
                      />
                    </label>
                  </div>
                </div>

                {/* Image Badge & Caption */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Badge Gambar Overlap</label>
                    <input
                      type="text"
                      value={aboutForm.image_badge || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, image_badge: e.target.value })}
                      placeholder="Ex: Building Structure Application"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4CFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Caption / Keterangan Gambar</label>
                    <input
                      type="text"
                      value={aboutForm.image_caption || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, image_caption: e.target.value })}
                      placeholder="Ex: APP Bituminous Waterproofing Membrane Roll"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4CFF]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingAbout}
                    className="bg-[#0F4CFF] hover:bg-[#0F4CFF]/80 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingAbout ? 'Menyimpan...' : 'Simpan Perubahan Section About Us'}
                  </button>
                </div>
              </form>
            </div>

            {/* Live Visual Preview Column */}
            <div className="lg:col-span-5 bg-[#0B152C] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-slate-300 font-bold border-b border-white/10 pb-3">
                <Eye className="w-4 h-4 text-[#0F4CFF]" />
                <span>Live Visual Preview (Tampilan di Website)</span>
              </div>

              <div className="bg-white text-slate-900 p-6 rounded-2xl space-y-4 shadow-xl">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-[#0F4CFF] uppercase bg-blue-50 px-2.5 py-1 rounded-full">
                    {aboutForm.badge_text || 'About Us'}
                  </span>
                  <h4 className="text-xl font-black text-[#0B1F4D] mt-3 leading-tight">
                    {aboutForm.title || 'Judul About Us'}
                  </h4>
                  <p className="text-slate-700 text-xs leading-relaxed mt-2 font-medium">
                    {aboutForm.description || 'Deskripsi tentang perusahaan...'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-black text-[#0B1F4D] block">{aboutForm.stat1_number || '2019'}</span>
                      <span className="text-[10px] font-semibold text-slate-600">{aboutForm.stat1_label || 'Label Stat 1'}</span>
                    </div>
                    <div>
                      <span className="text-lg font-black text-[#0F4CFF] block">{aboutForm.stat2_number || '100%'}</span>
                      <span className="text-[10px] font-semibold text-slate-600">{aboutForm.stat2_label || 'Label Stat 2'}</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-md h-44 bg-slate-100 border border-slate-200">
                  <img
                    src={aboutForm.image_url || '/products/app-sand-membrane.jpg'}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/Projects/kesehatan1.jpeg'; }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1F4D]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white bg-slate-900/70 backdrop-blur-sm p-2 rounded-lg text-[10px]">
                    <p className="font-bold text-blue-400 uppercase tracking-wider text-[8px]">{aboutForm.image_badge || 'Badge'}</p>
                    <p className="font-medium text-white truncate">{aboutForm.image_caption || 'Caption'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MAINTENANCE MODE MANAGEMENT */}
        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Form */}
            <div className="lg:col-span-7 bg-[#0B152C] border border-white/10 p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">Kelola Mode Pemeliharaan (Maintenance)</h3>
                    <p className="text-xs text-slate-400">Aktifkan mode pemeliharaan untuk mengalihkan pengunjung umum ke halaman maintenance.</p>
                  </div>
                </div>
              </div>

              {/* Status Switch Toggle */}
              <div className="bg-[#070D1F] border border-white/10 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    Status Maintenance Mode
                    {maintenanceForm.enabled ? (
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                        AKTIF
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                        NONAKTIF (Website Normal)
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {maintenanceForm.enabled
                      ? 'Website publik saat ini terkunci. Hanya admin yang mengakses /admin yang dapat melihat dashboard.'
                      : 'Website dapat diakses secara penuh oleh seluruh pengunjung.'}
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={!!maintenanceForm.enabled}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <form onSubmit={handleSaveMaintenance} className="space-y-4 text-xs">
                {/* Judul Pengumuman */}
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Judul Pengumuman Maintenance</label>
                  <input
                    type="text"
                    required
                    value={maintenanceForm.title || ''}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, title: e.target.value })}
                    placeholder="Contoh: Sistem Dalam Pemeliharaan"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Pesan Penjelasan */}
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Pesan Deskripsi / Penjelasan Pengunjung</label>
                  <textarea
                    rows={4}
                    required
                    value={maintenanceForm.message || ''}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, message: e.target.value })}
                    placeholder="Tulis penjelasan pemeliharaan sistem untuk pengunjung..."
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                {/* Perkiraan Selesai & Kontak WA/Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Estimasi Waktu Selesai</label>
                    <input
                      type="text"
                      value={maintenanceForm.estimatedTime || ''}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, estimatedTime: e.target.value })}
                      placeholder="Ex: 1 - 2 Jam"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Nomor WhatsApp Support</label>
                    <input
                      type="text"
                      value={maintenanceForm.contactWhatsapp || ''}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, contactWhatsapp: e.target.value })}
                      placeholder="Ex: 6281234567890"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Email Kontak Support</label>
                    <input
                      type="text"
                      value={maintenanceForm.contactEmail || ''}
                      onChange={(e) => setMaintenanceForm({ ...maintenanceForm, contactEmail: e.target.value })}
                      placeholder="Ex: info@supramix.co.id"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingMaintenance}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingMaintenance ? 'Menyimpan...' : 'Simpan Pengaturan Maintenance Mode'}
                  </button>
                </div>
              </form>
            </div>

            {/* Live Visual Preview Column */}
            <div className="lg:col-span-5 bg-[#0B152C] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-slate-300 font-bold border-b border-white/10 pb-3">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Live Preview Tampilan Maintenance Mode</span>
              </div>

              <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-4 text-center shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  Maintenance Active
                </div>

                <h4 className="text-lg font-black text-white leading-tight">
                  {maintenanceForm.title || 'Sistem Dalam Pemeliharaan'}
                </h4>

                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  {maintenanceForm.message || 'Pesan penjelasan maintenance...'}
                </p>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 flex items-center justify-center gap-2">
                  <span className="text-slate-400">Estimasi Selesai:</span>
                  <strong className="text-emerald-400 font-semibold">{maintenanceForm.estimatedTime || '1 - 2 Jam'}</strong>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <span className="bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-[10px] px-3 py-1.5 rounded-lg font-semibold">
                    WhatsApp
                  </span>
                  <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] px-3 py-1.5 rounded-lg font-semibold">
                    Email Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT FORM MODAL */}
      {productForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B152C] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-extrabold text-white text-base">
                {productForm.id ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setProductForm(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Contoh: ThermaMax Pro Ultra"
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Kategori</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  >
                    <option value="Thermal Insulation">Thermal Insulation</option>
                    <option value="Acoustic Insulation">Acoustic Insulation</option>
                    <option value="Waterproofing">Waterproofing</option>
                    <option value="Fire Protection">Fire Protection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Harga ($ / Satuan)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Satuan Kemasan</label>
                  <input
                    type="text"
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    placeholder="Contoh: pack (12 sqm)"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Foto Produk (Upload / URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="Upload file atau paste URL"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                    />
                    <label className="bg-[#0F4CFF]/20 hover:bg-[#0F4CFF]/30 border border-[#0F4CFF]/40 text-[#0F4CFF] px-3.5 py-2.5 rounded-xl cursor-pointer font-bold text-xs flex items-center gap-1.5 shrink-0">
                      <Upload className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setProductForm({ ...productForm, image: url }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {productForm.image && (
                    <div className="mt-2 relative w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                      <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Deskripsi Produk</label>
                <textarea
                  rows={3}
                  value={productForm.desc}
                  onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
                  placeholder="Penjelasan keunggulan produk..."
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Fitur Utama (Pisahkan dengan titik koma ;)</label>
                <input
                  type="text"
                  value={productForm.features}
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                  placeholder="Zero Formaldehyde; Class A1 Fireproof; 98% Radiance Deflection"
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setProductForm(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F4CFF] text-white font-bold shadow-lg shadow-[#0F4CFF]/20"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT FORM MODAL */}
      {projectForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B152C] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-extrabold text-white text-base">
                {projectForm.id ? 'Edit Project Showcase' : 'Tambah Project Baru'}
              </h3>
              <button onClick={() => setProjectForm(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nama Project</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Contoh: Poltekes Gondangdia Project"
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Klien / Pemilik</label>
                  <input
                    type="text"
                    value={projectForm.clientName}
                    onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                    placeholder="Contoh: KEMENKES / Wijaya Karya"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Kategori Sector</label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="Contoh: Healthcare / High Rise"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Material Digunakan</label>
                  <input
                    type="text"
                    value={projectForm.materialsUsed}
                    onChange={(e) => setProjectForm({ ...projectForm, materialsUsed: e.target.value })}
                    placeholder="Contoh: Bitumen Membrane"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Foto Project (Upload / URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="Upload file atau paste URL"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                    />
                    <label className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 px-3.5 py-2.5 rounded-xl cursor-pointer font-bold text-xs flex items-center gap-1.5 shrink-0">
                      <Upload className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setProjectForm({ ...projectForm, image: url }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {projectForm.image && (
                    <div className="mt-2 relative w-24 h-20 rounded-xl overflow-hidden border border-white/10">
                      <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Deskripsi Project</label>
                <textarea
                  rows={3}
                  value={projectForm.desc}
                  onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                  placeholder="Detail pengerjaan dan hasil project..."
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setProjectForm(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F4CFF] text-white font-bold shadow-lg shadow-[#0F4CFF]/20"
                >
                  Simpan Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PARTNER FORM MODAL */}
      {partnerForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B152C] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-extrabold text-white text-base">
                {partnerForm.id ? 'Edit Partner / Klien' : 'Tambah Partner Baru'}
              </h3>
              <button onClick={() => setPartnerForm(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nama Perusahaan / Instansi</label>
                <input
                  type="text"
                  required
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  placeholder="Contoh: Ministry of Health"
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Nama Singkatan</label>
                  <input
                    type="text"
                    value={partnerForm.shortName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, shortName: e.target.value })}
                    placeholder="Contoh: KEMENKES"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Bidang / Sektor</label>
                  <input
                    type="text"
                    value={partnerForm.sector}
                    onChange={(e) => setPartnerForm({ ...partnerForm, sector: e.target.value })}
                    placeholder="Contoh: Government & Healthcare"
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Logo Partner (Upload / URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={partnerForm.logo}
                      onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })}
                      placeholder="Upload file atau paste URL"
                      className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                    />
                    <label className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-400 px-3.5 py-2.5 rounded-xl cursor-pointer font-bold text-xs flex items-center gap-1.5 shrink-0">
                      <Upload className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setPartnerForm({ ...partnerForm, logo: url }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {partnerForm.logo && (
                    <div className="mt-2 relative w-20 h-16 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-1 flex items-center justify-center">
                      <img src={partnerForm.logo} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Website (Opsional)</label>
                  <input
                    type="text"
                    value={partnerForm.website}
                    onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Deskripsi Kerjasama / Klien</label>
                <textarea
                  rows={3}
                  value={partnerForm.description}
                  onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                  placeholder="Keterangan singkat hubungan mitra..."
                  className="w-full bg-[#070D1F] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0F4CFF]"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setPartnerForm(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F4CFF] text-white font-bold shadow-lg shadow-[#0F4CFF]/20"
                >
                  Simpan Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
