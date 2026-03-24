import { NextResponse } from 'next/server';

import { createReview } from '@/lib/recipes';
import { ReviewInsert } from '@/lib/types';

function validateReview(payload: Partial<ReviewInsert>) {
  if (!payload.recipe_id?.trim()) return 'Recipe id is required.';
  if (!payload.comment?.trim()) return 'Comment is required.';
  if (!payload.rating || payload.rating < 1 || payload.rating > 5) return 'Rating must be between 1 and 5.';
  if (payload.video_url && !/^https?:\/\//i.test(payload.video_url)) return 'Video URL must be a valid http(s) URL.';
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ReviewInsert>;
  const validationError = validateReview(payload);

  if (validationError) {
    return NextResponse.json({ ok: false, message: validationError }, { status: 400 });
  }

  try {
    const { data, error } = await createReview({
      recipe_id: payload.recipe_id!.trim(),
      rating: payload.rating!,
      comment: payload.comment!.trim(),
      video_url: payload.video_url?.trim() || null,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, review: data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unexpected error while creating review.' },
      { status: 503 },
    );
  }
}
