import { NextResponse } from 'next/server';

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
  const payload = (await request.json()) as Partial<RecipeInsert>;
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
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, recipe: data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unexpected error while creating recipe.' },
      { status: 503 },
    );
  }
}
