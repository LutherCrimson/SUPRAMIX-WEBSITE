// src/utils/dataStore.js
import { supabase, isSupabaseConfigured } from './supabase.js';

const KEYS = {
  PRODUCTS: 'supramix_admin_products_v1',
  PROJECTS: 'supramix_admin_projects_v1',
  PARTNERS: 'supramix_admin_partners_v1',
  PASSCODE: 'supramix_admin_passcode_v1',
  ABOUT: 'supramix_admin_about_v1',
  MAINTENANCE: 'supramix_admin_maintenance_v1',
};

export const defaultMaintenanceConfig = {
  enabled: false,
  title: 'Sistem Dalam Pemeliharaan',
  message: 'Kami sedang melakukan peningkatan performa dan pemeliharaan sistem rutin untuk memberikan pengalaman terbaik kepada Anda. Silakan kembali beberapa saat lagi.',
  estimatedTime: '1 - 2 Jam',
  contactWhatsapp: '6281234567890',
  contactEmail: 'info@supramix.co.id',
  allowAdminAccess: true
};

export const isSupabaseActive = () => isSupabaseConfigured();

// Default About Section Data
export const defaultAboutSection = {
  id: 'about-main',
  badge_text: 'About Us',
  title: 'Supramix Technology of Insulating Material',
  description: 'Supramix is a leading manufacturer and distributor established in 2019 focusing in Bituminous products, waterproofing membranes, and polymer insulation solutions. Serving local markets and distributing high-grade building insulation materials across every major island in Indonesia.',
  stat1_number: '2019',
  stat1_label: 'Established Foundation',
  stat2_number: '100%',
  stat2_label: 'Indonesia Coverage',
  image_url: '/products/app-sand-membrane.jpg',
  image_badge: 'Building Structure Application',
  image_caption: 'APP Bituminous Waterproofing Membrane Roll on Concrete Deck'
};

// Default Products Initial Catalog
export const defaultProducts = [
  {
    id: 'primer-coat-wb',
    name: 'Primer Coat',
    category: 'Coating & Primer',
    price: 0,
    unit: 'pack',
    rating: 5.0,
    reviews: 50,
    desc: 'High performance water-based bitumen primer coat for surface preparation before membrane installation.',
    features: ['Superior adhesion', 'Fast drying formula', 'Eco-friendly water based'],
    image: '/products/prime-coat-wb.jpg'
  },
  {
    id: 'supramix-sand-3mm',
    name: 'Supramix Sand 3 mm APP Polyester',
    category: 'Waterproofing Membrane',
    price: 0,
    unit: 'roll',
    rating: 5.0,
    reviews: 65,
    desc: 'Atactic Polypropylene (APP) modified bituminous membrane reinforced with heavy-duty polyester and finished with fine sand.',
    features: ['High tensile strength', 'Superior UV resistance', '100% Waterproof seal'],
    image: '/products/app-sand-membrane.jpg'
  },
  {
    id: 'supramix-granule-grey-3mm',
    name: 'Supramix Granule Grey 3 mm APP Polyester',
    category: 'Waterproofing Membrane',
    price: 0,
    unit: 'roll',
    rating: 5.0,
    reviews: 42,
    desc: 'APP modified bitumen waterproofing membrane with grey mineral granule finish for exposed roofing applications.',
    features: ['Exposed roof protection', 'Granule weather shield', 'Thermal reflection'],
    image: '/products/app-sand-membrane.jpg'
  },
  {
    id: 'supramix-granule-green-3mm',
    name: 'Supramix Granule Green 3 mm APP Polyester',
    category: 'Waterproofing Membrane',
    price: 0,
    unit: 'roll',
    rating: 5.0,
    reviews: 38,
    desc: 'APP modified bitumen waterproofing membrane with green mineral granule surface for aesthetic roof gardens & exposed decks.',
    features: ['Green aesthetic finish', 'Aesthetic roofing option', 'Heavy-duty durability'],
    image: '/products/basalt-spring-green.jpg'
  },
  {
    id: 'supramix-pe-film-3mm',
    name: 'Supramix PE Film 3 mm APP',
    category: 'Waterproofing Membrane',
    price: 0,
    unit: 'roll',
    rating: 5.0,
    reviews: 55,
    desc: 'Polyethylene film finished APP modified bituminous membrane designed for double-layer roofing and underground tanking.',
    features: ['PE Film finish', 'Flexible installation', 'Heavy duty tanking'],
    image: '/products/app-pe-membrane.jpg'
  }
];

