import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { createRecipe } from '@/lib/recipes';
import { RecipeInsert } from '@/lib/types';

function validateRecipe(payload: Partial<RecipeInsert>) {
  if (!payload.title?.trim()) return 'Title is required.';
  if (!payload.description?.trim()) return 'Description is required.';
  if (!payload.image_url?.trim()) return 'Image URL is required.';
  if (!/^https?:\/\//i.test(payload.image_url)) return 'Image URL must be a valid http(s) URL.';
  if (!payload.ingredients?.length || payload.ingredients.some((item) => !item.trim())) return 'At least one ingredient is required.';
  if (!payload.steps?.length || payload.steps.some((item) => !item.trim())) return 'At least one step is required.';
  return null;
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ ok: false, message: 'Please sign in to add a recipe.' }, { status: 401 });
  }

  let payload: Partial<RecipeInsert>;

  try {
    payload = (await request.json()) as Partial<RecipeInsert>;
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON request body.' }, { status: 400 });
  }

  const validationError = validateRecipe(payload);
  if (validationError) {
    return NextResponse.json({ ok: false, message: validationError }, { status: 400 });
  }

  try {
    const { data, error } = await createRecipe({
      title: payload.title!.trim(),
      description: payload.description!.trim(),
      image_url: payload.image_url!.trim(),
      ingredients: payload.ingredients!.map((item) => item.trim()),
      steps: payload.steps!.map((item) => item.trim()),
      user_id: userId,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, recipe: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unexpected error while creating recipe.' },
      { status: 503 },
    );
  }

import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const payload = await request.json();

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ ok: false, message: 'Supabase credentials are missing.' }, { status: 503 });
  }

  const { error, data } = await supabase.from('recipes').insert(payload).select().single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, recipe: data });
}
