// src/pages/api/admin/partners.js
import { supabaseServer, isServerSupabaseConfigured } from '../../../utils/supabaseServer';

// export const prerender = false;

export async function GET() {
  if (!isServerSupabaseConfigured()) {
    return new Response(JSON.stringify({ success: false, error: 'Supabase server is not configured' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabaseServer
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formatted = (data || []).map(p => ({
      id: p.id,
      name: p.name,
      shortName: p.short_name,
      sector: p.sector,
      description: p.description,
      logo: p.logo,
      website: p.website
    }));

    return new Response(JSON.stringify({ success: true, data: formatted }), {
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
    const partner = await request.json();
    const targetId = (partner.id && String(partner.id).trim()) ? String(partner.id).trim() : 'part-' + Date.now();

    const { error } = await supabaseServer.from('partners').upsert({
      id: targetId,
      name: partner.name,
      short_name: partner.shortName || '',
      sector: partner.sector || '',
      description: partner.description || '',
      logo: partner.logo || '',
      website: partner.website || '#'
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

export async function DELETE({ request }) {
  if (!isServerSupabaseConfigured()) {
    return new Response(JSON.stringify({ success: false, error: 'Supabase server is not configured' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id } = await request.json();
    if (!id) throw new Error('ID partner required');

    const { error } = await supabaseServer.from('partners').delete().eq('id', id);
    if (error) throw error;

    return new Response(JSON.stringify({ success: true, id }), {
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
