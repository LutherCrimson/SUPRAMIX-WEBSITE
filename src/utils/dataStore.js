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
    image: '/Projects/sph1.jpeg'
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
    image: '/Projects/binus1.jpeg'
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
    image: '/Projects/kesehatan1.jpeg'
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
    image: '/Projects/sunter1.jpeg'
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
  if (!isSupabaseActive()) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      category,
      price,
      unit,
      rating,
      reviews,
      desc,
      features,
      image_url,
      created_at
    `)
    .order('id', { ascending: true });

  if (error) {
    console.error('Failed to fetch products from Supabase:', error);
    throw error;
  }

  return (data || []).map(p => ({
    ...p,
    image: p.image_url || '',
    image_url: p.image_url || '',
    features: Array.isArray(p.features)
      ? p.features
      : typeof p.features === 'string'
        ? (tryParseJson(p.features) || [])
        : []
  }));
}

function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
}

export async function saveProductAsync(product) {
  if (!isSupabaseActive()) {
    throw new Error('Supabase is not configured');
  }

  const targetId =
    product.id && String(product.id).trim()
      ? String(product.id).trim()
      : 'prod-' + Date.now();

  // Simpan URL gambar lama sebelum ada perubahan
  const oldImageUrl =
    product.image_url ||
    (
      typeof product.image === 'string' &&
      product.image.startsWith('http')
        ? product.image
        : ''
    );

  console.log('OLD IMAGE URL:', oldImageUrl);
  console.log('NEW IMAGE FILE:', product.image);

  let imageUrl = oldImageUrl;
  let newFilePath = null;

  // =========================================================
  // JIKA USER MEMILIH GAMBAR BARU
  // =========================================================
  if (product.image instanceof File) {
    const file = product.image;

    const fileExt =
      file.name.split('.').pop()?.toLowerCase() || 'jpg';

    newFilePath =
      `products/${targetId}-${Date.now()}.${fileExt}`;

    // Upload gambar baru
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(newFilePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Image upload failed:', uploadError);
      throw uploadError;
    }

    // Ambil public URL gambar baru
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(newFilePath);

    imageUrl = publicUrlData.publicUrl;

    console.log('New image uploaded:', imageUrl);
  }

  // =========================================================
  // DATA PRODUK YANG DISIMPAN
  // =========================================================
  const productToSave = {
    id: targetId,
    name: product.name || '',
    category: product.category || '',
    price: Number(product.price) || 0,
    unit: product.unit || '',
    rating: Number(product.rating) || 5,
    reviews: Number(product.reviews) || 0,
    desc: product.desc || '',
    features: Array.isArray(product.features)
      ? product.features
      : [],
    image_url: imageUrl,
  };

  // =========================================================
  // SIMPAN / UPDATE DATABASE
  // =========================================================
  const { data, error } = await supabase
    .from('products')
    .upsert(productToSave, {
      onConflict: 'id',
    })
    .select()
    .single();

  // Jika database gagal setelah gambar baru berhasil di-upload,
  // hapus gambar baru supaya tidak menjadi file yatim/orphan.
  if (error) {
    console.error('Failed to save product:', error);

    if (newFilePath) {
      const { error: cleanupError } = await supabase.storage
        .from('product-images')
        .remove([newFilePath]);

      if (cleanupError) {
        console.error(
          'Failed to cleanup new image:',
          cleanupError
        );
      }
    }

    throw error;
  }

  // =========================================================
  // HAPUS GAMBAR LAMA
  // Hanya dilakukan kalau user benar-benar upload gambar baru
  // =========================================================
  if (newFilePath && oldImageUrl) {
    try {
      const marker =
        '/storage/v1/object/public/product-images/';

      if (oldImageUrl.includes(marker)) {
        const oldFilePath = decodeURIComponent(
          oldImageUrl.split(marker)[1]
        );

        // Jangan sampai menghapus file baru
        if (oldFilePath && oldFilePath !== newFilePath) {
          console.log('DELETING OLD FILE:', oldFilePath);

          const { error: deleteError } = await supabase.storage
            .from('product-images')
            .remove([oldFilePath]);

          if (deleteError) {
            console.error(
              'Failed to delete old image:',
              deleteError
            );
          } else {
            console.log(
              'Old image deleted:',
              oldFilePath
            );
          }
        }
      }
    } catch (deleteException) {
      console.error(
        'Error while deleting old image:',
        deleteException
      );
    }
  }

  return data;
}

export async function deleteProductAsync(id) {
  if (!isSupabaseActive()) {
    throw new Error('Supabase is not configured');
  }

  try {
    // =====================================================
    // 1. AMBIL DATA PRODUCT TERLEBIH DAHULU
    // =====================================================
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('id, image_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error(
        'Supabase client fetch product before delete error:',
        fetchError
      );
      throw fetchError;
    }

    // =====================================================
    // 2. HAPUS GAMBAR DARI STORAGE
    // =====================================================
    const imageUrl = product?.image_url;

    if (imageUrl) {
      const marker =
        '/storage/v1/object/public/product-images/';

      if (imageUrl.includes(marker)) {
        const encodedPath = imageUrl.split(marker)[1];
        const storagePath = decodeURIComponent(encodedPath);

        if (storagePath) {
          const { error: storageError } = await supabase.storage
            .from('product-images')
            .remove([storagePath]);

          if (storageError) {
            console.error(
              'Supabase client delete product image error:',
              storageError
            );

            throw storageError;
          }

          console.log(
            'Product image deleted from Storage:',
            storagePath
          );
        }
      }
    }

    // =====================================================
    // 3. HAPUS PRODUCT DARI DATABASE
    // =====================================================
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error(
        'Supabase client delete product error:',
        deleteError
      );

      throw deleteError;
    }

    return {
      success: true,
      id
    };

  } catch (err) {
    // =====================================================
    // 4. FALLBACK KE API SERVER
    // =====================================================
    console.warn(
      'Supabase client delete product error, falling back to API:',
      err
    );

    const apiRes = await safeFetchJson(
      '/api/admin/products',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      }
    );

    if (
      apiRes.ok &&
      apiRes.json &&
      apiRes.json.success
    ) {
      return {
        success: true,
        id
      };
    }

    throw err;
  }
}

// --- PROJECTS ---

export async function getProjectsAsync() {
  const local = getItem(KEYS.PROJECTS, null);
  const validFallback = (Array.isArray(local) && local.length > 0) ? local : defaultProjects;

  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          const formatted = data.map(p => ({
            id: p.id,
            title: p.title,
            clientName: p.client_name,
            category: p.category,
            materialsUsed: p.materials_used,
            location: p.location,
            year: p.year,
            desc: p.desc,

            // URL Storage baru
            image: p.image_url || '',
            image_url: p.image_url || '',
          }));
          return formatted;
        } else {
          validFallback.forEach(p => {
            supabase.from('projects').upsert({
              id: p.id,
              title: p.title,
              client_name: p.clientName,
              category: p.category,
              materials_used: p.materialsUsed,
              location: p.location,
              year: p.year,
              desc: p.desc,
              image_url: p.image,
              image: p.image
            }).catch(() => {});
          });
          return validFallback;
        }
      }
    } catch (err) {
      console.warn('Supabase client fetch projects error:', err);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/projects');
  if (apiRes.ok && apiRes.json && apiRes.json.success && Array.isArray(apiRes.json.data) && apiRes.json.data.length > 0) {
    return apiRes.json.data;
  }

  return validFallback;
}

export async function saveProjectAsync(project) {
  if (!isSupabaseActive()) {
    throw new Error('Supabase is not configured');
  }

  const targetId =
    project.id && String(project.id).trim()
      ? String(project.id).trim()
      : 'proj-' + Date.now();

  // URL gambar lama
  const oldImageUrl =
    project.image_url ||
    (
      typeof project.image === 'string' &&
      project.image.startsWith('http')
        ? project.image
        : ''
    );

  let imageUrl = oldImageUrl;
  let newFilePath = null;

  // =====================================================
  // UPLOAD GAMBAR BARU
  // =====================================================
  if (project.image instanceof File) {
    const file = project.image;

    const fileExt =
      file.name.split('.').pop()?.toLowerCase() || 'jpg';

    newFilePath =
      `projects/${targetId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(newFilePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Project image upload failed:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(newFilePath);

    imageUrl = publicUrlData.publicUrl;

    console.log('Project image uploaded:', imageUrl);
  }

  // =====================================================
  // SIMPAN DATABASE
  // =====================================================
  const projectToSave = {
    id: targetId,
    title: project.title || '',
    client_name: project.clientName || '',
    category: project.category || '',
    materials_used: project.materialsUsed || '',
    location: project.location || '',
    year: project.year || '',
    desc: project.desc || '',
    image_url: imageUrl,
  };

  const { data, error } = await supabase
    .from('projects')
    .upsert(projectToSave, {
      onConflict: 'id',
    })
    .select()
    .single();

  // =====================================================
  // CLEANUP GAMBAR BARU JIKA DATABASE GAGAL
  // =====================================================
  if (error) {
    console.error('Failed to save project:', error);

    if (newFilePath) {
      const { error: cleanupError } = await supabase.storage
        .from('product-images')
        .remove([newFilePath]);

      if (cleanupError) {
        console.error(
          'Failed to cleanup new project image:',
          cleanupError
        );
      }
    }

    throw error;
  }

  // =====================================================
  // HAPUS GAMBAR LAMA JIKA GAMBAR DIGANTI
  // =====================================================
  if (newFilePath && oldImageUrl) {
    try {
      const marker =
        '/storage/v1/object/public/product-images/';

      if (oldImageUrl.includes(marker)) {
        const oldFilePath = decodeURIComponent(
          oldImageUrl.split(marker)[1]
        );

        if (
          oldFilePath &&
          oldFilePath !== newFilePath
        ) {
          const { error: deleteError } = await supabase.storage
            .from('product-images')
            .remove([oldFilePath]);

          if (deleteError) {
            console.error(
              'Failed to delete old project image:',
              deleteError
            );
          } else {
            console.log(
              'Old project image deleted:',
              oldFilePath
            );
          }
        }
      }
    } catch (deleteException) {
      console.error(
        'Error deleting old project image:',
        deleteException
      );
    }
  }

  return data;
}

