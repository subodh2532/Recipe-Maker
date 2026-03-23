import { mockRecipes, mockReviews } from '@/lib/mock-data';
import { Recipe, Review } from '@/lib/types';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

const average = (reviews: Review[]) =>
  reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

export async function getRecipes(): Promise<Recipe[]> {
  if (isSupabaseConfigured && supabase) {
    const { data: recipes, error } = await supabase.from('recipes').select('*').order('created_at', { ascending: false });
    if (!error && recipes) {
      const { data: reviews } = await supabase.from('reviews').select('*');
      return (recipes as Recipe[]).map((recipe) => {
        const recipeReviews = (reviews as Review[] | null)?.filter((review) => review.recipe_id === recipe.id) ?? [];
        return { ...recipe, averageRating: average(recipeReviews), reviews: recipeReviews };
      });
    }
  }

  return mockRecipes.map((recipe) => {
    const reviews = mockReviews.filter((review) => review.recipe_id === recipe.id);
    return { ...recipe, averageRating: average(reviews), reviews };
  });
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.id === id) ?? null;
}