// Default Projects Showcase Initial Catalog
export const defaultProjects = [
  {
    id: 'proj-kemenkes',
    title: 'Poltekes Gondangdia Project',
    clientName: 'Ministry of Health (KEMENKES)',
    category: 'Infrastructure / Healthcare',
    materialsUsed: 'Bitumen Membrane & Basalt Spring Sealant',
    location: 'Jakarta, Indonesia',
    year: '2023',
    desc: 'SUPRAMIX worked alongside PT Wijaya Karya to install high-performance bitumen membranes and basalt expansion sealants for critical infrastructure bridges and healthcare buildings.',
    image: '/Projects/kesehatan1.jpeg'
  },
  {
    id: 'proj-sunter',
    title: 'Sunter Luxury Residential',
    clientName: 'Private Developer',
    category: 'Residential',
    materialsUsed: 'APP Sand Membrane & Prime Coat WB Injection',
    location: 'North Jakarta, Indonesia',
    year: '2023',
    desc: 'Supplying APP sand membrane protection and WB epoxy injection system across major luxury residential complexes and underpass structures.',
    image: '/Projects/sunter1.jpeg'
  },
  {
    id: 'proj-shb',
    title: 'Sekolah Harapan Bangsa Campus',
    clientName: 'Sekolah Harapan Bangsa',
    category: 'Educational',
    materialsUsed: 'Coating-PU Modified & APP PE Membrane',
    location: 'Modernland, Tangerang',
    year: '2024',
    desc: 'Engineering elastomeric modified PU coatings and heavy PE membrane barriers for institutional roof complexes and waterproofing seals.',
    image: '/Projects/sph1.jpeg'
  },
  {
    id: 'proj-binus',
    title: 'BINUS University Campus Tower',
    clientName: 'BINA NUSANTARA UNIVERSITY',
    category: 'Educational / High Rise',
    materialsUsed: 'Basalt Spring Green & PyroBlock Core Armor',
    location: 'West Jakarta, Indonesia',
    year: '2024',
    desc: 'Deploying fire-resistant PyroBlock and Basalt insulation batts for state-of-the-art academic building roof decks.',
    image: '/Projects/binus1.jpeg'
  }
];

// Default Partners & Clients Catalog
export const defaultPartners = [
  {
    id: 'part-kemenkes',
    name: 'Ministry of Health',
    shortName: 'KEMENKES',
    sector: 'Government & Healthcare',
    description: 'National health authority partnership for medical and educational facility waterproofing.',
    logo: '/Projects/kesehatan1.jpeg',
    website: 'https://kemkes.go.id'
  },
  {
    id: 'part-sunter',
    name: 'Sunter Luxury Development',
    shortName: 'Sunter Group',
    sector: 'Real Estate & Living',
    description: 'Premium developer partner for high-end residential waterproofing and insulation systems.',
    logo: '/Projects/sunter1.jpeg',
    website: '#'
  },
  {
    id: 'part-shb',
    name: 'Sekolah Harapan Bangsa',
    shortName: 'SHB',
    sector: 'Education',
    description: 'Educational institution partner for durable eco-friendly roof and thermal barrier protection.',
    logo: '/Projects/sph1.jpeg',
    website: '#'
  },
  {
    id: 'part-binus',
    name: 'BINA NUSANTARA UNIVERSITY',
    shortName: 'BINUS',
    sector: 'Higher Education',
    description: 'Leading university network utilizing SUPRAMIX passive fire protection and insulation.',
    logo: '/Projects/binus1.jpeg',
    website: 'https://binus.ac.id'
  }
];

