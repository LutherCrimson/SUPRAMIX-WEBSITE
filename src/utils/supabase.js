// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://trkjpxpmygjiwkaqrrjya.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya2pweHBteWdqd2thcXJyanlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NDE5NzQsImV4cCI6MjEwMTMxNzk3NH0.5UonTSeU4RAvtaly2MJDL73e1KIScIh26zQh1TVYmTI';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'YOUR_SUPABASE_URL' && 
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

