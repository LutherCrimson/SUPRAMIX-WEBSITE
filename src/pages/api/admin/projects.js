// src/pages/api/admin/projects.js
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
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formatted = (data || []).map(p => ({
      id: p.id,
      title: p.title,
      clientName: p.client_name,
      category: p.category,
      materialsUsed: p.materials_used,
      location: p.location,
      year: p.year,
      desc: p.desc,
      image: p.image
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
    const project = await request.json();
    const targetId = (project.id && String(project.id).trim()) ? String(project.id).trim() : 'proj-' + Date.now();

    const { error } = await supabaseServer.from('projects').upsert({
      id: targetId,
      title: project.title,
      client_name: project.clientName || '',
      category: project.category || '',
      materials_used: project.materialsUsed || '',
      location: project.location || '',
      year: project.year || '',
      desc: project.desc || '',
      image: project.image || ''
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
    if (!id) throw new Error('ID project required');

    const { error } = await supabaseServer.from('projects').delete().eq('id', id);
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