export async function deleteProjectAsync(id) {
  if (isSupabaseActive()) {
    try {
      // =====================================================
      // 1. AMBIL DATA PROJECT TERLEBIH DAHULU
      // =====================================================
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('id, image_url')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error(
          'Supabase client fetch project before delete error:',
          fetchError
        );
        throw fetchError;
      }

      // =====================================================
      // 2. HAPUS GAMBAR DARI STORAGE
      // =====================================================
      const imageUrl = project?.image_url;

      if (imageUrl) {
        const marker =
          '/storage/v1/object/public/product-images/';

        if (imageUrl.includes(marker)) {
          const encodedPath = imageUrl.split(marker)[1];
          const storagePath = decodeURIComponent(encodedPath);

          if (storagePath) {
            const { error: storageError } = await supabase.storage
              .from('product-images')
              .remove([storagePath]);

            if (storageError) {
              console.error(
                'Supabase client delete project image error:',
                storageError
              );

              throw storageError;
            }

            console.log(
              'Project image deleted from Storage:',
              storagePath
            );
          }
        }
      }

      // =====================================================
      // 3. HAPUS PROJECT DARI DATABASE
      // =====================================================
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error(
          'Supabase client delete project error:',
          deleteError
        );

        throw deleteError;
      }

      return {
        success: true,
        id
      };

    } catch (err) {
      // =====================================================
      // 4. FALLBACK KE API SERVER
      // =====================================================
      console.warn(
        'Supabase client delete project error, falling back to API:',
        err
      );

      const apiRes = await safeFetchJson(
        '/api/admin/projects',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        }
      );

      if (
        apiRes.ok &&
        apiRes.json &&
        apiRes.json.success
      ) {
        return {
          success: true,
          id
        };
      }

      throw err;
    }
  }

  // =====================================================
  // 5. FALLBACK LOCAL
  // =====================================================
  deleteProject(id);

  return {
    success: true,
    id
  };
}

