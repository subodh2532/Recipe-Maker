import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ListChecks, MessageSquareText, Soup, Star } from 'lucide-react';

import { RatingStars } from '@/components/RatingStars';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewList } from '@/components/ReviewList';
import { SupabaseNotice } from '@/components/SupabaseNotice';
import { Card, CardContent } from '@/components/ui/card';
import { getRecipeById } from '@/lib/recipes';

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="container-shell py-8 sm:py-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="relative h-[280px] overflow-hidden rounded-[2rem] shadow-soft sm:h-[420px]">
            <Image src={recipe.image_url} alt={recipe.title} fill className="object-cover" sizes="100vw" priority />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                <Star className="h-4 w-4 text-primary" />
                {(recipe.averageRating ?? 0).toFixed(1)} average rating
              </span>
              <span className="text-sm text-muted-foreground">{recipe.reviewCount ?? recipe.reviews?.length ?? 0} reviews</span>
              <span className="text-sm text-muted-foreground">{recipe.reviews?.length ?? 0} reviews</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{recipe.title}</h1>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground">{recipe.description}</p>
            </div>
            <RatingStars rating={recipe.averageRating ?? 0} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-white/70">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
                    <Soup className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Ingredients</h2>
                    <p className="text-sm text-muted-foreground">Everything you need before you start cooking.</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-slate-700">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/70">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
                    <ListChecks className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Method</h2>
                    <p className="text-sm text-muted-foreground">Step-by-step instructions for consistent results.</p>
                  </div>
                </div>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={`${index + 1}-${step}`} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-6 text-slate-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
              <MessageSquareText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Ratings & reviews</h2>
              <p className="text-sm text-muted-foreground">Share feedback and optionally include a video walkthrough.</p>
            </div>
          </div>
          <SupabaseNotice />
          <ReviewForm recipeId={recipe.id} />
          <ReviewList reviews={recipe.reviews ?? []} />
        </aside>
      </section>
    </main>
  );
}
