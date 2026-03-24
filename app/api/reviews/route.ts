import { NextResponse } from 'next/server';

import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const payload = await request.json();

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ ok: false, message: 'Supabase credentials are missing.' }, { status: 503 });
  }

  const { error, data } = await supabase.from('reviews').insert(payload).select().single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, review: data });
}