// --- PARTNERS ---

export async function getPartnersAsync() {
  const local = getItem(KEYS.PARTNERS, null);
  const validFallback = (Array.isArray(local) && local.length > 0) ? local : defaultPartners;

  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('partners').select('*');
      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          const formatted = data.map(p => ({
            id: p.id,
            name: p.name,
            shortName: p.short_name,
            sector: p.sector,
            description: p.description,
            logo: p.logo,
            website: p.website
          }));
          return formatted;
        } else {
          validFallback.forEach(p => {
            supabase.from('partners').upsert({
              id: p.id,
              name: p.name,
              short_name: p.shortName,
              sector: p.sector,
              description: p.description,
              logo: p.logo,
              website: p.website
            }).catch(() => {});
          });
          return validFallback;
        }
      }
    } catch (err) {
      console.warn('Supabase client fetch partners error:', err);
    }
  }

  const apiRes = await safeFetchJson('/api/admin/partners');
  if (apiRes.ok && apiRes.json && apiRes.json.success && Array.isArray(apiRes.json.data) && apiRes.json.data.length > 0) {
    return apiRes.json.data;
  }

  return validFallback;
}

export async function savePartnerAsync(partner) {
  const targetId = (partner.id && String(partner.id).trim()) ? String(partner.id).trim() : 'part-' + Date.now();
  const partnerToSave = { ...partner, id: targetId };

  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.from('partners').upsert({
        id: partnerToSave.id,
        name: partnerToSave.name,
        short_name: partnerToSave.shortName,
        sector: partnerToSave.sector,
        description: partnerToSave.description,
        logo: partnerToSave.logo,
        website: partnerToSave.website
      }).select().single();

      if (error) {
        console.error('Supabase client upsert partner error:', error);
        throw error;
      }
      return data || partnerToSave;
    } catch (err) {
      console.warn('Supabase client upsert partner error, falling back to API:', err);
      const apiRes = await safeFetchJson('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerToSave)
      });
      if (apiRes.ok && apiRes.json && apiRes.json.success) {
        return partnerToSave;
      }
      throw err;
    }
  }

  return savePartner(partnerToSave);
}

