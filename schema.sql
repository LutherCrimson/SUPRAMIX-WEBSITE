-- ==========================================
-- SUPRAMIX WEBSITE - SUPABASE DATABASE SCHEMA
-- Execute this SQL script in Supabase SQL Editor
-- ==========================================

-- 1. Table: products
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC DEFAULT 0,
  unit TEXT,
  rating NUMERIC DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  desc TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT,
  category TEXT,
  materials_used TEXT,
  location TEXT,
  year TEXT,
  desc TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: partners
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

-- 4. Table: about_section
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
  image_caption TEXT,
  image_badge TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: admin_settings (for Passcode)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table: site_settings (for Maintenance Mode)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ POLICIES
-- ==========================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for All Tables
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Products') THEN
    CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Projects') THEN
    CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Partners') THEN
    CREATE POLICY "Public Read Partners" ON public.partners FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read About') THEN
    CREATE POLICY "Public Read About" ON public.about_section FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Admin Settings') THEN
    CREATE POLICY "Public Read Admin Settings" ON public.admin_settings FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Site Settings') THEN
    CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
  END IF;

  -- Allow Full Access for Anonymous/All Role (Client-side & Server-side Operations)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow All Products Ops') THEN
    CREATE POLICY "Allow All Products Ops" ON public.products FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow All Projects Ops') THEN
    CREATE POLICY "Allow All Projects Ops" ON public.projects FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow All Partners Ops') THEN
    CREATE POLICY "Allow All Partners Ops" ON public.partners FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow All About Ops') THEN
    CREATE POLICY "Allow All About Ops" ON public.about_section FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow All Admin Settings Ops') THEN
    CREATE POLICY "Allow All Admin Settings Ops" ON public.admin_settings FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow All Site Settings Ops') THEN
    CREATE POLICY "Allow All Site Settings Ops" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
