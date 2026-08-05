// src/pages/api/admin/products.js
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
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formatted = (data || []).map(p => ({
      ...p,
      features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features) : [])
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
    const product = await request.json();
    const targetId = (product.id && String(product.id).trim()) ? String(product.id).trim() : 'prod-' + Date.now();

    const { error } = await supabaseServer.from('products').upsert({
      id: targetId,
      name: product.name,
      category: product.category || '',
      price: Number(product.price) || 0,
      unit: product.unit || '',
      rating: Number(product.rating) || 5.0,
      reviews: Number(product.reviews) || 0,
      desc: product.desc || '',
      features: product.features || [],
      image: product.image || ''
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
    if (!id) throw new Error('ID product required');

    const { error } = await supabaseServer.from('products').delete().eq('id', id);
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
