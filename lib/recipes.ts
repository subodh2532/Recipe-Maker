import { mockRecipes, mockReviews } from '@/lib/mock-data';
import { Recipe, RecipeInsert, Review, ReviewInsert } from '@/lib/types';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import { getSupabaseServerClient, isSupabaseServerConfigured } from '@/lib/supabaseServer';
import { Recipe, Review } from '@/lib/types';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

const average = (reviews: Review[]) =>
  reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

export async function getRecipes(): Promise<Recipe[]> {
  const supabase = getSupabaseClient();

  if (isSupabaseConfigured && supabase) {
    const { data: cards, error } = await supabase.from('recipe_cards').select('*').order('created_at', { ascending: false });

    if (!error && cards) {
      return cards.map((recipe) => ({
        ...recipe,
        averageRating: Number(recipe.average_rating ?? 0),
        reviewCount: recipe.review_count ?? 0,
      })) as Recipe[];
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
    return { ...recipe, averageRating: average(reviews), reviewCount: reviews.length, reviews };
    return { ...recipe, averageRating: average(reviews), reviews };
  });
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const supabase = getSupabaseClient();

  if (isSupabaseConfigured && supabase) {
    const [{ data: recipe, error: recipeError }, { data: reviews, error: reviewsError }] = await Promise.all([
      supabase.from('recipes').select('*').eq('id', id).single(),
      supabase.from('reviews').select('*').eq('recipe_id', id).order('created_at', { ascending: false }),
    ]);

    if (!recipeError && !reviewsError && recipe) {
      const typedReviews = (reviews ?? []) as Review[];
      return {
        ...(recipe as Recipe),
        reviews: typedReviews,
        averageRating: average(typedReviews),
        reviewCount: typedReviews.length,
      };
    }
  }

  const fallbackRecipe = mockRecipes.find((recipe) => recipe.id === id);
  if (!fallbackRecipe) {
    return null;
  }

  const fallbackReviews = mockReviews.filter((review) => review.recipe_id === id);
  return {
    ...fallbackRecipe,
    reviews: fallbackReviews,
    averageRating: average(fallbackReviews),
    reviewCount: fallbackReviews.length,
  };
}

function isMissingUserIdColumn(message?: string) {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return normalized.includes('user_id') && (normalized.includes('column') || normalized.includes('schema cache'));
}

export async function createRecipe(payload: RecipeInsert) {
  const supabaseServer = getSupabaseServerClient();

  if (!isSupabaseServerConfigured || !supabaseServer) {
    return {
      data: null,
      error: {
        message:
          'Server Supabase credentials are missing. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your deployment environment.',
      },
    };
  }

  const insertResult = await supabaseServer.from('recipes').insert(payload).select().single();

  if (!insertResult.error || !isMissingUserIdColumn(insertResult.error.message)) {
    return insertResult;
  }

  const { user_id: _ignored, ...legacyPayload } = payload;
  return supabaseServer.from('recipes').insert(legacyPayload).select().single();
  return supabaseServer.from('recipes').insert(payload).select().single();
}

export async function createReview(payload: ReviewInsert) {
  const supabaseServer = getSupabaseServerClient();

  if (!isSupabaseServerConfigured || !supabaseServer) {
    return {
      data: null,
      error: {
        message:
          'Server Supabase credentials are missing. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your deployment environment.',
      },
    };
  }

  const insertResult = await supabaseServer.from('reviews').insert(payload).select().single();

  if (!insertResult.error || !isMissingUserIdColumn(insertResult.error.message)) {
    return insertResult;
  }

  const { user_id: _ignored, ...legacyPayload } = payload;
  return supabaseServer.from('reviews').insert(legacyPayload).select().single();
  return supabaseServer.from('reviews').insert(payload).select().single();
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.id === id) ?? null;
}
