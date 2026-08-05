-- =========================================================
-- SUPRAMIX WEBSITE - SUPABASE DATABASE SCHEMA & INITIAL SEED DATA
-- Copy dan paste skrip ini di Supabase -> SQL Editor -> Run
-- =========================================================

-- 1. TABEL PRODUK (products)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  unit TEXT,
  rating NUMERIC DEFAULT 5.0,
  reviews NUMERIC DEFAULT 0,
  "desc" TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL PROYEK (projects)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT,
  category TEXT,
  materials_used TEXT,
  location TEXT,
  year TEXT,
  "desc" TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL MITRA / KLIEN (partners)
CREATE TABLE IF NOT EXISTS public.partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  sector TEXT,
  description TEXT,
  logo TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL PENGATURAN ADMIN (admin_settings)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES (PRODUKSI & KETAT)
-- ---------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Clean Up Old Policies
DROP POLICY IF EXISTS "Full Access Products" ON public.products;
DROP POLICY IF EXISTS "Allow Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow Insert Products" ON public.products;
DROP POLICY IF EXISTS "Allow Update Products" ON public.products;
DROP POLICY IF EXISTS "Allow Delete Products" ON public.products;

DROP POLICY IF EXISTS "Full Access Projects" ON public.projects;
DROP POLICY IF EXISTS "Allow Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Allow Insert Projects" ON public.projects;
DROP POLICY IF EXISTS "Allow Update Projects" ON public.projects;
DROP POLICY IF EXISTS "Allow Delete Projects" ON public.projects;

DROP POLICY IF EXISTS "Full Access Partners" ON public.partners;
DROP POLICY IF EXISTS "Allow Public Read Partners" ON public.partners;
DROP POLICY IF EXISTS "Allow Insert Partners" ON public.partners;
DROP POLICY IF EXISTS "Allow Update Partners" ON public.partners;
DROP POLICY IF EXISTS "Allow Delete Partners" ON public.partners;

DROP POLICY IF EXISTS "Full Access Admin Settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Allow Read Admin Settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Allow Insert Admin Settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Allow Update Admin Settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Allow Delete Admin Settings" ON public.admin_settings;

-- 1. PUBLIC CATALOG TABLES (products, projects, partners): READ-ONLY UNTUK PUBLIK
-- Pengunjung publik & anonim HANYA BISA BACA (SELECT). Aksi Tambah, Edit, Hapus wajib lewat Backend Server.
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Partners" ON public.partners FOR SELECT USING (true);

-- 2. ADMIN SETTINGS TABLE: SANGAT KETAT (AKSES HANYA VIA BACKEND SERVICE ROLE)
-- Tidak ada policy SELECT/INSERT/UPDATE/DELETE untuk publik anonim.
-- Hanya backend server (Astro API) dengan SUPABASE_SERVICE_ROLE_KEY yang dapat mengakses & mengubah admin_settings.

-- ---------------------------------------------------------
-- SEED DATA AWAL (AUTOMATIC POPULATION)
-- ---------------------------------------------------------

-- Seed Products
INSERT INTO public.products (id, name, category, price, unit, rating, reviews, "desc", features, image)
VALUES 
('therma-max-pro', 'ThermaMax Pro Ultra (R-6.5)', 'Thermal Insulation', 189, 'pack (12 sqm)', 4.9, 142, 'Top-tier high density fiberglass batts designed with dynamic aerospace thermal fibers for extreme energy isolation.', '["98% Radiance Deflection", "Zero Formaldehyde", "Class A1 Fireproof"]'::jsonb, '/Projects/sph1.jpeg'),
('acoustic-shield-elite', 'AcousticShield Elite-Mass', 'Acoustic Insulation', 245, 'roll (10 sqm)', 5.0, 98, 'Engineered heavy-weight viscoelastic polymer with high density core designed to eliminate low-frequency bass & structural vibrations.', '["STC Rating 68+", "Micro-porous structure", "Ultra-flexible install"]'::jsonb, '/Projects/binus1.jpeg'),
('hydro-guard-mem-3', 'HydroGuard Membrane Max-3', 'Waterproofing', 210, 'roll (15 sqm)', 4.8, 81, 'Multi-ply crystalline advanced elastomeric weather membrane that adapts with humidity, expanding and contracting dynamically.', '["Zero water permeability", "Self-healing fibers", "Breathable technology"]'::jsonb, '/products/app-sand-membrane.jpg'),
('pyro-block-armour', 'PyroBlock Core Armor', 'Fire Protection', 279, 'pack (8 sqm)', 4.9, 119, 'Mineral wool core composite infused with hyper-refractory crystals to withstand temperatures up to 1300°C for 4 hours.', '["ASTM E84 Gold Standard", "Non-toxic decomposition", "Moisture resistant"]'::jsonb, '/Projects/kesehatan1.jpeg')
ON CONFLICT (id) DO NOTHING;

