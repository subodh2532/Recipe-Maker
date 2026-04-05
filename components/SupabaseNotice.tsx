import { Database, ExternalLink } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { isSupabaseConfigured } from '@/lib/supabaseClient';

export function SupabaseNotice() {
  if (isSupabaseConfigured) {
    return (
      <Card className="border-emerald-200 bg-emerald-50/80 shadow-none">
        <CardContent className="flex items-start gap-3 p-4">
          <Database className="mt-0.5 h-5 w-5 text-emerald-600" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-emerald-900">Supabase connected</p>
            <p className="text-sm text-emerald-800">Recipes and reviews are being loaded from your live Supabase project.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50/80 shadow-none">
      <CardContent className="flex items-start gap-3 p-4">
        <Database className="mt-0.5 h-5 w-5 text-amber-600" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-amber-900">Supabase not configured yet</p>
          <p className="text-sm text-amber-800">
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your local env, then run the SQL in <code>migration.sql</code>.
          </p>
          <p className="inline-flex items-center gap-1 text-sm text-amber-800">
            Use <code>.env.example</code> as your template.
            <ExternalLink className="h-3.5 w-3.5" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
