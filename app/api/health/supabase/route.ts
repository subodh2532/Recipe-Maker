import { NextResponse } from 'next/server';

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import { getSupabaseServerClient, isSupabaseServerConfigured } from '@/lib/supabaseServer';

export async function GET() {
  const publicClient = getSupabaseClient();
  const serverClient = getSupabaseServerClient();

  const result = {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
    clients: {
      publicClientReady: Boolean(isSupabaseConfigured && publicClient),
      serverClientReady: Boolean(isSupabaseServerConfigured && serverClient),
    },
    checks: {
      publicReadRecipes: null as string | null,
      serverReadRecipes: null as string | null,
    },
  };

  if (publicClient) {
    const { error } = await publicClient.from('recipes').select('id').limit(1);
    result.checks.publicReadRecipes = error ? error.message : 'ok';
  }

  if (serverClient) {
    const { error } = await serverClient.from('recipes').select('id').limit(1);
    result.checks.serverReadRecipes = error ? error.message : 'ok';
  }

  return NextResponse.json(result);
}
