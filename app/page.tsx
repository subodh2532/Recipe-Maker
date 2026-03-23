import { BookOpenText, ChefHat, Sparkles } from 'lucide-react';

import { RecipeCard } from '@/components/RecipeCard';
import { Card, CardContent } from '@/components/ui/card';
import { getRecipes } from '@/lib/recipes';

export default async function HomePage() {
  const recipes = await getRecipes();

  return (
    <main className="container-shell py-8 sm:py-10">
      <section className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            Discover and share your next favorite recipe
          </span>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">A beautiful recipe-sharing experience built for home cooks.</h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Browse community favorites, publish your own dishes, and leave ratings or video reviews — all in one clean, mobile-first interface.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { icon: ChefHat, label: 'Curated Recipes', value: `${recipes.length}+ dishes` },
            { icon: BookOpenText, label: 'Guided Cooking', value: 'Step-by-step instructions' },
            { icon: Sparkles, label: 'Community Reviews', value: 'Ratings and optional video links' },
          ].map((item) => (
            <Card key={item.label} className="border-white/80 bg-secondary/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Browse Recipes</p>
            <h2 className="text-2xl font-semibold tracking-tight">Fresh ideas from the community</h2>
          </div>
          <p className="text-sm text-muted-foreground">Responsive card grid with empty and loading-ready states.</p>
        </div>

        {recipes.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed bg-secondary/70">
            <CardContent>
              <p className="text-sm text-muted-foreground">No recipes found yet. Start by adding the first one.</p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
