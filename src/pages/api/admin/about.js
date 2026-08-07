// src/pages/api/admin/about.js
export const prerender = false;

import { supabaseServer, isServerSupabaseConfigured } from '../../../utils/supabaseServer';

export async function GET() {
  if (!isServerSupabaseConfigured()) {
    return new Response(JSON.stringify({ success: false, error: 'Supabase server is not configured' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabaseServer
      .from('about_section')
      .select('*')
      .eq('id', 'about-main')
      .maybeSingle();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data: data || null }), {
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
    const targetId = 'about-main';

    const { error } = await supabaseServer.from('about_section').upsert({
      id: targetId,
      badge_text: payload.badge_text || 'About Us',
      title: payload.title || '',
      description: payload.description || '',
      stat1_number: payload.stat1_number || '',
      stat1_label: payload.stat1_label || '',
      stat2_number: payload.stat2_number || '',
      stat2_label: payload.stat2_label || '',
      image_url: payload.image_url || '',
      image_badge: payload.image_badge || '',
      image_caption: payload.image_caption || '',
      updated_at: new Date().toISOString()
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, id: targetId }), {
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