export async function deletePartnerAsync(id) {
  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.from('partners').delete().eq('id', id);
      if (error) {
        console.error('Supabase client delete partner error:', error);
        throw error;
      }
      return { success: true, id };
    } catch (err) {
      console.warn('Supabase delete partner error, falling back to API:', err);
      const apiRes = await safeFetchJson('/api/admin/partners', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (apiRes.ok && apiRes.json && apiRes.json.success) {
        return { success: true, id };
      }
      throw err;
    }
  }

  deletePartner(id);
  return { success: true, id };
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
  setItem(KEYS.MAINTENANCE, defaultMaintenanceConfig);
}

export async function resetAllDataToDefaultAsync() {
  if (!isSupabaseActive()) {
    resetAllDataToDefault();

    return {
      success: true
    };
  }

  try {
    // =====================================================
    // 1. AMBIL DATA IMAGE URL LAMA
    // =====================================================

    const [
      { data: products, error: productsFetchError },
      { data: projects, error: projectsFetchError },
      { data: about, error: aboutFetchError }
    ] = await Promise.all([
      supabase
        .from('products')
        .select('id, image_url'),

      supabase
        .from('projects')
        .select('id, image_url'),

      supabase
        .from('about_section')
        .select('id, image_url')
        .eq('id', 'about-main')
        .maybeSingle()
    ]);

    if (productsFetchError) {
      throw productsFetchError;
    }

    if (projectsFetchError) {
      throw projectsFetchError;
    }

    if (aboutFetchError) {
      throw aboutFetchError;
    }

    // =====================================================
    // 2. CATAT STORAGE PATH LAMA
    // JANGAN HAPUS DULU
    // =====================================================

    const marker =
      '/storage/v1/object/public/product-images/';

    const storagePaths = new Set();

    const addStoragePath = (imageUrl) => {
      if (
        typeof imageUrl !== 'string' ||
        !imageUrl.includes(marker)
      ) {
        return;
      }

      try {
        const encodedPath =
          imageUrl.split(marker)[1];

        if (!encodedPath) {
          return;
        }

        const storagePath =
          decodeURIComponent(encodedPath);

        if (storagePath) {
          storagePaths.add(storagePath);
        }
      } catch (e) {
        console.warn(
          'Failed to parse Storage image URL:',
          imageUrl,
          e
        );
      }
    };

    (products || []).forEach((product) => {
      addStoragePath(product.image_url);
    });

    (projects || []).forEach((project) => {
      addStoragePath(project.image_url);
    });

    if (about?.image_url) {
      addStoragePath(about.image_url);
    }

    // =====================================================
    // 3. RESET PRODUCTS
    // =====================================================

    const productResults = await Promise.all(
      defaultProducts.map((p) =>
        supabase
          .from('products')
          .upsert({
            id: p.id,
            name: p.name,
            category: p.category || '',
            price: Number(p.price) || 0,
            unit: p.unit || '',
            rating: Number(p.rating) || 5.0,
            reviews: Number(p.reviews) || 0,
            desc: p.desc || '',
            features: Array.isArray(p.features)
              ? p.features
              : [],
            image_url: p.image || '',
            image: p.image || ''
          })
      )
    );

    const productError =
      productResults.find(
        (result) => result.error
      )?.error;

    if (productError) {
      throw productError;
    }

    // =====================================================
    // 4. RESET PROJECTS
    // =====================================================

    const projectResults = await Promise.all(
      defaultProjects.map((p) =>
        supabase
          .from('projects')
          .upsert({
            id: p.id,
            title: p.title,
            client_name: p.clientName || '',
            category: p.category || '',
            materials_used: p.materialsUsed || '',
            location: p.location || '',
            year: p.year || '',
            desc: p.desc || '',
            image_url: p.image || '',
            image: p.image || ''
          })
      )
    );

    const projectError =
      projectResults.find(
        (result) => result.error
      )?.error;

    if (projectError) {
      throw projectError;
    }

    // =====================================================
    // 5. RESET PARTNERS
    // =====================================================

    const partnerResults = await Promise.all(
      defaultPartners.map((p) =>
        supabase
          .from('partners')
          .upsert({
            id: p.id,
            name: p.name,
            short_name: p.shortName || '',
            sector: p.sector || '',
            description: p.description || '',
            logo: p.logo || '',
            website: p.website || '#'
          })
      )
    );

    const partnerError =
      partnerResults.find(
        (result) => result.error
      )?.error;

    if (partnerError) {
      throw partnerError;
    }

    // =====================================================
    // 6. RESET ABOUT
    // =====================================================

    const { error: aboutError } =
      await supabase
        .from('about_section')
        .upsert({
          ...defaultAboutSection,
          id: 'about-main',
          image_url:
            defaultAboutSection.image_url || ''
        });

    if (aboutError) {
      throw aboutError;
    }

    // =====================================================
    // 7. RESET SITE SETTINGS
    // =====================================================

    const { error: settingsError } =
      await supabase
        .from('site_settings')
        .upsert({
          key: 'maintenance',
          value: defaultMaintenanceConfig,
          updated_at: new Date().toISOString()
        });

    if (settingsError) {
      throw settingsError;
    }

    // =====================================================
    // 8. DATABASE SUDAH BERHASIL
    // SEKARANG BARU HAPUS FILE STORAGE LAMA
    // =====================================================

    if (storagePaths.size > 0) {
      const pathsToDelete =
        Array.from(storagePaths);

      console.log(
        'Reset: deleting old custom Storage files:',
        pathsToDelete
      );

      const {
        error: storageDeleteError
      } = await supabase.storage
        .from('product-images')
        .remove(pathsToDelete);

      if (storageDeleteError) {
        // Jangan rollback database.
        // Database sudah berhasil di-reset.
        console.error(
          'Reset database succeeded, but Storage cleanup failed:',
          storageDeleteError
        );
      } else {
        console.log(
          'Reset: old custom Storage files deleted successfully'
        );
      }
    }

    // =====================================================
    // 9. RESET LOCAL STORAGE
    // =====================================================

    resetAllDataToDefault();

    console.log(
      'All data successfully reset to default.'
    );

    return {
      success: true
    };

  } catch (e) {
    console.error(
      'Supabase reset error:',
      e
    );

    throw e;
  }
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
  const targetId = 'about-main';

  if (!isSupabaseActive()) {
    throw new Error('Supabase is not configured');
  }

  // =====================================================
  // 1. AMBIL URL GAMBAR LAMA
  // =====================================================
  const oldImageUrl =
    typeof aboutData.image_url === 'string' &&
    aboutData.image_url.startsWith('http')
      ? aboutData.image_url
      : (
          typeof aboutData.image_url === 'string'
            ? aboutData.image_url
            : defaultAboutSection.image_url
        );

  let imageUrl = oldImageUrl;
  let newFilePath = null;

  // =====================================================
  // 2. UPLOAD GAMBAR BARU JIKA USER MEMILIH FILE
  // =====================================================
  if (aboutData.image_url instanceof File) {
    const file = aboutData.image_url;

    const fileExt =
      file.name.split('.').pop()?.toLowerCase() || 'jpg';

    newFilePath =
      `about/${targetId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } =
      await supabase.storage
        .from('product-images')
        .upload(newFilePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

    if (uploadError) {
      console.error(
        'About image upload failed:',
        uploadError
      );

      throw uploadError;
    }

    const { data: publicUrlData } =
      supabase.storage
        .from('product-images')
        .getPublicUrl(newFilePath);

    imageUrl = publicUrlData.publicUrl;

    console.log(
      'About image uploaded:',
      imageUrl
    );
  }

  // =====================================================
  // 3. BUAT PAYLOAD DATABASE
  // =====================================================
  const payload = {
    id: targetId,
    badge_text: aboutData.badge_text || defaultAboutSection.badge_text,
    title: aboutData.title || '',
    description: aboutData.description || '',
    stat1_number: aboutData.stat1_number || '',
    stat1_label: aboutData.stat1_label || '',
    stat2_number: aboutData.stat2_number || '',
    stat2_label: aboutData.stat2_label || '',
    image_url: imageUrl,
    image_badge: aboutData.image_badge || '',
    image_caption: aboutData.image_caption || '',
    updated_at: new Date().toISOString()
  };

  // =====================================================
  // 4. SIMPAN DATABASE
  // =====================================================
  try {
    const { error } =
      await supabase
        .from('about_section')
        .upsert(payload, {
          onConflict: 'id'
        });

    if (error) {
      console.error(
        'Supabase about_section upsert error:',
        error
      );

      // Hapus gambar baru jika database gagal
      if (newFilePath) {
        await supabase.storage
          .from('product-images')
          .remove([newFilePath]);
      }

      throw error;
    }
  } catch (e) {
    console.error(
      'Supabase about_section save error:',
      e
    );

    throw e;
  }

  // =====================================================
  // 5. SIMPAN KE LOCAL STATE
  // =====================================================
  setItem(KEYS.ABOUT, payload);

  // =====================================================
  // 6. SYNC KE API SERVER
  // =====================================================
  const apiRes = await safeFetchJson(
    '/api/admin/about',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!apiRes.ok) {
    console.warn(
      'About API sync failed:',
      apiRes.json
    );
  }

  // =====================================================
  // 7. HAPUS GAMBAR LAMA JIKA GAMBAR DIGANTI
  // =====================================================
  if (newFilePath && oldImageUrl) {
    try {
      const marker =
        '/storage/v1/object/public/product-images/';

      if (oldImageUrl.includes(marker)) {
        const oldFilePath =
          decodeURIComponent(
            oldImageUrl.split(marker)[1]
          );

        if (
          oldFilePath &&
          oldFilePath !== newFilePath
        ) {
          const { error: deleteError } =
            await supabase.storage
              .from('product-images')
              .remove([oldFilePath]);

          if (deleteError) {
            console.error(
              'Failed to delete old About image:',
              deleteError
            );
          } else {
            console.log(
              'Old About image deleted:',
              oldFilePath
            );
          }
        }
      }
    } catch (deleteException) {
      console.error(
        'Error deleting old About image:',
        deleteException
      );
    }
  }

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
