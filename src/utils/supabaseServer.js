// src/utils/supabaseServer.js
import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://trkjpxpmygjiwkaqrrjya.supabase.co';
const DEFAULT_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya2pweHBteWdqd2thcXJyanlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc0MTk3NCwiZXhwIjoyMTAxMzE3OTc0fQ.KRwAGMgv6Twn5qA8tUcGtIVjKwt3tnh2DN806pPyfdo';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_ROLE_KEY;

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