// --- LOCAL STORAGE UTILITIES ---

function getItem(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function setItem(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('supramix_data_change'));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Helper function to safely fetch JSON without throwing or hanging on slow/static endpoints
async function safeFetchJson(url, options = {}) {
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 1500) : null;
    const fetchOptions = controller ? { ...options, signal: controller.signal } : options;
    const res = await fetch(url, fetchOptions);
    if (timeoutId) clearTimeout(timeoutId);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      return { ok: true, json, status: res.status };
    }
    return { ok: false, status: res.status };
  } catch (e) {
    return { ok: false, error: e };
  }
}

// --- PRODUCTS ---

export async function getProductsAsync() {
  const local = getItem(KEYS.PRODUCTS, null);

  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map(p => ({
          ...p,
          features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? (tryParseJson(p.features) || []) : [])
        }));
        setItem(KEYS.PRODUCTS, formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Supabase client fetch products error:', err);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/products');
  if (apiRes.ok && apiRes.json && apiRes.json.success && Array.isArray(apiRes.json.data) && apiRes.json.data.length > 0) {
    setItem(KEYS.PRODUCTS, apiRes.json.data);
    return apiRes.json.data;
  }

  const validLocal = (Array.isArray(local) && local.length > 0) ? local : defaultProducts;
  setItem(KEYS.PRODUCTS, validLocal);
  return validLocal;
}

function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
}

export async function saveProductAsync(product) {
  const targetId = (product.id && String(product.id).trim()) ? String(product.id).trim() : 'prod-' + Date.now();
  const productToSave = { ...product, id: targetId };

  // 1. Save locally IMMEDIATELY for zero lag & instant response
  const updatedLocal = saveProduct(productToSave);

  // 2. Direct Supabase Upsert
  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('products').upsert({
        id: productToSave.id,
        name: productToSave.name,
        category: productToSave.category || '',
        price: Number(productToSave.price) || 0,
        unit: productToSave.unit || '',
        rating: Number(productToSave.rating) || 5.0,
        reviews: Number(productToSave.reviews) || 0,
        desc: productToSave.desc || '',
        features: Array.isArray(productToSave.features) ? productToSave.features : [],
        image: productToSave.image || ''
      });
      if (error) console.warn('Supabase client upsert product error:', error.message);
    } catch (err) {
      console.warn('Supabase client upsert product error:', err);
    }
  }

  // 3. Background API ping
  safeFetchJson('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productToSave)
  });

  return updatedLocal;
}

export async function deleteProductAsync(id) {
  // 1. Remove locally IMMEDIATELY for zero lag & instant response
  const updatedLocal = deleteProduct(id);

  // 2. Direct Supabase Delete
  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) console.warn('Supabase client delete product error:', error.message);
    } catch (err) {
      console.warn('Supabase client delete product error:', err);
    }
  }

  // 3. Background API ping
  safeFetchJson('/api/admin/products', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  return updatedLocal;
}

// --- PROJECTS ---

export async function getProjectsAsync() {
  const local = getItem(KEYS.PROJECTS, null);

  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map(p => ({
          id: p.id,
          title: p.title,
          clientName: p.client_name,
          category: p.category,
          materialsUsed: p.materials_used,
          location: p.location,
          year: p.year,
          desc: p.desc,
          image: p.image
        }));
        setItem(KEYS.PROJECTS, formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Supabase client fetch projects error:', err);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/projects');
  if (apiRes.ok && apiRes.json && apiRes.json.success && Array.isArray(apiRes.json.data) && apiRes.json.data.length > 0) {
    setItem(KEYS.PROJECTS, apiRes.json.data);
    return apiRes.json.data;
  }

  const validLocal = (Array.isArray(local) && local.length > 0) ? local : defaultProjects;
  setItem(KEYS.PROJECTS, validLocal);
  return validLocal;
}

