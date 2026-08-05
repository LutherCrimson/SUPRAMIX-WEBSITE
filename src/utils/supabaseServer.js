// src/utils/supabaseServer.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isServerSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    serviceRoleKey && 
    supabaseUrl !== 'YOUR_SUPABASE_URL'
  );
};

export const supabaseServer = isServerSupabaseConfigured()
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;