-- Seed Projects
INSERT INTO public.projects (id, title, client_name, category, materials_used, location, year, "desc", image)
VALUES
('proj-kemenkes', 'Poltekes Gondangdia Project', 'Ministry of Health (KEMENKES)', 'Infrastructure / Healthcare', 'Bitumen Membrane & Basalt Spring Sealant', 'Jakarta, Indonesia', '2023', 'SUPRAMIX worked alongside PT Wijaya Karya to install high-performance bitumen membranes and basalt expansion sealants for critical infrastructure bridges and healthcare buildings.', '/Projects/kesehatan1.jpeg'),
('proj-sunter', 'Sunter Luxury Residential', 'Private Developer', 'Residential', 'APP Sand Membrane & Prime Coat WB Injection', 'North Jakarta, Indonesia', '2023', 'Supplying APP sand membrane protection and WB epoxy injection system across major luxury residential complexes and underpass structures.', '/Projects/sunter1.jpeg'),
('proj-shb', 'Sekolah Harapan Bangsa Campus', 'Sekolah Harapan Bangsa', 'Educational', 'Coating-PU Modified & APP PE Membrane', 'Modernland, Tangerang', '2024', 'Engineering elastomeric modified PU coatings and heavy PE membrane barriers for institutional roof complexes and waterproofing seals.', '/Projects/sph1.jpeg'),
('proj-binus', 'BINUS University Campus Tower', 'BINA NUSANTARA', 'Educational', 'Basalt Spring Green & PyroBlock Core Armor', 'Alam Sutera, Tangerang', '2024', 'Installing high-grade acrylic polymer coatings and refractory mineral wool insulation across university tower complexes.', '/Projects/binus1.jpeg')
ON CONFLICT (id) DO NOTHING;

-- Seed Partners / Clients
INSERT INTO public.partners (id, name, short_name, sector, description, logo, website)
VALUES
('part-kemenkes', 'Ministry of Health', 'KEMENKES', 'Government & Healthcare', 'National health authority partnership for medical and educational facility waterproofing.', '/Projects/kesehatan1.jpeg', 'https://kemkes.go.id'),
('part-sunter', 'Sunter Luxury Development', 'Sunter Group', 'Real Estate & Living', 'Premium developer partner for high-end residential waterproofing and insulation systems.', '/Projects/sunter1.jpeg', '#'),
('part-shb', 'Sekolah Harapan Bangsa', 'SHB', 'Education', 'Educational institution partner for durable eco-friendly roof and thermal barrier protection.', '/Projects/sph1.jpeg', '#'),
('part-binus', 'BINA NUSANTARA UNIVERSITY', 'BINUS', 'Higher Education', 'Leading university network utilizing SUPRAMIX passive fire protection and insulation.', '/Projects/binus1.jpeg', 'https://binus.ac.id')
ON CONFLICT (id) DO NOTHING;

-- 5. TABEL ABOUT SECTION (about_section)
CREATE TABLE IF NOT EXISTS public.about_section (
  id TEXT PRIMARY KEY DEFAULT 'about-main',
  badge_text TEXT,
  title TEXT,
  description TEXT,
  stat1_number TEXT,
  stat1_label TEXT,
  stat2_number TEXT,
  stat2_label TEXT,
  image_url TEXT,
  image_badge TEXT,
  image_caption TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read About Section" ON public.about_section;
CREATE POLICY "Public Read About Section" ON public.about_section FOR SELECT USING (true);

-- Seed About Section
INSERT INTO public.about_section (id, badge_text, title, description, stat1_number, stat1_label, stat2_number, stat2_label, image_url, image_badge, image_caption)
VALUES (
  'about-main',
  'About Us',
  'Supramix Technology of Insulating Material',
  'Supramix is a leading manufacturer and distributor established in 2019 focusing in Bituminous products, waterproofing membranes, and polymer insulation solutions. Serving local markets and distributing high-grade building insulation materials across every major island in Indonesia.',
  '2019',
  'Established Foundation',
  '100%',
  'Indonesia Coverage',
  '/products/app-sand-membrane.jpg',
  'Building Structure Application',
  'APP Bituminous Waterproofing Membrane Roll on Concrete Deck'
)
ON CONFLICT (id) DO NOTHING;