export async function saveProjectAsync(project) {
  const targetId = (project.id && String(project.id).trim()) ? String(project.id).trim() : 'proj-' + Date.now();
  const projectToSave = { ...project, id: targetId };

  const updatedLocal = saveProject(projectToSave);

  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('projects').upsert({
        id: projectToSave.id,
        title: projectToSave.title,
        client_name: projectToSave.clientName,
        category: projectToSave.category,
        materials_used: projectToSave.materialsUsed,
        location: projectToSave.location,
        year: projectToSave.year,
        desc: projectToSave.desc,
        image: projectToSave.image
      });
      if (error) console.warn('Supabase client upsert project error:', error.message);
    } catch (err) {
      console.warn('Supabase client upsert project error:', err);
    }
  }

  safeFetchJson('/api/admin/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectToSave)
  });

  return updatedLocal;
}

export async function deleteProjectAsync(id) {
  const updatedLocal = deleteProject(id);

  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) console.warn('Supabase client delete project error:', error.message);
    } catch (err) {
      console.warn('Supabase client delete project error:', err);
    }
  }

  safeFetchJson('/api/admin/projects', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  return updatedLocal;
}

// --- PARTNERS ---

export async function getPartnersAsync() {
  const local = getItem(KEYS.PARTNERS, null);

  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map(p => ({
          id: p.id,
          name: p.name,
          shortName: p.short_name,
          sector: p.sector,
          description: p.description,
          logo: p.logo,
          website: p.website
        }));
        setItem(KEYS.PARTNERS, formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Supabase client fetch partners error:', err);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/partners');
  if (apiRes.ok && apiRes.json && apiRes.json.success && Array.isArray(apiRes.json.data) && apiRes.json.data.length > 0) {
    setItem(KEYS.PARTNERS, apiRes.json.data);
    return apiRes.json.data;
  }

  const validLocal = (Array.isArray(local) && local.length > 0) ? local : defaultPartners;
  setItem(KEYS.PARTNERS, validLocal);
  return validLocal;
}

export async function savePartnerAsync(partner) {
  const targetId = (partner.id && String(partner.id).trim()) ? String(partner.id).trim() : 'part-' + Date.now();
  const partnerToSave = { ...partner, id: targetId };

  const updatedLocal = savePartner(partnerToSave);

  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('partners').upsert({
        id: partnerToSave.id,
        name: partnerToSave.name,
        short_name: partnerToSave.shortName,
        sector: partnerToSave.sector,
        description: partnerToSave.description,
        logo: partnerToSave.logo,
        website: partnerToSave.website
      });
      if (error) console.warn('Supabase client upsert partner error:', error.message);
    } catch (err) {
      console.warn('Supabase client upsert partner error:', err);
    }
  }

  safeFetchJson('/api/admin/partners', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partnerToSave)
  });

  return updatedLocal;
}

export async function deletePartnerAsync(id) {
  const updatedLocal = deletePartner(id);

  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('partners').delete().eq('id', id);
      if (error) console.warn('Supabase client delete partner error:', error.message);
    } catch (err) {
      console.warn('Supabase client delete partner error:', err);
    }
  }

  safeFetchJson('/api/admin/partners', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  return updatedLocal;
}

// --- PASSCODE / AUTH SERVER API ---

export async function getAdminPasscodeAsync() {
  return getItem(KEYS.PASSCODE, 'admin123');
}

export async function verifyAdminPasscodeServer(passcode) {
  const apiRes = await safeFetchJson('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'verify', passcode })
  });
  if (apiRes.ok && apiRes.json) {
    return Boolean(apiRes.json.success);
  }
  return passcode === getAdminPasscode();
}

