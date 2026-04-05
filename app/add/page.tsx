import { WandSparkles } from 'lucide-react';

import { RecipeForm } from '@/components/RecipeForm';
import { SupabaseNotice } from '@/components/SupabaseNotice';

export default function AddRecipePage() {
  return (
    <main className="container-shell py-8 sm:py-10">
      <section className="mb-8 max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
          <WandSparkles className="h-4 w-4" />
          Share your signature dish
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Add a new recipe</h1>
          <p className="text-base leading-7 text-muted-foreground">
            Create a rich recipe post with ingredients, step-by-step instructions, and an image URL. The form is wired for your Supabase backend.
            Create a rich recipe post with ingredients, step-by-step instructions, and an image URL. The form is wired for Supabase-ready submission.
          </p>
        </div>
      </section>

      <div className="mb-6">
        <SupabaseNotice />
      </div>

      <RecipeForm />
    </main>
  );
}
