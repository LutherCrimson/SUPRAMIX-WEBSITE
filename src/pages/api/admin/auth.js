// src/pages/api/admin/auth.js
import { supabaseServer, isServerSupabaseConfigured } from '../../../utils/supabaseServer';

// export const prerender = false;

// Fallback password memori server jika database belum menyimpan passcode baru
let serverMemoryPasscode = null;

export async function POST({ request }) {
  try {
    const { action, passcode, newPasscode } = await request.json();

    const defaultPasscode = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin123';
    let storedPasscode = serverMemoryPasscode || defaultPasscode;

    if (isServerSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseServer
          .from('admin_settings')
          .select('value')
          .eq('key', 'passcode')
          .single();

        if (!error && data && data.value) {
          storedPasscode = data.value;
          serverMemoryPasscode = data.value;
        }
      } catch (e) {
        console.warn('Error reading passcode from Supabase:', e);
      }
    }

    if (action === 'verify') {
      const isValid = passcode === storedPasscode;
      return new Response(JSON.stringify({ success: isValid }), {
        status: isValid ? 200 : 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (action === 'change') {
      if (!newPasscode || newPasscode.trim().length < 4) {
        return new Response(JSON.stringify({ success: false, error: 'Passcode minimal 4 karakter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const passcodeToSave = newPasscode.trim();
      serverMemoryPasscode = passcodeToSave;

      if (isServerSupabaseConfigured()) {
        const { error } = await supabaseServer.from('admin_settings').upsert({
          key: 'passcode',
          value: passcodeToSave,
          updated_at: new Date().toISOString()
        });
        if (error) {
          console.error('Supabase admin_settings upsert error:', error);
          return new Response(JSON.stringify({ success: false, error: `Gagal simpan ke Supabase: ${error.message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