export async function setAdminPasscodeAsync(newCode) {
  if (!newCode || newCode.trim().length < 4) {
    return { success: false, error: 'Passcode minimal 4 karakter' };
  }
  const passcodeToSave = newCode.trim();

  const apiRes = await safeFetchJson('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'change', newPasscode: passcodeToSave })
  });

  if (apiRes.ok && apiRes.json && apiRes.json.success) {
    setAdminPasscode(passcodeToSave);
    return { success: true };
  }

  // Fallback: update Supabase client & local storage
  if (isSupabaseActive()) {
    try {
      await supabase.from('admin_settings').upsert({
        key: 'passcode',
        value: passcodeToSave,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase client admin_settings upsert error:', err);
    }
  }

  setAdminPasscode(passcodeToSave);
  return { success: true };
}

// =========================================================
// SYNCHRONOUS BACKWARD COMPATIBLE METHODS
// =========================================================

export function getAdminPasscode() {
  return getItem(KEYS.PASSCODE, 'admin123');
}

export function setAdminPasscode(newCode) {
  setItem(KEYS.PASSCODE, newCode);
}

export function getProducts() {
  return getItem(KEYS.PRODUCTS, defaultProducts);
}

export function saveProduct(product) {
  const products = getProducts();
  const targetId = (product.id && String(product.id).trim()) ? String(product.id).trim() : 'prod-' + Date.now();
  const productToSave = { ...product, id: targetId };

  const existingIdx = products.findIndex(p => p.id === targetId);
  if (existingIdx >= 0) {
    products[existingIdx] = productToSave;
  } else {
    products.unshift(productToSave);
  }
  setItem(KEYS.PRODUCTS, products);
  return products;
}

export function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id);
  setItem(KEYS.PRODUCTS, products);
  return products;
}

export function getProjects() {
  return getItem(KEYS.PROJECTS, defaultProjects);
}

export function saveProject(project) {
  const projects = getProjects();
  const targetId = (project.id && String(project.id).trim()) ? String(project.id).trim() : 'proj-' + Date.now();
  const projectToSave = { ...project, id: targetId };

  const existingIdx = projects.findIndex(p => p.id === targetId);
  if (existingIdx >= 0) {
    projects[existingIdx] = projectToSave;
  } else {
    projects.unshift(projectToSave);
  }
  setItem(KEYS.PROJECTS, projects);
  return projects;
}

export function deleteProject(id) {
  const projects = getProjects().filter(p => p.id !== id);
  setItem(KEYS.PROJECTS, projects);
  return projects;
}

export function getPartners() {
  return getItem(KEYS.PARTNERS, defaultPartners);
}

export function savePartner(partner) {
  const partners = getPartners();
  const targetId = (partner.id && String(partner.id).trim()) ? String(partner.id).trim() : 'part-' + Date.now();
  const partnerToSave = { ...partner, id: targetId };

  const existingIdx = partners.findIndex(p => p.id === targetId);
  if (existingIdx >= 0) {
    partners[existingIdx] = partnerToSave;
  } else {
    partners.unshift(partnerToSave);
  }
  setItem(KEYS.PARTNERS, partners);
  return partners;
}

export function deletePartner(id) {
  const partners = getPartners().filter(p => p.id !== id);
  setItem(KEYS.PARTNERS, partners);
  return partners;
}

export function exportAllData() {
  return {
    version: '1.0',
    exportDate: new Date().toISOString(),
    products: getProducts(),
    projects: getProjects(),
    partners: getPartners()
  };
}

export function importAllData(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid data format');
  if (Array.isArray(data.products)) setItem(KEYS.PRODUCTS, data.products);
  if (Array.isArray(data.projects)) setItem(KEYS.PROJECTS, data.projects);
  if (Array.isArray(data.partners)) setItem(KEYS.PARTNERS, data.partners);
}

export function resetAllDataToDefault() {
  setItem(KEYS.PRODUCTS, defaultProducts);
  setItem(KEYS.PROJECTS, defaultProjects);
  setItem(KEYS.PARTNERS, defaultPartners);
  setItem(KEYS.ABOUT, defaultAboutSection);
}

