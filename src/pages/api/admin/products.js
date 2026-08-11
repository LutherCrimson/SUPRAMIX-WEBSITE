// src/pages/api/admin/products.js
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
      .from('products')
      .select(`
        id,
        name,
        category,
        price,
        unit,
        rating,
        reviews,
        desc,
        features,
        image_url,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const safeParseJson = (str) => {
      try {
        const res = JSON.parse(str);
        return Array.isArray(res) ? res : [];
      } catch (e) {
        return [];
      }
    };

    const formatted = (data || []).map(p => ({
      ...p,
      features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? safeParseJson(p.features) : [])
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
      image_url: product.image_url || ''
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
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Supabase server is not configured'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { id } = await request.json();

    if (!id) {
      throw new Error('ID product required');
    }

    // =====================================================
    // 1. AMBIL DATA PRODUCT TERLEBIH DAHULU
    // =====================================================
    const { data: product, error: fetchError } =
      await supabaseServer
        .from('products')
        .select('id, image_url')
        .eq('id', id)
        .single();

    if (fetchError) {
      console.error(
        'Failed to fetch product before delete:',
        fetchError
      );

      throw fetchError;
    }

    // =====================================================
    // 2. HAPUS GAMBAR DARI STORAGE
    // =====================================================
    const imageUrl = product?.image_url;

    if (imageUrl) {
      const marker =
        '/storage/v1/object/public/product-images/';

      if (imageUrl.includes(marker)) {
        const encodedPath = imageUrl.split(marker)[1];
        const storagePath = decodeURIComponent(encodedPath);

        if (storagePath) {
          const { error: storageError } =
            await supabaseServer.storage
              .from('product-images')
              .remove([storagePath]);

          if (storageError) {
            console.error(
              'Failed to delete product image from Storage:',
              storageError
            );

            throw storageError;
          }

          console.log(
            'Product image deleted from Storage:',
            storagePath
          );
        }
      }
    }

    // =====================================================
    // 3. HAPUS PRODUCT DARI DATABASE
    // =====================================================
    const { error: deleteError } =
      await supabaseServer
        .from('products')
        .delete()
        .eq('id', id);

    if (deleteError) {
      throw deleteError;
    }

    // =====================================================
    // 4. BERHASIL
    // =====================================================
    return new Response(
      JSON.stringify({
        success: true,
        id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (err) {
    console.error(
      'Delete product failed:',
      err
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          err?.message ||
          'Gagal menghapus product'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
