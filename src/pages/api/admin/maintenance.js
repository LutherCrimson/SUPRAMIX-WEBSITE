// src/pages/api/admin/maintenance.js
import { supabaseServer, isServerSupabaseConfigured } from '../../../utils/supabaseServer';

export const prerender = false;

export async function GET() {
  if (!isServerSupabaseConfigured()) {
    return new Response(JSON.stringify({ success: false, error: 'Supabase server is not configured' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabaseServer
      .from('site_settings')
      .select('*')
      .eq('key', 'maintenance')
      .maybeSingle();

    if (error) throw error;

    const maintenanceData = data && data.value ? (typeof data.value === 'string' ? JSON.parse(data.value) : data.value) : null;

    return new Response(JSON.stringify({ success: true, data: maintenanceData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  if (!isServerSupabaseConfigured()) {
    return new Response(JSON.stringify({ success: false, error: 'Supabase server is not configured' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const payload = await request.json();

    const { error } = await supabaseServer.from('site_settings').upsert({
      key: 'maintenance',
      value: payload,
      updated_at: new Date().toISOString()
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data: payload }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