export async function resetAllDataToDefaultAsync() {
  resetAllDataToDefault();

  if (isSupabaseActive()) {
    try {
      await Promise.all(defaultProducts.map(p =>
        supabase.from('products').upsert({
          id: p.id,
          name: p.name,
          category: p.category || '',
          price: Number(p.price) || 0,
          unit: p.unit || '',
          rating: Number(p.rating) || 5.0,
          reviews: Number(p.reviews) || 0,
          desc: p.desc || '',
          features: Array.isArray(p.features) ? p.features : [],
          image: p.image || ''
        })
      ));

      await Promise.all(defaultProjects.map(p =>
        supabase.from('projects').upsert({
          id: p.id,
          title: p.title,
          client_name: p.clientName,
          category: p.category,
          materials_used: p.materialsUsed,
          location: p.location,
          year: p.year,
          desc: p.desc,
          image: p.image
        })
      ));

      await Promise.all(defaultPartners.map(p =>
        supabase.from('partners').upsert({
          id: p.id,
          name: p.name,
          short_name: p.shortName,
          sector: p.sector,
          description: p.description,
          logo: p.logo,
          website: p.website
        })
      ));

      await supabase.from('about_section').upsert({
        ...defaultAboutSection,
        id: 'about-main'
      });
    } catch (e) {
      console.warn('Supabase reset error:', e);
    }
  }

  return { success: true };
}

// --- ABOUT SECTION ASYNC & LOCAL FUNCTIONS ---

export async function getAboutSectionAsync() {
  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('about_section').select('*').eq('id', 'about-main').maybeSingle();
      if (!error && data) {
        setItem(KEYS.ABOUT, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase about_section fetch error:', e);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/about');
  if (apiRes.ok && apiRes.json.success && apiRes.json.data) {
    setItem(KEYS.ABOUT, apiRes.json.data);
    return apiRes.json.data;
  }

  return getItem(KEYS.ABOUT, defaultAboutSection);
}

export async function saveAboutSectionAsync(aboutData) {
  const payload = { ...defaultAboutSection, ...aboutData, id: 'about-main' };

  setItem(KEYS.ABOUT, payload);

  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('about_section').upsert(payload);
      if (error) console.warn('Supabase about_section upsert error:', error.message);
    } catch (e) {
      console.warn('Supabase about_section upsert error:', e);
    }
  }

  safeFetchJson('/api/admin/about', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return payload;
}

// --- MAINTENANCE MODE ASYNC & LOCAL FUNCTIONS ---

export function getMaintenanceSync() {
  const local = getItem(KEYS.MAINTENANCE, null);
  return local ? { ...defaultMaintenanceConfig, ...local } : defaultMaintenanceConfig;
}

export function saveMaintenanceSync(config) {
  const payload = { ...defaultMaintenanceConfig, ...config };
  setItem(KEYS.MAINTENANCE, payload);
  return payload;
}

export async function getMaintenanceAsync() {
  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').eq('key', 'maintenance').maybeSingle();
      if (!error && data && data.value) {
        const parsed = typeof data.value === 'string' ? tryParseJsonObj(data.value) : data.value;
        if (parsed && typeof parsed === 'object') {
          saveMaintenanceSync(parsed);
          return { ...defaultMaintenanceConfig, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Supabase site_settings maintenance fetch error:', e);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/maintenance');
  if (apiRes.ok && apiRes.json.success && apiRes.json.data) {
    saveMaintenanceSync(apiRes.json.data);
    return { ...defaultMaintenanceConfig, ...apiRes.json.data };
  }

  return getMaintenanceSync();
}

function tryParseJsonObj(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

export async function saveMaintenanceAsync(config) {
  const payload = { ...defaultMaintenanceConfig, ...config };

  // 1. Save locally immediately for instant feedback
  saveMaintenanceSync(payload);

  // 2. Direct Supabase Upsert
  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('site_settings').upsert({
        key: 'maintenance',
        value: payload,
        updated_at: new Date().toISOString()
      });
      if (error) console.warn('Supabase site_settings maintenance upsert error:', error.message);
    } catch (e) {
      console.warn('Supabase site_settings maintenance upsert error:', e);
    }
  }

  // 3. Background API ping
  safeFetchJson('/api/admin/maintenance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return payload;
}
